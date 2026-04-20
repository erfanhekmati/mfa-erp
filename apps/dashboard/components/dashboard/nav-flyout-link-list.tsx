"use client";

import { cn } from "@repo/ui";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { isActivePathOrUnder } from "../../lib/nav-active";
import { isNavSubtreeActive } from "../../lib/nav-tree";
import type { NavItem } from "./nav-config";

function NavFlyoutLeafLinks({
  items,
  pathname,
  onNavigate,
}: {
  items: NavItem[];
  pathname: string;
  onNavigate?: () => void;
}) {
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

/** زیرمنوی کنار ردیف (هاور / کلیک) — همهٔ لینک‌ها یکجا در یک پنل نیستند. */
function NavFlyoutCascade({
  items,
  pathname,
  onNavigate,
}: {
  items: NavItem[];
  pathname: string;
  onNavigate?: () => void;
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(
    (itemId: string) => {
      clearCloseTimer();
      closeTimerRef.current = setTimeout(() => {
        setOpenId((id) => (id === itemId ? null : id));
      }, 200);
    },
    [clearCloseTimer],
  );

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  return (
    <>
      {items.map((item) => {
        if (!item.children?.length) {
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
        }

        return (
          <div
            key={item.id}
            className="relative"
            onMouseEnter={() => {
              clearCloseTimer();
              setOpenId(item.id);
            }}
            onMouseLeave={() => scheduleClose(item.id)}
          >
            <button
              type="button"
              className={cn(
                "flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-start text-sm transition-colors",
                isNavSubtreeActive(pathname, item)
                  ? "bg-sidebar-accent/80 font-medium text-foreground"
                  : "text-foreground hover:bg-accent",
              )}
              aria-expanded={openId === item.id}
              aria-haspopup="menu"
              onClick={() =>
                setOpenId((id) => (id === item.id ? null : item.id))
              }
            >
              <span className="min-w-0 flex-1">{item.label}</span>
              <span
                className={cn(
                  "shrink-0 text-muted-foreground transition-transform rtl:scale-x-[-1]",
                  openId === item.id && "-rotate-90 rtl:rotate-90",
                )}
                aria-hidden
              >
                ›
              </span>
            </button>
            {openId === item.id ? (
              <div className="absolute right-full top-0 z-[70] mr-1 flex items-stretch">
                <div className="min-w-[11rem] overflow-hidden rounded-lg border border-border bg-background shadow-lg">
                  <div className="border-b border-border bg-muted/50 px-3 py-2">
                    <span className="block text-xs font-semibold leading-snug text-muted-foreground">
                      {item.label}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5 p-1.5">
                    <NavFlyoutLinkList
                      items={item.children}
                      pathname={pathname}
                      onNavigate={onNavigate}
                    />
                  </div>
                </div>
                <div
                  className="w-2 shrink-0 self-stretch min-h-[2.5rem]"
                  aria-hidden
                />
              </div>
            ) : null}
          </div>
        );
      })}
    </>
  );
}

export function NavFlyoutLinkList({
  items,
  pathname,
  onNavigate,
}: {
  items: NavItem[];
  pathname: string;
  onNavigate?: () => void;
}) {
  const hasNestedGroups = items.some((i) => i.children?.length);
  if (!hasNestedGroups) {
    return (
      <NavFlyoutLeafLinks
        items={items}
        pathname={pathname}
        onNavigate={onNavigate}
      />
    );
  }
  return (
    <NavFlyoutCascade
      items={items}
      pathname={pathname}
      onNavigate={onNavigate}
    />
  );
}
