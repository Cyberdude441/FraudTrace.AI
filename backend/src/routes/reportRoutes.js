import express from 'express';
import { generateReport, getReports, getReportById } from '../controllers/reportController.js';

const router = express.Router();
router.post('/generate', generateReport);
router.get('/case/:caseId', getReports);
router.get('/:id', getReportById);

export default router;
