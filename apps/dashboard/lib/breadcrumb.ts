import { navItems } from "../components/dashboard/nav-config";
import { findBreadcrumbChain } from "./nav-tree";

export type BreadcrumbItem = {
  label: string;
  /** Omit on the current (last) segment */
  href?: string;
};

function normalizePath(pathname: string) {
  if (pathname === "" || pathname === "/") return "/";
  return pathname.endsWith("/") && pathname.length > 1
    ? pathname.slice(0, -1)
    : pathname;
}

export function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const norm = normalizePath(pathname);

  if (norm === "/") {
    return [{ label: "نمای کلی" }];
  }

  const crumbs: BreadcrumbItem[] = [{ label: "نمای کلی", href: "/" }];

  const fromNav = findBreadcrumbChain(norm, navItems);
  if (fromNav) {
    return [...crumbs, ...fromNav];
  }

  const staticRoutes: Record<string, { parent?: string; label: string }> = {
    "/settings": { label: "تنظیمات" },
    "/customers": { label: "طرف‌های حساب" },
    "/profile": { label: "تکمیل پروفایل" },
    "/reports": { label: "گزارش‌ها" },
  };

  if (staticRoutes[norm]) {
    const route = staticRoutes[norm];
    if (route.parent) crumbs.push({ label: route.parent });
    crumbs.push({ label: route.label });
    return crumbs;
  }

  return [...crumbs, { label: "صفحه" }];
}

/** Current page title (last breadcrumb segment). */
export function getPageTitle(pathname: string): string {
  const crumbs = getBreadcrumbs(pathname);
  return crumbs.at(-1)?.label ?? "صفحه";
}
