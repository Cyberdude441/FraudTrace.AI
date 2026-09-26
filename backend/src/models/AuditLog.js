import mongoose from 'mongoose';

const AuditLogSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  caseId: { type: String, default: 'CASE-2026-001' },
  actor: { type: String, default: 'Lead Analyst' },
  action: { type: String, required: true },
  target: { type: String, required: true },
  details: { type: mongoose.Schema.Types.Mixed, default: {} },
  ipAddress: { type: String, default: '127.0.0.1' }
});

export default mongoose.models.AuditLog || mongoose.model('AuditLog', AuditLogSchema);
