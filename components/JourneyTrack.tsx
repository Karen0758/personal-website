import { Line } from "@react-three/drei";
import { RING_CIRCUMFERENCE, ringRailPointAtDistance, ringTangentAngle } from "@/lib/ringPath";

type Point3 = [number, number, number];

function railPoints(offset: number): Point3[] {
  return Array.from({ length: 181 }, (_, index) => {
    const point = ringRailPointAtDistance((index / 180) * RING_CIRCUMFERENCE, offset);
    return [point.x, 0, point.z];
  });
}

const leftRail = railPoints(-0.98);
const rightRail = railPoints(0.98);
const sleepers = Array.from({ length: 36 }, (_, index) => {
  const distance = (index / 36) * RING_CIRCUMFERENCE;
  const point = ringRailPointAtDistance(distance, 0);
  return { point, angle: ringTangentAngle(distance) + Math.PI / 2 };
});

export default function JourneyTrack() {
  return (
    <group name="RingTrack">
      <Line points={leftRail} color="#635b50" lineWidth={5} />
      <Line points={rightRail} color="#635b50" lineWidth={5} />
      <Line points={leftRail} color="#c6c0b5" lineWidth={1.5} />
      <Line points={rightRail} color="#c6c0b5" lineWidth={1.5} />
      {sleepers.map(({ point, angle }) => (
        <mesh key={`${point.x}-${point.z}`} position={[point.x, -0.08, point.z]} rotation={[0, angle, 0]} receiveShadow>
          <boxGeometry args={[3.7, 0.16, 0.28]} />
          <meshStandardMaterial color="#766455" roughness={0.95} />
        </mesh>
      ))}
    </group>
  );
}
