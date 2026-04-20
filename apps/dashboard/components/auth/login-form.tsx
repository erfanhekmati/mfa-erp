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
import { Call, Lock1, Sms } from "iconsax-react";
import Link from "next/link";
import { useState } from "react";
import { formFieldIconClass } from "../../lib/form-field-icon";

type AuthMethod = "otp" | "password";

export function LoginForm() {
  const [method, setMethod] = useState<AuthMethod>("otp");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  function handleSendOtp(e: React.MouseEvent) {
    e.preventDefault();
    if (phone.trim().length >= 10) {
      setOtpSent(true);
    }
  }

  return (
    <Card className="w-full rounded-2xl border-border/80 bg-card/85 shadow-2xl ring-1 ring-black/5 backdrop-blur-md supports-[backdrop-filter]:bg-card/70">
      <CardHeader className="space-y-2 pb-4 text-center lg:text-right">
        <CardTitle className="text-2xl font-bold tracking-tight sm:text-[1.65rem]">
          ورود
        </CardTitle>
        <CardDescription className="text-pretty text-[0.9375rem] leading-relaxed">
          با شماره موبایل و رمز عبور یا کد یکبار مصرف وارد شوید.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-5">
          <div
            className="flex rounded-xl border border-border/80 bg-muted/50 p-1 shadow-inner"
            role="tablist"
            aria-label="روش ورود"
          >
            <button
              type="button"
              role="tab"
              aria-selected={method === "otp"}
              onClick={() => {
                setMethod("otp");
                setOtpSent(false);
                setOtp("");
              }}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-sm font-medium transition-colors ${
                method === "otp"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Sms size={18} variant="Linear" color="currentColor" className="shrink-0" aria-hidden />
              کد یکبار مصرف
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={method === "password"}
              onClick={() => {
                setMethod("password");
                setOtpSent(false);
                setOtp("");
              }}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-sm font-medium transition-colors ${
                method === "password"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Lock1 size={18} variant="Linear" color="currentColor" className="shrink-0" aria-hidden />
              رمز عبور
            </button>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="login-phone"
              className="text-sm font-medium leading-none"
            >
              شماره موبایل
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute right-3 top-1/2 z-10 -translate-y-1/2">
                <Call
                  size={18}
                  variant="Linear"
                  color="currentColor"
                  className={formFieldIconClass.muted}
                  aria-hidden
                />
              </span>
              <Input
                id="login-phone"
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

          {/* Fixed min height keeps card size stable when switching tabs / OTP step */}
          <div className="flex min-h-[5rem] flex-col justify-start">
            {method === "password" ? (
              <div className="space-y-2">
                <label
                  htmlFor="login-password"
                  className="text-sm font-medium leading-none"
                >
                  رمز عبور
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute right-3 top-1/2 z-10 -translate-y-1/2">
                    <Lock1
                      size={18}
                      variant="Linear"
                      color="currentColor"
                      className={formFieldIconClass.muted}
                      aria-hidden
                    />
                  </span>
                  <Input
                    id="login-password"
                    name="password"
                    type="password"
                    dir="ltr"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="!max-w-none pr-10"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {!otpSent ? (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleSendOtp}
                  >
                    ارسال کد تأیید
                  </Button>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label
                        htmlFor="login-otp"
                        className="text-sm font-medium leading-none"
                      >
                        کد تأیید
                      </label>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2">
                          <Sms
                            size={18}
                            variant="Linear"
                            color="currentColor"
                            className={formFieldIconClass.muted}
                            aria-hidden
                          />
                        </span>
                        <Input
                          id="login-otp"
                          name="otp"
                          type="text"
                          dir="ltr"
                          inputMode="numeric"
                          autoComplete="one-time-code"
                          placeholder="کد ۶ رقمی"
                          maxLength={6}
                          value={otp}
                          onChange={(e) =>
                            setOtp(e.target.value.replace(/\D/g, ""))
                          }
                          className="!max-w-none pl-10 text-center text-lg tracking-[0.35em]"
                        />
                      </div>
                    </div>
                    <p className="text-center text-xs text-muted-foreground">
                      کد به شمارهٔ بالا ارسال شد.{" "}
                      <button
                        type="button"
                        className="font-medium text-foreground underline-offset-4 hover:underline"
                        onClick={() => {
                          setOtpSent(false);
                          setOtp("");
                        }}
                      >
                        تغییر شماره
                      </button>
                    </p>
                  </>
                )}
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-l from-zinc-900 to-zinc-800 shadow-lg shadow-zinc-900/20 hover:from-zinc-800 hover:to-zinc-700"
            size="lg"
            disabled={
              method === "otp" &&
              (!otpSent || otp.trim().length < 6)
            }
          >
            ورود به داشبورد
          </Button>
        </CardContent>
      </form>
      <CardFooter className="flex flex-col gap-3 border-t border-border/60 pt-6">
        <p className="text-center text-sm text-muted-foreground">
          رمز عبور را فراموش کرده‌اید؟{" "}
          <Link
            href="/forget-password"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            بازیابی رمز عبور
          </Link>
        </p>
        <p className="text-center text-sm text-muted-foreground">
          حساب کاربری ندارید؟{" "}
          <Link
            href="/register"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            ثبت‌نام
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
