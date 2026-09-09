"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, type MutableRefObject } from "react";
import type { Group } from "three";
import JourneyTrack from "@/components/JourneyTrack";
import { Carriage } from "@/components/Train3DPreview";
import { RING_CIRCUMFERENCE, RING_TRAIN_RADIUS, ringPointAtDistance, ringTangentAngle } from "@/lib/ringPath";

export const JOURNEY_SLOW_SPEED = 0.9;
export const JOURNEY_HOVER_SPEED = JOURNEY_SLOW_SPEED * 4;

function isContactPageActive() {
  return window.scrollY >= window.innerHeight * 3 - 4 && window.scrollY < window.innerHeight * 4 - 4;
}

function MovingRingTrain({ speedTarget }: { speedTarget: MutableRefObject<number> }) {
  const train = useRef<Group>(null);
  const distance = useRef(0);
  const speed = useRef(JOURNEY_SLOW_SPEED);

  useFrame((_, delta) => {
    if (!train.current) return;
    const isActive = isContactPageActive();
    if (!isActive) {
      distance.current = 0;
      speed.current = JOURNEY_SLOW_SPEED;
      train.current.visible = false;
      return;
    }
    speed.current += (speedTarget.current - speed.current) * Math.min(1, delta * 5);
    distance.current = (distance.current + speed.current * delta) % RING_CIRCUMFERENCE;
    train.current.visible = true;
    train.current.children.forEach((carriage, index) => {
      const carriageDistance = distance.current - index * 6.2;
      const point = ringPointAtDistance(carriageDistance, RING_TRAIN_RADIUS);
      carriage.position.set(point.x, 0, point.z);
      carriage.rotation.y = ringTangentAngle(carriageDistance, RING_TRAIN_RADIUS);
    });
  });

  return (
    <group ref={train} position={[0, 1.95, 0]} scale={1.35}>
      {[0, 1, 2, 3, 4].map((index) => (
        <Carriage key={index} index={index} locomotive={index === 0} moving standalone loopMotion motionDuration={1.4} />
      ))}
    </group>
  );
}

function JourneyScene({ speedTarget }: { speedTarget: MutableRefObject<number> }) {
  const scene = useRef<Group>(null);
  useFrame(() => {
    const isActive = isContactPageActive();
    if (scene.current) scene.current.visible = isActive;
  });
  return (
    <group ref={scene} visible={false} scale={1.7}>
      <JourneyTrack />
          <MovingRingTrain speedTarget={speedTarget} />
    </group>
  );
}

export default function JourneyRail({ isFast = false }: { isFast?: boolean }) {
  const speedTarget = useRef(JOURNEY_SLOW_SPEED);

  useEffect(() => {
    speedTarget.current = isFast ? JOURNEY_HOVER_SPEED : JOURNEY_SLOW_SPEED;
  }, [isFast]);

  return (
    <aside
      className="journey-rail journey-rail--ring"
      aria-label="环形玩具火车轨道"
    >
      <div
        className="journey-rail__hotspot"
        aria-hidden="true"
        onPointerEnter={() => { speedTarget.current = JOURNEY_HOVER_SPEED; }}
        onPointerDown={() => { speedTarget.current = JOURNEY_HOVER_SPEED; }}
        onPointerLeave={() => { speedTarget.current = JOURNEY_SLOW_SPEED; }}
      />
      <Canvas
        className="journey-rail__canvas"
        orthographic
        dpr={[1, 1.5]}
        camera={{ position: [0, 24, 22], zoom: 16, near: 0.1, far: 80 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl, camera }) => {
          gl.setClearColor(0x000000, 0);
          camera.lookAt(0, 0, 0);
        }}
      >
        <ambientLight intensity={2.1} />
        <hemisphereLight args={["#e8f1ed", "#8c7864", 1.2]} />
        <directionalLight position={[5, 13, 8]} intensity={2.1} />
        <JourneyScene speedTarget={speedTarget} />
      </Canvas>
    </aside>
  );
}
