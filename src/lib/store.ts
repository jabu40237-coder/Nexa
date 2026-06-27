import { create } from 'zustand';
import type { CartItem, Coupon } from '@/types';

interface CartStore {
  items: CartItem[];
  coupon: Coupon | null;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  applyCoupon: (c: Coupon) => void;
  removeCoupon: () => void;
  clearCart: () => void;
  subtotal: () => number;
  discount: () => number;
  total: () => number;
  count: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  coupon: null,

  addItem: (item) =>
    set((s) => {
      const existing = s.items.find((i) => i.productId === item.productId);
      if (existing) {
        return {
          items: s.items.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      return { items: [...s.items, item] };
    }),

  removeItem: (productId) =>
    set((s) => ({ items: s.items.filter((i) => i.productId !== productId) })),

  updateQuantity: (productId, quantity) =>
    set((s) => {
      if (quantity <= 0) {
        return { items: s.items.filter((i) => i.productId !== productId) };
      }
      return {
        items: s.items.map((i) =>
          i.productId === productId ? { ...i, quantity } : i
        ),
      };
    }),

  applyCoupon: (c) => set({ coupon: c }),
  removeCoupon: () => set({ coupon: null }),
  clearCart: () => set({ items: [], coupon: null }),

  subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
  discount: () => {
    const { coupon, items } = get();
    if (!coupon) return 0;
    const sub = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    return coupon.type === 'percent' ? sub * (coupon.discount / 100) : coupon.discount;
  },
  total: () => {
    const { subtotal, discount } = get();
    return Math.max(0, subtotal() - discount());
  },
  count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}));
