import { store } from '../services/store.js';
import { buildTimeline } from '../timeline/timelineEngine.js';

export async function getTimeline(req, res, next) {
  try {
    const caseId = req.params.caseId || req.query.caseId || 'CASE-2026-001';
    const rawEvents = await store.getTimelineEvents(caseId);
    const entities = await store.getEntities(caseId);
    const evidence = await store.getEvidence(caseId);

    const timeline = buildTimeline(rawEvents, entities, evidence);

    return res.json({
      success: true,
      caseId,
      ...timeline
    });
  } catch (err) {
    next(err);
  }
}
