'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '@/lib/types';
import { useAdmin } from '@/context/AdminContext';
import { X, Plus, Trash2, Image as ImageIcon, Sparkles, Check, Bot } from 'lucide-react';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
}

export default function ProductModal({
  isOpen,
  onClose,
  productToEdit,
}: ProductModalProps) {
  const { addProduct, updateProduct, categories } = useAdmin();

  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    slug: '',
    tagline: '',
    price: 149,
    originalPrice: 189,
    category: 'AI Companion',
    inStock: true,
    stockCount: 15,
    badge: 'New Arrival',
    rating: 4.9,
    reviewCount: 12,
    image: '/images/products/vector-x1.jpg',
    additionalImages: ['/images/products/vector-x1.jpg', '/images/hero/hero-banner.jpg'],
    features: ['Autonomous AI Edge Navigation', 'Animated OLED display', 'Voice & Gesture Recognition'],
    description: '',
    technicalSpecs: {
      display: '1.8" Curved OLED Screen',
      battery: 'Rechargeable Li-Ion (3 hrs continuous)',
      sensors: ['4x IR Cliff Sensors', 'Optical AI Camera', 'Touch Head Sensor'],
      connectivity: 'Wi-Fi 2.4GHz & Bluetooth 5.0 LE',
      dimensions: '99 x 71 x 69 mm',
      weight: '180g',
      materials: 'Anodized Matte Polymer & Silicone',
    },
    inTheBox: ['Robot Companion Unit', 'Charging Dock', 'USB-C Cable', 'Quick Start Guide'],
  });

  const [featureInput, setFeatureInput] = useState('');
  const [inTheBoxInput, setInTheBoxInput] = useState('');

  // Sample preset images for quick selection
  const presetImages = [
    { label: 'Vector X1', path: '/images/products/vector-x1.jpg' },
    { label: 'Eilik Bot', path: '/images/products/eilik-bot.jpg' },
    { label: 'Deskimon Duo', path: '/images/products/deskimon-duo.jpg' },
    { label: 'Deskimon Sprout', path: '/images/gallery/deskimon-sprout.jpg' },
    { label: 'Loona Pet', path: '/images/products/loona-pet.jpg' },
    { label: 'EMO Living', path: '/images/products/emo-living.jpg' },
    { label: 'Hero Banner', path: '/images/hero/hero-banner.jpg' },
  ];

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name,
        slug: productToEdit.slug,
        tagline: productToEdit.tagline,
        price: productToEdit.price,
        originalPrice: productToEdit.originalPrice,
        category: productToEdit.category,
        inStock: productToEdit.inStock,
        stockCount: productToEdit.stockCount,
        badge: productToEdit.badge || '',
        rating: productToEdit.rating || 5.0,
        reviewCount: productToEdit.reviewCount || 1,
        image: productToEdit.image,
        additionalImages: productToEdit.additionalImages || [productToEdit.image],
        features: productToEdit.features || [],
        description: productToEdit.description,
        technicalSpecs: productToEdit.technicalSpecs || {
          display: '',
          battery: '',
          sensors: [],
          connectivity: '',
          dimensions: '',
          weight: '',
          materials: '',
        },
        inTheBox: productToEdit.inTheBox || [],
      });
    } else {
      // Default reset
      setFormData({
        name: '',
        slug: '',
        tagline: '',
        price: 149,
        originalPrice: 179,
        category: categories[0]?.name || 'AI Companion',
        inStock: true,
        stockCount: 20,
        badge: 'New Release',
        rating: 4.9,
        reviewCount: 1,
        image: '/images/products/vector-x1.jpg',
        additionalImages: ['/images/products/vector-x1.jpg'],
        features: ['Autonomous desk navigation', 'Capacitive touch reactions', 'OLED animated facial expressions'],
        description: 'Next-generation smart desk robot designed for companionship, productivity sprints, and ambient joy.',
        technicalSpecs: {
          display: '1.8" Emerald Curved OLED',
          battery: 'Li-Ion 1200 mAh',
          sensors: ['IR Cliff Sensors', 'Optical AI Camera'],
          connectivity: 'Wi-Fi & Bluetooth LE',
          dimensions: '99 mm x 71 mm x 69 mm',
          weight: '190g',
          materials: 'Matte ABS Polymer, Silicone Treads',
        },
        inTheBox: ['Robot Companion', 'Magnetic Charging Station', 'Braided USB-C Cable', 'Owner Manual'],
      });
    }
  }, [productToEdit, isOpen, categories]);

  if (!isOpen) return null;

  const handleNameChange = (val: string) => {
    const slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setFormData((prev) => ({
      ...prev,
      name: val,
      slug: productToEdit ? prev.slug : slug,
    }));
  };

  const handleAddFeature = () => {
    if (!featureInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, featureInput.trim()],
    }));
    setFeatureInput('');
  };

  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleAddInTheBox = () => {
    if (!inTheBoxInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      inTheBox: [...prev.inTheBox, inTheBoxInput.trim()],
    }));
    setInTheBoxInput('');
  };

  const handleRemoveInTheBox = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      inTheBox: prev.inTheBox.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (productToEdit) {
      updateProduct(productToEdit.id, formData);
    } else {
      addProduct(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl p-6 lg:p-8 animate-in fade-in zoom-in-95 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {productToEdit ? `Edit Product: ${productToEdit.name}` : 'Deploy New Robot Product'}
              </h2>
              <p className="text-xs text-slate-400">
                Configure pricing, specs, inventory, and multimedia assets
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

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto py-5 space-y-6 pr-2">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Vector X2 Cyber Scout"
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
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="vector-x2-cyber-scout"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-300 font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Tagline (Headline summary)
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              placeholder="Autonomous AI desk rover with tracked mobility and spatial awareness"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Category, Badge & Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Badge / Tag
              </label>
              <input
                type="text"
                value={formData.badge || ''}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="Bestseller / New / Limited"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Inventory Stock Count
              </label>
              <input
                type="number"
                min="0"
                value={formData.stockCount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stockCount: parseInt(e.target.value) || 0,
                    inStock: parseInt(e.target.value) > 0,
                  })
                }
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80">
            <div>
              <label className="block text-xs font-semibold text-emerald-400 mb-1.5">
                Selling Price ($ USD) *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-base font-bold text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                Original / Regular Price ($ USD)
              </label>
              <input
                type="number"
                min="0"
                value={formData.originalPrice || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    originalPrice: e.target.value ? parseFloat(e.target.value) : undefined,
                  })
                }
                placeholder="Strike-through price"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-base text-slate-400 focus:outline-none focus:border-slate-600 font-mono"
              />
            </div>
          </div>

          {/* Image Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Primary Product Image Path
            </label>
            <div className="flex gap-3 items-center">
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
              <img
                src={formData.image}
                alt="Preview"
                className="w-11 h-11 object-cover rounded-xl border border-slate-700 bg-slate-900 shrink-0"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            {/* Quick preset thumbnail pills */}
            <div className="mt-2.5 flex flex-wrap gap-2">
              <span className="text-[11px] text-slate-500 self-center">Presets:</span>
              {presetImages.map((preset) => (
                <button
                  key={preset.path}
                  type="button"
                  onClick={() => setFormData({ ...formData, image: preset.path })}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                    formData.image === preset.path
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Product Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed description of features, personality, and user experience..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Features bullets */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Key Features List
            </label>
            <div className="flex gap-2 mb-2.5">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                placeholder="Add robot feature bullet..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddFeature();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 text-sm font-semibold rounded-xl border border-slate-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5 max-h-36 overflow-y-auto">
              {formData.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800/60 text-xs text-slate-300"
                >
                  <span>• {feat}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specs Accordion/Fields */}
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Technical Specifications
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 mb-1 block">Display:</span>
                <input
                  type="text"
                  value={formData.technicalSpecs.display}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      technicalSpecs: { ...formData.technicalSpecs, display: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200"
                />
              </div>
              <div>
                <span className="text-slate-400 mb-1 block">Battery:</span>
                <input
                  type="text"
                  value={formData.technicalSpecs.battery}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      technicalSpecs: { ...formData.technicalSpecs, battery: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200"
                />
              </div>
              <div>
                <span className="text-slate-400 mb-1 block">Connectivity:</span>
                <input
                  type="text"
                  value={formData.technicalSpecs.connectivity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      technicalSpecs: { ...formData.technicalSpecs, connectivity: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200"
                />
              </div>
              <div>
                <span className="text-slate-400 mb-1 block">Dimensions & Weight:</span>
                <input
                  type="text"
                  value={`${formData.technicalSpecs.dimensions} | ${formData.technicalSpecs.weight}`}
                  onChange={(e) => {
                    const parts = e.target.value.split('|');
                    setFormData({
                      ...formData,
                      technicalSpecs: {
                        ...formData,
                        technicalSpecs: {
                          ...formData.technicalSpecs,
                          dimensions: parts[0]?.trim() || '',
                          weight: parts[1]?.trim() || '',
                        },
                      }.technicalSpecs,
                    });
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200"
                />
              </div>
            </div>
          </div>

          {/* In the box */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Included In The Box
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={inTheBoxInput}
                onChange={(e) => setInTheBoxInput(e.target.value)}
                placeholder="e.g. Braided USB-C Cable (1.5m)"
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddInTheBox();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddInTheBox}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 text-sm font-semibold rounded-xl border border-slate-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.inTheBox.map((boxItem, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300"
                >
                  {boxItem}
                  <button
                    type="button"
                    onClick={() => handleRemoveInTheBox(idx)}
                    className="text-slate-500 hover:text-rose-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 text-sm font-semibold transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all cursor-pointer flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>{productToEdit ? 'Save Changes' : 'Publish Product'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

