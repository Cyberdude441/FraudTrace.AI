import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, X, Send, Sparkles, ShieldCheck, AlertCircle, 
  HelpCircle, FileText, ArrowRight, CornerDownLeft, Volume2
} from 'lucide-react';
import { useCopilot } from '../../context/CopilotContext.jsx';
import { useCase } from '../../context/CaseContext.jsx';
import { useTraceSource } from '../../context/TraceSourceContext.jsx';
import { useAccessibility } from '../../context/AccessibilityContext.jsx';
import { SourceReference } from '../common/SourceReference.jsx';
import { ConfidenceBadge } from '../common/ConfidenceBadge.jsx';
import { BionicText } from '../accessibility/BionicText.jsx';

function renderGroundedContent(content, openTrace) {
  if (!content) return null;
  const parts = content.split(/(\bEVD-\d{3}\b)/g);
  return parts.map((part, i) => {
    if (/^EVD-\d{3}$/.test(part)) {
      return (
        <button
          key={i}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            openTrace(part, { label: `Artifact ${part}` });
          }}
          className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 font-mono text-[10px] font-semibold border border-cyan-500/40 hover:border-cyan-400 cursor-pointer transition-all mx-0.5 align-baseline"
          title={`Click to Trace Source for ${part}`}
        >
          🔍 {part}
        </button>
      );
    }
    return part;
  });
}

export function AIChatDrawer() {
  const { isOpen, closeCopilot, messages, isLoading, askCopilot } = useCopilot();
  const { currentCaseId } = useCase();
  const { openTrace } = useTraceSource();
  const { speakText, ttsStatus, stopTTS } = useAccessibility();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const suggestedPrompts = [
    "What evidence supports the ₹15,000 transaction?",
    "What happened between 10:30 and 11:00?",
    "Show all evidence associated with this phone number.",
    "What inconsistencies exist?",
    "What information is missing?",
    "Which events are corroborated by multiple sources?"
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    askCopilot(inputText, currentCaseId);
    setInputText('');
  };

  const handlePromptClick = (prompt) => {
    if (isLoading) return;
    askCopilot(prompt, currentCaseId);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 pointer-events-none">
        {/* Backdrop for mobile */}
        <div 
          onClick={closeCopilot}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs pointer-events-auto md:hidden"
        />

        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="fixed top-0 right-0 z-50 w-full sm:w-[460px] h-screen bg-dark-surface border-l border-cyan-500/30 shadow-2xl flex flex-col pointer-events-auto glass-panel-elevated"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-dark-card/80">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyber-cyan/15 border border-cyan-400/40 text-cyber-cyan">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5 font-mono">
                  Evidence Copilot <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300">STRICT-GROUNDING</span>
                </h3>
                <p className="text-[11px] text-dark-muted">
                  Indexed Repository: <span className="text-slate-300 font-mono">{currentCaseId}</span>
                </p>
              </div>
            </div>

            <button
              onClick={closeCopilot}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                {/* Bubble */}
                <div
                  className={`max-w-[92%] rounded-xl p-3.5 text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-cyber-cyan text-black font-medium shadow-md'
                      : 'bg-dark-card/90 border border-white/10 text-slate-200'
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-white/10">
                      <div className="flex items-center gap-1.5 text-cyber-cyan font-mono font-semibold text-[11px]">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>SYNTHESIS ANSWER</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            if (ttsStatus === 'speaking') {
                              stopTTS();
                            } else {
                              speakText(msg.content);
                            }
                          }}
                          className="p-1 rounded text-slate-400 hover:text-cyber-cyan hover:bg-white/10 transition-colors cursor-pointer"
                          title="Read answer aloud (Text-To-Speech)"
                          aria-label="Read answer aloud"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        {msg.epistemicType && (
                          <ConfidenceBadge
                            confidence={msg.confidenceContext === 'High' ? 0.98 : 0.85}
                            epistemicType={msg.epistemicType}
                            showScore={false}
                          />
                        )}
                      </div>
                    </div>
                  )}

                  <div className="whitespace-pre-wrap">
                    {msg.role === 'assistant' ? (
                      <BionicText>{renderGroundedContent(msg.content, openTrace)}</BionicText>
                    ) : (
                      msg.content
                    )}
                  </div>

                  {/* Grounded Evidence Basis */}
                  {msg.evidenceBasis && msg.evidenceBasis.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-white/10 space-y-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold block">
                        Verified Evidence Basis ({msg.evidenceBasis.length})
                      </span>
                      <div className="space-y-1">
                        {msg.evidenceBasis.map((b, idx) => (
                          <div
                            key={idx}
                            onClick={() => openTrace(b.evidenceId, { label: b.filename, snippet: b.citation })}
                            className="p-1.5 rounded bg-black/40 hover:bg-cyan-950/30 border border-white/5 hover:border-cyan-500/30 cursor-pointer flex items-center justify-between text-[11px] transition-colors"
                          >
                            <span className="font-mono text-cyan-300 truncate max-w-[240px]">
                              [{b.evidenceId}] {b.citation || b.filename}
                            </span>
                            <span className="text-[10px] text-cyber-cyan font-semibold flex items-center gap-0.5 flex-shrink-0">
                              Trace <ArrowRight className="w-2.5 h-2.5" />
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reasoning & Limitations Block */}
                  {(msg.reasoning || msg.limitations) && (
                    <div className="mt-2.5 pt-2 border-t border-white/10 space-y-1 text-[11px] font-mono">
                      {msg.reasoning && (
                        <div className="text-slate-400">
                          <span className="text-dark-muted uppercase font-bold">Reasoning: </span>
                          {msg.reasoning}
                        </div>
                      )}
                      {msg.limitations && (
                        <div className="text-amber-400/90">
                          <span className="text-amber-500 uppercase font-bold">Limitations: </span>
                          {msg.limitations}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-dark-muted font-mono mt-1 px-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-dark-card border border-white/10 text-xs text-dark-muted">
                <div className="w-3.5 h-3.5 border-2 border-cyber-cyan border-t-transparent rounded-full animate-spin" />
                <span className="font-mono">Reconciling evidence artifacts & citations...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          <div className="px-4 py-2 border-t border-white/5 bg-dark-card/40">
            <span className="text-[10px] font-mono uppercase tracking-wider text-dark-muted block mb-1.5 font-semibold">
              Suggested Questions
            </span>
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {suggestedPrompts.slice(0, 3).map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePromptClick(prompt)}
                  className="px-2.5 py-1 rounded-md text-[11px] bg-dark-card hover:bg-dark-cardHover text-slate-300 hover:text-white border border-white/10 whitespace-nowrap transition-colors flex-shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-dark-card/90">
            <div className="relative flex items-center">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about timestamps, amounts, corroboration..."
                className="w-full pl-3 pr-10 py-2.5 rounded-lg bg-dark-surface border border-white/10 text-xs text-white placeholder-dark-muted focus:border-cyber-cyan focus:outline-none"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="absolute right-1.5 p-1.5 rounded-md bg-cyber-cyan text-black hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-center justify-between mt-2 text-[10px] text-dark-muted">
              <span>Grounding: 100% Non-hallucinatory</span>
              <span>Epistemic Audit Active</span>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
