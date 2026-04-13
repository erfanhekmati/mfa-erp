import { ComingSoon } from "../../../../components/coming-soon";

export const metadata = {
  title: "اضافه کردن مشتری | مدیران فولاد آذر",
  description: "اطلاعات مشتری جدید را وارد کنید.",
};

export default function AddCustomerPage() {
  return (
    <div className="space-y-6 px-1 py-2">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">اضافه کردن مشتری</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          اطلاعات مشتری جدید را وارد کنید.
        </p>
      </div>
      <ComingSoon />
    </div>
  );
}
