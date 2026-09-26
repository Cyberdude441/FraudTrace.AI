import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { 
  User, Phone, Mail, Globe, CreditCard, Building2, 
  MapPin, Smartphone, Calendar, Clock, DollarSign, Layers,
  ShieldCheck, AlertTriangle
} from 'lucide-react';
import { usePrivacy } from '../../context/PrivacyContext.jsx';

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

const entityTypeColors = {
  PERSON: 'border-blue-500/50 bg-blue-950/40 text-blue-300',
  PHONE: 'border-cyan-500/50 bg-cyan-950/40 text-cyan-300',
  EMAIL: 'border-amber-500/50 bg-amber-950/40 text-amber-300',
  URL: 'border-rose-500/50 bg-rose-950/40 text-rose-300',
  TRANSACTION: 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300',
  AMOUNT: 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300',
  BANK_ACCOUNT: 'border-indigo-500/50 bg-indigo-950/40 text-indigo-300',
  UPI_ID: 'border-teal-500/50 bg-teal-950/40 text-teal-300',
  ORGANIZATION: 'border-purple-500/50 bg-purple-950/40 text-purple-300',
  LOCATION: 'border-orange-500/50 bg-orange-950/40 text-orange-300',
  DEVICE: 'border-slate-500/50 bg-slate-900/60 text-slate-300',
  DATE: 'border-sky-500/50 bg-sky-950/40 text-sky-300',
  TIME: 'border-sky-500/50 bg-sky-950/40 text-sky-300'
};

export const EntityCustomNode = memo(({ data, selected }) => {
  const { mask } = usePrivacy();
  const Icon = entityIcons[data.entityType] || Layers;
  const colorClass = entityTypeColors[data.entityType] || 'border-cyan-500/50 bg-cyan-950/40 text-cyan-300';

  const maskedValue = mask(data.label, data.entityType);

  return (
    <div
      className={`relative px-3 py-2.5 rounded-xl border backdrop-blur-md min-w-[170px] max-w-[240px] transition-all duration-200 cursor-pointer shadow-lg ${colorClass} ${
        selected ? 'ring-2 ring-cyber-cyan shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-105' : 'hover:scale-102 hover:border-white/40'
      }`}
    >
      <Handle type="target" position={Position.Top} className="!w-2 !h-2 !bg-cyber-cyan !border-none" />
      <Handle type="source" position={Position.Bottom} className="!w-2 !h-2 !bg-cyber-cyan !border-none" />

      {/* Header: Type & Confidence */}
      <div className="flex items-center justify-between gap-1 mb-1.5 pb-1 border-b border-white/10">
        <span className="text-[9px] font-mono uppercase tracking-wider font-bold opacity-80 flex items-center gap-1">
          <Icon className="w-3 h-3 flex-shrink-0" />
          <span>{data.entityType}</span>
        </span>
        <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-black/40 text-slate-300">
          {data.confidence}%
        </span>
      </div>

      {/* Node Label / Value */}
      <div className="font-bold text-xs text-white truncate tracking-tight" title={data.label}>
        {maskedValue}
      </div>

      {/* Footer: Sources count */}
      <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/5 text-[9px] font-mono text-dark-muted">
        <span>{data.sourceCount || 1} source ref</span>
        {data.epistemicType && (
          <span className="text-[9px] uppercase px-1 rounded bg-white/5 text-slate-400">
            {data.epistemicType}
          </span>
        )}
      </div>
    </div>
  );
});
