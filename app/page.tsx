'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAdmin } from '@/context/AdminContext';
import SalesCharts from '@/components/SalesCharts';
import OrderDetailsModal from '@/components/OrderDetailsModal';
import ProductModal from '@/components/ProductModal';
import { Product, Order } from '@/lib/types';
import {
  DollarSign,
  ShoppingBag,
  Package,
  Layers,
  ArrowUpRight,
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Radio,
  Eye,
  Edit,
  Sparkles,
  Bot,
} from 'lucide-react';

export default function DashboardPage() {
  const { products, orders, categories, features, kpiStats, toggleStock } = useAdmin();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);

  // Recent 5 orders
  const recentOrders = orders.slice(0, 5);

  const handleEditProduct = (product: Product) => {
    setProductToEdit(product);
    setIsEditProductOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome & Status Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest">
              Control Hub Online • Ready
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1 tracking-tight">
            Tunix-Bot Mission Control
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Real-time management for robot models, customer dispatches, landing page CMS, and sales metrics.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white text-xs font-semibold transition-all group"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>Open Website</span>
          </a>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Sales / Revenue */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Store Revenue</span>
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <DollarSign className="w-4 h-4" />
            </span>
          </div>
          <p className="text-2xl lg:text-3xl font-black text-white mt-3 font-mono tracking-tight">
            ${kpiStats.totalRevenue.toLocaleString()}
          </p>
          <div className="mt-2.5 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+34.2%</span>
            <span className="text-slate-400 font-normal">vs previous cycle</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Customer Orders</span>
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShoppingBag className="w-4 h-4" />
            </span>
          </div>
          <p className="text-2xl lg:text-3xl font-black text-white mt-3 font-mono tracking-tight">
            {kpiStats.totalOrders}
          </p>
          <div className="mt-2.5 flex items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-medium">
              {kpiStats.pendingOrders} Pending
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium">
              {kpiStats.deliveredOrders} Delivered
            </span>
          </div>
        </div>

        {/* Robot Inventory */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Robot Models</span>
            <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Package className="w-4 h-4" />
            </span>
          </div>
          <p className="text-2xl lg:text-3xl font-black text-white mt-3 font-mono tracking-tight">
            {kpiStats.totalProducts} <span className="text-xs text-slate-400 font-normal">Active</span>
          </p>
          <div className="mt-2.5 flex items-center gap-1.5 text-xs">
            {kpiStats.outOfStockCount > 0 ? (
              <span className="text-rose-400 font-semibold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                {kpiStats.outOfStockCount} Out of stock
              </span>
            ) : (
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                All models in stock
              </span>
            )}
          </div>
        </div>

        {/* Categories & Landing CMS */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">CMS & Features</span>
            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Sparkles className="w-4 h-4" />
            </span>
          </div>
          <p className="text-2xl lg:text-3xl font-black text-white mt-3 font-mono tracking-tight">
            {kpiStats.activeFeatures}{' '}
            <span className="text-xs text-slate-400 font-normal">Landing Cards</span>
          </p>
          <div className="mt-2.5 text-xs text-slate-400">
            Across{' '}
            <span className="text-cyan-400 font-semibold">{kpiStats.totalCategories}</span> store
            categories
          </div>
        </div>
      </div>

      {/* Daily, Weekly, Monthly, Yearly Sales Progress Section */}
      <section>
        <SalesCharts />
      </section>

      {/* Grid: Recent Orders & Product Quick Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders (Takes 2 columns) */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-5 lg:p-6 border border-slate-800">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/60 mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-cyan-400" /> Recent Customer Orders
              </h3>
              <p className="text-xs text-slate-400">Live order confirmations and delivery status</p>
            </div>
            <Link
              href="/orders"
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
            >
              View All Orders <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                  <th className="pb-3 font-semibold">Order</th>
                  <th className="pb-3 font-semibold">Customer</th>
                  <th className="pb-3 font-semibold">Robots</th>
                  <th className="pb-3 font-semibold">Total</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {recentOrders.map((order) => {
                  let statusBadge = (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                      {order.status}
                    </span>
                  );

                  if (order.status === 'Pending Confirmation') {
                    statusBadge = (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        Pending
                      </span>
                    );
                  } else if (order.status === 'Processing') {
                    statusBadge = (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/15 text-blue-300 border border-blue-500/30">
                        Processing
                      </span>
                    );
                  } else if (order.status === 'Shipped') {
                    statusBadge = (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                        Shipped
                      </span>
                    );
                  } else if (order.status === 'Delivered') {
                    statusBadge = (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        Delivered
                      </span>
                    );
                  }

                  return (
                    <tr
                      key={order.orderNumber}
                      className="hover:bg-slate-900/40 transition-colors"
                    >
                      <td className="py-3 font-mono font-bold text-slate-200">
                        {order.orderNumber}
                      </td>
                      <td className="py-3">
                        <div className="font-semibold text-white">{order.customer.fullName}</div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {order.customer.phone}
                        </div>
                      </td>
                      <td className="py-3 text-slate-300">
                        {order.items.map((i) => i.productName).join(', ')}
                      </td>
                      <td className="py-3 font-mono font-bold text-emerald-400">
                        ${order.totalAmount}
                      </td>
                      <td className="py-3">{statusBadge}</td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold border border-slate-700 transition-colors cursor-pointer"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Robot Models Status Quick Card */}
        <div className="glass-card rounded-2xl p-5 lg:p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/60 mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Bot className="w-4 h-4 text-emerald-400" /> Robot Stock
                </h3>
                <p className="text-xs text-slate-400">Inventory levels and quick toggles</p>
              </div>
              <Link
                href="/products"
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Manage All
              </Link>
            </div>

            <div className="space-y-3">
              {products.slice(0, 4).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-9 h-9 rounded-lg object-cover bg-slate-950 border border-slate-800"
                    />
                    <div>
                      <p className="font-bold text-white truncate max-w-[130px]">{product.name}</p>
                      <p className="text-[11px] text-emerald-400 font-mono font-semibold">
                        ${product.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleStock(product.id)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition-colors cursor-pointer ${
                        product.inStock
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-500/40'
                          : 'bg-rose-500/10 text-rose-300 border-rose-500/30 hover:bg-emerald-500/20 hover:text-emerald-300 hover:border-emerald-500/40'
                      }`}
                      title="Click to toggle In-Stock status"
                    >
                      {product.inStock ? `${product.stockCount} left` : 'Out of stock'}
                    </button>

                    <button
                      onClick={() => handleEditProduct(product)}
                      className="p-1 text-slate-500 hover:text-cyan-400 transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/products"
            className="mt-4 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white text-center transition-all block"
          >
            + Add or Reconfigure Products
          </Link>
        </div>
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />

      {/* Edit Product Modal */}
      <ProductModal
        isOpen={isEditProductOpen}
        onClose={() => {
          setIsEditProductOpen(false);
          setProductToEdit(null);
        }}
        productToEdit={productToEdit}
      />
    </div>
  );
}
