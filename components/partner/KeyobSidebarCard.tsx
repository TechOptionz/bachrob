import Link from "next/link";

import Reveal from "@/components/service/Reveal";
import { keyob } from "@/lib/keyob";
import KeyobLogo from "./KeyobLogo";

/**
 * Narrow KEYOB promo block for sidebars and rails ("Variant C") — the site's
 * own navy with KEYOB's cyan as the single highlight, sized to sit under the
 * sticky services index.
 */
export default function KeyobSidebarCard({
  className = "",
}: {
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <aside className="border-t-4 border-[#01BCFE] bg-[#16396E] px-[26px] py-7 text-center">
        <span className="block text-[10.5px] font-bold uppercase tracking-[0.12em] text-white/75">
          For Bachmann Robinson clients
        </span>
        <span className="mt-[14px] block text-[54px] font-extrabold leading-none tracking-[-0.02em] text-white">
          {keyob.discount}
        </span>
        <span className="mt-2 block text-[12px] font-bold uppercase tracking-[0.14em] text-[#01BCFE]">
          Client discount
        </span>
        <p className="m-0 mt-4 text-[14.5px] leading-[1.6] text-white/86">
          Our IT partner builds the websites, social media, automations and
          systems our clients run on &mdash; at a preferred rate.
        </p>
        <Link
          href={keyob.sectionUrl}
          className="mt-5 flex min-h-[44px] items-center justify-center bg-white px-[18px] text-[14px] font-bold text-[#16396E] transition-opacity hover:text-[#16396E] hover:opacity-90"
        >
          Find out more
        </Link>
        <span className="mt-[18px] flex flex-col items-center gap-2 border-t border-white/[0.18] pt-4">
          <span className="text-[10px] font-bold uppercase tracking-[1.2px] text-white/65">
            In partnership with
          </span>
          <a
            href={keyob.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit keyob.com"
          >
            <KeyobLogo variant="white" className="h-[15px]" />
          </a>
        </span>
      </aside>
    </Reveal>
  );
}
