import Link from "next/link";

import Reveal from "@/components/service/Reveal";
import { keyob } from "@/lib/keyob";
import KeyobLogo from "./KeyobLogo";

/**
 * Compact KEYOB promo card — the mid-page / end-of-article placement
 * ("Variant B"). Bachmann Robinson branding leads; KEYOB appears as the
 * named partner, and the card sends readers to the full partner section on
 * /about rather than straight off-site.
 */
export default function KeyobCard({
  className = "",
  body = "Websites, social media, AI and automation for growing businesses — at a preferred rate for Bachmann Robinson clients. The first conversation is free.",
}: {
  className?: string;
  /** Context-specific supporting line, when the default doesn't fit the page. */
  body?: string;
}) {
  return (
    <Reveal className={className}>
      <div className="flex flex-col items-stretch overflow-hidden border border-[#E5E4E0] border-l-[5px] border-l-[#1E4B8F] bg-white shadow-[0_6px_22px_rgba(18,25,42,0.07)] sm:flex-row">
        {/* Discount panel */}
        <div className="flex flex-row items-center justify-center gap-3 border-b border-[#E5E4E0] bg-[#F5F8FC] px-4 py-4 text-center sm:w-[176px] sm:shrink-0 sm:flex-col sm:gap-0 sm:border-b-0 sm:border-r sm:px-[14px] sm:py-6">
          <span className="text-[34px] font-extrabold leading-none tracking-[-0.02em] text-[#1E4B8F] sm:text-[46px]">
            {keyob.discount}
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#1B2430] sm:mt-[7px]">
            Client discount
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col justify-center gap-[9px] px-6 py-6 md:px-[26px]">
          <h3 className="m-0 font-serif text-[21px] font-normal leading-[1.3] text-[#1B2430] md:text-[23px]">
            We advise on your systems. Our IT partner builds them.
          </h3>
          <p className="m-0 max-w-[60ch] text-[14.5px] leading-[1.55] text-[#374151]">
            {body}
          </p>
          <div className="mt-[6px] flex flex-wrap items-center gap-x-[14px] gap-y-3">
            <Link
              href={keyob.sectionUrl}
              className="inline-flex min-h-[40px] items-center bg-[#1E4B8F] px-5 text-[13.5px] font-bold text-white transition-opacity hover:text-white hover:opacity-90"
            >
              See what&rsquo;s included
            </Link>
            <span className="ml-auto flex items-center gap-2 max-sm:hidden">
              <span className="whitespace-nowrap text-[10.5px] font-bold uppercase tracking-[1.2px] text-[#4B5563]">
                In partnership with
              </span>
              <KeyobLogo className="h-[15px]" />
            </span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
