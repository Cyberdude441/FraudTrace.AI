import React, { useState, useEffect } from 'react';
import { 
  Settings, Shield, Database, Cpu, Eye, EyeOff, 
  History, Server, CheckCircle2, AlertCircle, RefreshCw
} from 'lucide-react';
import { usePrivacy } from '../context/PrivacyContext.jsx';
import { useCase } from '../context/CaseContext.jsx';
import { api } from '../services/api.js';
import { formatDateTime } from '../utils/formatter.js';

export function SettingsPage() {
  const { privacyEnabled, options, toggleGlobalPrivacy, updateOption } = usePrivacy();
  const { currentCaseId } = useCase();
  const [auditLogs, setAuditLogs] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  const fetchLogs = async () => {
    try {
      setLoadingLogs(true);
      const res = await api.getAuditLogs(currentCaseId);
      if (res && res.logs) {
        setAuditLogs(res.logs);
      }
    } catch (err) {
      console.error('Failed to load audit logs:', err);
    } finally {
      setLoadingLogs(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [currentCaseId]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-2 border-b border-white/5">
        <h1 className="text-xl md:text-2xl font-black text-white font-mono tracking-tight">
          System Configuration & Forensic Audit Trail
        </h1>
        <p className="text-xs text-dark-muted font-mono mt-0.5">
          Privacy safeguards, database state, AI grounding pipelines, and chain-of-custody audit logs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Privacy Controls Panel */}
        <div className="p-5 rounded-xl bg-dark-card/90 border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-mono uppercase">Privacy Layer</h3>
                <p className="text-[11px] text-dark-muted font-mono">Real-time PII & identifier masking</p>
              </div>
            </div>

            <button
              onClick={toggleGlobalPrivacy}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider font-mono border transition-all ${
                privacyEnabled
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-dark-surface text-slate-300 border-white/10'
              }`}
            >
              {privacyEnabled ? 'ACTIVE: ON' : 'DISABLED: OFF'}
            </button>
          </div>

          <div className="space-y-2.5 text-xs">
            <label className="flex items-center justify-between p-2 rounded-lg bg-dark-surface/60 border border-white/5 cursor-pointer">
              <span className="text-slate-200">Mask Telephone Numbers (+91 XXXXXXX210)</span>
              <input
                type="checkbox"
                checked={options.phones}
                onChange={(e) => updateOption('phones', e.target.checked)}
                className="rounded bg-dark-bg border-white/20 text-cyber-cyan"
              />
            </label>

            <label className="flex items-center justify-between p-2 rounded-lg bg-dark-surface/60 border border-white/5 cursor-pointer">
              <span className="text-slate-200">Mask Bank Account Numbers (ACC-XXXXX-9104)</span>
              <input
                type="checkbox"
                checked={options.accounts}
                onChange={(e) => updateOption('accounts', e.target.checked)}
                className="rounded bg-dark-bg border-white/20 text-cyber-cyan"
              />
            </label>

            <label className="flex items-center justify-between p-2 rounded-lg bg-dark-surface/60 border border-white/5 cursor-pointer">
              <span className="text-slate-200">Mask Email Handles (s***o@example.test)</span>
              <input
                type="checkbox"
                checked={options.emails}
                onChange={(e) => updateOption('emails', e.target.checked)}
                className="rounded bg-dark-bg border-white/20 text-cyber-cyan"
              />
            </label>

            <label className="flex items-center justify-between p-2 rounded-lg bg-dark-surface/60 border border-white/5 cursor-pointer">
              <span className="text-slate-200">Mask UPI VPA Identifiers (su***@upi)</span>
              <input
                type="checkbox"
                checked={options.upis}
                onChange={(e) => updateOption('upis', e.target.checked)}
                className="rounded bg-dark-bg border-white/20 text-cyber-cyan"
              />
            </label>

            <label className="flex items-center justify-between p-2 rounded-lg bg-dark-surface/60 border border-white/5 cursor-pointer">
              <span className="text-slate-200">Mask Subject Full Names (S*** A***)</span>
              <input
                type="checkbox"
                checked={options.names}
                onChange={(e) => updateOption('names', e.target.checked)}
                className="rounded bg-dark-bg border-white/20 text-cyber-cyan"
              />
            </label>
          </div>
        </div>

        {/* Engine Architecture & Grounding State */}
        <div className="p-5 rounded-xl bg-dark-card/90 border border-white/10 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-mono uppercase">Forensic Engine Stack</h3>
              <p className="text-[11px] text-dark-muted font-mono">Runtime infrastructure status</p>
            </div>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-dark-surface/60 border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-dark-muted text-[10px] block">DATABASE REPOSITORY</span>
                <span className="text-white font-bold">MongoDB / Mongoose Dual Mode</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                ONLINE
              </span>
            </div>

            <div className="p-3 rounded-lg bg-dark-surface/60 border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-dark-muted text-[10px] block">AI RECONSTRUCTION PIPELINE</span>
                <span className="text-white font-bold">Deterministic Grounded Copilot</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                ACTIVE
              </span>
            </div>

            <div className="p-3 rounded-lg bg-dark-surface/60 border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-dark-muted text-[10px] block">GRAPH ABSTRACTION LAYER</span>
                <span className="text-white font-bold">React Flow + MongoDB Topology</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                SYNCHRONIZED
              </span>
            </div>

            <div className="p-3 rounded-lg bg-dark-surface/60 border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-dark-muted text-[10px] block">INTEGRITY SEALING</span>
                <span className="text-white font-bold">SHA-256 RFC-3161 Verification</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                SEALED
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Log Trail */}
      <div className="p-5 rounded-xl bg-dark-card/90 border border-white/10 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-mono uppercase">
                Chain-of-Custody Immutable Audit Trail
              </h3>
              <p className="text-[11px] text-dark-muted font-mono">
                Cryptographic session activity logs for legal admissibility
              </p>
            </div>
          </div>

          <button
            onClick={fetchLogs}
            className="p-1.5 rounded-lg bg-dark-surface hover:bg-white/10 text-slate-300 border border-white/10 transition-colors"
            title="Refresh logs"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-72 overflow-y-auto space-y-1.5 font-mono text-xs">
          {auditLogs.length === 0 ? (
            <div className="py-8 text-center text-dark-muted">No audit entries logged yet.</div>
          ) : (
            auditLogs.map((log, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-dark-surface/50 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]"
              >
                <div className="flex items-center gap-2">
                  <span className="text-dark-muted">{formatDateTime(log.timestamp)}</span>
                  <span className="px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-300 font-bold">
                    {log.action}
                  </span>
                  <span className="text-slate-300 truncate max-w-sm">
                    {log.target} · {typeof log.details === 'string' ? log.details : JSON.stringify(log.details)}
                  </span>
                </div>
                <div className="text-[10px] text-dark-muted flex-shrink-0">
                  Actor: <strong className="text-slate-300">{log.actor || 'Lead Analyst'}</strong>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
