'use client';

import { useState } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export function PincodeCheck() {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);

  async function check() {
    if (pincode.length !== 6) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${API}/pincode/check?delivery=${pincode}&pickup=415612&weight=500`,
      );
      setResult(await res.json());
    } catch {
      setResult({ error: 'Could not reach API' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pincode-bar">
      <strong>Check delivery</strong>
      <input
        type="text"
        placeholder="Enter 6-digit pincode"
        maxLength={6}
        value={pincode}
        onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
      />
      <button type="button" onClick={check} disabled={loading}>
        {loading ? 'Checking…' : 'Check ETA (Gogate + partners)'}
      </button>
      <label>
        <input type="checkbox" readOnly checked={!!result?.storePickupAvailable} /> Store pickup
      </label>
      <label>
        <input type="checkbox" readOnly checked={!!result?.hyperlocalAvailable} /> Hyperlocal nearby
      </label>
      {result?.providers && (
        <p className="pincode-result">
          {(result.providers as { provider: string; estimatedDelivery?: string }[])
            .map((p) => `${p.provider}: ${p.estimatedDelivery?.slice(0, 10) || 'available'}`)
            .join(' · ')}
        </p>
      )}
    </div>
  );
}
