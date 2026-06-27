'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  Download,
  Heart,
  Ticket,
  Bell,
  User,
  Shield,
  Receipt,
  Wallet,
  Users,
  Headphones,
  LogOut,
  Zap,
  Clock,
  Copy,
  Eye,
  EyeOff,
  CheckCircle,
  ChevronRight,
} from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { formatPrice } from '@/lib/utils';

type Tab =
  | 'orders'
  | 'downloads'
  | 'favorites'
  | 'coupons'
  | 'notifications'
  | 'profile'
  | 'security'
  | 'invoices'
  | 'wallet'
  | 'referral'
  | 'support';

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'orders', label: 'My Orders', icon: Package },
  { id: 'downloads', label: 'Downloads', icon: Download },
  { id: 'favorites', label: 'Favorites', icon: Heart },
  { id: 'coupons', label: 'Coupons', icon: Ticket },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'invoices', label: 'Invoices', icon: Receipt },
  { id: 'wallet', label: 'Wallet', icon: Wallet },
  { id: 'referral', label: 'Referral', icon: Users },
  { id: 'support', label: 'Support', icon: Headphones },
];

// Mock orders
const mockOrders = [
  { id: 'nexa-001', product: 'ChatGPT Plus — 1 Month', date: '2026-06-27', status: 'COMPLETED', amount: 18.99, deliveryType: 'LINK', delivery: 'https://chat.openai.com/activate/abc123', orderCode: 'SO-20260627-A1B2' },
  { id: 'nexa-002', product: 'CapCut Pro — 1 Year', date: '2026-06-26', status: 'COMPLETED', amount: 24.99, deliveryType: 'COUPON', delivery: 'CAPCUT-PRO-XXXX-YYYY', orderCode: 'SO-20260626-C3D4' },
  { id: 'nexa-003', product: 'Netflix Premium — 1 Month', date: '2026-06-25', status: 'COMPLETED', amount: 8.99, deliveryType: 'READY_ACCOUNT', delivery: '••••••••', orderCode: 'SO-20260625-E5F6' },
  { id: 'nexa-004', product: 'Gemini Pro — 30 Days', date: '2026-06-20', status: 'EXPIRED', amount: 12.50, deliveryType: 'LINK', delivery: null, orderCode: 'SO-20260620-G7H8' },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('orders');
  const [showSensitive, setShowSensitive] = useState<Record<string, boolean>>({});

  const toggleSensitive = (id: string) => {
    setShowSensitive((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return (
          <div className="space-y-3">
            {mockOrders.map((order) => (
              <Card key={order.id} className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-sm">{order.product}</h4>
                      <Badge variant={order.status === 'COMPLETED' ? 'success' : 'warning'}>
                        {order.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {order.date}</span>
                      <span>Order: <code className="text-[11px]">{order.orderCode}</code></span>
                      <span>ID: <code className="text-[11px]">{order.id}</code></span>
                    </div>
                    {order.delivery && (
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs text-[var(--text-muted)]">
                          {order.deliveryType}:
                        </span>
                        {order.deliveryType === 'READY_ACCOUNT' ? (
                          <div className="flex items-center gap-2">
                            <code className="text-xs px-2 py-0.5 rounded bg-[var(--bg-secondary)]">
                              {showSensitive[order.id] ? order.delivery : '••••••••'}
                            </code>
                            <button
                              onClick={() => toggleSensitive(order.id)}
                              className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                            >
                              {showSensitive[order.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                            <button
                              onClick={() => copyToClipboard(order.delivery!)}
                              className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <code className="text-xs px-2 py-0.5 rounded bg-[var(--bg-secondary)] truncate max-w-[200px]">
                            {order.delivery}
                          </code>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="font-bold">{formatPrice(order.amount)}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        );

      case 'downloads':
        return (
          <Card className="p-6 text-center">
            <Download className="w-12 h-12 mx-auto text-[var(--text-muted)] mb-4" />
            <h3 className="font-semibold mb-2">Your Downloads</h3>
            <p className="text-sm text-[var(--text-muted)]">
              Purchased products with downloadable content will appear here.
            </p>
          </Card>
        );

      case 'favorites':
        return (
          <Card className="p-6 text-center">
            <Heart className="w-12 h-12 mx-auto text-[var(--text-muted)] mb-4" />
            <h3 className="font-semibold mb-2">Your Favorites</h3>
            <p className="text-sm text-[var(--text-muted)]">
              Save products you love and come back to them anytime.
            </p>
          </Card>
        );

      case 'coupons':
        return (
          <div className="space-y-4">
            <Card className="p-5 flex items-center justify-between">
              <div>
                <h4 className="font-semibold">WELCOME20</h4>
                <p className="text-sm text-[var(--text-muted)]">20% off your next purchase</p>
              </div>
              <Badge variant="success">Active</Badge>
            </Card>
            <Card className="p-5 flex items-center justify-between opacity-40">
              <div>
                <h4 className="font-semibold">SAVE10</h4>
                <p className="text-sm text-[var(--text-muted)]">$10 off — already used</p>
              </div>
              <Badge>Used</Badge>
            </Card>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-3">
            {[
              { icon: Bell, title: 'Order Completed', desc: 'Your ChatGPT Plus order has been delivered.', time: '2 hours ago', read: false },
              { icon: Zap, title: 'Instant Delivery', desc: 'Your CapCut Pro code is ready in your dashboard.', time: '1 day ago', read: false },
              { icon: CheckCircle, title: 'Payment Successful', desc: 'Payment of $18.99 processed successfully.', time: '1 day ago', read: true },
            ].map((n, i) => (
              <Card key={i} className={`p-4 ${!n.read ? 'border-blue-500/20 bg-blue-500/[0.02]' : ''}`}>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[var(--bg-secondary)] flex items-center justify-center flex-shrink-0">
                    <n.icon className="w-4 h-4 text-[var(--text-muted)]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{n.title}</h4>
                      {!n.read && <span className="w-2 h-2 rounded-full bg-blue-500" />}
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">{n.desc}</p>
                    <span className="text-[10px] text-[var(--text-muted)] mt-1 block">{n.time}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        );

      case 'profile':
        return (
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-6">Profile Settings</h3>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium mb-1.5">Display Name</label>
                <Input defaultValue="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Email</label>
                <Input defaultValue="john@example.com" type="email" />
              </div>
              <Button>Save Changes</Button>
            </div>
          </Card>
        );

      case 'security':
        return (
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-6">Security Settings</h3>
            <div className="space-y-6 max-w-md">
              <div>
                <h4 className="font-medium mb-2">Change Password</h4>
                <div className="space-y-3">
                  <Input type="password" placeholder="Current password" />
                  <Input type="password" placeholder="New password" />
                  <Input type="password" placeholder="Confirm new password" />
                  <Button>Update Password</Button>
                </div>
              </div>
              <hr className="border-[var(--border-color)]" />
              <div>
                <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
                <p className="text-sm text-[var(--text-muted)] mb-3">Add an extra layer of security to your account.</p>
                <Button variant="secondary">Enable 2FA</Button>
              </div>
            </div>
          </Card>
        );

      case 'invoices':
        return (
          <div className="space-y-3">
            {mockOrders.map((order) => (
              <Card key={order.id} className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-sm">{order.product}</h4>
                  <p className="text-xs text-[var(--text-muted)]">{order.date} · {order.orderCode}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-sm">{formatPrice(order.amount)}</span>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        );

      case 'wallet':
        return (
          <div className="space-y-6">
            <Card className="p-6 text-center">
              <h3 className="text-sm text-[var(--text-muted)] mb-2">Nexa Wallet Balance</h3>
              <div className="text-4xl font-bold gradient-text">$125.50</div>
              <p className="text-xs text-[var(--text-muted)] mt-2">Available for purchases</p>
              <div className="flex gap-3 justify-center mt-6">
                <Button>Add Funds</Button>
                <Button variant="secondary">Withdraw</Button>
              </div>
            </Card>
            <h4 className="font-semibold">Recent Transactions</h4>
            {mockOrders.slice(0, 3).map((o) => (
              <Card key={o.id} className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">{o.product}</h4>
                  <p className="text-xs text-[var(--text-muted)]">{o.date}</p>
                </div>
                <span className="text-red-400 font-medium">-{formatPrice(o.amount)}</span>
              </Card>
            ))}
          </div>
        );

      case 'referral':
        return (
          <Card className="p-6 text-center">
            <Users className="w-12 h-12 mx-auto text-[var(--text-muted)] mb-4" />
            <h3 className="font-semibold mb-2">Referral Program</h3>
            <p className="text-sm text-[var(--text-muted)] mb-6">
              Invite friends and earn 10% commission on their purchases.
            </p>
            <div className="max-w-sm mx-auto flex gap-2">
              <Input value="https://nexa.market/ref/johndoe" readOnly className="text-xs" />
              <Button variant="secondary" size="sm" onClick={() => copyToClipboard('https://nexa.market/ref/johndoe')}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        );

      case 'support':
        return (
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-6">Support Tickets</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Subject</label>
                <Input placeholder="What can we help with?" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm resize-none"
                  placeholder="Describe your issue..."
                />
              </div>
              <Button>
                <Headphones className="w-4 h-4" /> Submit Ticket
              </Button>
            </div>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-3 space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-500/10 text-blue-400 font-medium'
                        : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
                <hr className="border-[var(--border-color)] my-1" />
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/5 transition-all">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </Card>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <h2 className="text-xl font-semibold mb-4">
                {tabs.find((t) => t.id === activeTab)?.label}
              </h2>
              {renderContent()}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
