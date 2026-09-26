import express from 'express';
import { queryAI } from '../controllers/aiController.js';

const router = express.Router();
router.post('/query', queryAI);

export default router;
