"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  cn,
} from "@repo/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { isActivePathOrUnder, isPathActive } from "../../lib/nav-active";
import { navItems, type NavItem } from "./nav-config";
import { NavIcon } from "./nav-icons";

const NAV_ID = "dashboard-topbar-nav";

type TopBarNavProps = {
  onNavigate?: () => void;
};

function isGroupActive(pathname: string, item: NavItem) {
  if (item.href && isPathActive(pathname, item.href)) return true;
  if (!item.children?.length) return false;
  return item.children.some(
    (c) => c.href && isActivePathOrUnder(pathname, c.href),
  );
}

export function TopBarNav({ onNavigate }: TopBarNavProps) {
  const pathname = usePathname() ?? "/";
  const rootRef = useRef<HTMLElement | null>(null);
  const [flyoutOpen, setFlyoutOpen] = useState<string | null>(null);
  const [flyoutPos, setFlyoutPos] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [mounted, setMounted] = useState(false);
  const closeHoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flyoutMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeFlyout = useCallback(() => setFlyoutOpen(null), []);

  const clearCloseHoverTimer = useCallback(() => {
    if (closeHoverTimerRef.current) {
      clearTimeout(closeHoverTimerRef.current);
      closeHoverTimerRef.current = null;
    }
  }, []);

  useEffect(() => () => clearCloseHoverTimer(), [clearCloseHoverTimer]);

  const updateFlyoutPosition = useCallback(() => {
    if (!flyoutOpen) return;
    const el = document.getElementById(
      `${NAV_ID}-flyout-trigger-${flyoutOpen}`,
    );
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setFlyoutPos({ top: rect.bottom + 6, left: rect.right });
  }, [flyoutOpen]);

  useLayoutEffect(() => {
    if (!flyoutOpen) {
      setFlyoutPos(null);
      return;
    }
    updateFlyoutPosition();
  }, [flyoutOpen, updateFlyoutPosition]);

  useEffect(() => {
    if (!flyoutOpen) return;
    const onMove = () => updateFlyoutPosition();
    window.addEventListener("resize", onMove);
    window.addEventListener("scroll", onMove, { passive: true });
    const main = document.querySelector("main");
    main?.addEventListener("scroll", onMove, { passive: true });
    const header = rootRef.current?.closest("header");
    header?.addEventListener("scroll", onMove, { passive: true });
    const navEl = rootRef.current;
    const ro =
      navEl && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(onMove)
        : null;
    if (navEl && ro) ro.observe(navEl);
    return () => {
      window.removeEventListener("resize", onMove);
      window.removeEventListener("scroll", onMove);
      main?.removeEventListener("scroll", onMove);
      header?.removeEventListener("scroll", onMove);
      ro?.disconnect();
    };
  }, [flyoutOpen, updateFlyoutPosition]);

  useEffect(() => {
    if (!flyoutOpen) return;
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (rootRef.current?.contains(t)) return;
      if (flyoutMenuRef.current?.contains(t)) return;
      closeFlyout();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [flyoutOpen, closeFlyout]);

  const flyoutItem = flyoutOpen
    ? navItems.find((i) => i.id === flyoutOpen)
    : undefined;

  const flyoutPortal =
    mounted &&
    flyoutOpen &&
    flyoutItem?.children?.length &&
    flyoutPos &&
    typeof document !== "undefined"
      ? createPortal(
          <div
            ref={flyoutMenuRef}
            className="fixed z-[60] min-w-[11rem] overflow-hidden rounded-lg border border-border bg-background shadow-lg"
            style={{
              top: flyoutPos.top,
              left: flyoutPos.left,
              transform: "translateX(-100%)",
            }}
            role="menu"
            aria-labelledby={`${NAV_ID}-flyout-heading-${flyoutItem.id}`}
            onMouseEnter={clearCloseHoverTimer}
            onMouseLeave={() => setFlyoutOpen(null)}
          >
            <div
              id={`${NAV_ID}-flyout-heading-${flyoutItem.id}`}
              className="border-b border-border bg-muted/50 px-3 py-2"
              role="presentation"
            >
              <span className="block text-xs font-semibold leading-snug text-muted-foreground">
                {flyoutItem.label}
              </span>
            </div>
            <div className="flex flex-col gap-0.5 p-1.5">
              {flyoutItem.children.map((child) => {
                const href = child.href ?? "#";
                const active =
                  child.href && isActivePathOrUnder(pathname, child.href);
                return (
                  <Link
                    key={child.id}
                    href={href}
                    className={cn(
                      "block rounded-md px-2.5 py-2 text-sm transition-colors",
                      active
                        ? "bg-sidebar-accent font-medium text-foreground"
                        : "text-foreground hover:bg-accent",
                    )}
                    role="menuitem"
                    onClick={() => {
                      closeFlyout();
                      onNavigate?.();
                    }}
                  >
                    {child.label}
                  </Link>
                );
              })}
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <TooltipProvider delayDuration={400} disableHoverableContent>
      <nav
        ref={rootRef}
        className="flex max-w-[min(100%,28rem)] shrink-0 items-center gap-0.5 overflow-x-auto ps-1"
        aria-label="اصلی"
      >
        <ul className="flex items-center gap-0.5">
          {navItems.map((item) => (
            <li key={item.id}>
              {item.children?.length ? (
                <div
                  id={`${NAV_ID}-flyout-trigger-${item.id}`}
                  className="relative"
                  onMouseEnter={() => {
                    clearCloseHoverTimer();
                    setFlyoutOpen(item.id);
                  }}
                  onMouseLeave={() => {
                    clearCloseHoverTimer();
                    closeHoverTimerRef.current = setTimeout(() => {
                      setFlyoutOpen((open) => (open === item.id ? null : open));
                    }, 200);
                  }}
                >
                  <button
                    type="button"
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-lg border border-transparent text-brandBar-foreground transition-colors hover:bg-brandBar-foreground/15",
                      isGroupActive(pathname, item) &&
                        "border-brandBar-foreground/30 bg-brandBar-foreground/15",
                    )}
                    onClick={() =>
                      setFlyoutOpen((f) => (f === item.id ? null : item.id))
                    }
                    aria-expanded={flyoutOpen === item.id}
                    aria-haspopup="menu"
                    aria-label={item.label}
                  >
                    {item.icon ? (
                      <NavIcon name={item.icon} className="size-5 shrink-0" />
                    ) : null}
                  </button>
                </div>
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href ?? "#"}
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-lg border border-transparent text-brandBar-foreground transition-colors hover:bg-brandBar-foreground/15",
                        item.href &&
                          isPathActive(pathname, item.href) &&
                          "border-brandBar-foreground/30 bg-brandBar-foreground/15",
                      )}
                      onClick={() => onNavigate?.()}
                    >
                      {item.icon ? (
                        <NavIcon
                          name={item.icon}
                          className="size-5 shrink-0"
                        />
                      ) : null}
                      <span className="sr-only">{item.label}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" align="center">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              )}
            </li>
          ))}
        </ul>
        {flyoutPortal}
      </nav>
    </TooltipProvider>
  );
}
