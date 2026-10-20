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
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    startedAt.current = null;
    if (vehicle.current) vehicle.current.position.set(-29, -9.35, 0);
  }, [moving, runId]);

  useFrame(({ clock, size }) => {
    if (!vehicle.current) return;
    const compact = size.width <= 1000 && size.height <= 520;
    if (!moving && !compact && !reduceMotion) return;
    if (startedAt.current === null) startedAt.current = clock.elapsedTime;
    const elapsed = clock.elapsedTime - startedAt.current;
    const phase = compact ? (elapsed + 0.6) % (HERO_TRAIN_DURATION_SECONDS + 1.2) : elapsed;
    const rawProgress = Math.min(1, phase / HERO_TRAIN_DURATION_SECONDS);
    const progress = travelProgress(rawProgress);
    const scale = compact ? Math.min(0.5, size.width / 1700) : 1.34;
    const halfTravel = compact ? size.width / (2 * 42) + 16 * scale + 1 : 37;
    vehicle.current.scale.setScalar(scale);
    vehicle.current.visible = reduceMotion || !compact || phase <= HERO_TRAIN_DURATION_SECONDS;
    vehicle.current.position.x = reduceMotion ? 0 : -halfTravel + progress * halfTravel * 2;
    vehicle.current.position.y = compact ? -2.4 - (size.height / 2 - 50) / 42 + scale : -9.35;
  });

  return (
    <group ref={vehicle} position={[-29, -9.35, 0]} scale={1.34}>
      <TrainModel autoRotate={false} moving={moving && !reduceMotion} />
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
