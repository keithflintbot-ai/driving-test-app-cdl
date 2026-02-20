"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";

interface DataResetNotificationProps {
  open: boolean;
  onDismiss: () => void;
}

export function DataResetNotification({
  open,
  onDismiss,
}: DataResetNotificationProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onDismiss()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            <DialogTitle>{t("dataReset.questionsImproved")}</DialogTitle>
          </div>
          <DialogDescription className="pt-2">
            {t("dataReset.rewrittenQuestions")}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-3">
          <p className="text-sm text-gray-600">
            {t("dataReset.betterBalanced")}
          </p>
          <p className="text-sm text-gray-600">
            {t("dataReset.progressReset")}
          </p>
        </div>
        <DialogFooter>
          <Button
            onClick={onDismiss}
            className="w-full bg-black text-white hover:bg-gray-800"
          >
            {t("dataReset.gotItLetsGo")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
