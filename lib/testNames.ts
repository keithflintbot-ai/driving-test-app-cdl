export const TEST_NAMES: Record<number, string> = {
  1: "Road Signs",
  2: "Traffic Laws",
  3: "Defensive Driving",
  4: "Tricky Situations",
};

export function getTestName(testNumber: number): string {
  return TEST_NAMES[testNumber] || `Test ${testNumber}`;
}
