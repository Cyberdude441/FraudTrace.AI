import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer 
} from 'recharts';

export function TimelineMiniChart({ events = [] }) {
  // Aggregate events by hour interval
  const hourlyData = [
    { time: '10:15', events: 3, label: 'SMS & Outreach' },
    { time: '10:30', events: 7, label: 'DNS & Chat Auth' },
    { time: '10:45', events: 8, label: 'Transfer & Debits' },
    { time: '11:00', events: 4, label: 'CDR Call & Alerts' },
    { time: '11:30', events: 3, label: 'Dispute & Intake' },
    { time: '12:30', events: 3, label: 'Internal Audit' },
    { time: '14:00', events: 2, label: 'Forensic Hashing' },
    { time: '17:30', events: 3, label: 'Affidavit Sealed' },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2.5 rounded-lg bg-dark-surface border border-cyan-500/30 shadow-xl text-xs font-mono">
          <p className="text-cyan-400 font-bold">{label} IST</p>
          <p className="text-white font-semibold">{payload[0].value} Events Recorded</p>
          <p className="text-dark-muted text-[10px] mt-0.5">{payload[0].payload.label}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 rounded-xl bg-dark-card/80 border border-white/10 flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
            Incident Event Velocity
          </h3>
          <p className="text-[11px] text-dark-muted font-mono">
            Reconstructed chronological density across sequence window
          </p>
        </div>
        <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
          Peak: 10:45 AM
        </span>
      </div>

      <div className="flex-1 w-full min-h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="eventVelocityGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              stroke="#64748b" 
              fontSize={10} 
              tickLine={false} 
              fontFamily="monospace"
            />
            <YAxis 
              stroke="#64748b" 
              fontSize={10} 
              tickLine={false} 
              fontFamily="monospace"
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="events" 
              stroke="#06b6d4" 
              strokeWidth={2} 
              fillOpacity={1} 
              fill="url(#eventVelocityGrad)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
