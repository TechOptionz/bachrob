"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fades a block up the first time it comes into view.
 *
 * Deliberately not an IntersectionObserver. An observer only fires when an
 * element *crosses* a threshold, so a fast fling, an anchor jump or a restored
 * scroll position can move an element from below the fold to above it between
 * two sampled frames — the observer never fires and the content stays at
 * opacity 0 forever. Instead one shared, rAF-throttled scroll pass reveals
 * anything whose top edge has reached the viewport, which is correct no matter
 * how the reader got there.
 *
 * The hidden state and the prefers-reduced-motion override live on
 * `[data-reveal]` in globals.css, and the page carries a <noscript> rule so the
 * content is visible without JavaScript.
 */

type Pending = { el: HTMLElement; show: () => void };

const pending = new Set<Pending>();
let listening = false;
let frame = 0;

function sweep() {
  frame = 0;
  const limit = window.innerHeight - 24;

  for (const item of pending) {
    if (!item.el.isConnected) {
      pending.delete(item);
      continue;
    }
    // Anything whose top edge has reached the viewport — including everything
    // already scrolled past — is revealed.
    if (item.el.getBoundingClientRect().top < limit) {
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

export default function Reveal({
  children,
  delay = 0,
  className = "",
  id,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Already in view on mount (or the browser restored a scroll position
    // further down the page) — show it without waiting for a scroll event.
    if (el.getBoundingClientRect().top < window.innerHeight - 24) {
      setShown(true);
      return;
    }

    const item: Pending = { el, show: () => setShown(true) };
    pending.add(item);
    startListening();

    return () => {
      pending.delete(item);
      if (pending.size === 0) stopListening();
    };
  }, []);

  return (
    <div
      ref={ref}
      id={id}
      data-reveal=""
      data-shown={shown ? "true" : "false"}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={className}
    >
      {children}
    </div>
  );
}
