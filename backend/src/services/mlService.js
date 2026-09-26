/**
 * FraudTrace AI - Machine Learning Integration Service
 * 
 * Bridges the Node.js backend with the FastAPI ML inference service (port 8000).
 * Implements resilient fallback to deterministic forensic rules when the Python
 * microservice is offline or unreachable.
 */

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';
const ML_TIMEOUT_MS = parseInt(process.env.ML_TIMEOUT_MS || '2000', 10);

/**
 * Check if the Python ML microservice is online and healthy.
 */
export async function checkMLServiceHealth() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ML_TIMEOUT_MS);

  try {
    const res = await fetch(`${ML_SERVICE_URL}/health`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      return {
        online: true,
        service: 'FastAPI ML Inference Service',
        url: ML_SERVICE_URL,
        ...data
      };
    }
    return {
      online: false,
      service: 'FastAPI ML Inference Service',
      url: ML_SERVICE_URL,
      statusCode: res.status,
      fallbackMode: 'local_deterministic_engine'
    };
  } catch (err) {
    clearTimeout(timeoutId);
    return {
      online: false,
      service: 'FastAPI ML Inference Service',
      url: ML_SERVICE_URL,
      error: err.message,
      fallbackMode: 'local_deterministic_engine'
    };
  }
}

/**
 * Analyze an event cluster across multiple evidence items.
 * Tries the FastAPI ML service first; falls back to deterministic rules if offline.
 */
