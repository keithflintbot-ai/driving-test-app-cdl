"use client";

import { useTranslation } from "@/contexts/LanguageContext";

/**
 * Inline translation component. Renders English children on the server
 * (for SEO), and swaps to the translated string on the client when the
 * user's language is not English.
 *
 * Usage:
 *   <T k="landing.heroTitle">Free DMV Practice Tests for All 50 States</T>
 */
export function T({ k, children }: { k: string; children: React.ReactNode }) {
  const { language, t } = useTranslation();
  if (language === "en") return <>{children}</>;
  return <>{t(k)}</>;
}
