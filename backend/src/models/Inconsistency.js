import mongoose from 'mongoose';

const InconsistencySchema = new mongoose.Schema({
  caseId: { type: String, required: true },
  inconsistencyId: { type: String, required: true, unique: true },
  type: { 
    type: String, 
    required: true,
    enum: [
      'AMOUNT_MISMATCH', 'TIMESTAMP_MISMATCH', 'DUPLICATE_RECORD', 
      'CONFLICTING_IDENTIFIERS', 'MISSING_TRANSACTION_ID', 
      'UNMATCHED_TRANSACTION', 'CONFLICTING_ATTRIBUTES', 'BROKEN_RELATIONSHIP'
    ]
  },
  category: { 
    type: String, 
    enum: ['INCONSISTENCY', 'MISSING_INFO'],
    default: 'INCONSISTENCY'
  },
  severity: { 
    type: String, 
    enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
    default: 'MEDIUM'
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  evidenceIds: [{ type: String }],
  sourceDetails: [{
    evidenceId: String,
    label: String,
    value: String,
    location: String
  }],
  possibleExplanations: [{ type: String }],
  requiredAction: { type: String, default: 'Manual verification recommended' },
  resolutionStatus: { 
    type: String, 
    enum: ['OPEN', 'UNDER_REVIEW', 'RESOLVED', 'DISMISSED'], 
    default: 'OPEN' 
  },
  resolutionNotes: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Inconsistency || mongoose.model('Inconsistency', InconsistencySchema);
