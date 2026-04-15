import {
  MOCK_PURCHASE_PROJECTS,
  type MockPurchaseProject,
} from "./mock-purchase-projects";
import { MOCK_SALE_PLANS, type MockSalePlan } from "./mock-sale-plans";
import {
  SALE_PLAN_PRICE_LINE_POINTS,
  SALE_PLAN_PRICE_LINE_PRODUCT_NAME,
} from "./sale-plan-price-line-demo";

function parseAmount(s: string): number {
  const n = Number(String(s).replace(/,/g, ""));
  return Number.isFinite(n) ? n : 0;
}

/** Local calendar YYYY-MM-DD */
function todayYmd(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function addDaysYmd(ymd: string, days: number): string {
  const d = new Date(`${ymd}T12:00:00`);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function monthKey(isoDate: string): string {
  return isoDate.slice(0, 7);
}

function monthLabelFa(yyyyMm: string): string {
  const [y, m] = yyyyMm.split("-").map(Number);
  if (!y || !m) return yyyyMm;
  const d = new Date(y, m - 1, 1);
  return new Intl.DateTimeFormat("fa-IR", {
    month: "short",
    year: "numeric",
  }).format(d);
}

/** برچسب روز شمسی کوتاه */
function dayLabelFa(ymd: string): string {
  const [y, m, day] = ymd.split("-").map(Number);
  if (!y || !m || !day) return ymd;
  const d = new Date(y, m - 1, day);
  return new Intl.DateTimeFormat("fa-IR", {
    month: "short",
    day: "numeric",
  }).format(d);
}

function yearLabelFa(yyyy: string): string {
  const y = Number(yyyy);
  if (!y) return yyyy;
  return new Intl.DateTimeFormat("fa-IR", { year: "numeric" }).format(
    new Date(y, 0, 1),
  );
}

/** YYYY-MM-DD از فیلد تاریخ/زمان. */
function purchasedYmd(iso: string): string {
  return iso.slice(0, 10);
}

/** مقدار انتخاب «همه کالاها» در فیلتر نمودارهای خطی. */
export const CHART_PRODUCT_ALL = "__all__";

function purchaseSeriesFromRows(rows: MockPurchaseProject[]): {
  purchaseByDay: MonthTotal[];
  purchaseByMonth: MonthTotal[];
  purchaseByYear: MonthTotal[];
} {
  const monthTotals = new Map<string, number>();
  const dayTotals = new Map<string, number>();
  const yearTotals = new Map<string, number>();
  for (const row of rows) {
    const amt = parseAmount(row.totalAmount);
    const mk = monthKey(row.purchasedAt);
    monthTotals.set(mk, (monthTotals.get(mk) ?? 0) + amt);
    const dk = purchasedYmd(row.purchasedAt);
    dayTotals.set(dk, (dayTotals.get(dk) ?? 0) + amt);
    const yk = dk.slice(0, 4);
    yearTotals.set(yk, (yearTotals.get(yk) ?? 0) + amt);
  }
  const purchaseByDay: MonthTotal[] = [...dayTotals.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, total]) => ({
      key,
      label: dayLabelFa(key),
      total,
    }));
  const purchaseByMonth: MonthTotal[] = [...monthTotals.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, total]) => ({
      key,
      label: monthLabelFa(key),
      total,
    }));
  const purchaseByYear: MonthTotal[] = [...yearTotals.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, total]) => ({
      key,
      label: yearLabelFa(key),
      total,
    }));
  return { purchaseByDay, purchaseByMonth, purchaseByYear };
}

function salePlanPriceSeriesFromPlans(plans: MockSalePlan[]): {
  daily: SalePlanPricePoint[];
  monthly: SalePlanPricePoint[];
  yearly: SalePlanPricePoint[];
} {
  const sorted = [...plans].sort((a, b) => a.startAt.localeCompare(b.startAt));
  const daily: SalePlanPricePoint[] = sorted.map((r) => ({
    startAt: r.startAt,
    price: parseAmount(r.salePrice),
    label: dayLabelFa(r.startAt),
  }));
  const monthMap = new Map<string, { startAt: string; price: number }>();
  for (const r of sorted) {
    const mk = monthKey(r.startAt);
    const price = parseAmount(r.salePrice);
    const cur = monthMap.get(mk);
    if (!cur || r.startAt.localeCompare(cur.startAt) >= 0) {
      monthMap.set(mk, { startAt: r.startAt, price });
    }
  }
  const monthly: SalePlanPricePoint[] = [...monthMap.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, { startAt, price }]) => ({
      startAt,
      price,
      label: monthLabelFa(key),
    }));
  const yearBest = new Map<string, { startAt: string; price: number }>();
  for (const r of sorted) {
    const y = r.startAt.slice(0, 4);
    const price = parseAmount(r.salePrice);
    const cur = yearBest.get(y);
    if (!cur || r.startAt.localeCompare(cur.startAt) >= 0) {
      yearBest.set(y, { startAt: r.startAt, price });
    }
  }
  const yearly: SalePlanPricePoint[] = [...yearBest.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([year, { price }]) => ({
      startAt: `${year}-01-01`,
      price,
      label: yearLabelFa(year),
    }));
  return { daily, monthly, yearly };
}

