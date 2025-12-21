# Driving Test App - Micro Chunks

## Philosophy
- Each chunk = 1 deployable commit
- Max 15-20 mins work per chunk
- You can see/test progress after each
- Use Claude Code to push each chunk to GitHub

---

## Phase 1: Project Setup (Chunks 1-5)

### Chunk 1.1: Create Next.js Project
**What:** Empty Next.js app with Tailwind
**Commands:**
```bash
npx create-next-app@latest driving-test-app --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
cd driving-test-app
```
**Verify:** `npm run dev` shows Next.js welcome page
**Commit:** "Initial Next.js setup"

---

### Chunk 1.2: Add shadcn/ui
**What:** Install shadcn/ui and first component
**Commands:**
```bash
npx shadcn@latest init
npx shadcn@latest add button card
```
**Verify:** Components folder created
**Commit:** "Add shadcn/ui with button and card"

---

### Chunk 1.3: Add Core shadcn Components
**What:** Install all UI components we'll need
**Commands:**
```bash
npx shadcn@latest add progress badge dialog input select radio-group
```
**Commit:** "Add remaining shadcn components"

---

### Chunk 1.4: Create TypeScript Types
**What:** Define all data types
**Files to create:**
- `types/index.ts` - Question, TestSession, UserProgress types
**Commit:** "Add TypeScript type definitions"

---

### Chunk 1.5: Process CSV â†’ JSON
**What:** Convert CSV data to JSON files
**Files to create:**
- `data/questions.json` - All 2,650 questions
- `data/states.ts` - State name/code mapping
**Commit:** "Add question data as JSON"

---

## Phase 2: Static Pages (Chunks 2.1-2.8)

### Chunk 2.1: Landing Page - Basic Structure
**What:** Simple landing page with hero
**Files:** `app/page.tsx`
**Features:**
- Hero text: "Ace Your Driving Test"
- Subtitle
- Placeholder CTA button
**Commit:** "Add landing page hero"

---

### Chunk 2.2: Landing Page - Features Section
**What:** Add features grid to landing
**Features:**
- 3-4 feature cards (50 states, 2650 questions, etc.)
**Commit:** "Add landing page features section"

---

### Chunk 2.3: Layout + Header
**What:** Create shared layout with header
**Files:**
- `components/Header.tsx`
- Update `app/layout.tsx`
**Commit:** "Add header component and layout"

---

### Chunk 2.4: State Selection Page - Grid
**What:** Page to select your state
**Files:** `app/select-state/page.tsx`
**Features:**
- Grid of 50 state buttons
- No functionality yet, just display
**Commit:** "Add state selection page"

---

### Chunk 2.5: State Selection - Search
**What:** Add search/filter to state grid
**Features:**
- Search input
- Filter states as you type
**Commit:** "Add state search filter"

---

### Chunk 2.6: Dashboard Page - Structure
**What:** Basic dashboard layout
**Files:** `app/dashboard/page.tsx`
**Features:**
- Welcome message
- 4 test cards (placeholder)
- No data, just layout
**Commit:** "Add dashboard page structure"

---

### Chunk 2.7: Dashboard - Test Cards Component
**What:** Create TestCard component
**Files:** `components/TestCard.tsx`
**Features:**
- Test number
- Status (not started/in progress/complete)
- Start/Continue button
**Commit:** "Add TestCard component"

---

### Chunk 2.8: Dashboard - Stats Section
**What:** Add stats display to dashboard
**Files:** `components/StatsCard.tsx`
**Features:**
- Questions answered
- Accuracy %
- Tests completed
**Commit:** "Add dashboard stats section"

---

## Phase 3: Test Taking UI (Chunks 3.1-3.8)

### Chunk 3.1: Test Page - Basic Layout
**What:** Test-taking page structure
**Files:** `app/test/[id]/page.tsx`
**Features:**
- Header with test # and question #
- Progress bar (visual only)
**Commit:** "Add test page layout"

---

