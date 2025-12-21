"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TestCard } from "@/components/TestCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Zap, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";

export default function DashboardPage() {
  const router = useRouter();
  const hydrated = useHydration();
  const selectedState = useStore((state) => state.selectedState);
  const getProgress = useStore((state) => state.getProgress);
  const getTestSession = useStore((state) => state.getTestSession);
  const getTestAttemptStats = useStore((state) => state.getTestAttemptStats);
  const getTestAverageScore = useStore((state) => state.getTestAverageScore);
  const getCurrentTest = useStore((state) => state.getCurrentTest);
  const isTestUnlocked = useStore((state) => state.isTestUnlocked);
  const training = useStore((state) => state.training);
  const getPassProbability = useStore((state) => state.getPassProbability);

  const [expandedTest, setExpandedTest] = useState<number | null>(null);

  const passProbability = hydrated ? getPassProbability() : 0;

  // Redirect to onboarding if no state selected
  useEffect(() => {
    if (hydrated && !selectedState) {
      router.push("/onboarding/select-state");
    }
  }, [hydrated, selectedState, router]);

  const stats = hydrated ? getProgress() : {
    testsCompleted: 0,
    questionsAnswered: 0,
    totalCorrect: 0,
    accuracy: 0,
    averageScore: 0,
  };

  // Get status for each test
  const getTestStatus = (testNumber: number): "not-started" | "in-progress" | "completed" => {
    const session = getTestSession(testNumber);
    if (session) return "completed";
    const currentTest = getCurrentTest(testNumber);
    if (currentTest && currentTest.questions.length > 0) return "in-progress";
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* State Indicator */}
        <div className="flex items-center gap-2 text-gray-600 mb-6">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">Practicing for: {selectedState}</span>
        </div>

        {/* Training Mode */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Training Mode</h2>
          <p className="text-sm text-gray-600 mb-4">
            Learn at your own pace. Practice individual questions with instant feedback after each answer. Perfect for building knowledge and understanding why answers are correct.
          </p>
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Zap className="h-10 w-10 text-purple-600" />
                  <div>
                    <h3 className="font-bold text-lg text-purple-900">Start Training</h3>
                    <p className="text-sm text-gray-700">Practice with instant feedback</p>
                  </div>
                </div>
                <Link href="/training">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Start Training
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Practice Tests */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Practice Tests</h2>
          <p className="text-sm text-gray-600 mb-4">
            Simulate the real exam. Take full 50-question tests to measure your readiness. Score 40+ to unlock the next test and track your progress.
          </p>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((testNumber) => {
              const status = getTestStatus(testNumber);
              const session = getTestSession(testNumber);
              const attemptStats = getTestAttemptStats(testNumber);
              const averageScore = getTestAverageScore(testNumber);
              const locked = !isTestUnlocked(testNumber);
              return (
                <TestCard
                  key={testNumber}
                  testNumber={testNumber}
                  status={status}
                  score={session?.score}
                  progress={getTestProgress(testNumber)}
                  totalQuestions={50}
                  firstScore={attemptStats?.firstScore}
                  bestScore={attemptStats?.bestScore}
                  attemptCount={attemptStats?.attemptCount}
                  averageScore={averageScore}
                  locked={locked}
                  expanded={expandedTest === testNumber}
                  onToggle={() => setExpandedTest(expandedTest === testNumber ? null : testNumber)}
                />
              );
            })}
          </div>
        </div>

        {/* Pass Probability */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <TrendingUp className="h-10 w-10 text-green-600" />
                <div>
                  <p className="text-lg text-gray-700">
                    {passProbability === 0
                      ? "Start practicing to see your pass probability"
                      : `There is a ${passProbability}% chance that you will pass your driving knowledge test.`
                    }
                  </p>
                </div>
              </div>
              <Link href="/stats">
                <Button variant="outline" className="bg-white hover:bg-gray-50">
                  More Stats
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
