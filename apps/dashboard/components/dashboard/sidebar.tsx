"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { navItems, type NavItem } from "./nav-config";
import styles from "./sidebar.module.css";

type SidebarProps = {
  id: string;
  open: boolean;
  onNavigate?: () => void;
  onClose?: () => void;
};

function isPathActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLeaf({
  item,
  sub,
  pathname,
  onNavigate,
}: {
  item: NavItem;
  sub: boolean;
  pathname: string;
  onNavigate?: () => void;
}) {
  const href = item.href ?? "#";
  const active = isPathActive(pathname, href);
  const className = sub
    ? `${styles.subLink}${active ? ` ${styles.subLinkActive}` : ""}`
    : active
      ? styles.linkActive
      : styles.link;

  return (
    <Link href={href} className={className} onClick={onNavigate}>
      {item.label}
    </Link>
  );
}

export function Sidebar({ id, open, onNavigate, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    sales: true,
    inventory: false,
    settings: false,
  });

  const toggle = useCallback((itemId: string) => {
    setExpanded((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  }, []);

  return (
    <aside
      className={styles.aside}
      id={id}
      aria-label="ناوبری کناری"
      data-open={open ? "true" : "false"}
    >
      <div className={styles.brand}>مدیران فولاد آذر</div>
      {onClose ? (
        <div className={styles.closeRow}>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="بستن منو"
          >
            ×
          </button>
        </div>
      ) : null}
      <nav className={styles.nav} aria-label="اصلی">
        <ul className={styles.list}>
          {navItems.map((item) => (
            <li key={item.id} className={styles.item}>
              {item.children?.length ? (
                <>
                  <button
                    type="button"
                    className={styles.toggle}
                    onClick={() => toggle(item.id)}
                    aria-expanded={expanded[item.id] ?? false}
                    aria-controls={`${id}-sub-${item.id}`}
                    id={`${id}-btn-${item.id}`}
                  >
                    <span>{item.label}</span>
                    <span
                      className={
                        expanded[item.id]
                          ? `${styles.toggleIcon} ${styles.toggleIconExpanded}`
                          : styles.toggleIcon
                      }
                      aria-hidden
                    >
                      ›
                    </span>
                  </button>
                  {expanded[item.id] ? (
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
                            pathname={pathname}
                            onNavigate={onNavigate}
                          />
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </>
              ) : (
                <NavLeaf
                  item={item}
                  sub={false}
                  pathname={pathname}
                  onNavigate={onNavigate}
                />
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
