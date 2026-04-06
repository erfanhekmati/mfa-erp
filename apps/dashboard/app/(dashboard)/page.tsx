import { Button } from "@repo/ui/button";
import styles from "./home.module.css";

export default function Home() {
  return (
    <div className={styles.welcome}>
      <h1>داشبورد</h1>
      <p>رابط کاربری Next.js · API به‌صورت جدا در apps/api اجرا می‌شود.</p>
      <Button appName="داشبورد" className={styles.secondary}>
        نمایش پیام
      </Button>
    </div>
  );
}
