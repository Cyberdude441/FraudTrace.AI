import React, { useRef } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext.jsx';

/**
 * Universal Accessibility Icon SVG (human figure in circle)
 */
function UniversalAccessIcon({ className = 'w-5 h-5' }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="12" cy="4" r="2" />
      <path d="M19 13V10C19 8.9 18.1 8 17 8H7C5.9 8 5 8.9 5 10V13C5 13.55 5.45 14 6 14C6.55 14 7 13.55 7 13V10H9V21C9 21.55 9.45 22 10 22C10.55 22 11 21.55 11 21V15H13V21C13 21.55 13.45 22 14 22C14.55 22 15 21.55 15 21V10H17V13C17 13.55 17.45 14 18 14C18.55 14 19 13.55 19 13Z" />
    </svg>
  );
}

/**
 * Persistent Floating Accessibility Button
 * Placed in the bottom-right corner with Alt+A shortcut tooltip and active status indicator
 */
export function AccessibilityFab() {
  const { isDrawerOpen, toggleDrawer, isSettingsActive } = useAccessibility();
  const btnRef = useRef(null);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center print:hidden">
      <button
        ref={btnRef}
        type="button"
        onClick={() => toggleDrawer(btnRef.current)}
        aria-label="Accessibility Controls (Shortcut: Alt + A)"
        aria-expanded={isDrawerOpen}
        aria-haspopup="dialog"
        title="Accessibility Controls (Alt + A)"
        className={`group relative flex items-center justify-center w-12 h-12 rounded-full shadow-2xl transition-all duration-200 focus-visible:ring-4 focus-visible:ring-cyan-400 cursor-pointer ${
          isDrawerOpen
            ? 'bg-cyber-cyan text-black ring-2 ring-cyan-300 shadow-glow-cyan scale-105'
            : isSettingsActive
            ? 'bg-dark-surface text-cyan-300 border-2 border-cyan-400 shadow-glow-cyan hover:scale-105'
            : 'bg-dark-surface/90 hover:bg-dark-card text-slate-300 hover:text-white border border-white/20 hover:border-cyan-500/50 hover:scale-105 glass-panel-elevated'
        }`}
      >
        <UniversalAccessIcon className="w-6 h-6" />

        {/* Small Active Indicator Dot */}
        {isSettingsActive && (
          <span 
            className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-cyan-400 border-2 border-dark-bg animate-pulse"
            title="Accessibility settings active"
            aria-label="Accessibility settings active"
          />
        )}

        {/* Tooltip on hover */}
        <span className="absolute right-14 whitespace-nowrap px-3 py-1 rounded-lg bg-dark-surface/95 border border-white/10 text-xs font-mono text-white shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Accessibility (Alt+A)
        </span>
      </button>
    </div>
  );
}

export { UniversalAccessIcon };
