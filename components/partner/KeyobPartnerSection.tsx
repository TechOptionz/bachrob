import Reveal from "@/components/service/Reveal";
import { keyob, keyobDisclaimer } from "@/lib/keyob";
import KeyobLogo from "./KeyobLogo";

/**
 * The "IT partner" section on /about (anchored as #it-partner) — a single
 * compact, ad-style panel: the pitch and the Digital Growth System on the
 * left, the client offer and CTAs on the right. Every smaller promo
 * placement points here.
 */

const system = [
  {
    num: "01",
    title: "Website",
    desc: "Built to turn visitors into enquiries.",
  },
  {
    num: "02",
    title: "Aleesa.ai",
    desc: "Answers calls, emails and messages 24/7.",
  },
  {
    num: "03",
    title: "Connected CRM",
    desc: "Every lead captured automatically.",
  },
];

const capabilities =
  "AI & Automation · Custom Software · CRM Setup · Integrations · Dashboards · Mobile Apps · Ongoing Support";

export default function KeyobPartnerSection() {
  return (
    <section
      id="it-partner"
      className="gutter scroll-mt-24 bg-[#F5F8FC] py-14 md:py-16"
    >
      <div className="shell">
        <Reveal>
          <div className="grid overflow-hidden bg-[#14295A] lg:grid-cols-[minmax(0,1fr)_320px]">
            {/* Pitch + the three-part system */}
            <div className="px-7 py-8 md:px-10 md:py-10">
              <span className="inline-flex items-center gap-[10px] rounded-full border border-white/20 px-4 py-[7px] text-[11px] font-bold uppercase tracking-[2px] text-white">
                <span
                  aria-hidden="true"
                  className="h-[7px] w-[7px] rounded-full bg-[#01BCFE]"
                />
                Bachmann Robinson <span className="font-normal text-white/50">&times;</span>{" "}
                KEYOB
              </span>
              <h2 className="m-0 mt-5 max-w-[24ch] font-serif text-[25px] font-normal leading-[1.25] text-pretty text-white md:text-[30px]">
                We advise on your numbers. KEYOB builds your systems
                <span className="text-[#01BCFE]">.</span>
              </h2>
              <p className="m-0 mt-4 max-w-[58ch] text-[15px] leading-[1.65] text-[#DCE6F5] md:text-[15.5px]">
                Good numbers depend on good systems. We&rsquo;ve partnered with
                KEYOB — an Australian software and AI team — for the technology
                side of your business: websites, automation and AI that pay for
                themselves.
              </p>

              {/* The Digital Growth System */}
              <div className="mt-7 grid gap-5 border-t border-white/15 pt-6 sm:grid-cols-3 sm:gap-7">
                {system.map((s) => (
                  <div key={s.num}>
                    <span className="eyebrow block text-[10.5px] tracking-[2.2px] text-[#01BCFE]">
                      {s.num}
                    </span>
                    <h3 className="m-0 mt-[6px] font-serif text-[17.5px] font-normal text-white">
                      {s.title}
                    </h3>
                    <p className="m-0 mt-1 text-[13.5px] leading-[1.55] text-[#B9C8E4]">
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
              <p className="m-0 mt-5 text-[13px] italic leading-[1.6] text-[#8FA0C0]">
                Together, the Digital Growth System — the foundation every
                KEYOB client starts with.
              </p>
              <p className="m-0 mt-4 border-t border-white/10 pt-4 text-[12.5px] font-semibold tracking-[0.2px] text-white/55">
                {capabilities}
              </p>
            </div>

            {/* Offer + CTAs */}
            <div className="flex flex-col justify-center border-t-4 border-[#01BCFE] bg-[#1B356E] px-7 py-8 md:px-8 lg:border-t-0 lg:border-l lg:border-l-white/10">
              <span className="font-serif text-[46px] leading-none tracking-[-0.01em] text-[#01BCFE]">
                {keyob.discount}{" "}
                <span className="text-[22px] text-white">off</span>
              </span>
              <span className="mt-2 block text-[11px] font-bold uppercase tracking-[2.2px] text-white">
                Exclusive to our clients
              </span>
              <p className="m-0 mt-3 text-[13.5px] leading-[1.6] text-[#DCE6F5]">
                Mention us when you get in touch, or ask your accountant for an
                introduction. The first conversation is free — no obligation.
              </p>
              <a
                href={keyob.contactUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 block bg-[#01BCFE] px-5 py-[12px] text-center text-[14.5px] font-bold text-[#14295A] transition-opacity hover:text-[#14295A] hover:opacity-85"
              >
                Talk to KEYOB
              </a>
              <a
                href={keyob.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block border border-white/35 px-5 py-[11px] text-center text-[14px] font-semibold text-white transition-colors hover:border-white hover:text-white"
              >
                Visit keyob.com
              </a>
              <span className="mt-6 flex items-center gap-[9px] border-t border-white/15 pt-5 lg:pt-4">
                <span className="text-[9.5px] font-bold uppercase tracking-[1.4px] text-white/60">
                  In partnership with
                </span>
                <KeyobLogo variant="white" className="h-[13px]" />
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <p className="m-0 mt-5 max-w-[86ch] text-[12.5px] leading-[1.65] text-[#6B7280]">
            {keyobDisclaimer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
