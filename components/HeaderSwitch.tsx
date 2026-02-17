"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { CDLHeader } from "@/components/CDLHeader";
import { TestThemeProvider } from "@/contexts/TestThemeContext";

export function HeaderSwitch() {
  const pathname = usePathname();
  const isCDL = pathname?.startsWith("/cdl") || pathname === "/cdl-practice-test";

  if (isCDL) {
    return (
      <TestThemeProvider theme="cdl">
        <CDLHeader />
      </TestThemeProvider>
    );
  }

  return <Header />;
}
