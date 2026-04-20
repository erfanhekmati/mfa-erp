/**
 * آیکون کنار فیلدها: نسخهٔ `Bulk` در iconsax-react معمولاً با رنگ پرشدهٔ ثابت رندر می‌شود
 * و کلاس متن را نادیده می‌گیرد — با `!` اعمال می‌کنیم. رنگ از `--primary` تم (و در تم
 * پیش‌فرض از بخش فعلی `data-section`) می‌آید، نه از `--nav-icon-*` که در بعضی تم‌ها یکدست است.
 */
export const formFieldIconClass = {
  inventory: "shrink-0 !text-primary",
  sales: "shrink-0 !text-primary",
  baseInfo: "shrink-0 !text-primary",
  /** صفحات بدون بخش مشخص (ورود، تنظیمات عمومی): هنوز رنگ تم با کمی کاهش شدت */
  muted: "shrink-0 !text-primary/75",
} as const;
