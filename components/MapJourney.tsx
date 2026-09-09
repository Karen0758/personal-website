"use client";

import { useEffect, useRef, useState } from "react";

type MapKey = "work" | "learning" | "action" | "life";

const mapData: Record<MapKey, { label: string; title: string; description: string; points: string[]; href?: string; color: string }> = {
  work: { label: "工作岛", title: "公益项目管理", description: "我追求有意义、有价值感的工作，偏好深入调研、系统设计与推动实践。", points: ["全链路资助管理", "议题研究与敏捷交付", "项目与相关方管理"], color: "#5b6c7a" },
  learning: { label: "学习岛", title: "学无止境", description: "主动探索 AI 与自动化工具，把学习转化成表达、传播和可以复用的工作流。", points: ["AI 与自动化工具", "行业共学与课程", "学习笔记与心得"], color: "#a66e5b" },
  action: { label: "行动岛", title: "与伤痕共处，向未来生长", description: "围绕非自杀性自伤议题，整合研究、亲历者视角与公开传播，创造一个可表达、被理解的叙事空间。", points: ["Future Beyond Scars 官网", "NSSI 知识库", "状态管理 App Demo"], href: "https://www.futurebeyondscars.cn/", color: "#758c7a" },
  life: { label: "碎碎念岛", title: "猫咪、健身和小说", description: "过好平凡人的普通生活，记录旅行、读书、心情和一些小小的快乐。", points: ["照顾猫咪", "健身和攀岩", "旅行与阅读"], color: "#d49a6a" },
};

export default function MapJourney() {
  const [active, setActive] = useState<MapKey | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => entry.target.classList.toggle("is-visible", entry.isIntersecting), { threshold: 0.15 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="journey" data-snap-page className="map-section">
      <div className="map-heading container"><div><span className="section-kicker">01 / 我的地图</span><h2>从这里，<em>开始认识我。</em></h2></div><p>过去的工作、正在做的项目、还在持续的好奇心，都在这张地图上。</p></div>
      <div data-active={active ?? "none"} className={`map-stage container ${active ? "has-active" : ""}`}>
        <svg className="map-svg" viewBox="0 0 1000 500" role="img" aria-label="个人经历与项目地图">
          <path className="land land-1" d="M150,100 Q200,80 250,120 T300,150 Q280,200 220,180 T150,100 Z" />
          <path className="land land-2" d="M120,50 Q180,40 220,80 T180,120 Q140,100 120,50 Z" />
          <path className="land land-3" d="M260,220 Q300,240 320,320 T280,420 Q240,350 260,220 Z" />
          <path className="land land-4" d="M450,90 Q500,70 540,110 T480,150 Q430,120 450,90 Z" />
          <path className="land land-5" d="M460,180 Q520,160 560,220 T520,350 Q450,280 460,180 Z" />
          <path className="land land-6" d="M550,80 Q700,40 800,120 T750,250 Q600,220 550,80 Z" />
          <path className="land land-7" d="M780,180 Q820,170 850,220 T800,260 Z" />
          <path className="land land-8" d="M750,320 Q820,300 850,360 T780,420 Q720,380 750,320 Z" />
          <path className="route" d="M230 160 C320 80 400 160 485 120 S640 130 700 190 S770 300 800 365" />
          <text x="200" y="130">工作岛</text><text x="480" y="110">学习岛</text><text x="650" y="160">行动岛</text><text x="780" y="380">碎碎念岛</text>
        </svg>
        <button className={`map-pin pin-work ${active === "work" ? "is-active" : ""}`} onClick={() => setActive("work")} aria-label="打开工作岛"><span>工</span></button>
        <button className={`map-pin pin-learning ${active === "learning" ? "is-active" : ""}`} onClick={() => setActive("learning")} aria-label="打开学习岛"><span>学</span></button>
        <button className={`map-pin pin-action ${active === "action" ? "is-active" : ""}`} onClick={() => setActive("action")} aria-label="打开行动岛"><span>行</span></button>
        <button className={`map-pin pin-life ${active === "life" ? "is-active" : ""}`} onClick={() => setActive("life")} aria-label="打开碎碎念岛"><span>想</span></button>
        <div className={`map-hint ${active ? "is-hidden" : ""}`}>点击地图上的节点</div>
      </div>
      {active && <div className="map-card" style={{ "--card-color": mapData[active].color } as React.CSSProperties}><button className="map-close" onClick={() => setActive(null)} aria-label="关闭">×</button><span className="pill">{mapData[active].label}</span><h3>{mapData[active].title}</h3><p>{mapData[active].description}</p><ul>{mapData[active].points.map((point) => <li key={point}>{point}</li>)}</ul>{mapData[active].href && <a href={mapData[active].href} target="_blank" rel="noreferrer">打开项目主站 ↗</a>}</div>}
    </section>
  );
}
