import { Button } from "@repo/ui/button";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Dashboard</h1>
        <p>Next.js frontend · API runs separately in apps/api.</p>
        <Button appName="dashboard" className={styles.secondary}>
          Open alert
        </Button>
      </main>
    </div>
  );
}
