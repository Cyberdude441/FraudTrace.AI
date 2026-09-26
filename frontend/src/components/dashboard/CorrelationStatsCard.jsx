import React from 'react';
import { Network, CheckCircle2, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CorrelationStatsCard({ relationshipCount = 63, conflictCount = 5 }) {
  return (
    <div className="p-4 rounded-xl bg-dark-card/80 border border-white/10 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Network className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
                Correlation Topology
              </h3>
              <p className="text-[11px] text-dark-muted font-mono">
                Relational multi-hop graph statistics
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 font-bold border border-emerald-500/30">
            93.4% AVG CONFIDENCE
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 my-3">
          <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
            <span className="text-[10px] text-dark-muted font-mono block">Synthesized Edges</span>
            <span className="text-xl font-bold font-mono text-white">{relationshipCount}</span>
            <span className="text-[10px] text-emerald-400 font-mono block mt-0.5">✓ Full Source Proof</span>
          </div>

          <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
            <span className="text-[10px] text-dark-muted font-mono block">Divergence Flags</span>
            <span className="text-xl font-bold font-mono text-amber-400">{conflictCount}</span>
            <span className="text-[10px] text-amber-400 font-mono block mt-0.5">! Review Required</span>
          </div>
        </div>

        <div className="space-y-1.5 text-xs text-slate-300">
          <div className="flex items-center justify-between py-1 border-b border-white/5">
            <span className="text-dark-muted font-mono text-[11px]">Primary Nexus Node</span>
            <span className="font-mono text-cyan-300 font-medium">+91 9876543210</span>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-white/5">
            <span className="text-dark-muted font-mono text-[11px]">Corroborated Transaction</span>
            <span className="font-mono text-white font-medium">TXN-99482109 (₹15,000)</span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-dark-muted font-mono text-[11px]">Geographic Convergence</span>
            <span className="font-mono text-white font-medium">Bhubaneswar (4 Sources)</span>
          </div>
        </div>
      </div>

      <div className="pt-3 mt-2 border-t border-white/10">
        <Link
          to="/graph"
          className="w-full py-1.5 px-3 rounded-lg bg-cyber-cyan/15 hover:bg-cyber-cyan/25 text-cyber-cyan font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors border border-cyber-cyan/30"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Launch Interactive Evidence Graph</span>
        </Link>
      </div>
    </div>
  );
}
