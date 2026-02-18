import { Question } from "@/types";
import cdlQuestionsData from "@/data/cdl-questions.json";

// Import helper functions from testGenerator
import { shuffleQuestionOptions } from "./testGenerator";

// Helper to shuffle array (duplicated from testGenerator for independence)
function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get all CDL questions data
export function getCDLQuestionsData(): Question[] {
  return cdlQuestionsData as Question[];
}

// Generate a CDL test (12 tests available, 50 questions each)
// Each test has a FIXED set of questions, but the order is randomized on each attempt
export function generateCDLTest(testNumber: number): Question[] {
  if (testNumber < 1 || testNumber > 12) {
    throw new Error("Test number must be between 1 and 12");
  }

  const allQuestions = getCDLQuestionsData();

  // Sort by questionId for deterministic assignment to tests
  const sortedQuestions = allQuestions
    .slice() // Don't mutate original array
    .sort((a, b) => a.questionId.localeCompare(b.questionId));

  // CDL has 12 tests, 50 questions each
  const QUESTIONS_PER_TEST = 50;

  // Calculate start index for fixed question assignment per test
  // Test 1 gets 0-49, Test 2 gets 50-99, etc.
  const startIndex = (testNumber - 1) * QUESTIONS_PER_TEST;

  // Get fixed slice for this test (always the same questions)
  const testQuestions = sortedQuestions.slice(
    startIndex,
    startIndex + QUESTIONS_PER_TEST
  );

  // Shuffle the order for this attempt (questions are fixed, order is random)
  return shuffle(testQuestions);
}

// Get the fixed 50 questions for a CDL training set
// Training set N has the same questions as Test N, in a fixed order
export function getCDLTrainingSetQuestions(setNumber: number): Question[] {
  if (setNumber < 1 || setNumber > 12) {
    throw new Error("Set number must be between 1 and 12");
  }

  const allQuestions = getCDLQuestionsData();

  // Sort by questionId for deterministic assignment to sets
  const sortedQuestions = allQuestions
    .slice() // Don't mutate original array
    .sort((a, b) => a.questionId.localeCompare(b.questionId));

  const QUESTIONS_PER_SET = 50;

  // Calculate start index for fixed question assignment per set
  const startIndex = (setNumber - 1) * QUESTIONS_PER_SET;

  // Get fixed slice for this set (always the same questions)
  const setQuestions = sortedQuestions.slice(
    startIndex,
    startIndex + QUESTIONS_PER_SET
  );

  // Return in fixed order (not shuffled) for consistent training experience
  return setQuestions;
}

// Get the next unanswered question from a CDL training set
// Same logic as DMV version but for CDL questions
export function getNextCDLTrainingSetQuestion(
  setNumber: number,
  masteredIds: string[],
  wrongQueue: string[] = [],
  currentQuestionId: string | null = null
): Question | null {
  const questions = getCDLTrainingSetQuestions(setNumber);

  // Find questions not yet mastered
  let unmasteredQuestions = questions.filter(q => !masteredIds.includes(q.questionId));

  if (unmasteredQuestions.length === 0) {
    return null;
  }

  // Explicitly exclude the current question to prevent immediate repeats
  // (unless it's the only one left)
  if (currentQuestionId && unmasteredQuestions.length > 1) {
    unmasteredQuestions = unmasteredQuestions.filter(q => q.questionId !== currentQuestionId);
  }

  // First priority: unmastered questions NOT in the wrong queue
  const freshQuestions = unmasteredQuestions.filter(q => !wrongQueue.includes(q.questionId));
  if (freshQuestions.length > 0) {
    return freshQuestions[0];
  }

  // All remaining questions are in the wrong queue - take the first one (oldest wrong answer)
  // Find the first question from wrongQueue that's still unmastered
  for (const qId of wrongQueue) {
    const question = unmasteredQuestions.find(q => q.questionId === qId);
    if (question) {
      return question;
    }
  }

  // Fallback (shouldn't happen)
  return unmasteredQuestions[0];
}

// Get random CDL question for training mode with mastery system
// Questions answered correctly are excluded until all questions are mastered
// lastQuestionId is excluded to prevent immediate repeats (unless it's the only option)
export function getCDLTrainingQuestion(
  masteredQuestionIds: string[] = [],
  lastQuestionId: string | null = null
): Question | null {
  const allQuestions = getCDLQuestionsData();

  // Filter out mastered questions
  let availableQuestions = allQuestions.filter(
    (q) => !masteredQuestionIds.includes(q.questionId)
  );

  if (availableQuestions.length === 0) {
    return null; // All questions mastered - caller should reset mastered list
  }

  // Try to avoid the last question (prevent immediate repeats)
  if (lastQuestionId && availableQuestions.length > 1) {
    availableQuestions = availableQuestions.filter(
      (q) => q.questionId !== lastQuestionId
    );
  }

  // Return a random question
  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  return availableQuestions[randomIndex];
}

// Export the shuffle and shuffleQuestionOptions functions for consistency
export { shuffle, shuffleQuestionOptions };