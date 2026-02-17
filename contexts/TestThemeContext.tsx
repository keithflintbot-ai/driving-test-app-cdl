"use client";

import { createContext, useContext, ReactNode } from "react";

export interface TestTheme {
  id: string;
  name: string;
  slug: string;
  // Colors (Tailwind class fragments, no prefix)
  primary: string;       // "orange" | "blue" | "green" etc.
  accent: string;        // for gradients
  // Header
  headerTitle: string;
  logoHome: string;
  logoIcon: string | null;  // path to image, or null to use iconComponent
  iconComponent?: string;   // lucide icon name hint (handled in Header)
  // Test config
  testsPerSet: number;
  totalTests: number;
  totalTrainingSets: number;
  questionsPerTest: number;
  passPercentage: number;
  // Route base
  routeBase: string;     // "/cdl" | "" (empty for DMV)
  dashboardPath: string;
  landingPath: string;
}

export const themes: Record<string, TestTheme> = {
  dmv: {
    id: "dmv",
    name: "TigerTest",
    slug: "dmv",
    primary: "orange",
    accent: "amber",
    headerTitle: "tigertest.io",
    logoHome: "/dashboard",
    logoIcon: "/tiger.png",
    testsPerSet: 50,
    totalTests: 4,
    totalTrainingSets: 4,
    questionsPerTest: 50,
    passPercentage: 70,
    routeBase: "",
    dashboardPath: "/dashboard",
    landingPath: "/",
  },
  cdl: {
    id: "cdl",
    name: "CDL Practice Test",
    slug: "cdl",
    primary: "blue",
    accent: "indigo",
    headerTitle: "CDL Practice Test",
    logoHome: "/cdl-practice-test",
    logoIcon: null,
    testsPerSet: 50,
    totalTests: 12,
    totalTrainingSets: 12,
    questionsPerTest: 50,
    passPercentage: 80,
    routeBase: "/cdl",
    dashboardPath: "/cdl/dashboard",
    landingPath: "/cdl-practice-test",
  },
};

const TestThemeContext = createContext<TestTheme>(themes.dmv);

export function TestThemeProvider({ theme, children }: { theme: string; children: ReactNode }) {
  const t = themes[theme] || themes.dmv;
  return <TestThemeContext.Provider value={t}>{children}</TestThemeContext.Provider>;
}

export function useTestTheme() {
  return useContext(TestThemeContext);
}

// Pre-computed class maps so Tailwind can find them at build time
// Add new colors here when adding new test types
const classMap: Record<string, Record<string, string>> = {
  orange: {
    hoverBorder: "hover:border-orange-300",
    activeBorder: "border-orange-500",
    bgLight: "bg-orange-50",
    bgSolid: "bg-orange-600",
    bgGradient: "from-orange-50 to-amber-50",
    textPrimary: "text-orange-600",
    textDark: "text-orange-700",
    textLight: "text-orange-400",
    progressBar: "[&>div]:bg-orange-600",
    hoverBg: "hover:bg-orange-50",
  },
  blue: {
    hoverBorder: "hover:border-blue-300",
    activeBorder: "border-blue-500",
    bgLight: "bg-blue-50",
    bgSolid: "bg-blue-600",
    bgGradient: "from-blue-50 to-indigo-50",
    textPrimary: "text-blue-600",
    textDark: "text-blue-700",
    textLight: "text-blue-400",
    progressBar: "[&>div]:bg-blue-600",
    hoverBg: "hover:bg-blue-50",
  },
  green: {
    hoverBorder: "hover:border-green-300",
    activeBorder: "border-green-500",
    bgLight: "bg-green-50",
    bgSolid: "bg-green-600",
    bgGradient: "from-green-50 to-emerald-50",
    textPrimary: "text-green-600",
    textDark: "text-green-700",
    textLight: "text-green-400",
    progressBar: "[&>div]:bg-green-600",
    hoverBg: "hover:bg-green-50",
  },
};

// Utility: get Tailwind classes for common patterns
export function themeClasses(theme: TestTheme) {
  return classMap[theme.primary] || classMap.orange;
}
