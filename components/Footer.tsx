"use client";

import Link from "next/link";
import { useTranslation } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t bg-gray-50 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-sm text-gray-600">
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
