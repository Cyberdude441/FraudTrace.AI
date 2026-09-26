import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ShieldAlert, LayoutDashboard, FolderArchive, Clock, 
  Network, Users, AlertTriangle, FileText, Settings, Bot,
  ShieldCheck, HelpCircle, Sliders
} from 'lucide-react';
import { useCopilot } from '../../context/CopilotContext.jsx';
import { useAccessibility } from '../../context/AccessibilityContext.jsx';

export function Sidebar({ mobileOpen, onClose }) {
  const { toggleCopilot } = useCopilot();
  const { toggleDrawer, isSettingsActive } = useAccessibility();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Evidence', path: '/evidence', icon: FolderArchive, badge: '42' },
    { name: 'Timeline', path: '/timeline', icon: Clock, badge: '31' },
    { name: 'Evidence Graph', path: '/graph', icon: Network, badge: 'Interactive' },
    { name: 'Entities', path: '/entities', icon: Users, badge: '27' },
    { name: 'Inconsistencies', path: '/inconsistencies', icon: AlertTriangle, badge: '5+7', badgeColor: 'bg-amber-500/20 text-amber-300' },
    { name: 'Reports', path: '/reports', icon: FileText }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`fixed md:sticky top-0 left-0 z-40 w-64 h-screen bg-dark-surface border-r border-white/10 flex flex-col transition-transform duration-200 ease-in-out ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-6 h-16 border-b border-white/10">
          <div className="p-2 rounded-lg bg-cyber-cyan/15 border border-cyber-cyan/40 text-cyber-cyan">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-white tracking-wider font-mono">
              FraudTrace<span className="text-cyber-cyan">.AI</span>
            </h1>
            <p className="text-[10px] text-dark-muted font-mono tracking-tight uppercase">
              Evidence Reconstruction
            </p>
          </div>
        </div>

        {/* Primary Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-wider text-dark-subtle font-semibold">
            Intelligence Modules
          </div>

          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) => `flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-cyber-cyan/15 text-white border-l-2 border-cyber-cyan font-semibold shadow-[inset_0_0_15px_rgba(6,182,212,0.1)]'
                  : 'text-dark-muted hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4 text-cyan-400" />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                  item.badgeColor || 'bg-white/10 text-slate-300'
                }`}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}

          <div className="pt-4 pb-2 px-3 text-[10px] font-mono uppercase tracking-wider text-dark-subtle font-semibold border-t border-white/10">
            System & Tools
          </div>

          <button
            onClick={() => {
              toggleCopilot();
              if (onClose) onClose();
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium text-dark-muted hover:text-white hover:bg-white/5 transition-all"
          >
            <div className="flex items-center gap-3">
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>Evidence Copilot</span>
            </div>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyber-cyan/20 text-cyan-300 border border-cyber-cyan/30">
              AI
            </span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              toggleDrawer(e.currentTarget);
              if (onClose) onClose();
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium text-dark-muted hover:text-white hover:bg-white/5 transition-all cursor-pointer"
            title="Open Accessibility Controls (Alt + A)"
            aria-label="Open Accessibility Controls panel"
          >
            <div className="flex items-center gap-3">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Accessibility</span>
            </div>
            <div className="flex items-center gap-1.5">
              {isSettingsActive && (
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" title="Settings active" />
              )}
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-400 border border-white/10">
                Alt+A
              </span>
            </div>
          </button>

          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
              isActive
                ? 'bg-cyber-cyan/15 text-white border-l-2 border-cyber-cyan font-semibold'
                : 'text-dark-muted hover:text-white hover:bg-white/5'
            }`}
          >
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Settings</span>
          </NavLink>
        </div>

        {/* Prototype / Synthetic Disclaimer Badge */}
        <div className="p-4 border-t border-white/10 bg-dark-bg/60">
          <div className="p-2.5 rounded-lg bg-cyan-950/20 border border-cyan-500/20">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-cyan-400 mb-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
              <span>Synthetic Intelligence</span>
            </div>
            <p className="text-[10px] text-dark-muted leading-tight">
              Prototype system using synthetic evidence data. Strictly reconstructive without guilt adjudication.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
