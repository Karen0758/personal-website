import { Edges, RoundedBox } from "@react-three/drei";

const colors = {
  teal: "#17636b",
  tealDark: "#0e424a",
  cream: "#e8ddc0",
  roof: "#cfc4a8",
  glass: "#427f8f",
  orange: "#d78331",
  metal: "#3f4844",
};

export function TopViewCarriage({ locomotive = false }: { locomotive?: boolean }) {
  const length = locomotive ? 6.4 : 5.8;
  const windowPositions = locomotive ? [-1.6, -0.75, 0.15, 1.02] : [-1.8, -0.9, 0, 0.9, 1.8];

  return (
    <group>
      <RoundedBox args={[length, 0.82, 2.35]} radius={0.28} smoothness={6} castShadow receiveShadow>
        <meshStandardMaterial color={colors.teal} roughness={0.68} metalness={0.08} />
        <Edges color={colors.tealDark} threshold={12} />
      </RoundedBox>
      <RoundedBox args={[length - 0.22, 0.18, 2.1]} radius={0.16} smoothness={5} position={[0, 0.5, 0]} castShadow>
        <meshStandardMaterial color={colors.roof} roughness={0.78} />
        <Edges color="#746a58" threshold={14} />
      </RoundedBox>
      <mesh position={[0, 0.61, 0]}>
        <boxGeometry args={[length - 0.6, 0.04, 0.1]} />
        <meshStandardMaterial color="#aa9d81" roughness={0.85} />
      </mesh>
      {windowPositions.map((x) => (
        <RoundedBox key={x} args={[0.55, 0.06, 0.75]} radius={0.08} smoothness={3} position={[x, 0.62, 0]}>
          <meshPhysicalMaterial color={colors.glass} roughness={0.26} metalness={0.1} clearcoat={0.55} />
          <Edges color="#173f49" threshold={10} />
        </RoundedBox>
      ))}
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[length - 0.25, 0.05, 0.08]} />
        <meshStandardMaterial color={colors.orange} roughness={0.65} />
      </mesh>
      <RoundedBox args={[0.62, 0.16, 0.62]} radius={0.1} smoothness={3} position={[-0.55, 0.65, 0]}>
        <meshStandardMaterial color={colors.tealDark} roughness={0.58} />
        <Edges color="#092f36" threshold={10} />
      </RoundedBox>
      {locomotive && (
        <>
          <RoundedBox args={[0.72, 0.07, 1.62]} radius={0.1} smoothness={4} position={[length / 2 - 0.5, 0.65, 0]}>
            <meshPhysicalMaterial color={colors.glass} roughness={0.18} metalness={0.15} clearcoat={0.72} />
            <Edges color="#123b45" threshold={8} />
          </RoundedBox>
          <mesh position={[length / 2 + 0.08, 0.2, 0]}>
            <boxGeometry args={[0.22, 0.2, 1.45]} />
            <meshStandardMaterial color={colors.orange} roughness={0.62} />
          </mesh>
          {[-0.48, 0.48].map((z) => (
            <mesh key={z} position={[length / 2 - 0.02, 0.74, z]}>
              <sphereGeometry args={[0.13, 12, 8]} />
              <meshStandardMaterial color="#f8c968" emissive="#9a5f1d" emissiveIntensity={0.45} />
            </mesh>
          ))}
          <mesh name="front-coupler" position={[length / 2 + 0.38, 0.02, 0]}>
            <boxGeometry args={[0.38, 0.2, 0.24]} />
            <meshStandardMaterial color={colors.metal} roughness={0.82} />
          </mesh>
        </>
      )}
      <mesh position={[-length / 2 - 0.14, 0.02, 0]}>
        <boxGeometry args={[0.28, 0.16, 0.22]} />
        <meshStandardMaterial color={colors.metal} roughness={0.85} />
      </mesh>
    </group>
  );
}
