import React from 'react';
import { HelpCircle, AlertCircle, FileSearch, ArrowRight, ShieldCheck } from 'lucide-react';
import { useTraceSource } from '../../context/TraceSourceContext.jsx';
import { SourceReference } from '../common/SourceReference.jsx';

export function MissingInfoCard({ item }) {
  const { openTrace } = useTraceSource();

  return (
    <div className="p-4 rounded-xl bg-dark-card/80 border border-purple-500/30 hover:border-purple-500/50 transition-colors shadow-md space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-purple-500/15 text-purple-400 border border-purple-500/30">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 font-bold uppercase tracking-wider">
                MISSING INFORMATION
              </span>
              <span className="font-mono text-[11px] text-dark-muted">
                {item.inconsistencyId}
              </span>
            </div>
            <h4 className="text-xs font-bold text-white tracking-tight mt-0.5">
              {item.title}
            </h4>
          </div>
        </div>

        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30 w-fit">
          REVIEW REQUIRED
        </span>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed">
        {item.description}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5 text-[11px]">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono text-dark-muted uppercase">Linked Artifact:</span>
          {(item.evidenceIds || []).map((id) => (
            <SourceReference key={id} evidenceId={id} inline={true} />
          ))}
        </div>

        <button
          onClick={() => openTrace(item.evidenceIds?.[0], { label: item.title, snippet: item.description })}
          className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-cyber-cyan hover:text-cyan-300"
        >
          <span>INSPECT ARTIFACT</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
