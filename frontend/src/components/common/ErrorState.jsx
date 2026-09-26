import React from 'react';
import { AlertCircle } from 'lucide-react';

export function ErrorState({ title = 'Evidence processing failed', message = 'Please retry or verify data integrity.', onRetry }) {
  return (
    <div className="p-6 rounded-xl bg-rose-950/20 border border-rose-500/30 text-center my-4">
      <div className="flex justify-center mb-2">
        <div className="p-2.5 rounded-full bg-rose-500/10 text-rose-400">
          <AlertCircle className="w-6 h-6" />
        </div>
      </div>
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

export default ErrorState;
