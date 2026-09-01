import type { Metadata } from "next";
import Link from "next/link";

import TopBar from "@/components/TopBar";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/service/Reveal";
import ImagePlaceholder from "@/components/service/ImagePlaceholder";
import ServicesIndexNav from "@/components/ServicesIndexNav";

import { services, site } from "@/lib/data";
import { serviceDetails } from "@/lib/services";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Accounting, audit, taxation and advisory services under one roof — income tax returns, business advice, SMSF administration, financial statements, BAS, bookkeeping and more, from Bachmann Robinson in Ipswich.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Our Services | Bachmann Robinson",
    description:
      "From simple individual returns to complex business structures and self-managed super funds — nine services, one Ipswich firm.",
    url: "/services",
    siteName: "Bachmann Robinson",
    locale: "en_AU",
    type: "website",
  },
};

const pad = (i: number) => String(i + 1).padStart(2, "0");

export default function ServicesPage() {
  return (
    <div className="min-w-[320px] bg-cream">
      <TopBar />
      <Nav />

      <main>
        <PageHero
          crumb="Services"
          eyebrow="Our services"
          heading="Everything your finances need, under one roof."
          intro="From simple individual returns to complex business structures, rental properties, defence personnel and self-managed super funds — nine services, one experienced Ipswich team, and no stone left unturned."
          media={
            <ImagePlaceholder
              label="Services overview image"
              suggestedImage="An advisor and client working through documents together at the Ipswich office — warm, professional, approachable. Approx. 1200×900."
              alt="A Bachmann Robinson accountant working through documents with a client"
              aspectRatio="4:3"
            />
          }
        />

        {/* Sticky index on the left, one editorial block per service on the
            right. Each block reuses the service's own tagline, highlights and
            hero ImageSpec, so this page and the detail page always describe
            the service identically — and the same photo asset serves both. */}
        <section className="section bg-white">
          <div className="shell">
            <div className="grid gap-12 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-16">
              <aside className="hidden lg:block">
                <div className="sticky top-28">
                  <div className="eyebrow mb-5 text-[#1E4B8F]">
                    On this page
                  </div>
                  <ServicesIndexNav
                    items={services.map((s) => ({
                      slug: s.slug,
                      name: s.name,
                    }))}
                  />
                  <div className="mt-8 border-t border-[#E5E4E0] pt-6 text-[14px] leading-[1.6] text-[#6B7280]">
                    Not sure which you need?
                    <br />
                    <a
                      href={site.phoneHref}
                      className="font-semibold text-[#1E4B8F]"
                    >
                      Call {site.phone}
                    </a>
                  </div>
                </div>
              </aside>

              <div>
                {services.map((s, i) => {
                  const detail = serviceDetails[s.slug];
                  const reversed = i % 2 === 1;

                  return (
                    <article
                      key={s.slug}
                      id={s.slug}
                      className={`scroll-mt-28 ${
                        i === 0
                          ? ""
                          : "mt-14 border-t border-[#E5E4E0] pt-14 md:mt-16 md:pt-16"
                      }`}
                    >
                      <div
                        className={`grid items-center gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-14 ${
                          reversed ? "lg:[direction:rtl]" : ""
                        }`}
                      >
                        {/* [direction:rtl] flips the column order on
                            alternating rows; ltr below restores the text. */}
                        <Reveal className="lg:[direction:ltr]">
                          <div className="mb-4 flex items-baseline gap-4">
                            <span className="font-serif text-[15px] tracking-[1px] text-[#7593C1]">
                              {pad(i)}
                            </span>
                            <span
                              aria-hidden="true"
                              className="block h-[3px] w-[34px] self-center bg-[#1E4B8F]"
                            />
                          </div>
                          <h2 className="m-0 mb-3 font-serif text-[28px] font-normal leading-[1.2] text-pretty text-[#1B2430] md:text-[36px]">
                            {s.name}
                          </h2>
                          <p className="m-0 mb-4 max-w-[540px] font-serif text-[18.5px] leading-[1.5] text-[#1E4B8F]">
                            {detail.hero.tagline}
                          </p>
                          <p className="m-0 mb-6 max-w-[540px] text-[16.5px] leading-[1.7] text-[#374151]">
                            {s.desc}
                          </p>

                          {detail.hero.highlights?.length ? (
                            <ul className="m-0 mb-7 grid list-none gap-[10px] p-0">
                              {detail.hero.highlights.map((h) => (
                                <li
                                  key={h}
                                  className="flex items-baseline gap-3 text-[15.5px] leading-[1.6] text-[#374151]"
                                >
                                  <span
                                    aria-hidden="true"
                                    className="mt-[7px] block h-[6px] w-[6px] shrink-0 self-start bg-[#1E4B8F]"
                                  />
                                  {h}
                                </li>
                              ))}
                            </ul>
                          ) : null}

                          <Link
                            href={`/services/${s.slug}`}
                            className="rule-link"
                          >
                            Explore this service →
                          </Link>
                        </Reveal>

                        <Reveal delay={90} className="lg:[direction:ltr]">
                          {/* Same ImageSpec as the service's detail-page hero —
                              one sourced photo covers both pages. */}
                          <ImagePlaceholder {...detail.hero.image} />
                        </Reveal>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <ContactCTA />
      </main>

      <Footer />
    </div>
  );
}
