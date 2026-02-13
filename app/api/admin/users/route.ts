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

// Calculate daily active users for the last 30 days (server-side)
function calculateDailyActiveUsers(
  usersWithDates: { activeDates: string[]; lastUpdated: string | null }[]
) {
  const days: { date: string; count: number; displayDate: string }[] = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const activeCount = usersWithDates.filter(u => {
      if (u.activeDates.length > 0) {
        return u.activeDates.includes(dateStr);
      }
      if (u.lastUpdated) {
        const lastUpdated = new Date(u.lastUpdated);
        return lastUpdated >= startOfDay && lastUpdated <= endOfDay;
      }
      return false;
    }).length;

    days.push({
      date: dateStr,
      count: activeCount,
      displayDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    });
  }

  return days;
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

    // Fetch Auth users, Firestore data, and share analytics in parallel
    const db = getAdminDb();
    const [authUsers, usersSnapshot, sharesDoc] = await Promise.all([
      auth.listUsers(1000),
      db.collection('users').get(),
      db.doc('analytics/shares').get(),
    ]);

    const firestoreUserMap = new Map(
      usersSnapshot.docs.map(doc => [doc.id, doc.data()])
    );

    // Aggregate stats as we build user list
    const stateCounts: Record<string, number> = {};
    let totalTrainingQuestions = 0;
    let totalTestQuestions = 0;
    let totalTestsCompleted = 0;
    let payingUsers = 0;
    const usersForDau: { activeDates: string[]; lastUpdated: string | null }[] = [];

    // Combine Auth and Firestore data — omit activeDates from per-user response
    const users = authUsers.users.map(authUser => {
      const firestoreData = firestoreUserMap.get(authUser.uid);
      const stats = firestoreData ? processFirestoreDoc(firestoreData) : null;

      const selectedState = (firestoreData?.selectedState as string) || null;
      const lastUpdated = (firestoreData?.lastUpdated as string) || null;
      const trainingQA = stats?.trainingQuestionsAnswered || 0;
      const testQA = stats?.testQuestionsAnswered || 0;
      const testsComp = stats?.testsCompleted || 0;
      const premium = stats?.isPremium || false;

      // Accumulate aggregate stats
      if (selectedState) {
        stateCounts[selectedState] = (stateCounts[selectedState] || 0) + 1;
      }
      totalTrainingQuestions += trainingQA;
      totalTestQuestions += testQA;
      totalTestsCompleted += testsComp;
      if (premium) payingUsers++;
      usersForDau.push({ activeDates: stats?.activeDates || [], lastUpdated });

      return {
        uid: authUser.uid,
        email: authUser.email || 'Unknown',
        selectedState,
        lastUpdated,
        createdAt: authUser.metadata.creationTime || null,
        testsCompleted: testsComp,
        trainingQuestionsAnswered: trainingQA,
        testQuestionsAnswered: testQA,
        isPremium: premium,
      };
    });

    // Sort by creation date (newest first)
    users.sort((a, b) => {
      if (!a.createdAt) return 1;
      if (!b.createdAt) return -1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    // Calculate DAU chart data server-side
    const dailyActiveUsers = calculateDailyActiveUsers(usersForDau);

    // Calculate 7-day active users
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    });
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const activeUsers7d = usersForDau.filter(u => {
      if (u.activeDates.length > 0) {
        return u.activeDates.some(d => last7Days.includes(d));
      }
      if (u.lastUpdated) {
        return new Date(u.lastUpdated) >= sevenDaysAgo;
      }
      return false;
    }).length;

    const totalQuestionsAnswered = totalTrainingQuestions + totalTestQuestions;

    // Share analytics
    const sharesData = sharesDoc.exists ? sharesDoc.data() : null;
    const totalShareClicks = (sharesData?.total as number) || 0;
    const shareClicksDaily = (sharesData?.daily as Record<string, number>) || {};

    const response = NextResponse.json({
      users,
      dailyActiveUsers,
      stats: {
        totalUsers: users.length,
        usersWithState: Object.values(stateCounts).reduce((a, b) => a + b, 0),
        byState: stateCounts,
        totalQuestionsAnswered,
        totalTrainingQuestions,
        totalTestQuestions,
        activeUsers7d,
        totalTestsCompleted,
        avgQuestionsPerUser: users.length > 0 ? Math.round(totalQuestionsAnswered / users.length) : 0,
        payingUsers,
        totalShareClicks,
        shareClicksDaily,
      },
    });

    // Cache for 30 seconds to avoid redundant Firebase calls on refresh
    response.headers.set('Cache-Control', 'private, max-age=30');

    return response;
  } catch (error) {
    console.error('Error fetching users:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage },
      { status: 500 }
    );
  }
}
