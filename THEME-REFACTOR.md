# Theme Refactor Plan

## Architecture
- CSS custom properties in globals.css define semantic tokens
- `data-theme` attribute on wrapper div switches themes
- Tailwind config maps semantic names to CSS vars
- Components use semantic classes (`bg-brand`, `text-brand`) never raw colors
- Route-based ThemeProvider sets `data-theme` based on pathname

## CSS Variables (globals.css)

```css
:root {
  /* Brand colors - DMV orange is default */
  --brand: 24 95% 53%;
  --brand-light: 33 100% 96%;
  --brand-hover: 24 95% 45%;
  --brand-dark: 24 90% 40%;
  --brand-muted: 24 90% 75%;
  --brand-border: 24 80% 80%;
  --brand-gradient-from: 33 100% 96%;
  --brand-gradient-to: 45 100% 96%;
  --brand-text-on-light: 24 80% 25%;
  --brand-text-secondary: 24 80% 30%;
}

[data-theme="cdl"] {
  --brand: 217 91% 60%;
  --brand-light: 214 100% 97%;
  --brand-hover: 217 91% 50%;
  --brand-dark: 217 91% 40%;
  --brand-muted: 217 80% 75%;
  --brand-border: 214 80% 80%;
  --brand-gradient-from: 214 100% 97%;
  --brand-gradient-to: 226 100% 97%;
  --brand-text-on-light: 217 80% 25%;
  --brand-text-secondary: 217 80% 30%;
}
```

## Tailwind Config additions

```ts
brand: {
  DEFAULT: "hsl(var(--brand))",
  light: "hsl(var(--brand-light))",
  hover: "hsl(var(--brand-hover))",
  dark: "hsl(var(--brand-dark))",
  muted: "hsl(var(--brand-muted))",
  border: "hsl(var(--brand-border))",
},
```

## Mapping: old classes -> new classes

- `bg-orange-600` / `bg-blue-600` -> `bg-brand`
- `bg-orange-50` / `bg-blue-50` -> `bg-brand-light`
- `hover:bg-orange-50` / `hover:bg-blue-50` -> `hover:bg-brand-light`
- `text-orange-600` / `text-blue-600` -> `text-brand`
- `text-orange-700` / `text-blue-700` -> `text-brand-dark`
- `text-orange-400` / `text-blue-400` -> `text-brand-muted`
- `hover:text-orange-600` -> `hover:text-brand`
- `hover:text-orange-700` -> `hover:text-brand-dark`
- `border-orange-300` / `border-blue-300` -> `border-brand-border`
- `border-orange-500` / `border-blue-500` -> `border-brand`
- `border-orange-200` / `border-blue-200` -> `border-brand-border`
- `hover:border-orange-300` / `hover:border-blue-300` -> `hover:border-brand-border`
- `from-orange-50` / `from-blue-50` -> `from-brand-light`
- `to-amber-50` / `to-indigo-50` -> `to-brand-light` (or separate gradient-to var)
- `[&>div]:bg-orange-600` -> `[&>div]:bg-brand`
- `text-orange-900` / `text-blue-900` -> `text-brand-dark` (or a deeper var)
- `text-orange-800` / `text-blue-800` -> `text-brand-dark`

## Files to update

### Infrastructure (do first)
1. `app/globals.css` - add CSS variables
2. `tailwind.config.ts` - add brand colors, remove safelist
3. `contexts/TestThemeContext.tsx` - gut it, replace with CSS-var provider
4. `components/HeaderSwitch.tsx` - simplify
5. `app/layout.tsx` - wrap with new provider

### Shared components
6. `components/TestCard.tsx`
7. `components/TrainingSetCard.tsx`
8. `components/QuestionCard.tsx`
9. `components/TrainingCard.tsx`
10. `components/Footer.tsx`
11. `components/CDLHeader.tsx`
12. `components/Header.tsx`
13. `components/PaywallModal.tsx`
14. `components/PremiumBadge.tsx`
15. `components/MasteryProgress.tsx`
16. `components/StatsCard.tsx`

### DMV pages (orange -> brand)
17. `app/page.tsx` (homepage)
18. `app/dashboard/page.tsx`
19. `app/test/[id]/page.tsx`
20. `app/test/[id]/results/page.tsx`
21. `app/training/page.tsx`
22. `app/stats/page.tsx`
23. `app/[slug]/page.tsx` (state pages)
24. `app/es/[slug]/page.tsx`
25. `app/onboarding/select-state/page.tsx`
26. `app/login/page.tsx`
27. `app/signup/page.tsx`

### CDL pages (blue -> brand)
28. `app/cdl-practice-test/page.tsx`
29. `app/cdl/dashboard/page.tsx`
30. `app/cdl/test/[id]/page.tsx`
31. `app/cdl/test/[id]/results/page.tsx`
32. `app/cdl/training/page.tsx`

## What gets deleted
- `themeClasses()` function and `classMap` object
- `useTestTheme()` calls in components that only used it for colors
- Entire safelist in tailwind.config.ts
- `isBlue` checks in QuestionCard, TrainingCard
- `isCDL` color checks in Footer
- `tc.hoverBorder`, `tc.bgSolid` etc pattern
