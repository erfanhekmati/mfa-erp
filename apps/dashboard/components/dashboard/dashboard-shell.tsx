"use client";

import { useCallback, useEffect, useState } from "react";
import { useNavLayout } from "../providers/nav-layout-provider";
import { DashboardPageFrame } from "./dashboard-page-frame";
import { Sidebar } from "./sidebar";
import { TopBar } from "./top-bar";

const SIDEBAR_ID = "dashboard-sidebar";
const MOBILE_QUERY = "(max-width: 767px)";

const STORAGE_COLLAPSED = "erp-sidebar-collapsed";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { navLayout } = useNavLayout();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const showDesktopSidebar = navLayout === "sidebar";
  const showDesktopTopNav = navLayout === "topbar" && !isMobile;
  const showBreadcrumbsInHeader = navLayout === "sidebar";

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

  const toggleSidebar = useCallback(() => setSidebarOpen((o) => !o), []);

  const onNavigate = useCallback(() => {
    if (isMobile) setSidebarOpen(false);
  }, [isMobile]);

  const sidebarOpenState = !isMobile || sidebarOpen;

  return (
    <div className="flex h-screen min-h-0 w-full overflow-hidden bg-background">
      <Sidebar
        id={SIDEBAR_ID}
        open={sidebarOpenState}
        drawerOpen={sidebarOpen}
        onDrawerOpenChange={setSidebarOpen}
        collapsed={sidebarCollapsed}
        onToggleCollapsed={toggleSidebarCollapsed}
        isMobile={isMobile}
        onNavigate={onNavigate}
        showDesktopAside={showDesktopSidebar}
      />
      <div className="relative z-0 flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <TopBar
          sidebarId={SIDEBAR_ID}
          sidebarOpen={sidebarOpen}
          onMenuClick={toggleSidebar}
          showTopNav={showDesktopTopNav}
          showBreadcrumbsInHeader={showBreadcrumbsInHeader}
          onNavigate={onNavigate}
        />
        <main className="min-h-0 flex-1 overflow-y-auto px-4 py-4 md:px-5 lg:px-6">
          <DashboardPageFrame>{children}</DashboardPageFrame>
        </main>
      </div>
    </div>
  );
}
