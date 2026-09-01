import Reveal from "@/components/service/Reveal";
import { keyob } from "@/lib/keyob";
import KeyobLogo from "./KeyobLogo";

/**
 * Compact KEYOB promo card — the mid-page / end-of-article placement. Bachmann
 * Robinson branding leads; KEYOB appears as the named partner, with its cyan
 * used only as a small highlight so the card reads as an editorial aside
 * rather than a foreign advertisement.
 */
export default function KeyobCard({
  className = "",
  body = "Websites, AI and automation for growing businesses — at a preferred rate for Bachmann Robinson clients. The first conversation is free, with no obligation.",
}: {
  className?: string;
  /** Context-specific supporting line, when the default doesn't fit the page. */
  body?: string;
}) {
  return (
    <Reveal className={className}>
      <div className="flex flex-col items-stretch overflow-hidden border border-[#E5E4E0] border-t-[3px] border-t-[#01BCFE] bg-white shadow-[0_6px_22px_rgba(18,25,42,0.06)] sm:flex-row">
        {/* Discount panel */}
        <div className="flex flex-row items-center justify-center gap-4 border-b border-[#E5E4E0] bg-[#F5F8FC] px-6 py-5 text-center sm:w-[190px] sm:shrink-0 sm:flex-col sm:gap-0 sm:border-b-0 sm:border-r sm:py-8">
          <span className="font-serif text-[38px] leading-none tracking-[-0.01em] text-[#1E4B8F] sm:text-[46px]">
            {keyob.discount}
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[2px] text-[#1B2430] sm:mt-2">
            Client discount
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col justify-center gap-[10px] px-7 py-7 md:px-9">
          <div className="eyebrow text-[11px] tracking-[2.4px] text-[#1E4B8F]">
            Bachmann Robinson &times; KEYOB
          </div>
          <h3 className="m-0 font-serif text-[21px] font-normal leading-[1.3] text-[#1B2430] md:text-[23px]">
            We advise on your systems. Our IT partner builds them.
          </h3>
          <p className="m-0 max-w-[56ch] text-[15px] leading-[1.65] text-[#374151]">
            {body}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={keyob.contactUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#14295A] px-6 py-3 text-[14.5px] font-bold text-white transition-colors hover:bg-[#1B356E] hover:text-white"
            >
              Talk to KEYOB
            </a>
            <a
              href={keyob.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14.5px] font-semibold text-[#1E4B8F] transition-colors hover:text-[#16396E]"
            >
              Visit keyob.com <span aria-hidden="true">&rarr;</span>
            </a>
            <span className="ml-auto flex items-center gap-[9px] max-sm:hidden">
              <span className="text-[10px] font-bold uppercase tracking-[1.2px] text-[#6B7280]">
                In partnership with
              </span>
              <KeyobLogo className="h-[14px]" />
            </span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
