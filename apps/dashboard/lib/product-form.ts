/**
 * Mirrors scalar fields on `Product` for UI state.
 * @see packages/database/prisma/schema.prisma — model Product
 */
export type ProductFormValues = {
  code: string;
  name: string;
  unit: string;
  description: string;
};

export const INITIAL_PRODUCT_FORM_VALUES: ProductFormValues = {
  code: "",
  name: "",
  unit: "",
  description: "",
};
