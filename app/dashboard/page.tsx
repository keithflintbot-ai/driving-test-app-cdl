"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TestCard } from "@/components/TestCard";
import { TrainingSetCard, TrainingSet } from "@/components/TrainingSetCard";
import { PaywallModal } from "@/components/PaywallModal";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, ChevronRight, CheckCircle, BarChart3 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/lib/firebase";
import { states } from "@/data/states";
import questionsData from "@/data/questions.json";
import { Question } from "@/types";

// Training set definitions
const TRAINING_SET_NAMES: { [key: number]: string } = {
  1: "Signs & Signals",
  2: "Rules of the Road",
  3: "Safety & Emergencies",
  4: "State Laws",
};

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hydrated = useHydration();
  const { user } = useAuth();
  const isGuest = useStore((state) => state.isGuest);
  const selectedState = useStore((state) => state.selectedState);
  const getTestSession = useStore((state) => state.getTestSession);
  const getTestAttemptStats = useStore((state) => state.getTestAttemptStats);
  const getCurrentTest = useStore((state) => state.getCurrentTest);
  const isTestUnlocked = useStore((state) => state.isTestUnlocked);
  const isTrainingSetUnlocked = useStore((state) => state.isTrainingSetUnlocked);
  const hasPremiumAccess = useStore((state) => state.hasPremiumAccess);
  const setPremiumStatus = useStore((state) => state.setPremiumStatus);
  const training = useStore((state) => state.training);
  const getTrainingSetProgress = useStore((state) => state.getTrainingSetProgress);
  const getPassProbability = useStore((state) => state.getPassProbability);
  const getQuestionPerformance = useStore((state) => state.getQuestionPerformance);
  const isOnboardingComplete = useStore((state) => state.isOnboardingComplete);

  // Paywall state
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [paywallFeature, setPaywallFeature] = useState<"training_set_4" | "practice_test_4">("training_set_4");
  const [showPurchaseSuccess, setShowPurchaseSuccess] = useState(false);

  const passProbability = hydrated ? getPassProbability() : 0;
  const onboardingComplete = hydrated ? isOnboardingComplete() : true;
  const onboardingProgress = training.totalCorrectAllTime;
  const isPremium = hydrated ? hasPremiumAccess() : false;

  // Compute weakest category for stats teaser
  const weakestCategory = useMemo(() => {
    if (!hydrated || !selectedState || isGuest || passProbability === 0) return null;
    const performance = getQuestionPerformance();
    const performanceMap = new Map(performance.map((p) => [p.questionId, p]));
    const allQuestions = questionsData as Question[];
    const stateQuestions = allQuestions.filter((q) => q.state === "ALL" || q.state === selectedState);

    const categoryStats: { [cat: string]: { correct: number; wrong: number } } = {};
    stateQuestions.forEach((q) => {
      const perf = performanceMap.get(q.questionId);
      if (!perf || perf.timesAnswered === 0) return;
      if (!categoryStats[q.category]) categoryStats[q.category] = { correct: 0, wrong: 0 };
      categoryStats[q.category].correct += perf.timesCorrect;
      categoryStats[q.category].wrong += perf.timesWrong;
    });

    let worstCat = "";
    let worstAcc = 101;
    let worstWrong = 0;
    Object.entries(categoryStats).forEach(([category, stats]) => {
      const total = stats.correct + stats.wrong;
      if (total > 0 && stats.wrong > 0) {
        const accuracy = Math.round((stats.correct / total) * 100);
        if (accuracy < worstAcc) {
          worstCat = category;
          worstAcc = accuracy;
          worstWrong = stats.wrong;
        }
      }
    });
    if (!worstCat) return null;
    return { category: worstCat, accuracy: worstAcc, wrong: worstWrong };
  }, [hydrated, selectedState, isGuest, passProbability, getQuestionPerformance]);

  // Get state name from code
  const stateName = states.find((s) => s.code === selectedState)?.name || selectedState;

  // Build training sets from store
  const getTrainingSets = (): TrainingSet[] => {
    return [1, 2, 3, 4].map((id) => {
      const progress = getTrainingSetProgress(id);
      return {
        id,
        name: TRAINING_SET_NAMES[id],
        correctCount: progress.correct,
        targetCount: progress.total,
      };
    });
  };

  // Get tiger face image based on pass probability (100% only for happiest)
  const getTigerFace = (probability: number): string => {
    if (probability >= 100) return "/tiger_face_01.png";
    if (probability >= 85) return "/tiger_face_02.png";
    if (probability >= 70) return "/tiger_face_03.png";
    if (probability >= 55) return "/tiger_face_04.png";
    if (probability >= 40) return "/tiger_face_05.png";
    if (probability >= 25) return "/tiger_face_06.png";
    if (probability >= 10) return "/tiger_face_07.png";
    return "/tiger_face_08.png";
  };

  // Redirect to onboarding if no state selected
  useEffect(() => {
    if (hydrated && !selectedState) {
      router.push("/onboarding/select-state");
    }
  }, [hydrated, selectedState, router]);

  // Handle post-purchase verification
  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    const success = searchParams.get("success");
    const canceled = searchParams.get("canceled");

    if (sessionId && success === "true" && user?.uid) {
      // Verify purchase with backend
      const sendVerification = async () => {
        const idToken = await auth.currentUser?.getIdToken();
        if (!idToken) return;
        return fetch("/api/stripe/verify-purchase", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({ sessionId }),
        });
      };
      sendVerification()
        .then((res) => res?.json())
        .then((data) => {
          if (!data) return;
          if (data.isPremium) {
            setPremiumStatus({
              isPremium: true,
              purchasedAt: data.purchasedAt || new Date().toISOString(),
              stripeCustomerId: "",
              stripePaymentId: sessionId,
            });
            setShowPurchaseSuccess(true);
            // Clean up URL
            router.replace("/dashboard");
          }
        })
        .catch((err) => console.error("Failed to verify purchase:", err));
    }

    if (canceled === "true") {
      // Clean up URL
      router.replace("/dashboard");
    }
  }, [searchParams, user?.uid, setPremiumStatus, router]);

  // Handle paywall click
  const handlePremiumClick = (feature: "training_set_4" | "practice_test_4") => {
    setPaywallFeature(feature);
    setPaywallOpen(true);
  };

  // Handle upgrade (redirect to Stripe)
  const handleUpgrade = async () => {
    if (!user?.email || !user?.uid) {
      router.push("/signup");
      return;
    }

    try {
      const idToken = await auth.currentUser?.getIdToken();
      if (!idToken) {
        alert("Authentication error. Please sign in again.");
        return;
      }

      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          email: user.email,
          returnUrl: window.location.origin,
        }),
      });

      const data = await response.json();

      if (data.error) {
        console.error("Checkout error:", data.error);
        alert(`Error: ${data.error}`);
        return;
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        console.error("No checkout URL returned:", data);
        alert("Failed to start checkout. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to start checkout. Please check your connection and try again.");
    }
  };

  // Get status for each test
  const getTestStatus = (testNumber: number): "not-started" | "in-progress" | "completed" => {
    const currentTest = getCurrentTest(testNumber);
    if (currentTest && currentTest.questions.length > 0) return "in-progress";
    const session = getTestSession(testNumber);
    if (session) return "completed";
    return "not-started";
  };

  const getTestProgress = (testNumber: number): number => {
    const currentTest = getCurrentTest(testNumber);
    if (currentTest) {
      const answeredCount = Object.keys(currentTest.answers).length;
      const totalQuestions = currentTest.questions.length;
      return totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;
    }
    return 0;
  };

  const trainingSets = hydrated ? getTrainingSets() : [1, 2, 3, 4].map((id) => ({
    id,
    name: TRAINING_SET_NAMES[id],
    correctCount: 0,
    targetCount: 50,
  }));

  return (
    <div className="min-h-screen bg-white relative">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-orange-50 to-white pointer-events-none" />
      <div className="relative container mx-auto px-4 py-8 max-w-6xl">

        {/* Paywall Modal */}
        <PaywallModal
          open={paywallOpen}
          onOpenChange={setPaywallOpen}
          feature={paywallFeature}
          onUpgrade={handleUpgrade}
          isGuest={isGuest}
          onSignUp={() => router.push("/signup")}
        />

        {/* Purchase Success Message */}
        {showPurchaseSuccess && (
          <Card className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <CheckCircle className="h-12 w-12 text-green-500" />
                <div className="flex-1">
                  <p className="text-xl font-bold text-green-900">
                    Welcome to Premium!
                  </p>
                  <p className="text-sm text-green-700 mt-1">
                    Training Set 4 and Practice Test 4 are now unlocked
                  </p>
                </div>
                <button
                  onClick={() => setShowPurchaseSuccess(false)}
                  className="text-green-600 hover:text-green-800"
                >
                  &times;
                </button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Onboarding Card - shown during onboarding */}
        {!onboardingComplete && (
          <Link href="/training" className="block">
            <Card className="mb-6 bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200 hover:shadow-md transition-all cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Zap className="h-12 w-12 text-orange-500" />
                  <div className="flex-1">
                    <p className="text-2xl font-bold text-orange-900">
                      {onboardingProgress}/10
                    </p>
                    <p className="text-sm text-orange-700 mt-1">
                      {10 - onboardingProgress} more to unlock training & tests
                    </p>
                  </div>
                  <ChevronRight className="h-6 w-6 text-orange-400" />
                </div>
              </CardContent>
            </Card>
          </Link>
        )}

        {/* Pass Probability / Stats Card - shown after onboarding when there's data */}
        {onboardingComplete && isGuest && (
          <Card className="mb-6 bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="text-4xl">📊</div>
                <div className="flex-1">
                  <p className="text-lg text-gray-700">
                    <span className="font-bold">Sign up</span> to track your pass probability and detailed statistics
                  </p>
                  <Link href="/signup" className="text-sm text-orange-600 hover:text-orange-800 font-medium mt-1 inline-block">
                    Create free account →
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        {onboardingComplete && !isGuest && passProbability > 0 && (
          <Link href="/stats" className="block">
            <Card className={`mb-6 cursor-pointer transition-shadow hover:shadow-lg ${
              passProbability >= 80
                ? "bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200"
                : passProbability >= 60
                  ? "bg-gradient-to-r from-lime-50 to-green-50 border-lime-200"
                  : passProbability >= 40
                    ? "bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200"
                    : passProbability >= 20
                      ? "bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200"
                      : "bg-gradient-to-r from-red-50 to-rose-50 border-red-200"
            }`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Image
                    src={getTigerFace(passProbability)}
                    alt="Tiger mascot"
                    width={48}
                    height={48}
                    className="w-12 h-12"
                  />
                  <div className="flex-1">
                    <p className="text-xl font-bold text-gray-900">
                      {passProbability > 50
                        ? <>{passProbability}% chance of passing</>
                        : <>{100 - passProbability}% chance of failing</>
                      }
                    </p>
                    {weakestCategory ? (
                      <p className="text-sm text-gray-500 mt-1">
                        Weakest topic: <span className="font-medium text-red-600">{weakestCategory.category} ({weakestCategory.accuracy}%)</span>
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500 mt-1">Tap to see your full breakdown</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 hidden md:inline">View stats</span>
                    <ChevronRight className={`h-6 w-6 ${
                    passProbability >= 80
                      ? "text-emerald-400"
                      : passProbability >= 60
                        ? "text-lime-400"
                        : passProbability >= 40
                          ? "text-amber-400"
                          : passProbability >= 20
                            ? "text-orange-400"
                            : "text-red-400"
                  }`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        )}
        {onboardingComplete && !isGuest && passProbability === 0 && (
          <Link href="/stats" className="block">
            <Card className="mb-6 cursor-pointer transition-shadow hover:shadow-md bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-bold text-gray-900">Track Your Progress</p>
                    <p className="text-sm text-gray-500 mt-1">Start training to see per-question stats and pass probability</p>
                  </div>
                  <ChevronRight className="h-6 w-6 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </Link>
        )}

        {/* Training Sets - only shown after onboarding */}
        {onboardingComplete && (
          <div className="mb-8">
            <div className="mb-3">
              <h2 className="text-xl font-bold">Training</h2>
            </div>
            <p className="text-sm text-gray-500 mb-4">Get all 50 questions correct to complete each set</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {trainingSets.map((set) => {
                const isPremiumLocked = set.id === 4 && !isPremium && onboardingComplete;
                return (
                  <TrainingSetCard
                    key={set.id}
                    set={set}
                    isPremiumLocked={isPremiumLocked}
                    onPremiumClick={() => handlePremiumClick("training_set_4")}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Practice Tests */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">Practice Tests</h2>
          <p className="text-sm text-gray-500 mb-4">
            {onboardingComplete ? "Simulate the real exam experience" : "Complete onboarding to unlock"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((testNumber) => {
              const status = getTestStatus(testNumber);
              const session = getTestSession(testNumber);
              const attemptStats = getTestAttemptStats(testNumber);
              const isPremiumLocked = testNumber === 4 && !isPremium && onboardingComplete;
              const locked = !onboardingComplete;
              return (
                <TestCard
                  key={testNumber}
                  testNumber={testNumber}
                  status={locked || isPremiumLocked ? "not-started" : status}
                  score={session?.score}
                  progress={getTestProgress(testNumber)}
                  totalQuestions={50}
                  bestScore={attemptStats?.bestScore}
                  locked={locked}
                  isPremiumLocked={isPremiumLocked}
                  onPremiumClick={() => handlePremiumClick("practice_test_4")}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <DashboardContent />
    </Suspense>
  );
}
