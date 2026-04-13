import { navItems } from "../components/dashboard/nav-config";

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

  for (const item of navItems) {
    if (item.href === norm) {
      crumbs.push({ label: item.label });
      return crumbs;
    }
    if (item.children) {
      for (const child of item.children) {
        if (child.href === norm) {
          crumbs.push({ label: item.label });
          crumbs.push({ label: child.label });
          return crumbs;
        }
      }
    }
  }

  const staticRoutes: Record<string, { parent?: string; label: string }> = {
    "/settings": { label: "تنظیمات" },
    "/customers": { label: "مشتریان" },
    "/profile": { label: "پروفایل" },
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
