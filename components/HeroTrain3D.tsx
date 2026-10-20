"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import type { Group } from "three";
import { TrainModel } from "@/components/Train3DPreview";
import { HERO_TRAIN_DURATION_SECONDS, travelProgress } from "@/lib/trainMotion";

function MovingHeroTrain({ moving, runId }: { moving: boolean; runId: number }) {
  const vehicle = useRef<Group>(null);
  const startedAt = useRef<number | null>(null);
  const [compact, setCompact] = useState(false);
  const mobileTrackY = (height: number) => -2.4 - (height * 0.37) / 42;

  useEffect(() => {
    const media = window.matchMedia("(max-width: 700px)");
    const update = () => setCompact(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    startedAt.current = null;
    if (vehicle.current) vehicle.current.position.set(compact ? -12 : -29, compact ? mobileTrackY(window.innerHeight) : -9.35, 0);
  }, [moving, runId, compact]);

  useFrame(({ clock, size }) => {
    if (!moving || !vehicle.current) return;
    if (startedAt.current === null) startedAt.current = clock.elapsedTime;
    const elapsed = clock.elapsedTime - startedAt.current;
    const rawProgress = Math.min(1, elapsed / HERO_TRAIN_DURATION_SECONDS);
    const progress = travelProgress(rawProgress);
    vehicle.current.position.x = compact ? -12 + progress * 12 : -29 + progress * 74;
    vehicle.current.position.y = (compact ? mobileTrackY(size.height) : -9.35) + Math.sin(rawProgress * Math.PI * 22) * 0.035;
  });

  return (
    <group ref={vehicle} position={[-29, -9.35, 0]} scale={compact ? 0.22 : 1.34}>
      <TrainModel autoRotate={false} moving={moving} />
      <ContactShadows position={[0, -1.38, 0]} opacity={0.18} scale={34} blur={2.4} far={4} />
    </group>
  );
}

export default function HeroTrain3D({ moving, runId }: { moving: boolean; runId: number }) {
  return (
    <div className="train-hero__3d" aria-hidden="true">
      <Canvas
        orthographic
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 5, 28], zoom: 42, near: 0.1, far: 80 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl, camera }) => {
          gl.setClearColor(0x000000, 0);
          camera.lookAt(0, -2.4, 0);
        }}
      >
        <ambientLight intensity={1.8} />
        <hemisphereLight args={["#d9eff5", "#7f7868", 1.1]} />
        <directionalLight position={[5, 13, 11]} intensity={2.25} castShadow shadow-mapSize={[1024, 1024]} />
        <MovingHeroTrain moving={moving} runId={runId} />
      </Canvas>
    </div>
  );
}
