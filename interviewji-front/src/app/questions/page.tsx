import Image from "next/image";
import styles from "./page.module.css"
export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          题目页面
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
      </div>
    </main>
  );
}
