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

        <div className="mt-8 grid items-center gap-10 md:mt-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <div
              className="br-rise eyebrow mb-5 text-[#1E4B8F]"
              style={{ animationDelay: "60ms" }}
            >
              {eyebrow}
            </div>
            <h1
              className="br-rise m-0 mb-5 font-serif text-[32px] font-normal leading-[1.14] text-pretty text-[#1B2430] sm:text-[40px] md:text-[46px]"
              style={{ animationDelay: "110ms" }}
            >
              {heading}
            </h1>
            <p
              className="br-rise m-0 mb-6 max-w-[560px] font-serif text-[19px] leading-[1.5] text-[#1E4B8F] md:text-[21px]"
              style={{ animationDelay: "160ms" }}
            >
              {tagline}
            </p>
            <p
              className="br-rise m-0 mb-9 max-w-[580px] text-[16.5px] leading-[1.7] text-[#374151] md:text-[17px]"
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

          <div className="br-rise" style={{ animationDelay: "200ms" }}>
            <ImagePlaceholder {...image} />
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
                className="text-[15px] leading-[1.55] text-[#374151]"
              >
                <span
                  aria-hidden="true"
                  className="mb-[10px] block h-[3px] w-[26px] bg-[#1E4B8F]"
                />
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </header>
  );
}
