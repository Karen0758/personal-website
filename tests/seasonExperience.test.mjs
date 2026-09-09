import test from "node:test";
import assert from "node:assert/strict";

import { getTypewriterText } from "../lib/typewriter.ts";
import { preloadSeasonAssets, seasonAssets } from "../lib/seasonAssets.ts";

test("the AVG message reveals only the requested number of characters", () => {
  assert.equal(getTypewriterText("点击贴纸", 0), "");
  assert.equal(getTypewriterText("点击贴纸", 2), "点击");
  assert.equal(getTypewriterText("点击贴纸", 99), "点击贴纸");
});

test("a season is committed only after both page images finish decoding", async () => {
  const events = [];
  const images = [];
  const createImage = () => {
    const image = {
      onload: null,
      onerror: null,
      decode: async () => events.push(`decoded:${image.src}`),
      set src(value) {
        this._src = value;
        images.push(this);
      },
      get src() { return this._src; },
    };
    return image;
  };

  const loading = preloadSeasonAssets("winter", createImage);
  assert.deepEqual(images.map((image) => image.src), [seasonAssets.winter.hero, seasonAssets.winter.carriage]);
  assert.equal(events.length, 0);
  await Promise.all(images.map((image) => image.onload()));
  await loading;
  assert.deepEqual(events, [
    `decoded:${seasonAssets.winter.hero}`,
    `decoded:${seasonAssets.winter.carriage}`,
  ]);
});
