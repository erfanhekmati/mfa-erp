/**
 * گروه کالا (سلسله‌مراتبی) — مدل و ذخیره‌سازی محلی (تا اتصال به API).
 */

export const PRODUCT_GROUPS_CHANGED_EVENT = "erp:product-groups";

const STORAGE_KEY = "erp.productGroups.v1";

export type ProductGroup = {
  id: string;
  /** نام نمایشی گروه کالا (مثلاً «میلگرد A3»). */
  name: string;
  /** توضیح اختیاری برای کاربران و گزارش‌ها. */
  description: string;
  /** والد در درخت گروه‌ها؛ `null` یعنی ریشه. */
  parentId: string | null;
  createdAt: string;
};

function persistProductGroups(groups: ProductGroup[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(groups));
  window.dispatchEvent(new CustomEvent(PRODUCT_GROUPS_CHANGED_EVENT));
}

function parseRow(row: Record<string, unknown>): ProductGroup | null {
  const id = typeof row.id === "string" ? row.id : "";
  const name = typeof row.name === "string" ? row.name : "";
  if (!id || !name) return null;
  const description =
    typeof row.description === "string" ? row.description : "";
  let parentId: string | null = null;
  if (typeof row.parentId === "string" && row.parentId) {
    parentId = row.parentId;
  }
  return {
    id,
    name,
    description,
    parentId,
    createdAt:
      typeof row.createdAt === "string"
        ? row.createdAt
        : new Date().toISOString(),
  };
}

/** والدهای نامعتبر (شناسهٔ ناموجود) را به ریشه برمی‌گرداند. */
export function normalizeProductGroups(groups: ProductGroup[]): ProductGroup[] {
  const ids = new Set(groups.map((g) => g.id));
  return groups.map((g) => ({
    ...g,
    parentId: g.parentId && ids.has(g.parentId) ? g.parentId : null,
  }));
}

export function loadProductGroups(): ProductGroup[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    const rows = parsed
      .filter(
        (row): row is Record<string, unknown> =>
          row != null && typeof row === "object",
      )
      .map(parseRow)
      .filter((g): g is ProductGroup => g != null);
    return normalizeProductGroups(rows);
  } catch {
    return [];
  }
}

/** عمق گروه برای تورفتگی در جدول (ریشه = ۰). */
export function getProductGroupDepth(
  groups: ProductGroup[],
  id: string,
): number {
  const byId = new Map(groups.map((g) => [g.id, g]));
  let depth = 0;
  let current: string | undefined = id;
  const seen = new Set<string>();
  while (current && !seen.has(current)) {
    seen.add(current);
    const g = byId.get(current);
    if (!g?.parentId) break;
    depth++;
    current = g.parentId;
  }
  return depth;
}

/** برچسب مسیر از ریشه تا والد مستقیم (بدون خود گروه)، با جداکنندهٔ مناسب RTL. */
export function getProductGroupAncestorPath(
  groups: ProductGroup[],
  id: string,
): string {
  const byId = new Map(groups.map((g) => [g.id, g]));
  const names: string[] = [];
  let cur: string | null = byId.get(id)?.parentId ?? null;
  const guard = new Set<string>();
  while (cur && !guard.has(cur)) {
    guard.add(cur);
    const g = byId.get(cur);
    if (!g) break;
    names.unshift(g.name);
    cur = g.parentId;
  }
  if (names.length === 0) return "";
  return names.join(" › ");
}

/**
 * ترتیب درخت (ریشه‌ها و زیرمجموعه‌ها به‌صورت DFS)،
 * برای نمایش جدول و گزینه‌های «گروه والد».
 */
export function getProductGroupsTreeOrder(groups: ProductGroup[]): ProductGroup[] {
  const normalized = normalizeProductGroups(groups);
  const byParent = new Map<string | null, ProductGroup[]>();
  for (const g of normalized) {
    const p = g.parentId ?? null;
    if (!byParent.has(p)) byParent.set(p, []);
    byParent.get(p)!.push(g);
  }
  for (const list of byParent.values()) {
    list.sort((a, b) => a.name.localeCompare(b.name, "fa"));
  }
  const out: ProductGroup[] = [];
  function walk(parentId: string | null) {
    const kids = byParent.get(parentId) ?? [];
    for (const g of kids) {
      out.push(g);
      walk(g.id);
    }
  }
  walk(null);
  return out;
}

export function addProductGroup(input: {
  name: string;
  description?: string;
  parentId?: string | null;
}): ProductGroup {
  const name = input.name.trim();
  if (!name) {
    throw new Error("نام گروه کالا الزامی است.");
  }
  const description = (input.description ?? "").trim();
  let parentId: string | null =
    typeof input.parentId === "string" && input.parentId
      ? input.parentId
      : null;

  const groups = loadProductGroups();
  const ids = new Set(groups.map((g) => g.id));
  if (parentId && !ids.has(parentId)) {
    parentId = null;
  }

  const group: ProductGroup = {
    id:
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `pg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    name,
    description,
    parentId,
    createdAt: new Date().toISOString(),
  };
  persistProductGroups([group, ...groups]);
  return group;
}
