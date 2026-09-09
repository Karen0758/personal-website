"use client";

import { useState } from "react";

type AboutSection = "education" | "work";

const aboutSections = {
  education: {
    label: "教育背景",
    items: [
      { title: "上海大学", meta: "法学专业 · 2017–2021" },
      { title: "中国社会科学院大学", meta: "社会工作专业 · 2022–2024" },
    ],
  },
  work: {
    label: "工作经验",
    items: [
      {
        title: "上海市乐知一心慈善基金会",
        meta: "项目评估、准入与交付管理",
        detail: "评估 46 家机构，筛选 12 家进入深度合作；搭建标准化评估与风控工具，将单项目决策周期缩短 50%。",
      },
      {
        title: "zulution.ai",
        meta: "AI 产品运营与用户增长",
        detail: "冷启动 600 人垂直社群；整理 200+ 款网页解谜游戏并完成集合页产品化；运营 20 位创作者，推动 3 位进入深度共建。",
      },
    ],
  },
} as const;

export default function PortfolioCanvas() {
  const [activeSection, setActiveSection] = useState<AboutSection>("education");
  const section = aboutSections[activeSection];

  return (
    <div className="portfolio-canvas about-canvas" aria-label="关于我">
      <nav className="about-canvas__tabs" aria-label="关于我内容分类">
        <button
          className={`about-canvas__tab${activeSection === "education" ? " is-active" : ""}`}
          type="button"
          aria-pressed={activeSection === "education"}
          onClick={() => setActiveSection("education")}
        >
          <span>01</span>
          教育背景
        </button>
        <button
          className={`about-canvas__tab${activeSection === "work" ? " is-active" : ""}`}
          type="button"
          aria-pressed={activeSection === "work"}
          onClick={() => setActiveSection("work")}
        >
          <span>02</span>
          工作经验
        </button>
      </nav>

      <div className="portfolio-canvas__surface about-canvas__surface">
        <header className="portfolio-canvas__header">
          <div><h2 className="portfolio-canvas__title">关于我</h2></div>
        </header>
        <section className="about-canvas__panel" key={activeSection} aria-live="polite">
          <div className="about-group__heading"><span>{activeSection === "education" ? "01" : "02"}</span><h3>{section.label}</h3></div>
          <div className="about-group__items">
            {section.items.map((item) => (
              <article className="about-item" key={item.title}>
                <strong>{item.title}</strong>
                <span>{item.meta}</span>
                {"detail" in item && <p>{item.detail}</p>}
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
