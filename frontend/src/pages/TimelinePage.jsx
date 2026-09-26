import React, { useState, useEffect } from 'react';
import { Clock, RefreshCw, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';
import { useCase } from '../context/CaseContext.jsx';
import { api } from '../services/api.js';
import { TimelineView } from '../components/timeline/TimelineView.jsx';
import { LoadingState } from '../components/common/LoadingState.jsx';
import { ErrorState } from '../components/common/ErrorState.jsx';

export function TimelinePage() {
  const { currentCaseId } = useCase();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTimeline = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getTimeline(currentCaseId);
      if (res && res.events) {
        setEvents(res.events);
      }
    } catch (err) {
      console.error('Failed to load timeline:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimeline();
  }, [currentCaseId]);

  if (loading) return <LoadingState message="Reconstructing chronological evidence chain..." />;
  if (error) return <ErrorState message={error} onRetry={fetchTimeline} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-bold border border-cyan-500/20">
              CHRONOLOGICAL RECONSTRUCTION
            </span>
            <span className="text-[11px] font-mono text-dark-muted">
              Events Sequenced: {events.length}
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white font-mono tracking-tight">
            Incident Timeline Reconstruction
          </h1>
          <p className="text-xs text-dark-muted font-mono mt-0.5">
            Cross-source temporal alignment: SMS, DNS lookups, bank core ledgers, and cellular CDR logs
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchTimeline}
            className="p-2 rounded-lg bg-dark-card border border-white/10 text-slate-300 hover:text-white transition-colors"
            title="Refresh timeline"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Timeline Stream */}
      <TimelineView events={events} />
    </div>
  );
}
