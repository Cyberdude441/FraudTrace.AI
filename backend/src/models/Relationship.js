import mongoose from 'mongoose';

const RelationshipSchema = new mongoose.Schema({
  caseId: { type: String, required: true },
  relationshipId: { type: String, required: true, unique: true },
  sourceEntityId: { type: String, required: true },
  targetEntityId: { type: String, required: true },
  type: { 
    type: String, 
    required: true,
    enum: [
      'MENTIONED_IN', 'ASSOCIATED_WITH', 'REFERENCES', 'MATCHES', 
      'PRECEDES', 'FOLLOWS', 'CONTAINS', 'POSSIBLY_SAME_AS', 
      'DERIVED_FROM', 'CORROBORATES', 'CONFLICTS_WITH'
    ]
  },
  confidence: { type: Number, default: 0.90 },
  reasons: [{ type: String }],
  sourceEvidenceIds: [{ type: String }],
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Relationship || mongoose.model('Relationship', RelationshipSchema);
