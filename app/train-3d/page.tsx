import Link from "next/link";
import Train3DPreview from "@/components/Train3DPreview";
import styles from "./page.module.css";

export default function Train3DPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div><span className={styles.kicker}>3D 模型试做 / 暂未替换首页</span><h1>蓝绿色手绘火车</h1><p>拖动旋转 · 滚轮缩放 · 检查侧面、车头与俯视造型</p></div>
        <Link href="/">返回主页</Link>
      </header>
      <section className={styles.viewer} aria-label="蓝绿色火车三维模型预览"><Train3DPreview /></section>
      <footer className={styles.footer}><span>第一版造型验证</span><span>5 节车厢 / 程序化 3D 模型</span></footer>
    </main>
  );
}
