import express from 'express';
import { getCases, getCaseById, createCase, updateCase } from '../controllers/caseController.js';

const router = express.Router();
router.get('/', getCases);
router.post('/', createCase);
router.get('/:id', getCaseById);
router.patch('/:id', updateCase);

export default router;
