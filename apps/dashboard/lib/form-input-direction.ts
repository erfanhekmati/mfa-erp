/**
 * @see apps/dashboard/app/globals.css — `.input-text-fa`, `.textarea-text-fa`, `.input-ltr-fa-placeholder`
 * (Plain CSS so styles always apply; use with matching `dir` on the control where noted.)
 */

/** متن فارسی — همراه با `dir="rtl"` روی همان کنترل */
export const cnInputPersian = "input-text-fa";

/** textarea فارسی — همراه با `dir="rtl"` */
export const cnTextareaPersian = "textarea-text-fa";

/** تلفن، کد ملی، مبالغ — همراه با `dir="ltr"`؛ placeholder فارسی راست، مقدار از چپ */
export const cnInputLtrFaPlaceholder = "input-ltr-fa-placeholder";

/**
 * پایهٔ استایل textarea هم‌تراز با `Input` و `SelectTrigger` در `@repo/ui`
 * (حاشیه، فوکوس حلقه‌ای). برای `dir="rtl"` همراه با `cnTextareaPersian` بکار رود.
 */
export const cnFieldTextareaBase =
  "block w-full max-w-none rounded-lg border border-input bg-background px-3 py-2 text-sm leading-relaxed text-foreground shadow-sm ring-offset-background transition-colors placeholder:text-muted-foreground hover:border-input/90 hover:bg-muted/30 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

/**
 * برای textareaهای `dir="rtl"` که آیکون با `absolute right-3 top-3` دارند؛
 * `pt-9` و `pe-14` متن و placeholder را از زیر آیکون کنار می‌زنند (بعد از `cnFieldTextareaBase`).
 */
export const cnTextareaRtlIconPadding =
  "!pt-9 !pe-14 !pb-2 !ps-3";
