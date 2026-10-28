/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  Link as LinkIcon,
  X,
  Check,
  Loader2,
  Sparkles,
  AlertCircle,
  Star,
  Trash2,
  Plus,
  Layers,
} from 'lucide-react';

export interface PresetImage {
  label: string;
  path: string;
}

interface ImageUploadProps {
  value: string; // Primary image URL
  onChange: (url: string) => void;
  additionalImages?: string[]; // Gallery images
  onAdditionalImagesChange?: (urls: string[]) => void;
  presetImages?: PresetImage[];
  label?: string;
  helperText?: string;
}

export default function ImageUpload({
  value,
  onChange,
  additionalImages = [],
  onAdditionalImagesChange,
  presetImages = [],
  label = 'Product Media & Images',
  helperText = 'Upload single or multiple images (PNG, JPG, WEBP, GIF, SVG). You can select multiple files at once.',
}: ImageUploadProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'presets' | 'url'>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingCount, setUploadingCount] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Combine primary and gallery into a unified list
  // Primary image is at index 0 (if set), followed by unique additional images
  const allImages: string[] = [];
  if (value && value.trim()) {
    allImages.push(value);
  }
  if (additionalImages && additionalImages.length > 0) {
    additionalImages.forEach((img) => {
      if (img && img.trim() && !allImages.includes(img)) {
        allImages.push(img);
      }
    });
  }

  // Handle uploading array of files (supports single or multiple)
  const handleFilesUpload = async (files: File[]) => {
    if (!files || files.length === 0) return;

    // Filter valid image files
    const validFiles = files.filter((f) => f.type.startsWith('image/'));
    if (validFiles.length === 0) {
      setUploadError('Please select valid image files (PNG, JPG, WEBP, GIF, SVG).');
      return;
    }

    // Check size (max 10MB each)
    const oversized = validFiles.some((f) => f.size > 10 * 1024 * 1024);
    if (oversized) {
      setUploadError('One or more images exceed the 10MB limit.');
      return;
    }

    setUploadError(null);
    setIsUploading(true);
    setUploadingCount(validFiles.length);

    try {
      const uploadFormData = new FormData();
      validFiles.forEach((file) => {
        uploadFormData.append('files', file);
      });

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await res.json();

      let newUrls: string[] = [];

      if (res.ok && data.success && Array.isArray(data.urls) && data.urls.length > 0) {
        newUrls = data.urls;
      } else if (res.ok && data.success && data.url) {
        newUrls = [data.url];
      } else {
        // Fallback: read each file via FileReader as Data URL
        newUrls = await Promise.all(
          validFiles.map(
            (file) =>
              new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                  resolve((reader.result as string) || '');
                };
                reader.readAsDataURL(file);
              })
          )
        );
        newUrls = newUrls.filter((u) => Boolean(u));
      }

      applyNewUploadedImages(newUrls);
      setSuccessMessage(
        newUrls.length > 1
          ? `Successfully uploaded ${newUrls.length} images!`
          : 'Image uploaded successfully!'
      );
      setTimeout(() => setSuccessMessage(null), 3500);
    } catch {
      // Offline fallback: FileReader Data URLs
      try {
        const fallbackUrls = await Promise.all(
          validFiles.map(
            (file) =>
              new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                  resolve((reader.result as string) || '');
                };
                reader.readAsDataURL(file);
              })
          )
        );
        const filtered = fallbackUrls.filter((u) => Boolean(u));
        applyNewUploadedImages(filtered);
        setSuccessMessage(`Loaded ${filtered.length} image(s)!`);
        setTimeout(() => setSuccessMessage(null), 3500);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Upload failed';
        setUploadError(msg);
      }
    } finally {
      setIsUploading(false);
      setUploadingCount(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const applyNewUploadedImages = (newUrls: string[]) => {
    if (newUrls.length === 0) return;

    if (!value || value.trim() === '') {
      // First image becomes primary
      const primary = newUrls[0];
      const remaining = newUrls.slice(1);
      onChange(primary);

      if (onAdditionalImagesChange) {
        const combined = Array.from(new Set([...(additionalImages || []), ...remaining]));
        onAdditionalImagesChange(combined);
      }
    } else {
      // Primary already exists, append all new images to additionalImages
      if (onAdditionalImagesChange) {
        const combined = Array.from(new Set([...(additionalImages || []), ...newUrls]));
        onAdditionalImagesChange(combined);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFilesUpload(Array.from(e.target.files));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesUpload(Array.from(e.dataTransfer.files));
    }
  };

  const setAsPrimary = (imgUrl: string) => {
    if (imgUrl === value) return; // already primary

    const oldPrimary = value;
    onChange(imgUrl);

    if (onAdditionalImagesChange) {
      // Remove imgUrl from additional, add oldPrimary to additional if valid
      const filtered = (additionalImages || []).filter((item) => item !== imgUrl);
      if (oldPrimary && !filtered.includes(oldPrimary)) {
        filtered.unshift(oldPrimary);
      }
      onAdditionalImagesChange(filtered);
    }
  };

  const removeImage = (imgUrl: string) => {
    if (imgUrl === value) {
      // Removing primary image
      if (additionalImages && additionalImages.length > 0) {
        // Promote first additional image to primary
        const [nextPrimary, ...rest] = additionalImages;
        onChange(nextPrimary);
        if (onAdditionalImagesChange) {
          onAdditionalImagesChange(rest);
        }
      } else {
        onChange('');
      }
    } else {
      // Removing from additional images
      if (onAdditionalImagesChange) {
        onAdditionalImagesChange((additionalImages || []).filter((item) => item !== imgUrl));
      }
    }
  };

  const handleAddUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;

    if (!value || value.trim() === '') {
      onChange(trimmed);
    } else {
      if (onAdditionalImagesChange) {
        onAdditionalImagesChange([...(additionalImages || []), trimmed]);
      }
    }
    setUrlInput('');
  };

  const handleSelectPreset = (presetPath: string) => {
    if (!value || value.trim() === '') {
      onChange(presetPath);
    } else {
      if (onAdditionalImagesChange) {
        if (!additionalImages.includes(presetPath) && value !== presetPath) {
          onAdditionalImagesChange([...additionalImages, presetPath]);
        }
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Header and Mode Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <label className="block text-xs font-semibold text-slate-200">
              {label} <span className="text-cyan-400">*</span>
            </label>
            {allImages.length > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-cyan-300 font-semibold border border-slate-700">
                <Layers className="w-3 h-3 text-cyan-400" />
                {allImages.length} {allImages.length === 1 ? 'image' : 'images'}
              </span>
            )}
          </div>
          {helperText && (
            <p className="text-[11px] text-slate-400 mt-0.5">{helperText}</p>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'upload'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Upload Files</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('presets')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'presets'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Presets</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'url'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>URL / Path</span>
          </button>
        </div>
      </div>

      {/* Hidden File Input with multiple attribute */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Feedback Alerts */}
      {uploadError && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{uploadError}</span>
          <button
            type="button"
            onClick={() => setUploadError(null)}
            className="ml-auto text-rose-400 hover:text-rose-200"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {successMessage && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
          <Check className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* TAB 1: Multiple File Upload Dropzone */}
      {activeTab === 'upload' && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative group rounded-2xl border-2 border-dashed p-6 transition-all text-center cursor-pointer flex flex-col items-center justify-center gap-2.5 ${
            isDragging
              ? 'border-cyan-400 bg-cyan-950/40 ring-4 ring-cyan-500/20'
              : 'border-slate-800 hover:border-cyan-500/60 bg-slate-900/50 hover:bg-slate-900/80'
          }`}
        >
          {isUploading ? (
            <div className="py-3 flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
              <span className="text-xs font-semibold text-cyan-300">
                Uploading {uploadingCount} {uploadingCount === 1 ? 'image' : 'images'} to server...
              </span>
              <span className="text-[11px] text-slate-400">Processing media assets, please wait</span>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                  Click to select multiple images or drag & drop files here
                </p>
                <p className="text-[11px] text-slate-400">
                  Select multiple photos at once with <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-300 border border-slate-700">Ctrl</kbd> / <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-300 border border-slate-700">Shift</kbd> (PNG, JPG, WEBP, GIF, SVG)
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* TAB 2: Presets */}
      {activeTab === 'presets' && (
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <span className="text-xs text-slate-400 block font-medium">
            Click to add pre-configured robot product assets to your gallery:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {presetImages.map((preset) => {
              const isIncluded = allImages.includes(preset.path);
              const isPrimary = value === preset.path;
              return (
                <button
                  key={preset.path}
                  type="button"
                  onClick={() => handleSelectPreset(preset.path)}
                  className={`group relative flex items-center gap-2 p-2 rounded-xl border text-left transition-all cursor-pointer ${
                    isPrimary
                      ? 'bg-cyan-500/15 border-cyan-500 text-white font-semibold shadow-sm shadow-cyan-500/20'
                      : isIncluded
                      ? 'bg-slate-900 border-cyan-500/40 text-cyan-300'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
                  }`}
                >
                  <img
                    src={preset.path}
                    alt={preset.label}
                    className="w-8 h-8 rounded-lg object-cover bg-slate-900 border border-slate-800 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-xs truncate block">{preset.label}</span>
                    {isPrimary && (
                      <span className="text-[10px] text-cyan-400 font-bold block">Primary</span>
                    )}
                  </div>
                  {isPrimary && (
                    <div className="w-4 h-4 rounded-full bg-cyan-500 flex items-center justify-center shrink-0">
                      <Star className="w-2.5 h-2.5 text-slate-950 fill-slate-950" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: URL / Path Input */}
      {activeTab === 'url' && (
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <label className="text-xs font-semibold text-slate-300 block">
            Add Image by URL or Local Path
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddUrl();
                }
              }}
              placeholder="e.g. /images/products/my-robot.jpg or https://..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
            />
            <button
              type="button"
              onClick={handleAddUrl}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
          <span className="text-[11px] text-slate-500 block">
            Enter a web link or local file path to include it in the product gallery.
          </span>
        </div>
      )}

      {/* GALLERY / MEDIA ASSET MANAGEMENT GRID */}
      {allImages.length > 0 && (
        <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-200">
                Uploaded Media Assets ({allImages.length})
              </span>
              <span className="text-[11px] text-slate-500">
                • Click star to set Primary Cover
              </span>
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-semibold transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add More Photos</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {allImages.map((imgUrl, idx) => {
              const isPrimary = imgUrl === value;
              return (
                <div
                  key={`${imgUrl}-${idx}`}
                  className={`group relative rounded-xl overflow-hidden border transition-all bg-slate-950 flex flex-col ${
                    isPrimary
                      ? 'border-cyan-500 ring-2 ring-cyan-500/30 shadow-md shadow-cyan-500/10'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-square w-full overflow-hidden bg-slate-900">
                    <img
                      src={imgUrl}
                      alt={`Product Asset ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLElement).style.opacity = '0.4';
                      }}
                    />

                    {/* Badge: Primary vs Gallery */}
                    <div className="absolute top-2 left-2 flex gap-1">
                      {isPrimary ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-cyan-500 text-slate-950 shadow-sm">
                          <Star className="w-2.5 h-2.5 fill-slate-950" />
                          Primary Cover
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-slate-900/80 backdrop-blur-xs text-slate-400 border border-slate-700/60">
                          Gallery #{idx}
                        </span>
                      )}
                    </div>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={() => removeImage(imgUrl)}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-900/80 hover:bg-rose-500/90 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="Delete image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Card Footer Controls */}
                  <div className="p-2 bg-slate-900/90 border-t border-slate-800/80 flex items-center justify-between gap-1 text-[11px]">
                    <span className="font-mono text-slate-400 truncate max-w-[90px]" title={imgUrl}>
                      {imgUrl.split('/').pop() || imgUrl}
                    </span>

                    {!isPrimary ? (
                      <button
                        type="button"
                        onClick={() => setAsPrimary(imgUrl)}
                        className="flex items-center gap-1 px-2 py-1 rounded-md bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 font-semibold text-[10px] transition-colors cursor-pointer"
                        title="Set this image as primary product cover"
                      >
                        <Star className="w-2.5 h-2.5" />
                        <span>Make Cover</span>
                      </button>
                    ) : (
                      <span className="text-[10px] text-cyan-400 font-semibold">Active</span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Quick Add Card */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square rounded-xl border-2 border-dashed border-slate-800 hover:border-cyan-500/60 bg-slate-900/30 hover:bg-slate-900/60 flex flex-col items-center justify-center gap-2 p-3 text-center cursor-pointer transition-all group"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-800 group-hover:bg-cyan-500/20 text-slate-400 group-hover:text-cyan-400 flex items-center justify-center transition-colors">
                <Plus className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-semibold text-slate-400 group-hover:text-cyan-300 transition-colors">
                Add More Images
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
