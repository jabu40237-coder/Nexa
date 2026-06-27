'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, CreditCard, Wallet, Bitcoin, Lock, ShieldCheck } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SectionHeading } from '@/components/ui/section-heading';
import { useCartStore } from '@/lib/store';
import { formatPrice, generateOrderId } from '@/lib/utils';
import type { PaymentMethod } from '@/types';

type Step = 'details' | 'payment' | 'success';

export default function CheckoutPage() {
  const { items, coupon, subtotal, discount, total, clearCart } = useCartStore();
  const [step, setStep] = useState<Step>('details');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('stripe');
  const [orderId, setOrderId] = useState('');
  const [form, setForm] = useState({ name: '', email: '', notes: '' });

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePayment = () => {
    const oid = generateOrderId();
    setOrderId(oid);
    // In production, this would call the Partner API
    setStep('success');
    clearCart();
  };

  if (items.length === 0 && step !== 'success') {
    return (
      <>
        <Navbar />
        <main className="pt-32 pb-16 text-center">
          <h2 className="text-xl font-bold mb-2">Nothing to checkout</h2>
          <p className="text-[var(--text-muted)] mb-6">Your cart is empty.</p>
          <Link href="/products"><Button>Browse Products</Button></Link>
        </main>
        <Footer />
      </>
    );
  }

  // Success step
  if (step === 'success') {
    return (
      <>
        <Navbar />
        <main className="pt-32 pb-16">
          <div className="max-w-lg mx-auto px-4 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.6 }}
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-emerald-400" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
              <p className="text-[var(--text-muted)] mb-2">
                Your order <span className="font-mono text-sm text-blue-400">{orderId}</span> has been placed.
              </p>
              <p className="text-sm text-[var(--text-muted)] mb-8">
                Your products are being delivered. Check your dashboard for delivery details.
              </p>
              <div className="flex gap-3 justify-center">
                <Link href="/dashboard"><Button>View Dashboard</Button></Link>
                <Link href="/products"><Button variant="secondary">Continue Shopping</Button></Link>
              </div>
            </motion.div>
          </div>
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
              <Link href="/cart" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <SectionHeading title="Checkout" />
            </div>

            {/* Steps indicator */}
            <div className="flex items-center gap-2 mb-10 text-sm">
              <span className={`px-3 py-1 rounded-full ${step === 'details' ? 'bg-blue-500/10 text-blue-400' : 'bg-[var(--bg-card)] text-[var(--text-muted)]'}`}>
                1. Details
              </span>
              <span className="text-[var(--text-muted)]">→</span>
              <span className={`px-3 py-1 rounded-full ${step === 'payment' ? 'bg-blue-500/10 text-blue-400' : 'bg-[var(--bg-card)] text-[var(--text-muted)]'}`}>
                2. Payment
              </span>
              <span className="text-[var(--text-muted)]">→</span>
              <span className="px-3 py-1 rounded-full bg-[var(--bg-card)] text-[var(--text-muted)]">
                3. Confirmation
              </span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main form */}
            <div className="lg:col-span-2">
              {step === 'details' && (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmitDetails}
                >
                  <Card className="p-6">
                    <h3 className="font-semibold text-lg mb-6">Customer Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Full Name</label>
                        <Input
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Email Address</label>
                        <Input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Order Notes (optional)</label>
                        <Input
                          value={form.notes}
                          onChange={(e) => setForm({ ...form, notes: e.target.value })}
                          placeholder="Any special instructions..."
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button type="submit" size="lg" className="w-full">
                        Continue to Payment
                      </Button>
                    </div>
                  </Card>
                </motion.form>
              )}

              {step === 'payment' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Card className="p-6">
                    <h3 className="font-semibold text-lg mb-6">Payment Method</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'stripe' as const, icon: CreditCard, label: 'Credit Card', sub: 'Stripe' },
                        { id: 'paypal' as const, icon: Wallet, label: 'PayPal', sub: 'Express Checkout' },
                        { id: 'crypto' as const, icon: Bitcoin, label: 'Crypto', sub: 'BTC, ETH, USDT' },
                        { id: 'wallet' as const, icon: Wallet, label: 'Wallet', sub: 'Nexa Balance' },
                      ].map((pm) => (
                        <button
                          key={pm.id}
                          type="button"
                          onClick={() => setPaymentMethod(pm.id)}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            paymentMethod === pm.id
                              ? 'border-blue-500/50 bg-blue-500/5'
                              : 'border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[var(--border-color-strong)]'
                          }`}
                        >
                          <pm.icon className={`w-5 h-5 mb-2 ${paymentMethod === pm.id ? 'text-blue-400' : 'text-[var(--text-muted)]'}`} />
                          <div className="font-medium text-sm">{pm.label}</div>
                          <div className="text-xs text-[var(--text-muted)]">{pm.sub}</div>
                        </button>
                      ))}
                    </div>

                    {paymentMethod === 'stripe' && (
                      <div className="mt-6 space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1.5">Card Number</label>
                          <Input placeholder="4242 4242 4242 4242" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1.5">Expiry</label>
                            <Input placeholder="MM/YY" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1.5">CVC</label>
                            <Input placeholder="123" />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mt-6 flex items-center gap-2 text-xs text-[var(--text-muted)]">
                      <Lock className="w-3 h-3" />
                      <span>Secured by SSL encryption. Your data is safe.</span>
                    </div>

                    <div className="mt-6">
                      <Button size="lg" className="w-full" onClick={handlePayment}>
                        <ShieldCheck className="w-4 h-4" />
                        Pay {formatPrice(total())}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )}
            </div>

            {/* Sidebar summary */}
            <div>
              <Card className="p-6 sticky top-24">
                <h3 className="font-semibold mb-4">Order Summary</h3>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <span className="text-[var(--text-muted)] truncate flex-1 mr-2">
                        {item.name} × {item.quantity}
                      </span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <hr className="border-[var(--border-color)] my-4" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Subtotal</span>
                    <span>{formatPrice(subtotal())}</span>
                  </div>
                  {coupon && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Discount ({coupon.code})</span>
                      <span>-{formatPrice(discount())}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold text-base pt-2 border-t border-[var(--border-color)]">
                    <span>Total</span>
                    <span>{formatPrice(total())}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-[var(--text-muted)]">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Instant delivery after payment</span>
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
