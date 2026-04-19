import { CounterpartyGroupCreateForm } from "../../../../../components/customers/counterparty-group-create-form";

export const metadata = {
  title: "ایجاد گروه طرف حساب | مدیران فولاد آذر",
  description: "تعریف گروه جدید و تعیین دسترسی‌ها.",
};

export default function CounterpartyGroupNewPage() {
  return <CounterpartyGroupCreateForm />;
}
