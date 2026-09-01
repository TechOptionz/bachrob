import SectionShell, { SectionHeading, type Tone } from "./SectionShell";
import Reveal from "./Reveal";

export type ResourceBlock = {
  eyebrow: string;
  heading: string;
  intro?: string;
  links: { name: string; desc: string; url: string; source: string }[];
  tone?: Tone;
};

/**
 * Third-party reference material. Always labelled with its source so it can
 * never be mistaken for Bachmann Robinson's own guidance, and always opened in
 * a new tab with rel="noopener noreferrer".
 */
export default function ResourceLinks({
  eyebrow,
  heading,
  intro,
  links,
  tone = "navy",
}: ResourceBlock) {
  const dark = tone === "navy";

  const card = dark
    ? "border-white/25 text-white hover:border-white hover:bg-white/[0.06] hover:text-white"
    : "border-[#E5E4E0] bg-white text-[#1B2430] hover:border-[#9FB8DC] hover:bg-[#F5F8FC] hover:text-[#1B2430]";

  return (
    <SectionShell tone={tone}>
      <SectionHeading
        eyebrow={eyebrow}
        heading={heading}
        intro={intro}
        tone={tone}
      />

      <div className="mt-10 grid grid-cols-[repeat(auto-fill,minmax(min(250px,100%),1fr))] gap-[14px]">
        {links.map((link, i) => (
          <Reveal key={link.url} delay={Math.min(i, 5) * 50} className="h-full">
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex h-full flex-col border px-5 py-[18px] transition-colors ${card}`}
            >
              <span
                className={`mb-[10px] text-[11px] uppercase tracking-[2px] ${
                  dark ? "text-[#9FB8DC]" : "text-[#1E4B8F]"
                }`}
              >
                {link.source}
              </span>
              <span className="mb-[6px] text-[15.5px] font-bold">
                {link.name} <span aria-hidden="true">&#8599;</span>
                <span className="sr-only">(opens in a new tab)</span>
              </span>
              <span
                className={`text-[13.5px] leading-[1.45] ${
                  dark ? "text-[#D5E0F0]" : "text-[#374151]"
                }`}
              >
                {link.desc}
              </span>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p
          className={`m-0 mt-8 max-w-[740px] text-[14px] leading-[1.7] ${
            dark ? "text-[#C8D6EB]" : "text-[#4B5563]"
          }`}
        >
          These are external government resources, published and maintained by
          their respective agencies rather than by Bachmann Robinson. Links do
          not imply a recommendation of their content. For anything specific to
          your circumstances, speak with our team.
        </p>
      </Reveal>
    </SectionShell>
  );
}
