"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { getBreadcrumbs } from "../../lib/breadcrumb";
import styles from "./top-bar.module.css";

type TopBarProps = {
  sidebarId: string;
  sidebarOpen: boolean;
  onMenuClick: () => void;
};

export function TopBar({ sidebarId, sidebarOpen, onMenuClick }: TopBarProps) {
  const pathname = usePathname() ?? "/";
  const crumbs = getBreadcrumbs(pathname);

  return (
    <header className={styles.bar}>
      <button
        type="button"
        className={styles.menuBtn}
        aria-label={sidebarOpen ? "بستن منو" : "باز کردن منو"}
        aria-expanded={sidebarOpen}
        aria-controls={sidebarId}
        onClick={onMenuClick}
      >
        <svg
          className={styles.menuIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <nav className={styles.breadcrumbNav} aria-label="مسیر صفحه">
        <ol className={styles.breadcrumbList}>
          {crumbs.map((c, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <Fragment key={`${c.label}-${i}`}>
                {i > 0 ? (
                  <li className={styles.sep} aria-hidden>
                    /
                  </li>
                ) : null}
                <li className={styles.crumb}>
                  {c.href && !isLast ? (
                    <Link href={c.href} className={styles.crumbLink}>
                      {c.label}
                    </Link>
                  ) : (
                    <span
                      className={
                        isLast ? styles.crumbCurrent : styles.crumbStatic
                      }
                      aria-current={isLast ? "page" : undefined}
                    >
                      {c.label}
                    </span>
                  )}
                </li>
              </Fragment>
            );
          })}
        </ol>
      </nav>
      <div className={styles.spacer} aria-hidden />
    </header>
  );
}
