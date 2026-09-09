import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const controllerPath = new URL("../components/PageSnapController.tsx", import.meta.url);
const controllerSource = readFileSync(controllerPath, "utf8");
const pageSource = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
const heroSource = readFileSync(new URL("../components/TrainHero.tsx", import.meta.url), "utf8");
const styleSource = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
const railSource = readFileSync(new URL("../components/JourneyRail.tsx", import.meta.url), "utf8");
const overlaySource = readFileSync(new URL("../components/CanvasHeroOverlay.tsx", import.meta.url), "utf8");
const portfolioSource = readFileSync(new URL("../components/PortfolioCanvas.tsx", import.meta.url), "utf8");
const portfolioContentPath = new URL("../content/portfolio.ts", import.meta.url);
const portfolioContentSource = readFileSync(portfolioContentPath, "utf8");
const contactSource = readFileSync(new URL("../components/ContactPage.tsx", import.meta.url), "utf8");
const stickerSourcePath = new URL("../components/CarriageStickers.tsx", import.meta.url);
const seasonSourcePath = new URL("../components/SeasonContext.tsx", import.meta.url);
const seasonAssetsSource = readFileSync(new URL("../lib/seasonAssets.ts", import.meta.url), "utf8");
const carriagePageSourcePath = new URL("../components/SeasonalCarriagePage.tsx", import.meta.url);
const carriagePageSource = readFileSync(carriagePageSourcePath, "utf8");
const seasonToggleSource = readFileSync(new URL("../components/SeasonToggle.tsx", import.meta.url), "utf8");
const avgDialogSource = readFileSync(new URL("../components/AvgDialog.tsx", import.meta.url), "utf8");

