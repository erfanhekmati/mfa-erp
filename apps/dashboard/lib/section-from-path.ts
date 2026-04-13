/**
 * بخش رنگی برای تم پیش‌فرض — باید با اسکریپت اولیه در app/layout.tsx هم‌خوان بماند.
 */
export const sectionIds = [
  "overview",
  "sales",
  "inventory",
  "reports",
  "base-info",
  "settings",
] as const;

export type SectionId = (typeof sectionIds)[number];

function normalizePath(p: string) {
  if (!p) return "/";
  return p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
}

/**
 * مسیر فعلی را به بخش ناوبری نگاشت می‌کند (برای رنگ primary/accent در تم پیش‌فرض).
 */
export function getSectionFromPathname(pathname: string | null): SectionId {
  const p = normalizePath(pathname ?? "/");

  if (p.startsWith("/settings") || p.startsWith("/profile")) {
    return "settings";
  }
  if (p.startsWith("/sales")) {
    return "sales";
  }
  if (p.startsWith("/inventory")) {
    return "inventory";
  }
  if (p.startsWith("/customers")) {
    return "base-info";
  }
  if (p.startsWith("/reports")) {
    return "reports";
  }
  if (p === "/") {
    return "overview";
  }

  return "overview";
}
