import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui";
import { Timer1 } from "iconsax-react";
import styles from "./coming-soon.module.css";

export function ComingSoon() {
  return (
    <div className={styles.wrap}>
      <Card className={styles.card}>
        <CardHeader className={styles.header}>
          <div className={styles.iconWrap} aria-hidden>
            <Timer1
              size={40}
              variant="Bulk"
              color="var(--muted-foreground)"
            />
          </div>
          <CardTitle className={styles.title}>به‌زودی</CardTitle>
          <CardDescription className={styles.description}>
            این بخش در نسخه‌های بعدی در دسترس قرار می‌گیرد. از صبر و همراهی شما
            سپاسگزاریم.
          </CardDescription>
        </CardHeader>
        <CardContent className={styles.content}>
          <p className={styles.hint}>
            تیم توسعه در حال آماده‌سازی امکانات این صفحه است.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
