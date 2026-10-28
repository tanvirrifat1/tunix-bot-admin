'use client';

import React, { useState, useEffect } from 'react';
import { FeatureItem } from '@/lib/types';
import { useAdmin } from '@/context/AdminContext';
import { X, Sparkles, Check } from 'lucide-react';

interface FeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureToEdit?: FeatureItem | null;
}

export default function FeatureModal({
  isOpen,
  onClose,
  featureToEdit,
}: FeatureModalProps) {
  const { addFeature, updateFeature } = useAdmin();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('🤖');
  const [badge, setBadge] = useState('Core Feature');
  const [glowColor, setGlowColor] = useState('from-cyan-500/20 to-blue-500/20');
  const [isActive, setIsActive] = useState(true);

  const emojiPresets = ['🤖', '😊', '⏱️', '💬', '🔋', '🎨', '🛡️', '🎯', '⚡', '🧠', '✨', '📡'];

  const glowPresets = [
    { label: 'Cyan / Blue', value: 'from-cyan-500/20 to-blue-500/20' },
    { label: 'Emerald / Teal', value: 'from-emerald-500/20 to-teal-500/20' },
    { label: 'Amber / Orange', value: 'from-amber-500/20 to-orange-500/20' },
    { label: 'Rose / Pink', value: 'from-rose-500/20 to-pink-500/20' },
    { label: 'Purple / Indigo', value: 'from-purple-500/20 to-indigo-500/20' },
  ];

  useEffect(() => {
    if (featureToEdit) {
      setTitle(featureToEdit.title);
      setDescription(featureToEdit.description);
      setIcon(featureToEdit.icon);
      setBadge(featureToEdit.badge || '');
      setGlowColor(featureToEdit.glowColor || 'from-cyan-500/20 to-blue-500/20');
      setIsActive(featureToEdit.isActive);
    } else {
      setTitle('');
      setDescription('');
      setIcon('🤖');
      setBadge('Core Tech');
      setGlowColor('from-cyan-500/20 to-blue-500/20');
      setIsActive(true);
    }
  }, [featureToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (featureToEdit) {
      updateFeature(featureToEdit.id, {
        title,
        description,
        icon,
        badge,
        glowColor,
        isActive,
      });
    } else {
      addFeature({
        title,
        description,
        icon,
        badge,
        glowColor,
        isActive,
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
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {featureToEdit ? `Edit Feature: ${featureToEdit.title}` : 'Add Landing Page Feature'}
              </h2>
              <p className="text-xs text-slate-400">Display highlight cards on the frontend website</p>
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
              Icon / Emoji
            </label>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-14 text-center text-xl bg-slate-900 border border-slate-800 rounded-xl py-2 text-white focus:outline-none focus:border-cyan-500"
              />
              <div className="flex flex-wrap gap-1.5 flex-1">
                {emojiPresets.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setIcon(emoji)}
                    className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 flex items-center justify-center text-sm"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Feature Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Neural Edge Learning"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Badge Tag
            </label>
            <input
              type="text"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              placeholder="e.g. Signature, AI Edge, Sensor"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Glow Ambient Theme
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {glowPresets.map((gp) => (
                <button
                  key={gp.value}
                  type="button"
                  onClick={() => setGlowColor(gp.value)}
                  className={`px-2.5 py-1.5 rounded-xl border text-[11px] transition-all ${
                    glowColor === gp.value
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {gp.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Clear summary of what this robotic feature does..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <input
              type="checkbox"
              id="featureIsActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-4 h-4 rounded text-cyan-500 bg-slate-800 border-slate-700"
            />
            <label htmlFor="featureIsActive" className="text-xs font-medium text-slate-200 cursor-pointer">
              Active (Visible immediately on frontend FeaturesGrid)
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
              <span>{featureToEdit ? 'Save Changes' : 'Publish Feature'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

