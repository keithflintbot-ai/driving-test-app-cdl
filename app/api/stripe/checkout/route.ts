import { NextRequest, NextResponse } from 'next/server';
import { getStripe, PREMIUM_PRICE_ID, PREMIUM_PRODUCT } from '@/lib/stripe';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export async function POST(request: NextRequest) {
  try {
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

    // Create or retrieve Stripe customer
    let customerId: string;
    const existingCustomers = await stripe.customers.list({
      email,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      customerId = existingCustomers.data[0].id;
    } else {
      const customer = await stripe.customers.create({
        email,
        metadata: {
          firebaseUserId: userId,
        },
      });
      customerId = customer.id;
    }

    // Determine the base URL for redirects
    const baseUrl = returnUrl || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        PREMIUM_PRICE_ID
          ? { price: PREMIUM_PRICE_ID, quantity: 1 }
          : {
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
      success_url: `${baseUrl}/dashboard?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${baseUrl}/dashboard?canceled=true`,
      metadata: {
        userId,
        email,
      },
    });

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
