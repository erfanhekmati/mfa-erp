"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui";
import { Box, Chart21, ShoppingCart, Timer1 } from "iconsax-react";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  getOverviewStatsForBranch,
  OVERVIEW_BRANCH_ALL,
  type OverviewBranchFilter,
  type OverviewStats,
} from "../../lib/overview-stats";
import { OverviewBranchSelect } from "./overview-branch-select";
import {
  OverviewExpiringSalePlansSection,
  OverviewRecentPurchasesSection,
  OverviewRecentSalePlansSection,
} from "./overview-activity-sections";
import { OverviewChartsSection } from "./overview-charts-section";
import { OverviewRankingsSection } from "./overview-rankings-section";

/**
 * ثابت‌های رنگ داشبورد (همان پالت تم default در globals.css)،
 * تا با تغییر تم یا data-section خوانایی کارت‌های KPI حفظ شود.
 */
const KPI_ICON_ACCENT: CSSProperties[] = [
  { backgroundColor: "hsl(221 83% 53% / 0.12)", color: "hsl(221 83% 53%)" },
  { backgroundColor: "hsl(142 71% 40% / 0.12)", color: "hsl(142 71% 40%)" },
  { backgroundColor: "hsl(45 97% 44% / 0.12)", color: "hsl(45 97% 44%)" },
  { backgroundColor: "hsl(0 72% 51% / 0.12)", color: "hsl(0 72% 51%)" },
  { backgroundColor: "hsl(262 83% 56% / 0.12)", color: "hsl(262 83% 56%)" },
  { backgroundColor: "hsl(199 89% 48% / 0.12)", color: "hsl(199 89% 48%)" },
];

function kpiIconAccentStyle(index: number): CSSProperties {
  return KPI_ICON_ACCENT[index % KPI_ICON_ACCENT.length]!;
}

function formatFaAmount(n: number): string {
  return Math.round(n).toLocaleString("fa-IR");
}

function KpiCard({
  title,
  value,
  hint,
  icon,
  accentIndex,
}: {
  title: string;
  value: string;
  hint?: string;
  icon: ReactNode;
  accentIndex: number;
}) {
  return (
    <Card className="border-border/80 shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-5 pt-5">
        <div className="space-y-1">
          <CardDescription className="text-xs font-medium">{title}</CardDescription>
          <CardTitle className="text-2xl font-bold tabular-nums tracking-tight">
            {value}
          </CardTitle>
          {hint ? (
            <p className="text-xs text-muted-foreground">{hint}</p>
          ) : null}
        </div>
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-xl"
          style={kpiIconAccentStyle(accentIndex)}
          aria-hidden
        >
          {icon}
        </div>
      </CardHeader>
    </Card>
  );
}

export function OverviewDashboard({ statsAll }: { statsAll: OverviewStats }) {
  const [branch, setBranch] = useState<OverviewBranchFilter>(OVERVIEW_BRANCH_ALL);

  const stats = useMemo(
    () =>
      branch === OVERVIEW_BRANCH_ALL
        ? statsAll
        : getOverviewStatsForBranch(branch),
    [branch, statsAll],
  );

  const { kpis } = stats;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 pb-8" dir="rtl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">شعبه</span>
              <OverviewBranchSelect
                value={branch}
                onChange={setBranch}
                ariaLabel="انتخاب شعبه برای نمای کلی"
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            خلاصه وضعیت خریدها و برنامه‌های فروش بر اساس داده‌های نمونه
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            asChild
            size="sm"
            variant="outline"
            className="border-nav-inventory/45 hover:bg-nav-inventory/8"
          >
            <Link href="/inventory/purchases">پروژه‌های خرید</Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="border-nav-sales/45 hover:bg-nav-sales/8"
          >
            <Link href="/sales/plan">برنامه فروش</Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="border-nav-reports/45 hover:bg-nav-reports/8"
          >
            <Link href="/reports">گزارش‌ها</Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="border-nav-base-info/45 hover:bg-nav-base-info/8"
          >
            <Link href="/inventory/products">کالاها</Link>
          </Button>
        </div>
      </div>

      <section
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
        aria-label="شاخص‌های کلیدی"
      >
        <KpiCard
          title="مجموع مبلغ خریدها"
          value={formatFaAmount(kpis.totalPurchaseAmount)}
          hint="ریال"
          accentIndex={0}
          icon={<Chart21 size={22} variant="Bulk" color="currentColor" />}
        />
        <KpiCard
          title="تعداد پروژه خرید"
          value={kpis.purchaseProjectCount.toLocaleString("fa-IR")}
          accentIndex={1}
          icon={<Box size={22} variant="Bulk" color="currentColor" />}
        />
        <KpiCard
          title="برنامه فروش فعال"
          value={kpis.activeSalePlanCount.toLocaleString("fa-IR")}
          hint="در بازه تاریخ امروز"
          accentIndex={2}
          icon={<ShoppingCart size={22} variant="Bulk" color="currentColor" />}
        />
        <KpiCard
          title="برنامه فروش در حال اتمام"
          value={kpis.expiringSalePlanCount.toLocaleString("fa-IR")}
          hint="۷ روز آینده"
          accentIndex={3}
          icon={<Timer1 size={22} variant="Bulk" color="currentColor" />}
        />
        <KpiCard
          title="شعب"
          value={kpis.uniqueBranchCount.toLocaleString("fa-IR")}
          accentIndex={4}
          icon={<Box size={22} variant="Bulk" color="currentColor" />}
        />
        <KpiCard
          title="تامین‌کنندگان"
          value={kpis.uniqueProviderCount.toLocaleString("fa-IR")}
          accentIndex={5}
          icon={<Chart21 size={22} variant="Bulk" color="currentColor" />}
        />
      </section>

      <OverviewChartsSection
        stats={stats}
        showBranchPieCharts={branch === OVERVIEW_BRANCH_ALL}
      />

      <OverviewRankingsSection stats={stats} />

      <section className="grid gap-6 lg:grid-cols-2" aria-label="جداول تازه">
        <OverviewRecentPurchasesSection rows={stats.recentPurchases} />
        <OverviewRecentSalePlansSection rows={stats.recentSalePlans} />
        <div className="lg:col-span-2">
          <OverviewExpiringSalePlansSection rows={stats.expiringSalePlans} />
        </div>
      </section>
    </div>
  );
}
