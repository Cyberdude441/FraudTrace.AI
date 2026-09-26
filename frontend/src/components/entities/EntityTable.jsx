import React, { useState } from 'react';
import { 
  Users, User, Phone, Mail, Globe, CreditCard, Building2, 
  MapPin, Smartphone, DollarSign, Calendar, Clock, Layers,
  FileSearch, ArrowRight, ShieldCheck, Eye
} from 'lucide-react';
import { useTraceSource } from '../../context/TraceSourceContext.jsx';
import { usePrivacy } from '../../context/PrivacyContext.jsx';
import { ConfidenceBadge } from '../common/ConfidenceBadge.jsx';
import { SourceReference } from '../common/SourceReference.jsx';

const entityIcons = {
  PERSON: User,
  PHONE: Phone,
  EMAIL: Mail,
  URL: Globe,
  TRANSACTION: CreditCard,
  PAYMENT_ID: CreditCard,
  BANK_ACCOUNT: Building2,
  UPI_ID: DollarSign,
  LOCATION: MapPin,
  ORGANIZATION: Building2,
  DEVICE: Smartphone,
  DATE: Calendar,
  TIME: Clock,
  AMOUNT: DollarSign
};

export function EntityTable({ entities = [], onSelectEntity }) {
  const { openTrace } = useTraceSource();
  const { mask } = usePrivacy();

  const [selectedType, setSelectedType] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const entityTypes = [
    'ALL', 'PERSON', 'PHONE', 'URL', 'TRANSACTION', 'AMOUNT', 
    'BANK_ACCOUNT', 'UPI_ID', 'ORGANIZATION', 'LOCATION', 'DEVICE', 'EMAIL', 'DATE', 'TIME'
  ];

  const filtered = entities.filter(ent => {
    if (selectedType !== 'ALL' && ent.type !== selectedType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchVal = (ent.value || '').toLowerCase().includes(q);
      const matchNorm = (ent.normalizedValue || '').toLowerCase().includes(q);
      const matchId = (ent.entityId || '').toLowerCase().includes(q);
      if (!matchVal && !matchNorm && !matchId) return false;
    }
    return true;
  });

  return (
    <div className="rounded-xl bg-dark-card/90 border border-white/10 overflow-hidden shadow-lg">
      {/* Filters Bar */}
      <div className="p-4 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-dark-surface/50">
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-dark-card border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-cyber-cyan focus:outline-none"
          >
            {entityTypes.map((t) => (
              <option key={t} value={t}>{t === 'ALL' ? 'All Entity Taxonomies' : t}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search entity value or identifier..."
            className="px-3 py-1.5 rounded-lg bg-dark-card border border-white/10 text-xs text-white placeholder-dark-muted focus:border-cyber-cyan focus:outline-none w-56"
          />
          <span className="text-xs font-mono text-dark-muted whitespace-nowrap">
            Showing {filtered.length} of {entities.length}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-dark-surface/80 border-b border-white/10 text-dark-muted uppercase font-mono text-[10px]">
            <tr>
              <th className="py-3 px-4">Entity ID & Taxonomy</th>
              <th className="py-3 px-4">Observed Value</th>
              <th className="py-3 px-4">Canonical Normalized</th>
              <th className="py-3 px-4">Connection Confidence</th>
              <th className="py-3 px-4">Corroborating Evidence</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-sans">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-dark-muted font-mono">
                  No entities match the current query criteria.
                </td>
              </tr>
            ) : (
              filtered.map((item) => {
                const Icon = entityIcons[item.type] || Layers;
                const maskedVal = mask(item.value, item.type);
                const maskedNorm = mask(item.normalizedValue, item.type);

                return (
                  <tr
                    key={item.entityId}
                    onClick={() => onSelectEntity && onSelectEntity(item)}
                    className="hover:bg-white/5 cursor-pointer transition-colors group"
                  >
                    {/* Entity ID & Taxonomy */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-black/40 text-cyan-300 border border-white/5">
                          {item.entityId}
                        </span>
                        <span className="font-mono text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                          <Icon className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{item.type}</span>
                        </span>
                      </div>
                    </td>

                    {/* Observed Value */}
                    <td className="py-3 px-4">
                      <span className="font-bold text-white group-hover:text-cyber-cyan transition-colors">
                        {maskedVal}
                      </span>
                    </td>

                    {/* Canonical Normalized */}
                    <td className="py-3 px-4 font-mono text-dark-muted text-[11px]">
                      {maskedNorm}
                    </td>

                    {/* Confidence & Epistemic Type */}
                    <td className="py-3 px-4">
                      <ConfidenceBadge
                        confidence={item.confidence}
                        epistemicType={item.epistemicType || 'EXTRACTED'}
                        showScore={true}
                      />
                    </td>

                    {/* Corroborating Evidence Tags */}
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap items-center gap-1">
                        {(item.sourceEvidenceIds || []).slice(0, 3).map((id) => (
                          <SourceReference key={id} evidenceId={id} inline={true} />
                        ))}
                        {(item.sourceEvidenceIds || []).length > 3 && (
                          <span className="text-[10px] font-mono text-dark-muted">
                            +{item.sourceEvidenceIds.length - 3} more
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Action: Trace */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openTrace(item.sourceEvidenceIds?.[0], { label: item.value, snippet: item.value });
                        }}
                        className="px-2 py-1 rounded bg-black/40 hover:bg-cyan-950/40 text-cyber-cyan border border-cyan-500/30 text-[11px] font-mono transition-colors inline-flex items-center gap-1"
                        title="Trace this entity to source evidence"
                      >
                        <FileSearch className="w-3 h-3" />
                        <span>Trace</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
