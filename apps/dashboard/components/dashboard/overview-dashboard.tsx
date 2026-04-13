import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  cn,
} from "@repo/ui";
import { Box, Chart21, ShoppingCart, Timer1 } from "iconsax-react";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { OverviewStats } from "../../lib/overview-stats";
import {
  OverviewExpiringSalePlansSection,
  OverviewRecentPurchasesSection,
  OverviewRecentSalePlansSection,
} from "./overview-activity-sections";

/** Nav icon CSS variable names — same tokens as globals.css and sidebar. */
const NAV_ICON_VARS = [
  "--nav-icon-overview",
  "--nav-icon-sales",
  "--nav-icon-inventory",
  "--nav-icon-reports",
  "--nav-icon-base-info",
] as const;

type NavIconVarName = (typeof NAV_ICON_VARS)[number];

/** SVG stroke colors as fixed strings (dynamic hsl in JSX breaks Tailwind CSS extraction). */
const NAV_ICON_STROKE: Record<NavIconVarName, string> = {
  "--nav-icon-overview": "hsl(var(--nav-icon-overview))",
  "--nav-icon-sales": "hsl(var(--nav-icon-sales))",
  "--nav-icon-inventory": "hsl(var(--nav-icon-inventory))",
  "--nav-icon-reports": "hsl(var(--nav-icon-reports))",
  "--nav-icon-base-info": "hsl(var(--nav-icon-base-info))",
};

type KpiTint = NavIconVarName | "primary";

const KPI_ICON_STYLE: Record<NavIconVarName, CSSProperties> = {
  "--nav-icon-overview": {
    backgroundColor: "hsl(var(--nav-icon-overview) / 0.12)",
    color: "hsl(var(--nav-icon-overview))",
  },
  "--nav-icon-sales": {
    backgroundColor: "hsl(var(--nav-icon-sales) / 0.12)",
    color: "hsl(var(--nav-icon-sales))",
  },
  "--nav-icon-inventory": {
    backgroundColor: "hsl(var(--nav-icon-inventory) / 0.12)",
    color: "hsl(var(--nav-icon-inventory))",
  },
  "--nav-icon-reports": {
    backgroundColor: "hsl(var(--nav-icon-reports) / 0.12)",
    color: "hsl(var(--nav-icon-reports))",
  },
  "--nav-icon-base-info": {
    backgroundColor: "hsl(var(--nav-icon-base-info) / 0.12)",
    color: "hsl(var(--nav-icon-base-info))",
  },
};

function kpiIconTintStyle(tint: KpiTint): CSSProperties {
  if (tint === "primary") {
    return {
      backgroundColor: "hsl(var(--primary) / 0.12)",
      color: "hsl(var(--primary))",
    };
  }
  return KPI_ICON_STYLE[tint];
}

/** KPI card top border: theme tokens only (no arbitrary hsl brackets). */
const KPI_CARD_TOP: Record<KpiTint, string> = {
  "--nav-icon-overview": "border-t-nav-overview",
  "--nav-icon-sales": "border-t-nav-sales",
  "--nav-icon-inventory": "border-t-nav-inventory",
  "--nav-icon-reports": "border-t-nav-reports",
  "--nav-icon-base-info": "border-t-nav-base-info",
  primary: "border-t-primary",
};

const BAR_FILL: Record<NavIconVarName, string> = {
  "--nav-icon-overview": "hsl(var(--nav-icon-overview) / 0.88)",
  "--nav-icon-sales": "hsl(var(--nav-icon-sales) / 0.88)",
  "--nav-icon-inventory": "hsl(var(--nav-icon-inventory) / 0.88)",
  "--nav-icon-reports": "hsl(var(--nav-icon-reports) / 0.88)",
  "--nav-icon-base-info": "hsl(var(--nav-icon-base-info) / 0.88)",
};

function barColorByIndex(index: number): string {
  const k = NAV_ICON_VARS[index % NAV_ICON_VARS.length]!;
  return BAR_FILL[k];
}

function formatFaAmount(n: number): string {
  return Math.round(n).toLocaleString("fa-IR");
}

function maxNamedTotal(items: { total: number }[]): number {
  let m = 0;
  for (const x of items) m = Math.max(m, x.total);
  return m || 1;
}

