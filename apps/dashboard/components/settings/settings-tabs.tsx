"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui";

import { ThemePicker } from "./theme-picker";

const tabTriggerClassName =
  "rounded-none border-b-2 border-transparent px-4 py-2.5 text-sm font-medium text-muted-foreground transition-none data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none";

export function SettingsTabs() {
  return (
    <Tabs defaultValue="general" dir="rtl">
      <TabsList className="mb-6 flex h-auto w-full flex-wrap justify-start gap-1 rounded-none border-b bg-transparent p-0">
        <TabsTrigger value="general" className={tabTriggerClassName}>
          عمومی
        </TabsTrigger>
        <TabsTrigger value="organization" className={tabTriggerClassName}>
          اطلاعات سازمان
        </TabsTrigger>
        <TabsTrigger value="users" className={tabTriggerClassName}>
          کاربران
        </TabsTrigger>
        <TabsTrigger value="appearance" className={tabTriggerClassName}>
          ظاهر
        </TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">تنظیمات عمومی</CardTitle>
              <CardDescription>
                اطلاعات پایه سامانه را در این بخش مدیریت کنید.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="site-name">
                  نام سامانه
                </label>
                <Input
                  id="site-name"
                  placeholder="مدیران فولاد آذر"
                  defaultValue="مدیران فولاد آذر"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="site-lang">
                  زبان پیش‌فرض
                </label>
                <Input id="site-lang" placeholder="فارسی" defaultValue="فارسی" disabled />
              </div>
              <Separator />
              <div className="flex justify-end">
                <Button>ذخیره تغییرات</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">امنیت</CardTitle>
              <CardDescription>
                تنظیمات مرتبط با امنیت حساب کاربری.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="current-pass">
                  رمز عبور فعلی
                </label>
                <Input id="current-pass" type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="new-pass">
                  رمز عبور جدید
                </label>
                <Input id="new-pass" type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="confirm-pass">
                  تکرار رمز عبور جدید
                </label>
                <Input id="confirm-pass" type="password" placeholder="••••••••" />
              </div>
              <Separator />
              <div className="flex justify-end">
                <Button>تغییر رمز عبور</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="organization">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">اطلاعات سازمان</CardTitle>
              <CardDescription>
                مشخصات سازمان و شرکت خود را در این بخش تکمیل کنید.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="org-name">
                    نام شرکت
                  </label>
                  <Input
                    id="org-name"
                    placeholder="نام شرکت را وارد کنید"
                    defaultValue="مدیران فولاد آذر"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="org-code">
                    شناسه ملی
                  </label>
                  <Input id="org-code" placeholder="شناسه ملی شرکت" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="org-reg">
                    شماره ثبت
                  </label>
                  <Input id="org-reg" placeholder="شماره ثبت شرکت" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="org-phone">
                    تلفن
                  </label>
                  <Input id="org-phone" placeholder="تلفن شرکت" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium" htmlFor="org-address">
                    آدرس
                  </label>
                  <Input id="org-address" placeholder="آدرس شرکت را وارد کنید" />
                </div>
              </div>
              <Separator />
              <div className="flex justify-end">
                <Button>ذخیره اطلاعات سازمان</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="users">
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="space-y-1">
                <CardTitle className="text-base">مدیریت کاربران</CardTitle>
                <CardDescription>
                  کاربران سامانه را مشاهده و مدیریت کنید.
                </CardDescription>
              </div>
              <Button size="sm">افزودن کاربر</Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-dashed border-border p-8 text-center">
                <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-muted">
                  <svg
                    className="size-6 text-muted-foreground"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-foreground">
                  کاربری یافت نشد
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  برای افزودن کاربر جدید دکمه «افزودن کاربر» را بزنید.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="appearance">
        <ThemePicker />
      </TabsContent>
    </Tabs>
  );
}
