import type { Metadata } from 'next';
import './globals.css';
import ChatbotWidget from '../components/ChatbotWidget';

export const metadata: Metadata = {
  title: 'Gogate Products | Premium Marketplace',
  description: 'Shop the best products directly from verified sellers. Real-time tracking and premium support.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container header-inner glass">
            <a href="/" className="logo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Gogate Products
            </a>
            <nav className="nav-links">
              <a href="/">Home</a>
              <a href="/account/orders">My Orders</a>
              <a href="/account/wallet">Wallet</a>
              <a href="/account/wishlist">Wishlist</a>
              <a href="/login" className="btn-primary" style={{ color: 'white', border: 'none' }}>Log In</a>
            </nav>
          </div>
        </header>
        
        <main>{children}</main>
        
        <ChatbotWidget />
      </body>
    </html>
  );
}
