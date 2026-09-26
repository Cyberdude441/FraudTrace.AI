import express from 'express';
import { getGraph } from '../controllers/graphController.js';

const router = express.Router();
router.get('/', getGraph);
router.get('/:caseId', getGraph);

export default router;
