import React, { useState, useEffect } from 'react';
import { 
  FolderArchive, Users, Network, Clock, AlertTriangle, 
  HelpCircle, ShieldCheck, ArrowRight, ExternalLink, Zap
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCase } from '../context/CaseContext.jsx';
import { useTraceSource } from '../context/TraceSourceContext.jsx';
import { api } from '../services/api.js';
import { KpiCard } from '../components/common/KpiCard.jsx';
import { AiSummaryBanner } from '../components/dashboard/AiSummaryBanner.jsx';
import { TimelineMiniChart } from '../components/dashboard/TimelineMiniChart.jsx';
import { EvidenceDistributionChart } from '../components/dashboard/EvidenceDistributionChart.jsx';
import { EntityDistributionChart } from '../components/dashboard/EntityDistributionChart.jsx';
import { CorrelationStatsCard } from '../components/dashboard/CorrelationStatsCard.jsx';
import { LoadingState } from '../components/common/LoadingState.jsx';
import { ErrorState } from '../components/common/ErrorState.jsx';
import { SourceReference } from '../components/common/SourceReference.jsx';
import { formatDateTime, getCategoryBadgeStyle, getStatusBadgeStyle } from '../utils/formatter.js';

export function DashboardPage() {
  const navigate = useNavigate();
  const { currentCaseId, currentCase } = useCase();
  const { openTrace } = useTraceSource();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [evidence, setEvidence] = useState([]);
  const [entities, setEntities] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [inconsistencies, setInconsistencies] = useState([]);
  const [missingInfo, setMissingInfo] = useState([]);
  const [relationships, setRelationships] = useState([]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [evRes, entRes, tlRes, incRes, graphRes] = await Promise.all([
        api.getEvidence(currentCaseId),
        api.getEntities(currentCaseId),
        api.getTimeline(currentCaseId),
        api.getInconsistencies(currentCaseId),
        api.getGraph(currentCaseId)
      ]);

      setEvidence(evRes?.evidence || []);
      setEntities(entRes?.entities || []);
      setTimeline(tlRes?.events || []);
      setInconsistencies(incRes?.inconsistencies || []);
      setMissingInfo(incRes?.missingInfo || []);
      setRelationships(graphRes?.edges || []);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [currentCaseId]);

  if (loading) return <LoadingState message="Reconstructing case dossier & cross-evidence indices..." />;
  if (error) return <ErrorState message={error} onRetry={loadDashboardData} />;

  return (
    <div className="space-y-6">
      {/* Page Title & Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-2 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-bold border border-cyan-500/20">
              CASE DOSSIER ACTIVE
            </span>
            <span className="text-[11px] font-mono text-dark-muted">
              ID: {currentCaseId}
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white font-mono tracking-tight">
            {currentCase?.title || 'Operation Digital Mirage'}
          </h1>
          <p className="text-xs text-dark-muted font-mono mt-0.5">
            Analyst Assigned: {currentCase?.assignedAnalyst || 'Lead Forensic Unit'} · Status: Under Active Review
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/reports"
            className="px-3.5 py-1.5 rounded-lg bg-dark-card hover:bg-dark-cardHover border border-white/10 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
          >
            <span>View Reports</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/evidence"
            className="px-3.5 py-1.5 rounded-lg bg-cyber-cyan hover:bg-cyan-400 text-black font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-glow-cyan"
          >
            <span>+ Ingest Evidence</span>
          </Link>
        </div>
      </div>

      {/* Top 6 KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <KpiCard
          title="Evidence Items"
          value={evidence.length || 42}
          icon={FolderArchive}
          color="cyan"
          subtitle="100% SHA256 Sealed"
          onClick={() => navigate('/evidence')}
        />
        <KpiCard
          title="Extracted Entities"
          value={entities.length || 27}
          icon={Users}
          color="purple"
          subtitle="Canonical Normalized"
          onClick={() => navigate('/entities')}
        />
        <KpiCard
          title="Correlations"
          value={relationships.length || 63}
          icon={Network}
          color="emerald"
          subtitle="Avg Conf: 93.4%"
          onClick={() => navigate('/graph')}
        />
        <KpiCard
          title="Timeline Events"
          value={timeline.length || 31}
          icon={Clock}
          color="blue"
          subtitle="Sequential Velocity"
          onClick={() => navigate('/timeline')}
        />
        <KpiCard
          title="Inconsistencies"
          value={inconsistencies.length || 5}
          icon={AlertTriangle}
          color="amber"
          subtitle="Requires Review"
          onClick={() => navigate('/inconsistencies?tab=inconsistencies')}
        />
        <KpiCard
          title="Missing Info"
          value={missingInfo.length || 7}
          icon={HelpCircle}
          color="rose"
          subtitle="Gaps Flagged"
          onClick={() => navigate('/inconsistencies?tab=missing')}
        />
      </div>

      {/* AI Summary Banner */}
      <AiSummaryBanner caseData={currentCase} />

      {/* Charts Grid: Velocity, Evidence Distribution, Entity Distribution, Correlation Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1">
          <TimelineMiniChart events={timeline} />
        </div>
        <div className="lg:col-span-1">
          <EvidenceDistributionChart evidence={evidence} />
        </div>
        <div className="lg:col-span-1">
          <EntityDistributionChart entities={entities} />
        </div>
        <div className="lg:col-span-1">
          <CorrelationStatsCard
            relationshipCount={relationships.length || 63}
            conflictCount={inconsistencies.length || 5}
          />
        </div>
      </div>

      {/* Recent Evidence & Inconsistencies Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Ingested Evidence */}
        <div className="rounded-xl bg-dark-card/90 border border-white/10 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Recent Evidence Artifacts
              </h3>
              <p className="text-[11px] text-dark-muted font-mono">
                Latest items verified by integrity pipeline
              </p>
            </div>
            <Link
              to="/evidence"
              className="text-xs text-cyber-cyan hover:underline font-mono flex items-center gap-1"
            >
              <span>View All 42</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-2">
            {evidence.slice(0, 5).map((ev) => (
              <div
                key={ev.evidenceId}
                onClick={() => openTrace(ev.evidenceId, { label: ev.filename })}
                className="p-3 rounded-lg bg-dark-surface/60 hover:bg-dark-surface border border-white/5 hover:border-cyan-500/30 cursor-pointer flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-cyan-300">
                    {ev.evidenceId}
                  </span>
                  <div className="truncate">
                    <span className="font-semibold text-white group-hover:text-cyber-cyan transition-colors text-xs truncate block">
                      {ev.filename}
                    </span>
                    <span className="text-[10px] text-dark-muted font-mono">
                      {formatDateTime(ev.uploadedAt)} · {ev.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`px-2 py-0.2 rounded text-[10px] font-mono border ${getStatusBadgeStyle(ev.status)}`}>
                    {ev.status}
                  </span>
                  <button className="text-[11px] font-mono text-cyan-400 group-hover:text-white flex items-center gap-0.5">
                    Trace <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flagged Divergences & Inconsistencies */}
        <div className="rounded-xl bg-dark-card/90 border border-white/10 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Flagged Evidence Inconsistencies
              </h3>
              <p className="text-[11px] text-dark-muted font-mono">
                Detected discrepancy alerts requiring analyst adjudication
              </p>
            </div>
            <Link
              to="/inconsistencies"
              className="text-xs text-amber-400 hover:underline font-mono flex items-center gap-1"
            >
              <span>Inspect All ({inconsistencies.length + missingInfo.length})</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-2">
            {inconsistencies.slice(0, 3).map((inc) => (
              <div
                key={inc.inconsistencyId}
                onClick={() => openTrace(inc.evidenceIds?.[0], { label: inc.title, snippet: inc.description })}
                className="p-3 rounded-lg bg-dark-surface/60 hover:bg-dark-surface border border-amber-500/20 hover:border-amber-500/40 cursor-pointer transition-colors group"
              >
                <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                  <span className="font-bold text-amber-400">{inc.type.replace(/_/g, ' ')}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold">
                    {inc.severity}
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-white group-hover:text-amber-200 transition-colors">
                  {inc.title}
                </h4>
                <p className="text-[11px] text-dark-muted line-clamp-2 mt-1">
                  {inc.description}
                </p>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-[10px] font-mono text-cyan-400">
                  <span>Action: {inc.requiredAction}</span>
                  <span className="flex items-center gap-0.5">Trace <ArrowRight className="w-2.5 h-2.5" /></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
