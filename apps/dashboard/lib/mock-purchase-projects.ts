/**
 * Demo rows for the purchase projects list UI.
 * Replace with API data when backend is available.
 * @see packages/database/prisma/schema.prisma — ProviderPurchase
 */
export type MockPurchaseProject = {
  id: string;
  provider: string;
  productName: string;
  branchName: string;
  quantity: string;
  totalAmount: string;
  /** ISO date string YYYY-MM-DD for filtering */
  purchasedAt: string;
};

export const MOCK_PURCHASE_PROJECTS: MockPurchaseProject[] = [
  {
    id: "pp_001",
    provider: "فولاد مبارکه",
    productName: "میلگرد A3 سایز ۱۴",
    branchName: "تهران",
    quantity: "120.5000",
    totalAmount: "2850000000",
    purchasedAt: "2025-11-02",
  },
  {
    id: "pp_002",
    provider: "ذوب آهن اصفهان",
    productName: "تیرآهن IPE ۲۰۰",
    branchName: "اصفهان",
    quantity: "45.0000",
    totalAmount: "9200000000",
    purchasedAt: "2025-11-05",
  },
  {
    id: "pp_003",
    provider: "فولاد کاوه",
    productName: "ورق سیاه ۶ میل",
    branchName: "تهران",
    quantity: "80.2500",
    totalAmount: "4100000000",
    purchasedAt: "2025-11-08",
  },
  {
    id: "pp_004",
    provider: "فولاد البرز",
    productName: "نبشی ۱۰۰",
    branchName: "کرج",
    quantity: "200.0000",
    totalAmount: "1980000000",
    purchasedAt: "2025-11-10",
  },
  {
    id: "pp_005",
    provider: "ذوب آهن اصفهان",
    productName: "میلگرد A2 سایز ۱۲",
    branchName: "اصفهان",
    quantity: "300.0000",
    totalAmount: "5600000000",
    purchasedAt: "2025-11-12",
  },
  {
    id: "pp_006",
    provider: "فولاد خوزستان",
    productName: "ورق گالوانیزه ۰.۶",
    branchName: "اهواز",
    quantity: "55.7500",
    totalAmount: "2750000000",
    purchasedAt: "2025-11-14",
  },
  {
    id: "pp_007",
    provider: "فولاد مبارکه",
    productName: "کلاف ۵.۵ میل",
    branchName: "تهران",
    quantity: "150.0000",
    totalAmount: "3300000000",
    purchasedAt: "2025-11-15",
  },
  {
    id: "pp_008",
    provider: "فولاد کاوه",
    productName: "ورق روغنی ۲ میل",
    branchName: "کرج",
    quantity: "42.0000",
    totalAmount: "1890000000",
    purchasedAt: "2025-11-18",
  },
  {
    id: "pp_009",
    provider: "فولاد البرز",
    productName: "تیرآهن INP ۱۶۰",
    branchName: "تهران",
    quantity: "28.5000",
    totalAmount: "6100000000",
    purchasedAt: "2025-11-20",
  },
  {
    id: "pp_010",
    provider: "فولاد خوزستان",
    productName: "میلگرد A3 سایز ۱۸",
    branchName: "اهواز",
    quantity: "95.0000",
    totalAmount: "4420000000",
    purchasedAt: "2025-11-22",
  },
  {
    id: "pp_011",
    provider: "ذوب آهن اصفهان",
    productName: "نبشی ۸۰",
    branchName: "اصفهان",
    quantity: "175.2500",
    totalAmount: "1550000000",
    purchasedAt: "2025-11-24",
  },
  {
    id: "pp_012",
    provider: "فولاد مبارکه",
    productName: "ورق سیاه ۱۰ میل",
    branchName: "کرج",
    quantity: "62.0000",
    totalAmount: "5100000000",
    purchasedAt: "2025-11-26",
  },
  {
    id: "pp_013",
    provider: "فولاد کاوه",
    productName: "میلگرد A3 سایز ۱۶",
    branchName: "تهران",
    quantity: "210.0000",
    totalAmount: "3980000000",
    purchasedAt: "2025-11-28",
  },
  {
    id: "pp_014",
    provider: "فولاد البرز",
    productName: "تیرآهن IPE ۱۴۰",
    branchName: "کرج",
    quantity: "33.5000",
    totalAmount: "2850000000",
    purchasedAt: "2025-11-30",
  },
  {
    id: "pp_015",
    provider: "فولاد خوزستان",
    productName: "ورق گالوانیزه ۰.۸",
    branchName: "اهواز",
    quantity: "48.0000",
    totalAmount: "2400000000",
    purchasedAt: "2025-12-01",
  },
  {
    id: "pp_016",
    provider: "ذوب آهن اصفهان",
    productName: "کلاف ۶ میل",
    branchName: "اصفهان",
    quantity: "130.0000",
    totalAmount: "3050000000",
    purchasedAt: "2025-12-03",
  },
];

export function getUniqueBranchNames(): string[] {
  const set = new Set<string>();
  for (const row of MOCK_PURCHASE_PROJECTS) {
    set.add(row.branchName);
  }
  return [...set].sort((a, b) => a.localeCompare(b, "fa"));
}
