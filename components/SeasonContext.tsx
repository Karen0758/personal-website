"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { preloadSeasonAssets } from "@/lib/seasonAssets";

export type Season = "spring" | "summer" | "autumn" | "winter";

const SeasonContext = createContext<{ season: Season; setSeason: (season: Season) => void } | null>(null);

export function getSeasonForChinaMonth(month: number): Season {
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "autumn";
  return "winter";
}

function getDefaultSeason(): Season {
  const month = Number(new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Shanghai", month: "numeric" }).format(new Date()));
  return getSeasonForChinaMonth(month);
}

export function SeasonProvider({ children }: { children: ReactNode }) {
  const [season, commitSeason] = useState<Season>(getDefaultSeason);
  const requestId = useRef(0);

  useEffect(() => {
    (["spring", "summer", "autumn", "winter"] as Season[]).forEach((item) => {
      void preloadSeasonAssets(item).catch(() => undefined);
    });
  }, []);

  const setSeason = useCallback((nextSeason: Season) => {
    const currentRequest = ++requestId.current;
    void preloadSeasonAssets(nextSeason)
      .then(() => {
        if (currentRequest === requestId.current) commitSeason(nextSeason);
      })
      .catch(() => undefined);
  }, []);

  return <SeasonContext.Provider value={{ season, setSeason }}>{children}</SeasonContext.Provider>;
}

export function useSeason() {
  const value = useContext(SeasonContext);
  if (!value) throw new Error("useSeason must be used inside SeasonProvider");
  return value;
}
