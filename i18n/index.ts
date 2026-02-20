import { en, TranslationKeys } from './en';
import { es } from './es';

export type Language = 'en' | 'es';

const translations: Record<Language, TranslationKeys> = { en, es };

/**
 * Get a nested value from a translation object using a dot-separated key path.
 * e.g., getNestedValue(en, "common.logOut") => "Log Out"
 */
function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  let current: unknown = obj;

  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return path; // Fallback to the key path
    }
    current = (current as Record<string, unknown>)[key];
  }

  if (typeof current === 'string') return current;
  return path; // Fallback
}

/**
 * Create a translation function for a given language.
 */
export function createT(language: Language) {
  const dict = translations[language];
  return function t(key: string): string {
    return getNestedValue(dict as unknown as Record<string, unknown>, key);
  };
}

export { en, es };
export type { TranslationKeys };
