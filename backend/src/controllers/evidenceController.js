import crypto from 'crypto';
import { store } from '../services/store.js';
import { parseDocument } from '../extraction/parserService.js';
import { extractOcrText } from '../extraction/ocrService.js';
import { extractAllEntities } from '../extraction/entityExtractor.js';

export async function getEvidence(req, res, next) {
  try {
    const { caseId, category, status } = req.query;
    let list = await store.getEvidence(caseId);

    if (category && category !== 'ALL') {
      list = list.filter(e => e.category === category);
    }
    if (status && status !== 'ALL') {
      list = list.filter(e => e.status === status);
    }

    return res.json({ success: true, count: list.length, evidence: list });
  } catch (err) {
    next(err);
  }
}

export async function getEvidenceById(req, res, next) {
  try {
    const { id } = req.params;
    const item = await store.getEvidenceById(id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Evidence item not found' });
    }

    // Retrieve entities extracted from this evidence item
    const allEntities = await store.getEntities(item.caseId);
    const relatedEntities = allEntities.filter(ent => 
      ent.sourceEvidenceIds && ent.sourceEvidenceIds.includes(item.evidenceId)
    );

    // Retrieve timeline events linked to this evidence
    const allEvents = await store.getTimelineEvents(item.caseId);
    const relatedEvents = allEvents.filter(evt =>
      evt.sourceEvidenceIds && evt.sourceEvidenceIds.includes(item.evidenceId)
    );

    await store.addAuditLog({
      caseId: item.caseId,
      action: 'EVIDENCE_VIEWED',
      target: item.filename,
      details: `Inspected evidence ${item.evidenceId} (${item.filename})`
    });

    return res.json({
      success: true,
      evidence: item,
      relatedEntities,
      relatedEvents
    });
  } catch (err) {
    next(err);
  }
}

export async function uploadEvidence(req, res, next) {
  try {
    const caseId = req.body.caseId || 'CASE-2026-001';
    let filename = 'uploaded_artifact.txt';
    let fileBuffer = null;
    let mimeType = 'text/plain';
    let category = req.body.category || 'Document';
    let fileSize = 1024;

    if (req.file) {
      filename = req.file.originalname;
      fileBuffer = req.file.buffer;
      mimeType = req.file.mimetype;
      fileSize = req.file.size;
    } else if (req.body.filename) {
      filename = req.body.filename;
      fileBuffer = Buffer.from(req.body.textContent || `Evidence payload for ${filename}`, 'utf-8');
      mimeType = req.body.mimeType || 'text/plain';
      fileSize = fileBuffer.length;
    }

    // Determine category heuristically if not specified or default
    const lower = filename.toLowerCase();
    if (lower.endsWith('.png') || lower.endsWith('.jpg') || lower.endsWith('.jpeg')) {
      category = category === 'Document' ? 'Screenshot' : category;
    } else if (lower.includes('chat') || lower.includes('whatsapp') || lower.includes('sms')) {
      category = 'Chat';
    } else if (lower.includes('statement') || lower.includes('bank') || lower.endsWith('.csv')) {
      category = 'Bank Record';
    } else if (lower.includes('call') || lower.includes('cdr')) {
      category = 'Call Log';
    }

    // Compute cryptographic SHA-256 hash
    const hash = crypto.createHash('sha256').update(fileBuffer || Buffer.from(filename)).digest('hex');

    // Generate evidence ID
    const count = (await store.getEvidence(caseId)).length;
    const evidenceId = `EVD-${String(count + 1).padStart(3, '0')}`;

    let rawContent = req.body.textContent || '';
    if (fileBuffer && (mimeType.startsWith('text/') || mimeType.includes('json') || mimeType.includes('csv'))) {
      rawContent = fileBuffer.toString('utf-8');
    }

    const newEvidence = {
      evidenceId,
      caseId,
      filename,
      type: mimeType,
      category,
      status: 'UPLOADED',
      hash,
      fileSize,
      uploadedAt: new Date(),
      extractedText: rawContent,
      structuredData: {},
      metadata: {
        originalMime: mimeType,
        sourceUploadChannel: 'Investigative Ingestion Portal'
      }
    };

    const saved = await store.addEvidence(newEvidence);

    await store.addAuditLog({
      caseId,
      action: 'EVIDENCE_UPLOAD',
      target: filename,
      details: `Uploaded ${fileSize} bytes as ${evidenceId} (${category})`
    });

    return res.status(201).json({ success: true, evidence: saved });
  } catch (err) {
    next(err);
  }
}

export async function processEvidence(req, res, next) {
  try {
    const { id } = req.params;
    const evidence = await store.getEvidenceById(id);
    if (!evidence) {
      return res.status(404).json({ success: false, message: 'Evidence not found' });
    }

    // Step 1: Extract text via OCR or Parser
    let extractedText = evidence.extractedText || '';
    let parsedMetadata = {};

    if (!extractedText) {
      if (evidence.category === 'Screenshot' || evidence.type.startsWith('image/')) {
        const ocr = await extractOcrText(null, evidence.filename, evidence.type);
        extractedText = ocr.extractedText;
        parsedMetadata = ocr.metadata || {};
      } else {
        const doc = await parseDocument(null, evidence.filename, evidence.type);
        extractedText = doc.text;
      }
    }

    // Step 2: Extract Entities
    const extractedEntities = extractAllEntities(extractedText, evidence.evidenceId);

    // Save newly extracted entities into store
    for (const ent of extractedEntities) {
      const existingList = await store.getEntities(evidence.caseId);
      const existing = existingList.find(e => e.type === ent.type && e.normalizedValue === ent.normalizedValue);

      if (existing) {
        if (!existing.sourceEvidenceIds.includes(evidence.evidenceId)) {
          existing.sourceEvidenceIds.push(evidence.evidenceId);
        }
        await store.updateEntity(existing.entityId, existing);
      } else {
        const newEntId = `ENT-${String(existingList.length + 1).padStart(3, '0')}`;
        await store.addEntity({
          entityId: newEntId,
          caseId: evidence.caseId,
          type: ent.type,
          value: ent.value,
          normalizedValue: ent.normalizedValue,
          confidence: ent.confidence,
          epistemicType: ent.epistemicType,
          sourceEvidenceIds: [evidence.evidenceId],
          occurrences: [
            {
              evidenceId: evidence.evidenceId,
              location: ent.sourceLocation,
              snippet: ent.value,
              timestamp: new Date().toLocaleTimeString()
            }
          ],
          properties: {}
        });
      }
    }

    // Step 3: Update Evidence status
    const updated = await store.updateEvidence(evidence.evidenceId, {
      status: 'CORRELATED',
      extractedText,
      processedAt: new Date(),
      metadata: { ...evidence.metadata, ...parsedMetadata }
    });

    await store.addAuditLog({
      caseId: evidence.caseId,
      action: 'EVIDENCE_PROCESSED',
      target: evidence.filename,
      details: `Extracted ${extractedEntities.length} entities from ${evidence.evidenceId}`
    });

    return res.json({
      success: true,
      evidence: updated,
      extractedEntitiesCount: extractedEntities.length,
      extractedEntities
    });
  } catch (err) {
    next(err);
  }
}
