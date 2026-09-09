import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const modulePath = new URL("../lib/trainMotion.ts", import.meta.url);
const heroSource = readFileSync(new URL("../components/HeroTrain3D.tsx", import.meta.url), "utf8");
const heroShellSource = readFileSync(new URL("../components/TrainHero.tsx", import.meta.url), "utf8");
const modelSource = readFileSync(new URL("../components/Train3DPreview.tsx", import.meta.url), "utf8");
const journeySource = readFileSync(new URL("../components/JourneyRail.tsx", import.meta.url), "utf8");
const pageSource = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
const journeyPreviewSource = readFileSync(new URL("../components/Journey3DPreview.tsx", import.meta.url), "utf8");
const journeyPathSource = readFileSync(new URL("../lib/journeyPath.ts", import.meta.url), "utf8");
const journeyTrackSource = readFileSync(new URL("../components/JourneyTrack.tsx", import.meta.url), "utf8");
const topViewTrainSource = readFileSync(new URL("../components/TopViewTrain.tsx", import.meta.url), "utf8");
const ringPathSource = readFileSync(new URL("../lib/ringPath.ts", import.meta.url), "utf8");

test("the homepage 3D train stays parallel to the track and sits on it", () => {
  assert.match(modelSource, /rotation=\{\[0, 0, 0\]\}/);
  assert.match(heroSource, /position=\{\[-29, -9\.35/);
  assert.match(heroSource, /position\.x = -29/);
  assert.match(heroSource, /camera=\{\{ position: \[0, 5, 28\]/);
});

test("the opening train crosses the hero quickly from a lower starting position", () => {
  assert.match(heroSource, /HERO_TRAIN_DURATION_SECONDS/);
  assert.match(heroSource, /position\.y = -9\.35/);
  assert.match(readFileSync(new URL("../lib/trainMotion.ts", import.meta.url), "utf8"), /HERO_TRAIN_DURATION_SECONDS = 2\.6/);
});

test("the homepage does not render the old 2D train placeholder", () => {
  assert.doesNotMatch(heroShellSource, /hero-train-cutout-flat-teal|train-hero__vehicle|trainCanvas/);
});

test("the homepage train has reusable 3D travel motion", async () => {
  assert.equal(existsSync(modulePath), true, "train motion module has not been implemented");
  const motion = await import(modulePath.href);
  assert.equal(motion.travelProgress(-1), 0);
  assert.equal(motion.travelProgress(0), 0);
  assert.equal(motion.travelProgress(1), 1);
  assert.equal(motion.travelProgress(2), 1);
  assert.ok(motion.travelProgress(0.5) > 0.45 && motion.travelProgress(0.5) < 0.55);
  assert.equal(motion.wheelRotation(0), 0);
  assert.ok(motion.wheelRotation(1) < -80);
  assert.match(heroSource, /runId/);
  assert.match(heroShellSource, /setRunId/);
});

test("the contact page uses a large, slow circular train background", () => {
  assert.match(journeySource, /<Canvas/);
  assert.match(journeySource, /<Carriage/);
  assert.match(journeySource, /camera=\{\{ position: \[0, 24, 22\]/);
  assert.match(journeySource, /zoom: 16/);
  assert.match(journeySource, /<group ref=\{train\} position=\{\[0, 1\.95, 0\]\}/);
  assert.match(journeyPathSource, /cubicBezier/);
  assert.match(journeySource, /scrollY/);
  assert.match(journeySource, /window\.innerHeight \* 4/);
  assert.doesNotMatch(journeySource, /document\.documentElement\.scrollHeight/);
  assert.match(journeySource, /scale=\{1\.35\}/);
  assert.match(journeySource, /scale=\{1\.7\}/);
  assert.match(journeySource, /onPointerEnter/);
  assert.match(pageSource, /post-hero-content__inner/);
});

test("the contact page uses a clean circular toy-train track with slow motion", () => {
  assert.match(journeySource, /JourneyTrack/);
  assert.match(journeySource, /JOURNEY_SLOW_SPEED/);
  assert.doesNotMatch(journeySource, /JOURNEY_FAST_SPEED/);
  assert.match(journeySource, /JOURNEY_HOVER_SPEED/);
  assert.match(journeySource, /journey-rail__hotspot/);
  assert.match(journeySource, /JOURNEY_SLOW_SPEED/);
  assert.match(journeySource, /loopMotion/);
  assert.match(journeySource, /onPointerEnter|onPointerLeave/);
  assert.match(journeySource, /journey-rail--ring/);
  assert.doesNotMatch(journeySource, /journey-terrain-flat-autumn\.png/);
});

test("the contact rail is mounted before entry and supports direct train hover", () => {
  assert.doesNotMatch(journeySource, /if \(!isActive\) return null/);
  assert.match(journeySource, /onPointerDown=\{\(\) => \{ speedTarget\.current = JOURNEY_HOVER_SPEED; \}\}/);
});

test("the circular journey positions each carriage on the same ring", () => {
  assert.match(journeySource, /ringPointAtDistance/);
  assert.match(journeySource, /ringTangentAngle/);
  assert.match(journeyTrackSource, /RingTrack/);
  assert.match(journeyTrackSource, /ringRailPointAtDistance/);
  assert.match(ringPathSource, /RING_TRACK_RADIUS = 12\.298/);
  assert.match(ringPathSource, /RING_TRAIN_RADIUS = 9\.2235/);
  assert.match(journeySource, /RING_TRAIN_RADIUS/);
});

test("the 3D journey preview exposes the full path and moving train", () => {
  assert.match(journeyPreviewSource, /JourneyTrack/);
  assert.match(journeyPreviewSource, /<Carriage/);
  assert.match(journeyPreviewSource, /pathAtDistance/);
  assert.match(journeyPreviewSource, /Carriage/);
  assert.match(journeyPathSource, /pathAtDistance/);
  assert.match(journeyPreviewSource, /camera=\{\{ position: \[0, 26, 20\]/);
});

test("the journey uses a visible two-rail track with sleepers", () => {
  assert.match(journeyTrackSource, /railPoints/);
  assert.match(journeyTrackSource, /sleeper/);
  assert.match(journeyTrackSource, /boxGeometry/);
  assert.match(journeyTrackSource, /RING_CIRCUMFERENCE/);
  assert.match(journeyTrackSource, /-0\.98/);
});

test("the journey uses a dedicated top-view train model", () => {
  assert.match(topViewTrainSource, /RoundedBox/);
  assert.match(topViewTrainSource, /windshield|window/i);
  assert.match(topViewTrainSource, /locomotive/);
  assert.match(topViewTrainSource, /coupler/);
});

test("the journey rail is mounted only inside the contact page", () => {
  assert.doesNotMatch(pageSource, /<JourneyRail \/>/);
});
