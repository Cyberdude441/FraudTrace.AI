import React, { useState } from 'react';
import { 
  FileText, Play, Eye, FileSearch, ShieldCheck, 
  ArrowUpDown, Filter, CheckCircle2, AlertTriangle, Layers
} from 'lucide-react';
import { api } from '../../services/api.js';
import { useTraceSource } from '../../context/TraceSourceContext.jsx';
import { 
  formatBytes, formatDateTime, getCategoryBadgeStyle, getStatusBadgeStyle 
} from '../../utils/formatter.js';

export function EvidenceTable({ evidence = [], onEvidenceUpdated, onInspectEvidence }) {
  const { openTrace } = useTraceSource();
  const [processingId, setProcessingId] = useState(null);
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'ALL', 'Chat', 'Screenshot', 'Bank Record', 'Email', 
    'Call Log', 'Transaction', 'URL', 'Document', 'Other'
  ];
  const statuses = ['ALL', 'UPLOADED', 'PROCESSING', 'EXTRACTED', 'CORRELATED', 'REVIEW REQUIRED'];

  const filtered = evidence.filter(item => {
    if (filterCategory !== 'ALL' && item.category !== filterCategory) return false;
    if (filterStatus !== 'ALL' && item.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.filename.toLowerCase().includes(q);
      const matchId = item.evidenceId.toLowerCase().includes(q);
      const matchText = item.extractedText && item.extractedText.toLowerCase().includes(q);
      if (!matchName && !matchId && !matchText) return false;
    }
    return true;
  });

  const handleProcess = async (e, evidenceItem) => {
    e.stopPropagation();
    setProcessingId(evidenceItem.evidenceId);
    try {
      const res = await api.processEvidence(evidenceItem.evidenceId);
      if (res && res.success && onEvidenceUpdated) {
        onEvidenceUpdated(res.evidence);
      }
    } catch (err) {
      console.error('Processing error:', err);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="rounded-xl bg-dark-card/90 border border-white/10 overflow-hidden shadow-lg">
      {/* Table Filters Bar */}
      <div className="p-4 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-dark-surface/50">
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-dark-card border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-cyber-cyan focus:outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c === 'ALL' ? 'All Modalities' : c}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-dark-card border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-cyber-cyan focus:outline-none"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>{s === 'ALL' ? 'All Statuses' : s}</option>
            ))}
          </select>
        </div>

        {/* Search Filter */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by filename or ID..."
            className="px-3 py-1.5 rounded-lg bg-dark-card border border-white/10 text-xs text-white placeholder-dark-muted focus:border-cyber-cyan focus:outline-none w-56"
          />
          <span className="text-xs font-mono text-dark-muted whitespace-nowrap">
            Showing {filtered.length} of {evidence.length}
          </span>
        </div>
      </div>

      {/* Table Data */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-dark-surface/80 border-b border-white/10 text-dark-muted uppercase font-mono text-[10px]">
            <tr>
              <th className="py-3 px-4">Artifact ID & Name</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Size & Type</th>
              <th className="py-3 px-4">Ingestion Time</th>
              <th className="py-3 px-4">Pipeline Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-sans">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-dark-muted font-mono">
                  No evidence artifacts match the current filter selection.
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr 
                  key={item.evidenceId}
                  onClick={() => onInspectEvidence && onInspectEvidence(item)}
                  className="hover:bg-white/5 cursor-pointer transition-colors group"
                >
                  {/* Artifact ID & Filename */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-black/40 text-cyan-300 border border-white/5 flex-shrink-0">
                        {item.evidenceId}
                      </span>
                      <span className="font-semibold text-white group-hover:text-cyber-cyan transition-colors truncate max-w-xs sm:max-w-sm">
                        {item.filename}
                      </span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium border ${getCategoryBadgeStyle(item.category)}`}>
                      {item.category}
                    </span>
                  </td>

                  {/* Size & Type */}
                  <td className="py-3 px-4 font-mono text-slate-300">
                    <div>{formatBytes(item.fileSize)}</div>
                    <div className="text-[10px] text-dark-muted truncate max-w-[120px]">{item.type}</div>
                  </td>

                  {/* Timestamp */}
                  <td className="py-3 px-4 font-mono text-dark-muted text-[11px]">
                    {formatDateTime(item.uploadedAt)}
                  </td>

                  {/* Status */}
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider border ${getStatusBadgeStyle(item.status)}`}>
                      {item.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                      {/* Process Evidence Button */}
                      {item.status === 'UPLOADED' && (
                        <button
                          onClick={(e) => handleProcess(e, item)}
                          disabled={processingId === item.evidenceId}
                          className="px-2.5 py-1 rounded bg-cyber-cyan/15 hover:bg-cyber-cyan/30 text-cyber-cyan border border-cyber-cyan/40 font-semibold text-[11px] transition-colors flex items-center gap-1"
                          title="Extract OCR, entities, and normalize"
                        >
                          {processingId === item.evidenceId ? (
                            <div className="w-3 h-3 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Play className="w-3 h-3 fill-current" />
                          )}
                          <span>Process</span>
                        </button>
                      )}

                      {/* Trace to Source */}
                      <button
                        onClick={() => openTrace(item.evidenceId, { label: item.filename })}
                        className="px-2 py-1 rounded bg-black/40 hover:bg-white/10 text-cyan-400 border border-cyan-500/20 text-[11px] flex items-center gap-1 font-mono transition-colors"
                        title="View raw source grounding"
                      >
                        <FileSearch className="w-3 h-3" />
                        <span>Trace</span>
                      </button>

                      {/* Inspect Details */}
                      <button
                        onClick={() => onInspectEvidence && onInspectEvidence(item)}
                        className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                        title="Inspect artifact details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
