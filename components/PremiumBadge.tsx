"use client";

import { Lock, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PremiumBadgeProps {
  variant?: "locked" | "premium";
  size?: "sm" | "md";
}

export function PremiumBadge({ variant = "locked", size = "sm" }: PremiumBadgeProps) {
  if (variant === "premium") {
    return (
      <Badge className={`bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-400 hover:to-orange-400 text-white ${size === "sm" ? "text-xs" : "text-sm"}`}>
        <Crown className={`${size === "sm" ? "h-3 w-3" : "h-4 w-4"} mr-1`} />
        Premium
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className={`bg-gray-100 hover:bg-gray-100 border-gray-300 text-gray-600 ${size === "sm" ? "text-xs" : "text-sm"}`}>
      <Lock className={`${size === "sm" ? "h-3 w-3" : "h-4 w-4"} mr-1`} />
      Premium
    </Badge>
  );
}
