'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Package,
  Calendar,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

export default function SalesCharts() {
  const { salesData } = useAdmin();
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('weekly');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const currentDataset = salesData[period];

  const totalRevenue = currentDataset.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = currentDataset.reduce((sum, item) => sum + item.orders, 0);
  const totalUnits = currentDataset.reduce((sum, item) => sum + item.units, 0);
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  const maxRevenue = Math.max(...currentDataset.map((d) => d.revenue), 100);

  // Labels and descriptions
  const periodMeta = {
    daily: {
      title: 'Daily Sales Progress (Today 24h)',
      subtitle: 'Real-time telemetry of hourly order velocities and cash flow',
      growth: '+18.4% vs Yesterday',
    },
    weekly: {
      title: 'Weekly Sales Progress (Last 7 Days)',
      subtitle: 'Day-by-day distribution of high-conversion robot purchases',
      growth: '+27.8% vs Last Week',
    },
    monthly: {
      title: 'Monthly Sales Progress (Annual Run)',
      subtitle: 'Month-on-month revenue acceleration and forecasted quarters',
      growth: '+34.2% YoY Pace',
    },
    yearly: {
      title: 'Yearly Sales Progress (Historical & Projected)',
      subtitle: 'Long-term enterprise growth trajectory for Tunix-Bot ecosystem',
      growth: '+44.7% Compound',
    },
  }[period];

  return (
    <div className="glass-card rounded-2xl p-5 lg:p-6 border border-slate-800/80 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar: Title & Period Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/60">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <TrendingUp className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                {periodMeta.title}
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 font-mono font-medium flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" />
                  {periodMeta.growth}
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">{periodMeta.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Tab Controls: Daily / Weekly / Monthly / Yearly */}
        <div className="flex items-center p-1 bg-slate-900/90 rounded-xl border border-slate-800 self-start sm:self-auto">
          {(['daily', 'weekly', 'monthly', 'yearly'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setPeriod(tab);
                setHoveredIndex(null);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all cursor-pointer ${
                period === tab
                  ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Highlights for Selected Period */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/60">
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
            Total Revenue
          </span>
          <p className="text-xl font-black text-white mt-1 font-mono tracking-tight">
            ${totalRevenue.toLocaleString()}
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/60">
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
            Orders Count
          </span>
          <p className="text-xl font-black text-white mt-1 font-mono tracking-tight">
            {totalOrders.toLocaleString()}
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/60">
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <Package className="w-3.5 h-3.5 text-indigo-400" />
            Units Dispatched
          </span>
          <p className="text-xl font-black text-white mt-1 font-mono tracking-tight">
            {totalUnits.toLocaleString()}
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/60">
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Avg Order Value
          </span>
          <p className="text-xl font-black text-white mt-1 font-mono tracking-tight">
            ${avgOrderValue}
          </p>
        </div>
      </div>

      {/* Interactive Bar & Chart Visualizer */}
      <div className="pt-2">
        <div className="h-64 flex items-end gap-2 sm:gap-3 px-2 border-b border-slate-800/60 relative">
          {/* Subtle horizontal grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
            <div className="border-b border-white w-full" />
            <div className="border-b border-white w-full" />
            <div className="border-b border-white w-full" />
            <div className="border-b border-white w-full" />
          </div>

          {currentDataset.map((item, index) => {
            const heightPercent = Math.max(12, Math.round((item.revenue / maxRevenue) * 100));
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={item.label}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
              >
                {/* Floating Tooltip */}
                {isHovered && (
                  <div className="absolute bottom-full mb-3 z-20 px-3 py-2 bg-slate-900/95 border border-cyan-500/40 rounded-xl shadow-xl backdrop-blur-md text-center pointer-events-none whitespace-nowrap animate-in fade-in zoom-in-95">
                    <p className="text-[11px] font-bold text-cyan-300">{item.label}</p>
                    <p className="text-sm font-black text-white font-mono mt-0.5">
                      ${item.revenue.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {item.orders} Orders • {item.units} Units
                    </p>
                  </div>
                )}

                {/* Animated Bar with Cyber Gradient */}
                <div
                  style={{ height: `${heightPercent}%` }}
                  className={`w-full rounded-t-lg transition-all duration-300 relative overflow-hidden ${
                    isHovered
                      ? 'bg-gradient-to-t from-cyan-500 to-emerald-400 shadow-lg shadow-cyan-500/30 ring-1 ring-cyan-300'
                      : 'bg-gradient-to-t from-cyan-950/80 via-slate-800 to-cyan-500/60 hover:from-cyan-900 hover:to-cyan-400'
                  }`}
                >
                  <div className="absolute top-0 inset-x-0 h-1 bg-cyan-300 opacity-80" />
                </div>
              </div>
            );
          })}
        </div>

        {/* X-axis labels */}
        <div className="flex gap-2 sm:gap-3 px-2 pt-2.5">
          {currentDataset.map((item, index) => (
            <div
              key={item.label}
              className={`flex-1 text-center text-[10px] sm:text-xs truncate transition-colors ${
                hoveredIndex === index ? 'text-cyan-400 font-bold' : 'text-slate-400'
              }`}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

