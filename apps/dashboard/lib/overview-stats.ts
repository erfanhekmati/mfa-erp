import {
  MOCK_PURCHASE_PROJECTS,
  type MockPurchaseProject,
} from "./mock-purchase-projects";
import { MOCK_SALE_PLANS, type MockSalePlan } from "./mock-sale-plans";

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

export type DiscountSplit = {
  type: "PERCENT" | "FIXED";
  count: number;
};

export type OverviewStats = {
  kpis: OverviewKpis;
  purchaseByMonth: MonthTotal[];
  purchaseByBranch: NamedTotal[];
  purchaseByProvider: NamedTotal[];
  productPurchaseShare: NamedTotal[];
  salePlansByDiscount: DiscountSplit[];
  recentPurchases: MockPurchaseProject[];
  recentSalePlans: MockSalePlan[];
  expiringSalePlans: MockSalePlan[];
};

export function getOverviewStats(): OverviewStats {
  const today = todayYmd();
  const weekEnd = addDaysYmd(today, 7);

  let totalPurchaseAmount = 0;
  const branchTotals = new Map<string, number>();
  const providerTotals = new Map<string, number>();
  const productTotals = new Map<string, number>();
  const monthTotals = new Map<string, number>();

  for (const row of MOCK_PURCHASE_PROJECTS) {
    const amt = parseAmount(row.totalAmount);
    totalPurchaseAmount += amt;
    branchTotals.set(
      row.branchName,
      (branchTotals.get(row.branchName) ?? 0) + amt,
    );
    providerTotals.set(
      row.provider,
      (providerTotals.get(row.provider) ?? 0) + amt,
    );
    productTotals.set(
      row.productName,
      (productTotals.get(row.productName) ?? 0) + amt,
    );
    const mk = monthKey(row.purchasedAt);
    monthTotals.set(mk, (monthTotals.get(mk) ?? 0) + amt);
  }

  const purchaseByMonth: MonthTotal[] = [...monthTotals.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, total]) => ({
      key,
      label: monthLabelFa(key),
      total,
    }));

  const purchaseByBranch: NamedTotal[] = [...branchTotals.entries()]
    .map(([name, total]) => ({ name, total }))
    .sort((a, b) => b.total - a.total);

  const purchaseByProvider: NamedTotal[] = [...providerTotals.entries()]
    .map(([name, total]) => ({ name, total }))
    .sort((a, b) => b.total - a.total);

  const productPurchaseShare: NamedTotal[] = [...productTotals.entries()]
    .map(([name, total]) => ({ name, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 8);

  const activeSalePlanCount = MOCK_SALE_PLANS.filter(
    (r) => r.startAt <= today && r.endAt >= today,
  ).length;

  const expiringSalePlans = MOCK_SALE_PLANS.filter(
    (r) => r.endAt >= today && r.endAt <= weekEnd,
  ).sort((a, b) => a.endAt.localeCompare(b.endAt));

  const expiringSalePlanCount = expiringSalePlans.length;

  const discountCount = { PERCENT: 0, FIXED: 0 } as Record<
    "PERCENT" | "FIXED",
    number
  >;
  for (const r of MOCK_SALE_PLANS) {
    discountCount[r.discountType] += 1;
  }
  const salePlansByDiscount: DiscountSplit[] = [
    { type: "PERCENT", count: discountCount.PERCENT },
    { type: "FIXED", count: discountCount.FIXED },
  ];

  const recentPurchases = [...MOCK_PURCHASE_PROJECTS].sort((a, b) =>
    b.purchasedAt.localeCompare(a.purchasedAt),
  ).slice(0, 5);

  const recentSalePlans = [...MOCK_SALE_PLANS].sort((a, b) =>
    b.startAt.localeCompare(a.startAt),
  ).slice(0, 5);

  return {
    kpis: {
      totalPurchaseAmount,
      purchaseProjectCount: MOCK_PURCHASE_PROJECTS.length,
      activeSalePlanCount,
      expiringSalePlanCount,
      uniqueBranchCount: branchTotals.size,
      uniqueProviderCount: providerTotals.size,
    },
    purchaseByMonth,
    purchaseByBranch,
    purchaseByProvider,
    productPurchaseShare,
    salePlansByDiscount,
    recentPurchases,
    recentSalePlans,
    expiringSalePlans,
  };
}
