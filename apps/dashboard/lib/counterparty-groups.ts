/**
 * گروه‌های طرف حساب — مدل و ذخیره‌سازی محلی (تا اتصال به API).
 */

export const COUNTERPARTY_GROUPS_CHANGED_EVENT = "erp:counterparty-groups";

const STORAGE_KEY = "erp.counterpartyGroups.v1";

/**
 * دسترسی‌ها به تفکیک حوزه؛ هر حوزه سوییچ سراسری دارد.
 */
export const COUNTERPARTY_PERMISSION_SECTIONS = [
  {
    id: "sales",
    title: "فروش",
    permissions: [
      { id: "sales_dashboard", label: "مشاهده داشبورد و خلاصه فروش" },
      { id: "sales_kpi", label: "شاخص‌های فروش، هدف و تحقق بودجه" },
      { id: "sales_plan_view", label: "مشاهده برنامه‌های فروش" },
      { id: "sales_plan_edit", label: "ثبت و ویرایش برنامه فروش" },
      { id: "sales_plan_approve", label: "تأیید و ابطال برنامه فروش" },
      { id: "sales_order_view", label: "مشاهده سفارشات و پیش‌فاکتورها" },
      { id: "sales_order_edit", label: "ثبت و ویرایش سفارش فروش" },
      { id: "sales_order_cancel", label: "ابطال و اصلاح سفارش پس از ثبت" },
      { id: "sales_quotation", label: "پیش‌فاکتور، استعلام قیمت و اعتبارسنجی" },
      { id: "sales_invoice", label: "صدور فاکتور، برگ خروج و اسناد فروش" },
      { id: "sales_invoice_correct", label: "اصلاحیه، برگشت از فروش و کسری" },
      { id: "sales_price_list", label: "مشاهده و مدیریت لیست قیمت فروش" },
      { id: "sales_discount", label: "تخفیفات، شرایط ویژه و سقف اعتبار" },
      { id: "sales_credit_approve", label: "تأیید اعتبار و فروش بالاتر از سقف" },
      { id: "sales_region", label: "محدوده فروش، نماینده و منطقه بندی مشتری" },
      { id: "sales_commission", label: "پورسانت، هدف فروشنده و تسویه پاداش" },
      { id: "sales_contract", label: "قراردادهای فروش، پیوست و ضمائم" },
      { id: "sales_export", label: "فروش صادراتی، ارز و اسناد گمرکی" },
      { id: "sales_sample", label: "نمونه، ارسال آزمایشی و بلامصرف" },
      { id: "sales_promo", label: "کمپین تبلیغاتی، کوپن و طرح تشویقی" },
      { id: "sales_reports", label: "گزارش‌های تفصیلی فروش و عملکرد" },
    ],
  },
  {
    id: "purchase",
    title: "خرید و تأمین",
    permissions: [
      { id: "purchase_dashboard", label: "مشاهده داشبورد خرید" },
      { id: "purchase_project_view", label: "مشاهده پروژه‌های خرید" },
      { id: "purchase_project_edit", label: "ثبت و ویرایش پروژه خرید" },
      { id: "purchase_project_approve", label: "تأیید بودجه و تغییر پروژه خرید" },
      { id: "purchase_rfq", label: "استعلام قیمت چندتأمین‌کننده (RFQ)" },
      { id: "purchase_tender", label: "مناقصه، ارزیابی پیشنهاد و انتخاب برنده" },
      { id: "purchase_order", label: "ثبت سفارش خرید و پیگیری تأمین" },
      { id: "purchase_order_change", label: "تغییر و ابطال سفارش خرید" },
      { id: "purchase_import", label: "خرید وارداتی، ترخیص و هزینه‌های جانبی" },
      { id: "purchase_receipt", label: "رسید انبار و تأیید کالای خریداری‌شده" },
      { id: "purchase_qc_hold", label: "قرنطینه کیفی و رد دریافت" },
      { id: "purchase_supplier", label: "مدیریت تأمین‌کنندگان و قراردادها" },
      { id: "purchase_supplier_score", label: "امتیازدهی و رتبه‌بندی تأمین‌کننده" },
      { id: "purchase_blanket", label: "قرارداد چارچوبی و سفارش تجمیعی" },
      { id: "purchase_invoice_match", label: "تطبیق فاکتور خرید با رسید و سفارش" },
      { id: "purchase_reports", label: "گزارش‌های خرید و مقایسه تأمین‌کننده" },
    ],
  },
  {
    id: "inventory",
    title: "انبار و موجودی",
    permissions: [
      { id: "inv_stock_view", label: "مشاهده موجودی لحظه‌ای و رزرو" },
      { id: "inv_batch", label: "ردیابی بچ، شماره ذوب و گواهی آزمایش" },
      { id: "inv_serial", label: "سریال، شاخه و شناسه یکتا کالا" },
      { id: "inv_move_inout", label: "حواله ورود، خروج و رسید/حواله انبار" },
      { id: "inv_transfer", label: "انتقال بین انبارها و شعب" },
      { id: "inv_adjust", label: "اصلاحات، ضایعات و انبارگردانی" },
      { id: "inv_count", label: "برنامه شمارش دوره‌ای و مغایرت‌گیری" },
      { id: "inv_reservation", label: "قوانین رزرو برای سفارش و تولید" },
      { id: "inv_costing", label: "مشاهده بهای تمام‌شده و ارزش موجودی" },
      { id: "inv_abc", label: "طبقه‌بندی ABC و تحلیل گردش" },
      { id: "inv_alerts", label: "هشدار حداقل موجودی و کالای کم‌گردش" },
      { id: "inv_packaging", label: "بسته‌بندی، برچسب و وزن خروج" },
    ],
  },
  {
    id: "logistics",
    title: "حمل و ارسال",
    permissions: [
      { id: "log_shipment_view", label: "مشاهده برنامه بار و وضعیت ارسال" },
      { id: "log_shipment_edit", label: "ثبت و ویرایش حمل، بارنامه و پیمانکار" },
      { id: "log_route", label: "مسیر، نرخ حمل و زون‌بندی" },
      { id: "log_vehicle", label: "ناوگان، راننده و وسیله نقلیه" },
      { id: "log_weighbridge", label: "باسکول، وزن خروج و مغایرت وزنی" },
      { id: "log_delivery_pod", label: "تحویل حضوری، امضا و رسید مشتری" },
    ],
  },
  {
    id: "production",
    title: "تولید و کیفیت",
    permissions: [
      { id: "prd_order_view", label: "مشاهده دستور کار و برنامه تولید" },
      { id: "prd_order_edit", label: "ثبت و تغییر دستور کار و مسیر تولید" },
      { id: "prd_bom", label: "فرمول مصرف، BOM و ضایعات استاندارد" },
      { id: "prd_yield", label: "گزارش تولید، ضایعات واقعی و بازیافت" },
      { id: "prd_qc_incoming", label: "کنترل کیفیت ورودی مواد و تأیید" },
      { id: "prd_qc_final", label: "کنترل کیفیت محصول نهایی و گواهی" },
      { id: "prd_equipment", label: "تجهیزات، توقف خط و نگهداری پیشگیرانه" },
    ],
  },
  {
    id: "reports",
    title: "گزارش‌ها و تحلیل",
    permissions: [
      { id: "rep_executive", label: "گزارش‌های مدیریتی و خلاصه عملکرد" },
      { id: "rep_financial", label: "گزارش‌های مالی و سود و زیان" },
      { id: "rep_inventory", label: "گزارش‌های انبار و گردش کالا" },
      { id: "rep_crm", label: "گزارش مشتریان و رفتار خرید" },
      { id: "rep_tax", label: "گزارش‌های مالیاتی و ارزش افزوده" },
      { id: "rep_regulatory", label: "گزارش‌های قانونی و نظارتی" },
      { id: "rep_custom", label: "گزارش سفارشی، فیلتر پیشرفته و ذخیره طرح" },
      { id: "rep_bi", label: "داشبورد تحلیلی، نمودار و KPI" },
      { id: "rep_export", label: "خروجی Excel، CSV و چاپ گزارش" },
      { id: "rep_schedule", label: "زمان‌بندی ارسال خودکار گزارش" },
      { id: "rep_share", label: "اشتراک‌گذاری لینک و دسترسی موقت به گزارش" },
    ],
  },
  {
    id: "base",
    title: "اطلاعات پایه",
    permissions: [
      { id: "base_product", label: "معرفی و ویرایش کالا و ویژگی‌ها" },
      { id: "base_category", label: "دسته‌بندی، برند و ویژگی تنوع کالا" },
      { id: "base_counterparty", label: "معرفی طرف حساب حقیقی و حقوقی" },
      { id: "base_cp_groups", label: "گروه‌های طرف حساب و دسترسی‌ها" },
      { id: "base_warehouse", label: "تعریف انبار، شعبه و محل نگهداری" },
      { id: "base_uom_currency", label: "واحدها، ارز و نرخ تبدیل" },
      { id: "base_tax", label: "تنظیمات مالیاتی و عناوین حسابداری" },
      { id: "base_payment_terms", label: "شرایط پرداخت، تسویه و چک‌لیست" },
      { id: "base_shipping", label: "روش ارسال، باربری و آدرس پیش‌فرض" },
      { id: "base_calendar", label: "تقویم کاری، سال مالی و تعطیلات" },
      { id: "base_numbering", label: "سری شماره‌گذاری اسناد و پیش‌نویس قالب" },
      { id: "base_price_policy", label: "سیاست قیمت‌گذاری و گرد کردن مبالغ" },
    ],
  },
  {
    id: "finance",
    title: "مالی و اسناد",
    permissions: [
      { id: "fin_receipt_pay", label: "ثبت دریافت، پرداخت و تسویه" },
      { id: "fin_cheque", label: "مدیریت چک‌های دریافتی و پرداختی" },
      { id: "fin_treasury", label: "خزانه‌داری و مانده صندوق/بانک" },
      { id: "fin_reconcile", label: "تطبیق بانکی و مغایرت‌گیری" },
      { id: "fin_journal", label: "ثبت اسناد دستی، سند افتتاحیه و اختتامیه" },
      { id: "fin_posting", label: "ثبت قطعی و ابطال اسناد حسابداری" },
      { id: "fin_docs", label: "مشاهده اسناد حسابداری و دفتر کل" },
      { id: "fin_ar_ap", label: "بدهکاران و بستانکاران تفصیلی" },
      { id: "fin_fixed_asset", label: "دارایی ثابت، استهلاک و فروش اموال" },
      { id: "fin_budget", label: "بودجه، انحراف و کنترل هزینه" },
      { id: "fin_cost_center", label: "مرکز هزینه، پروژه و تخصیص" },
      { id: "fin_close", label: "بستن دوره مالی و کنترل‌های نهایی" },
    ],
  },
  {
    id: "crm",
    title: "ارتباط با مشتری",
    permissions: [
      { id: "crm_lead", label: "سرنخ، فرصت فروش و قیف فروش" },
      { id: "crm_activity", label: "یادآور تماس، ویزیت و پیگیری" },
      { id: "crm_ticket", label: "درخواست پشتیبانی و تیکت" },
      { id: "crm_campaign", label: "کمپین ایمیل/پیامک و پیگیری پاسخ" },
      { id: "crm_survey", label: "نظرسنجی رضایت و NPS" },
    ],
  },
  {
    id: "system",
    title: "سیستم و امنیت",
    permissions: [
      { id: "sys_users", label: "مدیریت کاربران و نقش‌ها" },
      { id: "sys_sso", label: "ورود یکپارچه، LDAP و محدودیت IP" },
      { id: "sys_settings", label: "تنظیمات عمومی سامانه" },
      { id: "sys_workflow", label: "گردش کار، تأیید چندمرحله‌ای و اعلان" },
      { id: "sys_integration", label: "اتصال API، وب‌سرویس و یکپارچه‌سازی" },
      { id: "sys_webhook", label: "وب‌هوک و رویدادهای خروجی" },
      { id: "sys_notification", label: "قالب پیامک، ایمیل و اعلان درون‌برنامه" },
      { id: "sys_audit", label: "مشاهده لاگ فعالیت و ردپای تغییرات" },
      { id: "sys_backup", label: "پشتیبان‌گیری و بازیابی داده" },
      { id: "sys_mobile", label: "دسترسی اپ موبایل و دستگاه‌های مجاز" },
    ],
  },
] as const;

