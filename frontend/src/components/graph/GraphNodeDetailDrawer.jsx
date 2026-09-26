import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, User, Phone, Mail, Globe, CreditCard, Building2, 
  MapPin, ShieldCheck, FileSearch, ArrowRight, Layers, Clock
} from 'lucide-react';
import { useTraceSource } from '../../context/TraceSourceContext.jsx';
import { usePrivacy } from '../../context/PrivacyContext.jsx';
import { ConfidenceBadge } from '../common/ConfidenceBadge.jsx';

export function GraphNodeDetailDrawer({ nodeData, onClose, onSelectNeighbor, neighbors = [] }) {
  const { openTrace } = useTraceSource();
  const { mask } = usePrivacy();

  if (!nodeData) return null;

  const maskedValue = mask(nodeData.label, nodeData.entityType);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 250 }}
        className="fixed top-16 right-0 z-30 w-full sm:w-96 h-[calc(100vh-4rem)] bg-dark-surface border-l border-white/10 shadow-2xl flex flex-col glass-panel-elevated"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-dark-card/60">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
              Node Intelligence Profile
            </span>
            <h3 className="text-base font-bold text-white truncate max-w-[280px]">
              {maskedValue}
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Stream */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs">
          {/* Classification Header */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-dark-card border border-white/5">
            <div>
              <span className="text-[10px] text-dark-muted font-mono uppercase block">Entity Taxonomy</span>
              <span className="text-xs font-bold text-white font-mono">{nodeData.entityType}</span>
            </div>
            <ConfidenceBadge
              confidence={nodeData.confidence}
              epistemicType={nodeData.epistemicType || 'EXTRACTED DATA'}
              showScore={true}
            />
          </div>

          {/* Canonical Normalization */}
          <div>
            <span className="text-[11px] font-mono text-dark-muted uppercase font-bold block mb-1">
              Normalized Identifier
            </span>
            <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 font-mono text-slate-300 break-all">
              {mask(nodeData.normalizedValue || nodeData.label, nodeData.entityType)}
            </div>
          </div>

          {/* Source Evidence Citations */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-slate-300 uppercase font-bold flex items-center gap-1.5">
                <FileSearch className="w-3.5 h-3.5 text-cyber-cyan" /> Corroborating Source Evidence
              </span>
              <span className="text-[10px] font-mono text-cyan-400">
                {nodeData.sourceEvidenceIds?.length || 0} Artifacts
              </span>
            </div>

            <div className="space-y-1.5">
              {(nodeData.sourceEvidenceIds || []).map((evId) => (
                <div
                  key={evId}
                  onClick={() => openTrace(evId, { label: `${nodeData.label} in ${evId}`, snippet: nodeData.label })}
                  className="p-2 rounded-lg bg-dark-card/60 hover:bg-dark-card border border-white/5 hover:border-cyan-500/30 cursor-pointer flex items-center justify-between transition-colors group"
                >
                  <span className="font-mono text-cyan-300 group-hover:text-white">
                    [{evId}]
                  </span>
                  <span className="text-[10px] font-mono text-cyber-cyan flex items-center gap-1">
                    Trace Grounding <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Connected Neighborhood */}
          {neighbors && neighbors.length > 0 && (
            <div>
              <span className="text-[11px] font-mono text-slate-300 uppercase font-bold flex items-center gap-1.5 mb-2">
                <Layers className="w-3.5 h-3.5 text-purple-400" /> Connected Relationships ({neighbors.length})
              </span>
              <div className="space-y-1.5">
                {neighbors.map((nbr, idx) => (
                  <div
                    key={idx}
                    onClick={() => onSelectNeighbor && onSelectNeighbor(nbr.node)}
                    className="p-2 rounded-lg bg-dark-card/40 hover:bg-white/5 border border-white/5 cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-white block">
                        {mask(nbr.node.label, nbr.node.entityType)}
                      </span>
                      <span className="text-[10px] font-mono text-dark-muted">
                        {nbr.relation.replace(/_/g, ' ')} ({nbr.confidence}%)
                      </span>
                    </div>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inferred Properties */}
          {nodeData.properties && Object.keys(nodeData.properties).length > 0 && (
            <div>
              <span className="text-[11px] font-mono text-dark-muted uppercase font-bold block mb-1.5">
                Extracted Attribute Matrix
              </span>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(nodeData.properties).map(([k, v]) => (
                  <div key={k} className="p-2 rounded bg-dark-card/40 border border-white/5">
                    <span className="text-[9px] text-dark-muted uppercase font-mono block">{k}</span>
                    <span className="font-mono text-slate-200 truncate block">{String(v)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-white/10 bg-dark-card/40">
          <button
            onClick={() => openTrace(nodeData.sourceEvidenceIds?.[0], { label: nodeData.label })}
            className="w-full py-2 rounded-lg bg-cyber-cyan hover:bg-cyan-400 text-black font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <FileSearch className="w-4 h-4" />
            <span>Trace All Occurrences</span>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
