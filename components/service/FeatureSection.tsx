import SectionShell, { type Tone } from "./SectionShell";
import Reveal from "./Reveal";
import ImagePlaceholder from "./ImagePlaceholder";
import type { ImageSpec } from "@/lib/services";

export type FeatureBlock = {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  points?: string[];
  image: ImageSpec;
  /** Puts the artwork on the left instead of the right. */
  reverse?: boolean;
  tone?: Tone;
};

export default function FeatureSection({
  eyebrow,
  heading,
  paragraphs,
  points,
  image,
  reverse = false,
  tone = "cream",
}: FeatureBlock) {
  const dark = tone === "navy";

  return (
    <SectionShell tone={tone}>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className={reverse ? "lg:order-2" : undefined}>
          <div
            className={`eyebrow mb-[14px] ${dark ? "text-[#9FB8DC]" : "text-[#1E4B8F]"}`}
          >
            {eyebrow}
          </div>
          <h2
            className={`m-0 mb-5 font-serif text-[26px] font-normal leading-[1.25] text-pretty md:text-[32px] ${
              dark ? "text-white" : "text-[#1B2430]"
            }`}
          >
            {heading}
          </h2>
          {paragraphs.map((text) => (
            <p
              key={text.slice(0, 24)}
              className={`m-0 mb-[18px] text-[16.5px] leading-[1.75] ${
                dark ? "text-[#C8D6EB]" : "text-[#374151]"
              }`}
            >
              {text}
            </p>
          ))}

          {points?.length ? (
            <ul className="m-0 mt-7 list-none p-0">
              {points.map((point) => (
                <li
                  key={point}
                  className={`flex gap-3 border-t py-[14px] text-[15.5px] leading-[1.6] last:border-b ${
                    dark
                      ? "border-white/20 text-[#D5E0F0]"
                      : "border-[#E5E4E0] text-[#374151]"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`mt-[9px] h-[1.5px] w-[14px] shrink-0 ${
                      dark ? "bg-[#7593C1]" : "bg-[#1E4B8F]"
                    }`}
                  />
                  {point}
                </li>
              ))}
            </ul>
          ) : null}
        </Reveal>

        <Reveal delay={90} className={reverse ? "lg:order-1" : undefined}>
          <ImagePlaceholder {...image} />
        </Reveal>
      </div>
    </SectionShell>
  );
}
