"use client";

import Link from "next/link";
import { useTranslation } from "@/contexts/LanguageContext";
import { states } from "@/data/states";

// Popular states to feature in the footer
const popularStateSlugs = [
  "california",
  "texas",
  "florida",
  "new-york",
  "pennsylvania",
  "illinois",
  "ohio",
  "georgia",
  "north-carolina",
  "michigan",
  "new-jersey",
  "virginia",
  "washington",
  "arizona",
  "massachusetts",
];

const popularStates = popularStateSlugs
  .map((slug) => states.find((s) => s.slug === slug))
  .filter(Boolean);

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t bg-gray-50 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm text-gray-500">
          {popularStates.map(
            (state) =>
              state && (
                <Link
                  key={state.slug}
                  href={`/${state.slug}-dmv-practice-test`}
                  className="hover:text-orange-600"
                >
                  {state.name}
                </Link>
              )
          )}
          <Link
            href="/practice-tests-by-state"
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            {t("footer.allStates")}
          </Link>
        </div>
        <p className="text-center text-sm text-gray-600 mt-4">
          {t("footer.madeWith")}{" "}
          <span className="text-red-500" aria-label="love">
            ❤️
          </span>{" "}
          {t("footer.by")}{" "}
          <a
            href="https://x.com/JohnBr0"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600 hover:text-orange-700 font-medium hover:underline"
          >
            @JohnBr0
          </a>
          .
        </p>
        <p className="text-center text-sm text-gray-600 mt-1">
          <a
            href="https://www.johnbrophy.net/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600 hover:text-orange-700 font-medium hover:underline"
          >
            {t("footer.sendMe")}
          </a>{" "}
          {t("footer.quoteIfPass")}
        </p>
      </div>
    </footer>
  );
}
