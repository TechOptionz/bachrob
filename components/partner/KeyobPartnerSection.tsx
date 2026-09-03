import Reveal from "@/components/service/Reveal";
import {
  keyob,
  keyobBenefits,
  keyobCapabilities,
  keyobDisclaimer,
  keyobSteps,
  keyobSystem,
} from "@/lib/keyob";

/**
 * The "IT partner" section on /about (anchored as #it-partner) — the full
 * Bachmann Robinson × KEYOB story: the offer, KEYOB's three-part Digital
 * Growth System, what they do, why it matters to a client, how an engagement
 * runs, and the call to action. Every smaller promo placement points here.
 *
 * Host brand leads (the site's blue, serif headings, square corners); KEYOB's
 * navy, cyan and green appear only where the partner is being named.
 */
export default function KeyobPartnerSection() {
  return (
    <section id="it-partner" className="section scroll-mt-24 bg-[#F5F8FC]">
      <div className="shell">
        {/* Lockup + heading + lede */}
        <Reveal>
          <span className="inline-flex items-center gap-3 rounded-full border border-[#E5E4E0] bg-white px-4 py-2 text-[12.5px] font-bold uppercase tracking-[0.08em] text-[#1B2430]">
            <span
              aria-hidden="true"
              className="h-[7px] w-[7px] rounded-full bg-[#01BCFE]"
            />
            Bachmann Robinson{" "}
            <span className="font-normal text-[#4B5563]">&times;</span>{" "}
            <span className="text-[#14295A]">KEYOB</span>
          </span>
          <h2 className="m-0 mt-6 max-w-[22ch] font-serif text-[30px] font-normal leading-[1.15] text-pretty text-[#1B2430] md:text-[38px]">
            We advise on your systems.
            <br />
            KEYOB builds them<span className="text-[#01BCFE]">.</span>
          </h2>
          <p className="m-0 mt-4 max-w-[62ch] text-[17px] leading-[1.65] text-[#374151] md:text-[18px]">
            Good numbers depend on good systems. We&rsquo;ve partnered with
            KEYOB &mdash; an Australian software, AI and digital marketing team
            based in Springwood &mdash; so our clients have a trusted place to
            turn for the technology side of their business.
          </p>
        </Reveal>

        {/* Offer */}
        <Reveal delay={60}>
          <div className="mt-10 flex flex-col items-start gap-3 border border-[#E5E4E0] border-l-[5px] border-l-[#20C997] bg-white px-6 py-5 sm:flex-row sm:items-center sm:gap-5 sm:px-7 sm:py-6">
            <span className="whitespace-nowrap text-[30px] font-extrabold leading-none text-[#1B2430]">
              {keyob.discount} off
            </span>
            <p className="m-0 min-w-0 flex-1 text-[16px] leading-[1.6] text-[#374151]">
              <strong className="text-[#1B2430]">
                Exclusive to Bachmann Robinson clients.
              </strong>{" "}
              Mention us when you get in touch, or ask your accountant for an
              introduction. The first conversation is free and there&rsquo;s no
              obligation.
            </p>
          </div>
        </Reveal>

        {/* The Digital Growth System */}
        <Reveal delay={90}>
          <div className="mt-11 grid gap-[14px] md:grid-cols-3">
            {keyobSystem.map((s) => (
              <div
                key={s.num}
                className="bg-[#14295A] px-6 py-[26px] text-white"
              >
                <span className="block text-[12px] font-bold tracking-[0.12em] text-[#01BCFE]">
                  {s.num}
                </span>
                <h3 className="m-0 mt-[10px] font-serif text-[21px] font-normal leading-[1.25] text-white">
                  {s.title}
                </h3>
                <p className="m-0 mt-2 text-[14px] leading-[1.6] text-[#DCE6F5]">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="m-0 mt-[18px] text-[15px] italic leading-[1.6] text-[#4B5563]">
            KEYOB call this the Digital Growth System &mdash; the foundation
            every client starts with.
          </p>
        </Reveal>

        {/* Capabilities */}
        <Reveal delay={60}>
          <ul className="m-0 mt-11 flex list-none flex-wrap gap-[9px] p-0">
            {keyobCapabilities.map((c) => (
              <li
                key={c}
                className="rounded-full border border-[#E5E4E0] bg-white px-4 py-[9px] text-[14px] font-semibold text-[#1B2430]"
              >
                {c}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Benefits */}
        <Reveal delay={60}>
          <div className="mt-11 grid gap-4 md:grid-cols-2">
            {keyobBenefits.map((b) => (
              <div
                key={b.title}
                className="border border-[#E5E4E0] bg-white px-[26px] py-6"
              >
                <h4 className="m-0 flex items-center gap-[10px] font-serif text-[19px] font-normal leading-[1.3] text-[#1B2430]">
                  <span
                    aria-hidden="true"
                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#20C997] text-[11px] font-bold text-white"
                  >
                    &#10003;
                  </span>
                  {b.title}
                </h4>
                <p className="m-0 mt-2 text-[15px] leading-[1.65] text-[#374151]">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Steps */}
        <Reveal delay={60}>
          <ol className="m-0 mt-11 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {keyobSteps.map((step, i) => {
              const last = i === keyobSteps.length - 1;
              return (
                <li
                  key={step}
                  className={`px-[18px] py-5 text-center text-[15px] font-bold ${
                    last
                      ? "bg-[#14295A] text-white"
                      : "border border-[#E5E4E0] bg-white text-[#1B2430]"
                  }`}
                >
                  <span className="mb-2 block text-[12px] font-bold tracking-[0.1em] text-[#01BCFE]">
                    0{i + 1}
                  </span>
                  {step}
                </li>
              );
            })}
          </ol>
        </Reveal>

        {/* CTA */}
        <Reveal delay={60}>
          <div className="mt-11 flex flex-wrap items-center justify-between gap-x-[26px] gap-y-6 bg-[#14295A] px-6 py-8 text-white sm:px-10 sm:py-10">
            <div className="min-w-0 max-w-[52ch]">
              <h3 className="m-0 font-serif text-[26px] font-normal leading-[1.25] text-white md:text-[30px]">
                Ready to look at your systems
                <span className="text-[#01BCFE]">?</span>
              </h3>
              <p className="m-0 mt-[10px] text-[15px] leading-[1.6] text-[#DCE6F5]">
                Book a chat with KEYOB, or mention it at your next appointment
                and we&rsquo;ll make the introduction for you.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={keyob.mailto}
                className="inline-flex min-h-[48px] items-center whitespace-nowrap bg-[#01BCFE] px-[26px] text-[15px] font-bold text-[#14295A] transition-opacity hover:text-[#14295A] hover:opacity-85"
              >
                Talk to KEYOB
              </a>
              <a
                href={keyob.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center whitespace-nowrap border border-white/35 px-[26px] text-[15px] font-bold text-white transition-colors hover:border-white hover:text-white"
              >
                Visit keyob.com
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <p className="m-0 mt-5 max-w-[100ch] text-[13px] leading-[1.6] text-[#4B5563]">
            {keyobDisclaimer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
