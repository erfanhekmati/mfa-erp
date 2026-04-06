"use client";

import styles from "./top-bar.module.css";

type TopBarProps = {
  title: string;
  sidebarId: string;
  sidebarOpen: boolean;
  onMenuClick: () => void;
};

export function TopBar({
  title,
  sidebarId,
  sidebarOpen,
  onMenuClick,
}: TopBarProps) {
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
      <div className={styles.title}>{title}</div>
      <div className={styles.spacer} aria-hidden />
    </header>
  );
}
