/**
 * FraudTrace AI - Timeline Reconstruction Engine
 * Constructs and filters chronological evidence sequences with source traceability
 */

export function buildTimeline(events = [], entities = [], evidence = []) {
  const entityMap = new Map(entities.map(e => [e.entityId, e]));
  const evidenceMap = new Map(evidence.map(ev => [ev.evidenceId, ev]));

  const enrichedEvents = events.map(evt => {
    const linkedEntities = (evt.entityIds || []).map(id => entityMap.get(id)).filter(Boolean);
    const linkedEvidence = (evt.sourceEvidenceIds || []).map(id => evidenceMap.get(id)).filter(Boolean);

    return {
      ...evt,
      linkedEntities,
      linkedEvidence,
      sourceCount: (evt.sourceEvidenceIds || []).length
    };
  });

  // Sort strictly chronological
  enrichedEvents.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  return {
    events: enrichedEvents,
    timeSpan: {
      earliest: enrichedEvents[0] ? enrichedEvents[0].timestamp : null,
      latest: enrichedEvents[enrichedEvents.length - 1] ? enrichedEvents[enrichedEvents.length - 1].timestamp : null,
      totalEvents: enrichedEvents.length
    }
  };
}
