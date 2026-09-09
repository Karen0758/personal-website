"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";
import JourneyTrack from "@/components/JourneyTrack";
import { Carriage } from "@/components/Train3DPreview";
import { journeyPathLength, pathAtDistance } from "@/lib/journeyPath";

function MovingPreviewTrain() {
  const train = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!train.current) return;
    const headDistance = ((clock.elapsedTime / 12) % 1) * journeyPathLength;
    train.current.children.forEach((carriage, index) => {
      const { point, next } = pathAtDistance(headDistance - index * 6.2);
      carriage.position.set(point.x, 0, point.z);
      carriage.rotation.y = Math.atan2(-(next.z - point.z), next.x - point.x);
    });
  });

  return (
    <group ref={train} scale={0.9}>
      <Carriage index={0} locomotive moving standalone />
      <Carriage index={1} moving standalone />
      <Carriage index={2} moving standalone />
      <Carriage index={3} moving standalone />
      <Carriage index={4} moving standalone />
    </group>
  );
}

export default function Journey3DPreview() {
  return (
    <Canvas
      orthographic
      dpr={[1, 1.75]}
      camera={{ position: [0, 26, 20], zoom: 25, near: 0.1, far: 100 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
    >
      <color attach="background" args={["#e6dfd1"]} />
      <ambientLight intensity={2.2} />
      <hemisphereLight args={["#f3eee3", "#766556", 1.3]} />
      <directionalLight position={[5, 14, 8]} intensity={2.3} />
      <JourneyTrack />
      <MovingPreviewTrain />
    </Canvas>
  );
}
