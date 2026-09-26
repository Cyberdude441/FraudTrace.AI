import { store } from '../services/store.js';
import { buildGraphPayload } from '../graph/graphEngine.js';

export async function getGraph(req, res, next) {
  try {
    const caseId = req.params.caseId || req.query.caseId || 'CASE-2026-001';
    const entities = await store.getEntities(caseId);
    const relationships = await store.getRelationships(caseId);
    const evidence = await store.getEvidence(caseId);

    const graph = buildGraphPayload(entities, relationships, evidence);

    return res.json({
      success: true,
      caseId,
      ...graph
    });
  } catch (err) {
    next(err);
  }
}
