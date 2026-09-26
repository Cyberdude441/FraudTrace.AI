import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export function EvidenceDistributionChart({ evidence = [] }) {
  // Aggregate category counts
  const categoryMap = {
    'Chat': 0,
    'Screenshot': 0,
    'Bank Record': 0,
    'Email': 0,
    'Call Log': 0,
    'Transaction': 0,
    'URL': 0,
    'Document': 0,
    'Other': 0
  };

  evidence.forEach(e => {
    if (categoryMap[e.category] !== undefined) {
      categoryMap[e.category]++;
    } else {
      categoryMap['Other']++;
    }
  });

  const COLORS = {
    'Screenshot': '#a855f7',
    'Bank Record': '#10b981',
    'Chat': '#3b82f6',
    'Call Log': '#6366f1',
    'Transaction': '#06b6d4',
    'URL': '#f43f5e',
    'Email': '#f59e0b',
    'Document': '#0ea5e9',
    'Other': '#64748b'
  };

  const data = Object.entries(categoryMap)
    .filter(([_, count]) => count > 0)
    .map(([name, value]) => ({
      name,
      value,
      color: COLORS[name] || '#94a3b8'
    }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      const percent = Math.round((item.value / evidence.length) * 100) || 0;
      return (
        <div className="p-2.5 rounded-lg bg-dark-surface border border-white/10 shadow-xl text-xs font-mono">
          <p className="font-bold text-white flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.payload.color }} />
            {item.name}
          </p>
          <p className="text-dark-muted mt-0.5">
            {item.value} items ({percent}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 rounded-xl bg-dark-card/80 border border-white/10 flex flex-col h-full">
      <div className="mb-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
          Evidence Modality Breakdown
        </h3>
        <p className="text-[11px] text-dark-muted font-mono">
          Distribution across 42 ingested forensic artifacts
        </p>
      </div>

      <div className="flex-1 w-full min-h-[160px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height={160}>
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={68}
              paddingAngle={3}
              stroke="#080d1a"
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend Grid */}
      <div className="grid grid-cols-3 gap-1 pt-2 border-t border-white/5 text-[10px] font-mono text-dark-muted">
        {data.slice(0, 6).map((item) => (
          <div key={item.name} className="flex items-center gap-1.5 truncate">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
            <span className="truncate">{item.name}: {item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
