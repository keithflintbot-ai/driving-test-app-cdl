"use client";

import Link from "next/link";
import Image from "next/image";
import { Smartphone, Monitor } from "lucide-react";
import { states } from "@/data/states";
import { HomeHero, HomeCTA } from "@/components/HomeHero";
import { useTranslation } from "@/contexts/LanguageContext";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "TigerTest - Free DMV Practice Tests",
      description:
        "Pass your US driving knowledge test with 200 state-specific practice questions. Free training mode, practice tests, and detailed analytics for all 50 states.",
      url: siteUrl,
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
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "6",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "Organization",
      name: "TigerTest",
      url: siteUrl,
      logo: `${siteUrl}/tiger.png`,
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
          name: "Can I use TigerTest for free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! You can take practice tests and train with questions for free across all 50 states.",
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
        {
          "@type": "Question",
          name: "How should I study for the DMV permit test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Start with TigerTest's training mode to learn questions with instant feedback. Once you feel confident, take practice tests to simulate the real exam. Most users pass after completing all 4 training sets and scoring 80%+ on practice tests.",
          },
        },
      ],
    },
  ],
};

// Popular states for the grid
const popularStateSlugs = [
  "california", "texas", "florida", "new-york", "pennsylvania",
  "illinois", "ohio", "georgia", "north-carolina", "michigan",
  "new-jersey", "virginia",
];

const popularStates = popularStateSlugs
  .map((slug) => states.find((s) => s.slug === slug))
  .filter(Boolean);

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50 to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            {t("landing.heroTitle")}
          </h1>
          <HomeHero />
        </div>
      </div>

      {/* How it works */}
      <div className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
          {t("landing.howItWorks")}
        </h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-2 border-orange-200 rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-orange-500" />
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t("landing.trainingMode")}
              </h3>
              <p className="text-gray-600">
                {t("landing.trainingModeDesc")}
              </p>
            </div>
          </div>

          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500" />
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t("landing.practiceTests")}
              </h3>
              <p className="text-gray-600">
                {t("landing.practiceTestsDesc")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-xl md:text-2xl text-gray-700 italic mb-4">
            &quot;{t("landing.testimonial1")}&quot;
          </p>
          <p className="text-gray-500 text-sm">JayjayX12</p>
        </div>
      </div>

      {/* State specific */}
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t("landing.stateSpecificTitle")}
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              {t("landing.stateSpecificDesc")}
            </p>
            <p className="text-gray-500">
              {t("landing.allStatesCovered")}
            </p>
          </div>
          <div className="flex-shrink-0">
            <Image
              src="/tiger_face_01.png"
              alt="TigerTest mascot"
              width={180}
              height={180}
              className="w-32 md:w-44"
            />
          </div>
        </div>
      </div>

      {/* Choose Your State - SEO state grid */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            {t("landing.chooseYourState")}
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            {t("landing.chooseYourStateDesc")}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {popularStates.map(
              (state) =>
                state && (
                  <Link
                    key={state.slug}
                    href={`/${state.slug}-dmv-practice-test`}
                    className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4 hover:border-orange-300 hover:bg-orange-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900 text-sm">
                      {state.name}
                    </span>
                    <span className="text-xs text-gray-400">{state.writtenTestQuestions}Q</span>
                  </Link>
                )
            )}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/practice-tests-by-state"
              className="text-orange-600 hover:text-orange-700 font-medium hover:underline"
            >
              {t("landing.viewAllStates")} &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonial 2 */}
      <div className="bg-white py-12">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-xl md:text-2xl text-gray-700 italic mb-4">
            &quot;{t("landing.testimonial2")}&quot;
          </p>
          <p className="text-gray-500 text-sm">Big-Burrito-8765</p>
        </div>
      </div>

      {/* Reddit proof section */}
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
          {t("landing.builtForPeople")}
        </h2>
        <p className="text-gray-600 text-center mb-12 flex items-center justify-center gap-2">
          {t("landing.fromReddit")}
          <Image
            src="/reddit.png"
            alt="Reddit"
            width={72}
            height={24}
            className="h-[55px] w-auto inline-block"
          />
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a
            href="https://www.reddit.com/r/driving/comments/1ep1644/comment/lxra5co/"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-50 border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors"
          >
            <p className="text-gray-800 mb-3">&quot;{t("landing.testimonial3")}&quot;</p>
            <p className="text-gray-500 text-sm">u/Naive_Usual1910</p>
          </a>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <p className="text-gray-800 mb-3">&quot;{t("landing.testimonial4")}&quot;</p>
            <p className="text-gray-500 text-sm">vivacious-vi</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <p className="text-gray-800 mb-3">&quot;{t("landing.testimonial5")}&quot;</p>
            <p className="text-gray-500 text-sm">ideapad101</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <p className="text-gray-800 mb-3">&quot;{t("landing.testimonial6")}&quot;</p>
            <p className="text-gray-500 text-sm">WorthEducational523</p>
          </div>

          <a
            href="https://www.reddit.com/r/driving/comments/1ep1644/comment/m6ndsvp/"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-50 border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors"
          >
            <p className="text-gray-800 mb-3">&quot;{t("landing.testimonial7")}&quot;</p>
            <p className="text-gray-500 text-sm">u/Curdled_Cave</p>
          </a>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <p className="text-gray-800 mb-3">&quot;{t("landing.testimonial1")}&quot;</p>
            <p className="text-gray-500 text-sm">JayjayX12</p>
          </div>
        </div>
      </div>

      {/* How to Study for Your DMV Test - SEO content section */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            {t("landing.howToPassTitle")}
          </h2>

          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t("landing.howToPass1Title")}
              </h3>
              <p>
                {t("landing.howToPass1Desc")}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t("landing.howToPass2Title")}
              </h3>
              <p>
                {t("landing.howToPass2Desc")}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t("landing.howToPass3Title")}
              </h3>
              <p>
                {t("landing.howToPass3Desc")}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t("landing.howToPass4Title")}
              </h3>
              <p>
                {t("landing.howToPass4Desc")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          {t("landing.faqTitle")}
        </h2>

        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              {t("landing.faq1Q")}
            </h3>
            <p className="text-gray-600">
              {t("landing.faq1A")}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              {t("landing.faq2Q")}
            </h3>
            <p className="text-gray-600">
              {t("landing.faq2A")}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              {t("landing.faq3Q")}
            </h3>
            <p className="text-gray-600">
              {t("landing.faq3A")}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              {t("landing.faq4Q")}
            </h3>
            <p className="text-gray-600">
              {t("landing.faq4A")}
            </p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-orange-50 to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {t("landing.readyToPass")}
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            {t("landing.freeToStartLong")}
          </p>
          <HomeCTA />
        </div>
      </div>
    </div>
  );
}
