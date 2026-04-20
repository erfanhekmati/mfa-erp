import type { NavItem } from "../components/dashboard/nav-config";
import { isActivePathOrUnder, normalizePath } from "./nav-active";

export type NavBreadcrumbItem = { label: string; href?: string };

/** Any descendant route matches the current pathname (longest-prefix leaf wins for overlap). */
export function isNavSubtreeActive(pathname: string, item: NavItem): boolean {
  if (item.href && isActivePathOrUnder(pathname, item.href)) return true;
  return item.children?.some((c) => isNavSubtreeActive(pathname, c)) ?? false;
}

type LeafPath = { href: string; groupIds: string[] };

function collectLeaves(
  items: NavItem[],
  groupStack: string[] = [],
): LeafPath[] {
  const out: LeafPath[] = [];
  for (const item of items) {
    if (item.children?.length) {
      out.push(...collectLeaves(item.children, [...groupStack, item.id]));
    } else if (item.href) {
      out.push({ href: item.href, groupIds: groupStack });
    }
  }
  return out;
}

/** Top-level sidebar sections only (ردهٔ دوم با هاور باز می‌شود، نه با expanded). */
export function getExpandedNavGroupIds(
  pathname: string,
  items: NavItem[],
): Record<string, boolean> {
  const topLevelGroupIds = new Set(
    items.filter((i) => i.children?.length).map((i) => i.id),
  );
  const leaves = collectLeaves(items);
  const matches = leaves.filter((l) => isActivePathOrUnder(pathname, l.href));
  matches.sort(
    (a, b) => normalizePath(b.href).length - normalizePath(a.href).length,
  );
  const best = matches[0];
  if (!best) return {};
  const next: Record<string, boolean> = {};
  for (const id of best.groupIds) {
    if (topLevelGroupIds.has(id)) next[id] = true;
  }
  return next;
}

/** برای آکاردئون موبایل: همهٔ گروه‌های مسیر تا برگ (شامل ردهٔ سوم). */
export function getExpandedNavGroupIdsMobile(
  pathname: string,
  items: NavItem[],
): Record<string, boolean> {
  const leaves = collectLeaves(items);
  const matches = leaves.filter((l) => isActivePathOrUnder(pathname, l.href));
  matches.sort(
    (a, b) => normalizePath(b.href).length - normalizePath(a.href).length,
  );
  const best = matches[0];
  if (!best) return {};
  const next: Record<string, boolean> = {};
  for (const id of best.groupIds) next[id] = true;
  return next;
}

export function findBreadcrumbChain(
  norm: string,
  items: NavItem[],
  prefix: NavBreadcrumbItem[] = [],
): NavBreadcrumbItem[] | null {
  for (const item of items) {
    if (item.href === norm) {
      return [...prefix, { label: item.label }];
    }
    if (item.children?.length) {
      const found = findBreadcrumbChain(norm, item.children, [
        ...prefix,
        { label: item.label },
      ]);
      if (found) return found;
    }
  }
  return null;
}
