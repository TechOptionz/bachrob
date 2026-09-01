import type { ServiceSlug } from "@/lib/services";

/**
 * One line icon per service, on the shared 32×32 / single-stroke grid used by
 * the WhyUs pillars so both home-page grids read as one set. Stroke colour is
 * left to the caller via className so hover states can repaint it.
 */
const icons: Record<ServiceSlug, React.ReactNode> = {
  // Tax return: a lodged document
  "income-tax-returns": (
    <>
      <path d="M7 3h11l7 7v19H7z" />
      <path d="M18 3v7h7" />
      <path d="M11 16h10M11 21h10M11 26h6" />
    </>
  ),
  // Growth: trend line breaking upward
  "business-advice-development": (
    <>
      <path d="M4 4v24h24" />
      <path d="M9 22l6-6 4 3 9-10" />
      <path d="M22 9h6v6" />
    </>
  ),
  // Super kept safe: a vault
  "smsf-administration": (
    <>
      <rect x="4" y="4" width="24" height="24" rx="2" />
      <circle cx="16" cy="16" r="5.5" />
      <path d="M16 10.5v-3M16 24.5v-3M10.5 16h-3M24.5 16h-3" />
    </>
  ),
  // Where the business stands: bars
  "financial-statements": (
    <>
      <path d="M4 28h24" />
      <path d="M8 28v-6M14 28V16M20 28v-9M26 28V10" />
    </>
  ),
  // Lodged on time: calendar, ticked
  "business-activity-statements": (
    <>
      <rect x="4" y="6" width="24" height="22" rx="2" />
      <path d="M4 13h24" />
      <path d="M10 3v6M22 3v6" />
      <path d="M12 20.5l2.8 2.8 5.2-5.8" />
    </>
  ),
  // Forward planning: a compass
  "taxation-planning-advice": (
    <>
      <circle cx="16" cy="16" r="12" />
      <path d="M20.5 11.5l-2.7 6.3-6.3 2.7 2.7-6.3z" />
    </>
  ),
  // Independent audit: the scales
  "non-profit-association-audits": (
    <>
      <path d="M16 5v22M10 27h12M7 8h18" />
      <path d="M7 8l-3.5 8.5M7 8l3.5 8.5M3.5 16.5a3.5 3.5 0 0 0 7 0" />
      <path d="M25 8l-3.5 8.5M25 8l3.5 8.5M21.5 16.5a3.5 3.5 0 0 0 7 0" />
    </>
  ),
  // The ledger: an open book
  bookkeeping: (
    <>
      <path d="M16 8c-2.8-2.4-6.8-3-12-3v21c5.2 0 9.2.6 12 3 2.8-2.4 6.8-3 12-3V5c-5.2 0-9.2.6-12 3z" />
      <path d="M16 8v21" />
    </>
  ),
  // Advice: a conversation
  "financial-advice": (
    <>
      <path d="M5 6a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H14l-6 6v-6H7a2 2 0 0 1-2-2z" />
      <path d="M11 10.5h10M11 15h6" />
    </>
  ),
};

export default function ServiceIcon({
  slug,
  className,
}: {
  slug: ServiceSlug;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {icons[slug]}
    </svg>
  );
}
