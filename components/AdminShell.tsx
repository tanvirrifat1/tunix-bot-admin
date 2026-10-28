'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ToastContainer from '@/components/Toast';
import ProductModal from '@/components/ProductModal';
import NewOrderModal from '@/components/NewOrderModal';

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);
  const [isNewProductOpen, setIsNewProductOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Background ambient radial gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[140px]" />
      </div>

      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="lg:pl-72 flex flex-col min-h-screen relative z-10">
        <Header
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onOpenNewOrder={() => setIsNewOrderOpen(true)}
          onOpenNewProduct={() => setIsNewProductOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Global Modals & Notifications */}
      <ToastContainer />
      <NewOrderModal isOpen={isNewOrderOpen} onClose={() => setIsNewOrderOpen(false)} />
      <ProductModal isOpen={isNewProductOpen} onClose={() => setIsNewProductOpen(false)} />
    </div>
  );
}

