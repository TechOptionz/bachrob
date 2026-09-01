import Link from "next/link";
import { site } from "@/lib/data";
import Breadcrumbs from "./service/Breadcrumbs";

/**
 * Editorial hero for the top-level pages (/about, /team, /resources). Same
 * bones as ServiceHero — pale blue tint under the nav's white dome, staggered
 * br-rise entrance, text | media split — but takes arbitrary media so a page
 * can show a real photograph or an ImagePlaceholder.
 */
export default function PageHero({
  crumb,
  eyebrow,
  heading,
  intro,
  media,
  caption,
  cta = true,
}: {
  /** Current page label for the breadcrumb trail. */
  crumb: string;
  eyebrow: string;
  heading: string;
  intro: string;
  /** Right-hand column: an ImagePlaceholder or a real next/image. */
  media: React.ReactNode;
  /** Small line under the media, e.g. a photo caption. */
  caption?: string;
  /** Standard button pair; switch off where the page has its own CTA. */
  cta?: boolean;
}) {
  return (
    <header className="gutter bg-[#F5F8FC] pb-16 pt-20 md:pb-20 md:pt-28">
      <div className="shell">
        <div className="br-rise">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: crumb }]}
          />
        </div>

        <div className="mt-8 grid items-center gap-10 md:mt-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <div>
            <div
              className="br-rise eyebrow mb-5 text-[#1E4B8F]"
              style={{ animationDelay: "60ms" }}
            >
              {eyebrow}
            </div>
            <h1
              className="br-rise m-0 mb-5 font-serif text-[36px] font-normal leading-[1.1] text-pretty text-[#1B2430] sm:text-[46px] md:text-[54px]"
              style={{ animationDelay: "110ms" }}
            >
              {heading}
            </h1>
            <p
              className="br-rise m-0 max-w-[580px] text-[17px] leading-[1.7] text-[#374151] md:text-[17px]"
              style={{ animationDelay: "160ms" }}
            >
              {intro}
            </p>
            {cta ? (
              <div
                className="br-rise mt-9 flex flex-wrap gap-4"
                style={{ animationDelay: "230ms" }}
              >
                <Link
                  href="/#contact"
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
            ) : null}
          </div>

          <div className="br-rise" style={{ animationDelay: "200ms" }}>
            {media}
            {caption ? (
              <div className="mt-3 text-[14px] text-[#4B5563]">{caption}</div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
