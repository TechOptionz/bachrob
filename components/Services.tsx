import Link from "next/link";
import { services } from "@/lib/data";

export default function Services() {
  return (
    <section id="services" className="section scroll-mt-24">
      <div className="shell">
        <div className="eyebrow mb-[14px] text-[#1E4B8F]">What we do</div>
        <h2 className="m-0 mb-3 font-serif text-[30px] font-normal md:text-[40px]">
          Accountants, auditors, tax agents &amp; financial advisors
        </h2>
        <p className="m-0 mb-12 max-w-[640px] text-[17.5px] leading-[1.65] text-[#374151]">
          From simple individual returns to complex business structures, rental
          properties, defence personnel and self-managed super funds — we leave
          no stone unturned.
        </p>

        {/* 1px gap over a stone background gives the hairline grid from the design */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] gap-px border border-[#E5E4E0] bg-[#E5E4E0]">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group flex flex-col bg-white px-7 pb-7 pt-7 text-[#1B2430] transition-colors hover:bg-[#F5F8FC] hover:text-[#1B2430]"
            >
              {/* The accent rule extends on hover — the same restrained cue
                  used on the related-service cards. */}
              <span
                aria-hidden="true"
                className="mb-[18px] block h-[3px] w-[34px] bg-[#1E4B8F] transition-[width] duration-300 group-hover:w-[52px]"
              />
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
          ))}
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3">
          <Link href="/services" className="rule-link">
            Explore all services in detail →
          </Link>
          <span className="text-[16px] text-[#374151]">
            Not sure what you need?{" "}
            <a href="#contact" className="rule-link">
              Talk to an accountant →
            </a>
          </span>
        </div>
      </div>
    </section>
  );
}
