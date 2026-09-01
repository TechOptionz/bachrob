import Reveal from "./Reveal";

export type Tone = "white" | "cream" | "stone" | "tint" | "navy";

const toneClass: Record<Tone, string> = {
  white: "bg-white",
  cream: "bg-cream",
  stone: "bg-[#F1F3F0]",
  tint: "bg-[#F5F8FC]",
  navy: "bg-[#16396E] text-white",
};

/** Section wrapper carrying the site's 96/40px rhythm and the 1100px measure. */
export default function SectionShell({
  tone = "cream",
  id,
  className = "",
  children,
}: {
  tone?: Tone;
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`section scroll-mt-24 ${toneClass[tone]} ${className}`}
    >
      <div className="shell">{children}</div>
    </section>
  );
}

/** Eyebrow + serif H2 + optional lead paragraph, used by every section. */
export function SectionHeading({
  eyebrow,
  heading,
  intro,
  tone = "cream",
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  heading: string;
  intro?: string;
  tone?: Tone;
  align?: "left" | "center";
  className?: string;
}) {
  const dark = tone === "navy";

  return (
    <Reveal
      className={`${align === "center" ? "mx-auto text-center" : ""} ${className}`}
    >
      {eyebrow ? (
        <div
          className={`eyebrow mb-[14px] ${dark ? "text-[#9FB8DC]" : "text-[#1E4B8F]"}`}
        >
          {eyebrow}
        </div>
      ) : null}
      <h2
        className={`m-0 font-serif text-[30px] font-normal leading-[1.2] text-pretty md:text-[38px] ${
          dark ? "text-white" : "text-[#1B2430]"
        }`}
      >
        {heading}
      </h2>
      {intro ? (
        <p
          className={`m-0 mt-5 max-w-[680px] text-[17px] leading-[1.7] ${
            align === "center" ? "mx-auto" : ""
          } ${dark ? "text-[#D5E0F0]" : "text-[#374151]"}`}
        >
          {intro}
        </p>
      ) : null}
    </Reveal>
  );
}
