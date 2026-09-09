export const HERO_TRAIN_DURATION_SECONDS = 2.6;

export function travelProgress(progress: number) {
  const clamped = Math.min(1, Math.max(0, progress));
  return clamped * clamped * (3 - 2 * clamped);
}

export function wheelRotation(progress: number, turns = 14) {
  if (progress <= 0) return 0;
  return -Math.max(0, progress) * turns * Math.PI * 2;
}
