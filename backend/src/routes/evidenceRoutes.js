import express from 'express';
import multer from 'multer';
import { getEvidence, getEvidenceById, uploadEvidence, processEvidence } from '../controllers/evidenceController.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 } // 20 MB max
});

const router = express.Router();
router.get('/', getEvidence);
router.post('/upload', upload.single('file'), uploadEvidence);
router.get('/:id', getEvidenceById);
router.post('/:id/process', processEvidence);

export default router;
