import Link from "next/link";
import Journey3DPreview from "@/components/Journey3DPreview";
import styles from "./page.module.css";

export default function Journey3DPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <span className={styles.kicker}>3D 俯视动线预览</span>
          <h1>S 型火车路径</h1>
          <p>先确认曲线宽度、火车大小与甩尾方向，再接回首页滚动。</p>
        </div>
        <Link href="/">返回主页</Link>
      </header>
      <section className={styles.viewer} aria-label="3D 俯视火车 S 型动线预览">
        <Journey3DPreview />
      </section>
      <footer className={styles.footer}><span>橙色虚线 = 预设动线</span><span>火车会沿曲线自动转向</span></footer>
    </main>
  );
}
