import type { ImageSpec } from "@/lib/services";

/**
 * Stand-in for artwork that has not been supplied yet.
 *
 * It reserves the exact box a real photograph will occupy (so nothing reflows
 * when the images land) and carries the brief for whoever sources them. To
 * swap one out, replace this element with a next/image, keeping `alt` and the
 * same aspect ratio:
 *
 *   <Image
 *     src="/assets/services/income-tax-hero.webp"
 *     alt="Accountant and client reviewing tax documents together"
 *     width={1200} height={900} loading="lazy"
 *     sizes="(max-width: 900px) 100vw, 520px"
 *     className="block h-auto w-full"
 *   />
 */

const ratios: Record<ImageSpec["aspectRatio"], string> = {
  "4:3": "4 / 3",
  "3:2": "3 / 2",
  "16:9": "16 / 9",
  "5:3": "5 / 3",
  "4:5": "4 / 5",
  "1:1": "1 / 1",
};

export default function ImagePlaceholder({
  label,
  suggestedImage,
  alt,
  aspectRatio,
  className = "",
}: ImageSpec & { className?: string }) {
  return (
    <figure
      data-image-placeholder={label}
      className={`m-0 ${className}`}
      aria-hidden="true"
    >
      <div
        className="relative flex items-center justify-center overflow-hidden border border-[#E5E4E0] bg-[linear-gradient(150deg,#F5F8FC_0%,#F1F3F0_100%)] px-6 py-8"
        style={{ aspectRatio: ratios[aspectRatio] ?? "4 / 3" }}
      >
        {/* Hairline corner ticks — reads as a framing guide rather than a
            broken image icon. */}
        <span className="pointer-events-none absolute left-4 top-4 h-4 w-4 border-l border-t border-[#C8D6EB]" />
        <span className="pointer-events-none absolute right-4 top-4 h-4 w-4 border-r border-t border-[#C8D6EB]" />
        <span className="pointer-events-none absolute bottom-4 left-4 h-4 w-4 border-b border-l border-[#C8D6EB]" />
        <span className="pointer-events-none absolute bottom-4 right-4 h-4 w-4 border-b border-r border-[#C8D6EB]" />

        <div className="max-w-[330px] text-center">
          <svg
            viewBox="0 0 44 34"
            className="mx-auto mb-4 block h-[26px] w-auto text-[#7593C1]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            aria-hidden="true"
          >
            <rect x="0.6" y="0.6" width="42.8" height="32.8" />
            <path d="M0.6 25.5 13 14l9.5 8.4L30 16l13.4 11.5" />
            <circle cx="31.5" cy="9" r="3.2" />
          </svg>
          <div className="eyebrow text-[10.5px] tracking-[2.4px] text-[#1E4B8F]">
            Image placeholder
          </div>
          <div className="mt-[10px] font-serif text-[15px] leading-[1.35] text-[#1B2430]">
            {label}
          </div>
          <p className="m-0 mt-[10px] text-[13px] leading-[1.5] text-[#6B7280]">
            {suggestedImage}
          </p>
          <p className="m-0 mt-2 text-[12px] leading-[1.45] text-[#8A94A6]">
            Alt: &ldquo;{alt}&rdquo; &middot; {aspectRatio}
          </p>
        </div>
      </div>
    </figure>
  );
}
