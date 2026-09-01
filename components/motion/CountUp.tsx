"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { prefersReducedMotion, useInView } from "./useInView";

/**
 * Number that counts up to its value the first time it is scrolled into view.
 *
 * The server renders the *final* value, so the real figure is in the HTML for
 * crawlers and for anyone without JavaScript. The reset to zero happens in a
 * layout effect — before the browser paints — so there is no flash of the end
 * state on the way in.
 */

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function CountUp({
  to,
  from = 0,
  duration = 1600,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
}: {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>(60);
  const [value, setValue] = useState(to);
  const armed = useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    armed.current = true;
    setValue(from);
  }, []);

  useEffect(() => {
    if (!inView || !armed.current) return;
    armed.current = false;

    let raf = 0;
    const started = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / duration);
      // easeOutCubic — quick to read, settles rather than snapping.
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, from, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
