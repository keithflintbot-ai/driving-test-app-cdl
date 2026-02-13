"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Download, Loader2 } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";

interface ShareButtonProps {
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  testId?: number;
  setId?: number;
  stateCode: string;
  className?: string;
}

export function ShareButton({
  score,
  totalQuestions,
  percentage,
  passed,
  testId,
  setId,
  stateCode,
  className,
}: ShareButtonProps) {
  const { t, language } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    // Detect if the device supports native sharing with files
    // This is true on mobile (iOS/Android) but not on desktop browsers
    setCanNativeShare(
      typeof navigator !== "undefined" &&
      !!navigator.share &&
      !!navigator.canShare
    );
  }, []);

  const handleShare = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        score: score.toString(),
        total: totalQuestions.toString(),
        state: stateCode,
        lang: language,
      });
      if (testId) params.set("testId", testId.toString());
      if (setId) params.set("setId", setId.toString());

      const res = await fetch(`/api/og/score-card?${params}`);
      if (!res.ok) throw new Error("Failed to generate image");

      const blob = await res.blob();
      const file = new File([blob], "tigertest-score.png", { type: "image/png" });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file] });
      } else {
        // Desktop fallback: download the image
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "tigertest-score.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (err: unknown) {
      // User cancelling share is not an error
      if (err instanceof Error && err.name === "AbortError") return;
      setError(t("results.shareError"));
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <Button
        className={className || "bg-white text-black hover:bg-gray-100 border-2 border-gray-300 flex-1 sm:flex-initial"}
        onClick={handleShare}
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            {t("results.sharing")}
          </>
        ) : canNativeShare ? (
          <>
            <Share2 className="h-4 w-4 mr-2" />
            {t("results.shareScore")}
          </>
        ) : (
          <>
            <Download className="h-4 w-4 mr-2" />
            {t("results.downloadToShare")}
          </>
        )}
      </Button>
      {error && (
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-1">
          {error}
        </div>
      )}
    </div>
  );
}