function PurchaseTrendChart({ points }: { points: { label: string; total: number }[] }) {
  if (points.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        داده‌ای برای نمایش نیست.
      </p>
    );
  }
  const max = Math.max(...points.map((p) => p.total), 1);
  const w = 100;
  const h = 44;
  const pad = 4;
  const innerW = w - pad * 2;
  const innerH = h - pad * 2;
  const step = points.length > 1 ? innerW / (points.length - 1) : 0;
  const coords = points.map((p, i) => {
    const x = pad + (points.length === 1 ? innerW / 2 : i * step);
    const y = pad + innerH - (p.total / max) * innerH;
    return `${x},${y}`;
  });
  const polyline = coords.join(" ");
  const firstX = pad + (points.length === 1 ? innerW / 2 : 0);
  const lastX = pad + (points.length === 1 ? innerW / 2 : (points.length - 1) * step);
  const bottomY = pad + innerH;

  return (
    <div className="space-y-3">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="h-28 w-full"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="overview-trend-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--nav-icon-overview))" stopOpacity="0.28" />
            <stop offset="35%" stopColor="hsl(var(--nav-icon-sales))" stopOpacity="0.2" />
            <stop offset="55%" stopColor="hsl(var(--nav-icon-inventory))" stopOpacity="0.14" />
            <stop offset="100%" stopColor="hsl(var(--nav-icon-base-info))" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="overview-trend-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(var(--nav-icon-overview))" />
            <stop offset="25%" stopColor="hsl(var(--nav-icon-sales))" />
            <stop offset="50%" stopColor="hsl(var(--nav-icon-inventory))" />
            <stop offset="75%" stopColor="hsl(var(--nav-icon-reports))" />
            <stop offset="100%" stopColor="hsl(var(--nav-icon-base-info))" />
          </linearGradient>
        </defs>
        {points.length > 1 ? (
          <polygon
            fill="url(#overview-trend-fill)"
            points={`${polyline} ${lastX},${bottomY} ${firstX},${bottomY}`}
          />
        ) : null}
        {points.length > 1 ? (
          <polyline
            fill="none"
            stroke="url(#overview-trend-stroke)"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={polyline}
          />
        ) : null}
        {points.map((p, i) => {
          const x = pad + (points.length === 1 ? innerW / 2 : i * step);
          const y =
            pad + innerH - (p.total / max) * innerH;
          const varName = NAV_ICON_VARS[i % NAV_ICON_VARS.length]!;
          return (
            <circle
              key={p.label}
              cx={x}
              cy={y}
              r="2.25"
              className="fill-background"
              stroke={NAV_ICON_STROKE[varName]}
              strokeWidth="1.5"
            />
          );
        })}
      </svg>
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
        {points.map((p) => (
          <span key={p.label} className="tabular-nums">
            {p.label}: {formatFaAmount(p.total)}
          </span>
        ))}
      </div>
    </div>
  );
}

