import React, { useState, useRef, useEffect } from 'react';
import { Eye, EyeOff, Shield, ChevronDown } from 'lucide-react';
import { usePrivacy } from '../../context/PrivacyContext.jsx';

export function PrivacyToggle() {
  const { privacyEnabled, options, toggleGlobalPrivacy, updateOption } = usePrivacy();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div className="inline-flex rounded-lg shadow-sm border border-white/10 bg-dark-card/90 overflow-hidden">
        <button
          onClick={toggleGlobalPrivacy}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold tracking-wide transition-all ${
            privacyEnabled 
              ? 'bg-amber-500/20 text-amber-300 border-r border-amber-500/30' 
              : 'text-slate-300 hover:bg-white/5 border-r border-white/10'
          }`}
          title="Toggle Privacy Masking Mode"
        >
          {privacyEnabled ? (
            <>
              <EyeOff className="w-3.5 h-3.5 text-amber-400" />
              <span>PRIVACY ON</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              <span>PRIVACY OFF</span>
            </>
          )}
        </button>

        <button
          onClick={() => setDropdownOpen(prev => !prev)}
          className="px-1.5 py-1.5 text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          title="Configure Privacy Masking Filters"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl bg-dark-surface border border-white/10 shadow-2xl p-3 z-50 glass-dropdown">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-amber-400" /> Privacy Masking Rules
            </span>
            <span className="text-[10px] font-mono text-dark-muted">GDPR/DPDP</span>
          </div>

          <div className="space-y-2 text-xs">
            <label className="flex items-center justify-between cursor-pointer py-1 px-1.5 rounded hover:bg-white/5">
              <span className="text-slate-300">Mask Phone Numbers</span>
              <input
                type="checkbox"
                checked={options.phones}
                onChange={(e) => updateOption('phones', e.target.checked)}
                className="rounded bg-dark-bg border-white/20 text-cyber-cyan focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer py-1 px-1.5 rounded hover:bg-white/5">
              <span className="text-slate-300">Mask Bank Accounts</span>
              <input
                type="checkbox"
                checked={options.accounts}
                onChange={(e) => updateOption('accounts', e.target.checked)}
                className="rounded bg-dark-bg border-white/20 text-cyber-cyan focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer py-1 px-1.5 rounded hover:bg-white/5">
              <span className="text-slate-300">Mask Email Addresses</span>
              <input
                type="checkbox"
                checked={options.emails}
                onChange={(e) => updateOption('emails', e.target.checked)}
                className="rounded bg-dark-bg border-white/20 text-cyber-cyan focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer py-1 px-1.5 rounded hover:bg-white/5">
              <span className="text-slate-300">Mask UPI Identifiers</span>
              <input
                type="checkbox"
                checked={options.upis}
                onChange={(e) => updateOption('upis', e.target.checked)}
                className="rounded bg-dark-bg border-white/20 text-cyber-cyan focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer py-1 px-1.5 rounded hover:bg-white/5">
              <span className="text-slate-300">Mask Subject Names</span>
              <input
                type="checkbox"
                checked={options.names}
                onChange={(e) => updateOption('names', e.target.checked)}
                className="rounded bg-dark-bg border-white/20 text-cyber-cyan focus:ring-0"
              />
            </label>
          </div>

          <div className="mt-3 pt-2 border-t border-white/10 text-[11px] text-dark-muted">
            Applied to dashboards, graphs, timelines, and report exports.
          </div>
        </div>
      )}
    </div>
  );
}
