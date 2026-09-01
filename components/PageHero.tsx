import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/data";
import Breadcrumbs from "./service/Breadcrumbs";

/**
 * Editorial hero for the top-level pages (/about, /team, /resources). Same
 * bones as ServiceHero — pale blue tint under the nav's white dome, staggered
 * br-rise entrance, text | media split — but takes arbitrary media so a page
 * can show a real photograph or an ImagePlaceholder.
 *
 * Pass `backgroundSrc` instead of `media` for the full-bleed variant: the
 * photograph runs the whole width behind the copy, scrimmed like the home
 * page hero so the type stays readable over it.
 */
export default function PageHero({
  crumb,
  eyebrow,
  heading,
  intro,
  media,
  caption,
  cta = true,
  backgroundSrc,
  backgroundPosition = "center 35%",
}: {
  /** Current page label for the breadcrumb trail. */
  crumb: string;
  eyebrow: string;
  heading: string;
  intro: string;
  /** Right-hand column: an ImagePlaceholder or a real next/image. Omit when
   *  using `backgroundSrc`. */
  media?: React.ReactNode;
  /** Small line under the media (or under the copy in the full-bleed variant). */
  caption?: string;
  /** Standard button pair; switch off where the page has its own CTA. */
  cta?: boolean;
  /** Photograph to run full-bleed behind the copy instead of beside it. */
  backgroundSrc?: string;
  /** object-position for that photograph — keep faces out of the crop. */
  backgroundPosition?: string;
}) {
  const crumbs = [{ label: "Home", href: "/" }, { label: crumb }];

  /* Full-bleed variant — photo behind the whole block. The faces sit in the
     upper half of the frame, so the copy is pinned to the BOTTOM of the band
     (over the boardroom table) in a two-column row that stays short enough
     never to climb up into them. Below lg the overlay is dropped entirely:
     copy on plain navy, photo as its own uncovered strip. */
  if (backgroundSrc) {
    return (
      <header className="relative overflow-hidden bg-[#16396E] text-white">
        {/* lg+ only: object-cover on the untouched frame — fills the band
            edge to edge, cropped, never letterboxed. */}
        <div aria-hidden className="absolute inset-0 hidden lg:block">
          <Image
            src={backgroundSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: backgroundPosition }}
          />
          {/* Three scrims: a light even wash (faces stay clearly visible), a
              heavy bottom-up fall under the copy row, and a thin top fall so
              the breadcrumbs read against the ceiling. */}
          <div className="absolute inset-0 bg-[rgba(8,12,20,0.26)]" />
          <div className="absolute inset-x-0 bottom-0 h-[62%] bg-[linear-gradient(to_top,rgba(8,12,20,0.92)_0%,rgba(8,12,20,0.66)_40%,rgba(8,12,20,0)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-[140px] bg-[linear-gradient(to_bottom,rgba(8,12,20,0.5)_0%,rgba(8,12,20,0)_100%)]" />
        </div>

        <div className="gutter relative">
          <div className="shell flex flex-col pb-14 pt-24 md:pt-28 lg:min-h-[760px] lg:pb-16 lg:pt-32">
            <div className="br-rise">
              <Breadcrumbs items={crumbs} tone="dark" />
            </div>

            {/* Below lg the group shot gets its own strip — nothing over it. */}
            <div
              className="br-rise relative mt-8 aspect-[1928/816] overflow-hidden lg:hidden"
              style={{ animationDelay: "60ms" }}
            >
              <Image
                src={backgroundSrc}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
            {caption ? (
              <div
                className="br-rise mt-3 text-[13px] text-white/65 lg:hidden"
                style={{ animationDelay: "80ms" }}
              >
                {caption}
              </div>
            ) : null}

            {/* mt-auto drops the copy to the bottom of the band; the split
                keeps the row shallow so it stays on the tabletop. */}
            <div className="mt-10 lg:mt-auto lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end lg:gap-x-16">
              <div>
                <div
                  className="br-rise eyebrow mb-4 text-[#9FB8DC]"
                  style={{ animationDelay: "60ms" }}
                >
                  {eyebrow}
                </div>
                <h1
                  className="br-rise m-0 font-serif text-[36px] font-normal leading-[1.1] text-pretty sm:text-[44px] lg:text-[48px] xl:text-[54px]"
                  style={{ animationDelay: "110ms" }}
                >
                  {heading}
                </h1>
              </div>
              <div className="mt-5 lg:mt-0">
                <p
                  className="br-rise m-0 max-w-[600px] text-[16px] leading-[1.65] text-[#D5E0F0] lg:text-[17px]"
                  style={{ animationDelay: "160ms" }}
                >
                  {intro}
                </p>
                {cta ? (
                  <div
                    className="br-rise mt-6 flex flex-wrap gap-4"
                    style={{ animationDelay: "230ms" }}
                  >
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
                ) : null}
              </div>
            </div>

            {caption ? (
              <div
                className="br-rise mt-8 hidden border-t border-white/15 pt-4 text-[13px] text-white/65 lg:block"
                style={{ animationDelay: "280ms" }}
              >
                {caption}
              </div>
            ) : null}
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="gutter bg-[#F5F8FC] pb-16 pt-20 md:pb-20 md:pt-28">
      <div className="shell">
        <div className="br-rise">
          <Breadcrumbs items={crumbs} />
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
