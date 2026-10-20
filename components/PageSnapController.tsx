"use client";

import { useEffect } from "react";

const WHEEL_THRESHOLD = 12;
const WHEEL_GESTURE_GAP = 180;

export default function PageSnapController() {
  useEffect(() => {
    let gestureActive = false;
    let gestureTimer: number | undefined;
    let touchStartY = 0;
    const getPages = () => Array.from(document.querySelectorAll<HTMLElement>(".train-hero[data-snap-page], .map-section[data-snap-page], .section, .journey-page[data-snap-page]"));
    const scheduleGestureEnd = () => {
      if (gestureTimer) window.clearTimeout(gestureTimer);
      gestureTimer = window.setTimeout(() => { gestureActive = false; }, WHEEL_GESTURE_GAP);
    };

    const movePage = (direction: 1 | -1) => {
      const pages = getPages();
      if (!pages.length) return;
      const currentIndex = Math.min(pages.length - 1, Math.max(0, Math.round(window.scrollY / window.innerHeight)));
      const nextIndex = Math.min(pages.length - 1, Math.max(0, currentIndex + direction));
      if (nextIndex === currentIndex) return;
      window.scrollTo({ top: pages[nextIndex].offsetTop, behavior: "auto" });
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (Math.abs(event.deltaY) < WHEEL_THRESHOLD) return;
      if (gestureActive) { scheduleGestureEnd(); return; }
      gestureActive = true;
      scheduleGestureEnd();
      movePage(event.deltaY > 0 ? 1 : -1);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      const direction = event.key === "ArrowDown" || event.key === "PageDown" || (event.key === " " && !event.shiftKey)
        ? 1 : event.key === "ArrowUp" || event.key === "PageUp" || (event.key === " " && event.shiftKey) ? -1 : 0;
      if (!direction) return;
      event.preventDefault();
      movePage(direction);
    };
    const onTouchStart = (event: TouchEvent) => { touchStartY = event.touches[0]?.clientY ?? 0; };
    const onTouchEnd = (event: TouchEvent) => {
      const deltaY = touchStartY - (event.changedTouches[0]?.clientY ?? touchStartY);
      if (Math.abs(deltaY) >= 36) movePage(deltaY > 0 ? 1 : -1);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      if (gestureTimer) window.clearTimeout(gestureTimer);
    };
  }, []);
  return null;
}
