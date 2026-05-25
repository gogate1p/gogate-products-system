export default function SellerDashboard() {
  return (
    <>
      <h1>Seller Dashboard</h1>
      <p>After signup → login → complete KYC → admin verification → account activated.</p>
      <div className="bucket-tabs">
        {[
          'NEW',
          'PROCESSING',
          'PENDING_PICKUP',
          'PICKED_UP',
          'SHIPPED',
          'IN_TRANSIT',
          'OUT_FOR_DELIVERY',
          'DELIVERED',
          'RETURN',
          'REPLACEMENT',
          'CANCELLED',
        ].map((b) => (
          <a key={b} href={`/orders?bucket=${b}`}>
            {b.replace(/_/g, ' ')}
          </a>
        ))}
      </div>
    </>
  );
}
