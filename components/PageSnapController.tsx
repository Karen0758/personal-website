"use client";

import { useEffect } from "react";

const WHEEL_THRESHOLD = 12;
const WHEEL_GESTURE_GAP = 180;

export default function PageSnapController() {
  useEffect(() => {
    let gestureActive = false;
    let gestureTimer: number | undefined;
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
      const scrollable = event.target instanceof Element ? event.target.closest<HTMLElement>(".about-canvas__surface, .carriage-sticker__panel") : null;
      if (scrollable && ((event.deltaY > 0 && scrollable.scrollTop + scrollable.clientHeight < scrollable.scrollHeight - 1) || (event.deltaY < 0 && scrollable.scrollTop > 0))) return;
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
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      if (gestureTimer) window.clearTimeout(gestureTimer);
    };
  }, []);
  return null;
}
