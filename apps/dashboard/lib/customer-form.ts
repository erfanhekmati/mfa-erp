/**
 * UI state for counterparty introduction forms (no backend model yet).
 */

export type NaturalPersonFormValues = {
  name: string;
  phone: string;
  /** شناسه گروه طرف حساب (از فهرست گروه‌ها) */
  groupId: string;
  notes: string;
};

export const INITIAL_NATURAL_PERSON_VALUES: NaturalPersonFormValues = {
  name: "",
  phone: "",
  groupId: "",
  notes: "",
};

export type LegalEntityFormValues = {
  companyName: string;
  nationalId: string;
  economicCode: string;
  phone: string;
  address: string;
  notes: string;
};

export const INITIAL_LEGAL_ENTITY_VALUES: LegalEntityFormValues = {
  companyName: "",
  nationalId: "",
  economicCode: "",
  phone: "",
  address: "",
  notes: "",
};
