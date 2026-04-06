"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  cn,
} from "@repo/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { navItems, type NavItem } from "./nav-config";
import { NavIcon } from "./nav-icons";

type SidebarProps = {
  id: string;
  /** Desktop: aside visible in layout */
  open: boolean;
  /** Mobile drawer controlled by shell */
  drawerOpen: boolean;
  onDrawerOpenChange: (open: boolean) => void;
  collapsed: boolean;
  onToggleCollapsed: () => void;
  isMobile: boolean;
  onNavigate?: () => void;
};

function normalizePath(p: string) {
  if (!p) return "/";
  return p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
}

function isPathActive(pathname: string, href: string) {
  const p = normalizePath(pathname);
  const h = normalizePath(href);
  if (h === "/") return p === "/";
  return p === h;
}

function NavLeaf({
  item,
  sub,
  collapsed,
  pathname,
  onNavigate,
}: {
  item: NavItem;
  sub: boolean;
  collapsed: boolean;
  pathname: string;
  onNavigate?: () => void;
}) {
  const href = item.href ?? "#";
  const active = isPathActive(pathname, href);
  if (sub) {
    return (
      <Link
        href={href}
        className={cn(
          "block rounded-md px-3 py-1.5 text-sm transition-colors",
          active
            ? "bg-sidebar-accent font-medium text-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
        onClick={onNavigate}
      >
        {item.label}
      </Link>
    );
  }
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
        collapsed && item.icon && "justify-center px-1.5",
        active
          ? "bg-sidebar-accent font-medium text-foreground"
          : "text-foreground hover:bg-sidebar-accent/80",
      )}
      onClick={onNavigate}
      title={collapsed && item.icon ? item.label : undefined}
    >
      {item.icon ? (
        <NavIcon name={item.icon} className="size-5 shrink-0" />
      ) : null}
      <span
        className={cn(
          "min-w-0 flex-1 text-start",
          collapsed && item.icon && "sr-only",
        )}
      >
        {item.label}
      </span>
    </Link>
  );
}

