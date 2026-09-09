export type JourneyPoint = { x: number; z: number };

export const journeyPathSegments: [JourneyPoint, JourneyPoint, JourneyPoint, JourneyPoint][] = [
  [{ x: 0, z: -29 }, { x: -1, z: -20 }, { x: -5.5, z: -18 }, { x: -5, z: -8 }],
  [{ x: -5, z: -8 }, { x: -5, z: 0 }, { x: 5, z: 0 }, { x: 5, z: 9 }],
  [{ x: 5, z: 9 }, { x: 5, z: 18 }, { x: 1, z: 20 }, { x: 0, z: 29 }],
];

export function cubicBezier(segment: [JourneyPoint, JourneyPoint, JourneyPoint, JourneyPoint], progress: number) {
  const inverse = 1 - progress;
  return {
    x: inverse ** 3 * segment[0].x + 3 * inverse ** 2 * progress * segment[1].x + 3 * inverse * progress ** 2 * segment[2].x + progress ** 3 * segment[3].x,
    z: inverse ** 3 * segment[0].z + 3 * inverse ** 2 * progress * segment[1].z + 3 * inverse * progress ** 2 * segment[2].z + progress ** 3 * segment[3].z,
  };
}

function parameterPoint(progress: number) {
  const scaled = Math.min(0.9999, Math.max(0, progress)) * journeyPathSegments.length;
  const segmentIndex = Math.floor(scaled);
  const segmentProgress = scaled - segmentIndex;
  return cubicBezier(journeyPathSegments[segmentIndex], segmentProgress);
}

export const journeyPathSamples = Array.from({ length: 601 }, (_, index) => parameterPoint(index / 600));
export const journeyPathLength = journeyPathSamples.reduce((total, point, index) => {
  if (index === 0) return 0;
  const previous = journeyPathSamples[index - 1];
  return total + Math.hypot(point.x - previous.x, point.z - previous.z);
}, 0);

const cumulativeLengths = journeyPathSamples.reduce<number[]>((lengths, point, index) => {
  if (index === 0) return [0];
  const previous = journeyPathSamples[index - 1];
  lengths.push((lengths[index - 1] ?? 0) + Math.hypot(point.x - previous.x, point.z - previous.z));
  return lengths;
}, []);

export function pathAtDistance(distance: number) {
  const clampedDistance = Math.min(journeyPathLength, Math.max(0, distance));
  let index = 0;
  while (index < cumulativeLengths.length - 1 && cumulativeLengths[index + 1] < clampedDistance) index += 1;
  const startDistance = cumulativeLengths[index] ?? 0;
  const endDistance = cumulativeLengths[index + 1] ?? startDistance + 1;
  const segmentProgress = Math.min(1, Math.max(0, (clampedDistance - startDistance) / (endDistance - startDistance)));
  const start = journeyPathSamples[index] ?? journeyPathSamples[0];
  const end = journeyPathSamples[index + 1] ?? start;
  const point = { x: start.x + (end.x - start.x) * segmentProgress, z: start.z + (end.z - start.z) * segmentProgress };
  const next = journeyPathSamples[Math.min(index + 2, journeyPathSamples.length - 1)] ?? point;
  return { point, next };
}

export function pathAt(progress: number) {
  return pathAtDistance(Math.min(1, Math.max(0, progress)) * journeyPathLength);
}
