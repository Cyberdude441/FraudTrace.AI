import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/common/Sidebar.jsx';
import { Navbar } from '../components/common/Navbar.jsx';
import { AIChatDrawer } from '../components/copilot/AIChatDrawer.jsx';
import { TraceSourceModal } from '../components/common/TraceSourceModal.jsx';
import { AccessibilityDrawer } from '../components/accessibility/AccessibilityDrawer.jsx';
import { AccessibilityFab } from '../components/accessibility/AccessibilityFab.jsx';
import { ReadingRuler } from '../components/accessibility/ReadingRuler.jsx';

export function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text flex">
      {/* Sidebar Navigation */}
      <Sidebar 
        mobileOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />

      {/* Main Execution Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar onMenuToggle={() => setMobileMenuOpen(prev => !prev)} />

        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          <Outlet />
        </main>
      </div>

      {/* Global Modals & Drawers */}
      <AIChatDrawer />
      <TraceSourceModal />
      <AccessibilityDrawer />
      <AccessibilityFab />
      <ReadingRuler />
    </div>
  );
}
