import express from 'express';
import { getTimeline } from '../controllers/timelineController.js';

const router = express.Router();
router.get('/', getTimeline);
router.get('/:caseId', getTimeline);

export default router;
