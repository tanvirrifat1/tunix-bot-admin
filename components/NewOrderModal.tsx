'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { OrderItem } from '@/lib/types';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Check,
  User,
  Phone,
  MapPin,
  Bot,
} from 'lucide-react';

interface NewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewOrderModal({ isOpen, onClose }: NewOrderModalProps) {
  const { products, createOrder } = useAdmin();

  // Customer form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [email, setEmail] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  // Selected items state
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);
  const [productToAddId, setProductToAddId] = useState(products[0]?.id || '');
  const [shippingFee, setShippingFee] = useState<number>(15);
  const [paymentMethod, setPaymentMethod] = useState<string>('Cash on Delivery');

  if (!isOpen) return null;

  const handleAddItem = () => {
    const product = products.find((p) => p.id === productToAddId);
    if (!product) return;

    const existingIndex = selectedItems.findIndex((item) => item.productId === product.id);
    if (existingIndex > -1) {
      const updated = [...selectedItems];
      updated[existingIndex].quantity += 1;
      updated[existingIndex].subtotal = updated[existingIndex].quantity * updated[existingIndex].unitPrice;
      setSelectedItems(updated);
    } else {
      setSelectedItems([
        ...selectedItems,
        {
          productId: product.id,
          productName: product.name,
          productImage: product.image,
          unitPrice: product.price,
          quantity: 1,
          subtotal: product.price,
        },
      ]);
    }
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    const updated = selectedItems
      .map((item) => {
        if (item.productId === productId) {
          const newQty = item.quantity + delta;
          if (newQty <= 0) return null;
          return {
            ...item,
            quantity: newQty,
            subtotal: newQty * item.unitPrice,
          };
        }
        return item;
      })
      .filter(Boolean) as OrderItem[];

    setSelectedItems(updated);
  };

  const handleRemoveItem = (productId: string) => {
    setSelectedItems(selectedItems.filter((i) => i.productId !== productId));
  };

  const subtotal = selectedItems.reduce((sum, item) => sum + item.subtotal, 0);
  const totalAmount = subtotal + (selectedItems.length > 0 ? shippingFee : 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !deliveryAddress.trim()) {
      alert('Please fill in customer name, phone number, and delivery address.');
      return;
    }
    if (selectedItems.length === 0) {
      alert('Please add at least one robot to the order.');
      return;
    }

    createOrder({
      customer: {
        fullName,
        phone,
        deliveryAddress,
        email: email || undefined,
        orderNotes: orderNotes || undefined,
      },
      items: selectedItems,
      subtotal,
      shippingFee,
      totalAmount,
      paymentMethod,
    });

    // Reset form
    setFullName('');
    setPhone('');
    setDeliveryAddress('');
    setEmail('');
    setOrderNotes('');
    setSelectedItems([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-slate-950 font-bold">
              <ShoppingBag className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Manual POS: Place Customer Order</h2>
              <p className="text-xs text-slate-400">
                Book direct customer phone orders, VIP requests, and dispatch bookings
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto py-5 space-y-6 pr-2">
          {/* Customer Details Section */}
          <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <User className="w-3.5 h-3.5" /> Customer Credentials
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Customer Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Tanvir Ahmed"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Phone Number (Mobile) *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 01712345678"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Delivery Address *
                </label>
                <textarea
                  rows={2}
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="House, Road, Area, City (e.g. Banasree, Dhaka)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@gmail.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Special Delivery Notes
                </label>
                <input
                  type="text"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Urgent delivery, call before arrival, etc."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* Add Products Section */}
          <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <Bot className="w-3.5 h-3.5" /> Select Robots / Products
            </h3>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <select
                value={productToAddId}
                onChange={(e) => setProductToAddId(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — ${p.price} ({p.inStock ? `${p.stockCount} in stock` : 'Out of stock'})
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={handleAddItem}
                className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Item
              </button>
            </div>

            {/* Selected items list */}
            {selectedItems.length === 0 ? (
              <p className="text-xs text-slate-500 py-3 text-center italic">
                No items added yet. Choose a robot from the dropdown and click "Add Item".
              </p>
            ) : (
              <div className="space-y-2 pt-2">
                {selectedItems.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-10 h-10 object-cover rounded-lg border border-slate-800 bg-slate-900"
                      />
                      <div>
                        <p className="text-xs font-bold text-white">{item.productName}</p>
                        <p className="text-[11px] text-slate-400 font-mono">
                          ${item.unitPrice} each
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-slate-800 bg-slate-900 rounded-lg">
                        <button
                          type="button"
                          onClick={() => handleUpdateQuantity(item.productId, -1)}
                          className="p-1 hover:text-white text-slate-400"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-mono font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleUpdateQuantity(item.productId, 1)}
                          className="p-1 hover:text-white text-slate-400"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-xs font-bold font-mono text-emerald-400 w-16 text-right">
                        ${item.subtotal}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.productId)}
                        className="text-slate-500 hover:text-rose-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Shipping Fee, Payment & Calculations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Delivery Area / Shipping Fee
              </label>
              <select
                value={shippingFee}
                onChange={(e) => setShippingFee(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value={0}>Free Delivery ($0)</option>
                <option value={15}>Standard Inside Dhaka ($15)</option>
                <option value={20}>Express / Outside Dhaka ($20)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="Cash on Delivery">Cash on Delivery (COD)</option>
                <option value="Mobile Banking (bKash/Nagad)">bKash / Nagad / Rocket</option>
                <option value="Bank Wire">Direct Bank Transfer</option>
              </select>
            </div>

            <div className="sm:col-span-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">Order Subtotal: ${subtotal}</span>
              <span className="text-slate-400">Shipping: ${shippingFee}</span>
              <span className="text-sm font-bold text-white">
                Grand Total:{' '}
                <span className="text-emerald-400 font-mono text-base">${totalAmount}</span>
              </span>
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Confirm & Dispatch Order</span>
          </button>
        </div>
      </div>
    </div>
  );
}

