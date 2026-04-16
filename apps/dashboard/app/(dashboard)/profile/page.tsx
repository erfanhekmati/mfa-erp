import { CompleteProfileForm } from "../../../components/profile/complete-profile-form";

export const metadata = {
  title: "تکمیل پروفایل | مدیران فولاد آذر",
  description: "اطلاعات پروفایل کاربری خود را تکمیل کنید.",
};

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        اطلاعات کاربری خود را کامل کنید تا دسترسی کامل به سامانه داشته باشید.
      </p>
      <CompleteProfileForm />
    </div>
  );
}
