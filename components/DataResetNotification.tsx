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

interface DataResetNotificationProps {
  open: boolean;
  onDismiss: () => void;
}

export function DataResetNotification({
  open,
  onDismiss,
}: DataResetNotificationProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onDismiss()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            <DialogTitle>Questions Improved!</DialogTitle>
          </div>
          <DialogDescription className="pt-2">
            We&apos;ve completely rewritten and improved all 2,000+ practice questions.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-3">
          <p className="text-sm text-gray-600">
            The new questions are better balanced, more accurate, and focus on understanding rather than memorization.
          </p>
          <p className="text-sm text-gray-600">
            Your previous progress has been reset so you can start fresh with the improved content.
          </p>
        </div>
        <DialogFooter>
          <Button
            onClick={onDismiss}
            className="w-full bg-black text-white hover:bg-gray-800"
          >
            Got it, let&apos;s go!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
