// API Service for backend communication

export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  size: string;
  gender: string;
  price: number;
  stock: number;
  status: string;
  coverImage: string;
  image1: string | null;
  image2: string | null;
  images: string[];
  color: string;
  colorValues: string[];
  colors: { name: string; hex: string }[];
  sku: string;
  material: string;
  weight: string;
  fit: string;
  features: string[];
  isNew: boolean;
  isBestSeller: boolean;
  createdAt: string | null;
}

export interface ProductsResponse {
  data: Product[];
  meta: {
    page: number;
    perPage: number;
    total: string;
    totalPages: number;
  };
}

export interface OrderRequest {
  items: {
    productId: number;
    quantity: number;
  }[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  selectedSize?: string;
  selectedColor?: string;
  deliveryPreferences?: string;
  notes?: string;
}

export interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  selectedSize: string | null;
  selectedColor: string | null;
  deliveryPreferences: string | null;
  status: string;
  totalCents: number;
  total: number;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

const API_BASE_URL = '/api';

/**
 * Fetch products with optional filters
 */
export async function fetchProducts(
  category?: string,
  gender?: string
): Promise<Product[]> {
  try {
    const params = new URLSearchParams();
    
    if (category && category !== 'all') {
      params.append('category', category);
    }
    
    if (gender && gender !== 'all') {
      params.append('gender', gender);
    }

    // Fetch all products for now (comment out status filter to see all products)
    // params.append('status', 'published');
    
    const url = `${API_BASE_URL}/products?${params.toString()}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    
    const data: ProductsResponse = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

/**
 * Fetch a single product by ID
 */
export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const productId = Number(id);
    
    if (isNaN(productId)) {
      throw new Error('Invalid product ID');
    }
    
    const response = await fetch(`${API_BASE_URL}/products/${productId}`);
    
    if (response.status === 404) {
      return null;
    }
    
    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }
    
    const data = await response.json();
    // Backend returns { product: {...} }, extract the nested object
    const product: Product = data.product || data;
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

/**
 * Create a new order
 */
export async function createOrder(orderData: OrderRequest): Promise<Order> {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to create order: ${response.statusText}`);
    }
    
    const order: Order = await response.json();
    return order;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

export interface OrderListMeta {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  status?: string;
  q?: string;
}

export interface OrderListResponse {
  data: Order[];
  meta: OrderListMeta;
}

export interface OrderQuery {
  page?: number;
  perPage?: number;
  q?: string;
  status?: string;
  sortBy?: 'createdAt' | 'status' | 'total';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Fetch orders with filters, pagination, sorting
 */
export async function getOrders(params: OrderQuery = {}): Promise<OrderListResponse> {
  try {
    const query = new URLSearchParams();
    if (params.page) query.append('page', String(params.page));
    if (params.perPage) query.append('perPage', String(params.perPage));
    if (params.q) query.append('q', params.q);
    if (params.status) query.append('status', params.status);
    if (params.sortBy) query.append('sortBy', params.sortBy);
    if (params.sortOrder) query.append('sortOrder', params.sortOrder);

    const response = await fetch(`${API_BASE_URL}/orders${query.toString() ? `?${query.toString()}` : ''}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch orders: ${response.statusText}`);
    }

    const payload = await response.json();
    const dataArray = Array.isArray(payload) ? payload : payload.data;
    const meta: OrderListMeta = Array.isArray(payload)
      ? { page: 1, perPage: dataArray.length, total: dataArray.length, totalPages: 1 }
      : payload.meta;

    const data = dataArray.map((order: any) => ({
      ...order,
      total: order.totalCents ? order.totalCents / 100 : 0,
    }));

    return { data, meta };
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}

export async function exportOrdersCsv(params: OrderQuery = {}): Promise<Blob> {
  const query = new URLSearchParams();
  if (params.q) query.append('q', params.q);
  if (params.status) query.append('status', params.status);
  const response = await fetch(`${API_BASE_URL}/orders/export${query.toString() ? `?${query.toString()}` : ''}`);
  if (!response.ok) {
    throw new Error(`Failed to export orders: ${response.statusText}`);
  }
  return response.blob();
}

/**
 * Get dashboard metadata/summary
 */
export interface MetaSummary {
  products: number;
  bundles: number;
  orders: number;
  leads: number;
  discounts: number;
  revenue: number;
}

export async function getMeta(): Promise<MetaSummary> {
  try {
    const response = await fetch(`${API_BASE_URL}/meta`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch metadata: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching metadata:', error);
    throw error;
  }
}

/**
 * Get single order by ID with items
 */
export async function getOrderById(id: number): Promise<Order & { items: any[] }> {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch order: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
}

/**
 * Update order status
 */
export async function updateOrderStatus(id: number, status: string): Promise<Order> {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to update order status: ${response.statusText}`);
    }
    
    const order: Order = await response.json();
    return order;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
}

/**
 * Delete product
 */
export async function deleteProduct(id: number): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete product: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}

/**
 * Update product
 */
export async function updateProduct(id: number, updates: Partial<Product>): Promise<Product> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to update product: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.product || data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

/**
 * Format price in Ethiopian Birr
 */
export function formatPrice(price: number | undefined | null): string {
  const validPrice = price || 0;
  return `ETB ${validPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
