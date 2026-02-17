"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { PremiumBadge } from "@/components/PremiumBadge";
import { useTranslation } from "@/contexts/LanguageContext";

export interface TrainingSet {
  id: number;
  name: string;
  correctCount: number;
  targetCount: number;
}

interface TrainingSetCardProps {
  set: TrainingSet;
  locked?: boolean;
  isPremiumLocked?: boolean;
  onPremiumClick?: () => void;
  href?: string;
  variant?: "default" | "blue";
}

export function TrainingSetCard({ set, locked = false, isPremiumLocked = false, onPremiumClick, href, variant = "default" }: TrainingSetCardProps) {
  const { t } = useTranslation();
  const isComplete = set.correctCount >= set.targetCount;
  const progress = Math.min(100, Math.round((set.correctCount / set.targetCount) * 100));

  const getProgressBadgeColor = () => {
    // Gradient from red (0%) to green (100%) - pastel shades
    if (progress < 20) return "bg-red-400 hover:bg-red-400";
    if (progress < 40) return "bg-orange-400 hover:bg-orange-400";
    if (progress < 60) return "bg-amber-400 hover:bg-amber-400";
    if (progress < 80) return "bg-lime-400 hover:bg-lime-400";
    return "bg-emerald-400 hover:bg-emerald-400";
  };

  const getBadge = () => {
    if (isPremiumLocked) {
      return <PremiumBadge variant="locked" size="sm" />;
    }
    if (locked) {
      return <Badge variant="outline" className="bg-gray-100 hover:bg-gray-100 text-xs">{t("common.locked")}</Badge>;
    }
    if (isComplete) {
      return <Badge className="bg-emerald-400 hover:bg-emerald-400 text-xs">{t("common.complete")}</Badge>;
    }
    if (set.correctCount > 0) {
      return <Badge className={`${getProgressBadgeColor()} text-xs`}>{progress}%</Badge>;
    }
    return null;
  };

  const isDisabled = locked || isPremiumLocked;

  const cardContent = (
    <Card className={`h-full transition-all ${
      locked
        ? "bg-gray-100 border-gray-200 opacity-60"
        : isPremiumLocked
          ? "bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200 hover:shadow-md hover:border-orange-300 cursor-pointer"
          : `bg-gray-50 hover:shadow-md cursor-pointer ${variant === "blue" ? "hover:border-blue-300" : "hover:border-orange-300"}`
    }`}>
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-sm leading-tight">{set.name}</h3>
            {getBadge()}
          </div>
          <p className="text-xs">
            {locked ? (
              <span className="text-gray-400">{t("common.locked")}</span>
            ) : isPremiumLocked ? (
              <span className="text-orange-600">{t("common.unlockWithPremium")}</span>
            ) : (
              <span className={isComplete ? 'text-green-600' : 'text-gray-500'}>
                {set.correctCount}/{set.targetCount}
              </span>
            )}
          </p>
        </div>
        {!locked && <ChevronRight className={`h-5 w-5 ${isPremiumLocked ? "text-orange-400" : "text-gray-400"}`} />}
      </CardContent>
    </Card>
  );

  if (locked) {
    return cardContent;
  }

  if (isPremiumLocked && onPremiumClick) {
    return (
      <button onClick={onPremiumClick} className="block h-full w-full text-left">
        {cardContent}
      </button>
    );
  }

  return (
    <Link href={href || `/training?set=${set.id}`} className="block h-full">
      {cardContent}
    </Link>
  );
}
