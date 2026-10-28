'use client';

import React, { useState } from 'react';
import {
  Menu,
  Bell,
  Search,
  Plus,
  ShoppingBag,
  PackagePlus,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

interface HeaderProps {
  onToggleSidebar: () => void;
  onOpenNewOrder: () => void;
  onOpenNewProduct: () => void;
}

export default function Header({
  onToggleSidebar,
  onOpenNewOrder,
  onOpenNewProduct,
}: HeaderProps) {
  const { kpiStats, orders } = useAdmin();
  const [showNotifications, setShowNotifications] = useState(false);

  const pendingOrders = orders.filter((o) => o.status === 'Pending Confirmation').slice(0, 4);

  return (
    <header className="sticky top-0 z-30 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-4 lg:px-8 flex items-center justify-between gap-4">
      {/* Left: Mobile hamburger & Global quick search */}
      <div className="flex items-center gap-3 flex-1 max-w-lg">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800"
          aria-label="Toggle Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full hidden sm:block">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search products, orders, customers..."
            className="w-full bg-slate-900/90 border border-slate-800 text-sm rounded-xl pl-9 pr-4 py-2 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
          />
        </div>
      </div>

      {/* Right: Quick Actions & Admin Profile */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Fast Action: New Order (POS) */}
        <button
          onClick={onOpenNewOrder}
          className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span className="hidden sm:inline">New Order (POS)</span>
          <span className="sm:hidden">Order</span>
        </button>

        {/* Fast Action: Add Product */}
        <button
          onClick={onOpenNewProduct}
          className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white text-xs sm:text-sm font-semibold border border-slate-700/80 hover:border-slate-600 transition-all cursor-pointer"
        >
          <PackagePlus className="w-4 h-4 text-emerald-400" />
          <span className="hidden sm:inline">Add Product</span>
          <span className="sm:hidden">+ Product</span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 relative transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {kpiStats.pendingOrders > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 text-slate-950 font-bold text-[10px] rounded-full flex items-center justify-center animate-pulse">
                {kpiStats.pendingOrders}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
                <span className="text-sm font-bold text-white">Incoming Orders</span>
                <span className="text-[11px] text-cyan-400 font-semibold bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded-full">
                  {kpiStats.pendingOrders} Pending
                </span>
              </div>

              {pendingOrders.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-500">
                  <CheckCircle className="w-6 h-6 mx-auto mb-2 text-emerald-400/60" />
                  All orders are processed and up to date!
                </div>
              ) : (
                <div className="space-y-2.5 max-h-64 overflow-y-auto">
                  {pendingOrders.map((order) => (
                    <div
                      key={order.orderNumber}
                      className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/70 hover:border-cyan-500/30 transition-all text-xs"
                    >
                      <div className="flex items-center justify-between font-semibold text-slate-200">
                        <span>{order.orderNumber}</span>
                        <span className="text-emerald-400">${order.totalAmount}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                        {order.customer.fullName} • {order.customer.phone}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Admin Profile Chip */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-800/80">
          <div className="relative">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center font-bold text-xs text-white shadow-md">
              RK
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-950" />
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-bold text-slate-200 flex items-center gap-1">
              Rifat Khan
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 inline" />
            </div>
            <p className="text-[10px] text-slate-400">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}

