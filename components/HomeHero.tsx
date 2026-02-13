"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";
import { useTranslation } from "@/contexts/LanguageContext";
import { en, es } from "@/i18n";

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function useTypewriter(phrases: string[], typingSpeed = 80, deletingSpeed = 50, pauseDuration = 2000) {
  const [shuffledPhrases, setShuffledPhrases] = useState(() => shuffleArray(phrases));
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setShuffledPhrases(shuffleArray(phrases));
    setPhraseIndex(0);
    setDisplayText("");
    setIsDeleting(false);
  }, [phrases]);

  useEffect(() => {
    const currentPhrase = shuffledPhrases[phraseIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentPhrase.length) {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % shuffledPhrases.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex, shuffledPhrases, typingSpeed, deletingSpeed, pauseDuration]);

  return displayText;
}

export function HomeHero() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const startGuestSession = useStore((state) => state.startGuestSession);
  const isGuest = useStore((state) => state.isGuest);
  const { t, language } = useTranslation();

  const dict = language === 'es' ? es : en;
  const allPhrases = dict.landing.phrases;
  const animatedText = useTypewriter(allPhrases as unknown as string[]);

  const handleTryFree = () => {
    startGuestSession();
    router.push("/onboarding/select-state");
  };

  return (
    <>
      <p className="text-lg md:text-xl text-gray-600 mb-2">
        {t("landing.heroPrefix")}{" "}
        <span className="text-orange-600 font-semibold">{animatedText}</span>
        <span className="animate-pulse">|</span>
      </p>
      <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
        {t("landing.heroSubtitle")}
      </p>

      {!loading && (
        <>
          {user || isGuest ? (
            <Link href="/dashboard">
              <Button className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-6 text-lg rounded-full">
                {t("common.goToDashboard")}
              </Button>
            </Link>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <Link href="/signup">
                <Button className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-6 text-lg rounded-full">
                  {t("common.startPracticing")}
                </Button>
              </Link>
              <button
                onClick={handleTryFree}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                {t("common.tryItFirst")}
              </button>
            </div>
          )}
        </>
      )}

      {/* Product Screenshots */}
      <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="relative">
          <div className="rounded-2xl shadow-2xl overflow-hidden border border-gray-200 bg-white">
            <Image
              src="/mobile.png"
              alt="TigerTest mobile DMV practice test training mode"
              width={280}
              height={560}
              className="w-[200px] md:w-[240px]"
            />
          </div>
          <p className="text-sm text-gray-500 mt-6 text-center">{t("landing.trainOnMobile")}</p>
        </div>

        <div className="relative">
          <div className="rounded-2xl shadow-2xl overflow-hidden border border-gray-200 bg-white">
            <Image
              src="/desktop.png"
              alt="TigerTest desktop DMV practice test interface"
              width={700}
              height={480}
              className="w-[320px] md:w-[500px]"
            />
          </div>
          <p className="text-sm text-gray-500 mt-6 text-center">{t("landing.testOnDesktop")}</p>
        </div>
      </div>
    </>
  );
}

export function HomeCTA() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const startGuestSession = useStore((state) => state.startGuestSession);
  const isGuest = useStore((state) => state.isGuest);
  const { t } = useTranslation();

  const handleTryFree = () => {
    startGuestSession();
    router.push("/onboarding/select-state");
  };

  return (
    <>
      {!loading && !user && !isGuest && (
        <div className="flex flex-col items-center gap-3">
          <Link href="/signup">
            <Button className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-6 text-lg rounded-full">
              {t("common.startPracticing")}
            </Button>
          </Link>
          <button
            onClick={handleTryFree}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            {t("common.tryItFirst")}
          </button>
        </div>
      )}

      {!loading && (user || isGuest) && (
        <Link href="/dashboard">
          <Button className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-6 text-lg rounded-full">
            {t("common.goToDashboard")}
          </Button>
        </Link>
      )}
    </>
  );
}
