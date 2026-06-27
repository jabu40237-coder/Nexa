'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  Star,
  Shield,
  Zap,
  Clock,
  TrendingUp,
  Users,
  ChevronRight,
  Sparkles,
  CheckCircle,
} from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { SearchBar } from '@/components/ui/search-bar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import { ProductCard } from '@/components/products/product-card';
import { sampleProducts, reviews, faqItems, stats } from '@/lib/data';
import { categoryIcons, categories } from '@/lib/utils';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function HomePage() {
  const featured = sampleProducts.filter((p) => p.featured);
  const trending = sampleProducts.filter((p) => p.trending);
  const newProducts = sampleProducts.filter((p) => p.isNew);
  const aiTools = sampleProducts.filter((p) => p.category === 'AI Tools');
  const software = sampleProducts.filter((p) => p.category === 'Software');
  const accounts = sampleProducts.filter((p) => p.category === 'Premium Accounts' || p.category === 'Streaming');

  return (
    <>
      <Navbar />

      {/* ─── Hero Section ─── */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.15),transparent_60%)]" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px]" />

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge variant="accent" className="mb-6">
              <Sparkles className="w-3 h-3" /> Premium Digital Marketplace
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto">
              Instant Delivery.
              <br />
              <span className="gradient-text">Premium Digital Products.</span>
            </h1>
            <p className="mt-6 text-lg text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
              AI subscriptions, premium accounts, software licenses, gift cards & more —
              delivered automatically in seconds.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-10"
          >
            <SearchBar large />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-[var(--text-muted)]"
          >
            <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-emerald-400" /> Instant Delivery</span>
            <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
            <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-blue-400" /> Secure Checkout</span>
            <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-purple-400" /> 24/7 Support</span>
          </motion.div>
        </div>
      </section>

      {/* ─── Stats Bar ─── */}
      <section className="relative -mt-12 pb-8">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            {...fadeUp}
            className="glass rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-text">{s.value}</div>
                <div className="text-xs text-[var(--text-muted)] mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Featured Products ─── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="Featured Products" subtitle="Hand-picked premium digital products with instant delivery." />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featured.slice(0, 8).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/products">
              <Button variant="secondary" size="lg">
                View All Products <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Categories Grid ─── */}
      <section className="py-16 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="Browse Categories" subtitle="Explore our extensive catalog of digital products." />
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {categories.slice(0, 12).map((cat, i) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
              >
                <Link
                  href={`/products?category=${encodeURIComponent(cat)}`}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-blue-500/30 hover:bg-[var(--bg-card-hover)] transition-all duration-200 group"
                >
                  <span className="text-2xl">{categoryIcons[cat] || '📦'}</span>
                  <span className="text-xs text-center font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                    {cat}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AI Tools ─── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <SectionHeading title="🤖 AI Tools" subtitle="Premium AI subscriptions and APIs." />
            <Link href="/products?category=AI+Tools" className="hidden md:flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiTools.slice(0, 4).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Trending ─── */}
      <section className="py-16 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-10">
            <SectionHeading title="Trending Now" subtitle="What everyone's buying right now." />
            <TrendingUp className="w-6 h-6 text-amber-400" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trending.slice(0, 4).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Software ─── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="💻 Software & Licenses" subtitle="Professional tools and creative software." />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {software.slice(0, 4).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Premium Accounts ─── */}
      <section className="py-16 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="👑 Premium Accounts" subtitle="Ready-to-use premium accounts — delivered instantly." />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {accounts.slice(0, 4).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── New Arrivals ─── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="✨ New Arrivals" subtitle="Fresh products just added to the marketplace." />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.slice(0, 4).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Nexa ─── */}
      <section className="py-16 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            title="Why Choose Nexa?"
            subtitle="Built for speed, security, and reliability."
            className="text-center mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: 'Instant Delivery', desc: 'Products delivered automatically within seconds of payment confirmation.' },
              { icon: Shield, title: 'Enterprise Security', desc: 'Bank-grade encryption, JWT auth, and secure delivery of sensitive credentials.' },
              { icon: Clock, title: '24/7 Availability', desc: 'Automated system that works around the clock. No waiting for manual processing.' },
              { icon: TrendingUp, title: 'Best Prices', desc: 'Direct integration with suppliers means competitive pricing and bulk discounts.' },
              { icon: CheckCircle, title: 'Verified Products', desc: 'Every product is verified for quality. Warranty included on most items.' },
              { icon: Users, title: '50K+ Customers', desc: 'Trusted by thousands of customers worldwide for digital products.' },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-6 text-center h-full">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center">
                    <f.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{f.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Reviews ─── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="What Our Customers Say" subtitle="Join thousands of happy customers worldwide." />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 6).map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                      {r.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{r.name}</div>
                      <div className="text-xs text-[var(--text-muted)]">{r.role}</div>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    &ldquo;{r.text}&rdquo;
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-16 bg-[var(--bg-secondary)]">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeading title="Frequently Asked Questions" subtitle="Everything you need to know." className="text-center mb-12" />
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group card p-5 cursor-pointer"
              >
                <summary className="flex items-center justify-between font-medium text-sm list-none">
                  {item.q}
                  <ChevronRight className="w-4 h-4 text-[var(--text-muted)] group-open:rotate-90 transition-transform" />
                </summary>
                <p className="mt-3 text-sm text-[var(--text-muted)] leading-relaxed">{item.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Newsletter ─── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.1),transparent_60%)]" />
        <div className="relative max-w-xl mx-auto px-4 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-bold mb-4">Stay in the loop</h2>
            <p className="text-[var(--text-muted)] mb-8">
              Get notified about new products, exclusive deals, and marketplace updates.
            </p>
            <form className="flex gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
              />
              <Button type="submit" size="lg">
                Subscribe
              </Button>
            </form>
            <p className="mt-4 text-xs text-[var(--text-muted)]">
              No spam. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
