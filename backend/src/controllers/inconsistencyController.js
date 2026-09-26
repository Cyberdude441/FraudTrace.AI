import { store } from '../services/store.js';

export async function getInconsistencies(req, res, next) {
  try {
    const caseId = req.params.caseId || req.query.caseId || 'CASE-2026-001';
    const list = await store.getInconsistencies(caseId);

    const inconsistencies = list.filter(item => item.category === 'INCONSISTENCY');
    const missingInfo = list.filter(item => item.category === 'MISSING_INFO');

    return res.json({
      success: true,
      caseId,
      totalCount: list.length,
      inconsistenciesCount: inconsistencies.length,
      missingInfoCount: missingInfo.length,
      inconsistencies,
      missingInfo
    });
  } catch (err) {
    next(err);
  }
}

export async function updateInconsistency(req, res, next) {
  try {
    const { id } = req.params;
    const { resolutionStatus, resolutionNotes } = req.body;

    const updated = await store.updateInconsistency(id, {
      resolutionStatus,
      resolutionNotes
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Inconsistency item not found' });
    }

    await store.addAuditLog({
      caseId: updated.caseId,
      action: 'INCONSISTENCY_RESOLVED',
      target: id,
      details: `Updated status to ${resolutionStatus}: ${resolutionNotes || 'No notes'}`
    });

    return res.json({ success: true, inconsistency: updated });
  } catch (err) {
    next(err);
  }
}
