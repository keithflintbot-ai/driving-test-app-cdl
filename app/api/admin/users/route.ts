import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { isAdminEmail } from '@/lib/admin';

// Calculate detailed stats from a Firestore user document
function processFirestoreDoc(data: Record<string, unknown>) {
  // Training questions: onboarding + training sets 1-4
  const training = (data.training || {}) as Record<string, unknown>;
  const onboardingMastered = (training.masteredQuestionIds || []) as unknown[];

  const trainingSets = (data.trainingSets || {}) as Record<string, Record<string, unknown>>;
  let trainingQuestionsAnswered = onboardingMastered.length;
  for (const setId of [1, 2, 3, 4]) {
    const setData = trainingSets[setId] || {};
    const masteredIds = (setData.masteredIds || []) as unknown[];
    const wrongQueue = (setData.wrongQueue || []) as unknown[];
    trainingQuestionsAnswered += masteredIds.length + wrongQueue.length;
  }

  // Test questions: completed tests + in-progress tests
  const completedTests = (data.completedTests || []) as Record<string, unknown>[];
  let testQuestionsAnswered = completedTests.reduce((sum: number, test: Record<string, unknown>) => {
    const answers = test.answers as unknown[] | undefined;
    return sum + (answers?.length || (test.totalQuestions as number) || 0);
  }, 0);

  const currentTests = (data.currentTests || {}) as Record<string, Record<string, unknown>>;
  for (const testId of Object.keys(currentTests)) {
    const testData = currentTests[testId];
    if (testData?.answers) {
      testQuestionsAnswered += Object.keys(testData.answers as Record<string, unknown>).length;
    }
  }

  return {
    testsCompleted: completedTests.length,
    trainingQuestionsAnswered,
    testQuestionsAnswered,
    activeDates: (data.activeDates || []) as string[],
    isPremium: (data.subscription as Record<string, unknown>)?.isPremium === true,
  };
}

export async function GET(request: NextRequest) {
  try {
    // Get the authorization header (Firebase ID token)
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const idToken = authHeader.split('Bearer ')[1];

    // Verify the token and check if user is admin
    const auth = getAdminAuth();

    let decodedToken;
    try {
      decodedToken = await auth.verifyIdToken(idToken);
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    if (!isAdminEmail(decodedToken.email)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Fetch Auth users and Firestore data in parallel
    const db = getAdminDb();
    const [authUsers, usersSnapshot] = await Promise.all([
      auth.listUsers(1000),
      db.collection('users').get(),
    ]);

    const firestoreUserMap = new Map(
      usersSnapshot.docs.map(doc => [doc.id, doc.data()])
    );

    // Combine Auth and Firestore data with detailed stats
    const users = authUsers.users.map(authUser => {
      const firestoreData = firestoreUserMap.get(authUser.uid);
      const stats = firestoreData ? processFirestoreDoc(firestoreData) : null;
      return {
        uid: authUser.uid,
        email: authUser.email || 'Unknown',
        selectedState: (firestoreData?.selectedState as string) || null,
        lastUpdated: (firestoreData?.lastUpdated as string) || null,
        createdAt: authUser.metadata.creationTime || null,
        testsCompleted: stats?.testsCompleted || 0,
        trainingQuestionsAnswered: stats?.trainingQuestionsAnswered || 0,
        testQuestionsAnswered: stats?.testQuestionsAnswered || 0,
        activeDates: stats?.activeDates || [],
        isPremium: stats?.isPremium || false,
      };
    });

    // Sort by creation date (newest first)
    users.sort((a, b) => {
      if (!a.createdAt) return 1;
      if (!b.createdAt) return -1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    // Calculate stats by state
    const stateCounts: Record<string, number> = {};
    users.forEach(user => {
      if (user.selectedState) {
        stateCounts[user.selectedState] = (stateCounts[user.selectedState] || 0) + 1;
      }
    });

    return NextResponse.json({
      users,
      stats: {
        totalUsers: users.length,
        usersWithState: users.filter(u => u.selectedState).length,
        byState: stateCounts,
      },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage },
      { status: 500 }
    );
  }
}
