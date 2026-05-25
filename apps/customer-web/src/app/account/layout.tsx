'use client';

import { usePathname } from 'next/navigation';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '';

  const links = [
    { name: 'My Orders', path: '/account/orders' },
    { name: 'Wallet Management', path: '/account/wallet' },
    { name: 'Addresses', path: '/account/addresses' },
    { name: 'Edit Profile', path: '/account/profile' },
    { name: 'My Wishlist', path: '/account/wishlist' },
    { name: 'Store Pickups', path: '/account/pickups' },
    { name: 'Help & Support', path: '/account/support' }
  ];

  return (
    <div className="container" style={{ padding: '3rem 1.5rem', display: 'grid', gridTemplateColumns: '250px 1fr', gap: '3rem' }}>
      <aside>
        <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--card-border)' }}>My Account</h2>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {links.map(link => (
              <a 
                key={link.path} 
                href={link.path}
                style={{
                  padding: '0.75rem 1rem',
                  textDecoration: 'none',
                  color: pathname.includes(link.path) ? 'white' : 'var(--text-main)',
                  background: pathname.includes(link.path) ? 'var(--brand)' : 'transparent',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: pathname.includes(link.path) ? 600 : 400,
                  transition: 'all 0.2s'
                }}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </aside>
      
      <main className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
        {children}
      </main>
    </div>
  );
}
