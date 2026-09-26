import React from 'react';
import { ShieldCheck, AlertCircle, Info, HelpCircle } from 'lucide-react';
import { getEpistemicBadgeStyle } from '../../utils/formatter.js';

export function ConfidenceBadge({ confidence, epistemicType = 'EXTRACTED DATA', showScore = true }) {
  const score = typeof confidence === 'number' 
    ? (confidence > 1 ? Math.round(confidence) : Math.round(confidence * 100))
    : 95;

  const style = getEpistemicBadgeStyle(epistemicType);

  const norm = (epistemicType || 'EXTRACTED').toUpperCase();

  const renderIcon = () => {
    switch (norm) {
      case 'FACT':
        return <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 mr-1" />;
      case 'EXTRACTED':
      case 'EXTRACTED DATA':
        return <Info className="w-3.5 h-3.5 text-cyan-400 mr-1" />;
      case 'CORRELATED':
        return <ShieldCheck className="w-3.5 h-3.5 text-blue-400 mr-1" />;
      case 'INFERRED':
      case 'INFERENCE':
        return <AlertCircle className="w-3.5 h-3.5 text-amber-400 mr-1" />;
      case 'CONFLICTING':
        return <AlertCircle className="w-3.5 h-3.5 text-rose-400 mr-1" />;
      case 'MISSING':
      case 'UNCERTAINTY':
        return <HelpCircle className="w-3.5 h-3.5 text-purple-400 mr-1" />;
      case 'REVIEW REQUIRED':
        return <AlertCircle className="w-3.5 h-3.5 text-rose-400 mr-1" />;
      default:
        return <Info className="w-3.5 h-3.5 text-slate-400 mr-1" />;
    }
  };

  return (
    <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${style}`}>
      {renderIcon()}
      <span className="font-semibold tracking-wider">{epistemicType}</span>
      {showScore && (
        <span className="ml-1.5 pl-1.5 border-l border-white/10 font-mono text-[11px] opacity-90">
          {score}%
        </span>
      )}
    </div>
  );
}
