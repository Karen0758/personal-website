"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import AvgDialog from "@/components/AvgDialog";
import CarriageStickers from "@/components/CarriageStickers";
import SeasonToggle from "@/components/SeasonToggle";
import { useSeason, type Season } from "@/components/SeasonContext";
import { seasonAssets } from "@/lib/seasonAssets";

export default function SeasonalCarriagePage() {
  const { season } = useSeason();
  const [visibleSeason, setVisibleSeason] = useState<Season>(season);
  const [showGuide, setShowGuide] = useState(true);

  useEffect(() => {
    if (season === visibleSeason) return;
    const timer = window.setTimeout(() => setVisibleSeason(season), 650);
    return () => window.clearTimeout(timer);
  }, [season, visibleSeason]);

  return (
    <section
      id="journey-page-4"
      data-snap-page
      className={`journey-page journey-page--4 journey-page--season-${season}`}
      aria-label="第四页：抵达下一站"
    >
      <Image unoptimized className={`carriage-season-scene${season !== visibleSeason ? " is-leaving" : ""}`} src={seasonAssets[visibleSeason].carriage} alt="季节对应的手绘火车车厢" fill priority sizes="100vw" />
      {season !== visibleSeason && <Image unoptimized className="carriage-season-scene is-entering" src={seasonAssets[season].carriage} alt="" fill sizes="100vw" />}
      <SeasonToggle />
      <CarriageStickers onFirstStickerClick={() => setShowGuide(false)} />
      {showGuide && <AvgDialog />}
    </section>
  );
}
