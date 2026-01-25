import Stripe from 'stripe';

// Lazy-initialized Stripe instance (to avoid build-time errors)
let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not set');
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripeInstance;
}

// Price for premium access ($9.99)
export const PREMIUM_PRICE_ID = process.env.STRIPE_PRICE_ID;

// Premium product metadata
export const PREMIUM_PRODUCT = {
  name: 'TigerTest Premium',
  description: 'Unlock Training Set 4 (State Laws) and Practice Test 4',
  price: 999, // in cents
};
