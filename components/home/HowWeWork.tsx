"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import Reveal from "@/components/service/Reveal";
import { useScrollEffect } from "@/components/motion/useInView";
import { site } from "@/lib/data";

const steps = [
  {
    title: "A first conversation",
    desc: "Tell us where things stand — your structure, the year you have had, anything that has changed. We work out together whether we are the right fit before any work starts.",
  },
  {
    title: "A scope you can hold us to",
    desc: "We set out what we will do, what we need from you and when each piece is due, so nothing arrives as a surprise at either end.",
  },
  {
    title: "Records brought up to date",
    desc: "Bookkeeping, reconciliations and activity statements come first — in QuickBooks, Reckon, MYOB or whichever package you already run. Nothing gets built on numbers that have not been checked.",
  },
  {
    title: "Prepared, then reviewed",
    desc: "Returns, financial statements and fund administration are prepared by the accountant who knows your file, then read over by a second set of eyes before anything leaves the office.",
  },
  {
    title: "Explained before it is lodged",
    desc: "You see the result and what it actually means in plain language, with room to ask questions, while there is still time for them to matter.",
  },
  {
    title: "Looking at next year",
    desc: "Once the year is closed we look forward — the timing decisions, the tax-saving opportunities and the structure questions worth raising early rather than in June.",
  },
];

/**
 * The engagement process, on a rail that fills as the section scrolls past.
 *
 * The fill ratio is written to a custom property and painted as a single
 * `scaleY`, and the step a reader has reached is tracked by measuring each
 * step's own dot against a fixed line 55% down the viewport — accurate even
 * when steps differ in height, which a ratio-of-section approach is not.
 */
export default function HowWeWork() {
  const listRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  useScrollEffect(() => {
    const list = listRef.current;
    const fill = fillRef.current;
    if (!list || !fill) return;

    const rect = list.getBoundingClientRect();
    const anchor = window.innerHeight * 0.55;
    const ratio = rect.height > 0 ? (anchor - rect.top) / rect.height : 0;
    fill.style.setProperty(
      "--br-rail",
      String(Math.min(1, Math.max(0, ratio))),
    );

    const dots = list.querySelectorAll<HTMLElement>("[data-dot]");
    let reached = 0;
    dots.forEach((dot) => {
      if (dot.getBoundingClientRect().top < anchor) reached += 1;
    });
    setActive((prev) => (prev === reached ? prev : reached));
  });

  return (
    <section
      id="process"
      className="section br-hairlines relative scroll-mt-24 overflow-hidden bg-[#16396E] text-white"
    >
      <div className="shell relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal variant="left">
              <div className="eyebrow mb-[14px] text-[#9FB8DC]">
                How we work
              </div>
              <h2 className="m-0 mb-5 font-serif text-[30px] font-normal leading-[1.2] text-pretty md:text-[38px]">
                Six steps, and you always know which one you are on.
              </h2>
              <p className="m-0 mb-8 max-w-[440px] text-[17px] leading-[1.75] text-[#D5E0F0]">
                The same process whether you are lodging a single return or
                handing over a company, a trust and a self-managed super fund.
              </p>

              <div
                className="mb-9 flex items-baseline gap-3"
                aria-hidden="true"
              >
                <span className="font-serif text-[34px] leading-none text-white">
                  {String(Math.min(active || 1, steps.length)).padStart(2, "0")}
                </span>
                <span className="text-[15px] text-[#7593C1]">
                  / {String(steps.length).padStart(2, "0")}
                </span>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/#contact"
                  className="bg-white px-6 py-[13px] text-[15.5px] font-bold text-[#16396E] transition-colors hover:bg-[#E8EEF7] hover:text-[#16396E]"
                >
                  Start with step one
                </Link>
                <a
                  href={site.phoneHref}
                  className="border border-[#7593C1] px-6 py-[13px] text-[15.5px] font-semibold text-white transition-colors hover:border-white hover:text-white"
                >
                  Call {site.phone}
                </a>
              </div>
            </Reveal>
          </div>

          <ol ref={listRef} className="relative m-0 list-none p-0">
            {/* Rail: a static track with the progress fill drawn over it. Both
                are inset by half a dot so the line starts and ends centred. */}
            <span
              aria-hidden="true"
              className="absolute bottom-[15px] left-[15px] top-[15px] w-px bg-white/20"
            />
            <span
              ref={fillRef}
              aria-hidden="true"
              className="br-rail-fill absolute bottom-[15px] left-[15px] top-[15px] w-px bg-[#9FB8DC]"
            />

            {steps.map((step, i) => (
              <li
                key={step.title}
                data-active={i < active ? "true" : "false"}
                className="br-step relative grid grid-cols-[31px_minmax(0,1fr)] gap-6 pb-11 last:pb-0 md:gap-8"
              >
                <span
                  data-dot
                  aria-hidden="true"
                  className="br-step-dot z-10 grid h-[31px] w-[31px] place-items-center rounded-full border border-white/35 bg-[#16396E] text-[12.5px] font-semibold text-[#9FB8DC]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <Reveal delay={Math.min(i, 4) * 60} className="pt-[3px]">
                  <h3 className="m-0 mb-2 font-serif text-[21px] font-normal leading-[1.35] md:text-[23px]">
                    {step.title}
                  </h3>
                  <p className="m-0 max-w-[560px] text-[16.5px] leading-[1.75] text-[#D5E0F0]">
                    {step.desc}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
