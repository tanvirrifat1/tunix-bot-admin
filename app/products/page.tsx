'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Product } from '@/lib/types';
import ProductModal from '@/components/ProductModal';
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Star,
  Layers,
  Sparkles,
} from 'lucide-react';

export default function ProductsPage() {
  const { products, deleteProduct, toggleStock, categories } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [stockFilter, setStockFilter] = useState<'all' | 'inStock' | 'outOfStock'>('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesStock =
      stockFilter === 'all' ||
      (stockFilter === 'inStock' && p.inStock) ||
      (stockFilter === 'outOfStock' && !p.inStock);

    return matchesSearch && matchesCategory && matchesStock;
  });

  const handleOpenAdd = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setProductToEdit(p);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete robot "${name}"? This cannot be undone.`)) {
      deleteProduct(id);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Package className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest">
              Inventory & Catalog
            </span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1">Robot Products Management</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Add new robots, update prices, specs, descriptions, and toggle stock availability
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Deploy New Robot</span>
        </button>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by robot name, slug, features..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Category & Stock Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
          >
            <option value="All">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value as any)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Inventory</option>
            <option value="inStock">In Stock Only</option>
            <option value="outOfStock">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center border border-slate-800">
          <Package className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-300">No robot products found</h3>
          <p className="text-xs text-slate-500 mt-1">Try resetting your filters or deploy a new robot.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="glass-card rounded-2xl p-5 border border-slate-800/80 flex flex-col justify-between group hover:border-cyan-500/40 transition-all relative overflow-hidden"
            >
              <div>
                {/* Image & Badge Header */}
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800/80 mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  {product.badge && (
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-950/80 text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
                      {product.badge}
                    </span>
                  )}
                  <span
                    onClick={() => toggleStock(product.id)}
                    className={`absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border backdrop-blur-md cursor-pointer transition-colors ${
                      product.inStock
                        ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40 hover:bg-rose-950/80 hover:text-rose-400'
                        : 'bg-rose-950/80 text-rose-400 border-rose-500/40 hover:bg-emerald-950/80 hover:text-emerald-400'
                    }`}
                    title="Click to toggle stock availability"
                  >
                    {product.inStock ? `${product.stockCount} in stock` : 'Out of stock'}
                  </span>
                </div>

                {/* Title & Tagline */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono font-semibold uppercase text-cyan-400/80">
                      {product.category}
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {product.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-emerald-400 font-mono">
                      ${product.price}
                    </div>
                    {product.originalPrice && (
                      <div className="text-xs text-slate-500 line-through font-mono">
                        ${product.originalPrice}
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-400 mt-2 line-clamp-2">{product.tagline}</p>

                {/* Specs Snippets */}
                <div className="mt-3.5 pt-3 border-t border-slate-800/60 grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                  <div className="truncate">
                    <span className="text-slate-500">Screen:</span> {product.technicalSpecs?.display || 'OLED'}
                  </div>
                  <div className="truncate">
                    <span className="text-slate-500">Battery:</span> {product.technicalSpecs?.battery || 'Li-Ion'}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3.5 border-t border-slate-800 flex items-center justify-between gap-2">
                <a
                  href={`http://localhost:3000/shop/${product.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl text-slate-400 hover:text-cyan-400 hover:bg-slate-900 border border-slate-800 transition-colors"
                  title="Preview on Live Shop"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(product)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-800 hover:border-cyan-500/30 transition-colors cursor-pointer"
                  >
                    <Edit className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleDelete(product.id, product.name)}
                    className="p-1.5 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-colors cursor-pointer"
                    title="Delete product"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setProductToEdit(null);
        }}
        productToEdit={productToEdit}
      />
    </div>
  );
}

