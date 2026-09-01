import SectionShell, { SectionHeading, type Tone } from "./SectionShell";
import Reveal from "./Reveal";

export type ProcessBlock = {
  eyebrow: string;
  heading: string;
  intro?: string;
  steps: { title: string; desc: string }[];
  note?: string;
  tone?: Tone;
};

export default function NumberedProcess({
  eyebrow,
  heading,
  intro,
  steps,
  note,
  tone = "white",
}: ProcessBlock) {
  const dark = tone === "navy";

  return (
    <SectionShell tone={tone}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow={eyebrow}
            heading={heading}
            intro={intro}
            tone={tone}
          />
        </div>

        <ol
          className={`m-0 list-none p-0 ${
            dark ? "border-t border-white/20" : "border-t border-[#E5E4E0]"
          }`}
        >
          {steps.map((step, i) => (
            <li
              key={step.title}
              className={dark ? "border-b border-white/20" : "border-b border-[#E5E4E0]"}
            >
              <Reveal delay={Math.min(i, 4) * 60}>
                <div className="flex gap-6 py-7 md:gap-8">
                  <span
                    className={`font-serif text-[22px] leading-none md:text-[26px] ${
                      dark ? "text-[#7593C1]" : "text-[#C8D6EB]"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3
                      className={`m-0 mb-2 font-serif text-[20px] font-normal leading-[1.35] md:text-[22px] ${
                        dark ? "text-white" : "text-[#1B2430]"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`m-0 text-[16.5px] leading-[1.7] ${
                        dark ? "text-[#D5E0F0]" : "text-[#374151]"
                      }`}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      {note ? (
        <Reveal>
          <p
            className={`m-0 mt-10 max-w-[760px] text-[15.5px] leading-[1.7] ${
              dark ? "text-[#C8D6EB]" : "text-[#4B5563]"
            }`}
          >
            {note}
          </p>
        </Reveal>
      ) : null}
    </SectionShell>
  );
}
