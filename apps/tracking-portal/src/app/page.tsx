'use client';

import { useState } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export default function TrackingPage() {
  const [awb, setAwb] = useState('');
  const [data, setData] = useState<{
    steps?: { label: string; completed: boolean }[];
    events?: { description?: string; createdAt: string; location?: string }[];
  } | null>(null);

  async function track() {
    const res = await fetch(`${API}/shipments/track/${awb}`);
    if (res.ok) setData(await res.json());
    else setData(null);
  }

  const steps = data?.steps || [
    { label: 'Shipment Booked', completed: false },
    { label: 'In Transit', completed: false },
    { label: 'Out for Delivery', completed: false },
    { label: 'Delivered', completed: false },
  ];

  return (
    <div style={{ fontFamily: 'system-ui', maxWidth: 720, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Gogate Courier Tracking</h1>
      <p>track.gogateproducts.store</p>
      <input
        value={awb}
        onChange={(e) => setAwb(e.target.value)}
        placeholder="Shipment / AWB number"
        style={{ padding: '0.5rem', width: '100%', marginBottom: '0.5rem' }}
      />
      <button type="button" onClick={track}>
        Track
      </button>
      <div className="tracking-steps" style={{ display: 'flex', gap: 8, margin: '1.5rem 0', flexWrap: 'wrap' }}>
        {steps.map((s) => (
          <div
            key={s.label}
            style={{
              flex: 1,
              minWidth: 120,
              padding: 8,
              textAlign: 'center',
              borderRadius: 6,
              background: s.completed ? '#0d47a1' : '#e0e0e0',
              color: s.completed ? '#fff' : '#333',
              fontSize: 13,
            }}
          >
            {s.label}
          </div>
        ))}
      </div>
      <h3>First mile → last mile updates</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Time</th>
            <th>Location</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {(data?.events || []).map((e, i) => (
            <tr key={i}>
              <td>{new Date(e.createdAt).toLocaleString()}</td>
              <td>{e.location || '—'}</td>
              <td>{e.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
