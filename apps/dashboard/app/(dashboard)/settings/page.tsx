import { SettingsTabs } from "../../../components/settings/settings-tabs";

export const metadata = {
  title: "تنظیمات | مدیران فولاد آذر",
  description: "تنظیمات سامانه را مدیریت کنید.",
};

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        تنظیمات سامانه و حساب کاربری خود را مدیریت کنید.
      </p>
      <SettingsTabs />
    </div>
  );
}
