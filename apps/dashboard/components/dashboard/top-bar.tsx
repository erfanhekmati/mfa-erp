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
import { getBreadcrumbs } from "../../lib/breadcrumb";

type TopBarProps = {
  sidebarId: string;
  sidebarOpen: boolean;
  onMenuClick: () => void;
};

export function TopBar({ sidebarId, sidebarOpen, onMenuClick }: TopBarProps) {
  const pathname = usePathname() ?? "/";
  const crumbs = getBreadcrumbs(pathname);

  return (
    <header className="flex h-[var(--topbar-height)] min-h-[var(--topbar-height)] shrink-0 items-center gap-3 border-b border-border bg-background px-4">
      <button
        type="button"
        className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background md:hidden"
        aria-label={sidebarOpen ? "بستن منو" : "باز کردن منو"}
        aria-expanded={sidebarOpen}
        aria-controls={sidebarId}
        onClick={onMenuClick}
      >
        <svg
          className="size-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <Breadcrumb className="min-w-0 flex-1 overflow-hidden">
        <BreadcrumbList className="text-xs sm:text-sm">
          {crumbs.map((c, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <Fragment key={`${c.label}-${i}`}>
                {i > 0 ? (
                  <BreadcrumbSeparator className="text-border [&>span]:text-border">
                    /
                  </BreadcrumbSeparator>
                ) : null}
                <BreadcrumbItem>
                  {c.href && !isLast ? (
                    <BreadcrumbLink asChild>
                      <Link href={c.href} className="text-muted-foreground">
                        {c.label}
                      </Link>
                    </BreadcrumbLink>
                  ) : isLast ? (
                    <BreadcrumbPage>{c.label}</BreadcrumbPage>
                  ) : (
                    <span className="text-muted-foreground">{c.label}</span>
                  )}
                </BreadcrumbItem>
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="hidden w-10 shrink-0 md:block" aria-hidden />
    </header>
  );
}
