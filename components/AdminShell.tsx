'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ToastContainer from '@/components/Toast';
import ProductModal from '@/components/ProductModal';
import NewOrderModal from '@/components/NewOrderModal';
import { Loader2, ShieldAlert } from 'lucide-react';

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);
  const [isNewProductOpen, setIsNewProductOpen] = useState(false);

  const isLoginPage = pathname === '/login';

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isLoginPage) {
      router.replace('/login');
    }
  }, [isLoading, isAuthenticated, isLoginPage, router]);

  // If on login page, render clean full-screen view
  if (isLoginPage) {
    return (
      <>
        {children}
        <ToastContainer />
      </>
    );
  }

  // Loading state while checking authentication credentials
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#080c14] flex flex-col items-center justify-center text-slate-300">
        <Loader2 className="w-10 h-10 text-cyan-400 animate-spin mb-4" />
        <span className="text-xs font-mono tracking-widest text-cyan-400/80 uppercase">
          Verifying Security Clearance...
        </span>
      </div>
    );
  }

  // If not authenticated and not on login page yet, show security shield while redirecting
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#080c14] flex flex-col items-center justify-center text-slate-300 space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <span className="text-xs font-mono tracking-wider text-amber-300 uppercase">
          Authentication Required • Redirecting to Gateway...
        </span>
      </div>
    );
  }

  // Authenticated Dashboard Layout
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
