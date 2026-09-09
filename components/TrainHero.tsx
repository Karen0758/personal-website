"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import HeroTrain3D from "@/components/HeroTrain3D";
import SeasonToggle from "@/components/SeasonToggle";
import { useSeason, type Season } from "@/components/SeasonContext";
import { seasonAssets } from "@/lib/seasonAssets";

export default function TrainHero() {
  const [isMoving, setIsMoving] = useState(true);
  const [runId, setRunId] = useState(0);
  const { season } = useSeason();
  const [visibleSeason, setVisibleSeason] = useState<Season>(season);
  useEffect(() => {
    if (season === visibleSeason) return;
    const timer = window.setTimeout(() => {
      setVisibleSeason(season);
    }, 650);
    return () => window.clearTimeout(timer);
  }, [season, visibleSeason]);

  const startTrain = () => {
    setRunId((value) => value + 1);
    setIsMoving(true);
  };

  return (
    <section
      data-snap-page
      className={`train-hero${isMoving ? " is-moving" : ""}`}
      onPointerEnter={startTrain}
      onPointerDown={startTrain}
      onPointerLeave={() => setIsMoving(false)}
      aria-label="个人主页开场场景"
    >
      <Image unoptimized className={`train-hero__landscape${season !== visibleSeason ? " is-leaving" : ""}`} src={seasonAssets[visibleSeason].hero} alt="手绘风格的季节风景与铁轨" fill priority sizes="100vw" />
      {season !== visibleSeason && <Image unoptimized className="train-hero__landscape is-entering" src={seasonAssets[season].hero} alt="" fill sizes="100vw" />}
      <div className="train-hero__wash" aria-hidden="true" />
      <div className="train-hero__greeting">木子女爰：） <span>nice 2 meet u</span></div>
      <SeasonToggle />
      <HeroTrain3D moving={isMoving} runId={runId} />
      <div className="train-hero__hint" aria-hidden="true">把鼠标放到画面里，火车就会出发 →</div>
    </section>
  );
}
