"use client";

import { useRef, useState } from "react";
import { portfolioCategories } from "@/content/portfolio";

const stickers = [
  { key: "web", title: "网页与工作流", category: "网页与工作流" },
  { key: "awards", title: "获奖经历", category: "获奖经历" },
  { key: "hardware", title: "AI短片与硬件产品", category: "AI 短片与硬件产品" },
] as const;

export default function CarriageStickers({ onFirstStickerClick }: { onFirstStickerClick?: () => void }) {
  const [active, setActive] = useState<string | null>(null);
  const hasInteracted = useRef(false);
  const activeSticker = stickers.find((sticker) => sticker.key === active);
  const category = portfolioCategories.find((item) => item.label === activeSticker?.category);

  const openSticker = (key: string) => {
    if (!hasInteracted.current) {
      hasInteracted.current = true;
      onFirstStickerClick?.();
    }
    setActive(active === key ? null : key);
  };

  return (
    <div className="carriage-stickers" aria-label="车厢里的作品集入口">
      {stickers.map((sticker) => (
        <div className={`carriage-sticker carriage-sticker--${sticker.key}`} key={sticker.key}>
          <button
            className="carriage-sticker__button"
            type="button"
            aria-label={`打开${sticker.title}`}
            aria-pressed={active === sticker.key}
            onClick={() => openSticker(sticker.key)}
          />
          {active === sticker.key && (
            category ? (
              <div className="carriage-sticker__panel" role="dialog" aria-label={`${category.label}作品集`}>
                <div className="carriage-sticker__panel-header">
                  <strong>{category.label}</strong>
                  <button type="button" aria-label={`关闭${category.label}`} onClick={() => setActive(null)}>×</button>
                </div>
                <div className="carriage-sticker__projects">
                  {category.items.map((project) => project.href ? (
                    <a href={project.href} target="_blank" rel="noreferrer" key={project.title}>
                      <span><strong>{project.title}</strong><small>{project.text}</small></span><b>↗</b>
                    </a>
                  ) : (
                    <div key={project.title}><span><strong>{project.title}</strong><small>{project.text}</small></span></div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="carriage-sticker__note" role="status">
                <strong>{sticker.title}</strong>
                <span>点击查看详细内容</span>
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
}
