import React, { useState, useEffect } from 'react';
import { 
  FileText, Sparkles, RefreshCw, Download, 
  Printer, ShieldCheck, History
} from 'lucide-react';
import { useCase } from '../context/CaseContext.jsx';
import { api } from '../services/api.js';
import { ReportViewer } from '../components/reports/ReportViewer.jsx';
import { LoadingState } from '../components/common/LoadingState.jsx';
import { ErrorState } from '../components/common/ErrorState.jsx';

export function ReportsPage() {
  const { currentCaseId, currentCase } = useCase();
  const [reports, setReports] = useState([]);
  const [activeReport, setActiveReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getReports(currentCaseId);
      if (res && res.reports) {
        setReports(res.reports);
        if (res.reports.length > 0) {
          setActiveReport(res.reports[0]);
        }
      }
    } catch (err) {
      console.error('Failed to load reports:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [currentCaseId]);

  const handleGenerateReport = async () => {
    try {
      setGenerating(true);
      const res = await api.generateReport(currentCaseId);
      if (res && res.report) {
        setReports(prev => [res.report, ...prev]);
        setActiveReport(res.report);
      }
    } catch (err) {
      console.error('Report generation error:', err);
    } finally {
      setGenerating(false);
    }
  };

  // If no reports exist on initial load, auto-generate one
  useEffect(() => {
    if (!loading && reports.length === 0) {
      handleGenerateReport();
    }
  }, [loading, reports.length]);

  if (loading && reports.length === 0) {
    return <LoadingState message="Compiling 14-section structured incident dossier..." />;
  }
  if (error) return <ErrorState message={error} onRetry={fetchReports} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/5 print:hidden">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-bold border border-cyan-500/20">
              FORMAL FORENSIC DOSSIER
            </span>
            <span className="text-[11px] font-mono text-dark-muted">
              Sections: 14 Standards-Compliant
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white font-mono tracking-tight">
            AI Incident Intelligence Report Generator
          </h1>
          <p className="text-xs text-dark-muted font-mono mt-0.5">
            Full source traceability with RFC-3161 cryptographic audit and non-adjudicative epistemic framing
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* History selector */}
          {reports.length > 1 && (
            <select
              value={activeReport?.reportId || ''}
              onChange={(e) => {
                const found = reports.find(r => r.reportId === e.target.value);
                if (found) setActiveReport(found);
              }}
              className="bg-dark-card border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-cyber-cyan focus:outline-none"
            >
              {reports.map((r) => (
                <option key={r.reportId} value={r.reportId}>
                  {r.reportId} ({new Date(r.generatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})
                </option>
              ))}
            </select>
          )}

          <button
            onClick={handleGenerateReport}
            disabled={generating}
            className="px-4 py-2 rounded-lg bg-cyber-cyan hover:bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider transition-colors shadow-glow-cyan flex items-center gap-1.5 disabled:opacity-50"
          >
            {generating ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>Compiling Dossier...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate New Report</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Report Viewer */}
      <ReportViewer report={activeReport} />
    </div>
  );
}
