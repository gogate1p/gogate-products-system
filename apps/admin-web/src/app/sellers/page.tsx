const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export default async function SellersPage() {
  let sellers: { id: string; sellerId: string; businessName: string; kycStatus: string; user?: { email: string; status: string } }[] = [];
  try {
    const res = await fetch(`${API}/admin/sellers`, { cache: 'no-store' });
    if (res.ok) sellers = await res.json();
  } catch {
    /* */
  }

  return (
    <>
      <h1>Sellers</h1>
      <p>Create sellers, verify KYC, Didit CKYC, enable/disable accounts.</p>
      <table>
        <thead>
          <tr>
            <th>Seller ID</th>
            <th>Business</th>
            <th>Email</th>
            <th>KYC</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((s) => (
            <tr key={s.id}>
              <td>{s.sellerId}</td>
              <td>{s.businessName}</td>
              <td>{s.user?.email}</td>
              <td>{s.kycStatus}</td>
              <td>{s.user?.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
