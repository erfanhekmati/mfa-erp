"use client";

import { cn } from "@repo/ui";
import Link from "next/link";
import { isActivePathOrUnder } from "../../lib/nav-active";
import type { NavItem } from "./nav-config";

export function NavFlyoutLinkList({
  items,
  pathname,
  onNavigate,
}: {
  items: NavItem[];
  pathname: string;
  onNavigate?: () => void;
}) {
  const allDirectLeaves = items.every((i) => !i.children?.length);
  if (allDirectLeaves) {
    return (
      <>
        {items.map((item) => {
          const href = item.href ?? "#";
          const active =
            item.href && isActivePathOrUnder(pathname, item.href);
          return (
            <Link
              key={item.id}
              href={href}
              className={cn(
                "block rounded-md px-2.5 py-2 text-sm transition-colors",
                active
                  ? "bg-sidebar-accent font-medium text-foreground"
                  : "text-foreground hover:bg-accent",
              )}
              role="menuitem"
              onClick={() => onNavigate?.()}
            >
              {item.label}
            </Link>
          );
        })}
      </>
    );
  }
  return (
    <>
      {items.map((node) =>
        node.children?.length ? (
          <div key={node.id} className="space-y-0.5">
            <div className="px-2.5 pt-1.5 text-xs font-semibold text-muted-foreground">
              {node.label}
            </div>
            <div className="flex flex-col gap-0.5 pb-1">
              <NavFlyoutLinkList
                items={node.children}
                pathname={pathname}
                onNavigate={onNavigate}
              />
            </div>
          </div>
        ) : null,
      )}
    </>
  );
}
