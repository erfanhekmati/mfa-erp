/**
 * Persian text fields: use with `dir="rtl"` on the control.
 */
export const cnInputPersian =
  "text-right placeholder:text-right";

/**
 * Phone, national ID, economic code, amounts: typed LTR; Persian placeholder stays on the right.
 * Use with `dir="ltr"` on the control.
 */
export const cnInputLtrFaPlaceholder =
  "text-left [&::placeholder]:text-right [&::placeholder]:[direction:rtl]";
