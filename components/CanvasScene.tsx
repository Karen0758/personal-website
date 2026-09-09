"use client";

import { useEffect, useRef } from "react";

type Dot = { x: number; y: number; r: number; phase: number; color: string };

const palette = ["#c9f04c", "#8d9990", "#6f7772", "#d6d2c7"];

export default function CanvasScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0.72, y: 0.28 };
    const dots: Dot[] = Array.from({ length: 22 }, (_, index) => ({
      x: 0.18 + ((index * 0.137) % 0.72),
      y: 0.18 + ((index * 0.219) % 0.64),
      r: index % 5 === 0 ? 3.5 : 1.5,
      phase: index * 0.7,
      color: palette[index % palette.length],
    }));

    let frame = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);
      const t = reduceMotion ? 0 : time / 1000;
      const points = dots.map((dot) => ({
        x: dot.x * width + Math.sin(t * 0.22 + dot.phase) * 10 + (pointer.x - 0.5) * 18,
        y: dot.y * height + Math.cos(t * 0.18 + dot.phase) * 8 + (pointer.y - 0.5) * 12,
      }));

      context.lineWidth = 1;
      context.strokeStyle = "rgba(30, 33, 31, .12)";
      for (let i = 0; i < points.length - 1; i += 1) {
        const a = points[i];
        const b = points[i + 1];
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();
      }

      points.forEach((point, index) => {
        const dot = dots[index];
        context.beginPath();
        context.fillStyle = dot.color;
        context.globalAlpha = 0.55 + Math.sin(t * 0.8 + dot.phase) * 0.18;
        context.arc(point.x, point.y, dot.r, 0, Math.PI * 2);
        context.fill();
      });
      context.globalAlpha = 1;

      if (!reduceMotion) frame = window.requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX / window.innerWidth;
      pointer.y = event.clientY / window.innerHeight;
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="canvas-scene" aria-hidden="true" />;
}
