import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { CaseProvider } from './context/CaseContext.jsx';
import { PrivacyProvider } from './context/PrivacyContext.jsx';
import { TraceSourceProvider } from './context/TraceSourceContext.jsx';
import { CopilotProvider } from './context/CopilotContext.jsx';
import { AccessibilityProvider } from './context/AccessibilityContext.jsx';

import { AppLayout } from './layouts/AppLayout.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { DashboardPage } from './pages/DashboardPage.jsx';
import { EvidencePage } from './pages/EvidencePage.jsx';
import { TimelinePage } from './pages/TimelinePage.jsx';
import { GraphPage } from './pages/GraphPage.jsx';
import { EntitiesPage } from './pages/EntitiesPage.jsx';
import { InconsistenciesPage } from './pages/InconsistenciesPage.jsx';
import { ReportsPage } from './pages/ReportsPage.jsx';
import { SettingsPage } from './pages/SettingsPage.jsx';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CaseProvider>
          <PrivacyProvider>
            <TraceSourceProvider>
              <CopilotProvider>
                <AccessibilityProvider>
                  <Routes>
                    {/* Public Authentication */}
                    <Route path="/login" element={<LoginPage />} />

                    {/* Protected Investigative Workspace */}
                    <Route
                      path="/"
                      element={
                        <ProtectedRoute>
                          <AppLayout />
                        </ProtectedRoute>
                      }
                    >
                      <Route index element={<Navigate to="/dashboard" replace />} />
                      <Route path="dashboard" element={<DashboardPage />} />
                      <Route path="evidence" element={<EvidencePage />} />
                      <Route path="timeline" element={<TimelinePage />} />
                      <Route path="graph" element={<GraphPage />} />
                      <Route path="entities" element={<EntitiesPage />} />
                      <Route path="inconsistencies" element={<InconsistenciesPage />} />
                      <Route path="reports" element={<ReportsPage />} />
                      <Route path="settings" element={<SettingsPage />} />
                    </Route>

                    {/* Catch-all redirect */}
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </AccessibilityProvider>
              </CopilotProvider>
            </TraceSourceProvider>
          </PrivacyProvider>
        </CaseProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
