export const DOMAIN = 'gogateproducts.store';

export const ORDER_TRACKING_STEPS = [
  'ORDERED',
  'SHIPPED',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
] as const;

export const SHIPMENT_TRACKING_STEPS = [
  'BOOKED',
  'IN_TRANSIT',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
] as const;

export const SELLER_ORDER_BUCKETS = [
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
] as const;

export const PAYMENT_PROVIDERS = ['RAZORPAY', 'PAYU', 'EASEBUZZ'] as const;

export const COURIER_PROVIDERS = [
  'GOGATE',
  'SHIPROCKET',
  'NIMBUSPOST',
  'SHIPDAY',
  'ZIPPYKIND',
  'DELIFORCE',
] as const;
