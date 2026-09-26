import { store } from '../services/store.js';

export async function getCases(req, res, next) {
  try {
    const cases = await store.getCases();
    const enriched = await Promise.all(cases.map(async (c) => {
      const evidence = await store.getEvidence(c.caseId);
      const entities = await store.getEntities(c.caseId);
      const events = await store.getTimelineEvents(c.caseId);
      const inconsistencies = await store.getInconsistencies(c.caseId);

      return {
        ...c,
        stats: {
          evidenceCount: evidence.length,
          entityCount: entities.length,
          eventCount: events.length,
          inconsistencyCount: inconsistencies.length
        }
      };
    }));
    return res.json({ success: true, cases: enriched });
  } catch (err) {
    next(err);
  }
}

export async function getCaseById(req, res, next) {
  try {
    const { id } = req.params;
    const c = await store.getCaseById(id);
    if (!c) {
      return res.status(404).json({ success: false, message: 'Case not found' });
    }

    const evidence = await store.getEvidence(id);
    const entities = await store.getEntities(id);
    const events = await store.getTimelineEvents(id);
    const inconsistencies = await store.getInconsistencies(id);

    return res.json({
      success: true,
      case: {
        ...c,
        stats: {
          evidenceCount: evidence.length,
          entityCount: entities.length,
          eventCount: events.length,
          inconsistencyCount: inconsistencies.length
        }
      }
    });
  } catch (err) {
    next(err);
  }
}

export async function createCase(req, res, next) {
  try {
    const { title, description } = req.body;
    const caseId = `CASE-2026-${String(Math.floor(Math.random() * 900) + 100)}`;
    const newCase = {
      caseId,
      title: title || 'New Synthetic Investigation',
      description: description || '',
      status: 'Active',
      incidentDate: new Date(),
      assignedAnalyst: 'Lead Analyst',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const saved = await store.createCase(newCase);
    await store.addAuditLog({
      caseId,
      action: 'CASE_CREATED',
      target: caseId,
      details: `Created new case: ${newCase.title}`
    });

    return res.status(201).json({ success: true, case: saved });
  } catch (err) {
    next(err);
  }
}

export async function updateCase(req, res, next) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updated = await store.updateCase(id, updates);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Case not found' });
    }

    await store.addAuditLog({
      caseId: id,
      action: 'CASE_MODIFIED',
      target: id,
      details: `Updated case fields: ${Object.keys(updates).join(', ')}`
    });

    return res.json({ success: true, case: updated });
  } catch (err) {
    next(err);
  }
}
