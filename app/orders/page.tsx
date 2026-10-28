'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Order, OrderStatus, PaymentStatus } from '@/lib/types';
import OrderDetailsModal from '@/components/OrderDetailsModal';
import NewOrderModal from '@/components/NewOrderModal';
import {
  ShoppingBag,
  Plus,
  Search,
  Filter,
  Eye,
  Trash2,
  MessageCircle,
  Truck,
  CheckCircle2,
  Clock,
  DollarSign,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export default function OrdersPage() {
  const { orders, updateOrderStatus, updatePaymentStatus, deleteOrder } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);

  const filterTabs: Array<{ label: string; value: string; count: number }> = [
    { label: 'All Orders', value: 'All', count: orders.length },
    {
      label: 'Pending',
      value: 'Pending Confirmation',
      count: orders.filter((o) => o.status === 'Pending Confirmation').length,
    },
    {
      label: 'Processing',
      value: 'Processing',
      count: orders.filter((o) => o.status === 'Processing').length,
    },
    {
      label: 'Shipped',
      value: 'Shipped',
      count: orders.filter((o) => o.status === 'Shipped').length,
    },
    {
      label: 'Delivered',
      value: 'Delivered',
      count: orders.filter((o) => o.status === 'Delivered').length,
    },
    {
      label: 'Cancelled',
      value: 'Cancelled',
      count: orders.filter((o) => o.status === 'Cancelled').length,
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.deliveryAddress.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleDelete = (orderNumber: string) => {
    if (confirm(`Remove order #${orderNumber} from records?`)) {
      deleteOrder(orderNumber);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <ShoppingBag className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest">
              Orders & POS Fulfillment
            </span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1">Orders Management & POS</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Process incoming robot orders, update delivery pipeline, chat with clients on WhatsApp, or place manual orders
          </p>
        </div>

        <button
          onClick={() => setIsNewOrderOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Order (Manual POS)</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col gap-4">
        {/* Status Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === tab.value
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-500/10'
                  : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  statusFilter === tab.value
                    ? 'bg-cyan-400 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by order #, customer name, phone number, city..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Orders Table */}
      {filteredOrders.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center border border-slate-800">
          <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-300">No matching orders found</h3>
          <p className="text-xs text-slate-500 mt-1">
            Try adjusting your search query or book a new manual order above.
          </p>
        </div>
      ) : (
        <div className="glass-card rounded-2xl border border-slate-800/80 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/50 text-slate-400 uppercase text-[10px] tracking-wider">
                  <th className="py-3.5 px-4 font-semibold">Order #</th>
                  <th className="py-3.5 px-4 font-semibold">Date</th>
                  <th className="py-3.5 px-4 font-semibold">Customer Details</th>
                  <th className="py-3.5 px-4 font-semibold">Items</th>
                  <th className="py-3.5 px-4 font-semibold">Total Amount</th>
                  <th className="py-3.5 px-4 font-semibold">Payment Status</th>
                  <th className="py-3.5 px-4 font-semibold">Order Status</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredOrders.map((order) => {
                  return (
                    <tr
                      key={order.orderNumber}
                      className="hover:bg-slate-900/40 transition-colors"
                    >
                      {/* Order # */}
                      <td className="py-3 px-4 font-mono font-bold text-cyan-400 whitespace-nowrap">
                        {order.orderNumber}
                      </td>

                      {/* Date */}
                      <td className="py-3 px-4 text-slate-400 whitespace-nowrap font-mono text-[11px]">
                        {new Date(order.createdAt).toLocaleDateString()}
                        <div className="text-[10px] text-slate-500">
                          {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>

                      {/* Customer */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-white">{order.customer.fullName}</div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {order.customer.phone}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate max-w-[180px]">
                          {order.customer.deliveryAddress}
                        </div>
                      </td>

                      {/* Items */}
                      <td className="py-3 px-4">
                        <div className="flex -space-x-2 overflow-hidden mb-1">
                          {order.items.map((i, idx) => (
                            <img
                              key={idx}
                              src={i.productImage}
                              alt={i.productName}
                              className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-900 object-cover bg-slate-950"
                              title={`${i.productName} (${i.quantity}x)`}
                            />
                          ))}
                        </div>
                        <div className="text-[11px] text-slate-300">
                          {order.items.reduce((sum, item) => sum + item.quantity, 0)} unit(s)
                        </div>
                      </td>

                      {/* Total Amount */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="font-mono font-bold text-emerald-400 text-sm">
                          ${order.totalAmount}
                        </span>
                        <div className="text-[10px] text-slate-500">
                          {order.shippingFee === 0 ? 'Free Shipping' : `+$${order.shippingFee} ship`}
                        </div>
                      </td>

                      {/* Payment Status Dropdown */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <select
                          value={order.paymentStatus}
                          onChange={(e) =>
                            updatePaymentStatus(order.orderNumber, e.target.value as PaymentStatus)
                          }
                          className={`text-[11px] font-bold px-2 py-1 rounded-lg border bg-slate-950 focus:outline-none cursor-pointer ${
                            order.paymentStatus === 'Paid'
                              ? 'text-emerald-400 border-emerald-500/40'
                              : order.paymentStatus === 'Unpaid'
                              ? 'text-amber-400 border-amber-500/40'
                              : 'text-rose-400 border-rose-500/40'
                          }`}
                        >
                          <option value="Unpaid">Unpaid</option>
                          <option value="Paid">Paid</option>
                          <option value="Refunded">Refunded</option>
                        </select>
                      </td>

                      {/* Order Status Dropdown */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(order.orderNumber, e.target.value as OrderStatus)
                          }
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border bg-slate-950 focus:outline-none cursor-pointer ${
                            order.status === 'Pending Confirmation'
                              ? 'text-amber-300 border-amber-500/40'
                              : order.status === 'Processing'
                              ? 'text-blue-300 border-blue-500/40'
                              : order.status === 'Shipped'
                              ? 'text-cyan-300 border-cyan-500/40'
                              : order.status === 'Delivered'
                              ? 'text-emerald-300 border-emerald-500/40'
                              : 'text-rose-400 border-rose-500/40'
                          }`}
                        >
                          <option value="Pending Confirmation">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={`https://wa.me/${order.customer.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(order.customer.fullName)}!%20Your%20order%20%23${order.orderNumber}%20is%20received.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-emerald-400 hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/20 transition-colors"
                            title="WhatsApp Customer"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>

                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="p-1.5 rounded-lg text-cyan-400 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/20 transition-colors cursor-pointer"
                            title="View Full Details / Print Receipt"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDelete(order.orderNumber)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                            title="Delete Order"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />

      {/* New Order / POS Modal */}
      <NewOrderModal
        isOpen={isNewOrderOpen}
        onClose={() => setIsNewOrderOpen(false)}
      />
    </div>
  );
}

