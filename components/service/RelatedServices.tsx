import Link from "next/link";
import SectionShell, { SectionHeading, type Tone } from "./SectionShell";
import Reveal from "./Reveal";
import { serviceCard, type ServiceSlug } from "@/lib/services";

export default function RelatedServices({
  slugs,
  tone = "white",
}: {
  slugs: ServiceSlug[];
  tone?: Tone;
}) {
  const cards = slugs.map(serviceCard);

  return (
    <SectionShell tone={tone}>
      <SectionHeading
        eyebrow="Keep exploring"
        heading="You may also be interested in"
        tone={tone}
      />

      <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-px border border-[#E5E4E0] bg-[#E5E4E0]">
        {cards.map((card, i) => (
          <Reveal key={card.slug} delay={Math.min(i, 3) * 60} className="h-full">
            <Link
              href={`/services/${card.slug}`}
              className="group flex h-full flex-col bg-white px-7 pb-7 pt-7 text-[#1B2430] transition-colors hover:bg-[#F5F8FC] hover:text-[#1B2430]"
            >
              <span
                aria-hidden="true"
                className="mb-[18px] block h-[3px] w-[34px] bg-[#1E4B8F] transition-[width] duration-300 group-hover:w-[52px]"
              />
              <span className="mb-[10px] font-serif text-[19px] leading-[1.35] text-[#1B2430] transition-colors group-hover:text-[#1E4B8F]">
                {card.name}
              </span>
              <span className="mb-6 text-[15.5px] leading-[1.6] text-[#374151]">
                {card.desc}
              </span>
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
    </SectionShell>
  );
}
