import { store } from '../services/store.js';

export async function getEntities(req, res, next) {
  try {
    const { caseId, type } = req.query;
    let list = await store.getEntities(caseId);

    if (type && type !== 'ALL') {
      list = list.filter(e => e.type === type);
    }

    return res.json({ success: true, count: list.length, entities: list });
  } catch (err) {
    next(err);
  }
}

export async function getEntityById(req, res, next) {
  try {
    const { id } = req.params;
    const entity = await store.getEntityById(id);
    if (!entity) {
      return res.status(404).json({ success: false, message: 'Entity not found' });
    }

    // Retrieve associated evidence objects
    const allEvidence = await store.getEvidence(entity.caseId);
    const sourceEvidence = allEvidence.filter(ev =>
      entity.sourceEvidenceIds && entity.sourceEvidenceIds.includes(ev.evidenceId)
    );

    // Retrieve related relationships
    const allRel = await store.getRelationships(entity.caseId);
    const relatedRelationships = allRel.filter(r =>
      r.sourceEntityId === entity.entityId || r.targetEntityId === entity.entityId
    );

    // Retrieve timeline events
    const allEvents = await store.getTimelineEvents(entity.caseId);
    const timelineEvents = allEvents.filter(t =>
      t.entityIds && t.entityIds.includes(entity.entityId)
    );

    return res.json({
      success: true,
      entity,
      sourceEvidence,
      relatedRelationships,
      timelineEvents
    });
  } catch (err) {
    next(err);
  }
}
