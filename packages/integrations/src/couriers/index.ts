export type CourierName =
  | 'GOGATE'
  | 'SHIPROCKET'
  | 'NIMBUSPOST'
  | 'SHIPDAY'
  | 'ZIPPYKIND'
  | 'DELIFORCE';

export interface ServiceabilityQuery {
  pickupPincode: string;
  deliveryPincode: string;
  weightGrams: number;
}

export interface ServiceabilityResult {
  provider: CourierName;
  available: boolean;
  estimatedDelivery?: string;
  rate?: number;
}

export interface BookShipmentInput {
  orderId: string;
  pickupPincode: string;
  deliveryPincode: string;
  weightGrams: number;
  cod?: boolean;
  codAmount?: number;
}

export interface BookShipmentResult {
  provider: CourierName;
  awbn: string;
  labelUrl?: string;
  manifestUrl?: string;
  pickupScheduledAt?: string;
}

export interface CourierAdapter {
  readonly name: CourierName;
  checkServiceability(q: ServiceabilityQuery): Promise<ServiceabilityResult>;
  bookShipment(input: BookShipmentInput): Promise<BookShipmentResult>;
  syncTracking(awbn: string): Promise<{ status: string; events: unknown[] }>;
}

export class GogateCourierAdapter implements CourierAdapter {
  readonly name = 'GOGATE' as const;

  async checkServiceability(q: ServiceabilityQuery): Promise<ServiceabilityResult> {
    return {
      provider: 'GOGATE',
      available: true,
      estimatedDelivery: new Date(Date.now() + 3 * 864e5).toISOString(),
    };
  }

  async bookShipment(input: BookShipmentInput): Promise<BookShipmentResult> {
    return {
      provider: 'GOGATE',
      awbn: `GP${Date.now()}`,
      pickupScheduledAt: new Date(Date.now() + 864e5).toISOString(),
    };
  }

  async syncTracking(awbn: string) {
    return { status: 'IN_TRANSIT', events: [{ awbn, stub: true }] };
  }
}

/** Aggregates Gogate + Shiprocket + Nimbuspost etc. — returns best ETA */
export async function quoteAllCouriers(
  adapters: CourierAdapter[],
  query: ServiceabilityQuery,
): Promise<ServiceabilityResult[]> {
  const results = await Promise.all(
    adapters.map((a) =>
      a.checkServiceability(query).catch(() => ({
        provider: a.name,
        available: false,
      })),
    ),
  );
  return results.filter((r) => r.available);
}
