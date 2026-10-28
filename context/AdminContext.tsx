'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Category,
  FeatureItem,
  Order,
  OrderStatus,
  PaymentStatus,
} from '@/lib/types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_FEATURES,
  INITIAL_ORDERS,
  SALES_PROGRESS_DATA,
} from '@/lib/initialData';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AdminContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleStock: (id: string) => void;

  // Categories
  categories: Category[];
  addCategory: (category: Omit<Category, 'id' | 'productCount'>) => void;
  updateCategory: (id: string, updated: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  // Features
  features: FeatureItem[];
  addFeature: (feature: Omit<FeatureItem, 'id'>) => void;
  updateFeature: (id: string, updated: Partial<FeatureItem>) => void;
  deleteFeature: (id: string) => void;
  toggleFeatureActive: (id: string) => void;

  // Orders
  orders: Order[];
  createOrder: (orderData: {
    customer: Order['customer'];
    items: Order['items'];
    subtotal: number;
    shippingFee: number;
    totalAmount: number;
    paymentMethod: string;
  }) => Order;
  updateOrderStatus: (orderNumber: string, status: OrderStatus) => void;
  updatePaymentStatus: (orderNumber: string, paymentStatus: PaymentStatus) => void;
  deleteOrder: (orderNumber: string) => void;

  // Analytics
  salesData: typeof SALES_PROGRESS_DATA;
  kpiStats: {
    totalRevenue: number;
    totalOrders: number;
    pendingOrders: number;
    deliveredOrders: number;
    totalProducts: number;
    outOfStockCount: number;
    totalCategories: number;
    activeFeatures: number;
  };

  // Toast
  toasts: ToastMessage[];
  showToast: (message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [features, setFeatures] = useState<FeatureItem[]>(INITIAL_FEATURES);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Initialize from LocalStorage if available
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const storedProducts = localStorage.getItem('tunix_admin_products');
      if (storedProducts) setProducts(JSON.parse(storedProducts));

      const storedCategories = localStorage.getItem('tunix_admin_categories');
      if (storedCategories) setCategories(JSON.parse(storedCategories));

      const storedFeatures = localStorage.getItem('tunix_admin_features');
      if (storedFeatures) setFeatures(JSON.parse(storedFeatures));

      const storedOrders = localStorage.getItem('tunix_admin_orders');
      if (storedOrders) setOrders(JSON.parse(storedOrders));
    } catch (e) {
      console.warn('Failed to load cached admin data:', e);
    }
  }, []);

  // Save to LocalStorage upon changes
  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    try {
      localStorage.setItem('tunix_admin_products', JSON.stringify(newProducts));
    } catch (e) {}
  };

  const saveCategories = (newCategories: Category[]) => {
    setCategories(newCategories);
    try {
      localStorage.setItem('tunix_admin_categories', JSON.stringify(newCategories));
    } catch (e) {}
  };

  const saveFeatures = (newFeatures: FeatureItem[]) => {
    setFeatures(newFeatures);
    try {
      localStorage.setItem('tunix_admin_features', JSON.stringify(newFeatures));
    } catch (e) {}
  };

  const saveOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    try {
      localStorage.setItem('tunix_admin_orders', JSON.stringify(newOrders));
    } catch (e) {}
  };

  // Toast helper
  const showToast = (message: string, type: ToastMessage['type'] = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // ---------------- PRODUCT ACTIONS ----------------
  const addProduct = (product: Omit<Product, 'id'>) => {
    const id = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `prod-${Date.now()}`;
    const newProduct: Product = { ...product, id };
    const updated = [newProduct, ...products];
    saveProducts(updated);
    showToast(`Product "${product.name}" added successfully!`, 'success');
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    const updated = products.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
    saveProducts(updated);
    showToast('Product updated successfully!', 'info');
  };

  const deleteProduct = (id: string) => {
    const p = products.find((item) => item.id === id);
    const updated = products.filter((item) => item.id !== id);
    saveProducts(updated);
    showToast(`Product "${p?.name || id}" removed.`, 'warning');
  };

  const toggleStock = (id: string) => {
    const updated = products.map((p) => {
      if (p.id === id) {
        const nextState = !p.inStock;
        return {
          ...p,
          inStock: nextState,
          stockCount: nextState ? (p.stockCount > 0 ? p.stockCount : 10) : 0,
        };
      }
      return p;
    });
    saveProducts(updated);
    showToast('Product stock status updated.', 'info');
  };

  // ---------------- CATEGORY ACTIONS ----------------
  const addCategory = (cat: Omit<Category, 'id' | 'productCount'>) => {
    const id = cat.slug || cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newCat: Category = { ...cat, id, productCount: 0 };
    const updated = [...categories, newCat];
    saveCategories(updated);
    showToast(`Category "${cat.name}" added!`, 'success');
  };

  const updateCategory = (id: string, updatedFields: Partial<Category>) => {
    const updated = categories.map((c) => (c.id === id ? { ...c, ...updatedFields } : c));
    saveCategories(updated);
    showToast('Category updated.', 'info');
  };

  const deleteCategory = (id: string) => {
    const c = categories.find((item) => item.id === id);
    const updated = categories.filter((item) => item.id !== id);
    saveCategories(updated);
    showToast(`Category "${c?.name || id}" deleted.`, 'warning');
  };

  // ---------------- FEATURE ACTIONS ----------------
  const addFeature = (feat: Omit<FeatureItem, 'id'>) => {
    const id = `feat-${Date.now()}`;
    const newFeat: FeatureItem = { ...feat, id };
    const updated = [newFeat, ...features];
    saveFeatures(updated);
    showToast(`Feature "${feat.title}" added to landing page!`, 'success');
  };

  const updateFeature = (id: string, updatedFields: Partial<FeatureItem>) => {
    const updated = features.map((f) => (f.id === id ? { ...f, ...updatedFields } : f));
    saveFeatures(updated);
    showToast('Feature updated.', 'info');
  };

  const deleteFeature = (id: string) => {
    const f = features.find((item) => item.id === id);
    const updated = features.filter((item) => item.id !== id);
    saveFeatures(updated);
    showToast(`Feature "${f?.title || id}" deleted.`, 'warning');
  };

  const toggleFeatureActive = (id: string) => {
    const updated = features.map((f) => (f.id === id ? { ...f, isActive: !f.isActive } : f));
    saveFeatures(updated);
    showToast('Feature display visibility toggled.', 'info');
  };

  // ---------------- ORDER ACTIONS ----------------
  const createOrder = (orderData: {
    customer: Order['customer'];
    items: Order['items'];
    subtotal: number;
    shippingFee: number;
    totalAmount: number;
    paymentMethod: string;
  }): Order => {
    const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `RBT-2026-${randomCode}${randomNum}`;

    const newOrder: Order = {
      orderNumber,
      createdAt: new Date().toISOString(),
      status: 'Pending Confirmation',
      paymentStatus: 'Unpaid',
      customer: orderData.customer,
      items: orderData.items,
      subtotal: orderData.subtotal,
      shippingFee: orderData.shippingFee,
      totalAmount: orderData.totalAmount,
      paymentMethod: orderData.paymentMethod,
      whatsappQueryUrl: `https://wa.me/${orderData.customer.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(orderData.customer.fullName)}!%20Your%20Tunix-Bot%20order%20%23${orderNumber}%20is%20received.`,
    };

    const updated = [newOrder, ...orders];
    saveOrders(updated);
    showToast(`Order #${orderNumber} created successfully!`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderNumber: string, status: OrderStatus) => {
    const updated = orders.map((o) => (o.orderNumber === orderNumber ? { ...o, status } : o));
    saveOrders(updated);
    showToast(`Order #${orderNumber} status changed to "${status}".`, 'info');
  };

  const updatePaymentStatus = (orderNumber: string, paymentStatus: PaymentStatus) => {
    const updated = orders.map((o) => (o.orderNumber === orderNumber ? { ...o, paymentStatus } : o));
    saveOrders(updated);
    showToast(`Order #${orderNumber} payment marked as "${paymentStatus}".`, 'info');
  };

  const deleteOrder = (orderNumber: string) => {
    const updated = orders.filter((o) => o.orderNumber !== orderNumber);
    saveOrders(updated);
    showToast(`Order #${orderNumber} removed.`, 'warning');
  };

  // KPI calculations
  const totalRevenue = orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + o.totalAmount, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'Pending Confirmation').length;
  const deliveredOrders = orders.filter((o) => o.status === 'Delivered').length;
  const totalProducts = products.length;
  const outOfStockCount = products.filter((p) => !p.inStock || p.stockCount === 0).length;
  const totalCategories = categories.length;
  const activeFeatures = features.filter((f) => f.isActive).length;

  return (
    <AdminContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleStock,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        features,
        addFeature,
        updateFeature,
        deleteFeature,
        toggleFeatureActive,
        orders,
        createOrder,
        updateOrderStatus,
        updatePaymentStatus,
        deleteOrder,
        salesData: SALES_PROGRESS_DATA,
        kpiStats: {
          totalRevenue,
          totalOrders,
          pendingOrders,
          deliveredOrders,
          totalProducts,
          outOfStockCount,
          totalCategories,
          activeFeatures,
        },
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}