export function Sidebar({
  id,
  open,
  drawerOpen,
  onDrawerOpenChange,
  collapsed,
  onToggleCollapsed,
  isMobile,
  onNavigate,
}: SidebarProps) {
  const pathname = usePathname();
  const rootRef = useRef<HTMLElement>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    sales: false,
    inventory: false,
    more: false,
  });
  const [flyoutOpen, setFlyoutOpen] = useState<string | null>(null);

  const showCollapsed = collapsed && !isMobile;

  const toggle = useCallback((itemId: string) => {
    setExpanded((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  }, []);

  const closeFlyout = useCallback(() => setFlyoutOpen(null), []);

  useEffect(() => {
    if (!flyoutOpen) return;
    const handler = (e: MouseEvent) => {
      if (rootRef.current?.contains(e.target as Node)) return;
      closeFlyout();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [flyoutOpen, closeFlyout]);

  useEffect(() => {
    closeFlyout();
  }, [showCollapsed, closeFlyout]);

  const handleParentClick = useCallback(
    (item: NavItem) => {
      if (showCollapsed && item.children?.length) {
        setFlyoutOpen((f) => (f === item.id ? null : item.id));
        return;
      }
      toggle(item.id);
    },
    [showCollapsed, toggle],
  );

  const brandBlock = (
    <div
      className={cn(
        "flex h-[var(--topbar-height)] min-h-[var(--topbar-height)] shrink-0 items-center justify-between gap-2 border-b border-sidebar-border px-2",
        showCollapsed && !isMobile && "justify-center px-1.5",
      )}
    >
      {!showCollapsed || isMobile ? (
        <div className="min-w-0 flex-1 truncate px-1 text-sm font-semibold leading-snug text-sidebar-foreground">
          مدیران فولاد آذر
        </div>
      ) : null}
      {isMobile ? (
        <button
          type="button"
          className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-xl leading-none text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          onClick={() => onDrawerOpenChange(false)}
          aria-label="بستن منو"
        >
          ×
        </button>
      ) : null}
      {!isMobile ? (
        <button
          type="button"
          className={cn(
            "flex shrink-0 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:bg-accent",
            showCollapsed ? "size-10" : "size-9",
          )}
          onClick={onToggleCollapsed}
          aria-expanded={!collapsed}
          aria-label={
            collapsed ? "باز کردن نوار کناری" : "جمع کردن نوار کناری"
          }
        >
          <svg
            className="size-[1.125rem] rtl:scale-x-[-1]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            {collapsed ? (
              <path d="M15 18l-6-6 6-6" />
            ) : (
              <path d="M9 18l6-6-6-6" />
            )}
          </svg>
        </button>
      ) : null}
    </div>
  );

  const navBlock = (
    <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-3" aria-label="اصلی">
      <ul className="space-y-1">
        {navItems.map((item) => (
          <li key={item.id} className="relative">
            {item.children?.length ? (
              <>
                <button
                  type="button"
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md px-3 py-2 text-start text-sm text-foreground transition-colors hover:bg-sidebar-accent/80",
                    showCollapsed && item.icon && "justify-center px-1.5",
                  )}
                  onClick={() => handleParentClick(item)}
                  aria-expanded={
                    showCollapsed
                      ? flyoutOpen === item.id
                      : (expanded[item.id] ?? false)
                  }
                  aria-controls={`${id}-sub-${item.id}`}
                  id={`${id}-btn-${item.id}`}
                  title={showCollapsed ? item.label : undefined}
                >
                  {item.icon ? (
                    <NavIcon name={item.icon} className="size-5 shrink-0" />
                  ) : null}
                  <span
                    className={cn(
                      "min-w-0 flex-1",
                      showCollapsed && item.icon && "sr-only",
                    )}
                  >
                    {item.label}
                  </span>
                  {!showCollapsed ? (
                    <span
                      className={cn(
                        "shrink-0 text-muted-foreground transition-transform",
                        expanded[item.id] && "rotate-90 rtl:-rotate-90",
                      )}
                      aria-hidden
                    >
                      ›
                    </span>
                  ) : null}
                </button>
                {!showCollapsed && expanded[item.id] ? (
                  <ul
                    className="me-3 mt-1 space-y-0.5 border-s border-sidebar-border ps-3"
                    id={`${id}-sub-${item.id}`}
                    role="list"
                    aria-labelledby={`${id}-btn-${item.id}`}
                  >
                    {item.children.map((child) => (
                      <li key={child.id}>
                        <NavLeaf
                          item={child}
                          sub
                          collapsed={showCollapsed}
                          pathname={pathname}
                          onNavigate={onNavigate}
                        />
                      </li>
                    ))}
                  </ul>
                ) : null}
                {showCollapsed && flyoutOpen === item.id && item.children ? (
                  <div
                    className="absolute end-full top-0 z-[60] me-1.5 min-w-[11rem] rounded-lg border border-border bg-background p-1.5 shadow-lg"
                    role="menu"
                    aria-label={item.label}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.id}
                        href={child.href ?? "#"}
                        className={cn(
                          "block rounded-md px-2.5 py-2 text-sm transition-colors",
                          child.href &&
                            isPathActive(pathname, child.href)
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
                    ))}
                  </div>
                ) : null}
              </>
            ) : (
              <NavLeaf
                item={item}
                sub={false}
                collapsed={showCollapsed}
                pathname={pathname}
                onNavigate={() => {
                  closeFlyout();
                  onNavigate?.();
                }}
              />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );

  const inner = (
    <>
      {brandBlock}
      {navBlock}
    </>
  );

  if (isMobile) {
    return (
      <Sheet open={drawerOpen} onOpenChange={onDrawerOpenChange}>
        <SheetContent
          side="right"
          className="flex h-full w-[min(100vw,280px)] max-w-[var(--sidebar-width)] flex-col gap-0 border-sidebar-border bg-sidebar p-0 text-sidebar-foreground"
        >
          <SheetTitle className="sr-only">منوی ناوبری</SheetTitle>
          {inner}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside
      ref={rootRef}
      id={id}
      aria-label="ناوبری کناری"
      data-open={open ? "true" : "false"}
      data-collapsed={showCollapsed ? "true" : "false"}
      className={cn(
        "flex h-screen min-h-screen flex-shrink-0 flex-col border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-linear border-e",
        showCollapsed ? "w-[var(--sidebar-collapsed-width)]" : "w-[var(--sidebar-width)]",
      )}
    >
      {inner}
    </aside>
  );
}
