"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Edges, Environment, OrbitControls, RoundedBox } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import type { Group, Mesh } from "three";
import { HERO_TRAIN_DURATION_SECONDS, wheelRotation } from "@/lib/trainMotion";

const colors = {
  teal: "#245c62",
  tealDark: "#153f45",
  cream: "#e7d9b5",
  orange: "#c96f2d",
  glass: "#6ba4b4",
  metal: "#303634",
};

function Wheel({ x, z, moving = false, duration = HERO_TRAIN_DURATION_SECONDS, loopMotion = false }: { x: number; z: number; moving?: boolean; duration?: number; loopMotion?: boolean }) {
  const wheel = useRef<Mesh>(null);
  const travelTime = useRef(0);
  useEffect(() => {
    if (!moving) {
      travelTime.current = 0;
      if (wheel.current) wheel.current.rotation.y = 0;
    }
  }, [moving]);
  useFrame((_, delta) => {
    if (!moving || !wheel.current || (!loopMotion && travelTime.current >= duration)) return;
    travelTime.current = loopMotion ? travelTime.current + delta : Math.min(duration, travelTime.current + delta);
    wheel.current.rotation.y = wheelRotation(travelTime.current / duration);
  });

  return (
    <group position={[x, -1.06, z]} rotation={[Math.PI / 2, 0, 0]}>
      <mesh ref={wheel} castShadow>
        <cylinderGeometry args={[0.42, 0.42, 0.24, 20]} />
        <meshStandardMaterial color={colors.metal} roughness={0.72} />
        <Edges color="#17201f" threshold={12} />
      </mesh>
      <mesh position={[0, 0.13, 0]}>
        <cylinderGeometry args={[0.17, 0.17, 0.27, 16]} />
        <meshStandardMaterial color="#857b68" roughness={0.65} />
      </mesh>
    </group>
  );
}

function Window({ x, side }: { x: number; side: 1 | -1 }) {
  return (
    <RoundedBox args={[0.62, 0.7, 0.06]} radius={0.08} smoothness={3} position={[x, 0.35, side * 1.035]}>
      <meshPhysicalMaterial color={colors.glass} roughness={0.24} metalness={0.05} clearcoat={0.45} />
      <Edges color="#1b3c42" threshold={12} />
    </RoundedBox>
  );
}

