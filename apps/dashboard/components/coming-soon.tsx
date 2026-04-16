import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui";
import { Timer1 } from "iconsax-react";

export function ComingSoon() {
  return (
    <div className="mt-6 flex min-h-[min(60vh,28rem)] items-center justify-center px-2 py-4">
      <Card className="w-full max-w-md border-border text-center shadow-md">
        <CardHeader className="space-y-3 pb-2 pt-8">
          <div className="flex justify-center opacity-85" aria-hidden>
            <Timer1 size={40} variant="Bulk" color="hsl(var(--muted-foreground))" />
          </div>
          <CardTitle className="text-xl font-bold tracking-tight">
            به‌زودی
          </CardTitle>
          <CardDescription className="mx-auto max-w-sm text-pretty leading-relaxed">
            این بخش در نسخه‌های بعدی در دسترس قرار می‌گیرد. از صبر و همراهی شما
            سپاسگزاریم.
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-8 pt-0">
          <p className="text-xs text-muted-foreground">
            تیم توسعه در حال آماده‌سازی امکانات این صفحه است.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
