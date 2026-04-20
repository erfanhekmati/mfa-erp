"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  PersianDatePicker,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  cn,
} from "@repo/ui";
import {
  cnInputLtrFaPlaceholder,
  cnInputPersian,
  cnTextareaPersian,
} from "../../lib/form-input-direction";
import {
  Call,
  Camera,
  Card as CardIcon,
  Global,
  Location,
  Personalcard,
  User,
} from "iconsax-react";
import { useRef, useState } from "react";
import { IRAN_PROVINCES, citiesForProvince } from "../../lib/iran-locations";

const GENDERS = [
  { value: "male", label: "مرد" },
  { value: "female", label: "زن" },
  { value: "other", label: "سایر" },
];

type ProfileValues = {
  firstName: string;
  lastName: string;
  phone: string;
  nationalId: string;
  birthDate: string;
  gender: string;
  province: string;
  city: string;
  address: string;
  jobTitle: string;
  bio: string;
};

const INITIAL_VALUES: ProfileValues = {
  firstName: "",
  lastName: "",
  phone: "",
  nationalId: "",
  birthDate: "",
  gender: "",
  province: "",
  city: "",
  address: "",
  jobTitle: "",
  bio: "",
};

export function CompleteProfileForm() {
  const [values, setValues] = useState<ProfileValues>(INITIAL_VALUES);
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function setField<K extends keyof ProfileValues>(key: K, val: string) {
    setSaved(false);
    setValues((prev) => ({ ...prev, [key]: val }));
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarSrc(url);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      {/* Avatar */}
      <Card className="rounded-2xl border-border/70">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">تصویر پروفایل</CardTitle>
          <CardDescription>
            یک تصویر مناسب برای حساب کاربری خود انتخاب کنید.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="group relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-dashed border-border bg-muted transition-colors hover:border-foreground/40 hover:bg-muted/80"
              aria-label="آپلود تصویر پروفایل"
            >
              {avatarSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatarSrc}
                  alt="پروفایل"
                  className="h-full w-full object-cover"
                />
              ) : (
                <User
                  size={36}
                  variant="Bulk"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
              )}
              <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                <Camera size={22} variant="Bulk" color="#fff" aria-hidden />
              </span>
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
            <div className="space-y-1">
              <p className="text-sm font-medium">آپلود تصویر</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileRef.current?.click()}
              >
                انتخاب تصویر
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal info */}
      <Card className="rounded-2xl border-border/70">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Personalcard size={20} variant="Bulk" aria-hidden />
            اطلاعات شخصی
          </CardTitle>
          <CardDescription>
            اطلاعات کاربری خود را کامل کنید تا دسترسی کامل به سامانه داشته باشید.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* First name */}
            <div className="space-y-2">
              <label htmlFor="p-firstName" className="text-sm font-medium leading-none">
                نام
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <User size={17} variant="Bulk" aria-hidden />
                </span>
                <Input
                  id="p-firstName"
                  name="firstName"
                  type="text"
                  dir="rtl"
                  autoComplete="given-name"
                  placeholder="نام"
                  value={values.firstName}
                  onChange={(e) => setField("firstName", e.target.value)}
                  className={cn("!max-w-none pr-10", cnInputPersian)}
                />
              </div>
            </div>

            {/* Last name */}
            <div className="space-y-2">
              <label htmlFor="p-lastName" className="text-sm font-medium leading-none">
                نام خانوادگی
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <User size={17} variant="Bulk" aria-hidden />
                </span>
                <Input
                  id="p-lastName"
                  name="lastName"
                  type="text"
                  dir="rtl"
                  autoComplete="family-name"
                  placeholder="نام خانوادگی"
                  value={values.lastName}
                  onChange={(e) => setField("lastName", e.target.value)}
                  className={cn("!max-w-none pr-10", cnInputPersian)}
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="p-phone" className="text-sm font-medium leading-none">
                شماره موبایل
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Call size={17} variant="Bulk" aria-hidden />
                </span>
                <Input
                  id="p-phone"
                  name="phone"
                  type="tel"
                  dir="ltr"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="شماره موبایل"
                  value={values.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  className={cn("!max-w-none pr-10", cnInputLtrFaPlaceholder)}
                />
              </div>
            </div>

            {/* National ID */}
            <div className="space-y-2">
              <label htmlFor="p-nationalId" className="text-sm font-medium leading-none">
                کد ملی
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <CardIcon size={17} variant="Bulk" aria-hidden />
                </span>
                <Input
                  id="p-nationalId"
                  name="nationalId"
                  type="text"
                  dir="ltr"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="کد ملی"
                  value={values.nationalId}
                  onChange={(e) =>
                    setField("nationalId", e.target.value.replace(/\D/g, ""))
                  }
                  className={cn("!max-w-none pr-10", cnInputLtrFaPlaceholder)}
                />
              </div>
            </div>

            {/* Birth date */}
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                تاریخ تولد
              </label>
              <PersianDatePicker
                value={values.birthDate}
                onChange={(val) => setField("birthDate", val ?? "")}
                placeholder="تاریخ تولد"
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                جنسیت
              </label>
              <Select
                value={values.gender}
                onValueChange={(val) => setField("gender", val)}
              >
                <SelectTrigger className="w-full" dir="rtl">
                  <SelectValue placeholder="جنسیت" />
                </SelectTrigger>
                <SelectContent>
                  {GENDERS.map((g) => (
                    <SelectItem key={g.value} value={g.value}>
                      {g.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job info */}
      <Card className="rounded-2xl border-border/70">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Global size={20} variant="Bulk" aria-hidden />
            اطلاعات شغلی
          </CardTitle>
          <CardDescription>سمت و توضیحات مختصر درباره خود را وارد کنید.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="p-jobTitle" className="text-sm font-medium leading-none">
              عنوان شغلی
            </label>
            <Input
              id="p-jobTitle"
              name="jobTitle"
              type="text"
              dir="rtl"
              placeholder="عنوان شغلی"
              value={values.jobTitle}
              onChange={(e) => setField("jobTitle", e.target.value)}
              className={cn("!max-w-none", cnInputPersian)}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="p-bio" className="text-sm font-medium leading-none">
              معرفی کوتاه
            </label>
            <textarea
              id="p-bio"
              name="bio"
              dir="rtl"
              rows={3}
              placeholder="معرفی کوتاه"
              value={values.bio}
              onChange={(e) => setField("bio", e.target.value)}
              className={cn(
                "w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                cnTextareaPersian,
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Address */}
      <Card className="rounded-2xl border-border/70">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Location size={20} variant="Bulk" aria-hidden />
            اطلاعات مکانی
          </CardTitle>
          <CardDescription>آدرس و موقعیت جغرافیایی خود را وارد کنید.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Province */}
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">استان</label>
              <Select
                value={values.province || "__empty__"}
                onValueChange={(val) => {
                  setSaved(false);
                  const p = val === "__empty__" ? "" : val;
                  setValues((prev) => ({ ...prev, province: p, city: "" }));
                }}
              >
                <SelectTrigger className="w-full" dir="rtl">
                  <SelectValue placeholder="استان" />
                </SelectTrigger>
                <SelectContent dir="rtl" className="text-right">
                  <SelectItem value="__empty__">انتخاب استان</SelectItem>
                  {IRAN_PROVINCES.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* City */}
            <div className="space-y-2">
              <label htmlFor="p-city" className="text-sm font-medium leading-none">
                شهر
              </label>
              <Select
                value={values.city || "__empty__"}
                disabled={!values.province}
                onValueChange={(val) =>
                  setField("city", val === "__empty__" ? "" : val)
                }
              >
                <SelectTrigger id="p-city" className="w-full" dir="rtl">
                  <SelectValue placeholder="شهر" />
                </SelectTrigger>
                <SelectContent dir="rtl" className="max-h-60 text-right">
                  <SelectItem value="__empty__">انتخاب شهر</SelectItem>
                  {citiesForProvince(values.province).map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Full address */}
          <div className="space-y-2">
            <label htmlFor="p-address" className="text-sm font-medium leading-none">
              آدرس کامل
            </label>
            <textarea
              id="p-address"
              name="address"
              dir="rtl"
              rows={2}
              placeholder="آدرس کامل"
              value={values.address}
              onChange={(e) => setField("address", e.target.value)}
              className={cn(
                "w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                cnTextareaPersian,
              )}
            />
          </div>
        </CardContent>
      </Card>

      <Separator />

      <div className="flex items-center justify-between gap-4 pb-6">
        {saved && (
          <p className="text-sm text-emerald-600 dark:text-emerald-400">
            اطلاعات با موفقیت ذخیره شد.
          </p>
        )}
        <div className="ms-auto flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setValues(INITIAL_VALUES);
              setAvatarSrc(null);
              setSaved(false);
            }}
          >
            بازنشانی
          </Button>
          <Button
            type="submit"
            className="bg-gradient-to-l from-zinc-900 to-zinc-800 shadow-lg shadow-zinc-900/20 hover:from-zinc-800 hover:to-zinc-700"
          >
            ذخیره اطلاعات
          </Button>
        </div>
      </div>
    </form>
  );
}
