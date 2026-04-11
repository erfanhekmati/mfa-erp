import Link from "next/link";
import type { ReactNode } from "react";
import { ShieldTick } from "iconsax-react";

type AuthVariant = "login" | "register" | "forget-password";

const copy: Record<
  AuthVariant,
  { eyebrow: string; title: string; subtitle: string }
> = {
  login: {
    eyebrow: "ورود به سامانه",
    title: "مدیریت یکپارچه، تصمیم مطمئن‌ تر",
    subtitle: "به داشبورد مدیریت منابع مدیران فولاد آذر خوش آمدید.",
  },
  register: {
    eyebrow: "عضویت",
    title: "اولین قدم به سوی دیجیتال‌ سازی",
    subtitle:
      "با ایجاد حساب، به داشبورد مدیریت منابع مدیران فولاد آذر وصل می‌شوید؛ فرآیندها و گزارش‌ها در یک سامانه، امن و همیشه در دسترس.",
  },
  "forget-password": {
    eyebrow: "بازیابی رمز عبور",
    title: "دسترسی خود را بازیابی کنید",
    subtitle:
      "با وارد کردن شماره موبایل، کد تأیید دریافت کرده و رمز عبور جدید تعیین کنید.",
  },
};

export function AuthPageShell({
  variant,
  children,
}: {
  variant: AuthVariant;
  children: ReactNode;
}) {
  const { eyebrow, title, subtitle } = copy[variant];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      {/* Ambient layers */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_100%_-20%,hsl(220_14%_18%/0.12),transparent_50%),radial-gradient(ellipse_90%_60%_at_0%_100%,hsl(25_90%_45%/0.08),transparent_45%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_left,hsl(var(--border)/0.35)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.35)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_40%,black,transparent)] opacity-40"
        aria-hidden
      />

      <div className="relative flex min-h-screen flex-col lg:grid lg:grid-cols-2">
        {/* Form column — first in DOM = start side (right in RTL) */}
        <div className="order-2 flex flex-1 flex-col justify-center px-4 py-10 sm:px-6 lg:order-1 lg:px-10 xl:px-16">
          <div className="mx-auto w-full max-w-[min(100%,26rem)]">
            <header className="mb-8 text-center lg:text-right">
              <Link
                href="/"
                className="group inline-flex items-center gap-3 rounded-xl border border-border/80 bg-card/60 px-4 py-2.5 shadow-sm ring-1 ring-black/5 backdrop-blur-sm transition-all hover:border-border hover:bg-card hover:shadow-md"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-zinc-800 to-zinc-950 shadow-inner">
                  <ShieldTick
                    size={22}
                    variant="Linear"
                    color="#fafafa"
                    aria-hidden
                  />
                </span>
                <span className="text-right">
                  <span className="block text-xs font-medium text-muted-foreground">
                    سامانه مدیریت منابع
                  </span>
                  <span className="block text-base font-bold tracking-tight text-foreground">
                    مدیران فولاد آذر
                  </span>
                </span>
              </Link>
            </header>
            {children}
          </div>
        </div>

        {/* Hero column */}
        <div className="relative order-1 flex min-h-[min(42vh,28rem)] flex-col justify-center overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 px-6 py-10 text-zinc-100 sm:px-10 lg:order-2 lg:min-h-screen lg:border-s lg:border-white/10 lg:px-12 xl:px-16">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(25_85%_50%/0.15),transparent_50%),radial-gradient(circle_at_80%_80%,hsl(210_40%_40%/0.2),transparent_45%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-16 -right-16 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl"
            aria-hidden
          />

          <div className="relative z-10 mx-auto max-w-lg text-center">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-amber-100/90 backdrop-blur-sm">
              {eyebrow}
            </p>
            <h1 className="text-balance text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-[1.75rem] xl:text-4xl">
              {title}
            </h1>
            <p className="mx-auto mt-4 max-w-md text-pretty text-sm leading-relaxed text-zinc-400 sm:text-base">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
