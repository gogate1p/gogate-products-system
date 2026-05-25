const BUCKETS = [
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
];

export default function SellerOrdersPage({
  searchParams,
}: {
  searchParams: { bucket?: string };
}) {
  const bucket = searchParams.bucket || 'NEW';

  return (
    <>
      <h1>Orders — {bucket.replace(/_/g, ' ')}</h1>
      <p>Accept/reject new orders · SLA &amp; ETA on accept · Book courier by pincode serviceability</p>
      <div className="bucket-tabs">
        {BUCKETS.map((b) => (
          <a key={b} href={`/orders?bucket=${b}`} style={b === bucket ? { fontWeight: 700 } : undefined}>
            {b}
          </a>
        ))}
      </div>
      <p>API: GET /orders/seller/:sellerId/bucket/:bucket</p>
    </>
  );
}
