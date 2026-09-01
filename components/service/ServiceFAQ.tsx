import SectionShell, { SectionHeading, type Tone } from "./SectionShell";
import Reveal from "./Reveal";

export type Faq = { q: string; a: string };

/**
 * Accordion built on native <details>/<summary>: keyboard operation, focus
 * order and screen-reader semantics come from the browser, the answers are
 * present in the server-rendered HTML for crawlers, and it degrades to plain
 * expandable text with JavaScript disabled.
 */
export default function ServiceFAQ({
  faqs,
  heading = "Common questions",
  intro,
  tone = "cream",
}: {
  faqs: Faq[];
  heading?: string;
  intro?: string;
  tone?: Tone;
}) {
  return (
    <SectionShell tone={tone} id="faq">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Questions"
            heading={heading}
            intro={intro}
            tone={tone}
          />
        </div>

        <div className="border-t border-[#E5E4E0]">
          {faqs.map((faq, i) => (
            <Reveal key={faq.q} delay={Math.min(i, 4) * 45}>
              <details className="faq-item group border-b border-[#E5E4E0]">
                <summary className="flex items-start gap-5 py-6">
                  <h3 className="m-0 flex-1 font-serif text-[19px] font-normal leading-[1.45] text-[#1B2430] transition-colors group-hover:text-[#1E4B8F] md:text-[19px]">
                    {faq.q}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="faq-icon relative mt-[5px] block h-[13px] w-[13px] shrink-0"
                  />
                </summary>
                <div className="faq-panel pb-7 pr-8 text-[16px] leading-[1.75] text-[#374151]">
                  {faq.a}
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
