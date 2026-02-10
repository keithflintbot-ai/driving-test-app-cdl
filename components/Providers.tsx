"use client";

import { useEffect } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { DataResetNotification } from "@/components/DataResetNotification";
import { useStore } from "@/store/useStore";

function DataResetNotificationWrapper() {
  const showDataResetNotification = useStore((state) => state.showDataResetNotification);
  const dismissDataResetNotification = useStore((state) => state.dismissDataResetNotification);

  return (
    <DataResetNotification
      open={showDataResetNotification}
      onDismiss={dismissDataResetNotification}
    />
  );
}

function PremiumTheme() {
  const hasPremiumAccess = useStore((state) => state.hasPremiumAccess);
  const isPremium = hasPremiumAccess();

  useEffect(() => {
    if (isPremium) {
      document.body.classList.add("premium-theme");
    } else {
      document.body.classList.remove("premium-theme");
    }
    return () => {
      document.body.classList.remove("premium-theme");
    };
  }, [isPremium]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <DataResetNotificationWrapper />
      <PremiumTheme />
    </AuthProvider>
  );
}
