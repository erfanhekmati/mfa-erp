"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { getBreadcrumbs } from "../../lib/breadcrumb";
import { TopBarNav } from "./top-bar-nav";

type TopBarProps = {
  sidebarId: string;
  sidebarOpen: boolean;
  onMenuClick: () => void;
  /** Desktop top-bar icon nav (topbar layout mode). */
  showTopNav?: boolean;
  /** When false, breadcrumbs render in the page body instead. */
  showBreadcrumbsInHeader?: boolean;
  onNavigate?: () => void;
};

const USER_NAME = "علی محمدی";
const USER_ROLE = "مدیرعامل";

function getInitials(name: string) {
  return name
    .trim()
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

export function TopBar({
  sidebarId,
  sidebarOpen,
  onMenuClick,
  showTopNav = false,
  showBreadcrumbsInHeader = true,
  onNavigate,
}: TopBarProps) {
  const pathname = usePathname() ?? "/";
  const crumbs = getBreadcrumbs(pathname);
  const initials = getInitials(USER_NAME);

  return (
    <header className="flex h-[var(--topbar-height)] min-h-[var(--topbar-height)] shrink-0 items-center gap-3 border-b border-brandBar/20 bg-brandBar px-4 text-brandBar-foreground">
      <button
        type="button"
        className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-brandBar-foreground/25 bg-brandBar-foreground/10 md:hidden"
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

      {showTopNav ? <TopBarNav onNavigate={onNavigate} /> : null}

      {showBreadcrumbsInHeader ? (
        <Breadcrumb className="min-w-0 flex-1 overflow-hidden">
          <BreadcrumbList className="text-xs text-brandBar-foreground/85 sm:text-sm">
            {crumbs.map((c, i) => {
              const isLast = i === crumbs.length - 1;
              return (
                <Fragment key={`${c.label}-${i}`}>
                  {i > 0 ? (
                    <BreadcrumbSeparator className="text-brandBar-foreground/40 [&>span]:text-brandBar-foreground/40">
                      /
                    </BreadcrumbSeparator>
                  ) : null}
                  <BreadcrumbItem>
                    {c.href && !isLast ? (
                      <BreadcrumbLink asChild>
                        <Link
                          href={c.href}
                          className="text-brandBar-foreground/75 hover:text-brandBar-foreground"
                        >
                          {c.label}
                        </Link>
                      </BreadcrumbLink>
                    ) : isLast ? (
                      <BreadcrumbPage className="text-brandBar-foreground">
                        {c.label}
                      </BreadcrumbPage>
                    ) : (
                      <span className="text-brandBar-foreground/75">
                        {c.label}
                      </span>
                    )}
                  </BreadcrumbItem>
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      ) : (
        <div className="min-w-0 flex-1" aria-hidden />
      )}

      <DropdownMenu dir="rtl">
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            dir="rtl"
            className="flex shrink-0 items-center gap-2.5 rounded-lg border border-brandBar-foreground/25 bg-brandBar-foreground/10 px-2.5 py-1.5 text-start text-brandBar-foreground transition-colors hover:bg-brandBar-foreground/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandBar-foreground/40"
            aria-label="منوی کاربری"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brandBar-foreground text-xs font-semibold text-brandBar">
              {initials}
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="text-sm font-medium text-brandBar-foreground">
                {USER_NAME}
              </span>
              <span className="text-xs text-brandBar-foreground/75">
                {USER_ROLE}
              </span>
            </span>
            <svg
              className="hidden size-3.5 shrink-0 text-brandBar-foreground/75 sm:block"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <div dir="rtl">
          <DropdownMenuLabel className="font-normal">
            <div className="flex items-center gap-2.5 py-1">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {initials}
              </span>
              <div className="min-w-0 flex flex-col items-start leading-tight text-start">
                <span className="text-sm font-semibold text-foreground">
                  {USER_NAME}
                </span>
                <span className="text-xs text-muted-foreground">{USER_ROLE}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              href="/profile"
              className="flex w-full cursor-pointer items-center gap-2"
            >
              <svg
                className="size-4 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              پروفایل
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="/settings"
              className="flex w-full cursor-pointer items-center gap-2"
            >
              <svg
                className="size-4 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              تنظیمات
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex w-full min-w-0 cursor-pointer items-center gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive">
            <svg
              className="size-4 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
              />
            </svg>
            خروج
          </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
