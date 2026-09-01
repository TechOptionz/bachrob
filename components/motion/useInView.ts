"use client";

import { useEffect, useRef, useState } from "react";

/**
 * One-shot "has this element reached the viewport" hook.
 *
 * Deliberately not an IntersectionObserver. An observer only fires when an
 * element *crosses* a threshold, so a fast fling, an anchor jump or a restored
 * scroll position can move an element from below the fold to above it between
 * two sampled frames — the observer never fires and the content stays hidden
 * forever. Instead one shared, rAF-throttled scroll pass reveals anything whose
 * top edge has reached the viewport, which is correct no matter how the reader
 * got there.
 *
 * Every consumer on the page shares a single scroll listener, and the listener
 * detaches itself as soon as the last pending element has been revealed.
 */

type Pending = { el: HTMLElement; offset: number; show: () => void };

const pending = new Set<Pending>();
let listening = false;
let frame = 0;

function sweep() {
  frame = 0;

  for (const item of pending) {
    if (!item.el.isConnected) {
      pending.delete(item);
      continue;
    }
    // Anything whose top edge has reached the viewport — including everything
    // already scrolled past — is revealed.
    if (item.el.getBoundingClientRect().top < window.innerHeight - item.offset) {
      pending.delete(item);
      item.show();
    }
  }

  if (pending.size === 0) stopListening();
}

function schedule() {
  if (frame) return;
  frame = requestAnimationFrame(sweep);
}

function startListening() {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
}

function stopListening() {
  if (!listening) return;
  listening = false;
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", schedule);
}

export function useInView<T extends HTMLElement = HTMLDivElement>(offset = 24) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Already in view on mount (or the browser restored a scroll position
    // further down the page) — show it without waiting for a scroll event.
    if (el.getBoundingClientRect().top < window.innerHeight - offset) {
      setInView(true);
      return;
    }

    const item: Pending = { el, offset, show: () => setInView(true) };
    pending.add(item);
    startListening();

    return () => {
      pending.delete(item);
      if (pending.size === 0) stopListening();
    };
  }, [offset]);

  return { ref, inView };
}

/**
 * Shared, rAF-throttled scroll subscription for the scroll-*linked* effects
 * (progress bar, process rail) that need to run for the life of the page
 * rather than firing once.
 */
export function useScrollEffect(run: () => void) {
  const latest = useRef(run);
  latest.current = run;

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      latest.current();
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    latest.current();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
}

/** True when the visitor has asked the OS for reduced motion. */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
