'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const mockProducts = [
  { id: 1, name: 'Premium Wireless Headphones', brand: 'AudioTech', price: 299.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80', rating: 4.8 },
  { id: 2, name: 'Smart Fitness Watch Series 5', brand: 'FitLife', price: 199.50, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80', rating: 4.5 },
  { id: 3, name: 'Ergonomic Office Chair', brand: 'ComfortPlus', price: 450.00, image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&q=80', rating: 4.9 },
  { id: 4, name: '4K Ultra HD Drone', brand: 'SkyVision', price: 899.00, image: 'https://images.unsplash.com/photo-1507580461134-59f2f51b694b?w=500&q=80', rating: 4.7 },
  { id: 5, name: 'Mechanical Gaming Keyboard', brand: 'ProGamer', price: 129.99, image: 'https://images.unsplash.com/photo-1511467687858-23d9f2136aab?w=500&q=80', rating: 4.6 },
  { id: 6, name: 'Noise-Cancelling Earbuds', brand: 'AudioTech', price: 149.99, image: 'https://images.unsplash.com/photo-1572569438065-809d0a0e2797?w=500&q=80', rating: 4.4 }
];

const banners = [
  { id: 1, title: 'Summer Electronics Sale', subtitle: 'Up to 50% off on premium gadgets.', bg: 'https://images.unsplash.com/photo-1550009158-9ebf6d1736eb?w=1200&q=80' },
  { id: 2, title: 'New Smart Watches', subtitle: 'Track your health in style.', bg: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=1200&q=80' }
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container">
      {/* Hero Banner Carousel */}
      <section className="hero-slider animate-fade-in">
        {banners.map((banner, index) => (
          <div 
            key={banner.id} 
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${banner.bg})` }}
          >
            <div className="slide-content">
              <h1>{banner.title}</h1>
              <p>{banner.subtitle}</p>
              <a href="#products" className="btn-primary">Shop Now</a>
            </div>
          </div>
        ))}
      </section>

      {/* Product Grid */}
      <section id="products">
        <h2 className="section-title">Trending Products</h2>
        <div className="product-grid">
          {mockProducts.map((product) => (
            <a href={`/product/${product.id}`} key={product.id} className="product-card" style={{textDecoration: 'none'}}>
              <div className="product-img-wrapper">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <div className="product-brand">{product.brand}</div>
                <h3 className="product-name">{product.name}</h3>
                <div className="product-price">
                  <span>${product.price.toFixed(2)}</span>
                  <div className="seller-rating">
                    ★ {product.rating}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
