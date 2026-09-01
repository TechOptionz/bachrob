"use client";

import { useEffect, useState } from "react";

/**
 * Sticky in-page index for the /services page. Tracks which service section
 * is in view (rAF-throttled scroll pass, same approach as Reveal — no
 * IntersectionObserver, so fast flings and anchor jumps can't skip it) and
 * highlights that row.
 */
export default function ServicesIndexNav({
  items,
}: {
  items: { slug: string; name: string }[];
}) {
  const [active, setActive] = useState(items[0]?.slug ?? "");

  useEffect(() => {
    let frame = 0;

    const sweep = () => {
      frame = 0;
      // The section whose top has most recently passed the reading line
      // (just under the sticky nav) is the active one.
      let current = items[0]?.slug ?? "";
      for (const item of items) {
        const el = document.getElementById(item.slug);
        if (el && el.getBoundingClientRect().top <= 140) current = item.slug;
      }
      setActive(current);
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
    <nav aria-label="Services on this page" className="border-l border-[#D8DCE2]">
      <ol className="m-0 list-none p-0">
        {items.map((item, i) => {
          const isActive = item.slug === active;
          return (
            <li key={item.slug}>
              <a
                href={`#${item.slug}`}
                aria-current={isActive ? "true" : undefined}
                className={`-ml-px flex items-baseline gap-3 border-l-2 py-[9px] pl-5 text-[14.5px] leading-[1.4] transition-colors ${
                  isActive
                    ? "border-[#1E4B8F] font-semibold text-[#1E4B8F]"
                    : "border-transparent text-[#4B5563] hover:text-[#1E4B8F]"
                }`}
              >
                <span
                  className={`font-serif text-[12px] tracking-[1px] ${
                    isActive ? "text-[#1E4B8F]" : "text-[#7593C1]"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.name}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
