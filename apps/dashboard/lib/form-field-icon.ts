/**
 * آیکون کنار فیلدها: نسخهٔ `Bulk` در iconsax-react معمولاً با رنگ پرشدهٔ ثابت رندر می‌شود
 * و `text-muted-foreground` را نادیده می‌گیرد. مثل `product-group-create-form`: `Linear` +
 * `color="currentColor"` + یکی از کلاس‌های زیر.
 */
export const formFieldIconClass = {
  inventory: "shrink-0 !text-nav-inventory",
  sales: "shrink-0 !text-nav-sales",
  baseInfo: "shrink-0 !text-nav-base-info",
  muted: "shrink-0 !text-muted-foreground",
} as const;
