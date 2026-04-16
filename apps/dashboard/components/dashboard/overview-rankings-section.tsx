"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui";
import { useMemo, useState } from "react";
import type { OverviewStats } from "../../lib/overview-stats";
import {
  ChartGranularitySelect,
  type OverviewChartGranularity,
} from "./overview-granularity-select";
import { HorizontalBars } from "./overview-horizontal-bars";

type Props = { stats: OverviewStats };

function pickProviderTop8(stats: OverviewStats, g: OverviewChartGranularity) {
  const list =
    g === "day"
      ? stats.purchaseByProviderLast60d
      : g === "month"
        ? stats.purchaseByProviderLast12m
        : stats.purchaseByProvider;
  return list.slice(0, 8);
}

function pickProductTop8(stats: OverviewStats, g: OverviewChartGranularity) {
  return g === "day"
    ? stats.productPurchaseShareLast60d
    : g === "month"
      ? stats.productPurchaseShareLast12m
      : stats.productPurchaseShare;
}

function providerDescription(g: OverviewChartGranularity): string {
  switch (g) {
    case "day":
      return "۸ تأمین‌کنندهٔ اول بر اساس مبلغ — ۶۰ روز اخیر";
    case "month":
      return "۸ تأمین‌کنندهٔ اول بر اساس مبلغ — ۱۲ ماه اخیر";
    case "year":
      return "۸ تأمین‌کنندهٔ اول بر اساس مبلغ (تمام دوره)";
  }
}

function productDescription(g: OverviewChartGranularity): string {
  switch (g) {
    case "day":
      return "۸ کالای اول بر اساس مبلغ — ۶۰ روز اخیر";
    case "month":
      return "۸ کالای اول بر اساس مبلغ — ۱۲ ماه اخیر";
    case "year":
      return "۸ کالای اول بر اساس مبلغ (تمام دوره)";
  }
}

export function OverviewRankingsSection({ stats }: Props) {
  const [providerG, setProviderG] = useState<OverviewChartGranularity>("month");
  const [productG, setProductG] = useState<OverviewChartGranularity>("month");

  const providerItems = useMemo(
    () => pickProviderTop8(stats, providerG),
    [stats, providerG],
  );

  const productItems = useMemo(
    () => pickProductTop8(stats, productG),
    [stats, productG],
  );

  return (
    <section className="grid gap-6 lg:grid-cols-2" aria-label="رتبه‌بندی خرید">
      <Card className="border-border/80 shadow-sm">
        <CardHeader className="space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 space-y-1.5">
              <CardTitle className="text-base text-primary">
                خرید به تفکیک تامین‌کننده
              </CardTitle>
              <CardDescription>{providerDescription(providerG)}</CardDescription>
            </div>
            <ChartGranularitySelect
              value={providerG}
              onChange={setProviderG}
              ariaLabel="بازه زمانی خرید به تفکیک تامین‌کننده"
            />
          </div>
        </CardHeader>
        <CardContent>
          <HorizontalBars items={providerItems} />
        </CardContent>
      </Card>

      <Card className="border-border/80 shadow-sm">
        <CardHeader className="space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 space-y-1.5">
              <CardTitle className="text-base text-primary">سهم کالا از خرید</CardTitle>
              <CardDescription>{productDescription(productG)}</CardDescription>
            </div>
            <ChartGranularitySelect
              value={productG}
              onChange={setProductG}
              ariaLabel="بازه زمانی سهم کالا از خرید"
            />
          </div>
        </CardHeader>
        <CardContent>
          <HorizontalBars items={productItems} />
        </CardContent>
      </Card>
    </section>
  );
}
