const links = [
  { href: "#journey-page-2", label: "02 / 环形旅程" },
  { href: "#journey-page-3", label: "03 / 继续前行" },
  { href: "#journey-page-4", label: "04 / 联系我" },
];

export default function CanvasHeroOverlay() {
  return (
    <div className="canvas-hero-overlay" aria-label="个人主页信息层">
      <div className="canvas-hero-overlay__glass">
        <div className="canvas-hero-overlay__topline">
          <a className="canvas-hero-overlay__brand" href="#top" aria-label="回到首页顶部">
            木子女言 <span>😊</span>
            <small>很高兴认识你</small>
          </a>
          <nav className="canvas-hero-overlay__nav" aria-label="首页页面导航">
            {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
          </nav>
        </div>

        <div className="canvas-hero-overlay__content">
          <span className="canvas-hero-overlay__eyebrow">PERSONAL WEBSITE / 2026</span>
          <h1>把想法做成<br /><em>可以被看见的东西。</em></h1>
          <p>网页应用、AI、影像和真实世界里的行动。这里记录我正在做的事，也记录我如何一路走到这里。</p>
        </div>

        <div className="canvas-hero-overlay__meta">
          <span>WEB / AI / STORY</span>
          <span>从这里开始 ↓</span>
        </div>
      </div>
    </div>
  );
}
