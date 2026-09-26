import { store } from '../services/store.js';
import { queryEvidenceCopilot } from '../ai/aiEngine.js';

export async function queryAI(req, res, next) {
  try {
    const { query, caseId } = req.body;
    if (!query) {
      return res.status(400).json({ success: false, message: 'Query is required' });
    }

    const cid = caseId || 'CASE-2026-001';
    const evidence = await store.getEvidence(cid);
    const entities = await store.getEntities(cid);
    const timeline = await store.getTimelineEvents(cid);
    const inconsistencies = await store.getInconsistencies(cid);

    const result = await queryEvidenceCopilot(query, {
      evidence,
      entities,
      timeline,
      inconsistencies
    });

    await store.addAuditLog({
      caseId: cid,
      actor: 'ANALYST_COPILOT',
      action: 'COPILOT_QUERY',
      target: 'EVIDENCE_ASSISTANT',
      details: `Asked: "${query.substring(0, 60)}..."`
    });

    return res.json({
      success: true,
      query,
      result,
      ...result
    });
  } catch (err) {
    next(err);
  }
}
