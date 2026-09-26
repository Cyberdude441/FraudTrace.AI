import mongoose from 'mongoose';

const CaseSchema = new mongoose.Schema({
  caseId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  status: { 
    type: String, 
    enum: ['Active', 'Under Review', 'Escalated', 'Archived'], 
    default: 'Under Review' 
  },
  incidentDate: { type: Date, default: Date.now },
  assignedAnalyst: { type: String, default: 'Lead Analyst' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Case || mongoose.model('Case', CaseSchema);
