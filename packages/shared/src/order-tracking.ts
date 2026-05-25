export type OrderStatusKey =
  | 'PLACED'
  | 'PAID'
  | 'SELLER_PENDING'
  | 'SELLER_ACCEPTED'
  | 'SELLER_PROCESSING'
  | 'PICKUP_SCHEDULED'
  | 'PICKED_UP'
  | 'SHIPPED'
  | 'IN_TRANSIT'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED';

export interface TrackingStep {
  key: string;
  label: string;
  completed: boolean;
  timestamp?: string;
  detail?: string;
}

const CUSTOMER_FLOW: { key: string; label: string; statuses: OrderStatusKey[] }[] = [
  { key: 'ORDERED', label: 'Ordered', statuses: ['PLACED', 'PAID', 'SELLER_PENDING', 'SELLER_ACCEPTED', 'SELLER_PROCESSING'] },
  { key: 'SHIPPED', label: 'Shipped', statuses: ['PICKUP_SCHEDULED', 'PICKED_UP', 'SHIPPED', 'IN_TRANSIT'] },
  { key: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', statuses: ['OUT_FOR_DELIVERY'] },
  { key: 'DELIVERED', label: 'Delivered', statuses: ['DELIVERED'] },
];

export function buildCustomerOrderTracking(
  current: OrderStatusKey,
  history: { status: OrderStatusKey; createdAt: Date; message?: string }[],
): TrackingStep[] {
  const idx = CUSTOMER_FLOW.findIndex((s) => s.statuses.includes(current));
  return CUSTOMER_FLOW.map((step, i) => {
    const hit = history.find((h) => step.statuses.includes(h.status));
    return {
      key: step.key,
      label: step.label,
      completed: idx >= 0 && i <= idx,
      timestamp: hit?.createdAt.toISOString(),
      detail: hit?.message,
    };
  });
}
