'use client';

import { useState } from 'react';

const mockProduct = {
  id: 1,
  name: 'Premium Wireless Headphones',
  brand: 'AudioTech',
  price: 299.99,
  images: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80'
  ],
  description: 'Experience pure audio fidelity with our premium wireless headphones. Features active noise cancellation, 30-hour battery life, and plush over-ear cushions for maximum comfort.',
  specifications: {
    Weight: '250g',
    Dimensions: '18 x 15 x 8 cm',
    Connectivity: 'Bluetooth 5.2',
    Battery: '30 Hours'
  },
  manufacturer: {
    name: 'AudioTech Innovations Ltd.',
    address: '123 Tech Park, Silicon Valley, CA 94025',
    packer: 'Global Logistics Packers'
  },
  seller: {
    name: 'GadgetZone',
    id: 'SELLER-001',
    rating: 4.8,
    deliveryRating: 4.9
  },
  reviews: [
    { id: 1, user: 'John D.', rating: 5, text: 'Amazing sound quality and very comfortable!' },
    { id: 2, user: 'Sarah M.', rating: 4, text: 'Great battery life but slightly heavy.' }
  ],
  returnable: true,
  cancellationAllowed: true
};

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'mfg'>('desc');
  const [pincode, setPincode] = useState('');
  const [deliveryEstimate, setDeliveryEstimate] = useState<string | null>(null);

  const checkPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setDeliveryEstimate('Delivery available by ' + new Date(Date.now() + 86400000 * 3).toLocaleDateString() + '. Hyperlocal delivery available!');
    } else {
      setDeliveryEstimate('Please enter a valid 6-digit pincode.');
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '4rem' }}>
        {/* Image Gallery */}
        <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: '#fff', border: '1px solid #f1f5f9' }}>
          <img src={mockProduct.images[0]} alt={mockProduct.name} style={{ width: '100%', display: 'block' }} />
        </div>

        {/* Product Info */}
        <div>
          <div className="product-brand">{mockProduct.brand}</div>
          <h1 className="product-name" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{mockProduct.name}</h1>
          <div className="product-price" style={{ fontSize: '2rem', marginBottom: '2rem' }}>
            ${mockProduct.price}
          </div>

          <div className="glass" style={{ padding: '1.5rem', marginBottom: '2rem', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ marginBottom: '1rem' }}>Check Delivery</h3>
            <form onSubmit={checkPincode} style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="text" 
                placeholder="Enter Pincode" 
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', flex: 1 }}
              />
              <button type="submit" className="btn-primary">Check</button>
            </form>
            {deliveryEstimate && (
              <div style={{ marginTop: '1rem', color: var(--brand), fontWeight: 500 }}>
                {deliveryEstimate}
              </div>
            )}
            <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Integrated with Gogate Courier, Shiprocket, Nimbuspost. Store pickup available.
            </div>
          </div>

          <button className="btn-primary" style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }}>
            Add to Cart
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', gap: '2rem', borderBottom: '2px solid #e2e8f0', marginBottom: '2rem' }}>
          {['desc', 'specs', 'mfg'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              style={{
                background: 'none', border: 'none', fontSize: '1.1rem', fontWeight: activeTab === tab ? 600 : 400,
                color: activeTab === tab ? 'var(--brand)' : 'var(--text-muted)',
                paddingBottom: '1rem', borderBottom: activeTab === tab ? '3px solid var(--brand)' : '3px solid transparent',
                cursor: 'pointer', marginBottom: '-2px', transition: 'all 0.2s'
              }}
            >
              {tab === 'desc' ? 'Description' : tab === 'specs' ? 'Specifications' : 'Manufacturer & Packer'}
            </button>
          ))}
        </div>

        <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
          {activeTab === 'desc' && <p>{mockProduct.description}</p>}
          {activeTab === 'specs' && (
            <ul style={{ listStyle: 'none' }}>
              {Object.entries(mockProduct.specifications).map(([key, val]) => (
                <li key={key} style={{ padding: '0.5rem 0', borderBottom: '1px solid #f1f5f9' }}>
                  <strong>{key}:</strong> {val}
                </li>
              ))}
            </ul>
          )}
          {activeTab === 'mfg' && (
            <div>
              <p><strong>Manufacturer:</strong> {mockProduct.manufacturer.name}</p>
              <p><strong>Address:</strong> {mockProduct.manufacturer.address}</p>
              <p><strong>Packaged By:</strong> {mockProduct.manufacturer.packer}</p>
            </div>
          )}
        </div>
      </div>

      {/* Seller Details */}
      <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', marginBottom: '3rem' }}>
        <h2>Sold By</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ width: 50, height: 50, background: 'var(--brand)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
            {mockProduct.seller.name.charAt(0)}
          </div>
          <div>
            <h3>{mockProduct.seller.name}</h3>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', gap: '1rem', marginTop: '0.25rem' }}>
              <span>Seller Rating: ★ {mockProduct.seller.rating}</span>
              <span>Delivery Rating: ★ {mockProduct.seller.deliveryRating}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Customer Reviews</h2>
        {mockProduct.reviews.map((review) => (
          <div key={review.id} style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <strong>{review.user}</strong>
              <span style={{ color: '#fbbf24' }}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
            </div>
            <p style={{ color: 'var(--text-muted)' }}>{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
