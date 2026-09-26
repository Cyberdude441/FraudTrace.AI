import mongoose from 'mongoose';

const EvidenceSchema = new mongoose.Schema({
  caseId: { type: String, required: true },
  evidenceId: { type: String, required: true, unique: true },
  filename: { type: String, required: true },
  type: { type: String, required: true }, // MIME or extension
  category: { 
    type: String, 
    enum: ['Chat', 'Screenshot', 'Bank Record', 'Email', 'Call Log', 'Transaction', 'URL', 'Document', 'Other'], 
    default: 'Document' 
  },
  status: { 
    type: String, 
    enum: ['UPLOADED', 'PROCESSING', 'EXTRACTED', 'CORRELATED', 'REVIEW REQUIRED'], 
    default: 'UPLOADED' 
  },
  hash: { type: String, required: true },
  fileSize: { type: Number, default: 0 },
  uploadedAt: { type: Date, default: Date.now },
  processedAt: { type: Date },
  extractedText: { type: String, default: '' },
  structuredData: { type: mongoose.Schema.Types.Mixed, default: {} },
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} }
});

export default mongoose.models.Evidence || mongoose.model('Evidence', EvidenceSchema);
