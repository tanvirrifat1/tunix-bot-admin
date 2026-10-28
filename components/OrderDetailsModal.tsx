'use client';

import React from 'react';
import { Order, OrderStatus, PaymentStatus } from '@/lib/types';
import { useAdmin } from '@/context/AdminContext';
import {
  X,
  ShoppingBag,
  User,
  Phone,
  MapPin,
  Clock,
  Printer,
  MessageCircle,
  Truck,
  CheckCircle,
  AlertCircle,
  Copy,
} from 'lucide-react';

interface OrderDetailsModalProps {
  order: Order | null;
  onClose: () => void;
}

export default function OrderDetailsModal({
  order,
  onClose,
}: OrderDetailsModalProps) {
  const { updateOrderStatus, updatePaymentStatus, showToast } = useAdmin();

  if (!order) return null;

  const statuses: OrderStatus[] = [
    'Pending Confirmation',
    'Processing',
    'Shipped',
    'Delivered',
    'Cancelled',
  ];

  const paymentStatuses: PaymentStatus[] = ['Unpaid', 'Paid', 'Refunded'];

  const copyAddress = () => {
    navigator.clipboard.writeText(
      `${order.customer.fullName}\nPhone: ${order.customer.phone}\nAddress: ${order.customer.deliveryAddress}`
    );
    showToast('Customer shipping details copied to clipboard!', 'info');
  };

  const printReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 my-8">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60 font-bold">
                {order.orderNumber}
              </span>
              <span className="text-xs text-slate-400">
                {new Date(order.createdAt).toLocaleString()}
              </span>
            </div>
            <h2 className="text-lg font-black text-white mt-1">Order Details & Tracking</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="py-5 space-y-6 max-h-[70vh] overflow-y-auto pr-1">
          {/* Status & Payment Pipeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-cyan-400" />
                Fulfillment Status:
              </label>
              <select
                value={order.status}
                onChange={(e) => updateOrderStatus(order.orderNumber, e.target.value as OrderStatus)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                {statuses.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                Payment Status:
              </label>
              <select
                value={order.paymentStatus}
                onChange={(e) => updatePaymentStatus(order.orderNumber, e.target.value as PaymentStatus)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                {paymentStatuses.map((pst) => (
                  <option key={pst} value={pst}>
                    {pst}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Customer Details Card */}
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" /> Customer Information
              </h3>
              <button
                onClick={copyAddress}
                className="text-[11px] text-slate-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
              >
                <Copy className="w-3 h-3" /> Copy Address
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block">Full Name:</span>
                <span className="text-white font-semibold">{order.customer.fullName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Phone Number:</span>
                <a
                  href={`tel:${order.customer.phone}`}
                  className="text-cyan-400 font-mono font-bold hover:underline"
                >
                  {order.customer.phone}
                </a>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-500 block">Delivery Address:</span>
                <span className="text-slate-200 whitespace-pre-line">
                  {order.customer.deliveryAddress}
                </span>
              </div>
              {order.customer.email && (
                <div>
                  <span className="text-slate-500 block">Email Address:</span>
                  <span className="text-slate-300">{order.customer.email}</span>
                </div>
              )}
              {order.customer.orderNotes && (
                <div className="sm:col-span-2 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <span className="text-amber-400 font-semibold block text-[11px]">Customer Note:</span>
                  <span className="text-slate-300 italic text-[11px]">
                    "{order.customer.orderNotes}"
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Ordered Robot Products */}
          <div>
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" /> Purchased Robots & Units
            </h3>
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-800 bg-slate-950"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div>
                      <p className="text-xs font-bold text-white">{item.productName}</p>
                      <p className="text-[11px] text-slate-400 font-mono">
                        ${item.unitPrice} × {item.quantity} units
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-emerald-400 font-mono">
                    ${item.subtotal}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Totals */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal:</span>
              <span className="text-slate-200 font-mono font-medium">${order.subtotal}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Shipping Fee:</span>
              <span className="text-slate-200 font-mono font-medium">
                {order.shippingFee === 0 ? 'FREE' : `$${order.shippingFee}`}
              </span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Payment Method:</span>
              <span className="text-cyan-400 font-semibold">{order.paymentMethod}</span>
            </div>
            <div className="border-t border-slate-800 pt-2 flex justify-between items-center text-sm font-bold">
              <span className="text-white">Total Amount:</span>
              <span className="text-lg font-black text-emerald-400 font-mono">
                ${order.totalAmount}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${order.customer.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(order.customer.fullName)}!%20This%20is%20Tunix-Bot%20Store%20admin%20regarding%20your%20order%20%23${order.orderNumber}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Customer
            </a>
            <button
              onClick={printReceipt}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" /> Print Invoice
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

