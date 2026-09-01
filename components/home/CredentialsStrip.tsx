import Marquee from "@/components/motion/Marquee";
import Reveal from "@/components/service/Reveal";

/**
 * Accreditation ticker directly under the hero.
 *
 * Every entry is a qualification the firm actually holds — they are drawn from
 * the team's listed credentials in lib/data, not invented badges.
 */
const credentials = [
  "CPA Australia",
  "Institute of Public Accountants",
  "SMSF Association Specialist Advisor",
  "Registered Tax Agent",
  "Tax Practitioners Board",
  "ASIC Licensed Representative",
  "FASEA Qualified",
  "CFA",
  "FCMA",
  "QuickBooks",
  "Reckon",
  "MYOB",
];

export default function CredentialsStrip() {
  return (
    <section
      aria-label="Accreditations and software"
      className="gutter border-b border-[#E5E4E0] bg-cream pb-11 pt-14 md:pt-16"
    >
      <Reveal variant="fade" className="shell">
        <div className="eyebrow mb-7 text-center text-[#6B7280]">
          Accredited, registered &amp; independently qualified
        </div>
      </Reveal>

      {/* Full-bleed on purpose: the row should run past the 1100px measure so
          it reads as a continuous ticker rather than a boxed-in list. */}
      <Marquee
        duration={58}
        items={credentials.map((name) => (
          <span
            key={name}
            className="flex items-center gap-4 whitespace-nowrap font-serif text-[17px] text-[#1B2430] md:text-[19px]"
          >
            <span
              aria-hidden="true"
              className="h-[6px] w-[6px] shrink-0 rotate-45 bg-[#C8D6EB]"
            />
            {name}
          </span>
        ))}
      />
    </section>
  );
}
