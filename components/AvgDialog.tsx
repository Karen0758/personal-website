"use client";

import { useEffect, useRef, useState } from "react";
import { getTypewriterText } from "@/lib/typewriter";

const MESSAGE = "点击贴纸，查看我的个人AI作品集吧";

export default function AvgDialog() {
  const dialogRef = useRef<HTMLButtonElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCharacters, setVisibleCharacters] = useState(0);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (!entry.isIntersecting) setVisibleCharacters(0);
      },
      { threshold: 0.55 },
    );
    observer.observe(dialog);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || visibleCharacters >= MESSAGE.length) return;
    const timer = window.setTimeout(
      () => setVisibleCharacters((count) => Math.min(count + 1, MESSAGE.length)),
      82,
    );
    return () => window.clearTimeout(timer);
  }, [isVisible, visibleCharacters]);

  const isComplete = visibleCharacters >= MESSAGE.length;

  return (
    <button
      ref={dialogRef}
      type="button"
      className="carriage-avg-dialog"
      aria-label={MESSAGE}
      onClick={() => setVisibleCharacters(isComplete ? 0 : MESSAGE.length)}
    >
      <span className="carriage-avg-dialog__speaker">欢迎上车</span>
      <span className="carriage-avg-dialog__message" aria-hidden="true">
        {getTypewriterText(MESSAGE, visibleCharacters)}
        {!isComplete && <i className="carriage-avg-dialog__caret" />}
      </span>
      {isComplete && <span className="carriage-avg-dialog__next" aria-hidden="true">▼</span>}
    </button>
  );
}
