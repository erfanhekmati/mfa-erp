"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
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
  type Dispatch,
  type MutableRefObject,
  type SetStateAction,
} from "react";
import { createPortal } from "react-dom";
import { isPathActive } from "../../lib/nav-active";
import {
  getExpandedNavGroupIds,
  getExpandedNavGroupIdsMobile,
  isNavSubtreeActive,
} from "../../lib/nav-tree";
import { navItems, type NavItem } from "./nav-config";
import { NavFlyoutLinkList } from "./nav-flyout-link-list";
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
  /** When false, desktop aside is not rendered (mobile sheet still shown). */
  showDesktopAside?: boolean;
};

function NavLeaf({
  item,
  sub,
  subTier = 1,
  collapsed,
  pathname,
  onNavigate,
}: {
  item: NavItem;
  sub: boolean;
  /** 2 = لینک زیر گروه دوم (مثلاً زیر «طرف حساب‌ها») */
  subTier?: 1 | 2;
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
          "block rounded-md py-1.5 text-sm transition-colors",
          subTier === 2 ? "px-2 pe-3 ps-5" : "px-3",
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
  const link = (
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

  if (collapsed && !sub) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{link}</TooltipTrigger>
        <TooltipContent side="left" align="center">
          {item.label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return link;
}

function NavNestedGroup({
  items,
  nestLevel,
  expanded,
  toggle,
  pathname,
  onNavigate,
  idPrefix,
  listId,
  labelledBy,
  isMobile,
  deepFlyout,
  setDeepFlyout,
  clearDeepCloseHoverTimer,
  deepCloseHoverTimerRef,
}: {
  items: NavItem[];
  nestLevel: 0 | 1;
  expanded: Record<string, boolean>;
  toggle: (itemId: string) => void;
  pathname: string;
  onNavigate?: () => void;
  idPrefix: string;
  listId: string;
  labelledBy?: string;
  isMobile: boolean;
  deepFlyout: { triggerId: string; node: NavItem } | null;
  setDeepFlyout: Dispatch<
    SetStateAction<{ triggerId: string; node: NavItem } | null>
  >;
  clearDeepCloseHoverTimer: () => void;
  deepCloseHoverTimerRef: MutableRefObject<ReturnType<
    typeof setTimeout
  > | null>;
}) {
  return (
    <ul
      id={listId}
      className={cn(
        "space-y-0.5",
        nestLevel === 0 &&
          "me-3 mt-1 border-s border-sidebar-border ps-3",
        nestLevel === 1 &&
          "me-2 mt-0.5 border-s border-sidebar-border/70 ps-2.5",
      )}
      role="list"
      aria-labelledby={labelledBy}
    >
      {items.map((child) => (
        <li key={child.id}>
          {child.children?.length ? (
            !isMobile && nestLevel === 0 ? (
              <div
                id={`${idPrefix}-deep-flyout-${child.id}`}
                className="relative"
                onMouseEnter={() => {
                  clearDeepCloseHoverTimer();
                  setDeepFlyout({ triggerId: child.id, node: child });
                }}
                onMouseLeave={() => {
                  clearDeepCloseHoverTimer();
                  deepCloseHoverTimerRef.current = setTimeout(() => {
                    setDeepFlyout((open) =>
                      open?.triggerId === child.id ? null : open,
                    );
                  }, 200);
                }}
              >
                <button
                  type="button"
                  className={cn(
                    "flex w-full items-center gap-1 rounded-md px-3 py-1.5 text-start text-sm transition-colors",
                    isNavSubtreeActive(pathname, child)
                      ? "bg-sidebar-accent/80 font-medium text-foreground"
                      : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground",
                  )}
                  aria-expanded={deepFlyout?.triggerId === child.id}
                  aria-haspopup="menu"
                  aria-controls={
                    deepFlyout?.triggerId === child.id
                      ? `${idPrefix}-deep-flyout-panel`
                      : undefined
                  }
                  id={`${idPrefix}-btn-${child.id}`}
                  onClick={() => {
                    setDeepFlyout((prev) =>
                      prev?.triggerId === child.id
                        ? null
                        : { triggerId: child.id, node: child },
                    );
                  }}
                >
                  <span className="min-w-0 flex-1">{child.label}</span>
                  <span
                    className={cn(
                      "shrink-0 text-muted-foreground transition-transform rtl:scale-x-[-1]",
                      deepFlyout?.triggerId === child.id &&
                        "-rotate-90 rtl:rotate-90",
                    )}
                    aria-hidden
                  >
                    ›
                  </span>
                </button>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  className={cn(
                    "flex w-full items-center gap-1 rounded-md py-1.5 text-start text-sm transition-colors",
                    nestLevel === 0
                      ? "px-3 text-muted-foreground hover:text-foreground"
                      : "px-2 text-muted-foreground hover:text-foreground",
                  )}
                  onClick={() => toggle(child.id)}
                  aria-expanded={expanded[child.id] ?? false}
                  aria-controls={`${idPrefix}-nested-${child.id}`}
                  id={`${idPrefix}-btn-${child.id}`}
                >
                  <span className="min-w-0 flex-1">{child.label}</span>
                  <span
                    className={cn(
                      "shrink-0 text-muted-foreground transition-transform",
                      expanded[child.id] && "rotate-90 rtl:-rotate-90",
                    )}
                    aria-hidden
                  >
                    ›
                  </span>
                </button>
                {expanded[child.id] ? (
                  <NavNestedGroup
                    items={child.children}
                    nestLevel={1}
                    expanded={expanded}
                    toggle={toggle}
                    pathname={pathname}
                    onNavigate={onNavigate}
                    idPrefix={idPrefix}
                    listId={`${idPrefix}-nested-${child.id}`}
                    labelledBy={`${idPrefix}-btn-${child.id}`}
                    isMobile={isMobile}
                    deepFlyout={deepFlyout}
                    setDeepFlyout={setDeepFlyout}
                    clearDeepCloseHoverTimer={clearDeepCloseHoverTimer}
                    deepCloseHoverTimerRef={deepCloseHoverTimerRef}
                  />
                ) : null}
              </>
            )
          ) : (
            <NavLeaf
              item={child}
              sub
              subTier={nestLevel === 0 ? 1 : 2}
              collapsed={false}
              pathname={pathname}
              onNavigate={onNavigate}
            />
          )}
        </li>
      ))}
    </ul>
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
  showDesktopAside = true,
}: SidebarProps) {
  const pathname = usePathname();
  const rootRef = useRef<HTMLElement>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    sales: false,
    inventory: false,
    "base-info": false,
  });
  const [flyoutOpen, setFlyoutOpen] = useState<string | null>(null);
  const [flyoutPos, setFlyoutPos] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [deepFlyout, setDeepFlyout] = useState<{
    triggerId: string;
    node: NavItem;
  } | null>(null);
  const [deepFlyoutPos, setDeepFlyoutPos] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [mounted, setMounted] = useState(false);
  const closeHoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const deepCloseHoverTimerRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);
  const flyoutMenuRef = useRef<HTMLDivElement | null>(null);
  const deepFlyoutMenuRef = useRef<HTMLDivElement | null>(null);

  const showCollapsed = collapsed && !isMobile;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fromPath = isMobile
      ? getExpandedNavGroupIdsMobile(pathname, navItems)
      : getExpandedNavGroupIds(pathname, navItems);
    setExpanded((prev) => ({ ...prev, ...fromPath }));
  }, [pathname, isMobile]);

  useEffect(() => {
    setDeepFlyout(null);
  }, [pathname, showCollapsed]);

  const toggle = useCallback((itemId: string) => {
    setExpanded((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  }, []);

  const closeFlyout = useCallback(() => setFlyoutOpen(null), []);

  const clearCloseHoverTimer = useCallback(() => {
    if (closeHoverTimerRef.current) {
      clearTimeout(closeHoverTimerRef.current);
      closeHoverTimerRef.current = null;
    }
  }, []);

  const clearDeepCloseHoverTimer = useCallback(() => {
    if (deepCloseHoverTimerRef.current) {
      clearTimeout(deepCloseHoverTimerRef.current);
      deepCloseHoverTimerRef.current = null;
    }
  }, []);

  useEffect(
    () => () => {
      clearCloseHoverTimer();
      clearDeepCloseHoverTimer();
    },
    [clearCloseHoverTimer, clearDeepCloseHoverTimer],
  );

  const updateFlyoutPosition = useCallback(() => {
    if (!flyoutOpen || !showCollapsed) return;
    const el = document.getElementById(`${id}-flyout-trigger-${flyoutOpen}`);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setFlyoutPos({ top: rect.top, left: rect.left });
  }, [flyoutOpen, showCollapsed, id]);

  const updateDeepFlyoutPosition = useCallback(() => {
    if (!deepFlyout || showCollapsed) return;
    const el = document.getElementById(
      `${id}-deep-flyout-${deepFlyout.triggerId}`,
    );
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setDeepFlyoutPos({ top: rect.top, left: rect.left });
  }, [deepFlyout, showCollapsed, id]);

  useLayoutEffect(() => {
    if (!flyoutOpen || !showCollapsed) {
      setFlyoutPos(null);
      return;
    }
    updateFlyoutPosition();
  }, [flyoutOpen, showCollapsed, updateFlyoutPosition]);

  useLayoutEffect(() => {
    if (!deepFlyout || showCollapsed) {
      setDeepFlyoutPos(null);
      return;
    }
    updateDeepFlyoutPosition();
  }, [deepFlyout, showCollapsed, updateDeepFlyoutPosition]);

  useEffect(() => {
    if (!flyoutOpen || !showCollapsed) return;
    const nav = rootRef.current?.querySelector("nav");
    const main = document.querySelector("main");
    const onMove = () => updateFlyoutPosition();
    window.addEventListener("resize", onMove);
    nav?.addEventListener("scroll", onMove, { passive: true });
    main?.addEventListener("scroll", onMove, { passive: true });
    const aside = rootRef.current;
    const ro =
      aside &&
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(onMove)
        : null;
    if (aside && ro) ro.observe(aside);
    return () => {
      window.removeEventListener("resize", onMove);
      nav?.removeEventListener("scroll", onMove);
      main?.removeEventListener("scroll", onMove);
      ro?.disconnect();
    };
  }, [flyoutOpen, showCollapsed, updateFlyoutPosition]);

  useEffect(() => {
    if (!deepFlyout || showCollapsed) return;
    const nav = rootRef.current?.querySelector("nav");
    const main = document.querySelector("main");
    const onMove = () => updateDeepFlyoutPosition();
    window.addEventListener("resize", onMove);
    nav?.addEventListener("scroll", onMove, { passive: true });
    main?.addEventListener("scroll", onMove, { passive: true });
    const aside = rootRef.current;
    const ro =
      aside &&
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(onMove)
        : null;
    if (aside && ro) ro.observe(aside);
    return () => {
      window.removeEventListener("resize", onMove);
      nav?.removeEventListener("scroll", onMove);
      main?.removeEventListener("scroll", onMove);
      ro?.disconnect();
    };
  }, [deepFlyout, showCollapsed, updateDeepFlyoutPosition]);

  useEffect(() => {
    if (!flyoutOpen && !deepFlyout) return;
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (rootRef.current?.contains(t)) return;
      if (flyoutMenuRef.current?.contains(t)) return;
      if (deepFlyoutMenuRef.current?.contains(t)) return;
      closeFlyout();
      setDeepFlyout(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [flyoutOpen, deepFlyout, closeFlyout]);

  useEffect(() => {
    closeFlyout();
    setDeepFlyout(null);
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
        "flex h-[var(--topbar-height)] min-h-[var(--topbar-height)] shrink-0 items-center justify-between gap-2 border-b border-brandBar/20 bg-brandBar px-2 text-brandBar-foreground",
        showCollapsed && !isMobile && "justify-center px-1.5",
      )}
    >
      {!showCollapsed || isMobile ? (
        <div className="min-w-0 flex-1 truncate px-1 text-sm font-semibold leading-snug text-brandBar-foreground">
          مدیران فولاد آذر
        </div>
      ) : null}
      {isMobile ? (
        <button
          type="button"
          className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-brandBar-foreground/25 bg-brandBar-foreground/10 text-xl leading-none text-brandBar-foreground transition-colors hover:bg-brandBar-foreground/15"
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
            "flex shrink-0 items-center justify-center rounded-lg border border-brandBar-foreground/25 bg-brandBar-foreground/10 text-brandBar-foreground transition-colors hover:bg-brandBar-foreground/15",
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

  const flyoutItem =
    flyoutOpen && showCollapsed
      ? navItems.find((i) => i.id === flyoutOpen)
      : undefined;

  const navBlock = (
    <nav className="flex-1 overflow-y-auto px-2 py-3" aria-label="اصلی">
      <ul className="space-y-1">
        {navItems.map((item) => (
          <li key={item.id} className="relative">
            {item.children?.length ? (
              <div
                id={`${id}-flyout-trigger-${item.id}`}
                className="relative"
                onMouseEnter={() => {
                  if (!showCollapsed) return;
                  clearCloseHoverTimer();
                  setFlyoutOpen(item.id);
                }}
                onMouseLeave={() => {
                  if (!showCollapsed) return;
                  clearCloseHoverTimer();
                  closeHoverTimerRef.current = setTimeout(() => {
                    setFlyoutOpen((open) => (open === item.id ? null : open));
                  }, 200);
                }}
              >
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
                  <NavNestedGroup
                    items={item.children}
                    nestLevel={0}
                    expanded={expanded}
                    toggle={toggle}
                    pathname={pathname}
                    onNavigate={onNavigate}
                    idPrefix={id}
                    listId={`${id}-sub-${item.id}`}
                    labelledBy={`${id}-btn-${item.id}`}
                    isMobile={isMobile}
                    deepFlyout={deepFlyout}
                    setDeepFlyout={setDeepFlyout}
                    clearDeepCloseHoverTimer={clearDeepCloseHoverTimer}
                    deepCloseHoverTimerRef={deepCloseHoverTimerRef}
                  />
                ) : null}
              </div>
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

  const flyoutPortal =
    mounted &&
    showCollapsed &&
    flyoutOpen &&
    flyoutItem?.children?.length &&
    flyoutPos &&
    typeof document !== "undefined"
      ? createPortal(
          <div
            ref={flyoutMenuRef}
            className="fixed z-[60] min-w-[11rem] overflow-visible rounded-lg border border-border bg-background shadow-lg"
            style={{
              top: flyoutPos.top,
              left: flyoutPos.left - 6,
              transform: "translateX(-100%)",
            }}
            role="menu"
            aria-labelledby={`${id}-flyout-heading-${flyoutItem.id}`}
            onMouseEnter={clearCloseHoverTimer}
            onMouseLeave={() => setFlyoutOpen(null)}
          >
            <div
              id={`${id}-flyout-heading-${flyoutItem.id}`}
              className="border-b border-border bg-muted/50 px-3 py-2"
              role="presentation"
            >
              <span className="block text-xs font-semibold leading-snug text-muted-foreground">
                {flyoutItem.label}
              </span>
            </div>
            <div className="flex flex-col gap-0.5 p-1.5">
              <NavFlyoutLinkList
                items={flyoutItem.children}
                pathname={pathname}
                onNavigate={() => {
                  closeFlyout();
                  onNavigate?.();
                }}
              />
            </div>
          </div>,
          document.body,
        )
      : null;

  const deepFlyoutPortal =
    mounted &&
    !showCollapsed &&
    deepFlyout?.node.children?.length &&
    deepFlyoutPos &&
    typeof document !== "undefined"
      ? createPortal(
          <div
            ref={deepFlyoutMenuRef}
            id={`${id}-deep-flyout-panel`}
            className="fixed z-[60] min-w-[11rem] overflow-hidden rounded-lg border border-border bg-background shadow-lg"
            style={{
              top: deepFlyoutPos.top,
              left: deepFlyoutPos.left - 6,
              transform: "translateX(-100%)",
            }}
            role="menu"
            aria-labelledby={`${id}-deep-flyout-heading-${deepFlyout.triggerId}`}
            onMouseEnter={clearDeepCloseHoverTimer}
            onMouseLeave={() => setDeepFlyout(null)}
          >
            <div
              id={`${id}-deep-flyout-heading-${deepFlyout.triggerId}`}
              className="border-b border-border bg-muted/50 px-3 py-2"
              role="presentation"
            >
              <span className="block text-xs font-semibold leading-snug text-muted-foreground">
                {deepFlyout.node.label}
              </span>
            </div>
            <div className="flex flex-col gap-0.5 p-1.5">
              <NavFlyoutLinkList
                items={deepFlyout.node.children}
                pathname={pathname}
                onNavigate={() => {
                  setDeepFlyout(null);
                  onNavigate?.();
                }}
              />
            </div>
          </div>,
          document.body,
        )
      : null;

  const inner = (
    <TooltipProvider delayDuration={400} disableHoverableContent>
      {brandBlock}
      {navBlock}
      {flyoutPortal}
      {deepFlyoutPortal}
    </TooltipProvider>
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

  if (!showDesktopAside) {
    return null;
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
