import React from 'react';

export function EmptyState({ title = 'No records found', description = 'Try adjusting your filters or upload new evidence.', icon: Icon, actionButton }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-xl bg-dark-card/40 border border-white/5 my-4">
      {Icon && (
        <div className="p-3 rounded-full bg-white/5 text-dark-muted mb-3">
          <Icon className="w-6 h-6" />
        </div>
      )}
      <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
      <p className="text-xs text-dark-muted max-w-sm mb-4 leading-relaxed">{description}</p>
      {actionButton}
    </div>
  );
}

export default EmptyState;
