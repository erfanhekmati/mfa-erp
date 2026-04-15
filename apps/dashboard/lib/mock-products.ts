/**
 * Demo rows for the products list UI.
 * Replace with API / Prisma when backend is wired.
 * @see packages/database/prisma/schema.prisma — model Product
 */
export type MockProductRow = {
  id: string;
  code: string;
  name: string;
  /** Stored unit code; display via `unitLabelForCode` */
  unit: string;
  description: string;
  /** ISO date YYYY-MM-DD for filtering */
  createdAt: string;
};

/** Same codes as UNITS in add-product-form.tsx */
export const PRODUCT_UNIT_LABELS: Record<string, string> = {
  ton: "تن",
  kg: "کیلوگرم",
  meter: "متر",
  square_meter: "متر مربع",
  piece: "عدد",
  roll: "رول",
  sheet: "ورق",
  bar: "شاخه",
};

export function unitLabelForCode(unit: string): string {
  return PRODUCT_UNIT_LABELS[unit] ?? unit;
}

export const MOCK_PRODUCTS: MockProductRow[] = [
  {
    id: "p_001",
    code: "STL-RB-14",
    name: "میلگرد A3 سایز ۱۴",
    unit: "ton",
    description: "میلگرد آجدار برای بتن‌ریزی سازه‌ای",
    createdAt: "2025-11-02",
  },
  {
    id: "p_002",
    code: "STL-IPE-200",
    name: "تیرآهن IPE ۲۰۰",
    unit: "ton",
    description: "پروفیل استاندارد اروپایی",
    createdAt: "2025-11-15",
  },
  {
    id: "p_003",
    code: "SH-BLK-6",
    name: "ورق سیاه ۶ میل",
    unit: "sheet",
    description: "ورق فولادی گرم‌نورد شده",
    createdAt: "2025-12-01",
  },
  {
    id: "p_004",
    code: "ANG-100",
    name: "نبشی ۱۰۰",
    unit: "bar",
    description: "نبشی متساوی‌الساقین",
    createdAt: "2025-12-10",
  },
  {
    id: "p_005",
    code: "GAL-06",
    name: "ورق گالوانیزه ۰.۶ میل",
    unit: "sheet",
    description: "ورق روغنی گالوانیزه برای سقف",
    createdAt: "2026-01-05",
  },
  {
    id: "p_006",
    code: "STL-RB-12",
    name: "میلگرد A2 سایز ۱۲",
    unit: "ton",
    description: "میلگرد نرم برای کارهای غیرسازه‌ای",
    createdAt: "2026-01-18",
  },
  {
    id: "p_007",
    code: "PIPE-2IN",
    name: "لوله درزدار ۲ اینچ",
    unit: "piece",
    description: "لوله سیاه برای تاسیسات",
    createdAt: "2026-02-01",
  },
  {
    id: "p_008",
    code: "MESH-66",
    name: "مش ۶۶ فولادی",
    unit: "square_meter",
    description: "مش جوشی برای دال و رویه",
    createdAt: "2026-02-14",
  },
  {
    id: "p_009",
    code: "COIL-HR-3",
    name: "کلاف نورد گرم ۳ میل",
    unit: "kg",
    description: "کلاف برای برش طولی",
    createdAt: "2026-03-01",
  },
  {
    id: "p_010",
    code: "CR-STRIP",
    name: "ورق برش طولی عرض ۲۰۰",
    unit: "meter",
    description: "برش از کلاف بر حسب متراژ",
    createdAt: "2026-03-10",
  },
  {
    id: "p_011",
    code: "RB-10-A3",
    name: "میلگرد A3 سایز ۱۰",
    unit: "ton",
    description: "سایز پرمصرف بتن‌ریزی",
    createdAt: "2026-03-12",
  },
];
