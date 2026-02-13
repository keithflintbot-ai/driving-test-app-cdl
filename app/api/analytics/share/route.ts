import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST() {
  try {
    const db = getAdminDb();
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    await db.doc('analytics/shares').set(
      {
        total: FieldValue.increment(1),
        [`daily.${today}`]: FieldValue.increment(1),
      },
      { merge: true }
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error tracking share click:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