export const COUNTERPARTY_GROUP_PERMISSION_DEFS =
  COUNTERPARTY_PERMISSION_SECTIONS.flatMap((section) => [
    ...section.permissions,
  ]);

export type CounterpartyGroupPermissionId =
  (typeof COUNTERPARTY_GROUP_PERMISSION_DEFS)[number]["id"];

export type CounterpartyGroupPermissions = Record<
  CounterpartyGroupPermissionId,
  boolean
>;

export function createDefaultPermissions(): CounterpartyGroupPermissions {
  return Object.fromEntries(
    COUNTERPARTY_GROUP_PERMISSION_DEFS.map((d) => [d.id, false]),
  ) as CounterpartyGroupPermissions;
}

/** نگاشت از شناسه‌های قدیمی ذخیره‌شده به معادل جدید (یک‌بار پس از گسترش لیست). */
const LEGACY_PERMISSION_KEYS: Partial<
  Record<string, CounterpartyGroupPermissionId>
> = {
  sales_view: "sales_dashboard",
  sales_plan: "sales_plan_view",
  purchase_view: "purchase_project_view",
  inventory_view: "inv_stock_view",
  reports_view: "rep_executive",
  base_info: "base_product",
  counterparty_manage: "base_counterparty",
};

function migratePermissions(raw: unknown): CounterpartyGroupPermissions {
  const base = createDefaultPermissions();
  if (!raw || typeof raw !== "object") return base;
  const o = raw as Record<string, unknown>;

  for (const [legacyKey, newId] of Object.entries(LEGACY_PERMISSION_KEYS)) {
    if (!newId) continue;
    const v = o[legacyKey];
    if (typeof v === "boolean" && v) base[newId] = true;
  }

  for (const def of COUNTERPARTY_GROUP_PERMISSION_DEFS) {
    const v = o[def.id];
    if (typeof v === "boolean") base[def.id] = v;
  }
  return base;
}

