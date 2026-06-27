'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Star,
  Zap,
  Shield,
  Clock,
  ArrowLeft,
  ShoppingCart,
  Check,
  Minus,
  Plus,
  ChevronRight,
} from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ProductCard } from '@/components/products/product-card';
import { SectionHeading } from '@/components/ui/section-heading';
import { sampleProducts, reviews } from '@/lib/data';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const product = sampleProducts.find((p) => p.slug === slug);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="pt-32 pb-16 text-center">
          <p className="text-4xl mb-4">🔍</p>
          <h2 className="text-xl font-bold mb-2">Product Not Found</h2>
          <p className="text-[var(--text-muted)] mb-6">The product you're looking for doesn't exist.</p>
          <Link href="/products"><Button>Browse Products</Button></Link>
        </main>
        <Footer />
      </>
    );
  }

  const related = sampleProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-8"
          >
            <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products" className="hover:text-[var(--text-primary)] transition-colors">Products</Link>
            <ChevronRight className="w-3 h-3" />
            <Link
              href={`/products?category=${encodeURIComponent(product.category)}`}
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              {product.category}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[var(--text-primary)] truncate">{product.name}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image / Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative aspect-square rounded-2xl bg-gradient-to-br from-[var(--bg-secondary)] to-transparent flex items-center justify-center overflow-hidden border border-[var(--border-color)]"
            >
              <div className="text-8xl opacity-20">{getCategoryEmoji(product.category)}</div>
              <div className="absolute top-4 left-4 flex gap-2">
                {product.instantDelivery && (
                  <Badge variant="success"><Zap className="w-3 h-3" /> Instant Delivery</Badge>
                )}
                {product.isNew && <Badge variant="accent">New</Badge>}
                {product.originalPrice > product.price && (
                  <Badge variant="danger">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </Badge>
                )}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs text-[var(--text-muted)] px-3 py-1 rounded-full bg-[var(--bg-secondary)]">
                  {product.category}
                </span>
                <span className="text-xs text-[var(--text-muted)]">{product.provider}</span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight mb-4">{product.name}</h1>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-[var(--border-color)]'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-[var(--text-muted)]">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-4xl font-bold">{formatPrice(product.price)}</span>
                {product.originalPrice > product.price && (
                  <span className="text-lg text-[var(--text-muted)] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-[var(--text-muted)]">
                    {product.durationDays > 0 ? `${product.durationDays} days` : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span className="text-[var(--text-muted)]">
                    {product.warrantyDays > 0 ? `${product.warrantyDays}-day warranty` : 'No warranty'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span className="text-[var(--text-muted)]">
                    {product.deliveryType === 'LINK' ? 'Link Delivery' : product.deliveryType === 'COUPON' ? 'Coupon Code' : 'Ready Account'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-[var(--text-muted)]">
                    {product.inStock ? `In Stock (${product.stockCount})` : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    className="w-10 h-10 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={!product.inStock}>
                  <ShoppingCart className="w-4 h-4" />
                  {addedToCart ? 'Added!' : 'Add to Cart'} — {formatPrice(product.price * quantity)}
                </Button>
              </div>

              {/* Buy now */}
              <Link href="/checkout" className="block mt-3">
                <Button variant="outline" size="lg" className="w-full" disabled={!product.inStock}>
                  Buy Now
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* FAQ / Details */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <SectionHeading title="Product Details" />
              <Card className="mt-6 p-6">
                <div className="prose prose-sm max-w-none text-[var(--text-secondary)]">
                  <p>{product.description}</p>
                  <h4 className="text-[var(--text-primary)] font-semibold mt-6 mb-2">Delivery Type</h4>
                  <p>
                    {product.deliveryType === 'LINK' && 'You will receive an activation or subscription link immediately after purchase.'}
                    {product.deliveryType === 'COUPON' && 'You will receive a unique redeemable code immediately after purchase.'}
                    {product.deliveryType === 'READY_ACCOUNT' && 'You will receive login credentials for a ready-to-use account. Handle with care — these are sensitive credentials.'}
                  </p>
                  {product.warrantyDays > 0 && (
                    <>
                      <h4 className="text-[var(--text-primary)] font-semibold mt-6 mb-2">Warranty</h4>
                      <p>This product includes a {product.warrantyDays}-day warranty. If the product stops working within the warranty period, we will replace it free of charge.</p>
                    </>
                  )}
                </div>
              </Card>
            </div>

            <div>
              <SectionHeading title="Customer Reviews" />
              <div className="mt-6 space-y-4">
                {reviews.slice(0, 3).map((r) => (
                  <Card key={r.id} className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                        {r.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-xs">{r.name}</div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: r.rating }).map((_, j) => (
                            <Star key={j} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      &ldquo;{r.text.slice(0, 100)}...&rdquo;
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <section className="mt-16">
              <SectionHeading title="Related Products" subtitle="More from this category." />
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function getCategoryEmoji(cat: string): string {
  const m: Record<string, string> = {
    'AI Tools': '🤖', 'Premium Accounts': '👑', 'Streaming': '🎬',
    'Software': '💻', 'Gift Cards': '🎁', 'VPN': '🔒',
    'Gaming': '🎮', 'Cloud Services': '☁️',
  };
  return m[cat] || '📦';
}
