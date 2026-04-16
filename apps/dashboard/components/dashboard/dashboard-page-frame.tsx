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
import { Fragment } from "react";
import { getBreadcrumbs, getPageTitle } from "../../lib/breadcrumb";
import { useNavLayout } from "../providers/nav-layout-provider";

export function DashboardPageFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/";
  const { navLayout } = useNavLayout();
  const crumbs = getBreadcrumbs(pathname);
  const title = getPageTitle(pathname);
  const showBreadcrumbInPage = navLayout === "topbar";

  return (
    <div className="space-y-6">
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
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        </div>
      ) : (
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      )}

      {children}
    </div>
  );
}
