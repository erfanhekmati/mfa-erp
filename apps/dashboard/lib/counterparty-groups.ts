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
      { id: "sales_dashboard", label: "مشاهده داشبورد فروش" },
      { id: "sales_order_view", label: "مشاهده سفارش و پیش‌فاکتور" },
      { id: "sales_order_edit", label: "ثبت و ویرایش سفارش فروش" },
      { id: "sales_quotation", label: "پیش‌فاکتور و استعلام قیمت" },
      { id: "sales_invoice", label: "صدور فاکتور و اسناد فروش" },
      { id: "sales_price_list", label: "مشاهده لیست قیمت فروش" },
      { id: "sales_reports", label: "گزارش‌های فروش" },
    ],
  },
  {
    id: "purchase",
    title: "تأمین",
    permissions: [
      { id: "purchase_dashboard", label: "مشاهده داشبورد خرید" },
      { id: "purchase_project_view", label: "مشاهده خریدها و فاکتور خرید" },
      { id: "purchase_project_edit", label: "ثبت و ویرایش فاکتور خرید" },
      { id: "purchase_project_approve", label: "تأیید و ابطال فاکتور خرید" },
      { id: "purchase_receipt", label: "رسید انبار و تأیید دریافت کالا" },
      { id: "purchase_reports", label: "گزارش‌های خرید" },
    ],
  },
  {
    id: "inventory",
    title: "انبار",
    permissions: [
      { id: "inv_stock_view", label: "مشاهده موجودی" },
      { id: "inv_batch", label: "ردیابی بچ و شماره ذوب" },
      { id: "inv_move_inout", label: "حواله ورود و خروج انبار" },
      { id: "inv_transfer", label: "انتقال بین انبارها" },
      { id: "inv_adjust", label: "اصلاح موجودی و ضایعات" },
    ],
  },
  {
    id: "reports",
    title: "گزارش‌ها و تحلیل",
    permissions: [
      { id: "rep_executive", label: "گزارش‌های مدیریتی" },
      { id: "rep_financial", label: "گزارش‌های مالی" },
      { id: "rep_inventory", label: "گزارش‌های انبار و گردش کالا" },
    ],
  },
  {
    id: "base",
    title: "اطلاعات پایه",
    permissions: [
      { id: "base_product", label: "کالا و ویژگی‌ها" },
      { id: "base_category", label: "گروه و برند کالا" },
      { id: "base_counterparty", label: "طرف حساب حقیقی و حقوقی" },
      { id: "base_cp_groups", label: "گروه‌های طرف حساب" },
      { id: "base_warehouse", label: "انبار و شعبه" },
      { id: "base_uom_currency", label: "واحد اندازه‌گیری و ارز" },
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
  sales_plan: "sales_order_view",
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
