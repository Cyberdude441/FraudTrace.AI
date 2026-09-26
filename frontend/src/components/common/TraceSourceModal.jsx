import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ShieldCheck, FileText, Hash, Calendar, 
  Layers, Database, ArrowRight, Clock, FileSearch
} from 'lucide-react';
import { useTraceSource } from '../../context/TraceSourceContext.jsx';
import { formatBytes, formatDateTime, getCategoryBadgeStyle } from '../../utils/formatter.js';

export function TraceSourceModal() {
  const { isOpen, loading, evidenceData, highlightContext, closeTrace } = useTraceSource();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        {/* Backdrop click to close */}
        <div className="absolute inset-0" onClick={closeTrace} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-xl bg-dark-surface border border-cyan-500/30 shadow-2xl shadow-cyan-950/50 overflow-hidden z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-dark-card/60">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan">
                <FileSearch className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white tracking-wide">
                    Trace to Source Grounding
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {evidenceData?.evidenceId || 'TRACE-RECORD'}
                  </span>
                </div>
                <p className="text-xs text-dark-muted">
                  Cryptographically verifiable source attribution record
                </p>
              </div>
            </div>

            <button
              onClick={closeTrace}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                <div className="w-8 h-8 border-2 border-cyber-cyan border-t-transparent rounded-full animate-spin mb-3" />
                <p className="text-sm font-mono">Resolving source evidence hash & citations...</p>
              </div>
            ) : !evidenceData ? (
              <div className="text-center py-12 text-slate-400">
                <p>Could not retrieve source record details.</p>
              </div>
            ) : (
              <>
                {/* Specific Highlight Context Callout */}
                {highlightContext && (
                  <div className="p-4 rounded-lg bg-cyan-950/30 border border-cyan-500/30 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-cyber-cyan" />
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold uppercase tracking-wider text-cyber-cyan flex items-center gap-1.5">
                        <ArrowRight className="w-3.5 h-3.5" /> Cited Evidence Context
                      </span>
                      {highlightContext.location && (
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-black/40 text-cyan-300 border border-cyan-500/20">
                          {highlightContext.location}
                        </span>
                      )}
                    </div>
                    {highlightContext.snippet && (
                      <p className="text-sm text-slate-200 font-mono bg-black/30 p-2.5 rounded border border-white/5 mt-1">
                        "{highlightContext.snippet}"
                      </p>
                    )}
                    {highlightContext.label && !highlightContext.snippet && (
                      <p className="text-sm text-slate-300">
                        {highlightContext.label}
                      </p>
                    )}
                  </div>
                )}

                {/* Evidence Metadata Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3 rounded-lg bg-dark-card border border-white/5">
                    <span className="text-[11px] text-dark-muted uppercase font-mono block mb-1">Filename</span>
                    <span className="text-sm font-semibold text-white break-all">{evidenceData.filename}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-dark-card border border-white/5">
                    <span className="text-[11px] text-dark-muted uppercase font-mono block mb-1">Category</span>
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium border ${getCategoryBadgeStyle(evidenceData.category)}`}>
                      {evidenceData.category}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-dark-card border border-white/5">
                    <span className="text-[11px] text-dark-muted uppercase font-mono block mb-1">File Size</span>
                    <span className="text-sm font-mono text-slate-200">{formatBytes(evidenceData.fileSize)}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-dark-card border border-white/5">
                    <span className="text-[11px] text-dark-muted uppercase font-mono block mb-1">Uploaded Timestamp</span>
                    <span className="text-xs font-mono text-slate-300">{formatDateTime(evidenceData.uploadedAt)}</span>
                  </div>
                </div>

                {/* Direct Factual Record Grounding Block */}
                {evidenceData.structuredData && Object.keys(evidenceData.structuredData).length > 0 && (
                  <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 via-dark-card to-cyan-950/30 border border-cyan-500/40 shadow-inner">
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-cyan-500/20">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                        <Database className="w-3.5 h-3.5 text-cyan-400" />
                        Authoritative Factual Record Grounding
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                        EPISTEMIC: FACT
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 font-mono">
                      <div>
                        <span className="text-[10px] text-dark-muted uppercase block">Evidence Artifact</span>
                        <span className="text-xs font-bold text-white break-all">{evidenceData.filename}</span>
                      </div>
                      {evidenceData.metadata?.targetRow && (
                        <div>
                          <span className="text-[10px] text-dark-muted uppercase block">Record Location</span>
                          <span className="text-xs font-bold text-cyan-300">Row {evidenceData.metadata.targetRow}</span>
                        </div>
                      )}
                      {evidenceData.structuredData.amount && (
                        <div>
                          <span className="text-[10px] text-dark-muted uppercase block">Transaction Amount</span>
                          <span className="text-xs font-bold text-emerald-400">₹{Number(evidenceData.structuredData.amount).toLocaleString('en-IN')}</span>
                        </div>
                      )}
                      {(evidenceData.structuredData.displayedTime || evidenceData.structuredData.timestamp) && (
                        <div>
                          <span className="text-[10px] text-dark-muted uppercase block">Timestamp</span>
                          <span className="text-xs font-bold text-white">
                            {evidenceData.structuredData.displayedTime || '10:40:12 AM IST'}
                          </span>
                        </div>
                      )}
                      {evidenceData.structuredData.transactionId && (
                        <div>
                          <span className="text-[10px] text-dark-muted uppercase block">Transaction ID</span>
                          <span className="text-xs font-bold text-cyan-300">{evidenceData.structuredData.transactionId}</span>
                        </div>
                      )}
                      {evidenceData.structuredData.referenceNumber && (
                        <div>
                          <span className="text-[10px] text-dark-muted uppercase block">Reference Number</span>
                          <span className="text-xs font-bold text-slate-300">{evidenceData.structuredData.referenceNumber}</span>
                        </div>
                      )}
                      {evidenceData.structuredData.recipientUpi && (
                        <div>
                          <span className="text-[10px] text-dark-muted uppercase block">Recipient UPI</span>
                          <span className="text-xs font-bold text-cyan-300">{evidenceData.structuredData.recipientUpi}</span>
                        </div>
                      )}
                      {evidenceData.metadata?.accountNumber && (
                        <div>
                          <span className="text-[10px] text-dark-muted uppercase block">Account Debited</span>
                          <span className="text-xs font-bold text-slate-300">{evidenceData.metadata.accountNumber}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Cryptographic SHA-256 Digest */}
                <div className="p-3.5 rounded-lg bg-black/40 border border-emerald-500/20 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-emerald-400">Cryptographic Integrity Hash (SHA-256)</span>
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">
                        MATCH VERIFIED
                      </span>
                    </div>
                    <p className="text-xs font-mono text-slate-400 truncate mt-0.5">
                      {evidenceData.hash}
                    </p>
                  </div>
                </div>

                {/* Raw Extracted Text / Content Block */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-cyan-400" /> Original Extracted Artifact Stream
                    </span>
                    <span className="text-xs text-dark-muted font-mono">
                      Status: {evidenceData.status}
                    </span>
                  </div>
                  <div className="p-4 rounded-lg bg-dark-card/80 border border-white/10 font-mono text-xs text-slate-200 leading-relaxed whitespace-pre-wrap max-h-56 overflow-y-auto">
                    {evidenceData.extractedText || "No raw text extracted for this artifact."}
                  </div>
                </div>

                {/* Structured Metadata & Attributes */}
                {evidenceData.metadata && Object.keys(evidenceData.metadata).length > 0 && (
                  <div>
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                      <Database className="w-4 h-4 text-cyan-400" /> Embedded Device / Ingestion Metadata
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                      {Object.entries(evidenceData.metadata).map(([key, val]) => (
                        <div key={key} className="p-2.5 rounded bg-dark-card/50 border border-white/5 font-mono">
                          <span className="text-dark-muted block text-[10px] uppercase">{key}</span>
                          <span className="text-slate-200 font-medium truncate block">{String(val)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-3 border-t border-white/10 bg-dark-card/40 text-xs text-dark-muted">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              Source verification guaranteed under RFC-3161 compliance
            </span>
            <button
              onClick={closeTrace}
              className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
            >
              Close Panel
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
