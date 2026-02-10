"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lock, Sparkles, CheckCircle } from "lucide-react";

interface PaywallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feature: "training_set_4" | "practice_test_4" | "full_stats";
  onUpgrade: () => Promise<void>;
  isGuest?: boolean;
  onSignUp?: () => void;
}

const FEATURE_NAMES = {
  training_set_4: "Training Set 4: State Laws",
  practice_test_4: "Practice Test 4",
  full_stats: "Full Question Stats",
};

const BENEFITS = [
  "50 state-specific law questions",
  "Detailed question-by-question stats",
  "Master your state's unique driving rules",
  "Boost your pass probability",
  "Lifetime access - pay once, own forever",
];

export function PaywallModal({
  open,
  onOpenChange,
  feature,
  onUpgrade,
  isGuest = false,
  onSignUp,
}: PaywallModalProps) {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      await onUpgrade();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-orange-100 rounded-full">
              <Lock className="h-5 w-5 text-orange-600" />
            </div>
            <DialogTitle className="text-xl">Unlock Premium Content</DialogTitle>
          </div>
          <DialogDescription className="pt-2 text-base">
            Get access to <strong>{FEATURE_NAMES[feature]}</strong> and complete your DMV prep.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-orange-500" />
              <span className="font-semibold text-gray-900">TigerTest Premium</span>
            </div>
            <ul className="space-y-2">
              {BENEFITS.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">$9.99</div>
            <div className="text-sm text-gray-500">One-time payment</div>
          </div>
        </div>

        {isGuest ? (
          <DialogFooter className="flex flex-col gap-2 sm:flex-col">
            <p className="text-sm text-gray-600 text-center mb-2">
              Create a free account to unlock premium features
            </p>
            <Button
              onClick={onSignUp}
              className="w-full bg-black text-white hover:bg-gray-800"
            >
              Create Account
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full"
            >
              Maybe Later
            </Button>
          </DialogFooter>
        ) : (
          <DialogFooter className="flex flex-col gap-2 sm:flex-col">
            <Button
              onClick={handleUpgrade}
              disabled={loading}
              className="w-full bg-black text-white hover:bg-gray-800"
            >
              {loading ? "Loading..." : "Upgrade Now"}
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full"
              disabled={loading}
            >
              Maybe Later
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
