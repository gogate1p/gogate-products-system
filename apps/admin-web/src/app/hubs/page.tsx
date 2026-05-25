const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export default async function HubsPage() {
  let hubs: { hubId: string; name: string; pincode: string; status: string; radiusKm: number }[] = [];
  try {
    const res = await fetch(`${API}/hubs`, { cache: 'no-store' });
    if (res.ok) hubs = await res.json();
  } catch {
    /* */
  }

  return (
    <>
      <h1>Hubs</h1>
      <p>Hub name, address, radius, manager, Didit KYC, activation.</p>
      <table>
        <thead>
          <tr>
            <th>Hub ID</th>
            <th>Name</th>
            <th>Pincode</th>
            <th>Radius km</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {hubs.map((h) => (
            <tr key={h.hubId}>
              <td>{h.hubId}</td>
              <td>{h.name}</td>
              <td>{h.pincode}</td>
              <td>{h.radiusKm}</td>
              <td>{h.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
