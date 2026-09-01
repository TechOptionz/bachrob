import Link from "next/link";
import Reveal from "./service/Reveal";
import ServiceIcon from "./ServiceIcon";
import { services } from "@/lib/data";

export default function Services() {
  return (
    <section id="services" className="section scroll-mt-24 bg-cream">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16">
          <Reveal variant="left">
            <div className="eyebrow mb-[14px] text-[#1E4B8F]">What we do</div>
            <h2 className="m-0 font-serif text-[30px] font-normal leading-[1.2] text-pretty md:text-[40px]">
              Accountants, auditors, tax agents &amp; financial advisors
            </h2>
          </Reveal>
          <Reveal variant="right" delay={90}>
            <p className="m-0 max-w-[520px] text-[17px] leading-[1.7] text-[#374151] lg:pb-2">
              From simple individual returns to complex business structures,
              rental properties, defence personnel and self-managed super funds
              — we leave no stone unturned.
            </p>
          </Reveal>
        </div>

        {/* Hairline grid from the design, drawn by a 1px ring on each card
            rather than by a coloured container showing through 1px gaps. Nine
            services over two columns leaves an odd cell out, and a container
            background would render that empty cell as a grey slab. Adjacent
            rings meet in the 1px gap and read as a single line. */}
        <div className="mt-12 grid grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] gap-px md:mt-14">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 90} variant="rise">
              <Link
                href={`/services/${s.slug}`}
                className="group flex h-full flex-col bg-white px-7 pb-7 pt-7 text-[#1B2430] shadow-[0_0_0_1px_#E5E4E0] transition-colors duration-300 hover:bg-[#F5F8FC] hover:text-[#1B2430]"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  {/* Icon tile fills with the brand navy on hover — the
                      interactive cue the accent rule used to carry. */}
                  <span className="flex h-11 w-11 items-center justify-center bg-[#EEF3FA] transition-colors duration-300 group-hover:bg-[#1E4B8F]">
                    <ServiceIcon
                      slug={s.slug}
                      className="h-[26px] w-[26px] text-[#1E4B8F] transition-colors duration-300 group-hover:text-white"
                    />
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-serif text-[15px] text-[#C8D6EB] transition-colors duration-300 group-hover:text-[#7593C1]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="m-0 mb-[10px] font-serif text-[20px] font-normal transition-colors group-hover:text-[#1E4B8F]">
                  {s.name}
                </h3>
                <p className="m-0 mb-6 text-[15.5px] leading-[1.6] text-[#374151]">
                  {s.desc}
                </p>
                <span className="mt-auto text-[14px] font-semibold text-[#1E4B8F]">
                  Read more{" "}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal
          variant="fade"
          className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3"
        >
          <Link href="/services" className="rule-link">
            Explore all services in detail →
          </Link>
          <span className="text-[16px] text-[#374151]">
            Not sure what you need?{" "}
            <a href="#contact" className="rule-link">
              Talk to an accountant →
            </a>
          </span>
        </Reveal>
      </div>
    </section>
  );
}