/** ردیف‌های نمونهٔ pp_today_* را به تاریخ امروز می‌چسباند. */
function mapDemoPurchasesToToday(
  rows: MockPurchaseProject[],
  todayYmdStr: string,
): MockPurchaseProject[] {
  return rows.map((row) => {
    if (!row.id.startsWith("pp_today_")) return row;
    const tail = row.purchasedAt.includes("T") ? row.purchasedAt.slice(10) : "T12:00:00";
    return { ...row, purchasedAt: `${todayYmdStr}${tail}` };
  });
}

const PIE_LAST_60_DAYS = 60;
const PIE_LAST_12_MONTHS_DAYS = 365;

export type OverviewKpis = {
  totalPurchaseAmount: number;
  purchaseProjectCount: number;
  activeSalePlanCount: number;
  expiringSalePlanCount: number;
  uniqueBranchCount: number;
  uniqueProviderCount: number;
};

export type MonthTotal = {
  key: string;
  label: string;
  total: number;
};

export type NamedTotal = { name: string; total: number };

/** سهم برنامه‌ها با تخفیف درصدی در مقابل مبلغ ثابت (۰–۱۰۰). */
export type DiscountMixPercent = {
  percentType: number;
  fixedType: number;
};

export type SalePlanPricePoint = {
  label: string;
  price: number;
  startAt: string;
};

export type OverviewStats = {
  kpis: OverviewKpis;
  purchaseByDay: MonthTotal[];
  purchaseByMonth: MonthTotal[];
  purchaseByYear: MonthTotal[];
  /** سهم شعبه — تمام دوره (فیلتر سالانه) */
  purchaseByBranch: NamedTotal[];
  /** سهم شعبه — ۱۲ ماه اخیر (فیلتر ماهانه) */
  purchaseByBranchLast12m: NamedTotal[];
  /** سهم شعبه — ۶۰ روز اخیر (فیلتر روزانه) */
  purchaseByBranchLast60d: NamedTotal[];
  saleShareByBranch: NamedTotal[];
  saleShareByBranchLast12m: NamedTotal[];
  saleShareByBranchLast60d: NamedTotal[];
  /** تمام دوره — فیلتر سالانه */
  purchaseByProvider: NamedTotal[];
  purchaseByProviderLast12m: NamedTotal[];
  purchaseByProviderLast60d: NamedTotal[];
  productPurchaseShare: NamedTotal[];
  productPurchaseShareLast12m: NamedTotal[];
  productPurchaseShareLast60d: NamedTotal[];
  salePlanPriceLineProductName: string;
  salePlanPriceLineDaily: SalePlanPricePoint[];
  salePlanPriceLineMonthly: SalePlanPricePoint[];
  salePlanPriceLineYearly: SalePlanPricePoint[];
  /** نام کالاها برای فیلتر نمودار خطی (خرید و قیمت فروش) */
  chartProductNames: string[];
  /** روند خرید به‌ازای هر کالا (بدون تجمیع «همه») */
  purchaseTrendByProduct: Record<
    string,
    {
      purchaseByDay: MonthTotal[];
      purchaseByMonth: MonthTotal[];
      purchaseByYear: MonthTotal[];
    }
  >;
  /** روند قیمت برنامه فروش به‌ازای هر کالا */
  salePlanPriceLineByProduct: Record<
    string,
    {
      daily: SalePlanPricePoint[];
      monthly: SalePlanPricePoint[];
      yearly: SalePlanPricePoint[];
    }
  >;
  discountMix: DiscountMixPercent;
  recentPurchases: MockPurchaseProject[];
  recentSalePlans: MockSalePlan[];
  expiringSalePlans: MockSalePlan[];
};

