/**
 * Demo rows for the sale plans list UI.
 * Replace with API data when backend is available.
 * @see packages/database/prisma/schema.prisma — SalePlan
 */
export type MockSalePlan = {
  id: string;
  /** شعبه فروش — demo برای سهم فروش در نمای کلی */
  branchName: "تهران" | "تبریز";
  productName: string;
  createdByName: string;
  salePrice: string;
  discountAmount: string;
  discountType: "FIXED" | "PERCENT";
  /** ISO date string YYYY-MM-DD for filtering */
  startAt: string;
  endAt: string;
};

export const MOCK_SALE_PLANS: MockSalePlan[] = [
  {
    id: "sp_001",
    branchName: "تهران",
    productName: "میلگرد A3 سایز ۱۴",
    createdByName: "علی رضایی",
    salePrice: "29500000",
    discountAmount: "5",
    discountType: "PERCENT",
    startAt: "2026-01-05",
    endAt: "2026-03-31",
  },
  {
    id: "sp_002",
    branchName: "تبریز",
    productName: "تیرآهن IPE ۲۰۰",
    createdByName: "مریم احمدی",
    salePrice: "92000000",
    discountAmount: "500000",
    discountType: "FIXED",
    startAt: "2026-01-10",
    endAt: "2026-02-28",
  },
  {
    id: "sp_003",
    branchName: "تهران",
    productName: "ورق سیاه ۶ میل",
    createdByName: "علی رضایی",
    salePrice: "51000000",
    discountAmount: "3",
    discountType: "PERCENT",
    startAt: "2026-02-01",
    endAt: "2026-04-15",
  },
  {
    id: "sp_004",
    branchName: "تبریز",
    productName: "نبشی ۱۰۰",
    createdByName: "سارا کریمی",
    salePrice: "19800000",
    discountAmount: "0",
    discountType: "PERCENT",
    startAt: "2026-02-12",
    endAt: "2026-05-30",
  },
  {
    id: "sp_005",
    branchName: "تهران",
    productName: "میلگرد A2 سایز ۱۲",
    createdByName: "مریم احمدی",
    salePrice: "56000000",
    discountAmount: "2.5",
    discountType: "PERCENT",
    startAt: "2026-02-20",
    endAt: "2026-03-20",
  },
  {
    id: "sp_006",
    branchName: "تبریز",
    productName: "ورق گالوانیزه ۰.۶",
    createdByName: "حسین محمدی",
    salePrice: "27500000",
    discountAmount: "1000000",
    discountType: "FIXED",
    startAt: "2026-03-01",
    endAt: "2026-06-01",
  },
  {
    id: "sp_007",
    branchName: "تهران",
    productName: "کلاف ۵.۵ میل",
    createdByName: "علی رضایی",
    salePrice: "33000000",
    discountAmount: "4",
    discountType: "PERCENT",
    startAt: "2026-03-08",
    endAt: "2026-04-08",
  },
  {
    id: "sp_008",
    branchName: "تبریز",
    productName: "ورق روغنی ۲ میل",
    createdByName: "سارا کریمی",
    salePrice: "18900000",
    discountAmount: "0",
    discountType: "FIXED",
    startAt: "2026-03-15",
    endAt: "2026-05-15",
  },
  {
    id: "sp_009",
    branchName: "تهران",
    productName: "تیرآهن INP ۱۶۰",
    createdByName: "مریم احمدی",
    salePrice: "61000000",
    discountAmount: "7",
    discountType: "PERCENT",
    startAt: "2026-04-01",
    endAt: "2026-07-01",
  },
  {
    id: "sp_010",
    branchName: "تبریز",
    productName: "میلگرد A3 سایز ۱۸",
    createdByName: "حسین محمدی",
    salePrice: "44200000",
    discountAmount: "1500000",
    discountType: "FIXED",
    startAt: "2026-04-10",
    endAt: "2026-05-10",
  },
  {
    id: "sp_011",
    branchName: "تهران",
    productName: "نبشی ۸۰",
    createdByName: "سارا کریمی",
    salePrice: "15500000",
    discountAmount: "1",
    discountType: "PERCENT",
    startAt: "2026-04-18",
    endAt: "2026-06-18",
  },
  {
    id: "sp_012",
    branchName: "تبریز",
    productName: "ورق سیاه ۱۰ میل",
    createdByName: "علی رضایی",
    salePrice: "51000000",
    discountAmount: "6",
    discountType: "PERCENT",
    startAt: "2026-05-01",
    endAt: "2026-08-31",
  },
];

export function getUniqueCreatedByNames(): string[] {
  const set = new Set<string>();
  for (const row of MOCK_SALE_PLANS) {
    set.add(row.createdByName);
  }
  return [...set].sort((a, b) => a.localeCompare(b, "fa"));
}

export function discountTypeLabel(t: MockSalePlan["discountType"]): string {
  return t === "PERCENT" ? "درصد" : "مبلغ ثابت";
}
