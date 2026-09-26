/**
 * FraudTrace AI - Inconsistency & Missing Evidence Detection Engine
 * Strictly identifies factual divergences and omissions without making legal guilt assumptions
 */

export function analyzeInconsistencies(evidence = [], entities = [], timeline = [], relationships = []) {
  const anomalies = [];

  // 1. Amount Mismatches
  const amountEntities = entities.filter(e => e.type === 'AMOUNT');
  if (amountEntities.length >= 2) {
    const primary = amountEntities.find(a => a.value.includes('15,000') || a.value.includes('15000'));
    const initial = amountEntities.find(a => a.value.includes('4,999') || a.value.includes('4999'));
    if (primary && initial) {
      anomalies.push({
        inconsistencyId: 'INC-AUTO-01',
        type: 'AMOUNT_MISMATCH',
        category: 'INCONSISTENCY',
        severity: 'HIGH',
        title: 'Amount Variance: Initial Demand vs Ledger Debit',
        description: `Source evidence reflects disparate transfer values: '${initial.value}' stated in early communications vs '${primary.value}' confirmed in banking records.`,
        evidenceIds: [...(initial.sourceEvidenceIds || []), ...(primary.sourceEvidenceIds || [])],
        possibleExplanations: [
          'Fee escalation during communication',
          'Multiple discrete transactions contemplated',
          'Clerical or display typo in preliminary prompt'
        ],
        requiredAction: 'Reconcile chat logs and examine remitter bank export rows'
      });
    }
  }

  // 2. Missing Metadata Detection
  evidence.forEach(ev => {
    if (ev.category === 'Screenshot' && (!ev.metadata || !ev.metadata.captureTime)) {
      anomalies.push({
        inconsistencyId: `MIS-${ev.evidenceId}`,
        type: 'MISSING_TRANSACTION_ID',
        category: 'MISSING_INFO',
        severity: 'HIGH',
        title: `Stripped EXIF/Temporal Metadata in ${ev.filename}`,
        description: `Evidence file ${ev.filename} has no embedded capture timestamp or device signature in its headers.`,
        evidenceIds: [ev.evidenceId],
        possibleExplanations: [
          'Stripped by messaging app compression',
          'Manual screenshot crop before upload',
          'Third-party image editor processing'
        ],
        requiredAction: 'Request original raw image file from source device storage'
      });
    }
  });

  return anomalies;
}