function HorizontalBars({ items }: { items: { name: string; total: number }[] }) {
  const max = maxNamedTotal(items);
  if (items.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-muted-foreground">موردی نیست.</p>
    );
  }
  return (
    <ul className="space-y-3">
      {items.map((row, index) => {
        const pct = (row.total / max) * 100;
        return (
          <li key={row.name} className="space-y-1">
            <div className="flex items-center justify-between gap-2 text-sm">
              <span className="min-w-0 truncate font-medium text-foreground/90">
                {row.name}
              </span>
              <span className="shrink-0 tabular-nums text-muted-foreground">
                {formatFaAmount(row.total)}
              </span>
            </div>
            <div
              className="h-2.5 overflow-hidden rounded-full bg-muted"
              role="presentation"
            >
              <div
                className="h-full rounded-full transition-[width]"
                style={{
                  width: `${pct}%`,
                  backgroundColor: barColorByIndex(index),
                }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function DiscountSplitBar({ splits }: { splits: { type: "PERCENT" | "FIXED"; count: number }[] }) {
  const total = splits.reduce((s, x) => s + x.count, 0);
  if (total === 0) {
    return (
      <p className="py-6 text-center text-sm text-muted-foreground">موردی نیست.</p>
    );
  }
  const pPct = (splits.find((x) => x.type === "PERCENT")?.count ?? 0) / total;
  const pFixed = (splits.find((x) => x.type === "FIXED")?.count ?? 0) / total;
  return (
    <div className="space-y-4">
      <div className="flex h-4 overflow-hidden rounded-full bg-muted">
        <div
          className="transition-[width]"
          style={{
            width: `${pPct * 100}%`,
            backgroundColor: "hsl(var(--nav-icon-sales) / 0.92)",
          }}
          title="درصدی"
        />
        <div
          className="transition-[width]"
          style={{
            width: `${pFixed * 100}%`,
            backgroundColor: "hsl(var(--nav-icon-inventory) / 0.88)",
          }}
          title="مبلغ ثابت"
        />
      </div>
      <ul className="flex flex-wrap gap-4 text-sm">
        <li className="flex items-center gap-2">
          <span
            className="size-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: "hsl(var(--nav-icon-sales))" }}
            aria-hidden
          />
          <span>درصدی: {(pPct * 100).toLocaleString("fa-IR", { maximumFractionDigits: 0 })}٪</span>
        </li>
        <li className="flex items-center gap-2">
          <span
            className="size-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: "hsl(var(--nav-icon-inventory))" }}
            aria-hidden
          />
          <span>
            مبلغ ثابت: {(pFixed * 100).toLocaleString("fa-IR", { maximumFractionDigits: 0 })}٪
          </span>
        </li>
      </ul>
    </div>
  );
}

function KpiCard({
  title,
  value,
  hint,
  icon,
  tint,
}: {
  title: string;
  value: string;
  hint?: string;
  icon: ReactNode;
  tint: KpiTint;
}) {
  return (
    <Card
      className={cn(
        "border-border/80 border-t-4 shadow-sm",
        KPI_CARD_TOP[tint],
      )}
    >
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
          style={kpiIconTintStyle(tint)}
          aria-hidden
        >
          {icon}
        </div>
      </CardHeader>
    </Card>
  );
}

export function OverviewDashboard({ stats }: { stats: OverviewStats }) {
  const { kpis } = stats;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 pb-8" dir="rtl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-nav-overview">
            نمای کلی
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
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
          tint="--nav-icon-overview"
          icon={<Chart21 size={22} variant="Bulk" color="currentColor" />}
        />
        <KpiCard
          title="تعداد پروژه خرید"
          value={kpis.purchaseProjectCount.toLocaleString("fa-IR")}
          tint="--nav-icon-sales"
          icon={<Box size={22} variant="Bulk" color="currentColor" />}
        />
        <KpiCard
          title="برنامه فروش فعال"
          value={kpis.activeSalePlanCount.toLocaleString("fa-IR")}
          hint="در بازه تاریخ امروز"
          tint="--nav-icon-inventory"
          icon={<ShoppingCart size={22} variant="Bulk" color="currentColor" />}
        />
        <KpiCard
          title="برنامه فروش در حال اتمام"
          value={kpis.expiringSalePlanCount.toLocaleString("fa-IR")}
          hint="۷ روز آینده"
          tint="--nav-icon-reports"
          icon={<Timer1 size={22} variant="Bulk" color="currentColor" />}
        />
        <KpiCard
          title="شعب"
          value={kpis.uniqueBranchCount.toLocaleString("fa-IR")}
          tint="--nav-icon-base-info"
          icon={<Box size={22} variant="Bulk" color="currentColor" />}
        />
        <KpiCard
          title="تامین‌کنندگان"
          value={kpis.uniqueProviderCount.toLocaleString("fa-IR")}
          tint="primary"
          icon={<Chart21 size={22} variant="Bulk" color="currentColor" />}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-2" aria-label="نمودارها">
        <Card className="border-border/80 border-t-4 border-t-nav-overview shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">روند مبلغ خرید به تفکیک ماه</CardTitle>
            <CardDescription>جمع مبلغ کل پروژه‌های خرید در هر ماه</CardDescription>
          </CardHeader>
          <CardContent>
            <PurchaseTrendChart
              points={stats.purchaseByMonth.map((m) => ({
                label: m.label,
                total: m.total,
              }))}
            />
          </CardContent>
        </Card>

        <Card className="border-border/80 border-t-4 border-t-nav-sales shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">نوع تخفیف در برنامه‌های فروش</CardTitle>
            <CardDescription>سهم برنامه‌ها با تخفیف درصدی و مبلغ ثابت</CardDescription>
          </CardHeader>
          <CardContent>
            <DiscountSplitBar splits={stats.salePlansByDiscount} />
          </CardContent>
        </Card>

        <Card className="border-border/80 border-t-4 border-t-nav-inventory shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">خرید به تفکیک شعبه</CardTitle>
            <CardDescription>جمع مبلغ کل به ازای هر شعبه</CardDescription>
          </CardHeader>
          <CardContent>
            <HorizontalBars items={stats.purchaseByBranch} />
          </CardContent>
        </Card>

        <Card className="border-border/80 border-t-4 border-t-nav-reports shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">خرید به تفکیک تامین‌کننده</CardTitle>
            <CardDescription>بر اساس مبلغ کل</CardDescription>
          </CardHeader>
          <CardContent>
            <HorizontalBars items={stats.purchaseByProvider.slice(0, 8)} />
          </CardContent>
        </Card>

        <Card className="border-border/80 border-t-4 border-t-nav-base-info shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">سهم کالا از خرید</CardTitle>
            <CardDescription>۸ کالای اول بر اساس مبلغ</CardDescription>
          </CardHeader>
          <CardContent>
            <HorizontalBars items={stats.productPurchaseShare} />
          </CardContent>
        </Card>
      </section>

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
