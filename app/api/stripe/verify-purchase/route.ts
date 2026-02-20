import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, userId } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing sessionId' },
        { status: 400 }
      );
    }

    const stripe = getStripe();

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Verify payment was successful
    if (session.payment_status !== 'paid') {
      return NextResponse.json({
        isPremium: false,
        message: 'Payment not completed',
      });
    }

    // If userId provided, also check Firestore to confirm webhook processed
    if (userId) {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData?.subscription?.isPremium) {
          return NextResponse.json({
            isPremium: true,
            purchasedAt: userData.subscription.purchasedAt,
            message: 'Premium access confirmed',
          });
        }
      }
    }

    // Payment succeeded but webhook might not have processed yet
    // Return success anyway since Stripe confirmed payment
    return NextResponse.json({
      isPremium: true,
      purchasedAt: new Date().toISOString(),
      message: 'Payment verified with Stripe',
      pendingWebhook: true,
    });
  } catch (error) {
    console.error('Verify purchase error:', error);
    return NextResponse.json(
      { error: 'Failed to verify purchase' },
      { status: 500 }
    );
  }
}
