import SectionShell, { SectionHeading, type Tone } from "./SectionShell";
import Reveal from "./Reveal";

export type IntroBlock = {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  aside?: { title: string; body: string };
  tone?: Tone;
};

/**
 * The opening editorial block: heading on the left, running copy on the right,
 * with an optional bordered aside underneath the heading.
 */
export default function EditorialContentSection({
  eyebrow,
  heading,
  paragraphs,
  aside,
  tone = "cream",
}: IntroBlock) {
  return (
    <SectionShell tone={tone}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div>
          <SectionHeading eyebrow={eyebrow} heading={heading} tone={tone} />
          <Reveal delay={80}>
            <span
              aria-hidden="true"
              className="br-rule mt-7 block h-[3px] w-[54px] bg-[#1E4B8F]"
            />
          </Reveal>
        </div>

        <div>
          {paragraphs.map((text, i) => (
            <Reveal key={text.slice(0, 24)} delay={i * 70}>
              <p className="m-0 mb-5 text-[16.5px] leading-[1.75] text-[#374151] last:mb-0 md:text-[17px]">
                {text}
              </p>
            </Reveal>
          ))}

          {aside ? (
            <Reveal delay={paragraphs.length * 70}>
              <div className="mt-8 border-l-[3px] border-[#1E4B8F] bg-[#F5F8FC] px-6 py-5">
                <div className="mb-2 text-[15px] font-bold text-[#1B2430]">
                  {aside.title}
                </div>
                <p className="m-0 text-[15.5px] leading-[1.65] text-[#4B5563]">
                  {aside.body}
                </p>
              </div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </SectionShell>
  );
}
