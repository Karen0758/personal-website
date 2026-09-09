export type PortfolioItem = { title: string; text: string; href?: string };
export type PortfolioCategory = { label: string; items: PortfolioItem[] };

export const portfolioCategories: PortfolioCategory[] = [
  {
    label: "网页与工作流",
    items: [
      { title: "Momo Speaking", text: "个人作品，阿里巴巴「小有可为」黑客松人气应用奖。", href: "https://momospeaking.vercel.app/" },
      { title: "Future Beyond Scars 官网", text: "个人参赛，腾讯 AI and Society 创造营行动组入选作品。", href: "https://www.futurebeyondscars.cn/" },
      { title: "Future Beyond Scars Newsletter", text: "同上。", href: "https://newsletter.futurebeyondscars.cn/" },
      { title: "SIX newsletter 工作流", text: "同上。" },
    ],
  },
  {
    label: "AI 短片与硬件产品",
    items: [
      { title: "非自杀性自伤行动科普公益短片", text: "全网播放 3 万+、获赞 3000+ 的公益科普短片。", href: "https://www.bilibili.com/video/BV1V8uj6FE6f/" },
      { title: "平行时空", text: "一部真人日系 AI 短片。", href: "https://www.bilibili.com/video/BV1EYgh67E9T/" },
      { title: "食刻，冰箱 AI 管家", text: "Her Story 女性硬件黑客松三等奖，负责硬件开发。" },
    ],
  },
  {
    label: "获奖经历",
    items: [
      { title: "科大讯飞 Astron 产业智变黑客松团队一等奖", text: "" },
      { title: "腾讯 AI and Society 创造营行动组入选", text: "" },
      { title: "阿里巴巴「小有可为」黑客松人气应用奖", text: "" },
      { title: "Her Story 女性硬件黑客松三等奖", text: "" },
    ],
  },
];

export const contactLinks = [
  { label: "小红书", href: "https://www.xiaohongshu.com/user/profile/62540426000000000d032e4c", className: "contact-icon--xiaohongshu" },
  { label: "B站", href: "https://space.bilibili.com/507055741?spm_id_from=333.1007.0.0", className: "contact-icon--bilibili" },
  { label: "GitHub", href: "https://github.com/Karen0758", className: "contact-icon--github" },
  { label: "推特", href: "https://x.com/Karen__0758", className: "contact-icon--twitter" },
] as const;
