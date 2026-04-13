import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  cn,
  formatGregorianDateToPersianDisplay,
} from "@repo/ui";
import { ArrowLeft2, Timer1 } from "iconsax-react";
import Link from "next/link";
import type { ReactNode } from "react";
import type { MockPurchaseProject } from "../../lib/mock-purchase-projects";
import {
  discountTypeLabel,
  type MockSalePlan,
} from "../../lib/mock-sale-plans";

function formatFaNumberString(s: string): string {
  const n = Number(String(s).replace(/,/g, ""));
  return Number.isFinite(n) ? n.toLocaleString("fa-IR") : s;
}

/** Theme tokens from tailwind.config (nav-*), not arbitrary hsl brackets. */
const SECTION_ACCENT = {
  inventory: {
    border: "border-t-nav-inventory",
    title: "text-nav-inventory",
    button: "border-nav-inventory/40 hover:bg-nav-inventory/10",
  },
  sales: {
    border: "border-t-nav-sales",
    title: "text-nav-sales",
    button: "border-nav-sales/40 hover:bg-nav-sales/10",
  },
  reports: {
    border: "border-t-nav-reports",
    title: "text-nav-reports",
    button: "border-nav-reports/40 hover:bg-nav-reports/10",
  },
} as const;

type SectionAccentKey = keyof typeof SECTION_ACCENT;

function SectionShell({
  title,
  description,
  section,
  href,
  linkLabel,
  children,
}: {
  title: string;
  description: string;
  section: SectionAccentKey;
  href: string;
  linkLabel: string;
  children: ReactNode;
}) {
  const a = SECTION_ACCENT[section];
  return (
    <Card
      className={cn(
        "overflow-hidden border-border/80 border-t-4 shadow-sm",
        a.border,
      )}
    >
      <CardHeader className="flex flex-col gap-4 border-b border-border/50 bg-muted/25 px-4 pb-4 pt-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="min-w-0 space-y-1">
          <CardTitle
            className={cn("text-lg font-semibold leading-tight tracking-tight", a.title)}
          >
            {title}
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed">{description}</CardDescription>
        </div>
        <Button
          asChild
          variant="outline"
          size="sm"
          className={cn("shrink-0 gap-1.5", a.button)}
        >
          <Link href={href}>{linkLabel}</Link>
        </Button>
      </CardHeader>
      <CardContent className="p-4 sm:p-5">{children}</CardContent>
    </Card>
  );
}

function PurchaseRow({ row }: { row: MockPurchaseProject }) {
  return (
    <li>
      <div
        className={cn(
          "group relative overflow-hidden rounded-2xl border border-border/55",
          "bg-gradient-to-br from-card via-card to-nav-inventory/[0.06]",
          "p-4 shadow-sm ring-1 ring-black/[0.03] transition-all duration-200",
          "hover:border-nav-inventory/40 hover:shadow-md dark:ring-white/[0.04]",
        )}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="min-w-0 flex-1 space-y-1">
            <p className="text-sm font-semibold leading-snug text-foreground">
              {row.productName}
            </p>
            <p className="text-xs text-muted-foreground">{row.provider}</p>
          </div>
          <div className="flex shrink-0 flex-col items-stretch gap-2 sm:items-end">
            <div
              className={cn(
                "inline-flex max-w-full items-center gap-2 rounded-xl border border-border/60",
                "bg-muted/60 px-3 py-1.5 dark:bg-muted/40",
              )}
              dir="rtl"
            >
              <span className="text-xs text-muted-foreground">ریال</span>
              <span dir="ltr" className="text-sm font-semibold tabular-nums text-foreground">
                {formatFaNumberString(row.totalAmount)}
              </span>
            </div>
            <time
              className="text-xs font-medium tabular-nums text-muted-foreground"
              dateTime={row.purchasedAt}
              dir="rtl"
            >
              {formatGregorianDateToPersianDisplay(row.purchasedAt)}
            </time>
          </div>
        </div>
      </div>
    </li>
  );
}

