import SectionShell, { SectionHeading, type Tone } from "./SectionShell";
import Reveal from "./Reveal";

export type HelpItem = { title: string; desc: string };

export type HelpWithBlock = {
  eyebrow: string;
  heading: string;
  intro?: string;
  items: HelpItem[];
  /** Three deliberately different treatments so pages don't read as clones. */
  layout?: "rows" | "columns" | "list";
  tone?: Tone;
  footnote?: string;
};

const pad = (i: number) => String(i + 1).padStart(2, "0");

export default function HelpWithSection({
  eyebrow,
  heading,
  intro,
  items,
  layout = "rows",
  tone = "white",
  footnote,
}: HelpWithBlock) {
  return (
    <SectionShell tone={tone}>
      <SectionHeading
        eyebrow={eyebrow}
        heading={heading}
        intro={intro}
        tone={tone}
      />

      {layout === "rows" ? (
        <div className="mt-12 border-t border-[#E5E4E0]">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={Math.min(i, 4) * 60}>
              <div className="grid gap-2 border-b border-[#E5E4E0] py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] md:gap-10">
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-[13px] tracking-[1px] text-[#7593C1]">
                    {pad(i)}
                  </span>
                  <h3 className="m-0 font-serif text-[19px] font-normal leading-[1.35] text-[#1B2430] md:text-[21px]">
                    {item.title}
                  </h3>
                </div>
                <p className="m-0 text-[16px] leading-[1.7] text-[#4B5563]">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      ) : null}

      {layout === "columns" ? (
        <div className="mt-12 grid gap-x-14 gap-y-9 sm:grid-cols-2">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={Math.min(i, 5) * 60}>
              <div className="border-l border-[#D8DCE2] pl-6">
                <span
                  aria-hidden="true"
                  className="mb-4 block h-[3px] w-[26px] bg-[#1E4B8F]"
                />
                <h3 className="m-0 mb-[10px] font-serif text-[19px] font-normal leading-[1.35] text-[#1B2430]">
                  {item.title}
                </h3>
                <p className="m-0 text-[15.5px] leading-[1.65] text-[#4B5563]">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      ) : null}

      {layout === "list" ? (
        <ol className="m-0 mt-12 grid list-none gap-px border border-[#E5E4E0] bg-[#E5E4E0] p-0 md:grid-cols-2">
          {items.map((item, i) => (
            <li key={item.title} className="bg-white">
              <Reveal delay={Math.min(i, 5) * 55} className="h-full">
                <div className="h-full px-7 pb-8 pt-7">
                  <div className="mb-4 font-serif text-[26px] leading-none text-[#C8D6EB]">
                    {pad(i)}
                  </div>
                  <h3 className="m-0 mb-[10px] font-serif text-[19px] font-normal leading-[1.35] text-[#1B2430]">
                    {item.title}
                  </h3>
                  <p className="m-0 text-[15.5px] leading-[1.65] text-[#4B5563]">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      ) : null}

      {footnote ? (
        <Reveal>
          <p className="m-0 mt-8 max-w-[680px] text-[15px] leading-[1.65] text-[#6B7280]">
            {footnote}
          </p>
        </Reveal>
      ) : null}
    </SectionShell>
  );
}
