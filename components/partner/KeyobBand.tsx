import Link from "next/link";

import Reveal from "@/components/service/Reveal";
import { keyob, keyobCapabilities, keyobDisclaimer } from "@/lib/keyob";
import KeyobLogo from "./KeyobLogo";

/* The headline services — the full list lives on the /about section. */
const capabilities = keyobCapabilities.slice(0, 6);

/**
 * Full-bleed KEYOB partnership band for the home page. KEYOB's navy (a shade
 * deeper than the site's own) with the cyan accent, so the band reads as a
 * co-branded announcement between the stone resources band and the reviews.
 */
export default function KeyobBand() {
  return (
    <section className="br-hairlines gutter relative overflow-hidden bg-[#14295A] py-20 text-white md:py-24">
      <div className="shell relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_330px] lg:gap-16">
          {/* Pitch */}
          <Reveal>
            <span className="inline-flex items-center gap-[10px] rounded-full border border-white/20 px-4 py-2 text-[11.5px] font-bold uppercase tracking-[2px] text-white">
              <span
                aria-hidden="true"
                className="h-[7px] w-[7px] rounded-full bg-[#01BCFE]"
              />
              Bachmann Robinson{" "}
              <span className="font-normal text-white/50">&times;</span> KEYOB
            </span>
            <h2 className="m-0 mt-6 max-w-[18ch] font-serif text-[30px] font-normal leading-[1.2] text-pretty md:text-[38px]">
              We advise on your systems. KEYOB builds them
              <span className="text-[#01BCFE]">.</span>
            </h2>
            <p className="m-0 mt-5 max-w-[62ch] text-[16.5px] leading-[1.7] text-[#DCE6F5] md:text-[17.5px]">
              Good numbers depend on good systems. We&rsquo;ve partnered with
              KEYOB &mdash; an Australian software, AI and digital marketing
              team &mdash; to build the websites, social media, automation and
              AI our clients run on. Bachmann Robinson clients receive a
              preferred rate, and the first conversation is free.
            </p>
            <ul className="m-0 mt-7 flex list-none flex-wrap gap-[9px] p-0">
              {capabilities.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-white/20 px-4 py-[7px] text-[13.5px] font-semibold text-[#DCE6F5]"
                >
                  {c}
                </li>
              ))}
            </ul>
            <Link
              href={keyob.sectionUrl}
              className="mt-7 inline-block border-b-2 border-[#01BCFE] pb-[2px] text-[16px] font-bold text-white hover:text-white"
            >
              See what&rsquo;s included <span aria-hidden="true">&rarr;</span>
            </Link>
          </Reveal>

          {/* Offer panel */}
          <Reveal delay={90} variant="right">
            <div className="border-t-4 border-[#01BCFE] bg-[#1B356E] px-8 py-8 text-center">
              <span className="block text-[56px] font-extrabold leading-none tracking-[-0.02em] text-[#01BCFE]">
                {keyob.discount}
              </span>
              <span className="mt-2 block text-[12px] font-bold uppercase tracking-[2.4px] text-white">
                Client discount
              </span>
              <p className="m-0 mt-4 text-[14px] leading-[1.6] text-[#DCE6F5]">
                Mention Bachmann Robinson when you get in touch, or ask us for
                an introduction.
              </p>
              <a
                href={keyob.contactUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex min-h-[46px] items-center justify-center bg-[#01BCFE] px-5 text-[15px] font-bold text-[#14295A] transition-opacity hover:text-[#14295A] hover:opacity-85"
              >
                Talk to KEYOB
              </a>
              <a
                href={keyob.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex min-h-[44px] items-center justify-center border border-white/35 px-5 text-[14.5px] font-semibold text-white transition-colors hover:border-white hover:text-white"
              >
                Visit keyob.com
              </a>
              <span className="mt-6 flex items-center justify-center gap-[9px] border-t border-white/15 pt-5">
                <span className="text-[9.5px] font-bold uppercase tracking-[1.4px] text-white/60">
                  In partnership with
                </span>
                <KeyobLogo variant="white" className="h-[14px]" />
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <p className="m-0 mt-12 max-w-[86ch] text-[12.5px] leading-[1.65] text-[#8FA0C0]">
            {keyobDisclaimer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
