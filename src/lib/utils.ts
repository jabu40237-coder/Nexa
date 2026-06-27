import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number | string, currency = 'USD'): string {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(num);
}

export function generateOrderId(): string {
  return `nexa-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function truncate(str: string, len: number): string {
  if (str.length <= len) return str;
  return str.slice(0, len) + '…';
}

export const categories = [
  'AI Tools',
  'Premium Accounts',
  'Streaming',
  'Software',
  'Licenses',
  'Websites',
  'Domains',
  'Source Code',
  'Digital Tools',
  'Templates',
  'VPN',
  'Cloud Services',
  'Gaming',
  'Gift Cards',
  'Social Media',
  'Courses',
  'E-books',
  'Custom Services',
] as const;

export const categoryIcons: Record<string, string> = {
  'AI Tools': '🤖',
  'Premium Accounts': '👑',
  'Streaming': '🎬',
  'Software': '💻',
  'Licenses': '🔑',
  'Websites': '🌐',
  'Domains': '🏷️',
  'Source Code': '📦',
  'Digital Tools': '🛠️',
  'Templates': '📄',
  'VPN': '🔒',
  'Cloud Services': '☁️',
  'Gaming': '🎮',
  'Gift Cards': '🎁',
  'Social Media': '📱',
  'Courses': '📚',
  'E-books': '📖',
  'Custom Services': '⚡',
};