export type CounterpartyGroup = {
  id: string;
  name: string;
  permissions: CounterpartyGroupPermissions;
  createdAt: string;
};

/** همهٔ دسترسی‌های یک حوزه را یکجا روشن یا خاموش می‌کند. */
export function setSectionPermissionsAll(
  permissions: CounterpartyGroupPermissions,
  sectionId: (typeof COUNTERPARTY_PERMISSION_SECTIONS)[number]["id"],
  value: boolean,
): CounterpartyGroupPermissions {
  const section = COUNTERPARTY_PERMISSION_SECTIONS.find((s) => s.id === sectionId);
  if (!section) return permissions;
  const next = { ...permissions };
  for (const p of section.permissions) {
    next[p.id] = value;
  }
  return next;
}

/** وقتی همهٔ سوییچ‌های آن حوزه روشن باشد، سوییچ سراسری هم روشن دیده می‌شود. */
export function isSectionFullyEnabled(
  permissions: CounterpartyGroupPermissions,
  sectionId: (typeof COUNTERPARTY_PERMISSION_SECTIONS)[number]["id"],
): boolean {
  const section = COUNTERPARTY_PERMISSION_SECTIONS.find((s) => s.id === sectionId);
  if (!section) return false;
  return section.permissions.every((p) => permissions[p.id]);
}

