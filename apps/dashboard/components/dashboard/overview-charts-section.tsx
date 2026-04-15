"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui";
import { useMemo, useState } from "react";
import { CHART_PRODUCT_ALL, type OverviewStats } from "../../lib/overview-stats";
import { ChartProductSelect } from "./overview-charts-product-select";
import {
  ChartGranularitySelect,
  type OverviewChartGranularity,
} from "./overview-granularity-select";
import { PurchaseBranchPieChart } from "./purchase-branch-pie-chart";
import { PurchaseTrendChart, type XAxisKind } from "./purchase-trend-chart";
import {
  SalePlanPriceLineChart,
  type SalePlanPriceXAxisKind,
} from "./sale-plan-price-line-chart";

export type { OverviewChartGranularity };

type Props = { stats: OverviewStats };

function pickPurchaseTrendSeries(
  stats: OverviewStats,
  g: OverviewChartGranularity,
  productKey: string,
) {
  if (productKey === CHART_PRODUCT_ALL) {
    switch (g) {
      case "day":
        return stats.purchaseByDay;
      case "month":
        return stats.purchaseByMonth;
      case "year":
        return stats.purchaseByYear;
    }
  }
  const series = stats.purchaseTrendByProduct[productKey];
  if (!series) return [];
  switch (g) {
    case "day":
      return series.purchaseByDay;
    case "month":
      return series.purchaseByMonth;
    case "year":
      return series.purchaseByYear;
  }
}

function pickSaleLineSeries(
  stats: OverviewStats,
  g: OverviewChartGranularity,
  productKey: string,
) {
  if (productKey === CHART_PRODUCT_ALL) {
    switch (g) {
      case "day":
        return stats.salePlanPriceLineDaily;
      case "month":
        return stats.salePlanPriceLineMonthly;
      case "year":
        return stats.salePlanPriceLineYearly;
    }
  }
  const series = stats.salePlanPriceLineByProduct[productKey];
  if (!series) return [];
  switch (g) {
    case "day":
      return series.daily;
    case "month":
      return series.monthly;
    case "year":
      return series.yearly;
  }
}

function pickPurchasePie(stats: OverviewStats, g: OverviewChartGranularity) {
  switch (g) {
    case "day":
      return stats.purchaseByBranchLast60d;
    case "month":
      return stats.purchaseByBranchLast12m;
    case "year":
      return stats.purchaseByBranch;
  }
}

function pickSalePie(stats: OverviewStats, g: OverviewChartGranularity) {
  switch (g) {
    case "day":
      return stats.saleShareByBranchLast60d;
    case "month":
      return stats.saleShareByBranchLast12m;
    case "year":
      return stats.saleShareByBranch;
  }
}

function purchaseTrendCopy(g: OverviewChartGranularity): { title: string; desc: string } {
  switch (g) {
    case "day":
      return {
        title: "روند مبلغ خرید به تفکیک روز",
        desc: "جمع مبلغ کل پروژه‌های خرید در هر روز",
      };
    case "month":
      return {
        title: "روند مبلغ خرید به تفکیک ماه",
        desc: "جمع مبلغ کل پروژه‌های خرید در هر ماه",
      };
    case "year":
      return {
        title: "روند مبلغ خرید به تفکیک سال",
        desc: "جمع مبلغ کل پروژه‌های خرید در هر سال",
      };
  }
}

function purchasePieCopy(g: OverviewChartGranularity): string {
  switch (g) {
    case "day":
      return "جمع مبلغ به ازای هر شعبه — ۶۰ روز اخیر";
    case "month":
      return "جمع مبلغ به ازای هر شعبه — ۱۲ ماه اخیر";
    case "year":
      return "جمع مبلغ کل به ازای هر شعبه (تمام دوره)";
  }
}

function salePieCopy(g: OverviewChartGranularity): string {
  switch (g) {
    case "day":
      return "جمع قیمت فروش برنامه‌هایی که در ۶۰ روز اخیر شروع شده‌اند";
    case "month":
      return "جمع قیمت فروش برنامه‌هایی که در ۱۲ ماه اخیر شروع شده‌اند";
    case "year":
      return "جمع قیمت فروش برنامه‌ها به ازای هر شعبه (تمام دوره)";
  }
}

