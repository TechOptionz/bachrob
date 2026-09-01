"use client";

import type { ElementType, Ref } from "react";
import { useInView } from "@/components/motion/useInView";

/**
 * Fades a block into place the first time it comes into view.
 *
 * The hidden state, the per-variant offsets and the prefers-reduced-motion
 * override all live on `[data-reveal]` in globals.css, and every page carries a
 * <noscript> rule that un-hides the content for visitors without JavaScript.
 * The intersection logic itself is shared across the page — see
 * `components/motion/useInView`.
 */

export type RevealVariant =
  | "up" // default — the original 14px lift
  | "rise" // taller lift, for section-opening blocks
  | "left"
  | "right"
  | "scale"
  | "fade";

export default function Reveal({
  children,
  delay = 0,
  className = "",
  id,
  variant = "up",
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  id?: string;
  variant?: RevealVariant;
  /** Render as something other than a div — e.g. "li" inside a real list. */
  as?: "div" | "li" | "figure" | "article" | "section" | "header";
}) {
  const { ref, inView } = useInView<HTMLElement>();
  const Tag = as as ElementType;

  return (
    <Tag
      ref={ref as Ref<HTMLElement>}
      id={id}
      data-reveal=""
      data-variant={variant}
      data-shown={inView ? "true" : "false"}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
