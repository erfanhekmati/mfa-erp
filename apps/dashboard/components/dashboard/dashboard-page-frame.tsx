"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  createContext,
  Fragment,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getBreadcrumbs, getPageTitle } from "../../lib/breadcrumb";
import { useNavLayout } from "../providers/nav-layout-provider";

type PageHeaderActionsContextValue = {
  setActions: (node: ReactNode | null) => void;
};

const PageHeaderActionsContext =
  createContext<PageHeaderActionsContextValue | null>(null);

/**
 * Renders primary actions beside the page title (e.g. «جدید»). Place once per page inside the main content.
 */
export function DashboardPageActions({ children }: { children: ReactNode }) {
  const ctx = useContext(PageHeaderActionsContext);
  useLayoutEffect(() => {
    if (!ctx) return;
    ctx.setActions(children);
    return () => ctx.setActions(null);
  }, [children, ctx]);
  return null;
}

function PageTitleRow({
  title,
  actions,
}: {
  title: string;
  actions: ReactNode | null;
}) {
  const hasActions = actions != null;

  if (!hasActions) {
    return (
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
    );
  }

  return (
    <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="min-w-0 text-2xl font-bold tracking-tight">{title}</h1>
      <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
        {actions}
      </div>
    </div>
  );
}

export function DashboardPageFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/";
  const { navLayout } = useNavLayout();
  const crumbs = getBreadcrumbs(pathname);
  const title = getPageTitle(pathname);
  const showBreadcrumbInPage = navLayout === "topbar";

  const [actions, setActionsState] = useState<ReactNode | null>(null);
  const setActions = useCallback((node: ReactNode | null) => {
    setActionsState(node);
  }, []);

  const headerCtx = useMemo(
    (): PageHeaderActionsContextValue => ({ setActions }),
    [setActions],
  );

  return (
    <PageHeaderActionsContext.Provider value={headerCtx}>
      <div className="space-y-0">
        {showBreadcrumbInPage ? (
          <div className="space-y-4">
            <Breadcrumb className="min-w-0 overflow-hidden">
              <BreadcrumbList className="text-xs text-muted-foreground sm:text-sm">
                {crumbs.map((c, i) => {
                  const isLast = i === crumbs.length - 1;
                  return (
                    <Fragment key={`${c.label}-${i}`}>
                      {i > 0 ? (
                        <BreadcrumbSeparator className="text-muted-foreground/50 [&>span]:text-muted-foreground/50">
                          /
                        </BreadcrumbSeparator>
                      ) : null}
                      <BreadcrumbItem>
                        {c.href && !isLast ? (
                          <BreadcrumbLink asChild>
                            <Link
                              href={c.href}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              {c.label}
                            </Link>
                          </BreadcrumbLink>
                        ) : isLast ? (
                          <BreadcrumbPage className="font-medium text-foreground">
                            {c.label}
                          </BreadcrumbPage>
                        ) : (
                          <span className="text-muted-foreground">{c.label}</span>
                        )}
                      </BreadcrumbItem>
                    </Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
            <PageTitleRow title={title} actions={actions} />
          </div>
        ) : (
          <PageTitleRow title={title} actions={actions} />
        )}

        {children}
      </div>
    </PageHeaderActionsContext.Provider>
  );
}