test("the homepage has four full-screen journey pages", () => {
  assert.equal(existsSync(controllerPath), true);
  assert.match(pageSource, /<PageSnapController \/>/);
  assert.doesNotMatch(controllerSource, /page-transition/);
  assert.doesNotMatch(styleSource, /page-transition/);
  assert.match(pageSource, /journey-only-page/);
  assert.match(pageSource, /journey-page journey-page--2/);
  assert.match(pageSource, /journey-page journey-page--3/);
  assert.match(pageSource, /<SeasonalCarriagePage \/>/);
  assert.match(carriagePageSource, /journey-page journey-page--4/);
  assert.match(pageSource, /!journeyOnly/);
  assert.match(heroSource, /data-snap-page/);
  assert.match(heroSource, /train-hero__greeting">木子女爰：） <span>nice 2 meet u<\/span>/);
  assert.match(styleSource, /train-hero__greeting \{ position:absolute; z-index:6;/);
  assert.doesNotMatch(styleSource, /journey-only-page \.train-hero__3d/);
  assert.match(controllerSource, /journey-page/);
  assert.match(styleSource, /journey-rail--ring/);
  assert.match(styleSource, /contact-page > \.journey-rail/);
  assert.doesNotMatch(railSource, /journey-rail__landscape/);
  assert.doesNotMatch(railSource, /journey-terrain-flat-autumn\.png/);
  assert.match(railSource, /locomotive=\{index === 0\}/);
  assert.doesNotMatch(heroSource, /<CanvasHeroOverlay \/>/);
  assert.match(pageSource, /journey-page--2[\s\S]*<PortfolioCanvas \/>/);
  assert.match(overlaySource, /canvas-hero-overlay/);
  assert.match(overlaySource, /木子女言/);
  assert.match(overlaySource, /关于我|作品集|联系/);
  assert.match(styleSource, /backdrop-filter/);
  assert.match(styleSource, /pointer-events:none/);
  assert.match(pageSource, /<PortfolioCanvas \/>/);
  assert.match(portfolioSource, /portfolio-canvas/);
  assert.match(portfolioSource, /<h2[^>]*>关于我<\/h2>/);
  assert.match(portfolioSource, /教育背景/);
  assert.match(portfolioSource, /上海大学/);
  assert.match(portfolioSource, /中国社会科学院大学/);
  assert.match(portfolioSource, /法学专业/);
  assert.match(portfolioSource, /社会工作专业/);
  assert.match(portfolioSource, /工作经验/);
  assert.match(portfolioSource, /上海市乐知一心慈善基金会/);
  assert.match(portfolioSource, /zulution\.ai/);
  assert.match(portfolioSource, /AI 产品运营/);
  assert.doesNotMatch(portfolioSource, /PORTFOLIO/);
  assert.match(portfolioContentSource, /AI 短片/);
  assert.doesNotMatch(portfolioContentSource, /知识库|Waving App/);
  assert.match(portfolioContentSource, /Future Beyond Scars Newsletter/);
  assert.match(portfolioContentSource, /SIX newsletter 工作流/);
  assert.match(portfolioContentSource, /个人作品，阿里巴巴「小有可为」黑客松人气应用奖/);
  assert.match(portfolioContentSource, /个人参赛，腾讯 AI and Society/);
  assert.match(portfolioContentSource, /真人日系 AI 短片/);
  assert.match(portfolioContentSource, /食刻，冰箱 AI 管家/);
  assert.match(portfolioContentSource, /科大讯飞 Astron 产业智变黑客松团队一等奖/);
  assert.match(portfolioContentSource, /网页与工作流/);
  assert.match(portfolioContentSource, /硬件产品/);
  assert.match(portfolioContentSource, /获奖经历/);
  assert.match(portfolioContentSource, /AI 短片与硬件产品/);
  assert.match(portfolioContentSource, /网页与工作流[\s\S]*AI 短片与硬件产品/);
  assert.match(styleSource, /about-canvas__tabs/);
  assert.match(portfolioContentSource, /非自杀性自伤行动科普公益短片/);
  assert.match(portfolioContentSource, /冰箱 AI 管家/);
  assert.match(portfolioContentSource, /腾讯 AI and Society/);
  assert.match(portfolioContentSource, /阿里巴巴「小有可为」黑客松/);
  assert.match(portfolioContentSource, /Her Story 女性硬件黑客松/);
  assert.match(portfolioContentSource, /个人作品|个人参赛/);
  assert.match(portfolioContentSource, /硬件开发/);
  assert.doesNotMatch(portfolioSource, /我做过的|从网页应用|portfolio-canvas__scroll|IntersectionObserver|useInView/);
  assert.doesNotMatch(portfolioSource, /<Liquid/);
  assert.match(portfolioSource, /about-group__items/);
  assert.equal(existsSync(portfolioContentPath), true);
  assert.match(styleSource, /portfolio-landscape-handpainted-v1\.png/);
  assert.equal(existsSync(new URL("../public/images/portfolio-landscape-handpainted-v1.png", import.meta.url)), true);
  assert.match(pageSource, /<ContactPage \/>/);
  assert.match(contactSource, /<JourneyRail isFast=\{isFast\} \/>/);
  assert.match(portfolioContentSource, /小红书|B站|GitHub|推特/);
  assert.match(portfolioContentSource, /space\.bilibili\.com\/507055741/);
  assert.match(portfolioContentSource, /x\.com\/Karen__0758/);
  assert.match(portfolioContentSource, /xiaohongshu\.com\/user\/profile\/62540426000000000d032e4c/);
  assert.match(contactSource, /contact-page__links/);
  assert.match(contactSource, /<\/div>\s*<div className="contact-page__links">/);
  assert.match(styleSource, /\.contact-page__links \{ position:absolute/);
  assert.match(styleSource, /contact-page h2[^}]*transform:translateY/);
  assert.match(styleSource, /contact-icon \{ position:absolute; width:clamp\(96px,10vw,150px\)/);
  assert.match(styleSource, /contact-page__links \{ top:50%; right:clamp/);
  assert.match(styleSource, /contact-icon:nth-child\(1\),\.contact-icon:nth-child\(2\),\.contact-icon:nth-child\(3\),\.contact-icon:nth-child\(4\) \{ position:static; transform:none/);
  assert.match(styleSource, /contact-page__links[^}]*right:clamp/);
  assert.match(styleSource, /contact-icon:nth-child\(1\)[^}]*transform:none/);
  assert.match(contactSource, /useState/);
  assert.match(contactSource, /onPointerEnter/);
  assert.match(contactSource, /contact-icon--xiaohongshu/);
  assert.match(contactSource, /xiaohongshu-sprout-only-v1\.png/);
  assert.equal(existsSync(new URL("../public/images/xiaohongshu-sprout-only-v1.png", import.meta.url)), true);
  assert.match(styleSource, /\.contact-icon--xiaohongshu img \{ width:70px; height:70px; \}/);
  assert.doesNotMatch(contactSource, /<span>\{contact\.label\}<\/span>/);
  assert.match(styleSource, /contact-icon:hover \{ transform:translateX/);
  assert.doesNotMatch(contactSource, /03 \/ CONTACT/);
  assert.match(styleSource, /portfolio-canvas[^}]*CJKAllSeto/);
  assert.match(seasonAssetsSource, /train-carriage-interior-v2\.png/);
  assert.match(styleSource, /CJKAllSeto/);
  assert.match(styleSource, /cjkFonts-allseto-v1\.11-2\.ttf/);
  assert.equal(existsSync(new URL("../public/fonts/cjkFonts-allseto-v1.11-2.ttf", import.meta.url)), true);
});

test("the about page switches between education and work panels", () => {
  assert.match(portfolioSource, /useState<AboutSection>\("education"\)/);
  assert.match(portfolioSource, /about-canvas__tabs/);
  assert.match(portfolioSource, /教育背景/);
  assert.match(portfolioSource, /工作经验/);
  assert.match(portfolioSource, /setActiveSection\("education"\)/);
  assert.match(portfolioSource, /setActiveSection\("work"\)/);
  assert.match(portfolioSource, /aria-pressed=\{activeSection === "education"\}/);
  assert.match(portfolioSource, /aria-pressed=\{activeSection === "work"\}/);
  assert.match(portfolioSource, /about-canvas__panel/);
  assert.match(styleSource, /about-canvas__tab\.is-active/);
  assert.match(styleSource, /@keyframes aboutPanelIn/);
});

test("the about page uses readable and consistent type sizes", () => {
  assert.match(styleSource, /train-hero__greeting[^}]*font-size:clamp\(18px,1\.5vw,24px\)/);
  assert.match(styleSource, /about-canvas__tab[^}]*font-size:clamp\(18px,1\.5vw,23px\)/);
  assert.match(styleSource, /about-canvas__tab span[^}]*font-size:1em/);
  assert.match(styleSource, /about-group__heading span[^}]*font-size:clamp\(24px,2\.5vw,40px\)/);
  assert.match(styleSource, /about-group__heading h3[^}]*font-size:clamp\(24px,2\.5vw,40px\)/);
  assert.match(styleSource, /about-item strong[^}]*font-size:clamp\(19px,1\.7vw,26px\)/);
  assert.match(styleSource, /about-item span[^}]*font-size:15px/);
  assert.match(styleSource, /about-item p[^}]*font-size:14px/);
});

