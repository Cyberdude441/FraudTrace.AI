import React from 'react';
import { motion } from 'framer-motion';

export function KpiCard({ title, value, icon: Icon, change, trend = 'neutral', color = 'cyan', subtitle, onClick }) {
  const colorMap = {
    cyan: {
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20 hover:border-cyan-500/40',
      text: 'text-cyan-400',
      glow: 'group-hover:shadow-[0_0_20px_-5px_rgba(6,182,212,0.3)]'
    },
    emerald: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20 hover:border-emerald-500/40',
      text: 'text-emerald-400',
      glow: 'group-hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]'
    },
    blue: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20 hover:border-blue-500/40',
      text: 'text-blue-400',
      glow: 'group-hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]'
    },
    amber: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20 hover:border-amber-500/40',
      text: 'text-amber-400',
      glow: 'group-hover:shadow-[0_0_20px_-5px_rgba(245,158,11,0.3)]'
    },
    rose: {
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/20 hover:border-rose-500/40',
      text: 'text-rose-400',
      glow: 'group-hover:shadow-[0_0_20px_-5px_rgba(244,63,94,0.3)]'
    },
    purple: {
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20 hover:border-purple-500/40',
      text: 'text-purple-400',
      glow: 'group-hover:shadow-[0_0_20px_-5px_rgba(168,85,247,0.3)]'
    }
  };

  const scheme = colorMap[color] || colorMap.cyan;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      onClick={onClick}
      className={`group relative p-4 rounded-xl bg-dark-card/80 border ${scheme.border} ${scheme.glow} transition-all duration-200 ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-dark-muted font-mono block mb-1">
            {title}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-extrabold text-white font-mono tracking-tight">
              {value}
            </span>
            {change && (
              <span className={`text-xs font-mono font-medium ${trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-rose-400' : 'text-slate-400'}`}>
                {change}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-[11px] text-dark-subtle mt-1">
              {subtitle}
            </p>
          )}
        </div>

        {Icon && (
          <div className={`p-2.5 rounded-lg ${scheme.bg} ${scheme.text} border border-white/5`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
