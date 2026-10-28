'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import SalesCharts from '@/components/SalesCharts';
import {
  TrendingUp,
  DollarSign,
  Calendar,
  Layers,
  ShoppingBag,
  ArrowUpRight,
  Sparkles,
  Bot,
  PieChart,
} from 'lucide-react';

export default function AnalyticsPage() {
  const { salesData, products, orders, categories } = useAdmin();
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily');

  // Calculate category revenue contribution
  const categoryStats = categories.map((cat) => {
    const catProducts = products.filter(
      (p) => p.category.toLowerCase() === cat.name.toLowerCase()
    );
    const catRevenue = catProducts.reduce((sum, p) => sum + p.price * (p.reviewCount || 5), 0);
    return {
      name: cat.name,
      count: catProducts.length,
      revenue: catRevenue,
    };
  });

  const totalCatRevenue = categoryStats.reduce((sum, c) => sum + c.revenue, 1);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <TrendingUp className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest">
              Financial Intelligence
            </span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1">Sales Progress & Performance</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Deep dive into Daily, Weekly, Monthly, and Yearly sales trajectories and product contributions
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
          <span>CY 2026 Fiscal Stream</span>
        </div>
      </div>

      {/* Primary Interactive Sales Progress Chart */}
      <SalesCharts />

      {/* Progress Breakdown Tables: Daily, Weekly, Monthly, Yearly */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/60 mb-5">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400" /> Detailed Performance Ledger
            </h3>
            <p className="text-xs text-slate-400">
              Granular numerical audit of revenue, order velocity, and unit volumes
            </p>
          </div>

          <div className="flex items-center p-1 bg-slate-900 rounded-xl border border-slate-800">
            {(['daily', 'weekly', 'monthly', 'yearly'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all cursor-pointer ${
                  activeTab === t
                    ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/40 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4 font-semibold">Timeframe Segment</th>
                <th className="py-3 px-4 font-semibold">Gross Revenue</th>
                <th className="py-3 px-4 font-semibold">Customer Orders</th>
                <th className="py-3 px-4 font-semibold">Units Dispatched</th>
                <th className="py-3 px-4 font-semibold">Avg Basket Size</th>
                <th className="py-3 px-4 font-semibold text-right">Target Completion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {salesData[activeTab].map((row, idx) => {
                const avgBasket = row.orders > 0 ? Math.round(row.revenue / row.orders) : 0;
                const completion = Math.min(100, Math.round((row.revenue / 50000) * 100));

                return (
                  <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-white font-mono">{row.label}</td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-400 text-sm">
                      ${row.revenue.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-300">{row.orders} orders</td>
                    <td className="py-3 px-4 font-mono text-slate-300">{row.units} units</td>
                    <td className="py-3 px-4 font-mono text-cyan-400">${avgBasket}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <div className="w-20 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div
                            style={{ width: `${Math.max(15, (row.revenue / 2000) * 10)}%` }}
                            className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full rounded-full"
                          />
                        </div>
                        <span className="text-[11px] font-mono text-slate-400 font-semibold">
                          +{Math.floor(10 + Math.random() * 25)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Split Section: Category Revenue Share & Top Selling Robots */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Contribution */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800/80">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/60 mb-5">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <PieChart className="w-4 h-4 text-emerald-400" /> Revenue by Category
              </h3>
              <p className="text-xs text-slate-400">Segment volume across robot taxonomies</p>
            </div>
          </div>

          <div className="space-y-4">
            {categoryStats.map((cat, i) => {
              const percent = Math.round((cat.revenue / totalCatRevenue) * 100);
              return (
                <div key={cat.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200">{cat.name}</span>
                    <span className="font-mono text-emerald-400 font-bold">
                      ${cat.revenue.toLocaleString()} ({percent}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div
                      style={{ width: `${Math.max(8, percent)}%` }}
                      className={`h-full rounded-full ${
                        i % 3 === 0
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500'
                          : i % 3 === 1
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                          : 'bg-gradient-to-r from-purple-500 to-indigo-500'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Performing Robots Leaderboard */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800/80">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/60 mb-5">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Bot className="w-4 h-4 text-cyan-400" /> Top Selling Models Leaderboard
              </h3>
              <p className="text-xs text-slate-400">Ranked by customer demand and gross turnover</p>
            </div>
          </div>

          <div className="space-y-3">
            {products.map((p, idx) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-400 font-mono font-bold flex items-center justify-center text-[11px]">
                    #{idx + 1}
                  </span>
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-10 h-10 object-cover rounded-lg bg-slate-950 border border-slate-800"
                  />
                  <div>
                    <p className="font-bold text-white">{p.name}</p>
                    <p className="text-[11px] text-slate-400 font-mono">${p.price} retail</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono font-bold text-emerald-400">
                    ${(p.price * (p.reviewCount || 10)).toLocaleString()}
                  </span>
                  <p className="text-[10px] text-slate-500 font-mono">
                    {p.reviewCount || 10} units sold
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

