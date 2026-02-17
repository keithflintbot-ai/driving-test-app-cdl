import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./contexts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Theme system classes - must be safelisted because they're in object literals
    "hover:border-orange-300", "hover:border-blue-300", "hover:border-green-300",
    "border-orange-500", "border-blue-500", "border-green-500",
    "bg-orange-50", "bg-blue-50", "bg-green-50",
    "bg-orange-600", "bg-blue-600", "bg-green-600",
    "from-orange-50", "from-blue-50", "from-green-50",
    "to-amber-50", "to-indigo-50", "to-emerald-50",
    "text-orange-600", "text-blue-600", "text-green-600",
    "text-orange-700", "text-blue-700", "text-green-700",
    "text-orange-400", "text-blue-400", "text-green-400",
    "[&>div]:bg-orange-600", "[&>div]:bg-blue-600", "[&>div]:bg-green-600",
    "hover:bg-orange-50", "hover:bg-blue-50", "hover:bg-green-50",
    // QuestionCard theme classes
    "[@media(hover:hover)]:hover:border-blue-500", "[@media(hover:hover)]:hover:bg-blue-50",
    "active:border-blue-500", "active:bg-blue-50",
    "bg-blue-50", "border-blue-200", "text-blue-900", "text-blue-800",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
} satisfies Config;
