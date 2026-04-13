"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  defaultThemeId,
  isThemeId,
  THEME_STORAGE_KEY,
  type ThemeId,
} from "../../lib/themes";

type ThemeContextValue = {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredTheme(): ThemeId {
  if (typeof window === "undefined") return defaultThemeId;
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (raw && isThemeId(raw)) return raw;
  } catch {
    /* ignore */
  }
  return defaultThemeId;
}

function applyThemeToDocument(theme: ThemeId) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = theme;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(defaultThemeId);

  useEffect(() => {
    setThemeState(readStoredTheme());
  }, []);

  useEffect(() => {
    applyThemeToDocument(theme);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const setTheme = useCallback((next: ThemeId) => {
    setThemeState(next);
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme }),
    [theme, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
