import Link from "next/link";
import { site } from "@/lib/data";
import Reveal from "./service/Reveal";

/**
 * Closing call to action. Sits directly above the footer on every page and
 * stays light on purpose: the footer's dark curved top edge sweeps up over
 * this band, so the page ends with a single navy shape closing against the
 * white — the generous bottom padding is the room it needs to land.
 */
export default function ContactCTA() {
  return (
    <section className="gutter bg-cream pb-[120px] pt-20 md:pb-[168px] md:pt-24">
      <div className="shell">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <div className="eyebrow mb-[18px] text-[#1E4B8F]">
            Not sure where to start?
          </div>
          <h2 className="m-0 mb-5 font-serif text-[34px] font-normal leading-[1.15] text-pretty text-[#1B2430] md:text-[46px]">
            Let&rsquo;s talk about what you need.
          </h2>
          <p className="m-0 mb-9 text-[17.5px] leading-[1.7] text-[#374151] md:text-[19px]">
            Whether you have a straightforward question or a more complex
            financial situation, our team is here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-[#1E4B8F] px-7 py-[14px] text-[16px] font-bold text-white transition-colors hover:bg-[#16396E] hover:text-white"
            >
              Talk to an accountant
            </Link>
            <a
              href={site.phoneHref}
              className="border border-[#1E4B8F] px-7 py-[14px] text-[16px] font-semibold text-[#1E4B8F] transition-colors hover:bg-white hover:text-[#16396E]"
            >
              Call {site.phone}
            </a>
          </div>
          <p className="m-0 mt-9 text-[14.5px] leading-[1.7] text-[#4B5563]">
            {site.addressLine} &middot; {site.hours}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
