import { store } from '../services/store.js';

export async function getAuditLogs(req, res, next) {
  try {
    const caseId = req.params.caseId || req.query.caseId || 'CASE-2026-001';
    const logs = await store.getAuditLogs(caseId);
    return res.json({ success: true, count: logs.length, logs });
  } catch (err) {
    next(err);
  }
}

export async function globalSearch(req, res, next) {
  try {
    const { q, caseId } = req.query;
    const cid = caseId || 'CASE-2026-001';
    const results = await store.searchAll(cid, q);
    return res.json({ success: true, query: q, results });
  } catch (err) {
    next(err);
  }
}
