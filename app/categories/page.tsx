'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Category } from '@/lib/types';
import CategoryModal from '@/components/CategoryModal';
import {
  Layers,
  Plus,
  Edit,
  Trash2,
  Bot,
  Heart,
  Clock,
  Users,
  Wrench,
  Shield,
  Sparkles,
  Cpu,
  Package,
} from 'lucide-react';

export default function CategoriesPage() {
  const { categories, products, deleteCategory } = useAdmin();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);

  const iconMap: Record<string, any> = {
    Bot,
    Heart,
    Clock,
    Users,
    Wrench,
    Shield,
    Sparkles,
    Cpu,
  };

  const handleOpenAdd = () => {
    setCategoryToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c: Category) => {
    setCategoryToEdit(c);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    const attachedCount = products.filter(
      (p) => p.category.toLowerCase() === name.toLowerCase()
    ).length;

    if (attachedCount > 0) {
      if (
        !confirm(
          `Category "${name}" currently has ${attachedCount} robot product(s) linked to it. Are you sure you want to delete this category?`
        )
      ) {
        return;
      }
    } else {
      if (!confirm(`Delete category "${name}"?`)) return;
    }
    deleteCategory(id);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Layers className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest">
              Store Taxonomy
            </span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1">Categories Management</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Organize robot series, accessory groups, and featured collections
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((category) => {
          const IconComponent = iconMap[category.icon] || Bot;
          const liveProductCount = products.filter(
            (p) => p.category.toLowerCase() === category.name.toLowerCase()
          ).length;

          return (
            <div
              key={category.id}
              className="glass-card rounded-2xl p-5 border border-slate-800/80 flex flex-col justify-between group hover:border-cyan-500/40 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-md">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <div className="flex items-center gap-1.5">
                    {category.isFeatured && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        Featured
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                      <Package className="w-3 h-3 text-cyan-400" />
                      {liveProductCount} Robots
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {category.name}
                </h3>
                <p className="text-[11px] font-mono text-cyan-400/80 mt-0.5">/{category.slug}</p>
                <p className="text-xs text-slate-400 mt-2.5 line-clamp-3">
                  {category.description || 'No description provided.'}
                </p>
              </div>

              {/* Actions Footer */}
              <div className="mt-5 pt-3.5 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  {liveProductCount === 0 ? 'No products linked' : `${liveProductCount} active items`}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(category)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-800 hover:border-cyan-500/30 transition-colors cursor-pointer"
                  >
                    <Edit className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleDelete(category.id, category.name)}
                    className="p-1.5 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-colors cursor-pointer"
                    title="Delete category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCategoryToEdit(null);
        }}
        categoryToEdit={categoryToEdit}
      />
    </div>
  );
}

