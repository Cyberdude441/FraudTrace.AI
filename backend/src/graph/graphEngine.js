/**
 * FraudTrace AI - Evidence Graph Engine
 * Transforms Entities and Relationships into React Flow graph topology
 */

export function buildGraphPayload(entities = [], relationships = [], evidenceList = []) {
  const entityMap = new Map();
  entities.forEach(ent => entityMap.set(ent.entityId, ent));

  // Compute degree of each entity to organize layout
  const degreeMap = new Map();
  relationships.forEach(rel => {
    degreeMap.set(rel.sourceEntityId, (degreeMap.get(rel.sourceEntityId) || 0) + 1);
    degreeMap.set(rel.targetEntityId, (degreeMap.get(rel.targetEntityId) || 0) + 1);
  });

  // Assign coordinates with cluster distribution based on entity types
  const typeAngles = {
    PERSON: 0,
    PHONE: 45,
    URL: 90,
    TRANSACTION: 135,
    AMOUNT: 180,
    BANK_ACCOUNT: 215,
    UPI_ID: 250,
    ORGANIZATION: 285,
    LOCATION: 320,
    DEVICE: 345,
    DATE: 30,
    TIME: 60,
    PAYMENT_ID: 160
  };

  const nodes = entities.map((ent, idx) => {
    const angle = ((typeAngles[ent.type] || (idx * 360 / entities.length)) * Math.PI) / 180;
    // Central hub for highly connected nodes
    const degree = degreeMap.get(ent.entityId) || 1;
    const radius = degree > 4 ? 180 : 380 + (idx % 3) * 60;
    const x = Math.round(500 + radius * Math.cos(angle) + (idx % 4) * 20);
    const y = Math.round(350 + radius * Math.sin(angle) + (idx % 3) * 20);

    return {
      id: ent.entityId,
      type: 'entityNode',
      position: { x, y },
      data: {
        id: ent.entityId,
        label: ent.value,
        entityType: ent.type,
        normalizedValue: ent.normalizedValue,
        confidence: Math.round(ent.confidence * 100),
        epistemicType: ent.epistemicType,
        sourceEvidenceIds: ent.sourceEvidenceIds || [],
        sourceCount: ent.sourceEvidenceIds ? ent.sourceEvidenceIds.length : 0,
        properties: ent.properties || {},
        occurrences: ent.occurrences || []
      }
    };
  });

  const edges = relationships.map((rel, idx) => {
    const isConflict = rel.type === 'CONFLICTS_WITH';
    const isCorroborates = rel.type === 'CORROBORATES';

    let strokeColor = 'rgba(6, 182, 212, 0.4)'; // cyan default
    if (isConflict) strokeColor = '#ef4444'; // red warning
    else if (isCorroborates) strokeColor = '#10b981'; // green verified

    return {
      id: rel.relationshipId || `edge-${idx}`,
      source: rel.sourceEntityId,
      target: rel.targetEntityId,
      type: 'smoothstep',
      animated: isConflict || isCorroborates,
      label: rel.type.replace(/_/g, ' '),
      style: {
        stroke: strokeColor,
        strokeWidth: isConflict ? 3 : 2,
        strokeDasharray: isConflict ? '5 5' : undefined
      },
      data: {
        relationshipId: rel.relationshipId,
        type: rel.type,
        confidence: Math.round(rel.confidence * 100),
        reasons: rel.reasons || [],
        sourceEvidenceIds: rel.sourceEvidenceIds || []
      }
    };
  });

  return {
    nodes,
    edges,
    stats: {
      totalNodes: nodes.length,
      totalEdges: edges.length,
      conflictCount: edges.filter(e => e.data.type === 'CONFLICTS_WITH').length,
      corroboratedCount: edges.filter(e => e.data.type === 'CORROBORATES').length
    }
  };
}