export function summarizeGroupPermissions(
  permissions: CounterpartyGroupPermissions,
): string {
  const labels = COUNTERPARTY_GROUP_PERMISSION_DEFS.filter(
    (d) => permissions[d.id],
  ).map((d) => d.label);
  if (labels.length === 0) return "بدون دسترسی";
  if (labels.length <= 3) return labels.join("، ");
  return `${labels.length} دسترسی فعال`;
}

export function loadCounterpartyGroups(): CounterpartyGroup[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (row): row is Record<string, unknown> =>
          row != null && typeof row === "object",
      )
      .map((row) => ({
        id: typeof row.id === "string" ? row.id : "",
        name: typeof row.name === "string" ? row.name : "",
        permissions: migratePermissions(row.permissions),
        createdAt:
          typeof row.createdAt === "string"
            ? row.createdAt
            : new Date().toISOString(),
      }))
      .filter((g) => g.id && g.name);
  } catch {
    return [];
  }
}

function persistCounterpartyGroups(groups: CounterpartyGroup[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(groups));
  window.dispatchEvent(new CustomEvent(COUNTERPARTY_GROUPS_CHANGED_EVENT));
}

export function addCounterpartyGroup(input: {
  name: string;
  permissions: CounterpartyGroupPermissions;
}): CounterpartyGroup {
  const name = input.name.trim();
  if (!name) {
    throw new Error("نام گروه الزامی است.");
  }
  const groups = loadCounterpartyGroups();
  const group: CounterpartyGroup = {
    id:
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `g-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    name,
    permissions: { ...input.permissions },
    createdAt: new Date().toISOString(),
  };
  persistCounterpartyGroups([group, ...groups]);
  return group;
}
