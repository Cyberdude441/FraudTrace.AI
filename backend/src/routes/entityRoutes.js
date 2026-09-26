import express from 'express';
import { getEntities, getEntityById } from '../controllers/entityController.js';

const router = express.Router();
router.get('/', getEntities);
router.get('/:id', getEntityById);

export default router;
