import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  AlertTriangle, HelpCircle, RefreshCw, ShieldAlert, 
  CheckCircle2, Clock, Filter
} from 'lucide-react';
import { useCase } from '../context/CaseContext.jsx';
import { api } from '../services/api.js';
import { InconsistencyCard } from '../components/inconsistencies/InconsistencyCard.jsx';
import { MissingInfoCard } from '../components/inconsistencies/MissingInfoCard.jsx';
import { LoadingState } from '../components/common/LoadingState.jsx';
import { ErrorState } from '../components/common/ErrorState.jsx';

export function InconsistenciesPage() {
  const { currentCaseId } = useCase();
  const [searchParams, setSearchParams] = useSearchParams();
  const [inconsistencies, setInconsistencies] = useState([]);
  const [missingInfo, setMissingInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(
    tabParam === 'missing' ? 'MISSING_INFO' : (tabParam === 'inconsistencies' ? 'INCONSISTENCIES' : 'ALL')
  );

  useEffect(() => {
    if (tabParam === 'missing') setActiveTab('MISSING_INFO');
    else if (tabParam === 'inconsistencies') setActiveTab('INCONSISTENCIES');
  }, [tabParam]);

  const fetchInconsistencies = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getInconsistencies(currentCaseId);
      if (res) {
        setInconsistencies(res.inconsistencies || []);
        setMissingInfo(res.missingInfo || []);
      }
    } catch (err) {
      console.error('Failed to load inconsistencies:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInconsistencies();
  }, [currentCaseId]);

  if (loading) return <LoadingState message="Auditing cross-evidence parity and gap detections..." />;
  if (error) return <ErrorState message={error} onRetry={fetchInconsistencies} />;

  const totalCount = inconsistencies.length + missingInfo.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-bold border border-amber-500/20">
              DISCREPANCY & AUDIT ENGINE
            </span>
            <span className="text-[11px] font-mono text-dark-muted">
              Total Flags: {totalCount}
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white font-mono tracking-tight">
            Inconsistency & Missing Information Engine
          </h1>
          <p className="text-xs text-dark-muted font-mono mt-0.5">
            Factual divergences, clock drifts, amount disparities, and missing investigative artifacts
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchInconsistencies}
            className="p-2 rounded-lg bg-dark-card border border-white/10 text-slate-300 hover:text-white transition-colors"
            title="Re-run discrepancy audit"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveTab('ALL')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
            activeTab === 'ALL'
              ? 'bg-cyber-cyan text-black shadow-glow-cyan'
              : 'text-slate-300 hover:bg-white/5'
          }`}
        >
          All Detected Flags ({totalCount})
        </button>

        <button
          onClick={() => setActiveTab('INCONSISTENCIES')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide flex items-center gap-1.5 transition-all ${
            activeTab === 'INCONSISTENCIES'
              ? 'bg-amber-500 text-black shadow-md'
              : 'text-amber-300 hover:bg-white/5'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Factual Inconsistencies ({inconsistencies.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('MISSING_INFO')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide flex items-center gap-1.5 transition-all ${
            activeTab === 'MISSING_INFO'
              ? 'bg-purple-500 text-white shadow-md'
              : 'text-purple-300 hover:bg-white/5'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Missing Information Records ({missingInfo.length})</span>
        </button>
      </div>

      {/* Items Container */}
      <div className="space-y-6">
        {/* Inconsistencies Section */}
        {(activeTab === 'ALL' || activeTab === 'INCONSISTENCIES') && (
          <div className="space-y-4">
            {activeTab === 'ALL' && (
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                <AlertTriangle className="w-4 h-4" />
                <span>Detected Inconsistencies ({inconsistencies.length})</span>
              </div>
            )}
            <div className="grid grid-cols-1 gap-4">
              {inconsistencies.map((item) => (
                <InconsistencyCard
                  key={item.inconsistencyId}
                  item={item}
                  onStatusUpdated={fetchInconsistencies}
                />
              ))}
            </div>
          </div>
        )}

        {/* Missing Information Section */}
        {(activeTab === 'ALL' || activeTab === 'MISSING_INFO') && (
          <div className="space-y-4">
            {activeTab === 'ALL' && (
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-purple-400 pt-4 border-t border-white/5">
                <HelpCircle className="w-4 h-4" />
                <span>Missing Information & Metadata Gaps ({missingInfo.length})</span>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {missingInfo.map((item) => (
                <MissingInfoCard
                  key={item.inconsistencyId}
                  item={item}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
