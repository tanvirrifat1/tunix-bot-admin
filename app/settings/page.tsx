'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import {
  Settings,
  Server,
  Database,
  Globe,
  MessageCircle,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Save,
} from 'lucide-react';

export default function SettingsPage() {
  const { showToast } = useAdmin();

  const [storeName, setStoreName] = useState('Tunix-Bot Official');
  const [currency, setCurrency] = useState('USD ($)');
  const [supportPhone, setSupportPhone] = useState('+8801904482088');
  const [adminEmail, setAdminEmail] = useState('rifatmiah373@gmail.com');
  const [insideDhakaFee, setInsideDhakaFee] = useState(15);
  const [outsideDhakaFee, setOutsideDhakaFee] = useState(20);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Store settings saved successfully!', 'success');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Settings className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest">
              Platform Configuration
            </span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1">Store & System Settings</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure backend API bridges, WhatsApp notification endpoints, and shipping matrices
          </p>
        </div>
      </div>

      {/* System Health / API Bridges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-2xl p-4 border border-slate-800">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-400 font-semibold flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-cyan-400" /> Backend Engine
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/40 font-mono text-[10px] font-bold">
              Port 5008
            </span>
          </div>
          <p className="text-sm font-bold text-white font-mono">http://localhost:5008</p>
          <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Express + TypeScript OK
          </p>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-400 font-semibold flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-emerald-400" /> MongoDB Atlas
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/40 font-mono text-[10px] font-bold">
              Cluster0
            </span>
          </div>
          <p className="text-sm font-bold text-white font-mono">Tunix-bot DB</p>
          <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Mongoose 8.23 Connected
          </p>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-400 font-semibold flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-indigo-400" /> Customer Web
            </span>
            <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/40 font-mono text-[10px] font-bold">
              Port 3000
            </span>
          </div>
          <p className="text-sm font-bold text-white font-mono">http://localhost:3000</p>
          <p className="text-[11px] text-cyan-400 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Next.js 16 Active
          </p>
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800/80 pb-3 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" /> General Store Credentials
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Store Title</label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Primary Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="USD ($)">USD ($)</option>
              <option value="BDT (৳)">BDT (৳)</option>
              <option value="EUR (€)">EUR (€)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              WhatsApp Support Hotline
            </label>
            <input
              type="text"
              value={supportPhone}
              onChange={(e) => setSupportPhone(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Super Admin Email
            </label>
            <input
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800/80 pb-3 pt-4 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-emerald-400" /> Shipping & Delivery Tariffs
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Inside Dhaka Delivery ($ USD)
            </label>
            <input
              type="number"
              value={insideDhakaFee}
              onChange={(e) => setInsideDhakaFee(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Outside Dhaka / Express Delivery ($ USD)
            </label>
            <input
              type="number"
              value={outsideDhakaFee}
              onChange={(e) => setOutsideDhakaFee(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-800">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}

