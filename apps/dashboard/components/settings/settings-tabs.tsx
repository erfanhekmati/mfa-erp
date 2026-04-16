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

import { NavLayoutPicker } from "./nav-layout-picker";
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

      <TabsContent value="appearance">
        <div className="space-y-6">
          <ThemePicker />
          <NavLayoutPicker />
        </div>
      </TabsContent>
    </Tabs>
  );
}
