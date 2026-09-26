import React from 'react';
import { 
  Clock, ShieldCheck, FileSearch, ArrowRight, 
  MessageSquare, CreditCard, PhoneCall, Globe, AlertTriangle
} from 'lucide-react';
import { useTraceSource } from '../../context/TraceSourceContext.jsx';
import { usePrivacy } from '../../context/PrivacyContext.jsx';
import { ConfidenceBadge } from '../common/ConfidenceBadge.jsx';
import { SourceReference } from '../common/SourceReference.jsx';
import { BionicText } from '../accessibility/BionicText.jsx';

export function TimelineEventCard({ event, isLast = false }) {
  const { openTrace } = useTraceSource();
  const { mask } = usePrivacy();

  const getEventIcon = () => {
    const t = (event.type || '').toLowerCase();
    if (t.includes('chat') || t.includes('sms')) return <MessageSquare className="w-4 h-4 text-cyan-400" />;
    if (t.includes('trans') || t.includes('pay') || t.includes('npci')) return <CreditCard className="w-4 h-4 text-emerald-400" />;
    if (t.includes('call') || t.includes('ivr')) return <PhoneCall className="w-4 h-4 text-indigo-400" />;
    if (t.includes('dns') || t.includes('url')) return <Globe className="w-4 h-4 text-rose-400" />;
    return <Clock className="w-4 h-4 text-amber-400" />;
  };

  return (
    <div className="relative flex items-start gap-4 group">
      {/* Time & Timeline Track Node */}
      <div className="flex flex-col items-center flex-shrink-0 w-20 pt-1">
        <span className="font-mono text-xs font-bold text-cyber-cyan tracking-tight">
          {event.displayTime}
        </span>
        <span className="text-[10px] font-mono text-dark-muted">
          25 Sep 2026
        </span>
      </div>

      {/* Bullet Indicator & Connecting Spine */}
      <div className="relative flex flex-col items-center flex-shrink-0 pt-1.5">
        <div className="w-7 h-7 rounded-full bg-dark-surface border border-cyan-500/40 flex items-center justify-center shadow-glow-cyan z-10">
          {getEventIcon()}
        </div>
        {!isLast && (
          <div className="w-0.5 h-full bg-gradient-to-b from-cyan-500/30 to-white/5 absolute top-8 bottom-0" />
        )}
      </div>

      {/* Event Details Card */}
      <div className="flex-1 pb-6">
        <div 
          onClick={() => openTrace(event.sourceEvidenceIds?.[0], { label: event.title, snippet: event.description, location: event.sourceLocation })}
          className="p-4 rounded-xl bg-dark-card/90 border border-white/10 hover:border-cyan-500/40 cursor-pointer transition-all shadow-md group-hover:bg-dark-card"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-2 border-b border-white/5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-black/40 text-cyan-300 font-semibold border border-white/5">
                {event.type}
              </span>
              <h4 className="text-sm font-bold text-white tracking-tight">
                {event.title}
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <ConfidenceBadge
                confidence={event.confidence}
                epistemicType={event.epistemicType || 'EXTRACTED'}
                showScore={true}
              />
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mb-3 font-sans">
            <BionicText>{event.description}</BionicText>
          </p>

          {/* Sources and Location */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5 text-[11px]">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-mono text-dark-muted uppercase">Sources:</span>
              {(event.sourceEvidenceIds || []).map((id) => (
                <SourceReference key={id} evidenceId={id} inline={true} />
              ))}
              {event.sourceLocation && (
                <span className="font-mono text-dark-muted text-[10px] ml-1">
                  ({event.sourceLocation})
                </span>
              )}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                openTrace(event.sourceEvidenceIds?.[0], { label: event.title, snippet: event.description, location: event.sourceLocation });
              }}
              className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-cyber-cyan hover:text-cyan-300"
            >
              <span>TRACE SOURCE</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
