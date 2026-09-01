import Link from "next/link";
import { site } from "@/lib/data";
import type { ImageSpec } from "@/lib/services";
import Breadcrumbs from "./Breadcrumbs";
import ImagePlaceholder from "./ImagePlaceholder";

/**
 * Editorial hero for a service page. Sits on the pale blue tint so the white
 * dome cut into the bottom of the nav reads the same way it does over the
 * home page hero.
 */
export default function ServiceHero({
  name,
  eyebrow,
  heading,
  tagline,
  intro,
  image,
  highlights,
}: {
  name: string;
  eyebrow: string;
  heading: string;
  tagline: string;
  intro: string;
  image: ImageSpec;
  highlights?: string[];
}) {
  return (
    <header className="gutter bg-[#F5F8FC] pb-16 pt-20 md:pb-20 md:pt-28">
      <div className="shell">
        <div className="br-rise">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: name },
            ]}
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
              className="br-rise m-0 mb-6 max-w-[560px] font-serif text-[20px] leading-[1.5] text-[#1E4B8F] md:text-[22px]"
              style={{ animationDelay: "160ms" }}
            >
              {tagline}
            </p>
            <p
              className="br-rise m-0 mb-9 max-w-[580px] text-[17px] leading-[1.7] text-[#374151] md:text-[17px]"
              style={{ animationDelay: "210ms" }}
            >
              {intro}
            </p>
            <div
              className="br-rise flex flex-wrap gap-4"
              style={{ animationDelay: "260ms" }}
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
          </div>

          <div
            className="br-rise relative sm:pb-6 sm:pr-4"
            style={{ animationDelay: "200ms" }}
          >
            {/* Offset hairline frame behind the photo — lifts it off the tint
                without another heavy shadow. */}
            <span
              aria-hidden="true"
              className="absolute bottom-0 right-0 hidden h-[calc(100%-28px)] w-[calc(100%-28px)] border border-[#C8D6EB] sm:block"
            />
            <div className="relative">
              <ImagePlaceholder {...image} />
              <div className="absolute -bottom-5 left-5 hidden bg-[#16396E] px-5 py-4 shadow-[0_14px_30px_rgba(18,25,42,0.28)] sm:block md:left-7">
                <div className="font-serif text-[24px] leading-none text-white">
                  Since 1990
                </div>
                <div className="mt-[6px] text-[10.5px] uppercase tracking-[1.8px] text-[#9FB8DC]">
                  Serving Ipswich &amp; surrounds
                </div>
              </div>
            </div>
          </div>
        </div>

        {highlights?.length ? (
          <ul
            className="br-rise m-0 mt-14 grid list-none grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-x-10 gap-y-5 border-t border-[#C8D6EB] p-0 pt-7 md:mt-16"
            style={{ animationDelay: "320ms" }}
          >
            {highlights.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-[15.5px] font-medium leading-[1.55] text-[#1B2430]"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="mt-[2px] h-[18px] w-[18px] shrink-0 text-[#1E4B8F]"
                >
                  <path d="M4 10.5l4 4 8-9" strokeLinecap="square" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </header>
  );
}
