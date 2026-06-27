import type { Metadata } from 'next';
import { ThemeProvider } from '@/lib/theme-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nexa — Premium Digital Marketplace',
  description:
    'Instant delivery of premium accounts, AI subscriptions, software licenses, gift cards & more. Secure, automated, worldwide.',
  keywords: ['digital marketplace', 'premium accounts', 'AI subscriptions', 'software licenses', 'instant delivery'],
  openGraph: {
    title: 'Nexa — Premium Digital Marketplace',
    description: 'Instant delivery digital products. AI tools, accounts, software & more.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
