import type { ReactNode } from "react";
import type { Resource } from "@/lib/data";

/**
 * Shared card for the ATO quick links, used on the homepage band and the
 * /resources page so the treatment stays identical site-wide. Icons follow the
 * site idiom — inline SVG on a 32×32 viewBox, single stroke weight — keyed by
 * resource name, with an external-link glyph as the fallback for new entries.
 */
const icons: Record<string, ReactNode> = {
  Calculators: (
    <>
      <rect x="8" y="4" width="16" height="24" />
      <path d="M11.5 8h9v5h-9z" />
      <path d="M12 17.5h.01M16 17.5h.01M20 17.5h.01M12 22.5h.01M16 22.5h.01M20 22.5h.01" />
    </>
  ),
  "What can I claim": (
    <>
      <path d="M7 3h13l5 5v21H7V3z" />
      <path d="M20 3v5h5" />
      <path d="M12 18.5l3 3 5.5-5.5" />
    </>
  ),
  "Income to declare": (
    <>
      <circle cx="16" cy="16" r="12" />
      <path d="M16 9v14" />
      <path d="M19.8 12.3c-.8-1-2.2-1.7-3.8-1.7-2.2 0-3.8 1.3-3.8 3 0 3.9 7.6 2 7.6 5.9 0 1.7-1.6 3-3.8 3-1.6 0-3-.7-3.8-1.7" />
    </>
  ),
  "Rental properties": (
    <>
      <path d="M4 14L16 4l12 10" />
      <path d="M7 12.5V28h18V12.5" />
      <path d="M13 28v-8h6v8" />
    </>
  ),
  "Small Business Newsroom": (
    <>
      <path d="M4 6h20v22H7a3 3 0 0 1-3-3V6z" />
      <path d="M24 11h4v14a3 3 0 0 1-3 3" />
      <path d="M8 11h12M8 16h12M8 21h8" />
    </>
  ),
  "Protect your information": (
    <>
      <path d="M16 3l11 5v8c0 7-4.6 11.7-11 13C9.6 27.7 5 23 5 16V8z" />
      <circle cx="16" cy="14" r="2.5" />
      <path d="M16 16.5V21" />
    </>
  ),
  "Super changes": (
    <>
      <path d="M27 5v6h-6" />
      <path d="M4.5 16a11.5 11.5 0 0 1 19.6-8.1L27 11" />
      <path d="M5 27v-6h6" />
      <path d="M27.5 16a11.5 11.5 0 0 1-19.6 8.1L5 21" />
    </>
  ),
  "Business essentials": (
    <>
      <rect x="4" y="10" width="24" height="17" />
      <path d="M12 10V6h8v4" />
      <path d="M4 17h9M19 17h9" />
      <path d="M13 15h6v4h-6z" />
    </>
  ),
};

const fallbackIcon = (
  <>
    <path d="M13 19L27 5" />
    <path d="M20 5h7v7" />
    <path d="M23 17v10H5V9h10" />
  </>
);

type Tone = "light" | "navy";

export default function ResourceCard({
  resource,
  tone = "light",
}: {
  resource: Resource;
  tone?: Tone;
}) {
  const light = tone === "light";

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`br-lift group flex h-full flex-col px-6 pb-5 pt-6 ${
        light
          ? "border border-[#D8DCE2] bg-white text-[#1B2430] hover:border-[#1E4B8F] hover:text-[#1B2430] hover:shadow-[0_16px_36px_-18px_rgba(22,57,110,0.35)]"
          : "border border-white/25 bg-white/[0.04] text-white hover:border-white/80 hover:bg-white/[0.08] hover:text-white"
      }`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center transition-colors duration-300 ${
            light
              ? "bg-[#EEF3FA] text-[#1E4B8F] group-hover:bg-[#1E4B8F] group-hover:text-white"
              : "bg-white/10 text-[#BFD2EE] group-hover:bg-white group-hover:text-[#16396E]"
          }`}
        >
          <svg
            viewBox="0 0 32 32"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            {icons[resource.name] ?? fallbackIcon}
          </svg>
        </span>
        <span
          aria-hidden="true"
          className={`mt-[2px] text-[13px] transition-[transform,color] duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px] ${
            light
              ? "text-[#7593C1] group-hover:text-[#1E4B8F]"
              : "text-white/50 group-hover:text-white"
          }`}
        >
          ↗
        </span>
      </div>

      <div
        className={`text-[15.5px] font-bold leading-[1.35] transition-colors ${
          light ? "group-hover:text-[#1E4B8F]" : ""
        }`}
      >
        {resource.name}
      </div>
      <div
        className={`mb-5 mt-[6px] text-[14.5px] leading-[1.55] ${
          light ? "text-[#4B5563]" : "text-[#D5E0F0]"
        }`}
      >
        {resource.desc}
      </div>

      <div
        className={`mt-auto border-t pt-3 text-[11px] font-semibold uppercase tracking-[1.8px] transition-colors ${
          light
            ? "border-[#E8EBEF] text-[#8A94A6] group-hover:text-[#1E4B8F]"
            : "border-white/15 text-[#9FB4D6] group-hover:text-white"
        }`}
      >
        ato.gov.au
      </div>
      <span className="sr-only">(opens ato.gov.au in a new tab)</span>
    </a>
  );
}
