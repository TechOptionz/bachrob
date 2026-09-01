import SectionShell, { SectionHeading, type Tone } from "./SectionShell";
import Reveal from "./Reveal";

export type AudienceBlock = {
  eyebrow: string;
  heading: string;
  intro?: string;
  groups: { name: string; desc: string }[];
  note?: string;
  tone?: Tone;
};

export default function AudienceSection({
  eyebrow,
  heading,
  intro,
  groups,
  note,
  tone = "stone",
}: AudienceBlock) {
  return (
    <SectionShell tone={tone}>
      <SectionHeading
        eyebrow={eyebrow}
        heading={heading}
        intro={intro}
        tone={tone}
      />

      <div className="mt-11 grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group, i) => (
          <Reveal key={group.name} delay={Math.min(i, 5) * 55}>
            <div className="border-t border-[#D8DCE2] pt-5">
              <h3 className="m-0 mb-2 font-serif text-[18px] font-normal text-[#1B2430]">
                {group.name}
              </h3>
              <p className="m-0 text-[15.5px] leading-[1.65] text-[#4B5563]">
                {group.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {note ? (
        <Reveal>
          <p className="m-0 mt-10 max-w-[720px] text-[15.5px] leading-[1.7] text-[#6B7280]">
            {note}
          </p>
        </Reveal>
      ) : null}
    </SectionShell>
  );
}
