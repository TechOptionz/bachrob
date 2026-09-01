"use client";

import { useRef } from "react";
import { useScrollEffect } from "./useInView";

/**
 * Hairline reading-progress bar pinned above the sticky nav.
 *
 * Paints by writing a 0–1 ratio into a custom property that the CSS turns into
 * a single `scaleX` — no layout, no per-frame React render.
 */
export default function ScrollProgress() {
  const fill = useRef<HTMLDivElement>(null);

  useScrollEffect(() => {
    const el = fill.current;
    if (!el) return;
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
    el.style.setProperty(
      "--br-progress",
      String(Math.min(1, Math.max(0, ratio))),
    );
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent"
    >
      <div
        ref={fill}
        className="br-progress-fill h-full bg-[linear-gradient(90deg,#1E4B8F_0%,#2A5CA8_55%,#9FB8DC_100%)]"
      />
    </div>
  );
}
