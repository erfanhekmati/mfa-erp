/**
 * Demo time series: sale price per برنامه فروش start date for one product.
 * Replace with API when backend exists.
 */
export const SALE_PLAN_PRICE_LINE_PRODUCT_NAME = "میلگرد A3 سایز ۱۴";

/** نمونهٔ تجمیعی برای «همه کالاها»؛ چند نقطه با اصفهان (۲۸٫۸) و تهران (۲۹٫۵) هم‌راستا با mock برنامه‌هاست. */
export const SALE_PLAN_PRICE_LINE_POINTS: { startAt: string; salePrice: string }[] = [
  { startAt: "2025-05-18", salePrice: "24100000" },
  { startAt: "2025-07-10", salePrice: "28800000" },
  { startAt: "2025-08-30", salePrice: "27500000" },
  { startAt: "2025-10-12", salePrice: "26800000" },
  { startAt: "2025-11-25", salePrice: "27800000" },
  { startAt: "2025-12-28", salePrice: "28300000" },
  { startAt: "2026-01-05", salePrice: "29500000" },
  { startAt: "2026-02-18", salePrice: "28900000" },
  { startAt: "2026-04-05", salePrice: "30200000" },
];

/** یک روز با چند نقطهٔ قیمت — تاریخ در getOverviewStats به «امروز» نگاشت می‌شود. */
export const SALE_PLAN_PRICE_LINE_HOURLY_POINTS: { startAt: string; salePrice: string }[] = [
  { startAt: "2000-01-01T09:15:00", salePrice: "24800000" },
  { startAt: "2000-01-01T11:00:00", salePrice: "25200000" },
  { startAt: "2000-01-01T13:30:00", salePrice: "25800000" },
  { startAt: "2000-01-01T15:45:00", salePrice: "26400000" },
  { startAt: "2000-01-01T18:00:00", salePrice: "27100000" },
  { startAt: "2000-01-01T20:20:00", salePrice: "27800000" },
];
