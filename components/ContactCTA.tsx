import Link from "next/link";
import { site } from "@/lib/data";
import Reveal from "./service/Reveal";

/**
 * Closing call to action. Sits directly above the footer on every page, so the
 * generous bottom padding leaves room for the footer's curved top edge to ride
 * over it.
 */
export default function ContactCTA() {
  return (
    <section className="gutter bg-[linear-gradient(160deg,#16396E_0%,#1E4B8F_70%,#2A5CA8_100%)] pb-[120px] pt-20 text-white md:pb-[168px] md:pt-24">
      <div className="shell">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <div className="eyebrow mb-[18px] text-[#9FB8DC]">
            Not sure where to start?
          </div>
          <h2 className="m-0 mb-5 font-serif text-[34px] font-normal leading-[1.15] text-pretty md:text-[46px]">
            Let&rsquo;s talk about what you need.
          </h2>
          <p className="m-0 mb-9 text-[17.5px] leading-[1.7] text-[#D5E0F0] md:text-[19px]">
            Whether you have a straightforward question or a more complex
            financial situation, our team is here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/#contact"
              className="bg-white px-7 py-[14px] text-[16px] font-bold text-[#16396E] transition-colors hover:bg-[#E8EEF7] hover:text-[#16396E]"
            >
              Talk to an accountant
            </Link>
            <a
              href={site.phoneHref}
              className="border border-[#7593C1] px-7 py-[14px] text-[16px] font-semibold text-white transition-colors hover:border-white hover:text-white"
            >
              Call {site.phone}
            </a>
          </div>
          <p className="m-0 mt-9 text-[14.5px] leading-[1.7] text-[#9FB8DC]">
            {site.addressLine} &middot; {site.hours}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
