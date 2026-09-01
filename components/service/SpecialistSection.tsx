import Link from "next/link";
import SectionShell, { type Tone } from "./SectionShell";
import Reveal from "./Reveal";
import ImagePlaceholder from "./ImagePlaceholder";
import type { ImageSpec } from "@/lib/services";

export type SpecialistBlock = {
  eyebrow: string;
  heading: string;
  /** Only ever populated from credentials already published by the firm. */
  person: { name: string; role: string; creds: string };
  paragraphs: string[];
  image: ImageSpec;
  tone?: Tone;
};

export default function SpecialistSection({
  eyebrow,
  heading,
  person,
  paragraphs,
  image,
  tone = "stone",
}: SpecialistBlock) {
  return (
    <SectionShell tone={tone}>
      <div className="grid gap-10 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)] md:gap-14 lg:gap-16">
        <Reveal>
          <ImagePlaceholder {...image} />
        </Reveal>

        <Reveal delay={90}>
          <div className="eyebrow mb-[14px] text-[#1E4B8F]">{eyebrow}</div>
          <h2 className="m-0 mb-5 font-serif text-[26px] font-normal leading-[1.25] text-pretty text-[#1B2430] md:text-[32px]">
            {heading}
          </h2>
          {paragraphs.map((text) => (
            <p
              key={text.slice(0, 24)}
              className="m-0 mb-[18px] text-[16.5px] leading-[1.75] text-[#374151]"
            >
              {text}
            </p>
          ))}

          <div className="mt-7 border-t border-[#D8DCE2] pt-6">
            <div className="font-serif text-[20px] text-[#1B2430]">
              {person.name}
            </div>
            <div className="mt-1 text-[14px] font-semibold uppercase tracking-[1.4px] text-[#1E4B8F]">
              {person.role}
            </div>
            {person.creds ? (
              <div className="mt-2 text-[14.5px] leading-[1.6] text-[#4B5563]">
                {person.creds}
              </div>
            ) : null}
            <Link href="/#team" className="rule-link mt-5 inline-block">
              Meet the team &rarr;
            </Link>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
