import {
  MOCK_CASE,
  MOCK_EVIDENCE,
  MOCK_ENTITIES,
  MOCK_TIMELINE_EVENTS,
  MOCK_RELATIONSHIPS,
  MOCK_INCONSISTENCIES,
  MOCK_AUDIT_LOGS
} from '../data/mockData.js';

const API_BASE = '/api';

async function request(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      ...options
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || `API error ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.warn(`[API Fallback] Request to ${endpoint} failed (${err.message}). Using local client state.`);
    return fallbackResponse(endpoint, options);
  }
}

// Fallback provider in case backend is offline
function fallbackResponse(endpoint, options) {
  if (endpoint.startsWith('/cases')) {
    return { success: true, cases: [MOCK_CASE], case: MOCK_CASE };
  }
  if (endpoint.startsWith('/evidence/upload')) {
    const newEv = {
      evidenceId: `EVD-${String(MOCK_EVIDENCE.length + 1).padStart(3, '0')}`,
      caseId: 'CASE-2026-001',
      filename: 'uploaded_document.txt',
      type: 'text/plain',
      category: 'Document',
      status: 'UPLOADED',
      hash: 'local-sha256-hash-verified',
      fileSize: 1024,
      uploadedAt: new Date()
    };
    return { success: true, evidence: newEv };
  }
  if (endpoint.includes('/process')) {
    return { success: true, message: 'Processed via client mock engine' };
  }
  if (endpoint.startsWith('/evidence')) {
    return { success: true, count: MOCK_EVIDENCE.length, evidence: MOCK_EVIDENCE };
  }
  if (endpoint.startsWith('/entities')) {
    return { success: true, count: MOCK_ENTITIES.length, entities: MOCK_ENTITIES };
  }
  if (endpoint.startsWith('/timeline')) {
    return { success: true, events: MOCK_TIMELINE_EVENTS, timeSpan: {} };
  }
  if (endpoint.startsWith('/inconsistencies')) {
    return {
      success: true,
      inconsistencies: MOCK_INCONSISTENCIES.filter(i => i.category === 'INCONSISTENCY'),
      missingInfo: MOCK_INCONSISTENCIES.filter(i => i.category === 'MISSING_INFO')
    };
  }
  if (endpoint.startsWith('/graph')) {
    return {
      success: true,
      nodes: MOCK_ENTITIES.map(e => ({
        id: e.entityId,
        type: 'entityNode',
        position: { x: Math.random() * 800, y: Math.random() * 600 },
        data: { label: e.value, entityType: e.type, confidence: Math.round(e.confidence * 100), sourceCount: (e.sourceEvidenceIds || []).length }
      })),
      edges: MOCK_RELATIONSHIPS.map(r => ({
        id: r.relationshipId,
        source: r.sourceEntityId,
        target: r.targetEntityId,
        label: r.type,
        data: { confidence: Math.round(r.confidence * 100) }
      }))
    };
  }
  if (endpoint.startsWith('/ai/query')) {
    return {
      success: true,
      result: {
        answer: "The records indicate that an unauthorized debit of ₹15,000 occurred at 10:40:12 AM IST via UPI to beneficiary handle 'subject.demo@upi'.",
        evidenceBasis: [
          { evidenceId: 'EVD-003', filename: 'bank_statement_september.csv', citation: 'Row 27: INR 15,000.00 DR' },
          { evidenceId: 'EVD-004', filename: 'payment_success_screenshot.jpg', citation: 'Payment success screen' }
        ],
        confidenceContext: 'High',
        confidenceScore: 0.98,
        reasoning: "Corroborated across statement and screenshot.",
        limitations: "4m 48s clock discrepancy noted."
      }
    };
  }
  if (endpoint.startsWith('/reports/generate')) {
    return {
      success: true,
      report: {
        reportId: `RPT-${Date.now().toString(36).toUpperCase()}`,
        caseId: 'CASE-2026-001',
        title: 'Forensic Reconstruction Report: Operation Digital Mirage',
        generatedAt: new Date(),
        sections: {
          incidentOverview: { summary: "Incident reconstruction summary...", dateRange: "2026-09-25", sourceReferences: ['EVD-001', 'EVD-003'] },
          evidenceInventory: { totalArtifacts: 42, integrityStatus: "100% Cryptographically Verified" },
          extractedEntities: { totalExtracted: 27 },
          chronologicalTimeline: { eventCount: 31 },
          transactionSummary: { debitedAmount: "₹15,000.00", beneficiaryVpa: "subject.demo@upi" },
          communicationSummary: { messagingAppSender: "+91 9876543210" },
          evidenceCorrelations: { totalRelationships: 63, averageConfidence: "93.4%" },
          evidenceGraphSummary: { centralHubs: ["+91 9876543210", "TXN-99482109"] },
          inconsistencies: { detectedCount: 5 },
          missingInformation: { detectedCount: 7 },
          sourceReferences: { primaryLedger: "bank_statement_september.csv (Row 27)" },
          aiAnalysis: { narrativeReconstruction: "Multi-tier social engineering sequence..." },
          limitations: { disclaimer: "Analytical prototype reconstruction tool using synthetic test data." },
          reviewNotes: { reviewStatus: "Under Review by Lead Forensic Analyst" }
        }
      }
    };
  }
  return { success: true };
}

export const api = {
  // Auth
  login: (email, password, demoMode) => request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password, demoMode })
  }),

  // Cases
  getCases: () => request('/cases'),
  getCaseById: (id) => request(`/cases/${id}`),
  createCase: (data) => request('/cases', { method: 'POST', body: JSON.stringify(data) }),
  updateCase: (id, updates) => request(`/cases/${id}`, { method: 'PATCH', body: JSON.stringify(updates) }),

  // Evidence
  getEvidence: (caseId, category, status) => {
    const params = new URLSearchParams();
    if (caseId) params.append('caseId', caseId);
    if (category) params.append('category', category);
    if (status) params.append('status', status);
    return request(`/evidence?${params.toString()}`);
  },
  getEvidenceById: (id) => request(`/evidence/${id}`),
  uploadEvidence: async (formData) => {
    try {
      const res = await fetch(`${API_BASE}/evidence/upload`, {
        method: 'POST',
        body: formData
      });
      return await res.json();
    } catch {
      return fallbackResponse('/evidence/upload', {});
    }
  },
  processEvidence: (id) => request(`/evidence/${id}/process`, { method: 'POST' }),

  // Entities
  getEntities: (caseId, type) => {
    const params = new URLSearchParams();
    if (caseId) params.append('caseId', caseId);
    if (type) params.append('type', type);
    return request(`/entities?${params.toString()}`);
  },
  getEntityById: (id) => request(`/entities/${id}`),

  // Graph
  getGraph: (caseId) => request(`/graph/${caseId}`),

  // Timeline
  getTimeline: (caseId) => request(`/timeline/${caseId}`),

  // Inconsistencies
  getInconsistencies: (caseId) => request(`/inconsistencies/${caseId}`),
  updateInconsistency: (id, data) => request(`/inconsistencies/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  }),

  // Reports
  generateReport: (caseId) => request('/reports/generate', {
    method: 'POST',
    body: JSON.stringify({ caseId })
  }),
  getReports: (caseId) => request(`/reports/case/${caseId}`),
  getReportById: (id) => request(`/reports/${id}`),

  // AI
  queryAI: (query, caseId) => request('/ai/query', {
    method: 'POST',
    body: JSON.stringify({ query, caseId })
  }),

  // Audit & Search
  getAuditLogs: (caseId) => request(`/audit/${caseId}`),
  globalSearch: (q, caseId) => request(`/audit/search?q=${encodeURIComponent(q)}&caseId=${caseId}`)
};
