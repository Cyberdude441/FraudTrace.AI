import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export function EntityDistributionChart({ entities = [] }) {
  const typeMap = {};
  entities.forEach(ent => {
    typeMap[ent.type] = (typeMap[ent.type] || 0) + 1;
  });

  const data = Object.entries(typeMap).map(([type, count]) => ({
    type: type.replace('_', ' '),
    count
  })).sort((a, b) => b.count - a.count).slice(0, 7);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2.5 rounded-lg bg-dark-surface border border-purple-500/30 shadow-xl text-xs font-mono">
          <p className="font-bold text-purple-300">{label}</p>
          <p className="text-white font-semibold">{payload[0].value} Extracted Entities</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 rounded-xl bg-dark-card/80 border border-white/10 flex flex-col h-full">
      <div className="mb-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
          Extracted Entity Typology
        </h3>
        <p className="text-[11px] text-dark-muted font-mono">
          Normalized taxonomy classification
        </p>
      </div>

      <div className="flex-1 w-full min-h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
            <XAxis type="number" stroke="#64748b" fontSize={10} fontFamily="monospace" tickLine={false} />
            <YAxis type="category" dataKey="type" stroke="#94a3b8" fontSize={10} fontFamily="monospace" tickLine={false} width={80} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index === 0 ? '#06b6d4' : index === 1 ? '#a855f7' : '#6366f1'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
