/**
 * FraudTrace AI - Formatter Utilities
 */

export function formatDate(dateString) {
  if (!dateString) return '—';
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
}

export function formatDateTime(dateString) {
  if (!dateString) return '—';
  try {
    const d = new Date(dateString);
    return `${d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} ${d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
  } catch {
    return dateString;
  }
}

export function formatBytes(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export function getEpistemicBadgeStyle(type) {
  const norm = (type || '').toUpperCase();
  switch (norm) {
    case 'FACT':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    case 'EXTRACTED':
    case 'EXTRACTED DATA':
      return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
    case 'CORRELATED':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    case 'INFERRED':
    case 'INFERENCE':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    case 'CONFLICTING':
      return 'bg-rose-500/15 text-rose-400 border-rose-500/40';
    case 'MISSING':
    case 'UNCERTAINTY':
      return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
    case 'REVIEW REQUIRED':
      return 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold';
    default:
      return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
  }
}

export function getCategoryBadgeStyle(category) {
  switch (category) {
    case 'Chat':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    case 'Screenshot':
      return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
    case 'Bank Record':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    case 'Email':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    case 'Call Log':
      return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
    case 'Transaction':
      return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
    case 'URL':
      return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    default:
      return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
  }
}

export function getStatusBadgeStyle(status) {
  switch (status) {
    case 'CORRELATED':
      return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40';
    case 'EXTRACTED':
      return 'bg-cyan-500/15 text-cyan-400 border-cyan-500/40';
    case 'PROCESSING':
      return 'bg-amber-500/15 text-amber-400 border-amber-500/40 animate-pulse';
    case 'REVIEW REQUIRED':
      return 'bg-rose-500/15 text-rose-400 border-rose-500/40';
    default:
      return 'bg-slate-500/15 text-slate-400 border-slate-500/40';
  }
}
