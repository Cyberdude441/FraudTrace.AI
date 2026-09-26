import React, { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, User, Clock, AlertTriangle, ArrowRight, CornerDownLeft } from 'lucide-react';
import { api } from '../../services/api.js';
import { useCase } from '../../context/CaseContext.jsx';
import { useTraceSource } from '../../context/TraceSourceContext.jsx';
import { useNavigate } from 'react-router-dom';

export function SearchBar() {
  const { currentCaseId } = useCase();
  const { openTrace } = useTraceSource();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  // Keyboard shortcut listener (Cmd/Ctrl + K)
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults(null);
    }
  }, [isOpen]);

  // Live search debounce
  useEffect(() => {
    if (!query.trim()) {
      setResults(null);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.globalSearch(query, currentCaseId);
        if (res && res.results) {
          setResults(res.results);
        }
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query, currentCaseId]);

  return (
    <>
      {/* Trigger Button in Navbar */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-between w-48 sm:w-64 px-3 py-1.5 rounded-lg bg-dark-card/90 border border-white/10 hover:border-cyan-500/40 text-dark-muted hover:text-white transition-all text-xs"
      >
        <span className="flex items-center gap-2">
          <Search className="w-3.5 h-3.5 text-cyan-400" />
          <span>Search case dossier...</span>
        </span>
        <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono bg-black/40 text-slate-400 border border-white/10">
          Ctrl K
        </kbd>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

          <div className="relative w-full max-w-2xl rounded-xl bg-dark-surface border border-cyan-500/30 shadow-2xl overflow-hidden z-10 glass-panel-elevated">
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3 border-b border-white/10 bg-dark-card/60">
              <Search className="w-5 h-5 text-cyber-cyan mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search evidence, phone numbers, UPI handles, amounts, entities..."
                className="w-full bg-transparent text-sm text-white placeholder-dark-muted focus:outline-none"
              />
              {query && (
                <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-white mr-2">
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/30 text-slate-400 border border-white/10">
                ESC
              </kbd>
            </div>

            {/* Results Area */}
            <div className="max-h-96 overflow-y-auto p-4 space-y-4">
              {loading && (
                <div className="py-8 text-center text-xs text-dark-muted font-mono">
                  Scanning indexed repository...
                </div>
              )}

              {!loading && !query && (
                <div className="py-6 text-center text-xs text-dark-muted">
                  Type an entity name, transaction ID, phone number (+91...), or keyword to search across the active case.
                </div>
              )}

              {!loading && results && Object.values(results).every(arr => arr.length === 0) && (
                <div className="py-8 text-center text-xs text-dark-muted">
                  No records found matching "{query}".
                </div>
              )}

              {/* Evidence matches */}
              {results?.evidence?.length > 0 && (
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-2 block flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" /> Evidence Artifacts ({results.evidence.length})
                  </span>
                  <div className="space-y-1.5">
                    {results.evidence.map(ev => (
                      <div
                        key={ev.evidenceId}
                        onClick={() => {
                          setIsOpen(false);
                          openTrace(ev.evidenceId, { label: ev.filename });
                        }}
                        className="p-2.5 rounded-lg bg-dark-card/50 hover:bg-dark-card border border-white/5 hover:border-cyan-500/30 cursor-pointer flex items-center justify-between text-xs transition-colors"
                      >
                        <div>
                          <div className="font-semibold text-white flex items-center gap-2">
                            <span>{ev.filename}</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-300">
                              {ev.evidenceId}
                            </span>
                          </div>
                          <p className="text-[11px] text-dark-muted truncate max-w-md mt-0.5">
                            {ev.extractedText}
                          </p>
                        </div>
                        <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1">
                          Trace <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Entity matches */}
              {results?.entities?.length > 0 && (
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-semibold mb-2 block flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" /> Extracted Entities ({results.entities.length})
                  </span>
                  <div className="space-y-1.5">
                    {results.entities.map(ent => (
                      <div
                        key={ent.entityId}
                        onClick={() => {
                          setIsOpen(false);
                          navigate(`/entities`);
                        }}
                        className="p-2.5 rounded-lg bg-dark-card/50 hover:bg-dark-card border border-white/5 hover:border-purple-500/30 cursor-pointer flex items-center justify-between text-xs transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono px-1.5 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-300">
                            {ent.type}
                          </span>
                          <span className="font-medium text-white">{ent.value}</span>
                        </div>
                        <span className="text-[10px] font-mono text-dark-muted">
                          {ent.sourceEvidenceIds?.length || 0} sources
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Timeline matches */}
              {results?.timeline?.length > 0 && (
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-2 block flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Timeline Events ({results.timeline.length})
                  </span>
                  <div className="space-y-1.5">
                    {results.timeline.map(tl => (
                      <div
                        key={tl.eventId}
                        onClick={() => {
                          setIsOpen(false);
                          navigate(`/timeline`);
                        }}
                        className="p-2.5 rounded-lg bg-dark-card/50 hover:bg-dark-card border border-white/5 hover:border-emerald-500/30 cursor-pointer flex items-center justify-between text-xs transition-colors"
                      >
                        <div>
                          <span className="font-medium text-white">{tl.title}</span>
                          <span className="ml-2 text-[11px] font-mono text-emerald-400">{tl.displayTime}</span>
                        </div>
                        <span className="text-[10px] font-mono text-dark-muted">
                          {tl.sourceEvidenceIds?.length || 0} sources
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-4 py-2.5 border-t border-white/10 bg-dark-card/40 flex items-center justify-between text-[11px] text-dark-muted">
              <span>Press <kbd className="font-mono px-1 py-0.5 bg-black/40 rounded border border-white/10">ESC</kbd> to close</span>
              <span>Universal Cross-Evidence Retrieval</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
