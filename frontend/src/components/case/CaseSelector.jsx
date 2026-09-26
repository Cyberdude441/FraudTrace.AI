import React, { useState } from 'react';
import { Briefcase, ChevronDown, Plus, Check } from 'lucide-react';
import { useCase } from '../../context/CaseContext.jsx';

export function CaseSelector() {
  const { currentCaseId, currentCase, cases, selectCase, createNewCase } = useCase();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    await createNewCase(newTitle, newDesc);
    setNewTitle('');
    setNewDesc('');
    setShowNewModal(false);
    setDropdownOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(prev => !prev)}
        className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-dark-card border border-white/10 hover:border-cyan-500/40 text-xs transition-colors"
      >
        <Briefcase className="w-4 h-4 text-cyber-cyan" />
        <div className="text-left">
          <span className="text-[10px] text-dark-muted font-mono uppercase block leading-none">Active Dossier</span>
          <span className="font-semibold text-white truncate max-w-[140px] sm:max-w-[200px] block leading-tight">
            {currentCase?.title || currentCaseId}
          </span>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
      </button>

      {dropdownOpen && (
        <div className="absolute left-0 mt-2 w-80 rounded-xl bg-dark-surface border border-white/10 shadow-2xl p-2 z-50 glass-dropdown">
          <div className="px-2 py-1.5 border-b border-white/10 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Cases</span>
            <button
              onClick={() => {
                setShowNewModal(true);
                setDropdownOpen(false);
              }}
              className="inline-flex items-center gap-1 text-[11px] text-cyber-cyan hover:underline"
            >
              <Plus className="w-3 h-3" /> New Case
            </button>
          </div>

          <div className="max-h-60 overflow-y-auto py-1 space-y-1">
            {cases.map((c) => (
              <div
                key={c.caseId}
                onClick={() => {
                  selectCase(c.caseId);
                  setDropdownOpen(false);
                }}
                className={`p-2 rounded-lg cursor-pointer flex items-center justify-between text-xs transition-colors ${
                  c.caseId === currentCaseId ? 'bg-cyan-500/15 border border-cyan-500/30 text-white' : 'hover:bg-white/5 text-slate-300'
                }`}
              >
                <div>
                  <div className="font-semibold flex items-center gap-1.5">
                    <span>{c.title}</span>
                    <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-black/40 text-cyan-400">
                      {c.caseId}
                    </span>
                  </div>
                  <div className="text-[11px] text-dark-muted mt-0.5">
                    {c.stats?.evidenceCount ?? 42} items · {c.stats?.entityCount ?? 27} entities · {c.status || 'Under Review'}
                  </div>
                </div>
                {c.caseId === currentCaseId && (
                  <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Case Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl bg-dark-surface border border-white/10 p-5 glass-panel-elevated">
            <h3 className="text-base font-bold text-white mb-2">Create New Investigation Case</h3>
            <p className="text-xs text-dark-muted mb-4">
              Initialize a synthetic dossier for evidence ingestion and reconstruction.
            </p>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="text-xs text-slate-300 block mb-1">Case Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Operation PhishLine"
                  className="w-full px-3 py-2 rounded-lg bg-dark-card border border-white/10 text-white text-xs focus:border-cyber-cyan focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Preliminary investigation scope..."
                  className="w-full px-3 py-2 rounded-lg bg-dark-card border border-white/10 text-white text-xs focus:border-cyber-cyan focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-cyber-cyan hover:bg-cyan-400 text-black transition-colors"
                >
                  Create Dossier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
