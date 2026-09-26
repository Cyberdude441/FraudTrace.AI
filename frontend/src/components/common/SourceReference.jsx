import React from 'react';
import { ExternalLink, FileSearch } from 'lucide-react';
import { useTraceSource } from '../../context/TraceSourceContext.jsx';

export function SourceReference({
  evidenceId,
  label,
  location,
  snippet,
  inline = false,
  variant = 'badge' // 'badge' | 'button' | 'link'
}) {
  const { openTrace } = useTraceSource();

  const handleClick = (e) => {
    e.stopPropagation();
    openTrace(evidenceId, { label, location, snippet });
  };

  const displayText = label || (Array.isArray(evidenceId) ? `Sources (${evidenceId.length})` : evidenceId || 'Source');

  if (variant === 'button') {
    return (
      <button
        onClick={handleClick}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-cyber-cyan/10 hover:bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/30 transition-all duration-150 shadow-sm"
        title="Trace directly to source evidence"
      >
        <FileSearch className="w-3.5 h-3.5" />
        <span>TRACE TO SOURCE</span>
      </button>
    );
  }

  if (variant === 'link') {
    return (
      <button
        onClick={handleClick}
        className="inline-flex items-center gap-1 text-xs text-cyber-cyan hover:text-cyan-300 underline underline-offset-2 transition-colors"
        title="View underlying source record"
      >
        <span>{displayText}</span>
        <ExternalLink className="w-3 h-3" />
      </button>
    );
  }

  // Default Badge style
  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-dark-card hover:bg-dark-cardHover text-cyan-300 hover:text-white border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-150 ${inline ? 'my-0.5' : ''}`}
      title={`Trace to ${evidenceId || 'source'}`}
    >
      <FileSearch className="w-3 h-3 text-cyan-400" />
      <span>{displayText}</span>
    </button>
  );
}
