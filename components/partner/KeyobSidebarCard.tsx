import Reveal from "@/components/service/Reveal";
import { keyob } from "@/lib/keyob";
import KeyobLogo from "./KeyobLogo";

/**
 * Narrow KEYOB promo block for sidebars and rails — the KEYOB navy surface
 * with the cyan accent, sized to sit under the sticky services index.
 */
export default function KeyobSidebarCard({
  className = "",
}: {
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <aside className="border-t-4 border-[#01BCFE] bg-[#14295A] px-6 py-6 text-center">
        <span className="eyebrow block text-[10.5px] tracking-[2px] text-[#01BCFE]">
          For Bachmann Robinson clients
        </span>
        <span className="mt-3 block font-serif text-[44px] leading-none tracking-[-0.01em] text-white">
          {keyob.discount}
        </span>
        <span className="mt-[6px] block text-[11.5px] font-bold uppercase tracking-[2.2px] text-[#9FB8DC]">
          Client discount
        </span>
        <p className="m-0 mt-3 text-[13.5px] leading-[1.6] text-[#DCE6F5]">
          Our IT partner builds the websites, automations and systems our
          clients run on — at a preferred rate.
        </p>
        <a
          href={keyob.contactUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block bg-[#01BCFE] px-4 py-[10px] text-[14px] font-bold text-[#14295A] transition-opacity hover:text-[#14295A] hover:opacity-85"
        >
          Talk to KEYOB
        </a>
        <p className="m-0 mt-2 text-[11.5px] leading-[1.5] text-[#8FA0C0]">
          Free first conversation &middot; No obligation
        </p>
        <span className="mt-4 flex flex-col items-center gap-2 border-t border-white/15 pt-3">
          <span className="text-[9.5px] font-bold uppercase tracking-[1.4px] text-white/60">
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
