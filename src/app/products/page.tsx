'use client';

import { useState, useMemo, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ProductCard } from '@/components/products/product-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SectionHeading } from '@/components/ui/section-heading';
import { sampleProducts } from '@/lib/data';
import { categories } from '@/lib/utils';

function ProductsContent() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get('category') || '';
  const searchParam = searchParams.get('search') || '';

  const [search, setSearch] = useState(searchParam);
  const [category, setCategory] = useState(catParam);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...sampleProducts];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.provider.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (category) {
      result = result.filter((p) => p.category === category);
    }

    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
      default:
        result.sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1) * -1 + (b.rating - a.rating));
    }

    return result;
  }, [search, category, sortBy, priceRange]);

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setSortBy('featured');
    setPriceRange([0, 100]);
  };

  const hasFilters = search || category || sortBy !== 'featured' || priceRange[0] > 0 || priceRange[1] < 100;

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <SectionHeading
              title={category || 'All Products'}
              subtitle={`${filtered.length} product${filtered.length !== 1 ? 's' : ''} available`}
            />
          </motion.div>

          {/* Search & Controls */}
          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="pl-10"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-blue-500/50"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
            </select>
            <Button
              variant="secondary"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </Button>
            {hasFilters && (
              <Button variant="ghost" onClick={clearFilters}>
                <X className="w-4 h-4" /> Clear
              </Button>
            )}
          </div>

          {/* Filter panel */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="mt-4 p-6 glass rounded-2xl"
            >
              <h4 className="font-semibold text-sm mb-4">Categories</h4>
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setCategory('')}
                  className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                    !category
                      ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                      : 'border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--border-color-strong)]'
                  }`}
                >
                  All
                </button>
                {categories.slice(0, 12).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c === category ? '' : c)}
                    className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                      category === c
                        ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                        : 'border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--border-color-strong)]'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <h4 className="font-semibold text-sm mb-4">Price Range</h4>
              <div className="flex items-center gap-4">
                <Input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  placeholder="Min"
                  className="w-24"
                />
                <span className="text-[var(--text-muted)]">to</span>
                <Input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  placeholder="Max"
                  className="w-24"
                />
              </div>
            </motion.div>
          )}

          {/* Products Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🔍</p>
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-sm text-[var(--text-muted)] mb-6">
                Try adjusting your search or filters.
              </p>
              <Button variant="secondary" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="pt-24 text-center text-[var(--text-muted)]">Loading products…</div>}>
      <ProductsContent />
    </Suspense>
  );
}
