import { store } from '../services/store.js';
import { generateIncidentReport } from '../reports/reportGenerator.js';

export async function generateReport(req, res, next) {
  try {
    const { caseId } = req.body;
    const cid = caseId || 'CASE-2026-001';

    const caseData = await store.getCaseById(cid) || { caseId: cid, title: 'Operation Digital Mirage' };
    const evidence = await store.getEvidence(cid);
    const entities = await store.getEntities(cid);
    const timeline = await store.getTimelineEvents(cid);
    const relationships = await store.getRelationships(cid);
    const inconsistencies = await store.getInconsistencies(cid);

    const report = generateIncidentReport(
      caseData,
      evidence,
      entities,
      timeline,
      relationships,
      inconsistencies
    );

    const saved = await store.addReport(report);

    await store.addAuditLog({
      caseId: cid,
      action: 'REPORT_GENERATED',
      target: report.reportId,
      details: `Generated incident report: ${report.title}`
    });

    return res.status(201).json({ success: true, report: saved });
  } catch (err) {
    next(err);
  }
}

export async function getReports(req, res, next) {
  try {
    const { caseId } = req.params;
    const reports = await store.getReports(caseId);
    return res.json({ success: true, count: reports.length, reports });
  } catch (err) {
    next(err);
  }
}

export async function getReportById(req, res, next) {
  try {
    const { id } = req.params;
    const report = await store.getReportById(id);
    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }
    return res.json({ success: true, report });
  } catch (err) {
    next(err);
  }
}
