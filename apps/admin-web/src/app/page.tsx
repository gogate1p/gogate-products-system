const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

async function stats() {
  try {
    const res = await fetch(`${API}/admin/stats`, { cache: 'no-store' });
    if (res.ok) return res.json();
  } catch {
    /* */
  }
  return null;
}

export default async function AdminDashboard() {
  const s = await stats();

  return (
    <>
      <h1>Main Admin — Gogate Products</h1>
      <p>Ecommerce + courier management</p>
      <div className="card-grid">
        {[
          ['Sellers', s?.sellers ?? '—'],
          ['Customers', s?.customers ?? '—'],
          ['Orders', s?.orders ?? '—'],
          ['Pending products', s?.pendingProducts ?? '—'],
          ['Shipments', s?.shipments ?? '—'],
          ['Open tickets', s?.openTickets ?? '—'],
        ].map(([label, val]) => (
          <div key={label} className="stat-card">
            <div>{label}</div>
            <strong style={{ fontSize: '1.5rem' }}>{val}</strong>
          </div>
        ))}
      </div>
    </>
  );
}
