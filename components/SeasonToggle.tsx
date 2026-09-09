"use client";

import { useSeason, type Season } from "@/components/SeasonContext";

const seasons: Season[] = ["spring", "summer", "autumn", "winter"];

export default function SeasonToggle({ onChange }: { onChange?: (season: Season) => void }) {
  const { season, setSeason } = useSeason();
  const nextSeason = seasons[(seasons.indexOf(season) + 1) % seasons.length];

  return (
    <button
      className={`season-toggle season-toggle--${season}`}
      type="button"
      onClick={() => {
        onChange?.(nextSeason);
        setSeason(nextSeason);
      }}
      aria-label="切换季节"
      title="切换季节"
    >
      <svg viewBox="0 0 44 44" aria-hidden="true">
        <path d="M35.8 7.7C24.6 8.2 13 12.3 9 22.5c-2.1 5.5.3 10.5 5.3 12.7 5.4 2.4 11.4.4 15.3-3.7 5.4-5.7 6-15.3 6.2-23.8Z" />
        <path d="M8 36c6-9.7 13.1-16.3 23.8-23.2" />
      </svg>
    </button>
  );
}
