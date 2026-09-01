import SectionShell, { SectionHeading, type Tone } from "./SectionShell";
import Reveal from "./Reveal";

export type ConsiderationsBlock = {
  eyebrow: string;
  heading: string;
  intro?: string;
  items: { title: string; desc: string }[];
  disclaimer?: string;
  tone?: Tone;
};

export default function ConsiderationsSection({
  eyebrow,
  heading,
  intro,
  items,
  disclaimer,
  tone = "cream",
}: ConsiderationsBlock) {
  return (
    <SectionShell tone={tone}>
      <SectionHeading
        eyebrow={eyebrow}
        heading={heading}
        intro={intro}
        tone={tone}
      />

      <div className="mt-11 grid gap-x-12 gap-y-8 md:grid-cols-2">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={Math.min(i, 4) * 55}>
            <div>
              <h3 className="m-0 mb-[10px] flex items-baseline gap-3 font-serif text-[19px] font-normal text-[#1B2430]">
                <span
                  aria-hidden="true"
                  className="h-[7px] w-[7px] shrink-0 translate-y-[-2px] bg-[#1E4B8F]"
                />
                {item.title}
              </h3>
              <p className="m-0 pl-[19px] text-[15.5px] leading-[1.7] text-[#374151]">
                {item.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {disclaimer ? (
        <Reveal>
          <p className="m-0 mt-11 max-w-[820px] border-t border-[#E5E4E0] pt-6 text-[14.5px] leading-[1.7] text-[#4B5563]">
            {disclaimer}
          </p>
        </Reveal>
      ) : null}
    </SectionShell>
  );
}
