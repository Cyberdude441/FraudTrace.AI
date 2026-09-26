import mongoose from 'mongoose';

const EntitySchema = new mongoose.Schema({
  caseId: { type: String, required: true },
  entityId: { type: String, required: true, unique: true },
  type: { 
    type: String, 
    required: true,
    enum: [
      'PERSON', 'PHONE', 'EMAIL', 'URL', 'TRANSACTION', 
      'PAYMENT_ID', 'BANK_ACCOUNT', 'UPI_ID', 'LOCATION', 
      'ORGANIZATION', 'DEVICE', 'DATE', 'TIME', 'AMOUNT'
    ]
  },
  value: { type: String, required: true },
  normalizedValue: { type: String, required: true },
  confidence: { type: Number, default: 0.95 }, // 0 to 1
  epistemicType: { 
    type: String, 
    enum: ['FACT', 'EXTRACTED DATA', 'INFERENCE', 'UNCERTAINTY'],
    default: 'EXTRACTED DATA'
  },
  sourceEvidenceIds: [{ type: String }],
  occurrences: [{
    evidenceId: String,
    location: String,
    snippet: String,
    timestamp: String
  }],
  properties: { type: mongoose.Schema.Types.Mixed, default: {} },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Entity || mongoose.model('Entity', EntitySchema);
