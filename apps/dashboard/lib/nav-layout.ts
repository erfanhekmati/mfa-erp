export const NAV_LAYOUT_STORAGE_KEY = "erp-nav-layout";

export type NavLayoutId = "sidebar" | "topbar";

export const defaultNavLayout: NavLayoutId = "sidebar";

export function isNavLayoutId(value: string | null | undefined): value is NavLayoutId {
  return value === "sidebar" || value === "topbar";
}
