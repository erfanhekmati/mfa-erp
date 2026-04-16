import { AddCustomerForm } from "../../../../components/customers/add-customer-form";

export const metadata = {
  title: "مشتری جدید | مدیران فولاد آذر",
  description: "اطلاعات مشتری جدید را وارد کنید.",
};

export default function AddCustomerPage() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        اطلاعات مشتری جدید را وارد کنید.
      </p>
      <AddCustomerForm />
    </div>
  );
}