export function OverviewChartsSection({ stats }: Props) {
  const [purchaseTrendG, setPurchaseTrendG] =
    useState<OverviewChartGranularity>("month");
  const [purchaseTrendProduct, setPurchaseTrendProduct] = useState<string>(
    CHART_PRODUCT_ALL,
  );
  const [saleLineG, setSaleLineG] = useState<OverviewChartGranularity>("month");
  const [saleLineProduct, setSaleLineProduct] = useState<string>(CHART_PRODUCT_ALL);
  const [purchasePieG, setPurchasePieG] =
    useState<OverviewChartGranularity>("month");
  const [salePieG, setSalePieG] = useState<OverviewChartGranularity>("month");

  const purchaseTrendPoints = useMemo(
    () =>
      pickPurchaseTrendSeries(stats, purchaseTrendG, purchaseTrendProduct).map(
        (m) => ({
          label: m.label,
          total: m.total,
        }),
      ),
    [stats, purchaseTrendG, purchaseTrendProduct],
  );

  const salePricePoints = useMemo(
    () =>
      pickSaleLineSeries(stats, saleLineG, saleLineProduct).map(({ label, price }) => ({
        label,
        price,
      })),
    [stats, saleLineG, saleLineProduct],
  );

  const purchasePieItems = useMemo(
    () => pickPurchasePie(stats, purchasePieG),
    [stats, purchasePieG],
  );

  const salePieItems = useMemo(() => pickSalePie(stats, salePieG), [stats, salePieG]);

  const purchaseTrendText = purchaseTrendCopy(purchaseTrendG);
  const purchaseTrendTitle =
    purchaseTrendProduct === CHART_PRODUCT_ALL
      ? purchaseTrendText.title
      : `${purchaseTrendText.title} — ${purchaseTrendProduct}`;
  const purchaseTrendDesc =
    purchaseTrendProduct === CHART_PRODUCT_ALL
      ? purchaseTrendText.desc
      : `${purchaseTrendText.desc} (فقط این کالا)`;

  const saleLineTitle =
    saleLineProduct === CHART_PRODUCT_ALL
      ? `روند قیمت برنامه فروش — ${stats.salePlanPriceLineProductName}`
      : `روند قیمت برنامه فروش — ${saleLineProduct}`;

  return (
    <section className="space-y-6" aria-label="نمودارها">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/80 shadow-sm">
          <CardHeader className="space-y-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 space-y-1.5">
                <CardTitle className="text-base text-primary">
                  {purchaseTrendTitle}
                </CardTitle>
                <CardDescription>{purchaseTrendDesc}</CardDescription>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-2">
                <ChartProductSelect
                  value={purchaseTrendProduct}
                  onChange={setPurchaseTrendProduct}
                  productNames={stats.chartProductNames}
                  ariaLabel="کالا برای روند خرید"
                />
                <ChartGranularitySelect
                  value={purchaseTrendG}
                  onChange={setPurchaseTrendG}
                  ariaLabel="بازه زمانی روند خرید"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <PurchaseTrendChart
              points={purchaseTrendPoints}
              xAxisKind={purchaseTrendG as XAxisKind}
            />
          </CardContent>
        </Card>

        <Card className="border-border/80 shadow-sm">
          <CardHeader className="space-y-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 space-y-1.5">
                <CardTitle className="text-base">{saleLineTitle}</CardTitle>
                <CardDescription>
                  {saleLineProduct === CHART_PRODUCT_ALL
                    ? "روند قیمت فروش در بازهٔ انتخاب‌شده"
                    : "روند قیمت فروش برنامه‌ها فقط برای این کالا در بازهٔ انتخاب‌شده"}
                </CardDescription>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-2">
                <ChartProductSelect
                  value={saleLineProduct}
                  onChange={setSaleLineProduct}
                  productNames={stats.chartProductNames}
                  ariaLabel="کالا برای روند قیمت برنامه فروش"
                />
                <ChartGranularitySelect
                  value={saleLineG}
                  onChange={setSaleLineG}
                  ariaLabel="بازه زمانی روند قیمت برنامه فروش"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <SalePlanPriceLineChart
              points={salePricePoints}
              xAxisKind={saleLineG as SalePlanPriceXAxisKind}
            />
          </CardContent>
        </Card>

        <Card className="border-border/80 shadow-sm">
          <CardHeader className="space-y-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 space-y-1.5">
                <CardTitle className="text-base">خرید به تفکیک شعبه</CardTitle>
                <CardDescription>{purchasePieCopy(purchasePieG)}</CardDescription>
              </div>
              <ChartGranularitySelect
                value={purchasePieG}
                onChange={setPurchasePieG}
                ariaLabel="بازه زمانی خرید به تفکیک شعبه"
              />
            </div>
          </CardHeader>
          <CardContent>
            <PurchaseBranchPieChart items={purchasePieItems} />
          </CardContent>
        </Card>

        <Card className="border-border/80 shadow-sm">
          <CardHeader className="space-y-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 space-y-1.5">
                <CardTitle className="text-base">سهم فروش</CardTitle>
                <CardDescription>{salePieCopy(salePieG)}</CardDescription>
              </div>
              <ChartGranularitySelect
                value={salePieG}
                onChange={setSalePieG}
                ariaLabel="بازه زمانی سهم فروش به تفکیک شعبه"
              />
            </div>
          </CardHeader>
          <CardContent>
            <PurchaseBranchPieChart
              items={salePieItems}
              footerCaption="سهم هر شعبه از جمع قیمت فروش برنامه‌ها (ریال)"
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
