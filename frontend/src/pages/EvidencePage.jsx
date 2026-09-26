import React, { useState, useEffect } from 'react';
import { 
  FolderArchive, UploadCloud, RefreshCw, Layers, 
  CheckCircle2, AlertTriangle, ShieldCheck
} from 'lucide-react';
import { useCase } from '../context/CaseContext.jsx';
import { api } from '../services/api.js';
import { UploadDropzone } from '../components/evidence/UploadDropzone.jsx';
import { EvidenceTable } from '../components/evidence/EvidenceTable.jsx';
import { EvidenceViewerModal } from '../components/evidence/EvidenceViewerModal.jsx';
import { LoadingState } from '../components/common/LoadingState.jsx';
import { ErrorState } from '../components/common/ErrorState.jsx';

export function EvidencePage() {
  const { currentCaseId } = useCase();
  const [evidenceList, setEvidenceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inspectedEvidence, setInspectedEvidence] = useState(null);
  const [showUploadZone, setShowUploadZone] = useState(false);

  const fetchEvidence = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getEvidence(currentCaseId);
      if (res && res.evidence) {
        setEvidenceList(res.evidence);
      }
    } catch (err) {
      console.error('Failed to load evidence:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvidence();
  }, [currentCaseId]);

  const handleUploadSuccess = (newEv) => {
    setEvidenceList(prev => [newEv, ...prev]);
  };

  const handleEvidenceUpdated = (updatedItem) => {
    setEvidenceList(prev => prev.map(e => e.evidenceId === updatedItem.evidenceId ? updatedItem : e));
  };

  if (loading) return <LoadingState message="Indexing evidence custody chain & SHA-256 seals..." />;
  if (error) return <ErrorState message={error} onRetry={fetchEvidence} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-bold border border-cyan-500/20">
              EVIDENCE CUSTODY REPOSITORY
            </span>
            <span className="text-[11px] font-mono text-dark-muted">
              Total Ingested: {evidenceList.length}
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white font-mono tracking-tight">
            Evidence Ingestion & Extraction Center
          </h1>
          <p className="text-xs text-dark-muted font-mono mt-0.5">
            Cryptographic RFC-3161 evidence vault for multi-modal forensic artifacts
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchEvidence}
            className="p-2 rounded-lg bg-dark-card border border-white/10 text-slate-300 hover:text-white transition-colors"
            title="Refresh repository"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowUploadZone(prev => !prev)}
            className="px-4 py-2 rounded-lg bg-cyber-cyan hover:bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider transition-colors shadow-glow-cyan flex items-center gap-1.5"
          >
            <UploadCloud className="w-4 h-4" />
            <span>{showUploadZone ? 'Hide Ingestion Zone' : '+ Ingest New Evidence'}</span>
          </button>
        </div>
      </div>

      {/* Upload Dropzone Collapse/Expand */}
      {showUploadZone && (
        <UploadDropzone onUploadSuccess={handleUploadSuccess} />
      )}

      {/* Primary Evidence Table */}
      <EvidenceTable
        evidence={evidenceList}
        onEvidenceUpdated={handleEvidenceUpdated}
        onInspectEvidence={(item) => setInspectedEvidence(item)}
      />

      {/* Evidence Inspection Modal */}
      {inspectedEvidence && (
        <EvidenceViewerModal
          evidence={inspectedEvidence}
          onClose={() => setInspectedEvidence(null)}
        />
      )}
    </div>
  );
}
