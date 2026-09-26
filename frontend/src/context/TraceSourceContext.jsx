import React, { createContext, useContext, useState } from 'react';
import { api } from '../services/api.js';

const TraceSourceContext = createContext(null);

export function TraceSourceProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [evidenceData, setEvidenceData] = useState(null);
  const [highlightContext, setHighlightContext] = useState(null);

  const openTrace = async (evidenceId, context = {}) => {
    try {
      setLoading(true);
      setIsOpen(true);
      setHighlightContext(context);

      // Handle array or comma-separated IDs: take the first primary ID
      let targetId = evidenceId;
      if (Array.isArray(evidenceId)) {
        targetId = evidenceId[0];
      } else if (typeof evidenceId === 'string' && evidenceId.includes(',')) {
        targetId = evidenceId.split(',')[0].trim();
      }

      if (!targetId) {
        setEvidenceData(null);
        return;
      }

      const res = await api.getEvidenceById(targetId);
      if (res && res.evidence) {
        setEvidenceData({
          ...res.evidence,
          relatedEntities: res.relatedEntities || [],
          relatedEvents: res.relatedEvents || []
        });
      }
    } catch (err) {
      console.error('Failed to trace source:', err);
    } finally {
      setLoading(false);
    }
  };

  const closeTrace = () => {
    setIsOpen(false);
    setEvidenceData(null);
    setHighlightContext(null);
  };

  return (
    <TraceSourceContext.Provider value={{
      isOpen,
      loading,
      evidenceData,
      highlightContext,
      openTrace,
      closeTrace
    }}>
      {children}
    </TraceSourceContext.Provider>
  );
}

export function useTraceSource() {
  const ctx = useContext(TraceSourceContext);
  if (!ctx) throw new Error('useTraceSource must be used within a TraceSourceProvider');
  return ctx;
}
