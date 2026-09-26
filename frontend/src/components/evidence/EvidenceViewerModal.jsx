import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, FileText, Calendar, Database, Layers, ArrowRight, FileSearch } from 'lucide-react';
import { useTraceSource } from '../../context/TraceSourceContext.jsx';
import { formatBytes, formatDateTime, getCategoryBadgeStyle, getStatusBadgeStyle } from '../../utils/formatter.js';

export function EvidenceViewerModal({ evidence, onClose }) {
  const { openTrace } = useTraceSource();

  if (!evidence) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-xl bg-dark-surface border border-white/10 shadow-2xl overflow-hidden z-10 glass-panel-elevated"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-dark-card/60">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white font-mono">{evidence.filename}</h3>
                  <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-black/40 text-cyan-300">
                    {evidence.evidenceId}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`px-2 py-0.2 rounded text-[10px] font-medium border ${getCategoryBadgeStyle(evidence.category)}`}>
                    {evidence.category}
                  </span>
                  <span className={`px-2 py-0.2 rounded text-[10px] font-mono border ${getStatusBadgeStyle(evidence.status)}`}>
                    {evidence.status}
                  </span>
                </div>
              </div>
            </div>

            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
            {/* Metadata Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-2.5 rounded-lg bg-dark-card border border-white/5">
                <span className="text-[10px] text-dark-muted font-mono uppercase block">File Size</span>
                <span className="text-white font-mono font-medium">{formatBytes(evidence.fileSize)}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-dark-card border border-white/5">
                <span className="text-[10px] text-dark-muted font-mono uppercase block">MIME Type</span>
                <span className="text-white font-mono font-medium truncate block">{evidence.type}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-dark-card border border-white/5 col-span-2">
                <span className="text-[10px] text-dark-muted font-mono uppercase block">Ingestion Timestamp</span>
                <span className="text-white font-mono font-medium">{formatDateTime(evidence.uploadedAt)}</span>
              </div>
            </div>

            {/* Cryptographic SHA-256 Digest */}
            <div className="p-3 rounded-lg bg-black/40 border border-emerald-500/20 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <div className="overflow-hidden">
                <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold block">
                  SHA-256 Cryptographic Digest
                </span>
                <span className="text-slate-300 font-mono text-[11px] truncate block">
                  {evidence.hash}
                </span>
              </div>
            </div>

            {/* Extracted Stream Content */}
            <div>
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2 font-mono">
                Extracted Text & Stream Data
              </span>
              <div className="p-3.5 rounded-lg bg-dark-card border border-white/10 font-mono text-slate-200 leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
                {evidence.extractedText || "No text currently extracted. Click 'Process Evidence' to execute extraction."}
              </div>
            </div>

            {/* Structured Payload / Metadata */}
            {evidence.metadata && Object.keys(evidence.metadata).length > 0 && (
              <div>
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2 font-mono">
                  Extracted Header & EXIF Metadata
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(evidence.metadata).map(([key, val]) => (
                    <div key={key} className="p-2.5 rounded bg-dark-card/50 border border-white/5 font-mono">
                      <span className="text-dark-muted block text-[10px] uppercase">{key}</span>
                      <span className="text-slate-200 font-medium truncate block">{String(val)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-3 border-t border-white/10 bg-dark-card/40 text-xs">
            <button
              onClick={() => {
                onClose();
                openTrace(evidence.evidenceId, { label: evidence.filename });
              }}
              className="px-3 py-1.5 rounded-lg bg-cyber-cyan/15 hover:bg-cyber-cyan/25 text-cyber-cyan font-semibold border border-cyber-cyan/30 flex items-center gap-1.5 transition-colors"
            >
              <FileSearch className="w-3.5 h-3.5" />
              <span>Open Trace Grounding View</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
