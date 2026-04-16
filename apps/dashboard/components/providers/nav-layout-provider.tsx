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
  defaultNavLayout,
  isNavLayoutId,
  NAV_LAYOUT_STORAGE_KEY,
  type NavLayoutId,
} from "../../lib/nav-layout";

type NavLayoutContextValue = {
  navLayout: NavLayoutId;
  setNavLayout: (layout: NavLayoutId) => void;
};

const NavLayoutContext = createContext<NavLayoutContextValue | null>(null);

function readStoredNavLayout(): NavLayoutId {
  if (typeof window === "undefined") return defaultNavLayout;
  try {
    const raw = window.localStorage.getItem(NAV_LAYOUT_STORAGE_KEY);
    if (raw && isNavLayoutId(raw)) return raw;
  } catch {
    /* ignore */
  }
  return defaultNavLayout;
}

export function NavLayoutProvider({ children }: { children: ReactNode }) {
  const [navLayout, setNavLayoutState] = useState<NavLayoutId>(defaultNavLayout);

  useEffect(() => {
    setNavLayoutState(readStoredNavLayout());
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(NAV_LAYOUT_STORAGE_KEY, navLayout);
    } catch {
      /* ignore */
    }
  }, [navLayout]);

  const setNavLayout = useCallback((next: NavLayoutId) => {
    setNavLayoutState(next);
  }, []);

  const value = useMemo(
    () => ({ navLayout, setNavLayout }),
    [navLayout, setNavLayout],
  );

  return (
    <NavLayoutContext.Provider value={value}>{children}</NavLayoutContext.Provider>
  );
}

export function useNavLayout(): NavLayoutContextValue {
  const ctx = useContext(NavLayoutContext);
  if (!ctx) {
    throw new Error("useNavLayout must be used within NavLayoutProvider");
  }
  return ctx;
}