### Chunk 3.2: QuestionCard Component
**What:** Display a single question
**Files:** `components/QuestionCard.tsx`
**Features:**
- Question text
- 4 radio options (A, B, C, D)
- No submission logic yet
**Commit:** "Add QuestionCard component"

---

### Chunk 3.3: Test Navigation
**What:** Previous/Next buttons
**Features:**
- Previous button
- Next button
- Question counter "15 of 50"
**Commit:** "Add test navigation buttons"

---

### Chunk 3.4: Test Page - Wire Up Questions
**What:** Load real questions into test
**Features:**
- Load questions from JSON
- Navigate between questions
- Store answers in state (not persisted)
**Commit:** "Wire up questions to test page"

---

### Chunk 3.5: Test Completion Detection
**What:** Know when test is done
**Features:**
- Track answered questions
- Show "Submit Test" when all answered
**Commit:** "Add test completion logic"

---

### Chunk 3.6: Results Page - Basic
**What:** Show test results
**Files:** `app/test/[id]/results/page.tsx`
**Features:**
- Score display (X/50)
- Pass/fail indicator (70% = pass)
**Commit:** "Add basic results page"

---

### Chunk 3.7: Results Page - Question Review
**What:** Show all questions with answers
**Features:**
- List of all 50 questions
- Show user's answer vs correct answer
- Green/red indicator
**Commit:** "Add question review to results"

---

### Chunk 3.8: Results Page - Explanations
**What:** Show explanations for each question
**Features:**
- Expandable explanation per question
- Highlight correct answer
**Commit:** "Add explanations to results"

---

## Phase 4: Local Persistence (Chunks 4.1-4.5)

### Chunk 4.1: Add Zustand Store
**What:** State management setup
**Files:**
- `store/useStore.ts`
**Commands:**
```bash
npm install zustand
```
**Commit:** "Add Zustand store setup"

---

### Chunk 4.2: Persist Selected State
**What:** Remember chosen state
**Features:**
- Save selected state to Zustand
- Persist to localStorage
- Load on app start
**Commit:** "Persist selected state"

---

### Chunk 4.3: Persist Test Answers
**What:** Save answers during test
**Features:**
- Save each answer to store
- Recover if page refreshes
**Commit:** "Persist test answers"

---

### Chunk 4.4: Persist Completed Tests
**What:** Track test history
**Features:**
- Save completed test results
- Show completion status on dashboard
**Commit:** "Persist completed tests"

---

### Chunk 4.5: Calculate & Display Progress
**What:** Real stats on dashboard
**Features:**
- Calculate accuracy from history
- Show actual completion status
- Category breakdown (basic)
**Commit:** "Add real progress stats"

---

## Phase 5: Review Mode (Chunks 5.1-5.4)

### Chunk 5.1: Review Page - Basic
**What:** Review page structure
**Files:** `app/review/page.tsx`
**Features:**
- List of past questions
- Show correct/incorrect
**Commit:** "Add basic review page"

---

### Chunk 5.2: Review Filters - Incorrect Only
**What:** Filter to wrong answers
**Features:**
- Toggle: Show incorrect only
**Commit:** "Add incorrect filter to review"

---

### Chunk 5.3: Review Filters - By Category
**What:** Filter by category
**Features:**
- Dropdown: Select category
- Filter question list
**Commit:** "Add category filter to review"

---

### Chunk 5.4: Review - Study Mode
**What:** Practice incorrect questions
**Features:**
- Re-answer mode
- Show explanation after answering
**Commit:** "Add study mode to review"

---

## Phase 6: Supabase Backend (Chunks 6.1-6.6)

### Chunk 6.1: Supabase Setup
**What:** Configure Supabase client
**Your action:** Create Supabase project, get keys
**Files:**
- `lib/supabase.ts`
- `.env.local`
**Commands:**
```bash
npm install @supabase/supabase-js
```
**Commit:** "Add Supabase client setup"

---

### Chunk 6.2: Database Schema
**What:** Create tables
**Your action:** Run SQL in Supabase dashboard
**Files:** `supabase/schema.sql`
**Commit:** "Add database schema file"

---