test("page snapping blocks wheel drift and lands immediately on a full page", () => {
  assert.match(controllerSource, /event\.preventDefault\(\);[\s\S]*Math\.abs\(event\.deltaY\) < WHEEL_THRESHOLD/);
  assert.match(controllerSource, /window\.scrollTo\(\{ top: pages\[nextIndex\]\.offsetTop, behavior: "auto" \}\)/);
  assert.doesNotMatch(controllerSource, /scrollIntoView\(\{ behavior: "smooth"/);
  assert.match(controllerSource, /Math\.round\(window\.scrollY \/ window\.innerHeight\)/);
  assert.doesNotMatch(controllerSource, /pages\.reduce\(\(closestIndex/);
  assert.doesNotMatch(controllerSource, /if \(gestureActive\) scheduleGestureEnd\(\);/);
});

test("one wheel gesture cannot advance across two pages", () => {
  assert.match(controllerSource, /const WHEEL_GESTURE_GAP = 180;/);
  assert.match(controllerSource, /const scheduleGestureEnd = \(\) =>/);
  assert.match(controllerSource, /if \(gestureActive\) \{ scheduleGestureEnd\(\); return; \}/);
  assert.doesNotMatch(controllerSource, /const LOCK_DURATION/);
});

test("the carriage page includes interactive portfolio stickers", () => {
  const stickerSource = readFileSync(stickerSourcePath, "utf8");
  assert.match(pageSource, /<SeasonalCarriagePage \/>/);
  assert.match(styleSource, /portfolio-stickers-sheet\.png/);
  assert.match(stickerSource, /网页与工作流/);
  assert.match(stickerSource, /获奖经历/);
  assert.match(stickerSource, /AI短片与硬件产品/);
  assert.match(stickerSource, /portfolioCategories/);
  assert.match(stickerSource, /project\.href/);
  assert.match(portfolioContentSource, /momospeaking\.vercel\.app/);
  assert.match(portfolioContentSource, /futurebeyondscars\.cn/);
  assert.match(stickerSource, /carriage-sticker__panel/);
  assert.match(stickerSource, /AI 短片与硬件产品/);
  assert.match(stickerSource, /category\.items/);
  assert.match(portfolioContentSource, /Her Story 女性硬件黑客松/);
  assert.match(portfolioContentSource, /科大讯飞 Astron/);
  assert.match(styleSource, /carriage-stickers/);
  assert.match(styleSource, /carriage-sticker--web \{ left:32%; top:30%;/);
  assert.match(styleSource, /carriage-sticker--hardware \.carriage-sticker__panel \{ top:50%; right:calc\(100% \+ 18px\);/);
  assert.match(styleSource, /carriage-sticker--awards \{ left:calc\(73% - 240px\); top:calc\(37% - 36px\);/);
  assert.match(styleSource, /trophy-sticker-v2\.png/);
  assert.equal(existsSync(new URL("../public/images/trophy-sticker-v2.png", import.meta.url)), true);
  assert.match(styleSource, /carriage-sticker--hardware \{ right:19%; bottom:15%;/);
});

test("the carriage portfolio panel keeps project names and descriptions readable", () => {
  assert.match(styleSource, /carriage-sticker__projects span strong \{[^}]*font-size:15px;/);
  assert.match(styleSource, /carriage-sticker__projects small \{[^}]*font-size:14px;/);
});

test("the journey pages follow the intended order after the hero", () => {
  const carriageIndex = pageSource.indexOf('aria-label="第四页：抵达下一站"');
  const portfolioIndex = pageSource.indexOf('aria-label="第二页：旅程开始"');
  const contactIndex = pageSource.indexOf('aria-label="第三页：联系方式"');
  assert.ok(carriageIndex < portfolioIndex);
  assert.ok(portfolioIndex < contactIndex);
});

test("the home season controls the carriage background with China-time defaults", () => {
  const seasonSource = readFileSync(seasonSourcePath, "utf8");
  const carriageSource = readFileSync(carriagePageSourcePath, "utf8");
  assert.match(pageSource, /<SeasonProvider>/);
  assert.match(seasonSource, /Asia\/Shanghai/);
  assert.match(seasonSource, /month >= 3 && month <= 5/);
  assert.match(seasonSource, /month >= 6 && month <= 8/);
  assert.match(seasonSource, /month >= 9 && month <= 11/);
  assert.match(seasonAssetsSource, /train-carriage-interior-spring\.png/);
  assert.match(seasonAssetsSource, /train-carriage-interior-summer\.png/);
  assert.match(seasonAssetsSource, /train-carriage-interior-autumn|train-carriage-interior-v2\.png/);
  assert.match(seasonAssetsSource, /train-carriage-interior-winter\.png/);
  assert.match(heroSource, /<SeasonToggle \/>/);
  assert.match(carriageSource, /<SeasonToggle \/>/);
  assert.match(seasonToggleSource, /setSeason\(nextSeason\)/);
  assert.match(styleSource, /journey-page--4 > \.season-toggle \{ top:auto; right:32px; bottom:32px; left:auto; transform:none;/);
});

test("the carriage page has an AVG-style typewriter guide", () => {
  assert.match(carriagePageSource, /<AvgDialog \/>/);
  assert.match(avgDialogSource, /点击贴纸，查看我的个人AI作品集吧/);
  assert.match(avgDialogSource, /IntersectionObserver/);
  assert.match(styleSource, /carriage-avg-dialog/);
});

test("the AVG guide disappears after the first portfolio sticker click", () => {
  const stickerSource = readFileSync(stickerSourcePath, "utf8");
  assert.match(carriagePageSource, /const \[showGuide, setShowGuide\] = useState\(true\)/);
  assert.match(carriagePageSource, /<CarriageStickers onFirstStickerClick=\{\(\) => setShowGuide\(false\)\} \/>/);
  assert.match(carriagePageSource, /\{showGuide && <AvgDialog \/>\}/);
  assert.match(stickerSource, /onFirstStickerClick\?: \(\) => void/);
  assert.match(stickerSource, /onFirstStickerClick\?\.\(\)/);
});
