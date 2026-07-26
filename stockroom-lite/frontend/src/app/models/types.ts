export interface User {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN';
}

export interface Category {
  id: number;
  name: string;
  description?: string | null;
}

export interface Supplier {
  id: number;
  name: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  description?: string | null;
  imageUrl?: string | null;
  unitPrice: number;
  quantity: number;
  lowStockThreshold: number;
  categoryId: number;
  supplierId: number;
  category?: Category;
  supplier?: Supplier;
}

export interface StockTransaction {
  id: number;
  productId: number;
  type: 'IN' | 'OUT';
  quantity: number;
  unitPrice?: number;
  note?: string;
  createdAt: string;
}

export interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  totalSuppliers: number;
  lowStockCount: number;
  inventoryValue: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
