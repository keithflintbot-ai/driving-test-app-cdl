import { NextRequest, NextResponse } from 'next/server';
import { getStripe, PREMIUM_PRICE_ID, PREMIUM_PRODUCT } from '@/lib/stripe';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import type Stripe from 'stripe';

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Stripe is not configured. Please add STRIPE_SECRET_KEY to environment variables.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { userId, email, returnUrl } = body;

    // Validate required fields
    if (!userId || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: userId and email' },
        { status: 400 }
      );
    }

    // Check if user already has premium
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      if (userData?.subscription?.isPremium) {
        return NextResponse.json(
          { error: 'User already has premium access' },
          { status: 400 }
        );
      }
    }

    const stripe = getStripe();

    // Determine the base URL for redirects
    const baseUrl = returnUrl || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Build checkout session params (simplified - no customer management needed)
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      customer_email: email,
      success_url: `${baseUrl}/dashboard?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${baseUrl}/dashboard?canceled=true`,
      metadata: {
        userId,
        email,
      },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: PREMIUM_PRODUCT.price,
            product_data: {
              name: PREMIUM_PRODUCT.name,
              description: PREMIUM_PRODUCT.description,
            },
          },
          quantity: 1,
        },
      ],
    };

    // If a valid Stripe price ID is configured, use that instead
    if (PREMIUM_PRICE_ID && PREMIUM_PRICE_ID.startsWith('price_')) {
      sessionParams.line_items = [
        {
          price: PREMIUM_PRICE_ID,
          quantity: 1,
        },
      ];
    }

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to create checkout session: ${errorMessage}` },
      { status: 500 }
    );
  }
}
