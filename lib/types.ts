export interface TechnicalSpecs {
  display: string;
  battery: string;
  sensors: string[];
  connectivity: string;
  dimensions: string;
  weight: string;
  materials: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  category: string;
  inStock: boolean;
  stockCount: number;
  badge?: string;
  rating: number;
  reviewCount: number;
  image: string;
  additionalImages?: string[];
  features: string[];
  description: string;
  technicalSpecs: TechnicalSpecs;
  inTheBox: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  productCount: number;
  isFeatured: boolean;
}

export interface FeatureItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  badge?: string;
  glowColor?: string;
  isActive: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

export interface Customer {
  fullName: string;
  phone: string;
  deliveryAddress: string;
  email?: string;
  orderNotes?: string;
}

export type OrderStatus =
  | 'Pending Confirmation'
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';

export type PaymentStatus = 'Unpaid' | 'Paid' | 'Refunded';

export interface Order {
  orderNumber: string;
  createdAt: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  customer: Customer;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  totalAmount: number;
  paymentMethod: string;
  whatsappQueryUrl: string;
}

export interface SalesPeriodData {
  label: string;
  revenue: number;
  orders: number;
  units: number;
}

