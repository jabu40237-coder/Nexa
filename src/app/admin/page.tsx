'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  TrendingUp,
  Package,
  ShoppingCart,
  Tags,
  Ticket,
  Headphones,
  Settings,
  FileText,
  Activity,
  Users as UsersIcon,
  DollarSign,
  Zap,
  ChevronRight,
  BarChart3,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';

type AdminTab =
  | 'overview'
  | 'products'
  | 'orders'
  | 'customers'
  | 'categories'
  | 'coupons'
  | 'support'
  | 'settings'
  | 'reports'
  | 'logs';

const adminTabs: { id: AdminTab; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'customers', label: 'Customers', icon: UsersIcon },
  { id: 'categories', label: 'Categories', icon: Tags },
  { id: 'coupons', label: 'Coupons', icon: Ticket },
  { id: 'support', label: 'Support', icon: Headphones },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'logs', label: 'Activity Logs', icon: Activity },
];

const statCards = [
  { label: 'Total Revenue', value: '$45,290', change: '+12.5%', up: true, icon: DollarSign },
  { label: 'Total Orders', value: '1,284', change: '+8.2%', up: true, icon: ShoppingCart },
  { label: 'Active Products', value: '156', change: '+3', up: true, icon: Package },
  { label: 'Customers', value: '8,430', change: '+15.3%', up: true, icon: UsersIcon },
];

