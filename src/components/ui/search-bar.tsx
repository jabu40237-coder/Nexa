'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  className?: string;
  large?: boolean;
}

export function SearchBar({ className, large = false }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const trendingSearches = [
    'ChatGPT Plus',
    'Gemini Pro',
    'Netflix Premium',
    'CapCut Pro',
    'Spotify',
    'NordVPN',
  ];

  useEffect(() => {
    if (query.length >= 2) {
      const filtered = trendingSearches.filter((s) =>
        s.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = (term?: string) => {
    const q = term || query;
    if (q.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(q.trim())}`;
    }
  };

  return (
    <div className={cn('relative w-full max-w-2xl', className)}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search AI tools, accounts, software..."
          className={cn(
            'pl-12 pr-4 w-full rounded-2xl',
            large ? 'py-4 text-base' : 'py-3 text-sm',
            'bg-[var(--bg-card)]/80 backdrop-blur-sm border-[var(--border-color-strong)] focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10'
          )}
        />
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="absolute top-full mt-2 w-full rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-xl overflow-hidden z-50">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => handleSearch(s)}
              className="w-full text-left px-4 py-3 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition-colors"
            >
              <Search className="w-3 h-3 inline mr-3 text-[var(--text-muted)]" />
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Trending */}
      {!query && large && (
        <div className="mt-4 flex flex-wrap items-center gap-2 justify-center">
          <span className="text-xs text-[var(--text-muted)]">Trending:</span>
          {trendingSearches.map((t) => (
            <button
              key={t}
              onClick={() => handleSearch(t)}
              className="px-3 py-1 text-xs rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-color-strong)] transition-all"
            >
              {t}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
