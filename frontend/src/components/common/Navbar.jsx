import React from 'react';
import { Bot, User, Bell, Shield, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useCopilot } from '../../context/CopilotContext.jsx';
import { useAccessibility } from '../../context/AccessibilityContext.jsx';
import { UniversalAccessIcon } from '../accessibility/AccessibilityFab.jsx';
import { CaseSelector } from '../case/CaseSelector.jsx';
import { SearchBar } from './SearchBar.jsx';
import { PrivacyToggle } from './PrivacyToggle.jsx';

export function Navbar({ onMenuToggle }) {
  const { user, logout } = useAuth();
  const { toggleCopilot, isOpen: copilotOpen } = useCopilot();
  const { toggleDrawer, isDrawerOpen, isSettingsActive } = useAccessibility();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-dark-surface/80 backdrop-blur-md border-b border-white/10">
      {/* Left Area: Mobile Menu Toggle + Case Selector */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-lg text-slate-400 hover:text-white md:hidden hover:bg-white/5"
        >
          <Menu className="w-5 h-5" />
        </button>

        <CaseSelector />
      </div>

      {/* Center Area: Global Search */}
      <div className="hidden sm:block">
        <SearchBar />
      </div>

      {/* Right Area: Controls & Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Accessibility Button */}
        <button
          type="button"
          onClick={(e) => toggleDrawer(e.currentTarget)}
          aria-label="Accessibility Controls (Alt + A)"
          aria-expanded={isDrawerOpen}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
            isDrawerOpen
              ? 'bg-cyber-cyan text-black border-cyan-400 shadow-glow-cyan'
              : isSettingsActive
              ? 'bg-dark-card border-cyan-400/50 text-cyan-300 shadow-sm'
              : 'bg-dark-card border-white/10 text-slate-300 hover:border-cyan-500/40 hover:text-white hover:bg-white/5'
          }`}
          title="Accessibility Controls (Alt + A)"
        >
          <UniversalAccessIcon className="w-4 h-4 text-cyan-400" />
          <span className="hidden xl:inline">Accessibility</span>
          {isSettingsActive && (
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          )}
        </button>

        {/* Privacy Toggle */}
        <PrivacyToggle />

        {/* AI Copilot Toggle Button */}
        <button
          onClick={toggleCopilot}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide border transition-all ${
            copilotOpen
              ? 'bg-cyber-cyan text-black border-cyan-400 shadow-glow-cyan'
              : 'bg-dark-card border-white/10 text-cyan-400 hover:border-cyan-500/40 hover:bg-white/5'
          }`}
          title="Open Evidence Copilot Assistant"
        >
          <Bot className="w-4 h-4" />
          <span className="hidden md:inline">Evidence Copilot</span>
        </button>

        {/* Analyst Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-white/10">
          <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-xs">
            {user?.name ? user.name.split(' ').map(n => n[0]).join('') : 'AV'}
          </div>
          <div className="hidden lg:block text-left text-xs leading-none">
            <span className="font-semibold text-white block">{user?.name || 'Lead Analyst'}</span>
            <span className="text-[10px] text-dark-muted font-mono">{user?.badgeNumber || 'FT-9942'}</span>
          </div>

          <button
            onClick={logout}
            className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-white/5 transition-colors"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
