import { createContext, use, useEffect, useMemo, useState, type ReactNode } from 'react';

export const LOCALES = ['es', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

/** A feature's copy: one dictionary per locale with identical shape. */
export type Dictionary<T> = Record<Locale, T>;

type LocaleContextValue = { locale: Locale; setLocale: (locale: Locale) => void };

const LocaleContext = createContext<LocaleContextValue | null>(null);
const STORAGE_KEY = 'tn:locale';

function readStoredLocale(fallback: Locale): Locale {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return LOCALES.includes(stored as Locale) ? (stored as Locale) : fallback;
  } catch {
    return fallback;
  }
}

export function LocaleProvider({ children, defaultLocale = 'es' }: { children: ReactNode; defaultLocale?: Locale }) {
  const [locale, setLocale] = useState<Locale>(() => readStoredLocale(defaultLocale));

  useEffect(() => {
    document.documentElement.lang = locale;
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* storage unavailable (private mode) — the choice just won't persist */
    }
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale }), [locale]);
  return <LocaleContext value={value}>{children}</LocaleContext>;
}

export function useLocale(): LocaleContextValue {
  const ctx = use(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used inside <LocaleProvider>');
  return ctx;
}

/** Picks the active locale's entry from a feature dictionary. */
export function useCopy<T>(dictionary: Dictionary<T>): T {
  return dictionary[useLocale().locale];
}
