/**
 * Mirrors most scalar fields on `ProviderPurchase` for UI state (`freight` is not collected here).
 * @see packages/database/prisma/schema.prisma — model ProviderPurchase
 */
export type ProviderPurchaseFormValues = {
  provider: string;
  productId: string;
  branchId: string;
  quantity: string;
  unitPrice: string;
  sumPrice: string;
  taxAndDuties: string;
  totalAmount: string;
  description: string;
  purchasedAt: string;
};

function toDatetimeLocalValue(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function getDefaultProviderPurchaseFormValues(): ProviderPurchaseFormValues {
  return {
    provider: "",
    productId: "",
    branchId: "",
    quantity: "",
    unitPrice: "",
    sumPrice: "",
    taxAndDuties: "0",
    totalAmount: "",
    description: "",
    purchasedAt: toDatetimeLocalValue(new Date()),
  };
}
