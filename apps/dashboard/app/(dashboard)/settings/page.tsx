import { SettingsTabs } from "../../../components/settings/settings-tabs";

export const metadata = {
  title: "تنظیمات | مدیران فولاد آذر",
  description: "تنظیمات سامانه را مدیریت کنید.",
};

export default function SettingsPage() {
  return (
    <div className="space-y-6 px-1 py-2">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">تنظیمات</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          تنظیمات سامانه و حساب کاربری خود را مدیریت کنید.
        </p>
      </div>
      <SettingsTabs />
    </div>
  );
}
