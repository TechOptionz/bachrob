import { services } from "@/lib/data";

export default function Services() {
  return (
    <section id="services" className="section scroll-mt-24">
      <div className="shell">
        <div className="eyebrow mb-[14px] text-[#1E4B8F]">What we do</div>
        <h2 className="m-0 mb-3 font-serif text-[28px] font-normal md:text-[36px]">
          Accountants, auditors, tax agents &amp; financial advisors
        </h2>
        <p className="m-0 mb-12 max-w-[640px] text-[17px] leading-[1.6] text-[#4B5563]">
          From simple individual returns to complex business structures, rental
          properties, defence personnel and self-managed super funds — we leave
          no stone unturned.
        </p>

        {/* 1px gap over a stone background gives the hairline grid from the design */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] gap-px border border-[#E5E4E0] bg-[#E5E4E0]">
          {services.map((s) => (
            <div
              key={s.name}
              className="bg-white px-7 pb-8 pt-7 transition-colors hover:bg-[#F5F8FC]"
            >
              <div className="mb-[18px] h-[3px] w-[34px] bg-[#1E4B8F]" />
              <h3 className="m-0 mb-[10px] font-serif text-[19px] font-normal">
                {s.name}
              </h3>
              <p className="m-0 text-[15px] leading-[1.55] text-[#4B5563]">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-5">
          <span className="text-[16px] text-[#4B5563]">
            Not sure what you need?
          </span>
          <a href="#contact" className="rule-link">
            Talk to an accountant →
          </a>
        </div>
      </div>
    </section>
  );
}
