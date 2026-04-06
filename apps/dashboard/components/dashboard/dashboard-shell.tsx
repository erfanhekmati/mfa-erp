"use client";

import { useCallback, useEffect, useState } from "react";
import { Sidebar } from "./sidebar";
import { TopBar } from "./top-bar";
import styles from "./dashboard-shell.module.css";

const SIDEBAR_ID = "dashboard-sidebar";
const MOBILE_QUERY = "(max-width: 767px)";

const STORAGE_COLLAPSED = "erp-sidebar-collapsed";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_COLLAPSED) === "true") {
        setSidebarCollapsed(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const toggleSidebarCollapsed = useCallback(() => {
    setSidebarCollapsed((c) => {
      const next = !c;
      try {
        localStorage.setItem(STORAGE_COLLAPSED, String(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isMobile) setSidebarOpen(false);
  }, [isMobile]);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const toggleSidebar = useCallback(() => setSidebarOpen((o) => !o), []);

  const onNavigate = useCallback(() => {
    if (isMobile) setSidebarOpen(false);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile && sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, sidebarOpen]);

  const sidebarOpenState = !isMobile || sidebarOpen;

  return (
    <div className={styles.root}>
      {isMobile ? (
        <button
          type="button"
          className={styles.backdrop}
          data-visible={sidebarOpen ? "true" : "false"}
          aria-hidden={!sidebarOpen}
          aria-label="بستن منو"
          onClick={closeSidebar}
        />
      ) : null}
      <Sidebar
        id={SIDEBAR_ID}
        open={sidebarOpenState}
        collapsed={sidebarCollapsed}
        onToggleCollapsed={toggleSidebarCollapsed}
        isMobile={isMobile}
        onNavigate={onNavigate}
        onClose={isMobile ? closeSidebar : undefined}
      />
      <div className={styles.mainColumn}>
        <TopBar
          sidebarId={SIDEBAR_ID}
          sidebarOpen={sidebarOpen}
          onMenuClick={toggleSidebar}
        />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
