'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Clock, Shield, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import type { NexaProduct } from '@/types';

export function ProductCard({ product, index = 0 }: { product: NexaProduct; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/products/${product.slug}`}>
        <Card hover className="group overflow-hidden h-full">
          <div className="relative aspect-[4/3] bg-gradient-to-br from-[var(--bg-secondary)] to-transparent flex items-center justify-center overflow-hidden">
            <div className="text-5xl opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500">
              {getProductEmoji(product.category)}
            </div>
            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-1.5">
              {product.instantDelivery && (
                <Badge variant="success">
                  <Zap className="w-3 h-3" /> Instant
                </Badge>
              )}
              {product.isNew && <Badge variant="accent">New</Badge>}
            </div>
            {product.originalPrice > product.price && (
              <div className="absolute top-3 right-3">
                <Badge variant="danger">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                </Badge>
              </div>
            )}
          </div>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-[var(--text-muted)] px-2 py-0.5 rounded-full bg-[var(--bg-secondary)]">
                {product.category}
              </span>
              <span className="text-xs text-[var(--text-muted)]">•</span>
              <span className="text-xs text-[var(--text-muted)]">{product.provider}</span>
            </div>
            <h3 className="font-semibold text-sm leading-tight mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
              {product.name}
            </h3>
            <div className="flex items-center gap-1 mb-3">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-[var(--border-color)]'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-[var(--text-muted)]">({product.reviewCount})</span>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-lg font-bold">{formatPrice(product.price)}</span>
                {product.originalPrice > product.price && (
                  <span className="ml-2 text-sm text-[var(--text-muted)] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <Button size="sm">Buy</Button>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

function getProductEmoji(category: string): string {
  const map: Record<string, string> = {
    'AI Tools': '🤖',
    'Premium Accounts': '👑',
    'Streaming': '🎬',
    'Software': '💻',
    'Gift Cards': '🎁',
    'VPN': '🔒',
    'Gaming': '🎮',
    'Cloud Services': '☁️',
  };
  return map[category] || '📦';
}
