import express from 'express';
import { getInconsistencies, updateInconsistency } from '../controllers/inconsistencyController.js';

const router = express.Router();
router.get('/', getInconsistencies);
router.get('/:caseId', getInconsistencies);
router.patch('/:id', updateInconsistency);

export default router;
