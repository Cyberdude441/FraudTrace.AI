import mongoose from 'mongoose';

const TimelineEventSchema = new mongoose.Schema({
  caseId: { type: String, required: true },
  eventId: { type: String, required: true, unique: true },
  timestamp: { type: Date, required: true },
  displayTime: { type: String, required: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  confidence: { type: Number, default: 0.95 },
  epistemicType: { 
    type: String, 
    enum: ['FACT', 'EXTRACTED DATA', 'INFERENCE', 'UNCERTAINTY'],
    default: 'EXTRACTED DATA'
  },
  sourceEvidenceIds: [{ type: String }],
  entityIds: [{ type: String }],
  sourceLocation: { type: String, default: '' },
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.TimelineEvent || mongoose.model('TimelineEvent', TimelineEventSchema);
