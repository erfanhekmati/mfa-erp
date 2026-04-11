/**
 * Mirrors scalar fields on `SalePlan` for UI state (except `createdByUserId`, set from auth on submit).
 * @see packages/database/prisma/schema.prisma — model SalePlan
 */
export type SalePlanFormValues = {
  productId: string;
  salePrice: string;
  discountAmount: string;
  discountType: "FIXED" | "PERCENT";
  startAt: string;
  endAt: string;
};

function toDatetimeLocalValue(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function addDays(d: Date, days: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
}

export function getDefaultSalePlanFormValues(): SalePlanFormValues {
  const now = new Date();
  return {
    productId: "",
    salePrice: "",
    discountAmount: "0",
    discountType: "PERCENT",
    startAt: toDatetimeLocalValue(now),
    endAt: toDatetimeLocalValue(addDays(now, 30)),
  };
}