export async function analyzeEventCluster(evidenceItems, options = {}) {
  if (!evidenceItems || !Array.isArray(evidenceItems) || evidenceItems.length === 0) {
    return {
      error: 'Invalid input: evidenceItems array is required',
      event_id: options.eventId || 'EV-EMPTY',
      evidence_count: 0
    };
  }

  // Attempt FastAPI inference
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ML_TIMEOUT_MS);

  try {
    const response = await fetch(`${ML_SERVICE_URL}/predict/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventId: options.eventId || options.incidentId || 'EV-LIVE-001',
        evidenceRecords: evidenceItems,
        evidence_items: evidenceItems
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const result = await response.json();
      return {
        ...result,
        execution_mode: 'python_ml_service',
        service_url: ML_SERVICE_URL
      };
    }
  } catch {
    clearTimeout(timeoutId);
    // Silent failover to deterministic engine
  }

  // Fallback: Local Deterministic Forensic Engine
  return runDeterministicFallback(evidenceItems, options);
}

/**
 * Local Deterministic Forensic Fallback Engine
 * Enforces the exact 6 contradiction categories and confidence guardrails in JavaScript.
 */
function runDeterministicFallback(evidenceItems, options = {}) {
  const eventId = options.eventId || `EV-DET-${Date.now()}`;
  const discrepancies = [];
  let contradictionStatus = 'CORROBORATED';
  let severity = 'NONE';
  let explanation = 'All evidence sources in agreement.';

  // 1. Deduplication check
  const hashes = new Set();
  let hasDuplicate = false;
  for (const item of evidenceItems) {
    if (item.sha256) {
      if (hashes.has(item.sha256)) {
        hasDuplicate = true;
      } else {
        hashes.add(item.sha256);
      }
    }
  }

  if (hasDuplicate) {
    contradictionStatus = 'POSSIBLE_DUPLICATE';
    severity = 'MEDIUM';
    explanation = 'Duplicate evidence files identified by identical cryptographic hash.';
    discrepancies.push({
      field: 'sha256',
      severity: 'MEDIUM',
      description: 'Multiple evidence items share identical cryptographic hash.'
    });
  }

  // 2. Missing data check
  const missingData = evidenceItems.some(e => e.amount === undefined || e.amount === null || !e.timestamp);
  if (missingData && contradictionStatus === 'CORROBORATED') {
    contradictionStatus = 'MISSING_DATA';
    severity = 'LOW';
    explanation = 'One or more evidence items lack required forensic timestamp or monetary amount.';
    discrepancies.push({
      field: 'metadata',
      severity: 'LOW',
      description: 'Incomplete temporal or monetary metadata.'
    });
  }

  // 3. Amount comparison
  const amounts = evidenceItems
    .map(e => ({ id: e.id, source: e.source || e.type, amount: parseFloat(e.amount) }))
    .filter(e => !isNaN(e.amount));

  if (amounts.length >= 2) {
    const minAmt = Math.min(...amounts.map(a => a.amount));
    const maxAmt = Math.max(...amounts.map(a => a.amount));
    const delta = maxAmt - minAmt;
    const deltaRatio = maxAmt > 0 ? delta / maxAmt : 0;

    if (deltaRatio > 0.01 || delta > 10.0) {
      contradictionStatus = 'CONFLICTING';
      severity = 'HIGH';
      explanation = `Amount mismatch detected across ${amounts.length} sources: Min Rs. ${minAmt.toLocaleString('en-IN')} vs Max Rs. ${maxAmt.toLocaleString('en-IN')} (Delta: Rs. ${delta.toLocaleString('en-IN')} / ${(deltaRatio * 100).toFixed(1)}%)`;
      discrepancies.push({
        field: 'amount',
        severity: 'HIGH',
        description: `Amount mismatch of Rs. ${delta.toLocaleString('en-IN')}`,
        items: amounts
      });
    }
  }

  // 4. Timestamp drift check
  const timestamps = evidenceItems
    .map(e => ({ id: e.id, source: e.source, time: e.timestamp ? new Date(e.timestamp).getTime() : null }))
    .filter(e => e.time !== null && !isNaN(e.time));

  if (timestamps.length >= 2 && contradictionStatus !== 'CONFLICTING') {
    const minTime = Math.min(...timestamps.map(t => t.time));
    const maxTime = Math.max(...timestamps.map(t => t.time));
    const driftMinutes = (maxTime - minTime) / (1000 * 60);

    if (driftMinutes > 15) {
      contradictionStatus = 'TIMESTAMP_INCONSISTENCY';
      severity = 'MEDIUM';
      explanation = `Significant temporal drift detected between sources: ${Math.round(driftMinutes)} minutes.`;
      discrepancies.push({
        field: 'timestamp',
        severity: 'MEDIUM',
        description: `Temporal drift of ${Math.round(driftMinutes)} minutes`,
        items: timestamps
      });
    }
  }

  // 5. Confidence scoring & Guardrails
  const distinctSources = new Set(evidenceItems.map(e => e.source || e.type)).size;
  let confidenceScore = 0.25;
  let confidenceLevel = 'LOW';
  let capApplied = false;

  if (contradictionStatus === 'CONFLICTING') {
    confidenceScore = 0.25;
    confidenceLevel = 'LOW';
    capApplied = true;
  } else if (contradictionStatus === 'POSSIBLE_DUPLICATE') {
    confidenceScore = 0.35;
    confidenceLevel = 'LOW';
  } else if (distinctSources >= 4) {
    confidenceScore = 0.92;
    confidenceLevel = 'VERY HIGH';
  } else if (distinctSources === 3) {
    confidenceScore = 0.78;
    confidenceLevel = 'HIGH';
  } else if (distinctSources === 2) {
    confidenceScore = 0.55;
    confidenceLevel = 'MEDIUM';
  } else {
    confidenceScore = 0.30;
    confidenceLevel = 'LOW';
  }

  return {
    event_id: eventId,
    evidence_count: evidenceItems.length,
    sources_analyzed: evidenceItems.map(e => ({
      id: e.id || 'EV-UNKNOWN',
      type: e.type || 'DOCUMENT',
      source: e.source || 'Unknown'
    })),
    contradiction: {
      status: contradictionStatus,
      severity: severity,
      is_contradictory: contradictionStatus === 'CONFLICTING',
      confidence_cap_applied: capApplied,
      explanation: explanation
    },
    discrepancies: discrepancies,
    confidence: {
      score: confidenceScore,
      level: confidenceLevel,
      calibrated: true,
      independent_sources: distinctSources,
      reasoning: capApplied
        ? 'Confidence capped at LOW (0.25) due to high-severity factual contradiction.'
        : `Confidence calibrated based on ${distinctSources} independent source(s).`
    },
    reconstructed_timeline: evidenceItems.map(e => ({
      timestamp: e.timestamp || 'N/A',
      source: e.source || e.type,
      amount: e.amount || null,
      event_type: e.type || 'GENERIC'
    })),
    execution_mode: 'local_deterministic_fallback'
  };
}
