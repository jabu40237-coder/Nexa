// ─── Partner API Types ───

export type DeliveryType = 'LINK' | 'COUPON' | 'READY_ACCOUNT';

export interface ProviderEmoji {
  normal: string;
  customTelegramId: string | null;
  display: string;
}

export interface Provider {
  id: number;
  key: string;
  name: string;
  sortOrder: number;
  emoji: ProviderEmoji;
}

export interface StockInfo {
  inStock: boolean;
  count: number;
  maxQuantity: number;
}

export interface BulkTier {
  minQuantity: number;
  maxQuantity: number | null;
  unitPrice: string;
}

export interface BulkDiscount {
  enabled: boolean;
  stackingPolicy: string;
  tiers: BulkTier[];
}

export interface Warranty {
  enabled: boolean;
  days: number;
}

export interface ProductPricing {
  catalogPrice: string;
  yourUnitPrice: string;
  loyaltyApplied: boolean;
  campaignApplied: boolean;
}

export interface ProductFlags {
  sensitiveDelivery: boolean;
  hasInstructions: boolean;
  instantDelivery: boolean;
}

export interface CatalogProduct {
  id: number;
  slug: string;
  productCode: string;
  name: string;
  provider: Provider;
  emoji: ProviderEmoji;
  deliveryType: DeliveryType;
  sortOrder: number;
  catalogPrice: string;
  yourPrice: string;
  currency: string;
  durationDays: number;
  warranty: Warranty;
  stock: StockInfo;
  bulkDiscount: BulkDiscount;
  pricing: ProductPricing;
  flags: ProductFlags;
}

export interface ProductDetail extends CatalogProduct {
  description: string;
  descriptionFormat: 'HTML' | 'TEXT';
  instructions: string | null;
  updatedAt: string;
}

export interface OrderDelivery {
  link?: string;
  code?: string;
  content?: string;
  format?: string;
  instructions?: string | null;
}

export interface OrderLine {
  orderCode: string;
  code?: string;
  link?: string;
}

export interface OrderProduct {
  slug: string;
  name: string;
  productCode?: string;
}

export interface OrderResponse {
  ok: boolean;
  orderCode?: string;
  externalOrderId?: string;
  status?: string;
  deliveryType?: DeliveryType;
  product?: OrderProduct;
  quantity?: number;
  unitPrice?: string;
  totalCharged?: string;
  currency?: string;
  balanceAfter?: string;
  createdAt?: string;
  delivery?: OrderDelivery;
  lines?: OrderLine[];
}

export interface OrdersListMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface OrdersListResponse {
  data: OrderResponse[];
  meta: OrdersListMeta;
}

export interface UsageStats {
  balance: string;
  currency: string;
  apiOrdersTotal: number;
  apiSpendTotal: string;
  apiOrders24h: number;
  apiSpend24h: string;
  requestCountToday: number;
  errorCountToday: number;
}

export interface BalanceResponse {
  ok: boolean;
  balance: string;
  currency: string;
}

export interface ApiError {
  ok: false;
  error: {
    code: string;
    message: string;
    requestId: string;
    required?: number;
    balance?: number;
  };
}

export interface HealthResponse {
  ok: boolean;
  service: string;
  version: number;
}

// ─── Nexa App Types ───

export interface NexaProduct {
  id: string;
  apiId: number;
  slug: string;
  name: string;
  description: string;
  category: string;
  provider: string;
  price: number;
  originalPrice: number;
  currency: string;
  deliveryType: DeliveryType;
  inStock: boolean;
  stockCount: number;
  durationDays: number;
  warrantyDays: number;
  instantDelivery: boolean;
  image: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  trending: boolean;
  isNew: boolean;
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Coupon {
  code: string;
  discount: number;
  type: 'percent' | 'fixed';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export type PaymentMethod = 'stripe' | 'paypal' | 'crypto' | 'wallet';
