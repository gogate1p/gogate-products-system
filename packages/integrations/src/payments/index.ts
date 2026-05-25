export interface PaymentGatewayConfig {
  keyId: string;
  keySecret: string;
  merchantKey?: string;
  salt?: string;
}

export interface CreatePaymentInput {
  orderId: string;
  amount: number;
  currency?: string;
  customerEmail: string;
  customerPhone?: string;
}

export interface PaymentResult {
  provider: 'RAZORPAY' | 'PAYU' | 'EASEBUZZ';
  externalId: string;
  checkoutUrl?: string;
  raw: unknown;
}

export interface PaymentGateway {
  readonly name: 'RAZORPAY' | 'PAYU' | 'EASEBUZZ';
  createPayment(input: CreatePaymentInput): Promise<PaymentResult>;
  verifyWebhook(payload: unknown, signature: string): boolean;
}

/** Stub — wire real SDKs in phase 2 */
export class RazorpayGateway implements PaymentGateway {
  readonly name = 'RAZORPAY' as const;
  constructor(private config: PaymentGatewayConfig) {}

  async createPayment(input: CreatePaymentInput): Promise<PaymentResult> {
    return {
      provider: 'RAZORPAY',
      externalId: `rzp_${input.orderId}`,
      checkoutUrl: `https://api.razorpay.com/v1/checkout/${input.orderId}`,
      raw: { stub: true, keyId: this.config.keyId },
    };
  }

  verifyWebhook(): boolean {
    return true;
  }
}

export class PayUGateway implements PaymentGateway {
  readonly name = 'PAYU' as const;
  constructor(private config: PaymentGatewayConfig) {}

  async createPayment(input: CreatePaymentInput): Promise<PaymentResult> {
    return {
      provider: 'PAYU',
      externalId: `payu_${input.orderId}`,
      raw: { stub: true, merchantKey: this.config.merchantKey },
    };
  }

  verifyWebhook(): boolean {
    return true;
  }
}

export class EasebuzzGateway implements PaymentGateway {
  readonly name = 'EASEBUZZ' as const;
  constructor(private config: PaymentGatewayConfig) {}

  async createPayment(input: CreatePaymentInput): Promise<PaymentResult> {
    return {
      provider: 'EASEBUZZ',
      externalId: `eb_${input.orderId}`,
      raw: { stub: true },
    };
  }

  verifyWebhook(): boolean {
    return true;
  }
}

export function createPaymentGateway(
  provider: 'RAZORPAY' | 'PAYU' | 'EASEBUZZ',
  config: PaymentGatewayConfig,
): PaymentGateway {
  switch (provider) {
    case 'RAZORPAY':
      return new RazorpayGateway(config);
    case 'PAYU':
      return new PayUGateway(config);
    case 'EASEBUZZ':
      return new EasebuzzGateway(config);
  }
}
