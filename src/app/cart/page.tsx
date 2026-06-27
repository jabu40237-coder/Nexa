'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Minus, Plus, ArrowLeft, ShoppingBag, Tag, X } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, coupon, removeItem, updateQuantity, applyCoupon, removeCoupon, subtotal, discount, total } =
    useCartStore();
  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState('');

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) return;
    // Demo coupon codes
    const demos: Record<string, { discount: number; type: 'percent' | 'fixed' }> = {
      NEXA10: { discount: 10, type: 'percent' },
      WELCOME20: { discount: 20, type: 'percent' },
      SAVE5: { discount: 5, type: 'fixed' },
    };
    const found = demos[couponInput.toUpperCase()];
    if (found) {
      applyCoupon({ code: couponInput.toUpperCase(), ...found });
      setCouponMsg('Coupon applied!');
      setCouponInput('');
    } else {
      setCouponMsg('Invalid coupon code.');
    }
  };

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="pt-32 pb-16 text-center">
          <ShoppingBag className="w-16 h-16 mx-auto text-[var(--text-muted)] mb-6" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-[var(--text-muted)] mb-8">Looks like you haven't added anything yet.</p>
          <Link href="/products">
            <Button size="lg">Browse Products</Button>
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-4 mb-8">
              <Link href="/products" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <SectionHeading title={`Shopping Cart (${items.length})`} />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3">
              <AnimatePresence>
                {items.map((item, i) => (
                  <motion.div
                    key={item.productId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="p-4 flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--bg-secondary)] to-transparent flex items-center justify-center text-2xl flex-shrink-0">
                        📦
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/products/${item.slug}`}
                          className="font-medium text-sm hover:text-blue-400 transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm font-semibold mt-1">{formatPrice(item.price)}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-[var(--bg-secondary)] rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-right flex-shrink-0 w-20">
                        <p className="font-semibold text-sm">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="w-8 h-8 flex items-center justify-center text-[var(--text-muted)] hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="p-6 sticky top-24">
                <h3 className="font-semibold text-lg mb-6">Order Summary</h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Subtotal</span>
                    <span>{formatPrice(subtotal())}</span>
                  </div>
                  {discount() > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Discount</span>
                      <span>-{formatPrice(discount())}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <hr className="border-[var(--border-color)]" />
                  <div className="flex justify-between font-semibold text-base">
                    <span>Total</span>
                    <span>{formatPrice(total())}</span>
                  </div>
                </div>

                {/* Coupon */}
                {coupon ? (
                  <div className="mt-4 flex items-center justify-between p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm text-emerald-400">{coupon.code}</span>
                    </div>
                    <button onClick={removeCoupon} className="text-[var(--text-muted)] hover:text-red-400">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 flex gap-2">
                    <Input
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Coupon code"
                      className="text-sm"
                    />
                    <Button variant="secondary" size="sm" onClick={handleApplyCoupon}>
                      Apply
                    </Button>
                  </div>
                )}
                {couponMsg && (
                  <p className={`text-xs mt-2 ${couponMsg.includes('Invalid') ? 'text-red-400' : 'text-emerald-400'}`}>
                    {couponMsg}
                  </p>
                )}

                <Link href="/checkout" className="block mt-6">
                  <Button size="lg" className="w-full">
                    Proceed to Checkout
                  </Button>
                </Link>

                <div className="mt-4 text-center">
                  <Link href="/products" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                    ← Continue Shopping
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
