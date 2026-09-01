"use client";

import { useRef } from "react";
import { prefersReducedMotion, useScrollEffect } from "./useInView";

/**
 * Moves its child a little slower than the page as it passes through the
 * viewport.
 *
 * The child must be oversized inside an `overflow-hidden` parent (see the
 * About section), otherwise the travel exposes the edge. Kept deliberately
 * small — the effect should register as depth, not as movement.
 */
export default function Parallax({
  children,
  strength = 42,
  className = "",
}: {
  children: React.ReactNode;
  /** Total travel in px across the full pass through the viewport. */
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useScrollEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.style.transform = "";
      return;
    }

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    // Skip the work entirely while the element is nowhere near the viewport.
    if (rect.bottom < -200 || rect.top > vh + 200) return;

    // -1 when the element sits below the fold, +1 once it has passed above it.
    const centre = rect.top + rect.height / 2;
    const progress = (centre - vh / 2) / (vh / 2 + rect.height / 2);
    el.style.transform = `translate3d(0, ${(progress * strength).toFixed(2)}px, 0)`;
  });

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
