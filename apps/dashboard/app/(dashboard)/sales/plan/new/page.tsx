import { AddSalePlanForm } from "../../../../../components/sales/add-sale-plan-form";

export const metadata = {
  title: "برنامه فروش جدید | مدیران فولاد آذر",
  description: "برنامه فروش جدید را ثبت کنید.",
};

export default function AddSalePlanPage() {
  return (
    <div className="mt-6 space-y-6">
      <AddSalePlanForm />
    </div>
  );
}
