import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
  caseId: { type: String, required: true },
  reportId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  generatedAt: { type: Date, default: Date.now },
  generatedBy: { type: String, default: 'FraudTrace AI Autonomous Engine' },
  privacyMasked: { type: Boolean, default: false },
  sections: {
    incidentOverview: { type: mongoose.Schema.Types.Mixed },
    evidenceInventory: { type: mongoose.Schema.Types.Mixed },
    extractedEntities: { type: mongoose.Schema.Types.Mixed },
    chronologicalTimeline: { type: mongoose.Schema.Types.Mixed },
    transactionSummary: { type: mongoose.Schema.Types.Mixed },
    communicationSummary: { type: mongoose.Schema.Types.Mixed },
    evidenceCorrelations: { type: mongoose.Schema.Types.Mixed },
    evidenceGraphSummary: { type: mongoose.Schema.Types.Mixed },
    inconsistencies: { type: mongoose.Schema.Types.Mixed },
    missingInformation: { type: mongoose.Schema.Types.Mixed },
    sourceReferences: { type: mongoose.Schema.Types.Mixed },
    aiAnalysis: { type: mongoose.Schema.Types.Mixed },
    limitations: { type: mongoose.Schema.Types.Mixed },
    reviewNotes: { type: mongoose.Schema.Types.Mixed }
  },
  exportFormatsAvailable: [{ type: String, default: ['PDF', 'JSON', 'CSV'] }]
});

export default mongoose.models.Report || mongoose.model('Report', ReportSchema);
