import type {
  BalanceResponse,
  CatalogProduct,
  HealthResponse,
  OrderResponse,
  OrdersListResponse,
  ProductDetail,
  Provider,
  UsageStats,
} from '@/types';

const API_BASE = 'https://ggsoma.store/api/partner/v1';

function getApiKey(): string {
  return process.env.PARTNER_API_KEY || '';
}

function authHeaders(): Record<string, string> {
  return { Authorization: `Bearer ${getApiKey()}` };
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
      ...options?.headers,
    },
  });

  const data = await res.json();

  if (!res.ok || data.ok === false) {
    const err = data as { error?: { code: string; message: string; requestId: string } };
    throw new Error(err.error?.message || `API error: ${res.status}`);
  }

  return data as T;
}

// Health (no auth needed)
export async function checkHealth(): Promise<HealthResponse> {
  const res = await fetch(`${API_BASE}/health`);
  return res.json();
}

// Balance
export async function getBalance(): Promise<BalanceResponse> {
  return apiFetch('/balance');
}

// Providers
export async function getProviders(): Promise<{ data: Provider[] }> {
  return apiFetch('/catalog/providers');
}

// Products
export async function getProducts(provider?: string): Promise<{ data: CatalogProduct[] }> {
  const qs = provider ? `?provider=${encodeURIComponent(provider)}` : '';
  return apiFetch(`/catalog/products${qs}`);
}

// Single product
export async function getProduct(ref: string | number): Promise<ProductDetail> {
  return apiFetch(`/catalog/products/${ref}`);
}

// Create order
export async function createOrder(params: {
  externalOrderId: string;
  productSlug?: string;
  productId?: number;
  productCode?: string;
  quantity?: number;
}): Promise<OrderResponse> {
  return apiFetch('/orders', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

// List orders
export async function listOrders(params?: {
  page?: number;
  limit?: number;
  status?: string;
  externalOrderId?: string;
  productSlug?: string;
}): Promise<OrdersListResponse> {
  const qs = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined) qs.set(k, String(v));
    });
  }
  const query = qs.toString();
  return apiFetch(`/orders${query ? `?${query}` : ''}`);
}

// Get order detail
export async function getOrder(orderCode: string): Promise<OrderResponse & { ok: true }> {
  return apiFetch(`/orders/${orderCode}`);
}

// Usage stats
export async function getUsage(): Promise<UsageStats> {
  return apiFetch('/usage');
}
