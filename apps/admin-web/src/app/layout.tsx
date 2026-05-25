import Link from 'next/link';
import './admin.css';

const NAV = [
  { href: '/', label: 'Dashboard' },
  { href: '/sellers', label: 'Sellers' },
  { href: '/customers', label: 'Customers' },
  { href: '/orders', label: 'Orders' },
  { href: '/payments', label: 'Payments' },
  { href: '/coupons', label: 'Coupons' },
  { href: '/cms', label: 'CMS' },
  { href: '/api-keys', label: 'API Keys' },
  { href: '/courier', label: 'Courier CMS' },
  { href: '/hubs', label: 'Hubs' },
  { href: '/agents', label: 'Delivery Agents' },
  { href: '/support', label: 'Support' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <h2>Gogate Admin</h2>
        <p className="domain">gogateproducts.store</p>
        <nav>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
