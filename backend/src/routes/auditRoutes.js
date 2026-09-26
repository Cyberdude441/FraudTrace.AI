import express from 'express';
import { getAuditLogs, globalSearch } from '../controllers/auditController.js';

const router = express.Router();
router.get('/search', globalSearch);
router.get('/', getAuditLogs);
router.get('/:caseId', getAuditLogs);

export default router;
