'use client';

import React, { useEffect } from 'react';
import { Trash2, AlertTriangle, X, ShieldAlert } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  itemName?: string;
  itemImage?: string;
  itemCategory?: string;
  itemPrice?: number;
  confirmText?: string;
  cancelText?: string;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete Product',
  message = 'Are you sure you want to delete this robot product? Once confirmed, this action cannot be undone and it will be permanently removed from your catalog.',
  itemName,
  itemImage,
  itemCategory,
  itemPrice,
  confirmText = 'Yes, Delete Robot',
  cancelText = 'Cancel',
}: DeleteConfirmModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-rose-950/20 z-10 animate-in zoom-in-95 duration-200 overflow-hidden">
        {/* Ambient red glow behind modal */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header Icon & Badge */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center shadow-lg shadow-rose-500/10 shrink-0 ring-4 ring-rose-500/10">
            <Trash2 className="w-6 h-6 text-rose-400" />
          </div>

          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400 bg-rose-950/60 border border-rose-800/40 px-2 py-0.5 rounded-full">
                Danger Zone
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">{title}</h3>
          </div>
        </div>

        {/* Modal Body Message */}
        <p className="text-xs text-slate-300 leading-relaxed mb-4">{message}</p>

        {/* Preview of item to be deleted */}
        {itemName && (
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800/90 flex items-center gap-3.5 mb-5">
            {itemImage && (
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 shrink-0">
                <img
                  src={itemImage}
                  alt={itemName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <span className="text-xs font-bold text-white truncate block">{itemName}</span>
              <div className="flex items-center gap-2 mt-0.5 text-[11px]">
                {itemCategory && (
                  <span className="text-cyan-400 font-mono">{itemCategory}</span>
                )}
                {itemPrice !== undefined && (
                  <span className="text-emerald-400 font-bold font-mono">${itemPrice}</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Security / Irreversible Warning Note */}
        <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-800/30 text-rose-300/90 text-[11px] flex items-center gap-2 mb-6">
          <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
          <span>This will permanently purge this item from memory and catalog records.</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-900 text-xs font-semibold transition-colors cursor-pointer"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-500 hover:from-rose-500 hover:to-red-400 text-white font-bold text-xs shadow-lg shadow-rose-500/25 transition-all cursor-pointer flex items-center gap-2"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{confirmText}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
