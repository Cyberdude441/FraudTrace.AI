import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingState({ message = 'Loading evidence intelligence...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="relative mb-4">
        <div className="w-12 h-12 rounded-full border-2 border-cyan-500/20 border-t-cyber-cyan animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-cyber-cyan/30 animate-ping" />
        </div>
      </div>
      <p className="text-sm font-mono text-slate-300 tracking-wide">{message}</p>
      <span className="text-xs text-dark-muted font-mono mt-1">Grounded Verification Pipeline</span>
    </div>
  );
}

export function EmptyState({ title = 'No records found', description = 'Try adjusting your filters or upload new evidence.', icon: Icon, actionButton }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-xl bg-dark-card/40 border border-white/5 my-4">
      {Icon && (
        <div className="p-3 rounded-full bg-white/5 text-dark-muted mb-3">
          <Icon className="w-6 h-6" />
        </div>
      )}
      <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
      <p className="text-xs text-dark-muted max-w-sm mb-4 leading-relaxed">{description}</p>
      {actionButton}
    </div>
  );
}

export function ErrorState({ title = 'Evidence processing failed', message = 'Please retry or verify data integrity.', onRetry }) {
  return (
    <div className="p-6 rounded-xl bg-rose-950/20 border border-rose-500/30 text-center my-4">
      <h4 className="text-sm font-bold text-rose-300 mb-1">{title}</h4>
      <p className="text-xs text-slate-300 max-w-md mx-auto mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-3.5 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-semibold border border-rose-500/40 transition-colors"
        >
          Retry Verification
        </button>
      )}
    </div>
  );
}
