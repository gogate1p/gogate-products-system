import Link from 'next/link';
import './seller.css';

const NAV = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/onboarding', label: 'KYC Onboarding' },
  { href: '/products', label: 'Products' },
  { href: '/orders', label: 'Orders' },
  { href: '/passbook', label: 'Passbook' },
  { href: '/subscription', label: 'Subscription' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/support', label: 'Support' },
  { href: '/profile', label: 'Profile' },
];

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="seller-shell">
      <aside>
        <h2>Seller Portal</h2>
        <nav>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
        </nav>
        <Link href="/login" className="logout">
          Logout
        </Link>
      </aside>
      <main>{children}</main>
    </div>
  );
}
