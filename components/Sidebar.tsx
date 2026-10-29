'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Layers,
  Sparkles,
  ShoppingBag,
  TrendingUp,
  Settings,
  ExternalLink,
  Bot,
  CircleDot,
  Radio,
  LogOut,
} from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { useAuth } from '@/context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const { kpiStats } = useAdmin();
  const { logout } = useAuth();

  const navItems = [
    {
      name: 'Dashboard',
      href: '/',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: 'Sales Progress',
      href: '/analytics',
      icon: TrendingUp,
      badge: 'Live',
    },
    {
      name: 'Products',
      href: '/products',
      icon: Package,
      badge: kpiStats.totalProducts.toString(),
    },
    {
      name: 'Categories',
      href: '/categories',
      icon: Layers,
      badge: kpiStats.totalCategories.toString(),
    },
    {
      name: 'Features Section',
      href: '/features',
      icon: Sparkles,
      badge: `${kpiStats.activeFeatures} Active`,
    },
    {
      name: 'Orders & POS',
      href: '/orders',
      icon: ShoppingBag,
      badge: kpiStats.pendingOrders > 0 ? `${kpiStats.pendingOrders} New` : null,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    },
    {
      name: 'Store Settings',
      href: '/settings',
      icon: Settings,
      badge: null,
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 bg-slate-950/95 border-r border-slate-800/80 backdrop-blur-2xl flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo & Brand Header */}
        <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 ring-1 ring-white/20 group-hover:scale-105 transition-transform">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg tracking-wider text-white">
                  TUNIX<span className="text-cyan-400">.</span>BOT
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded">
                  Admin
                </span>
              </div>
              <p className="text-xs text-slate-400">Mission Control Hub</p>
            </div>
          </Link>
        </div>

        {/* Server & Node Status Widget */}
        <div className="px-5 py-3 border-b border-slate-800/50 bg-slate-900/40">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-300 font-medium">Core Systems</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full">
              PORT 5008 OK
            </span>
          </div>
        </div>

        {/* Main Navigation Links */}
        <nav className="flex-1 px-4 py-5 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Management & Metrics
          </div>

          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/15 to-emerald-500/10 text-cyan-300 border border-cyan-500/30 shadow-lg shadow-cyan-500/5 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive
                        ? 'text-cyan-400'
                        : 'text-slate-500 group-hover:text-slate-300'
                    }`}
                  />
                  <span>{item.name}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full border font-semibold ${
                      item.badgeColor ||
                      (isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                        : 'bg-slate-800/80 text-slate-400 border-slate-700/60')
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer / Store preview link */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/80">
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium text-slate-300 bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 hover:text-cyan-300 transition-all group"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              <span>Preview Live Shop</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">:3000</span>
          </a>

          <button
            type="button"
            onClick={logout}
            className="w-full mt-2 flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-rose-400/90 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/25 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <LogOut className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              <span>Lock & Sign Out</span>
            </div>
            <span className="text-[10px] text-rose-400 font-mono">Exit</span>
          </button>

          <div className="mt-3 flex items-center justify-between px-1">
            <span className="text-[11px] text-slate-400">Tunix-Bot Core v2.4</span>
            <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
              <CircleDot className="w-2.5 h-2.5" /> Synchronized
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}

