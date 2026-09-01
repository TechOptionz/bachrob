import { site } from "@/lib/data";

export type SubnavItem = { id: string; label: string };

/**
 * Slim index bar between the hero and the first section: jump links to the
 * page's main sections plus the phone number. Plain anchors — smooth scrolling
 * comes from `scroll-behavior` on <html>, and each target carries scroll-mt so
 * headings land clear of the sticky nav.
 */
export default function ServiceSubnav({ items }: { items: SubnavItem[] }) {
  if (!items.length) return null;

  return (
    <nav
      aria-label="On this page"
      className="gutter border-b border-[#E5E4E0] bg-white"
    >
      <div className="shell flex items-center gap-2 md:gap-6">
        <span className="eyebrow hidden shrink-0 py-4 text-[11px] tracking-[2px] text-[#6B7280] md:block">
          On this page
        </span>
        <ul className="m-0 -mb-px flex list-none items-stretch gap-1 overflow-x-auto p-0 md:gap-2">
          {items.map((item) => (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                className="block border-b-2 border-transparent px-3 py-[15px] text-[14.5px] font-medium whitespace-nowrap text-[#374151] transition-colors hover:border-[#1E4B8F] hover:text-[#1E4B8F]"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={site.phoneHref}
          className="ml-auto hidden shrink-0 py-4 text-[14.5px] font-semibold whitespace-nowrap text-[#1E4B8F] hover:text-[#16396E] lg:block"
        >
          Call {site.phone}
        </a>
      </div>
    </nav>
  );
}
