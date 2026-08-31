import { site } from "@/lib/data";

const stats = [
  { value: "35+", label: "Years serving Ipswich" },
  { value: "CPA · IPA · SSA", label: "Qualified professionals" },
  { value: "200+", label: "Companies managed with ASIC" },
  { value: "Licensed", label: "ASIC representative for SMSF advice" },
];

export default function Hero() {
  return (
    <header
      id="top"
      className="gutter scroll-mt-24 bg-[linear-gradient(160deg,#16396E_0%,#1E4B8F_70%,#2A5CA8_100%)] pb-0 pt-16 text-white md:pt-24"
    >
      <div className="shell">
        <div className="max-w-[720px]">
          <div className="eyebrow mb-5 text-[#9FB8DC]">
            Ipswich, Queensland · Since 1990
          </div>
          <h1 className="m-0 mb-6 font-serif text-[36px] font-normal leading-[1.15] text-pretty sm:text-[44px] md:text-[52px]">
            An accounting firm where people come first.
          </h1>
          <p className="m-0 mb-9 max-w-[600px] text-[17px] leading-[1.6] text-[#D5E0F0] md:text-[19px]">
            Local Ipswich accountants, auditors and registered tax agents
            helping individuals, businesses and self-managed super funds for
            more than three decades.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="bg-white px-7 py-[14px] text-[16px] font-bold text-[#16396E] hover:bg-[#E8EEF7] hover:text-[#16396E]"
            >
              Book a consultation
            </a>
            <a
              href={site.phoneHref}
              className="border border-[#7593C1] px-7 py-[14px] text-[16px] font-semibold text-white hover:border-white hover:text-white"
            >
              Call {site.phone}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap gap-x-14 gap-y-3 border-t border-white/20 pb-9 pt-7 md:mt-[72px]">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-serif text-[28px]">{s.value}</div>
              <div className="text-[14px] text-[#9FB8DC]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
