/**
 * UI state for the new customer form (no backend model yet).
 */
export type CustomerFormValues = {
  name: string;
  phone: string;
  notes: string;
};

export const INITIAL_CUSTOMER_FORM_VALUES: CustomerFormValues = {
  name: "",
  phone: "",
  notes: "",
};
