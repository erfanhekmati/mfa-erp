"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { navItems, type NavItem } from "./nav-config";
import { NavIcon } from "./nav-icons";
import styles from "./sidebar.module.css";

type SidebarProps = {
  id: string;
  open: boolean;
  collapsed: boolean;
  onToggleCollapsed: () => void;
  isMobile: boolean;
  onNavigate?: () => void;
  onClose?: () => void;
};

function normalizePath(p: string) {
  if (!p) return "/";
  return p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
}

/** Exact match only — prefix matching would wrongly activate `/sales` when on `/sales/plan`. */
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
        className={
          active ? `${styles.subLink} ${styles.subLinkActive}` : styles.subLink
        }
        onClick={onNavigate}
      >
        {item.label}
      </Link>
    );
  }
  const leafClass = active
    ? `${styles.link} ${styles.linkWithIcon} ${styles.linkActive}`
    : `${styles.link} ${styles.linkWithIcon}`;
  return (
    <Link
      href={href}
      className={leafClass}
      onClick={onNavigate}
      title={collapsed && item.icon ? item.label : undefined}
    >
      {item.icon ? <NavIcon name={item.icon} className={styles.navIcon} /> : null}
      <span
        className={
          collapsed && item.icon ? styles.labelCollapsed : styles.navLabel
        }
      >
        {item.label}
      </span>
    </Link>
  );
}

export function Sidebar({
  id,
  open,
  collapsed,
  onToggleCollapsed,
  isMobile,
  onNavigate,
  onClose,
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

  return (
    <aside
      ref={rootRef}
      className={styles.aside}
      id={id}
      aria-label="ناوبری کناری"
      data-open={open ? "true" : "false"}
      data-collapsed={showCollapsed ? "true" : "false"}
    >
      <div
        className={
          showCollapsed && !isMobile
            ? `${styles.brandRow} ${styles.brandRowCollapsedOnly}`
            : styles.brandRow
        }
      >
        {!showCollapsed || isMobile ? (
          <div className={styles.brand}>مدیران فولاد آذر</div>
        ) : null}
        {isMobile && onClose ? (
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="بستن منو"
          >
            ×
          </button>
        ) : null}
        {!isMobile ? (
          <button
            type="button"
            className={
              showCollapsed && !isMobile
                ? `${styles.collapseBtn} ${styles.collapseBtnOpenLogo}`
                : styles.collapseBtn
            }
            onClick={onToggleCollapsed}
            aria-expanded={!collapsed}
            aria-label={collapsed ? "باز کردن نوار کناری" : "جمع کردن نوار کناری"}
          >
            <svg
              className={styles.collapseIcon}
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
      <nav className={styles.nav} aria-label="اصلی">
        <ul className={styles.list}>
          {navItems.map((item) => (
            <li key={item.id} className={styles.item}>
              {item.children?.length ? (
                <>
                  <button
                    type="button"
                    className={`${styles.toggle} ${styles.toggleWithIcon}`}
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
                      <NavIcon name={item.icon} className={styles.navIcon} />
                    ) : null}
                    <span
                      className={
                        showCollapsed && item.icon
                          ? styles.labelCollapsed
                          : styles.navLabel
                      }
                    >
                      {item.label}
                    </span>
                    {!showCollapsed ? (
                      <span
                        className={
                          expanded[item.id]
                            ? `${styles.toggleChevron} ${styles.toggleChevronExpanded}`
                            : styles.toggleChevron
                        }
                        aria-hidden
                      >
                        ›
                      </span>
                    ) : null}
                  </button>
                  {!showCollapsed && expanded[item.id] ? (
                    <ul
                      className={styles.subList}
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
                      className={styles.flyout}
                      role="menu"
                      aria-label={item.label}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.id}
                          href={child.href ?? "#"}
                          className={
                            child.href &&
                            isPathActive(pathname, child.href)
                              ? `${styles.flyoutLink} ${styles.flyoutLinkActive}`
                              : styles.flyoutLink
                          }
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
    </aside>
  );
}