export function Carriage({ index, locomotive = false, moving = false, standalone = false, motionDuration = HERO_TRAIN_DURATION_SECONDS, loopMotion = false }: { index: number; locomotive?: boolean; moving?: boolean; standalone?: boolean; motionDuration?: number; loopMotion?: boolean }) {
  const length = locomotive ? 6.2 : 5.7;
  const x = standalone ? 0 : 12.5 - index * 6.25;
  const windows = locomotive ? [-1.5, -0.65, 0.25, 1.12] : [-1.8, -0.9, 0, 0.9, 1.8];

  return (
    <group position={[x, 0, 0]}>
      <RoundedBox args={[length, 1.95, 2]} radius={0.26} smoothness={5} castShadow receiveShadow>
        <meshStandardMaterial color={colors.teal} roughness={0.76} metalness={0.02} />
        <Edges color={colors.tealDark} threshold={16} />
      </RoundedBox>
      <RoundedBox args={[length - 0.18, 1.12, 2.035]} radius={0.2} smoothness={5} position={[0, 0.47, 0]} castShadow>
        <meshStandardMaterial color={colors.cream} roughness={0.82} />
        <Edges color="#695e4d" threshold={18} />
      </RoundedBox>
      <RoundedBox args={[length - 0.34, 0.4, 2.08]} radius={0.18} smoothness={5} position={[0, 1.13, 0]} castShadow>
        <meshStandardMaterial color="#d9cfb5" roughness={0.78} />
        <Edges color="#6b695e" threshold={18} />
      </RoundedBox>
      <mesh position={[0, -0.08, 1.045]}>
        <boxGeometry args={[length - 0.08, 0.12, 0.055]} />
        <meshStandardMaterial color={colors.orange} roughness={0.7} />
      </mesh>
      <mesh position={[0, -0.08, -1.045]}>
        <boxGeometry args={[length - 0.08, 0.12, 0.055]} />
        <meshStandardMaterial color={colors.orange} roughness={0.7} />
      </mesh>
      {([-1, 1] as const).map((side) => windows.map((windowX) => <Window key={`${side}-${windowX}`} x={windowX} side={side} />))}
      {([-1, 1] as const).map((side) => (
        <RoundedBox key={side} args={[0.68, 1.18, 0.07]} radius={0.08} smoothness={3} position={[-length / 2 + 0.56, 0.13, side * 1.04]}>
          <meshStandardMaterial color={colors.tealDark} roughness={0.66} />
          <Edges color="#102c30" threshold={12} />
        </RoundedBox>
      ))}
      {[-length / 2 + 1.12, length / 2 - 1.12].flatMap((wheelX) => [-1, 1].map((side) => <Wheel key={`${wheelX}-${side}`} x={wheelX} z={side * 0.98} moving={moving} duration={motionDuration} loopMotion={loopMotion} />))}
      <mesh position={[-length / 2 - 0.2, -0.48, 0]}>
        <boxGeometry args={[0.42, 0.18, 0.32]} />
        <meshStandardMaterial color={colors.metal} roughness={0.8} />
      </mesh>
      {locomotive && (
        <group position={[length / 2 + 0.01, 0.15, 0]}>
          <RoundedBox args={[0.08, 0.86, 1.45]} radius={0.08} smoothness={3} position={[0, 0.28, 0]}>
            <meshPhysicalMaterial color={colors.glass} roughness={0.2} clearcoat={0.5} />
            <Edges color="#17353a" threshold={10} />
          </RoundedBox>
          {[-0.62, 0.62].map((z) => (
            <mesh key={z} position={[0.08, -0.42, z]} rotation={[0, Math.PI / 2, 0]}>
              <cylinderGeometry args={[0.12, 0.12, 0.08, 18]} />
              <meshStandardMaterial color="#f2c45f" emissive="#9a5f1d" emissiveIntensity={0.35} />
            </mesh>
          ))}
          <RoundedBox args={[0.18, 0.24, 1.72]} radius={0.05} smoothness={2} position={[0.08, -0.72, 0]}>
            <meshStandardMaterial color={colors.orange} roughness={0.68} />
          </RoundedBox>
        </group>
      )}
    </group>
  );
}

export function TrainModel({ autoRotate = true, moving = false }: { autoRotate?: boolean; moving?: boolean }) {
  const train = useRef<Group>(null);
  useFrame((_, delta) => {
    if (autoRotate && train.current) train.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={train} rotation={[0, 0, 0]} position={[0, 0.2, 0]}>
      <Carriage index={0} locomotive moving={moving} />
      <Carriage index={1} moving={moving} />
      <Carriage index={2} moving={moving} />
      <Carriage index={3} moving={moving} />
      <Carriage index={4} moving={moving} />
    </group>
  );
}

export default function Train3DPreview() {
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <div className="train3d-preview">
      <Canvas shadows dpr={[1, 1.75]} camera={{ position: [19, 11, 22], fov: 35, near: 0.1, far: 120 }}>
        <color attach="background" args={["#d8e5e2"]} />
        <fog attach="fog" args={["#d8e5e2", 36, 62]} />
        <ambientLight intensity={1.5} />
        <directionalLight position={[8, 14, 10]} intensity={2.4} castShadow shadow-mapSize={[2048, 2048]} />
        <TrainModel autoRotate={autoRotate} />
        <ContactShadows position={[0, -1.22, 0]} opacity={0.32} scale={46} blur={2.8} far={8} />
        <Environment preset="city" environmentIntensity={0.42} />
        <OrbitControls makeDefault target={[0, 0, 0]} minDistance={14} maxDistance={48} enablePan={false} autoRotate={false} />
      </Canvas>
      <button className="train3d-preview__toggle" onClick={() => setAutoRotate((value) => !value)}>{autoRotate ? "暂停自动旋转" : "继续自动旋转"}</button>
    </div>
  );
}
