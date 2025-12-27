"use client";

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

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <DataResetNotificationWrapper />
    </AuthProvider>
  );
}
