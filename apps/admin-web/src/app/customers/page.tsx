const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export default async function CustomersPage() {
  let rows: { id: string; fullName: string; user?: { email: string; status: string } }[] = [];
  try {
    const res = await fetch(`${API}/admin/customers`, { cache: 'no-store' });
    if (res.ok) rows = await res.json();
  } catch {
    /* */
  }

  return (
    <>
      <h1>Customers</h1>
      <p>Enable / disable customer accounts from admin.</p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((c) => (
            <tr key={c.id}>
              <td>{c.fullName}</td>
              <td>{c.user?.email}</td>
              <td>{c.user?.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