const recentOrders = [
  { id: 'SO-001', customer: 'Sarah K.', product: 'ChatGPT Plus', amount: 18.99, status: 'COMPLETED', date: '2026-06-27' },
  { id: 'SO-002', customer: 'Marcus J.', product: 'CapCut Pro', amount: 24.99, status: 'COMPLETED', date: '2026-06-27' },
  { id: 'SO-003', customer: 'Elena R.', product: 'Gemini Pro', amount: 12.50, status: 'PENDING', date: '2026-06-27' },
  { id: 'SO-004', customer: 'Tom H.', product: 'NordVPN 2Y', amount: 69.99, status: 'COMPLETED', date: '2026-06-26' },
  { id: 'SO-005', customer: 'Aisha M.', product: 'Netflix Premium', amount: 8.99, status: 'FAILED', date: '2026-06-26' },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {statCards.map((stat) => (
                <Card key={stat.label} className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className={`text-xs flex items-center gap-1 ${stat.up ? 'text-emerald-400' : 'text-red-400'}`}>
                      {stat.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-[var(--text-muted)] mt-1">{stat.label}</div>
                </Card>
              ))}
            </div>

            {/* Charts placeholder */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold">Revenue Overview</h3>
                <div className="flex gap-1">
                  {['7d', '30d', '90d', '1y'].map((period) => (
                    <button key={period} className="px-3 py-1 text-xs rounded-lg bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all">
                      {period}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-64 flex items-end gap-2">
                {[30, 45, 28, 60, 52, 38, 70, 55, 48, 65, 42, 58].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: h * 2 }}
                      className="w-full rounded-t-lg bg-gradient-to-t from-blue-500/30 to-purple-500/30"
                    />
                    <span className="text-[10px] text-[var(--text-muted)]">
                      {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent orders */}
            <div>
              <h3 className="font-semibold mb-4">Recent Orders</h3>
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[var(--border-color)]">
                        <th className="text-left p-4 font-medium text-[var(--text-muted)]">Order ID</th>
                        <th className="text-left p-4 font-medium text-[var(--text-muted)]">Customer</th>
                        <th className="text-left p-4 font-medium text-[var(--text-muted)]">Product</th>
                        <th className="text-left p-4 font-medium text-[var(--text-muted)]">Amount</th>
                        <th className="text-left p-4 font-medium text-[var(--text-muted)]">Status</th>
                        <th className="text-left p-4 font-medium text-[var(--text-muted)]">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-card-hover)] transition-colors">
                          <td className="p-4 font-mono text-xs">{order.id}</td>
                          <td className="p-4">{order.customer}</td>
                          <td className="p-4">{order.product}</td>
                          <td className="p-4 font-medium">{formatPrice(order.amount)}</td>
                          <td className="p-4">
                            <Badge
                              variant={
                                order.status === 'COMPLETED' ? 'success' :
                                order.status === 'PENDING' ? 'warning' : 'danger'
                              }
                            >
                              {order.status}
                            </Badge>
                          </td>
                          <td className="p-4 text-[var(--text-muted)]">{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </div>
        );

      case 'products':
        return (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Product Management</h3>
              <Button size="sm">+ Add Product</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-color)]">
                    <th className="text-left p-3 font-medium text-[var(--text-muted)]">Name</th>
                    <th className="text-left p-3 font-medium text-[var(--text-muted)]">Category</th>
                    <th className="text-left p-3 font-medium text-[var(--text-muted)]">Price</th>
                    <th className="text-left p-3 font-medium text-[var(--text-muted)]">Stock</th>
                    <th className="text-left p-3 font-medium text-[var(--text-muted)]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'ChatGPT Plus', cat: 'AI Tools', price: 18.99, stock: 145, status: 'active' },
                    { name: 'Gemini Pro', cat: 'AI Tools', price: 12.50, stock: 98, status: 'active' },
                    { name: 'Netflix Premium', cat: 'Streaming', price: 8.99, stock: 210, status: 'active' },
                    { name: 'CapCut Pro', cat: 'Software', price: 24.99, stock: 156, status: 'active' },
                    { name: 'NordVPN 2Y', cat: 'VPN', price: 69.99, stock: 0, status: 'out_of_stock' },
                  ].map((p, i) => (
                    <tr key={i} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-card-hover)]">
                      <td className="p-3 font-medium">{p.name}</td>
                      <td className="p-3 text-[var(--text-muted)]">{p.cat}</td>
                      <td className="p-3">{formatPrice(p.price)}</td>
                      <td className="p-3">{p.stock}</td>
                      <td className="p-3">
                        <Badge variant={p.status === 'active' ? 'success' : 'warning'}>{p.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        );

      case 'orders':
        return (
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-6">Order Management</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-color)]">
                    <th className="text-left p-3 font-medium text-[var(--text-muted)]">Order Code</th>
                    <th className="text-left p-3 font-medium text-[var(--text-muted)]">Customer</th>
                    <th className="text-left p-3 font-medium text-[var(--text-muted)]">Product</th>
                    <th className="text-left p-3 font-medium text-[var(--text-muted)]">Amount</th>
                    <th className="text-left p-3 font-medium text-[var(--text-muted)]">Status</th>
                    <th className="text-left p-3 font-medium text-[var(--text-muted)]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((o) => (
                    <tr key={o.id} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-card-hover)]">
                      <td className="p-3 font-mono text-xs">{o.id}</td>
                      <td className="p-3">{o.customer}</td>
                      <td className="p-3">{o.product}</td>
                      <td className="p-3">{formatPrice(o.amount)}</td>
                      <td className="p-3"><Badge variant={o.status === 'COMPLETED' ? 'success' : o.status === 'PENDING' ? 'warning' : 'danger'}>{o.status}</Badge></td>
                      <td className="p-3"><Button variant="ghost" size="sm">View</Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        );

      case 'customers':
        return (
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-6">Customer Management</h3>
            {['Sarah K.', 'Marcus J.', 'Elena R.', 'David L.', 'Aisha M.'].map((name, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-[var(--border-color)] last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                    {name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{name}</div>
                    <div className="text-xs text-[var(--text-muted)]">{name.toLowerCase().replace(' ', '')}@email.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-[var(--text-muted)]">${(Math.random() * 500 + 50).toFixed(0)} spent</span>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              </div>
            ))}
          </Card>
        );

      case 'categories':
        return (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Category Management</h3>
              <Button size="sm">+ Add Category</Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                { name: 'AI Tools', count: 12, icon: '🤖' },
                { name: 'Premium Accounts', count: 24, icon: '👑' },
                { name: 'Streaming', count: 18, icon: '🎬' },
                { name: 'Software', count: 32, icon: '💻' },
                { name: 'Gift Cards', count: 15, icon: '🎁' },
                { name: 'VPN', count: 8, icon: '🔒' },
                { name: 'Gaming', count: 20, icon: '🎮' },
                { name: 'Cloud Services', count: 10, icon: '☁️' },
              ].map((cat) => (
                <Card key={cat.name} hover className="p-4 text-center">
                  <div className="text-2xl mb-2">{cat.icon}</div>
                  <div className="font-medium text-sm">{cat.name}</div>
                  <div className="text-xs text-[var(--text-muted)]">{cat.count} products</div>
                </Card>
              ))}
            </div>
          </Card>
        );

      case 'coupons':
        return (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Coupon Management</h3>
              <Button size="sm">+ Create Coupon</Button>
            </div>
            {[
              { code: 'WELCOME20', discount: '20%', usage: '145/500', status: 'active' },
              { code: 'NEXA10', discount: '10%', usage: '320/1000', status: 'active' },
              { code: 'SAVE5', discount: '$5', usage: '89/200', status: 'active' },
              { code: 'BLACKFRIDAY', discount: '30%', usage: '0/500', status: 'scheduled' },
            ].map((c, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-[var(--border-color)] last:border-0">
                <div>
                  <span className="font-mono font-semibold text-sm">{c.code}</span>
                  <span className="ml-3 text-sm text-[var(--text-muted)]">{c.discount} off</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-[var(--text-muted)]">Used: {c.usage}</span>
                  <Badge variant={c.status === 'active' ? 'success' : 'warning'}>{c.status}</Badge>
                </div>
              </div>
            ))}
          </Card>
        );

      case 'settings':
        return (
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-6">API Settings</h3>
            <div className="space-y-6 max-w-xl">
              <div>
                <label className="block text-sm font-medium mb-2">Partner API Key</label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value="sk_live_••••••••••••••••••••••••••••••"
                    readOnly
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-sm text-[var(--text-muted)]"
                  />
                  <Button variant="secondary">Reveal</Button>
                  <Button variant="secondary">Regenerate</Button>
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-2">
                  Stored encrypted. Never exposed to frontend.
                </p>
              </div>
              <hr className="border-[var(--border-color)]" />
              <div>
                <h4 className="font-medium mb-3">Sync Settings</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Auto-sync catalog every 5 minutes</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Auto-sync stock levels</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Auto-sync prices</span>
                  </label>
                </div>
                <Button variant="secondary" size="sm" className="mt-4">
                  <Zap className="w-3 h-3" /> Sync Now
                </Button>
              </div>
            </div>
          </Card>
        );

      case 'reports':
        return (
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-6">Reports</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Revenue Report', desc: 'Daily, weekly, monthly breakdown', icon: BarChart3 },
                { title: 'Order Analytics', desc: 'Order volume, success rate, trends', icon: TrendingUp },
                { title: 'Product Performance', desc: 'Top sellers, stock analysis', icon: Package },
                { title: 'Customer Report', desc: 'Growth, retention, lifetime value', icon: UsersIcon },
                { title: 'API Usage', desc: 'Request count, errors, rate limits', icon: Zap },
                { title: 'Financial Summary', desc: 'Revenue, fees, net profit', icon: DollarSign },
              ].map((r) => (
                <Card key={r.title} hover className="p-5">
                  <r.icon className="w-6 h-6 text-blue-400 mb-3" />
                  <h4 className="font-semibold text-sm">{r.title}</h4>
                  <p className="text-xs text-[var(--text-muted)] mt-1">{r.desc}</p>
                  <Button variant="ghost" size="sm" className="mt-3">
                    View <ChevronRight className="w-3 h-3" />
                  </Button>
                </Card>
              ))}
            </div>
          </Card>
        );

      case 'logs':
        return (
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-6">Activity Logs</h3>
            <div className="space-y-3">
              {[
                { action: 'Order created', detail: 'SO-20260627-A1B2 — ChatGPT Plus ($18.99)', time: '2 min ago', type: 'order' },
                { action: 'Payment received', detail: 'Stripe payment of $18.99 confirmed', time: '2 min ago', type: 'payment' },
                { action: 'API sync completed', detail: 'Catalog synced — 156 products updated', time: '5 min ago', type: 'system' },
                { action: 'User registered', detail: 'sarah.k@email.com created account', time: '15 min ago', type: 'user' },
                { action: 'API key regenerated', detail: 'Production key rotated', time: '1 hour ago', type: 'security' },
                { action: 'Coupon created', detail: 'SUMMER25 — 25% off', time: '3 hours ago', type: 'system' },
              ].map((log, i) => (
                <div key={i} className="flex items-start gap-3 py-2 border-b border-[var(--border-color)] last:border-0">
                  <Badge variant={
                    log.type === 'order' ? 'accent' :
                    log.type === 'payment' ? 'success' :
                    log.type === 'security' ? 'danger' : 'default'
                  }>
                    {log.type}
                  </Badge>
                  <div className="flex-1">
                    <span className="text-sm font-medium">{log.action}</span>
                    <p className="text-xs text-[var(--text-muted)]">{log.detail}</p>
                  </div>
                  <span className="text-xs text-[var(--text-muted)] whitespace-nowrap">{log.time}</span>
                </div>
              ))}
            </div>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Admin top bar */}
      <div className="glass border-b border-[var(--border-color)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold">Nexa Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="success">System Online</Badge>
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
              AD
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-2 space-y-0.5 sticky top-20">
              {adminTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-500/10 text-blue-400 font-medium'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {adminTabs.find((t) => t.id === activeTab)?.label}
              </h2>
            </div>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
