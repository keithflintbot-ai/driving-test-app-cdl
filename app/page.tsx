"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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

      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        {/* Hero - simple and direct */}
        <div className="mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Pass your permit test. First try.
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Free DMV practice tests for all 50 states. 200 questions each. No account required.
          </p>

          {!loading && (
            <>
              {user || isGuest ? (
                <Link href="/dashboard">
                  <Button className="bg-gray-900 text-white hover:bg-gray-800 px-6 py-5 text-base">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={handleTryFree}
                  className="bg-gray-900 text-white hover:bg-gray-800 px-6 py-5 text-base"
                >
                  Start practicing
                </Button>
              )}
            </>
          )}
        </div>

        {/* Social proof - the real selling point */}
        <div className="mb-16">
          <p className="text-sm text-gray-500 mb-6">From r/driving and r/DMV:</p>

          <div className="space-y-6">
            <a
              href="https://www.reddit.com/r/driving/comments/1ep1644/comment/m6ndsvp/"
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <p className="text-gray-800 text-lg">&quot;i passed in 3 minutes&quot;</p>
              <p className="text-gray-500 text-sm mt-1 group-hover:text-gray-700">— u/Curdled_Cave</p>
            </a>

            <a
              href="https://www.reddit.com/r/driving/comments/1ep1644/comment/lxra5co/"
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <p className="text-gray-800 text-lg">&quot;Used this to help me study. Passed today! Thank you :)&quot;</p>
              <p className="text-gray-500 text-sm mt-1 group-hover:text-gray-700">— u/Naive_Usual1910</p>
            </a>

            <div>
              <p className="text-gray-800 text-lg">&quot;passed within seven minutes&quot;</p>
              <p className="text-gray-500 text-sm mt-1">— vivacious-vi</p>
            </div>

            <div>
              <p className="text-gray-800 text-lg">&quot;felt confident after just studying the previous day&quot;</p>
              <p className="text-gray-500 text-sm mt-1">— JayjayX12</p>
            </div>

            <div>
              <p className="text-gray-800 text-lg">&quot;it really helped me prepare, and I passed my exam today&quot;</p>
              <p className="text-gray-500 text-sm mt-1">— Big-Burrito-8765</p>
            </div>

            <div>
              <p className="text-gray-800 text-lg">&quot;it was very helpful... I passed the written test this morning&quot;</p>
              <p className="text-gray-500 text-sm mt-1">— ideapad101</p>
            </div>

            <div>
              <p className="text-gray-800 text-lg">&quot;helped a lot&quot;</p>
              <p className="text-gray-500 text-sm mt-1">— WorthEducational523</p>
            </div>
          </div>
        </div>

        {/* How it works - just text */}
        <div className="mb-16">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">How it works</h2>
          <div className="space-y-3 text-gray-600">
            <p><span className="text-gray-900 font-medium">Training mode:</span> Learn at your own pace with instant feedback on each question.</p>
            <p><span className="text-gray-900 font-medium">Practice tests:</span> Take full 50-question tests that simulate the real exam.</p>
            <p><span className="text-gray-900 font-medium">Track progress:</span> See your pass probability increase as you practice.</p>
          </div>
        </div>

        {/* Simple footer note */}
        <div className="border-t border-gray-100 pt-8">
          <p className="text-gray-500 text-sm">
            100% free. No premium tier. No upsells. Just practice tests that work.
          </p>
          {!user && !isGuest && !loading && (
            <Button
              onClick={handleTryFree}
              variant="outline"
              className="mt-4 text-gray-700 border-gray-300 hover:bg-gray-50"
            >
              Start practicing
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
