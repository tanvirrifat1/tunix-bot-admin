'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { FeatureItem } from '@/lib/types';
import FeatureModal from '@/components/FeatureModal';
import {
  Sparkles,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  Eye,
  EyeOff,
  ExternalLink,
} from 'lucide-react';

export default function FeaturesPage() {
  const { features, deleteFeature, toggleFeatureActive } = useAdmin();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [featureToEdit, setFeatureToEdit] = useState<FeatureItem | null>(null);

  const handleOpenAdd = () => {
    setFeatureToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (f: FeatureItem) => {
    setFeatureToEdit(f);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Remove landing feature card "${title}"?`)) {
      deleteFeature(id);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest">
              Landing Page CMS
            </span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1">Features Section CMS</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage the interactive highlights and selling points shown on Tunix-Bot's homepage
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="http://localhost:3000/features"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white text-xs font-semibold transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            <span>Frontend Preview</span>
          </a>

          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Feature Card</span>
          </button>
        </div>
      </div>

      {/* Grid of Feature Cards (Styling inspired by frontend FeaturesGrid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((feature) => (
          <div
            key={feature.id}
            className={`glass-card rounded-2xl p-5 border flex flex-col justify-between group transition-all relative overflow-hidden ${
              feature.isActive
                ? 'border-slate-800/80 hover:border-cyan-500/50'
                : 'border-slate-800/40 opacity-60 bg-slate-950/40'
            }`}
          >
            {/* Ambient background glow matching preset */}
            <div
              className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${
                feature.glowColor || 'from-cyan-500/20 to-blue-500/20'
              } blur-2xl pointer-events-none`}
            />

            <div>
              {/* Header with emoji and active pill */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>

                <div className="flex items-center gap-1.5">
                  {feature.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800/50">
                      {feature.badge}
                    </span>
                  )}
                  <button
                    onClick={() => toggleFeatureActive(feature.id)}
                    className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                      feature.isActive
                        ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800/40 hover:bg-slate-800'
                        : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-white'
                    }`}
                    title={feature.isActive ? 'Active on website (click to hide)' : 'Hidden (click to show)'}
                  >
                    {feature.isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-xs text-slate-400 mt-2 line-clamp-3">
                {feature.description}
              </p>
            </div>

            {/* Actions footer */}
            <div className="mt-5 pt-3.5 border-t border-slate-800/60 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500">
                {feature.isActive ? 'Visible Live' : 'Draft / Inactive'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(feature)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-800 hover:border-cyan-500/30 transition-colors cursor-pointer"
                >
                  <Edit className="w-3 h-3 text-cyan-400" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => handleDelete(feature.id, feature.title)}
                  className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                  title="Delete card"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <FeatureModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setFeatureToEdit(null);
        }}
        featureToEdit={featureToEdit}
      />
    </div>
  );
}

