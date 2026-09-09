import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "木子女爰：） nice 2 meet u",
  description: "关于我、我的工作、项目与作品集。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/cjkFonts-allseto-subset.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
