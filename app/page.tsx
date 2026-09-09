import Link from "next/link";
import Image from "next/image";
import MapJourney from "@/components/MapJourney";
import TrainHero from "@/components/TrainHero";
import PageSnapController from "@/components/PageSnapController";
import PortfolioCanvas from "@/components/PortfolioCanvas";
import ContactPage from "@/components/ContactPage";
import SeasonalCarriagePage from "@/components/SeasonalCarriagePage";
import { SeasonProvider } from "@/components/SeasonContext";

const journeyOnly = true;

const projects = [
  { title: "Momo speaking", type: "网页应用", image: "/images/web.png", href: "https://momospeaking.vercel.app/" },
  { title: "Future Beyond Scars", type: "官网与知识库", image: "/images/web2.png", href: "https://www.futurebeyondscars.cn/" },
  { title: "AI 短片", type: "影像作品", image: "/images/webai.png", href: "https://www.bilibili.com/video/BV1EYgh67E9T/" },
];

export default function Home() {
  return <SeasonProvider><main id="top" className="site-shell journey-only-page">
    <PageSnapController />
    <header className="site-header"><nav className="nav container"><Link className="brand" href="/">木子女爰：）<span>nice 2 meet u</span></Link><div className="nav-links"><a href="#journey">地图</a><a href="#about">关于我</a><a href="#outputs">产出</a><a href="#contact">联系</a></div></nav></header>

    <TrainHero />
    <SeasonalCarriagePage />
    <section id="journey-page-2" data-snap-page className="journey-page journey-page--2" aria-label="第二页：旅程开始"><PortfolioCanvas /></section>
    <section id="journey-page-3" data-snap-page className="journey-page journey-page--3" aria-label="第三页：联系方式"><ContactPage /></section>

    {!journeyOnly && <div className="post-hero-layout">
      <div className="post-hero-content"><div className="post-hero-content__inner">
    <MapJourney />

    <section id="about" className="section section-about"><div className="container"><div className="section-heading"><span className="section-kicker">02 / 关于我</span><h2>我是谁，<br /><em>我在意什么。</em></h2></div><div className="bento-grid"><article className="bento-card bento-tags"><span className="pill">我的标签</span><div className="tag-stack"><span className="tag tag-blue">家族里的第一代大学生</span><span className="tag tag-green">跨专业选手</span><span className="tag tag-warm">在上海长大的流动儿童</span><span className="tag tag-brick">AI builder</span></div><p>我相信 AI 会带来巨变，使用 AI，也警惕它放大的信息差、数据不公和权力集中。</p></article><article className="bento-card bento-book"><span className="pill pill-warm">最近在看</span><h3>《足利女童<br />连续失踪事件》</h3><Image src="/images/足利女童连续失踪事件.jpeg" alt="足利女童连续失踪事件封面" width={280} height={360} /></article><article className="bento-card bento-believe"><span className="pill pill-blue">我相信</span><ul><li>领养代替购买</li><li>公益有很多种做法</li><li>工作和生活需要平衡</li></ul></article><article className="bento-card bento-like"><span className="pill pill-warm">我喜欢</span><ul><li>悬疑小说、电影、播客</li><li>攀岩、健身、羽毛球</li><li>逛文具店和超市</li><li>搭电子积木</li></ul></article><article className="bento-card bento-book bento-book-second"><span className="pill pill-brick">最近喜欢</span><h3>《明亮的夜晚》</h3><Image src="/images/明亮的夜晚.jpg" alt="明亮的夜晚封面" width={280} height={360} /></article><article className="bento-card bento-tendency"><span className="pill">我倾向</span><ul><li>一对一沟通</li><li>先自己琢磨和整理思路</li><li>独立工作，而不是过长的头脑风暴</li></ul></article></div></div></section>

    <section id="outputs" className="section section-outputs"><div className="container"><div className="section-heading"><span className="section-kicker">03 / 我的产出</span><h2>做过的<br /><em>东西。</em></h2><p>从网页应用，到公共议题，再到影像表达。我喜欢把一个想法变成可以被看见、使用或继续讨论的东西。</p></div><div className="project-list">{projects.map((project, index) => <a className="project-row" key={project.title} href={project.href} target="_blank" rel="noreferrer"><span className="project-index">0{index + 1}</span><div className="project-image"><Image src={project.image} alt="" fill sizes="(max-width: 700px) 90vw, 240px" /></div><div className="project-copy"><span className="project-type">{project.type}</span><h3>{project.title}</h3></div><span className="project-arrow">↗</span></a>)}</div></div></section>

    <section className="section section-skills"><div className="container skills-layout"><div><span className="section-kicker">04 / 工作能力</span><h2>把复杂的事，<br /><em>变成可以行动的事。</em></h2></div><div className="skills-copy"><p>我在公益领域积累了资助管理、议题研究、项目运营与内容表达的经验，也在持续学习如何用 AI 和自动化工具推进真实项目。</p><div className="skill-lines"><div><span>01</span>资助管理与基金会运营</div><div><span>02</span>议题研究与敏捷交付</div><div><span>03</span>社会创新与行动统筹</div><div><span>04</span>AI、网页与工作流制作</div></div></div></div></section>

    <section id="contact" className="section section-contact"><div className="container"><span className="section-kicker">05 / 联系我</span><h2>如果你也有<br /><em>想一起做的事。</em></h2><a className="contact-link" href="https://github.com/Karen0758" target="_blank" rel="noreferrer">GitHub / Karen0758 ↗</a></div></section>
    <footer className="footer container"><span>© {new Date().getFullYear()} 木子女爰</span><span>工作 / 项目 / 生活</span></footer>
      </div></div>
    </div>}
  </main></SeasonProvider>;
}
