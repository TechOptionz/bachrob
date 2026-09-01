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
      className="sticky top-[74px] z-0 scroll-mt-24 bg-white"
    >
      {/* The dome over the hero is drawn by the nav's curvy bottom edge —
          the hero itself stays square so the curves don't double up. */}
      <div className="gutter bg-[linear-gradient(160deg,#16396E_0%,#1E4B8F_70%,#2A5CA8_100%)] pb-16 pt-24 text-white md:pb-20 md:pt-32">
        <div className="shell">
        <div className="max-w-[720px]">
          <div className="eyebrow mb-5 text-[#9FB8DC]">
            Ipswich, Queensland · Since 1990
          </div>
          <h1 className="m-0 mb-6 font-serif text-[40px] font-normal leading-[1.1] text-pretty sm:text-[50px] md:text-[58px]">
            An accounting firm where people come first.
          </h1>
          <p className="m-0 mb-9 max-w-[600px] text-[18px] leading-[1.65] text-[#D5E0F0] md:text-[20px]">
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
              <div className="text-[14.5px] text-[#C8D6EB]">{s.label}</div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </header>
  );
}
