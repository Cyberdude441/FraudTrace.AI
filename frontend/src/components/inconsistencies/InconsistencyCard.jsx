import React, { useState } from 'react';
import { 
  AlertTriangle, CheckCircle2, Clock, FileSearch, 
  ArrowRight, ShieldAlert, HelpCircle
} from 'lucide-react';
import { useTraceSource } from '../../context/TraceSourceContext.jsx';
import { SourceReference } from '../common/SourceReference.jsx';
import { api } from '../../services/api.js';
import { BionicText } from '../accessibility/BionicText.jsx';

export function InconsistencyCard({ item, onStatusUpdated }) {
  const { openTrace } = useTraceSource();
  const [status, setStatus] = useState(item.resolutionStatus || 'OPEN');
  const [updating, setUpdating] = useState(false);

  const getSeverityStyle = (sev) => {
    switch (sev) {
      case 'CRITICAL':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'HIGH':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'MEDIUM':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/40';
    }
  };

  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus);
    setUpdating(true);
    try {
      await api.updateInconsistency(item.inconsistencyId, {
        resolutionStatus: newStatus,
        resolutionNotes: `Status updated by analyst to ${newStatus}`
      });
      if (onStatusUpdated) onStatusUpdated();
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="p-5 rounded-xl bg-dark-card/90 border border-amber-500/30 shadow-lg space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider border ${getSeverityStyle(item.severity)}`}>
                {item.severity} SEVERITY
              </span>
              <span className="font-mono text-[11px] text-dark-muted">
                {item.inconsistencyId}
              </span>
            </div>
            <h3 className="text-sm font-bold text-white tracking-tight mt-0.5">
              {item.title}
            </h3>
          </div>
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-dark-muted">Status:</span>
          <select
            value={status}
            disabled={updating}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="bg-dark-surface border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white focus:border-cyber-cyan focus:outline-none"
          >
            <option value="OPEN">OPEN</option>
            <option value="UNDER_REVIEW">UNDER REVIEW</option>
            <option value="RESOLVED">RESOLVED</option>
            <option value="DISMISSED">DISMISSED</option>
          </select>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-300 leading-relaxed">
        <BionicText>{item.description}</BionicText>
      </p>

      {/* Side-by-Side Conflicting Sources Matrix */}
      {item.sourceDetails && item.sourceDetails.length > 0 && (
        <div className="p-3.5 rounded-lg bg-black/40 border border-white/5 space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-dark-muted font-bold block">
            Divergent Source Observations:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {item.sourceDetails.map((src, idx) => (
              <div 
                key={idx}
                onClick={() => openTrace(src.evidenceId, { label: src.label, snippet: src.value, location: src.location })}
                className="p-2.5 rounded bg-dark-card/60 hover:bg-dark-card border border-white/5 hover:border-cyan-500/30 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-dark-muted mb-1">
                  <span>{src.evidenceId}</span>
                  <span className="text-cyan-400 flex items-center gap-0.5">
                    Trace <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-slate-300 block truncate">
                  {src.label}
                </span>
                <span className="text-xs font-mono font-bold text-amber-300 block mt-1">
                  "{src.value}"
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Possible Explanations */}
      {item.possibleExplanations && item.possibleExplanations.length > 0 && (
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-dark-muted font-semibold block">
            Plausible Hypothesis Explanations:
          </span>
          <ul className="space-y-1 text-xs text-slate-300 font-sans pl-1">
            {item.possibleExplanations.map((exp, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-cyan-400 font-mono text-xs">•</span>
                <span>{exp}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Required Action Callout */}
      <div className="p-3 rounded-lg bg-cyan-950/20 border border-cyan-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div>
          <span className="text-cyan-400 font-bold uppercase font-mono tracking-wider block text-[10px]">
            Required Investigative Action:
          </span>
          <span className="text-slate-200">
            {item.requiredAction}
          </span>
        </div>

        <button
          onClick={() => openTrace(item.evidenceIds?.[0], { label: item.title, snippet: item.description })}
          className="px-3 py-1.5 rounded-lg bg-cyber-cyan/15 hover:bg-cyber-cyan/30 text-cyber-cyan border border-cyber-cyan/40 font-semibold font-mono text-[11px] flex items-center gap-1.5 flex-shrink-0 transition-colors"
        >
          <FileSearch className="w-3.5 h-3.5" />
          <span>TRACE DISCREPANCY</span>
        </button>
      </div>
    </div>
  );
}
