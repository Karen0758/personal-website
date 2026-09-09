import type { Season } from "@/components/SeasonContext";

export const seasonAssets: Record<Season, { hero: string; carriage: string }> = {
  spring: {
    hero: "/images/hero-train-landscape-spring-v3.webp",
    carriage: "/images/train-carriage-interior-spring.webp",
  },
  summer: {
    hero: "/images/hero-train-landscape-summer-v3.webp",
    carriage: "/images/train-carriage-interior-summer.webp",
  },
  autumn: {
    hero: "/images/hero-train-landscape-flat-autumn-v3.webp",
    carriage: "/images/train-carriage-interior-v2.webp",
  },
  winter: {
    hero: "/images/hero-train-landscape-winter-v3.webp",
    carriage: "/images/train-carriage-interior-winter.webp",
  },
};

type PreloadImage = Pick<HTMLImageElement, "src" | "onload" | "onerror" | "decode">;

const cachedAssets = new Map<string, Promise<void>>();

function preloadImage(src: string, createImage: () => PreloadImage) {
  const cached = cachedAssets.get(src);
  if (cached) return cached;

  const loading = new Promise<void>((resolve, reject) => {
    const image = createImage();
    image.onload = async () => {
      try {
        await image.decode?.();
      } catch {
        // A completed load is still safe to display when decode is unsupported.
      }
      resolve();
    };
    image.onerror = () => reject(new Error(`Unable to load seasonal image: ${src}`));
    image.src = src;
  });
  cachedAssets.set(src, loading);
  loading.catch(() => cachedAssets.delete(src));
  return loading;
}

export function preloadSeasonAssets(
  season: Season,
  createImage: () => PreloadImage = () => new window.Image(),
) {
  const assets = seasonAssets[season];
  return Promise.all([
    preloadImage(assets.hero, createImage),
    preloadImage(assets.carriage, createImage),
  ]).then(() => undefined);
}