function SalePlanRow({ row }: { row: MockSalePlan }) {
  return (
    <li>
      <div
        className={cn(
          "group relative overflow-hidden rounded-2xl border border-border/55",
          "bg-gradient-to-br from-card via-card to-nav-sales/[0.07]",
          "p-4 shadow-sm ring-1 ring-black/[0.03] transition-all duration-200",
          "hover:border-nav-sales/40 hover:shadow-md dark:ring-white/[0.04]",
        )}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0 flex-1 space-y-1">
            <p className="text-sm font-semibold leading-snug text-foreground">{row.productName}</p>
            <div
              className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground"
              dir="rtl"
            >
              <span className="tabular-nums">
                شروع: {formatGregorianDateToPersianDisplay(row.startAt)}
              </span>
              <ArrowLeft2
                size={14}
                variant="Linear"
                className="shrink-0 opacity-60"
                aria-hidden
              />
              <span className="tabular-nums">
                پایان: {formatGregorianDateToPersianDisplay(row.endAt)}
              </span>
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-stretch gap-1 sm:items-end">
            <span className="text-[0.65rem] font-medium uppercase tracking-wide text-muted-foreground">
              قیمت فروش
            </span>
            <span
              className="inline-flex w-fit rounded-xl border border-border/60 bg-muted/60 px-3 py-1.5 text-sm font-semibold tabular-nums dark:bg-muted/40"
              dir="ltr"
            >
              {formatFaNumberString(row.salePrice)}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}

function DiscountTypeChip({ type }: { type: MockSalePlan["discountType"] }) {
  const isPercent = type === "PERCENT";
  return (
    <span
      className={cn(
        "inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        isPercent
          ? "bg-nav-sales/14 text-nav-sales"
          : "bg-nav-inventory/14 text-nav-inventory",
      )}
    >
      {discountTypeLabel(type)}
    </span>
  );
}

function ExpiringRow({ row }: { row: MockSalePlan }) {
  return (
    <li>
      <div
        className={cn(
          "group relative overflow-hidden rounded-2xl border border-border/55",
          "bg-gradient-to-br from-card via-card to-nav-reports/[0.08]",
          "p-4 shadow-sm ring-1 ring-black/[0.03] transition-all duration-200",
          "hover:border-nav-reports/45 hover:shadow-md dark:ring-white/[0.04]",
        )}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="min-w-0 flex-1 space-y-2">
            <p className="text-sm font-semibold leading-snug text-foreground">{row.productName}</p>
            <div className="flex flex-wrap items-center gap-2">
              <DiscountTypeChip type={row.discountType} />
              {row.discountType === "PERCENT" ? (
                <span
                  className="inline-flex items-baseline gap-0.5 rounded-lg bg-muted/70 px-2.5 py-1 text-xs font-semibold tabular-nums text-foreground dark:bg-muted/35"
                  dir="ltr"
                >
                  {formatFaNumberString(row.discountAmount)}
                  <span className="text-[0.7rem] font-medium text-muted-foreground">٪</span>
                </span>
              ) : (
                <span
                  className="inline-flex items-center gap-1.5 rounded-lg bg-muted/70 px-2.5 py-1 text-xs font-semibold tabular-nums text-foreground dark:bg-muted/35"
                  dir="rtl"
                >
                  <span className="text-[0.65rem] font-normal text-muted-foreground">ریال</span>
                  <span dir="ltr">{formatFaNumberString(row.discountAmount)}</span>
                </span>
              )}
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-stretch gap-1.5 sm:items-end">
            <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Timer1 size={16} variant="Bulk" className="text-nav-reports" />
              پایان اعتبار
            </span>
            <time
              className="text-sm font-semibold tabular-nums text-nav-reports"
              dateTime={row.endAt}
              dir="rtl"
            >
              {formatGregorianDateToPersianDisplay(row.endAt)}
            </time>
          </div>
        </div>
      </div>
    </li>
  );
}

export function OverviewRecentPurchasesSection({
  rows,
}: {
  rows: MockPurchaseProject[];
}) {
  return (
    <SectionShell
      title="آخرین خریدها"
      description="۵ مورد اخیر از پروژه‌های خرید"
      section="inventory"
      href="/inventory/purchases"
      linkLabel="همه"
    >
      <ul className="space-y-2.5" role="list">
        {rows.map((row) => (
          <PurchaseRow key={row.id} row={row} />
        ))}
      </ul>
    </SectionShell>
  );
}

export function OverviewRecentSalePlansSection({ rows }: { rows: MockSalePlan[] }) {
  return (
    <SectionShell
      title="آخرین برنامه‌های فروش"
      description="۵ مورد اخیر ثبت‌شده"
      section="sales"
      href="/sales/plan"
      linkLabel="همه"
    >
      <ul className="space-y-2.5" role="list">
        {rows.map((row) => (
          <SalePlanRow key={row.id} row={row} />
        ))}
      </ul>
    </SectionShell>
  );
}

export function OverviewExpiringSalePlansSection({ rows }: { rows: MockSalePlan[] }) {
  return (
    <SectionShell
      title="برنامه‌های فروش در حال اتمام"
      description="پایان اعتبار در ۷ روز آینده"
      section="reports"
      href="/sales/plan"
      linkLabel="مدیریت"
    >
      {rows.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border/70 bg-muted/20 px-4 py-10 text-center text-sm text-muted-foreground">
          در این بازه برنامه‌ای برای اتمام ثبت نشده است.
        </p>
      ) : (
        <ul className="space-y-2.5" role="list">
          {rows.map((row) => (
            <ExpiringRow key={row.id} row={row} />
          ))}
        </ul>
      )}
    </SectionShell>
  );
}
