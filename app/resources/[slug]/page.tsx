import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import TopBar from "@/components/TopBar";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import Breadcrumbs from "@/components/service/Breadcrumbs";
import SectionShell, { SectionHeading } from "@/components/service/SectionShell";
import Reveal from "@/components/service/Reveal";
import ImagePlaceholder from "@/components/service/ImagePlaceholder";
import KeyobCard from "@/components/partner/KeyobCard";
import { articles, articleSlugs, getArticle } from "@/lib/articles";

const SITE_URL = "https://bachrob.com.au";

/** Every article is known at build time, so every page is statically rendered. */
export function generateStaticParams() {
  return articleSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) return { title: "Article not found" };

  const url = `/resources/${article.slug}`;

  return {
    title: article.title,
    description: article.desc,
    alternates: { canonical: url },
    openGraph: {
      title: `${article.title} | Bachmann Robinson`,
      description: article.desc,
      url,
      siteName: "Bachmann Robinson",
      locale: "en_AU",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | Bachmann Robinson`,
      description: article.desc,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) notFound();

  const pageUrl = `${SITE_URL}/resources/${article.slug}`;
  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Resources",
            item: `${SITE_URL}/resources`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "Article",
        headline: article.title,
        description: article.desc,
        url: pageUrl,
        articleSection: article.category,
        author: {
          "@type": "Organization",
          name: "Bachmann Robinson",
          url: SITE_URL,
        },
        publisher: {
          "@type": "AccountingService",
          name: "Bachmann Robinson",
          url: SITE_URL,
        },
      },
    ],
  };

  return (
    <div className="min-w-[320px] bg-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <TopBar />
      <Nav />

      <main>
        {/* A. Article header — three-level breadcrumb, category meta, serif
            headline and standfirst on the pale hero tint. */}
        <header className="gutter bg-[#F5F8FC] pb-14 pt-20 md:pb-16 md:pt-28">
          <div className="shell">
            <div className="br-rise">
              <Breadcrumbs
                items={[
                  { label: "Home", href: "/" },
                  { label: "Resources", href: "/resources" },
                  { label: article.title },
                ]}
              />
            </div>

            <div className="mt-8 max-w-[780px] md:mt-10">
              <div
                className="br-rise eyebrow mb-5 text-[#1E4B8F]"
                style={{ animationDelay: "60ms" }}
              >
                {article.category} &middot; {article.readTime}
              </div>
              <h1
                className="br-rise m-0 mb-5 font-serif text-[34px] font-normal leading-[1.12] text-pretty text-[#1B2430] sm:text-[42px] md:text-[50px]"
                style={{ animationDelay: "110ms" }}
              >
                {article.title}
              </h1>
              <p
                className="br-rise m-0 max-w-[680px] text-[17.5px] leading-[1.7] text-[#374151] md:text-[19px]"
                style={{ animationDelay: "160ms" }}
              >
                {article.standfirst}
              </p>
            </div>
          </div>
        </header>

        {/* B. Hero image + article body */}
        <SectionShell tone="white">
          <Reveal>
            <ImagePlaceholder {...article.image} />
          </Reveal>

          <div className="mx-auto mt-14 max-w-[760px] md:mt-16">
            {/* "The short version" — takeaways up front, for the reader who
                only has a minute. */}
            <Reveal>
              <aside className="border border-[#D8E2F0] bg-[#F5F8FC] px-7 py-7 md:px-9 md:py-8">
                <div className="eyebrow mb-4 text-[11px] tracking-[2.4px] text-[#1E4B8F]">
                  The short version
                </div>
                <ul className="m-0 flex list-none flex-col gap-3 p-0">
                  {article.takeaways.map((t) => (
                    <li
                      key={t}
                      className="flex gap-3 text-[16px] leading-[1.65] text-[#1B2430]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[11px] h-[5px] w-[5px] shrink-0 bg-[#1E4B8F]"
                      />
                      {t}
                    </li>
                  ))}
                </ul>
              </aside>
            </Reveal>

            {article.sections.map((section, i) => (
              <Reveal key={section.heading} delay={Math.min(i, 2) * 50}>
                <section className="mt-12 md:mt-14">
                  <h2 className="m-0 mb-5 font-serif text-[26px] font-normal leading-[1.25] text-pretty text-[#1B2430] md:text-[30px]">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((p) => (
                    <p
                      key={p.slice(0, 40)}
                      className="m-0 mb-5 text-[17px] leading-[1.75] text-[#374151]"
                    >
                      {p}
                    </p>
                  ))}
                  {section.list ? (
                    <ul className="m-0 mt-2 flex list-none flex-col gap-4 p-0">
                      {section.list.map((item) => (
                        <li
                          key={item.title}
                          className="border-l-2 border-[#C8D6EB] pl-5"
                        >
                          <div className="mb-1 text-[16.5px] font-semibold text-[#1B2430]">
                            {item.title}
                          </div>
                          <p className="m-0 text-[16.5px] leading-[1.7] text-[#374151]">
                            {item.text}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              </Reveal>
            ))}

            <Reveal>
              <p className="m-0 mt-12 border-t border-[#E5E4E0] pt-8 text-[17px] leading-[1.75] text-[#374151] md:mt-14">
                {article.closing}
              </p>

              {/* General-advice disclaimer — every article carries it. */}
              <p className="m-0 mt-8 text-[14px] leading-[1.65] text-[#6B7280]">
                This article is general information only and does not take your
                personal circumstances into account. It is not tax, financial or
                legal advice. Before acting on anything here, please speak with
                us or another qualified adviser about your situation.
              </p>
            </Reveal>

            {/* KEYOB partner promo — the end-of-article placement. */}
            <KeyobCard className="mt-12 md:mt-14" />
          </div>
        </SectionShell>

        {/* C. Related reading */}
        <SectionShell tone="cream">
          <SectionHeading eyebrow="Keep reading" heading="More guides & articles" />
          <div className="mt-10 grid grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] gap-5">
            {related.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 3) * 60} className="h-full">
                <Link
                  href={`/resources/${a.slug}`}
                  className="group flex h-full flex-col border border-[#E5E4E0] bg-white px-7 pb-7 pt-7 text-[#1B2430] transition-colors hover:bg-[#F5F8FC] hover:text-[#1B2430]"
                >
                  <div className="eyebrow mb-4 text-[11px] tracking-[2.4px] text-[#1E4B8F]">
                    {a.category}
                  </div>
                  <h3 className="m-0 mb-[10px] font-serif text-[20px] font-normal leading-[1.35] transition-colors group-hover:text-[#1E4B8F]">
                    {a.title}
                  </h3>
                  <p className="m-0 mb-6 text-[15.5px] leading-[1.6] text-[#374151]">
                    {a.desc}
                  </p>
                  <span className="mt-auto text-[14px] font-semibold text-[#1E4B8F]">
                    Read article{" "}
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </SectionShell>

        {/* D. Closing CTA */}
        <ContactCTA />
      </main>

      <Footer />
    </div>
  );
}
