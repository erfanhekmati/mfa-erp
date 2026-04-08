"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
} from "@repo/ui";
import { Call, Lock1, User } from "iconsax-react";
import Link from "next/link";
import { useState } from "react";

export function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <Card className="w-full rounded-2xl border-border/80 bg-card/85 shadow-2xl ring-1 ring-black/5 backdrop-blur-md supports-[backdrop-filter]:bg-card/70">
      <CardHeader className="space-y-2 pb-4 text-center lg:text-right">
        <CardTitle className="text-2xl font-bold tracking-tight sm:text-[1.65rem]">
          ثبت‌نام
        </CardTitle>
        <CardDescription className="text-pretty text-[0.9375rem] leading-relaxed">
          اطلاعات خود را وارد کنید تا حساب کاربری ایجاد شود.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="register-name"
              className="text-sm font-medium leading-none"
            >
              نام و نام خانوادگی
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <User size={18} variant="Bulk" aria-hidden />
              </span>
              <Input
                id="register-name"
                name="fullName"
                type="text"
                autoComplete="name"
                placeholder="مثال: علی رضایی"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="!max-w-none pr-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="register-phone"
              className="text-sm font-medium leading-none"
            >
              شماره موبایل
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Call size={18} variant="Bulk" aria-hidden />
              </span>
              <Input
                id="register-phone"
                name="phone"
                type="tel"
                dir="ltr"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="!max-w-none pr-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="register-password"
              className="text-sm font-medium leading-none"
            >
              رمز عبور
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Lock1 size={18} variant="Bulk" aria-hidden />
              </span>
              <Input
                id="register-password"
                name="password"
                type="password"
                dir="ltr"
                autoComplete="new-password"
                placeholder="حداقل ۸ کاراکتر"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="!max-w-none pr-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="register-confirm"
              className="text-sm font-medium leading-none"
            >
              تکرار رمز عبور
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Lock1 size={18} variant="Bulk" aria-hidden />
              </span>
              <Input
                id="register-confirm"
                name="confirmPassword"
                type="password"
                dir="ltr"
                autoComplete="new-password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="!max-w-none pr-10"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-l from-zinc-900 to-zinc-800 shadow-lg shadow-zinc-900/20 hover:from-zinc-800 hover:to-zinc-700"
            size="lg"
          >
            ایجاد حساب کاربری
          </Button>
        </CardContent>
      </form>
      <CardFooter className="flex flex-col gap-2 border-t border-border/60 pt-6">
        <p className="text-center text-sm text-muted-foreground">
          قبلاً ثبت‌نام کرده‌اید؟{" "}
          <Link
            href="/login"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            ورود
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
