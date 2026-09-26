import React, { useState } from 'react';
import { Search, Filter, Calendar, Clock, ArrowDownUp } from 'lucide-react';
import { TimelineEventCard } from './TimelineEventCard.jsx';

export function TimelineView({ events = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPeriod, setFilterPeriod] = useState('ALL');
  const [filterType, setFilterType] = useState('ALL');
  const [sortOrder, setSortOrder] = useState('ASC');

  const filtered = events.filter(evt => {
    if (filterPeriod === 'CRITICAL_WINDOW') {
      // 10:20 AM to 10:55 AM
      const time = evt.displayTime;
      const isMorningCritical = time.startsWith('10:2') || time.startsWith('10:3') || time.startsWith('10:4') || time.startsWith('10:5');
      if (!isMorningCritical) return false;
    }

    if (filterType !== 'ALL') {
      const t = evt.type.toLowerCase();
      if (filterType === 'TRANSACTIONS' && !t.includes('trans') && !t.includes('pay') && !t.includes('npci')) return false;
      if (filterType === 'COMMUNICATIONS' && !t.includes('chat') && !t.includes('sms') && !t.includes('call') && !t.includes('ivr')) return false;
      if (filterType === 'NETWORK' && !t.includes('dns') && !t.includes('url') && !t.includes('app') && !t.includes('geo')) return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = evt.title.toLowerCase().includes(q);
      const matchDesc = evt.description.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc) return false;
    }

    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    const diff = new Date(a.timestamp) - new Date(b.timestamp);
    return sortOrder === 'ASC' ? diff : -diff;
  });

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="p-4 rounded-xl bg-dark-card/90 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-md">
        <div className="flex flex-wrap items-center gap-2">
          {/* Time Window Filter */}
          <select
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            className="bg-dark-card border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-cyber-cyan focus:outline-none"
          >
            <option value="ALL">All Time Intervals (10:15 - 17:30)</option>
            <option value="CRITICAL_WINDOW">Critical Transfer Window (10:20 - 10:55)</option>
          </select>

          {/* Event Category Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-dark-card border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-cyber-cyan focus:outline-none"
          >
            <option value="ALL">All Event Types</option>
            <option value="TRANSACTIONS">Financial & Switch Transfers</option>
            <option value="COMMUNICATIONS">SMS, Chat & Telecom CDR</option>
            <option value="NETWORK">DNS, IP & Telemetry</option>
          </select>

          {/* Sort Toggle */}
          <button
            onClick={() => setSortOrder(prev => prev === 'ASC' ? 'DESC' : 'ASC')}
            className="px-2.5 py-1.5 rounded-lg bg-dark-card border border-white/10 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <ArrowDownUp className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono">{sortOrder === 'ASC' ? 'Chronological' : 'Reverse'}</span>
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events, keywords..."
            className="px-3 py-1.5 rounded-lg bg-dark-card border border-white/10 text-xs text-white placeholder-dark-muted focus:border-cyber-cyan focus:outline-none w-56"
          />
          <span className="text-xs font-mono text-dark-muted whitespace-nowrap">
            {sorted.length} events
          </span>
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="pt-2">
        {sorted.length === 0 ? (
          <div className="py-16 text-center text-xs font-mono text-dark-muted rounded-xl bg-dark-card/40 border border-white/5">
            No chronological timeline events match the filter parameters.
          </div>
        ) : (
          <div className="space-y-0">
            {sorted.map((evt, idx) => (
              <TimelineEventCard
                key={evt.eventId}
                event={evt}
                isLast={idx === sorted.length - 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