### Chunk 6.3: Seed Questions
**What:** Import questions to database
**Files:** `scripts/seed-questions.ts`
**Commit:** "Add question seed script"

---

### Chunk 6.4: Auth - Google Setup
**What:** Configure Google OAuth
**Your action:** 
1. Enable Google in Supabase
2. Create Google Cloud OAuth credentials
**Commit:** "Configure Google OAuth"

---

### Chunk 6.5: Auth UI Components
**What:** Sign in/out buttons
**Files:**
- `components/AuthButton.tsx`
- `app/auth/callback/route.ts`
**Commit:** "Add auth UI components"

---

### Chunk 6.6: Protected Routes
**What:** Require auth for dashboard/tests
**Files:** `middleware.ts`
**Commit:** "Add route protection"

---

## Phase 7: Sync to Database (Chunks 7.1-7.4)

### Chunk 7.1: Save Test Results to DB
**What:** Write results to Supabase
**Features:**
- Create test_session on complete
- Save all answers
**Commit:** "Save test results to database"

---

### Chunk 7.2: Load Progress from DB
**What:** Read history from Supabase
**Features:**
- Load user's past tests
- Calculate stats from DB
**Commit:** "Load progress from database"

---

### Chunk 7.3: Sync Selected State
**What:** Save state preference to profile
**Commit:** "Sync selected state to profile"

---

### Chunk 7.4: Remove localStorage Fallback
**What:** Clean up, use DB only
**Commit:** "Remove localStorage, use DB"

---

## Phase 8: Polish (Chunks 8.1-8.6)

### Chunk 8.1: Dark Mode Toggle
**What:** Add theme switcher
**Commit:** "Add dark mode support"

---

### Chunk 8.2: Loading States
**What:** Skeleton loaders
**Commit:** "Add loading skeletons"

---

### Chunk 8.3: Error States
**What:** Graceful error handling
**Commit:** "Add error handling UI"

---

### Chunk 8.4: Confetti on Pass
**What:** Celebration animation
**Commands:**
```bash
npm install canvas-confetti
```
**Commit:** "Add confetti on test pass"

---

### Chunk 8.5: Mobile Polish
**What:** Touch improvements
**Commit:** "Improve mobile experience"

---

### Chunk 8.6: Profile Page
**What:** User settings page
**Files:** `app/profile/page.tsx`
**Commit:** "Add profile page"

---

## Phase 9: Deploy (Chunks 9.1-9.2)

### Chunk 9.1: Vercel Setup
**What:** Deploy to Vercel
**Your action:**
1. Push to GitHub
2. Import to Vercel
3. Add env vars
**Commit:** "Add Vercel config"

---

### Chunk 9.2: Production Checklist
**What:** Final checks
- [ ] All env vars set
- [ ] Database accessible
- [ ] Auth working
- [ ] Test full flow
**Commit:** "Production ready"

---

## Summary

| Phase | Chunks | Description |
|-------|--------|-------------|
| 1 | 5 | Project setup |
| 2 | 8 | Static pages |
| 3 | 8 | Test taking UI |
| 4 | 5 | Local persistence |
| 5 | 4 | Review mode |
| 6 | 6 | Supabase backend |
| 7 | 4 | DB sync |
| 8 | 6 | Polish |
| 9 | 2 | Deploy |

**Total: 48 micro-chunks**

---

## Claude Code Workflow

For each chunk:

```bash
# 1. Claude Code generates the files

# 2. Test locally
npm run dev

# 3. Commit
git add .
git commit -m "Chunk X.X: Description"

# 4. Push
git push origin main
```

---

## Checkpoints

After these chunks, you have a testable milestone:

| After Chunk | Milestone |
|-------------|-----------|
| 2.8 | Can view all static pages |
| 3.8 | Can take a test (not saved) |
| 4.5 | Full local app works |
| 6.6 | Auth works |
| 7.4 | Full app with database |
| 8.6 | Polished app |
| 9.2 | Live on internet |

---

## Ready?

Start with **Chunk 1.1: Create Next.js Project**

Just tell me "Start chunk 1.1" and I'll give you the exact commands/files.
