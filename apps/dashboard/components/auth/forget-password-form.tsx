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
import { Call, Lock1, Sms, TickCircle } from "iconsax-react";
import Link from "next/link";
import { useState } from "react";
import { formFieldIconClass } from "../../lib/form-field-icon";

type Step = "phone" | "otp" | "new-password" | "done";

export function ForgetPasswordForm() {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    if (phone.trim().length >= 10) {
      setStep("otp");
    }
  }

  function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    if (otp.trim().length === 6) {
      setStep("new-password");
    }
  }

  function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }
    setPasswordMismatch(false);
    setStep("done");
  }

  const stepTitles: Record<Step, { title: string; description: string }> = {
    phone: {
      title: "فراموشی رمز عبور",
      description: "شماره موبایل خود را وارد کنید تا کد تأیید ارسال شود.",
    },
    otp: {
      title: "تأیید شماره موبایل",
      description: `کد ۶ رقمی ارسال‌شده به ${phone} را وارد کنید.`,
    },
    "new-password": {
      title: "تعیین رمز عبور جدید",
      description: "رمز عبور جدید خود را وارد کنید.",
    },
    done: {
      title: "رمز عبور تغییر کرد",
      description: "رمز عبور شما با موفقیت تغییر کرد. می‌توانید وارد شوید.",
    },
  };

  return (
    <Card className="w-full rounded-2xl border-border/80 bg-card/85 shadow-2xl ring-1 ring-black/5 backdrop-blur-md supports-[backdrop-filter]:bg-card/70">
      <CardHeader className="space-y-2 pb-4 text-center lg:text-right">
        <CardTitle className="text-2xl font-bold tracking-tight sm:text-[1.65rem]">
          {stepTitles[step].title}
        </CardTitle>
        <CardDescription className="text-pretty text-[0.9375rem] leading-relaxed">
          {stepTitles[step].description}
        </CardDescription>
      </CardHeader>

      {step === "done" ? (
        <CardContent className="flex flex-col items-center gap-6 py-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/30">
            <TickCircle
              size={48}
              variant="Linear"
              color="currentColor"
              className="!text-emerald-500"
              aria-hidden
            />
          </div>
          <p className="text-center text-sm text-muted-foreground">
            رمز عبور شما با موفقیت بازیابی شد.
          </p>
          <Button
            asChild
            className="w-full bg-gradient-to-l from-zinc-900 to-zinc-800 shadow-lg shadow-zinc-900/20 hover:from-zinc-800 hover:to-zinc-700"
            size="lg"
          >
            <Link href="/login">ورود به داشبورد</Link>
          </Button>
        </CardContent>
      ) : (
        <>
          {/* Step: Phone */}
          {step === "phone" && (
            <form onSubmit={handleSendOtp}>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <label
                    htmlFor="fp-phone"
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
                      id="fp-phone"
                      name="phone"
                      type="tel"
                      dir="ltr"
                      inputMode="numeric"
                      autoComplete="tel"
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="!max-w-none pr-10"
                      autoFocus
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-l from-zinc-900 to-zinc-800 shadow-lg shadow-zinc-900/20 hover:from-zinc-800 hover:to-zinc-700"
                  size="lg"
                  disabled={phone.trim().length < 10}
                >
                  ارسال کد تأیید
                </Button>
              </CardContent>
            </form>
          )}

          {/* Step: OTP */}
          {step === "otp" && (
            <form onSubmit={handleVerifyOtp}>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <label
                    htmlFor="fp-otp"
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
                      id="fp-otp"
                      name="otp"
                      type="text"
                      dir="ltr"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      placeholder="کد ۶ رقمی"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                      className="!max-w-none pl-10 text-center text-lg tracking-[0.35em]"
                      autoFocus
                    />
                  </div>
                </div>
                <p className="text-center text-xs text-muted-foreground">
                  کد به شمارهٔ {phone} ارسال شد.{" "}
                  <button
                    type="button"
                    className="font-medium text-foreground underline-offset-4 hover:underline"
                    onClick={() => {
                      setStep("phone");
                      setOtp("");
                    }}
                  >
                    تغییر شماره
                  </button>
                </p>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-l from-zinc-900 to-zinc-800 shadow-lg shadow-zinc-900/20 hover:from-zinc-800 hover:to-zinc-700"
                  size="lg"
                  disabled={otp.trim().length < 6}
                >
                  تأیید کد
                </Button>
              </CardContent>
            </form>
          )}

          {/* Step: New Password */}
          {step === "new-password" && (
            <form onSubmit={handleResetPassword}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="fp-new-password"
                    className="text-sm font-medium leading-none"
                  >
                    رمز عبور جدید
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
                      id="fp-new-password"
                      name="newPassword"
                      type="password"
                      dir="ltr"
                      autoComplete="new-password"
                      placeholder="حداقل ۸ کاراکتر"
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        setPasswordMismatch(false);
                      }}
                      className="!max-w-none pr-10"
                      autoFocus
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="fp-confirm-password"
                    className="text-sm font-medium leading-none"
                  >
                    تکرار رمز عبور جدید
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
                      id="fp-confirm-password"
                      name="confirmPassword"
                      type="password"
                      dir="ltr"
                      autoComplete="new-password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setPasswordMismatch(false);
                      }}
                      className={`!max-w-none pr-10 ${passwordMismatch ? "border-destructive focus:ring-destructive" : ""}`}
                    />
                  </div>
                  {passwordMismatch && (
                    <p className="text-xs text-red-500">
                      رمز عبور و تکرار آن یکسان نیستند.
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-l from-zinc-900 to-zinc-800 shadow-lg shadow-zinc-900/20 hover:from-zinc-800 hover:to-zinc-700"
                  size="lg"
                  disabled={
                    newPassword.trim().length < 8 ||
                    confirmPassword.trim().length < 8
                  }
                >
                  ذخیره رمز عبور
                </Button>
              </CardContent>
            </form>
          )}
        </>
      )}

      <CardFooter className="flex flex-col gap-2 border-t border-border/60 pt-6">
        <p className="text-center text-sm text-muted-foreground">
          رمز عبور را به خاطر آوردید؟{" "}
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