export function getOverviewStats(): OverviewStats {
  const today = todayYmd();
  const weekEnd = addDaysYmd(today, 7);
  const projects = mapDemoPurchasesToToday(MOCK_PURCHASE_PROJECTS, today);

  const window60 = addDaysYmd(today, -PIE_LAST_60_DAYS);
  const window12m = addDaysYmd(today, -PIE_LAST_12_MONTHS_DAYS);

  let totalPurchaseAmount = 0;
  const branchTotals = new Map<string, number>();
  const branchTotals60 = new Map<string, number>();
  const branchTotals12m = new Map<string, number>();
  const providerTotals = new Map<string, number>();
  const providerTotals60 = new Map<string, number>();
  const providerTotals12m = new Map<string, number>();
  const productTotals = new Map<string, number>();
  const productTotals60 = new Map<string, number>();
  const productTotals12m = new Map<string, number>();
  const monthTotals = new Map<string, number>();
  const dayTotals = new Map<string, number>();
  const yearTotals = new Map<string, number>();

  for (const row of projects) {
    const amt = parseAmount(row.totalAmount);
    totalPurchaseAmount += amt;
    branchTotals.set(
      row.branchName,
      (branchTotals.get(row.branchName) ?? 0) + amt,
    );
    if (row.purchasedAt >= window60) {
      branchTotals60.set(
        row.branchName,
        (branchTotals60.get(row.branchName) ?? 0) + amt,
      );
    }
    if (row.purchasedAt >= window12m) {
      branchTotals12m.set(
        row.branchName,
        (branchTotals12m.get(row.branchName) ?? 0) + amt,
      );
    }
    providerTotals.set(
      row.provider,
      (providerTotals.get(row.provider) ?? 0) + amt,
    );
    if (row.purchasedAt >= window60) {
      providerTotals60.set(
        row.provider,
        (providerTotals60.get(row.provider) ?? 0) + amt,
      );
    }
    if (row.purchasedAt >= window12m) {
      providerTotals12m.set(
        row.provider,
        (providerTotals12m.get(row.provider) ?? 0) + amt,
      );
    }
    productTotals.set(
      row.productName,
      (productTotals.get(row.productName) ?? 0) + amt,
    );
    if (row.purchasedAt >= window60) {
      productTotals60.set(
        row.productName,
        (productTotals60.get(row.productName) ?? 0) + amt,
      );
    }
    if (row.purchasedAt >= window12m) {
      productTotals12m.set(
        row.productName,
        (productTotals12m.get(row.productName) ?? 0) + amt,
      );
    }
    const mk = monthKey(row.purchasedAt);
    monthTotals.set(mk, (monthTotals.get(mk) ?? 0) + amt);
    const dk = purchasedYmd(row.purchasedAt);
    dayTotals.set(dk, (dayTotals.get(dk) ?? 0) + amt);
    const yk = dk.slice(0, 4);
    yearTotals.set(yk, (yearTotals.get(yk) ?? 0) + amt);
  }

  const purchaseByDay: MonthTotal[] = [...dayTotals.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, total]) => ({
      key,
      label: dayLabelFa(key),
      total,
    }));

  const purchaseByMonth: MonthTotal[] = [...monthTotals.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, total]) => ({
      key,
      label: monthLabelFa(key),
      total,
    }));

  const purchaseByYear: MonthTotal[] = [...yearTotals.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, total]) => ({
      key,
      label: yearLabelFa(key),
      total,
    }));

  const uniquePurchaseProducts = [...new Set(projects.map((r) => r.productName))].sort((a, b) =>
    a.localeCompare(b, "fa"),
  );
  const purchaseTrendByProduct: Record<
    string,
    {
      purchaseByDay: MonthTotal[];
      purchaseByMonth: MonthTotal[];
      purchaseByYear: MonthTotal[];
    }
  > = {};
  for (const p of uniquePurchaseProducts) {
    purchaseTrendByProduct[p] = purchaseSeriesFromRows(
      projects.filter((r) => r.productName === p),
    );
  }

  const saleProductNames = [...new Set(MOCK_SALE_PLANS.map((r) => r.productName))].sort((a, b) =>
    a.localeCompare(b, "fa"),
  );
  const salePlanPriceLineByProduct: Record<
    string,
    {
      daily: SalePlanPricePoint[];
      monthly: SalePlanPricePoint[];
      yearly: SalePlanPricePoint[];
    }
  > = {};
  for (const p of saleProductNames) {
    salePlanPriceLineByProduct[p] = salePlanPriceSeriesFromPlans(
      MOCK_SALE_PLANS.filter((r) => r.productName === p),
    );
  }

  const chartProductNames = [...new Set([...uniquePurchaseProducts, ...saleProductNames])].sort((a, b) =>
    a.localeCompare(b, "fa"),
  );

  const toNamedSorted = (m: Map<string, number>): NamedTotal[] =>
    [...m.entries()]
      .map(([name, total]) => ({ name, total }))
      .sort((a, b) => b.total - a.total);

  const purchaseByBranch = toNamedSorted(branchTotals);
  const purchaseByBranchLast12m = toNamedSorted(branchTotals12m);
  const purchaseByBranchLast60d = toNamedSorted(branchTotals60);

  const saleBranchTotals = new Map<string, number>();
  const saleBranch60 = new Map<string, number>();
  const saleBranch12m = new Map<string, number>();
  for (const r of MOCK_SALE_PLANS) {
    const amt = parseAmount(r.salePrice);
    saleBranchTotals.set(r.branchName, (saleBranchTotals.get(r.branchName) ?? 0) + amt);
    if (r.startAt >= window60) {
      saleBranch60.set(r.branchName, (saleBranch60.get(r.branchName) ?? 0) + amt);
    }
    if (r.startAt >= window12m) {
      saleBranch12m.set(r.branchName, (saleBranch12m.get(r.branchName) ?? 0) + amt);
    }
  }
  const saleShareByBranch = toNamedSorted(saleBranchTotals);
  const saleShareByBranchLast12m = toNamedSorted(saleBranch12m);
  const saleShareByBranchLast60d = toNamedSorted(saleBranch60);

  const purchaseByProvider = toNamedSorted(providerTotals);
  const purchaseByProviderLast12m = toNamedSorted(providerTotals12m);
  const purchaseByProviderLast60d = toNamedSorted(providerTotals60);

  const top8 = (m: Map<string, number>): NamedTotal[] => toNamedSorted(m).slice(0, 8);
  const productPurchaseShare = top8(productTotals);
  const productPurchaseShareLast12m = top8(productTotals12m);
  const productPurchaseShareLast60d = top8(productTotals60);

  const activeSalePlanCount = MOCK_SALE_PLANS.filter(
    (r) => r.startAt <= today && r.endAt >= today,
  ).length;

  const expiringSalePlans = MOCK_SALE_PLANS.filter(
    (r) => r.endAt >= today && r.endAt <= weekEnd,
  ).sort((a, b) => a.endAt.localeCompare(b.endAt));

  const expiringSalePlanCount = expiringSalePlans.length;

  const planTotal = MOCK_SALE_PLANS.length;
  const percentTypeCount = MOCK_SALE_PLANS.filter(
    (r) => r.discountType === "PERCENT",
  ).length;
  const fixedTypeCount = planTotal - percentTypeCount;
  const discountMix: DiscountMixPercent = {
    percentType: planTotal ? Math.round((percentTypeCount / planTotal) * 100) : 0,
    fixedType: planTotal ? Math.round((fixedTypeCount / planTotal) * 100) : 0,
  };

  const salePlanPriceLineDaily: SalePlanPricePoint[] = SALE_PLAN_PRICE_LINE_POINTS.map(
    (row) => ({
      startAt: row.startAt,
      price: parseAmount(row.salePrice),
      label: dayLabelFa(row.startAt),
    }),
  );

  const salePlanPriceLineMonthly: SalePlanPricePoint[] = SALE_PLAN_PRICE_LINE_POINTS.map(
    (row) => ({
      startAt: row.startAt,
      price: parseAmount(row.salePrice),
      label: monthLabelFa(monthKey(row.startAt)),
    }),
  );

  const salePlanPriceLineYearly: SalePlanPricePoint[] = (() => {
    const best = new Map<
      string,
      { startAt: string; price: number }
    >();
    for (const row of SALE_PLAN_PRICE_LINE_POINTS) {
      const y = row.startAt.slice(0, 4);
      const price = parseAmount(row.salePrice);
      const cur = best.get(y);
      if (!cur || row.startAt.localeCompare(cur.startAt) >= 0) {
        best.set(y, { startAt: row.startAt, price });
      }
    }
    return [...best.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([year, { price }]) => ({
        startAt: `${year}-01-01`,
        price,
        label: yearLabelFa(year),
      }));
  })();

  const recentPurchases = [...projects].sort((a, b) =>
    b.purchasedAt.localeCompare(a.purchasedAt),
  ).slice(0, 5);

  const recentSalePlans = [...MOCK_SALE_PLANS].sort((a, b) =>
    b.startAt.localeCompare(a.startAt),
  ).slice(0, 5);

  return {
    kpis: {
      totalPurchaseAmount,
      purchaseProjectCount: projects.length,
      activeSalePlanCount,
      expiringSalePlanCount,
      uniqueBranchCount: branchTotals.size,
      uniqueProviderCount: providerTotals.size,
    },
    purchaseByDay,
    purchaseByMonth,
    purchaseByYear,
    purchaseByBranch,
    purchaseByBranchLast12m,
    purchaseByBranchLast60d,
    saleShareByBranch,
    saleShareByBranchLast12m,
    saleShareByBranchLast60d,
    purchaseByProvider,
    purchaseByProviderLast12m,
    purchaseByProviderLast60d,
    productPurchaseShare,
    productPurchaseShareLast12m,
    productPurchaseShareLast60d,
    salePlanPriceLineProductName: SALE_PLAN_PRICE_LINE_PRODUCT_NAME,
    salePlanPriceLineDaily,
    salePlanPriceLineMonthly,
    salePlanPriceLineYearly,
    chartProductNames,
    purchaseTrendByProduct,
    salePlanPriceLineByProduct,
    discountMix,
    recentPurchases,
    recentSalePlans,
    expiringSalePlans,
  };
}
