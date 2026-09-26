import React, { createContext, useContext, useState } from 'react';
import { api } from '../services/api.js';

const CopilotContext = createContext(null);

export function CopilotProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hello Analyst. I am the Evidence Copilot for FraudTrace AI. I strictly answer questions using indexed digital evidence artifacts and provide full source citations. How can I assist your investigation?",
      evidenceBasis: [],
      confidenceContext: 'High',
      reasoning: "Initialization prompt grounded in indexed case repository.",
      timestamp: new Date()
    },
    {
      id: 'briefing-sample',
      role: 'assistant',
      content: "Four independent evidence sources describe the payment request. However, the payment amount differs between the bank record and the communication records. The system has therefore classified the event as conflicting rather than selecting one source as correct.",
      evidenceBasis: [
        { evidenceId: 'EVD-001', filename: 'sms_alert_kyc_expiry.png', citation: 'Claims Rs 4,999 security fee' },
        { evidenceId: 'EVD-003', filename: 'bank_statement_september.csv', citation: 'Debited ₹15,000.00' },
        { evidenceId: 'EVD-004', filename: 'payment_success_screenshot.jpg', citation: 'Screenshot amount mismatch' },
        { evidenceId: 'EVD-021', filename: 'upi_npci_switch_log.csv', citation: 'NPCI RRN 6288192019' }
      ],
      confidenceContext: 'High',
      epistemicType: 'CONFLICTING',
      reasoning: "Divergence detected across financial ledgers and telecommunication captures.",
      limitations: "Neutral analysis: system avoids making adjudicative guilt determinations.",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleCopilot = () => setIsOpen(prev => !prev);
  const openCopilot = () => setIsOpen(true);
  const closeCopilot = () => setIsOpen(false);

  const askCopilot = async (query, caseId = 'CASE-2026-001') => {
    if (!query || !query.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await api.queryAI(query, caseId);
      if (res && res.result) {
        const aiMsg = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: res.result.answer,
          evidenceBasis: res.result.evidenceBasis || [],
          confidenceContext: res.result.confidenceContext || 'Medium',
          reasoning: res.result.reasoning || '',
          limitations: res.result.limitations || '',
          epistemicType: res.result.epistemicType || 'EXTRACTED',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMsg]);
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          role: 'assistant',
          content: "I encountered an error querying the evidence indices. Please ensure the case artifacts are indexed and retry.",
          evidenceBasis: [],
          confidenceContext: 'Low',
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CopilotContext.Provider value={{
      isOpen,
      toggleCopilot,
      openCopilot,
      closeCopilot,
      messages,
      isLoading,
      askCopilot
    }}>
      {children}
    </CopilotContext.Provider>
  );
}

export function useCopilot() {
  const ctx = useContext(CopilotContext);
  if (!ctx) throw new Error('useCopilot must be used within a CopilotProvider');
  return ctx;
}
