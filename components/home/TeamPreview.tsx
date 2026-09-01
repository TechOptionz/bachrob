"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "@/components/service/Reveal";
import { team, teamPhoto } from "@/lib/data";

/**
 * The team as a horizontal rail.
 *
 * Native overflow scrolling with CSS scroll-snap does the work: touch, trackpad
 * and shift-wheel all behave the way the platform already does, and the arrow
 * buttons are a convenience on top rather than the only way through. The rail
 * is a labelled, focusable region so keyboard users can arrow through it.
 */
export default function TeamPreview() {
  const rail = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);

    // The indicator is a scrollbar, not a progress bar: its length is the
    // fraction of the rail on screen and it slides by the same fraction the
    // rail has scrolled. That way it is never a zero-width sliver at rest.
    const thumb = fill.current;
    if (!thumb) return;
    const visible = Math.min(1, el.clientWidth / el.scrollWidth);
    const offset = el.scrollWidth > 0 ? el.scrollLeft / el.scrollWidth : 0;
    thumb.style.width = `${visible * 100}%`;
    thumb.style.transform = `translateX(${(offset / visible) * 100}%)`;
  }, []);

  // Cards are sized in px, so whether the rail actually overflows depends on
  // the viewport — settle the arrow states once on mount rather than waiting
  // for a scroll that may never come.
  useEffect(sync, [sync]);

  const nudge = (direction: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    // One card plus its gap, so a click always lands cleanly on a snap point.
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const arrowClass =
    "grid h-11 w-11 place-items-center border border-[#D8DCE2] bg-white text-[#1E4B8F] transition-colors hover:border-[#1E4B8F] hover:bg-[#E8EEF7] disabled:cursor-default disabled:border-[#E5E4E0] disabled:bg-transparent disabled:text-[#C8D6EB]";

  return (
    <section className="section scroll-mt-24 bg-white">
      <div className="shell">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <Reveal variant="left" className="max-w-[620px]">
            <div className="eyebrow mb-[14px] text-[#1E4B8F]">The people</div>
            <h2 className="m-0 mb-4 font-serif text-[30px] font-normal leading-[1.2] text-pretty md:text-[40px]">
              You will know who is looking after your file.
            </h2>
            <p className="m-0 text-[17px] leading-[1.7] text-[#374151]">
              Accountants, auditors, an SMSF specialist and the admin team who
              keep more than 200 companies current with ASIC.
            </p>
          </Reveal>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => nudge(-1)}
              disabled={atStart}
              aria-label="Show previous team members"
              className={arrowClass}
            >
              <span aria-hidden="true" className="text-[18px] leading-none">
                &larr;
              </span>
            </button>
            <button
              type="button"
              onClick={() => nudge(1)}
              disabled={atEnd}
              aria-label="Show next team members"
              className={arrowClass}
            >
              <span aria-hidden="true" className="text-[18px] leading-none">
                &rarr;
              </span>
            </button>
          </div>
        </div>

        {/* The rail stays on the 1100px measure so its first card lines up
            with the heading above it. Cards are a fixed width, so the fourth
            one is always cut by the right edge — that overhang is what tells
            the reader there is more to scroll. */}
        <div
          ref={rail}
          onScroll={sync}
          tabIndex={0}
          role="region"
          aria-label="Bachmann Robinson team members"
          className="br-snap flex gap-5 overflow-x-auto pb-2"
        >
          {team.map((member, i) => (
            <Reveal
              key={member.name}
              delay={Math.min(i, 4) * 70}
              variant="rise"
              className="shrink-0"
            >
              <article
                data-card
                className="br-lift flex h-full w-[290px] flex-col border border-[#E5E4E0] bg-white p-7 hover:border-[#C8D6EB] hover:shadow-[0_18px_40px_-18px_rgba(22,57,110,0.35)] md:w-[330px]"
              >
                <div className="mb-5 flex items-center gap-4">
                  <span className="block h-[54px] w-[54px] shrink-0 overflow-hidden bg-[#EEF1F5]">
                    <Image
                      src={teamPhoto(member.name)}
                      alt=""
                      width={160}
                      height={200}
                      loading="lazy"
                      sizes="54px"
                      className="h-full w-full object-cover object-top mix-blend-multiply"
                    />
                  </span>
                  <div>
                    <div className="font-serif text-[19px] leading-[1.25]">
                      {member.name}
                    </div>
                    <div className="mt-[3px] text-[13.5px] font-semibold text-[#1E4B8F]">
                      {member.role}
                    </div>
                  </div>
                </div>

                {member.creds ? (
                  <div className="mb-3 text-[12.5px] uppercase leading-[1.5] tracking-[0.6px] text-[#4B5563]">
                    {member.creds}
                  </div>
                ) : null}

                <p className="m-0 line-clamp-5 text-[15px] leading-[1.65] text-[#374151]">
                  {member.bio}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
          {/* Position indicator for the rail: the thumb's length is the share
              of the rail on screen, and it slides as the rail scrolls. */}
          <span
            aria-hidden="true"
            className="block h-[2px] w-full max-w-[220px] overflow-hidden bg-[#E5E4E0]"
          >
            <span
              ref={fill}
              className="block h-full w-full bg-[#1E4B8F] transition-transform duration-200 ease-out"
            />
          </span>
          <Link href="/team" className="rule-link">
            Meet the whole team →
          </Link>
        </div>
      </div>
    </section>
  );
}
