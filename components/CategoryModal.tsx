'use client';

import React, { useState, useEffect } from 'react';
import { Category } from '@/lib/types';
import { useAdmin } from '@/context/AdminContext';
import { X, Layers, Check, Bot, Heart, Clock, Users, Wrench, Shield, Sparkles, Cpu } from 'lucide-react';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryToEdit?: Category | null;
}

export default function CategoryModal({
  isOpen,
  onClose,
  categoryToEdit,
}: CategoryModalProps) {
  const { addCategory, updateCategory } = useAdmin();

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('Bot');
  const [isFeatured, setIsFeatured] = useState(true);

  const availableIcons = [
    { label: 'Bot', icon: Bot },
    { label: 'Heart', icon: Heart },
    { label: 'Clock', icon: Clock },
    { label: 'Users', icon: Users },
    { label: 'Wrench', icon: Wrench },
    { label: 'Shield', icon: Shield },
    { label: 'Sparkles', icon: Sparkles },
    { label: 'Cpu', icon: Cpu },
  ];

  useEffect(() => {
    if (categoryToEdit) {
      setName(categoryToEdit.name);
      setSlug(categoryToEdit.slug);
      setDescription(categoryToEdit.description);
      setIcon(categoryToEdit.icon);
      setIsFeatured(categoryToEdit.isFeatured);
    } else {
      setName('');
      setSlug('');
      setDescription('');
      setIcon('Bot');
      setIsFeatured(true);
    }
  }, [categoryToEdit, isOpen]);

  if (!isOpen) return null;

  const handleNameChange = (val: string) => {
    setName(val);
    if (!categoryToEdit) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (categoryToEdit) {
      updateCategory(categoryToEdit.id, {
        name,
        slug,
        description,
        icon,
        isFeatured,
      });
    } else {
      addCategory({
        name,
        slug,
        description,
        icon,
        isFeatured,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="w-full max-w-lg bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {categoryToEdit ? `Edit Category: ${categoryToEdit.name}` : 'Create New Category'}
              </h2>
              <p className="text-xs text-slate-400">Manage store taxonomies and robot segments</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="py-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Category Title *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Surveillance & Scout"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Slug (URL Identifier)
            </label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="surveillance-scout"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-300 font-mono focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Select Icon Style
            </label>
            <div className="grid grid-cols-4 gap-2">
              {availableIcons.map((item) => {
                const IconComponent = item.icon;
                const isSelected = icon === item.label;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setIcon(item.label)}
                    className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 ring-1 ring-cyan-500'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800/80 hover:text-slate-200'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="text-[10px]">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Category Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of robots in this collection..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <input
              type="checkbox"
              id="isFeatured"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-4 h-4 rounded text-cyan-500 bg-slate-800 border-slate-700 focus:ring-0"
            />
            <label htmlFor="isFeatured" className="text-xs font-medium text-slate-200 cursor-pointer">
              Show on Homepage & Navigation Bar as Featured
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>{categoryToEdit ? 'Save Changes' : 'Create Category'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

