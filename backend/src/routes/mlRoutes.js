/**
 * FraudTrace AI - ML Routes
 */

import { Router } from 'express';
import { getMLHealth, postAnalyzeEvent } from '../controllers/mlController.js';

const router = Router();

router.get('/health', getMLHealth);
router.post('/analyze-event', postAnalyzeEvent);

export default router;
