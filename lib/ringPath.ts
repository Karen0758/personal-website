export type RingPoint = { x: number; z: number };

export const RING_TRACK_RADIUS = 12.298;
export const RING_TRAIN_RADIUS = 9.2235;
export const RING_CIRCUMFERENCE = Math.PI * 2 * RING_TRACK_RADIUS;

function wrappedDistance(distance: number, radius: number): number {
  const circumference = Math.PI * 2 * radius;
  return ((distance % circumference) + circumference) % circumference;
}

export function ringPointAtDistance(distance: number, radius = RING_TRACK_RADIUS): RingPoint {
  const angle = wrappedDistance(distance, radius) / radius;
  return { x: Math.cos(angle) * radius, z: Math.sin(angle) * radius };
}

export function ringTangentAngle(distance: number, radius = RING_TRACK_RADIUS): number {
  const angle = wrappedDistance(distance, radius) / radius;
  const tangentX = -Math.sin(angle);
  const tangentZ = Math.cos(angle);
  return Math.atan2(-tangentZ, tangentX);
}

export function ringRailPointAtDistance(distance: number, offset: number): RingPoint {
  const angle = wrappedDistance(distance, RING_TRACK_RADIUS) / RING_TRACK_RADIUS;
  const railRadius = RING_TRACK_RADIUS + offset;
  return { x: Math.cos(angle) * railRadius, z: Math.sin(angle) * railRadius };
}
