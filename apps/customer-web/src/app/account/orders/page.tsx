'use client';

import { useState } from 'react';

const mockOrders = [
  {
    id: 'ORD-109283746512',
    date: '2026-05-20',
    productName: 'Premium Wireless Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80',
    status: 'shipped', // ordered, shipped, out_for_delivery, delivered
    cancellable: false,
    returnable: true
  },
  {
    id: 'ORD-998877665544',
    date: '2026-05-24',
    productName: 'Smart Fitness Watch Series 5',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80',
    status: 'ordered',
    cancellable: true,
    returnable: false
  }
];

const trackingSteps = ['ordered', 'shipped', 'out_for_delivery', 'delivered'];
const stepLabels = ['Ordered', 'Shipped', 'Out for Delivery', 'Delivered'];

export default function MyOrdersPage() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const toggleOrder = (id: string) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>My Orders</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {mockOrders.map((order) => {
          const currentStepIndex = trackingSteps.indexOf(order.status);
          
          return (
            <div key={order.id} style={{ border: '1px solid var(--card-border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', background: 'rgba(255,255,255,0.4)' }}>
              <div 
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                onClick={() => toggleOrder(order.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <img src={order.image} alt={order.productName} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '8px' }} />
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{order.productName}</h3>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      Order ID: {order.id} | Placed: {order.date}
                    </div>
                  </div>
                </div>
                <div>
                  <svg 
                    width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    style={{ transform: expandedOrder === order.id ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>

              {expandedOrder === order.id && (
                <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(0,0,0,0.05)', animation: 'fadeIn 0.3s' }}>
                  <h4 style={{ marginBottom: '1.5rem' }}>Realtime Order Tracking</h4>
                  
                  {/* Progress Bar UI */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', marginBottom: '2rem' }}>
                    <div style={{ position: 'absolute', top: '50%', left: '10%', right: '10%', height: '4px', background: '#e2e8f0', zIndex: 0, transform: 'translateY(-50%)' }}></div>
                    <div style={{ position: 'absolute', top: '50%', left: '10%', width: `${(currentStepIndex / 3) * 80}%`, height: '4px', background: 'var(--brand)', zIndex: 0, transform: 'translateY(-50%)', transition: 'width 1s ease' }}></div>
                    
                    {trackingSteps.map((step, index) => {
                      const isCompleted = index <= currentStepIndex;
                      return (
                        <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, width: '25%' }}>
                          <div style={{ 
                            width: 32, height: 32, borderRadius: '50%', background: isCompleted ? 'var(--brand)' : '#fff', border: isCompleted ? 'none' : '2px solid #e2e8f0', 
                            color: isCompleted ? '#fff' : '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem',
                            boxShadow: isCompleted ? '0 0 10px rgba(99, 102, 241, 0.4)' : 'none', transition: 'all 0.3s'
                          }}>
                            {isCompleted ? '✓' : index + 1}
                          </div>
                          <span style={{ fontSize: '0.85rem', fontWeight: isCompleted ? 600 : 400, color: isCompleted ? 'var(--text-main)' : 'var(--text-muted)' }}>
                            {stepLabels[index]}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                    {order.cancellable && (
                      <button className="btn-primary" style={{ background: 'var(--accent)', boxShadow: '0 4px 14px rgba(244, 63, 94, 0.3)' }}>
                        Cancel Order
                      </button>
                    )}
                    {order.returnable && order.status === 'delivered' && (
                      <button className="btn-primary" style={{ background: 'var(--text-main)', boxShadow: 'none' }}>
                        Return Item
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
