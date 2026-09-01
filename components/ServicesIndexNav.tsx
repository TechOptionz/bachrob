"use client";

import { useEffect, useRef, useState } from "react";

type Item = { slug: string; name: string };

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Sticky in-page index for the /services page — the whole left column, not
 * just the list: eyebrow and position counter, plus a rail that fills as the
 * reader moves down the page.
 *
 * Which section is in view is tracked with a rAF-throttled scroll pass (same
 * approach as Reveal — no IntersectionObserver, so fast flings and anchor
 * jumps can't skip it). The rail fill is derived from the active row's own
 * offsets, so it always ends flush with the highlighted service.
 */
export default function ServicesIndexNav({
  items,
  promo,
}: {
  items: Item[];
  /** Rendered below the index. */
  promo?: React.ReactNode;
}) {
  const [active, setActive] = useState(0);
  // 0–1 of the list height; drives a scaleY on the navy rail.
  const [fill, setFill] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    let frame = 0;

    const sweep = () => {
      frame = 0;
      // The section whose top has most recently passed the reading line
      // (just under the sticky nav) is the active one.
      let current = 0;
      for (let i = 0; i < items.length; i += 1) {
        const el = document.getElementById(items[i].slug);
        if (el && el.getBoundingClientRect().top <= 140) current = i;
      }
      setActive(current);

      const list = listRef.current;
      const row = rowRefs.current[current];
      if (list && row && list.offsetHeight) {
        setFill((row.offsetTop + row.offsetHeight) / list.offsetHeight);
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(sweep);
    };

    sweep();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [items]);

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="eyebrow text-[#1E4B8F]">On this page</span>
        <span
          aria-hidden="true"
          className="font-serif text-[13px] tracking-[1px] text-[#9CA3AF] tabular-nums"
        >
          <span className="text-[#1E4B8F]">{pad(active + 1)}</span>
          <span className="px-[3px]">/</span>
          {pad(items.length)}
        </span>
      </div>

      <div aria-hidden="true" className="mt-4 mb-3 h-px w-full bg-[#E5E4E0]" />

      <nav aria-label="Services on this page" className="relative">
        {/* Hairline track, and the navy fill that runs down it. */}
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 h-full w-px bg-[#D8DCE2]"
        />
        <span
          aria-hidden="true"
          style={{ transform: `scaleY(${fill})` }}
          className="absolute left-0 top-0 h-full w-[2px] origin-top bg-[#1E4B8F] transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]"
        />

        <ol ref={listRef} className="relative m-0 list-none p-0">
          {items.map((item, i) => {
            const isActive = i === active;
            return (
              <li
                key={item.slug}
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
              >
                <a
                  href={`#${item.slug}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`group flex items-baseline gap-3 py-[10px] pl-5 pr-3 text-[14.5px] leading-[1.45] transition-colors duration-200 ${
                    isActive
                      ? "bg-[#F5F8FC] font-semibold text-[#1E4B8F]"
                      : "text-[#374151] hover:bg-[#FAFAF8] hover:text-[#1E4B8F]"
                  }`}
                >
                  <span
                    className={`font-serif text-[12px] tracking-[1px] tabular-nums transition-colors duration-200 ${
                      isActive
                        ? "text-[#1E4B8F]"
                        : "text-[#7593C1] group-hover:text-[#1E4B8F]"
                    }`}
                  >
                    {pad(i + 1)}
                  </span>
                  <span className="transition-transform duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:translate-x-[3px]">
                    {item.name}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      {promo}
    </div>
  );
}
