"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, BookOpen, Target, Trophy, Zap, BarChart3, Cloud } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "TigerTest - US Driving Test Practice",
      description:
        "Pass your US driving knowledge test with 200 state-specific practice questions. Free training mode, practice tests, and detailed analytics for all 50 states.",
      url: "https://tigertest.io",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "200 questions per state",
        "All 50 US states covered",
        "Training mode with instant feedback",
        "Practice tests simulating real exams",
        "Detailed analytics and progress tracking",
        "Auto-save progress",
      ],
    },
    {
      "@type": "Organization",
      name: "TigerTest",
      url: "https://tigertest.io",
      logo: "https://tigertest.io/tiger.png",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How many questions are on the DMV written test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most states have between 20-50 questions on the DMV written test. TigerTest offers 200 practice questions per state so you're fully prepared.",
          },
        },
        {
          "@type": "Question",
          name: "Is TigerTest really free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, TigerTest is 100% free forever. All 50 states, all questions, no premium tiers or hidden costs.",
          },
        },
        {
          "@type": "Question",
          name: "What score do I need to pass the DMV test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most states require a score of 80% or higher to pass. TigerTest tracks your progress and shows your pass probability as you practice.",
          },
        },
      ],
    },
  ],
};

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const startGuestSession = useStore((state) => state.startGuestSession);
  const isGuest = useStore((state) => state.isGuest);

  const handleTryFree = () => {
    startGuestSession();
    router.push("/onboarding/select-state");
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 md:mb-8 max-w-4xl mx-auto leading-tight">
            Pass your driving test. First try.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-10 max-w-2xl mx-auto">
            Reddit&apos;s favorite DMV practice app. No tricks, no timers, no upsells.
          </p>
          {!loading && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {user || isGuest ? (
                <Link href="/dashboard">
                  <Button size="lg" className="text-lg md:text-xl px-8 md:px-12 py-6 md:py-8 bg-black text-white hover:bg-gray-800 shadow-xl hover:shadow-2xl transition-all font-bold rounded-xl border-4 border-gray-900">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={handleTryFree}
                  size="lg"
                  className="text-lg md:text-xl px-8 md:px-12 py-6 md:py-8 bg-black text-white hover:bg-gray-800 shadow-xl hover:shadow-2xl transition-all font-bold rounded-xl border-4 border-gray-900"
                >
                  Start practicing
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Learning Modes Section */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
              <CardHeader className="text-center md:text-left">
                <div className="hidden md:flex w-16 h-16 bg-orange-600 rounded-xl items-center justify-center mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-orange-900">Training Mode</CardTitle>
                <CardDescription className="text-base">Learn at your own pace</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700 text-center md:text-left">
                  <li className="flex items-start gap-2 justify-center md:justify-start">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0 hidden md:block" />
                    <span>Instant feedback after each question</span>
                  </li>
                  <li className="flex items-start gap-2 justify-center md:justify-start">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0 hidden md:block" />
                    <span>See correct answers and explanations</span>
                  </li>
                  <li className="flex items-start gap-2 justify-center md:justify-start">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0 hidden md:block" />
                    <span>Build knowledge without pressure</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
              <CardHeader className="text-center md:text-left">
                <div className="hidden md:flex w-16 h-16 bg-orange-600 rounded-xl items-center justify-center mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-orange-900">Practice Tests</CardTitle>
                <CardDescription className="text-base">Simulate the real exam</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700 text-center md:text-left">
                  <li className="flex items-start gap-2 justify-center md:justify-start">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0 hidden md:block" />
                    <span>4 full-length 50-question tests</span>
                  </li>
                  <li className="flex items-start gap-2 justify-center md:justify-start">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0 hidden md:block" />
                    <span>Track scores and improvement over time</span>
                  </li>
                  <li className="flex items-start gap-2 justify-center md:justify-start">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0 hidden md:block" />
                    <span>Unlock tests as you score 40+</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-20 max-w-3xl mx-auto">
          <div className="space-y-4">
            <a href="https://www.reddit.com/r/driving/comments/1ep1644/comment/m6ndsvp/" target="_blank" rel="noopener noreferrer" className="block border-l-2 border-gray-200 pl-4 py-2 hover:border-gray-400 transition-colors">
              <p className="text-gray-600 text-sm">&quot;i passed in 3 minutes&quot;</p>
              <p className="text-gray-400 text-xs mt-1">— u/Curdled_Cave</p>
            </a>
            <a href="https://www.reddit.com/r/driving/comments/1ep1644/comment/lxra5co/" target="_blank" rel="noopener noreferrer" className="block border-l-2 border-gray-200 pl-4 py-2 hover:border-gray-400 transition-colors">
              <p className="text-gray-600 text-sm">&quot;Used this to help me study. Passed today! Thank you :)&quot;</p>
              <p className="text-gray-400 text-xs mt-1">— u/Naive_Usual1910</p>
            </a>
            <div className="border-l-2 border-gray-200 pl-4 py-2">
              <p className="text-gray-600 text-sm">&quot;passed within seven minutes&quot;</p>
              <p className="text-gray-400 text-xs mt-1">— vivacious-vi</p>
            </div>
            <div className="border-l-2 border-gray-200 pl-4 py-2">
              <p className="text-gray-600 text-sm">&quot;felt confident after just studying the previous day&quot;</p>
              <p className="text-gray-400 text-xs mt-1">— JayjayX12</p>
            </div>
            <div className="border-l-2 border-gray-200 pl-4 py-2">
              <p className="text-gray-600 text-sm">&quot;it really helped me prepare, and I passed my exam today&quot;</p>
              <p className="text-gray-400 text-xs mt-1">— Big-Burrito-8765</p>
            </div>
            <div className="border-l-2 border-gray-200 pl-4 py-2">
              <p className="text-gray-600 text-sm">&quot;it was very helpful... I passed the written test this morning&quot;</p>
              <p className="text-gray-400 text-xs mt-1">— ideapad101</p>
            </div>
            <div className="border-l-2 border-gray-200 pl-4 py-2">
              <p className="text-gray-600 text-sm">&quot;helped a lot&quot;</p>
              <p className="text-gray-400 text-xs mt-1">— WorthEducational523</p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">Everything You Need</h2>
          <p className="text-gray-600 text-center mb-12 text-lg">All features included - no hidden costs, no premium tiers</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader className="text-center md:text-left">
                <div className="hidden md:flex w-12 h-12 bg-orange-100 rounded-lg items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>State-Specific</CardTitle>
              </CardHeader>
              <CardContent className="text-center md:text-left">
                <CardDescription>
                  Questions tailored to your state&apos;s exact driving laws and regulations
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader className="text-center md:text-left">
                <div className="hidden md:flex w-12 h-12 bg-orange-100 rounded-lg items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>Get Better Every Day</CardTitle>
              </CardHeader>
              <CardContent className="text-center md:text-left">
                <CardDescription>
                  Your pass probability increases with every question you answer. Watch your progress grow in real-time.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader className="text-center md:text-left">
                <div className="hidden md:flex w-12 h-12 bg-orange-100 rounded-lg items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>Detailed Analytics</CardTitle>
              </CardHeader>
              <CardContent className="text-center md:text-left">
                <CardDescription>
                  Track attempts, best scores, and average performance across all tests
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader className="text-center md:text-left">
                <div className="hidden md:flex w-12 h-12 bg-orange-100 rounded-lg items-center justify-center mb-4">
                  <Cloud className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>Auto-Save Progress</CardTitle>
              </CardHeader>
              <CardContent className="text-center md:text-left">
                <CardDescription>
                  Never lose your progress - all data syncs automatically to the cloud
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        {!user && !isGuest && (
          <div className="mt-20 text-center">
            <Button
              onClick={handleTryFree}
              size="lg"
              className="text-lg md:text-xl px-8 md:px-12 py-6 md:py-8 bg-black text-white hover:bg-gray-800 shadow-xl hover:shadow-2xl transition-all font-bold rounded-xl border-4 border-gray-900"
            >
              Start practicing
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
