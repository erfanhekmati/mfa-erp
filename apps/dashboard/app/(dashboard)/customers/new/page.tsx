import { AddCustomerForm } from "../../../../components/customers/add-customer-form";

export const metadata = {
  title: "مشتری جدید | مدیران فولاد آذر",
  description: "اطلاعات مشتری جدید را وارد کنید.",
};

export default function AddCustomerPage() {
  return (
    <div className="space-y-6 px-1 py-2">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">مشتری جدید</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          اطلاعات مشتری جدید را وارد کنید.
        </p>
      </div>
      <AddCustomerForm />
    </div>
  );
}
