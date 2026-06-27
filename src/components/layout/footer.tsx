import Link from 'next/link';
import { Zap } from 'lucide-react';

const footerLinks = {
  Products: [
    { href: '/products?category=AI+Tools', label: 'AI Tools' },
    { href: '/products?category=Software', label: 'Software' },
    { href: '/products?category=Premium+Accounts', label: 'Premium Accounts' },
    { href: '/products?category=Gift+Cards', label: 'Gift Cards' },
    { href: '/products?category=Streaming', label: 'Streaming' },
    { href: '/products', label: 'All Products' },
  ],
  Company: [
    { href: '#', label: 'About' },
    { href: '#', label: 'Blog' },
    { href: '#', label: 'Careers' },
    { href: '#', label: 'Press' },
    { href: '#', label: 'Contact' },
  ],
  Support: [
    { href: '#', label: 'Help Center' },
    { href: '#', label: 'FAQ' },
    { href: '#', label: 'Privacy Policy' },
    { href: '#', label: 'Terms of Service' },
    { href: '#', label: 'Refund Policy' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold">Nexa</span>
            </Link>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Premium digital marketplace. Instant delivery, automated fulfillment,
              worldwide access.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--border-color)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} Nexa. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-[var(--text-muted)]">
              Secured by HTTPS • SSL Encrypted
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
