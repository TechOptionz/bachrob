import type { Metadata } from "next";
import Link from "next/link";

import TopBar from "@/components/TopBar";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import PageHero from "@/components/PageHero";
import SectionShell, { SectionHeading } from "@/components/service/SectionShell";
import Reveal from "@/components/service/Reveal";
import ImagePlaceholder from "@/components/service/ImagePlaceholder";
import { resources } from "@/lib/data";

export const metadata: Metadata = {
  title: "Insights & Resources",
  description:
    "Practical guides, business insights and trusted ATO tools from Bachmann Robinson — helping Ipswich individuals and businesses stay informed and compliant.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Insights & Resources | Bachmann Robinson",
    description:
      "Practical guides, business insights and trusted ATO tools for individuals, businesses and self-managed super funds.",
    url: "/resources",
    siteName: "Bachmann Robinson",
    locale: "en_AU",
    type: "website",
  },
};

/* ------------------------------------------------------------------------- */
/* Page content                                                              */
/* ------------------------------------------------------------------------- */

const categories = [
  {
    title: "Business insights",
    desc: "Practical thinking on structure, growth and strategy for small and medium businesses.",
    href: "#articles",
    icon: (
      <>
        <path d="M7 37h30" />
        <path d="M11 37V23h6v14M19 37V15h6v22M27 37V9h6v28" />
      </>
    ),
  },
  {
    title: "Financial guidance",
    desc: "Clear explanations of the financial decisions individuals and business owners face.",
    href: "#articles",
    icon: (
      <>
        <circle cx="22" cy="22" r="15" />
        <path d="M22 13v18M27 17.5c-1-1.5-2.8-2.5-5-2.5-3 0-5 1.8-5 4 0 5.5 10 2.5 10 8 0 2.2-2 4-5 4-2.2 0-4-1-5-2.5" />
      </>
    ),
  },
  {
    title: "Tax & compliance",
    desc: "Lodgement obligations, deductions and record-keeping — sourced from the ATO's own tools.",
    href: "#ato-links",
    icon: (
      <>
        <path d="M22 5l14 5v9c0 9-6 15.5-14 20-8-4.5-14-11-14-20v-9l14-5z" />
        <path d="M15.5 22l4.5 4.5 8.5-9" />
      </>
    ),
  },
  {
    title: "Industry updates",
    desc: "What changes in tax and super law mean for you, without the fine-print headache.",
    href: "#articles",
    icon: (
      <>
        <rect x="7" y="9" width="24" height="30" />
        <path d="M31 15h6v24H13" />
        <path d="M12 16h14M12 22h14M12 28h9" />
      </>
    ),
  },
  {
    title: "Guides & downloads",
    desc: "Calculators, checklists and worksheets we point clients to most often.",
    href: "#ato-links",
    icon: (
      <>
        <path d="M22 6v20M14 18l8 8 8-8" />
        <path d="M8 30v8h28v-8" />
      </>
    ),
  },
  {
    title: "Frequently asked questions",
    desc: "Every service page carries answers to the questions we hear most about that work.",
    href: "/services",
    icon: (
      <>
        <path d="M6 8h32v22H20l-8 8v-8H6V8z" />
        <path d="M17.5 17c0-2.5 2-4 4.5-4s4.5 1.5 4.5 3.7c0 3-4.5 3.3-4.5 6" />
        <path d="M22 26.5v.5" />
      </>
    ),
  },
];

/* CLIENT CONTENT REQUIRED: these are sample article stubs demonstrating the
   layout. When real articles are written, give each one a page and swap the
   "Coming soon" spans below for <Link>s to it. */
const articles = [
  {
    category: "Business insights",
    title: "Preparing your business for growth",
    desc: "The structures, systems and conversations worth having before you scale — so growth builds value instead of stress.",
  },
  {
    category: "Financial guidance",
    title: "Understanding business cash flow",
    desc: "Profit and cash are not the same thing. A plain-language look at why healthy businesses still run short, and how to see it coming.",
  },
  {
    category: "Tax & compliance",
    title: "Key tax planning considerations",
    desc: "Timing, deductions and structure choices to review with your accountant well before 30 June — not after.",
  },
  {
    category: "Financial guidance",
    title: "Financial planning for business owners",
    desc: "Your business and your personal finances are deeply linked. How owners can plan for both without doubling the work.",
  },
  {
    category: "Tax & compliance",
    title: "Common compliance mistakes to avoid",
    desc: "The record-keeping, lodgement and superannuation slip-ups we see most often — and the simple habits that prevent them.",
  },
  {
    category: "Business insights",
    title: "Building a stronger business strategy",
    desc: "A practical framework for stepping back from the day-to-day and deciding where your business goes next.",
  },
];

/* ------------------------------------------------------------------------- */

export default function ResourcesPage() {
  return (
    <div className="min-w-[320px] bg-cream">
      <TopBar />
      <Nav />

      <main>
        <PageHero
          crumb="Resources"
          eyebrow="Resources"
          heading="Insights & resources."
          intro="Good decisions start with good information. Here you'll find practical guidance from our team alongside the ATO tools and calculators we share with clients most often — all in one place."
          media={
            <ImagePlaceholder
              label="Resources / insights visual"
              suggestedImage="An editorial photograph suggesting research or advice — a desk with financial documents, or an advisor explaining figures to a client. Approx. 1500×900."
              alt="Reviewing financial guidance with an accountant"
              aspectRatio="5:3"
            />
          }
        />

        {/* B. Featured categories */}
        <SectionShell tone="white">
          <SectionHeading
            eyebrow="Browse by topic"
            heading="What are you looking for?"
          />
          <div className="mt-12 grid grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] gap-px border border-[#E5E4E0] bg-[#E5E4E0]">
            {categories.map((c, i) => (
              <Reveal key={c.title} delay={Math.min(i, 5) * 55} className="h-full">
                <Link
                  href={c.href}
                  className="group flex h-full flex-col bg-white px-7 pb-7 pt-7 text-[#1B2430] transition-colors hover:bg-[#F5F8FC] hover:text-[#1B2430]"
                >
                  <svg
                    viewBox="0 0 44 44"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="mb-5 block h-8 w-8 text-[#1E4B8F]"
                  >
                    {c.icon}
                  </svg>
                  <h3 className="m-0 mb-[10px] font-serif text-[20px] font-normal transition-colors group-hover:text-[#1E4B8F]">
                    {c.title}
                  </h3>
                  <p className="m-0 mb-6 text-[15.5px] leading-[1.6] text-[#374151]">
                    {c.desc}
                  </p>
                  <span className="mt-auto text-[14px] font-semibold text-[#1E4B8F]">
                    View resources{" "}
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

        {/* C. Featured article — image | content split */}
        <SectionShell tone="stone">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] items-center gap-14">
            <Reveal>
              {/* Replace with a 1600×900 (16:9) editorial image for the
                  featured article — e.g. a growing local business. */}
              <ImagePlaceholder
                label="Featured article image"
                suggestedImage="Editorial 16:9 image for the featured article — a local business owner in their premises, or a planning session at a whiteboard. Approx. 1600×900."
                alt="A business owner planning for growth"
                aspectRatio="16:9"
              />
            </Reveal>
            <Reveal delay={80}>
              <div className="eyebrow mb-[14px] text-[#1E4B8F]">
                Featured · Business insights
              </div>
              <h2 className="m-0 mb-5 font-serif text-[30px] font-normal leading-[1.2] text-pretty md:text-[38px]">
                Preparing your business for growth
              </h2>
              <p className="m-0 mb-4 max-w-[560px] text-[17px] leading-[1.7] text-[#374151]">
                Growth changes everything — your structure, your cash flow, your
                tax position and the systems you rely on. The businesses that
                scale well are the ones that prepare before the growth arrives,
                not after.
              </p>
              <p className="m-0 mb-8 max-w-[560px] text-[17px] leading-[1.7] text-[#374151]">
                In this guide we walk through the questions worth answering with
                your accountant first: is your structure still right, can your
                cash flow fund the step up, and what will the ATO expect of the
                bigger version of your business?
              </p>
              {/* CLIENT CONTENT REQUIRED: swap for
                  <Link href="/resources/preparing-your-business-for-growth" …>
                  once the article page exists. */}
              <span className="inline-block cursor-default border border-[#D8DCE2] bg-white px-7 py-[14px] text-[16px] font-semibold text-[#6B7280]">
                Full article coming soon
              </span>
            </Reveal>
          </div>
        </SectionShell>

        {/* D. Resource grid */}
        <SectionShell tone="cream" id="articles">
          <SectionHeading
            eyebrow="Latest insights"
            heading="Guides & articles"
            intro="Written for clients, not colleagues — practical reading on the questions that come up across the desk most often."
          />
          <div className="mt-12 grid grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] gap-5">
            {articles.map((a, i) => (
              <Reveal key={a.title} delay={(i % 3) * 60} className="h-full">
                <article className="flex h-full flex-col border border-[#E5E4E0] bg-white px-7 pb-7 pt-7">
                  <div className="eyebrow mb-4 text-[11px] tracking-[2.4px] text-[#1E4B8F]">
                    {a.category}
                  </div>
                  <h3 className="m-0 mb-[10px] font-serif text-[20px] font-normal leading-[1.35] text-[#1B2430]">
                    {a.title}
                  </h3>
                  <p className="m-0 mb-6 text-[15.5px] leading-[1.6] text-[#374151]">
                    {a.desc}
                  </p>
                  {/* CLIENT CONTENT REQUIRED: replace with
                      <Link href={`/resources/${slug}`}>Read more →</Link>
                      when the article is published. */}
                  <span className="mt-auto text-[14px] font-semibold text-[#8A94A6]">
                    Coming soon
                  </span>
                </article>
              </Reveal>
            ))}
          </div>
        </SectionShell>

        {/* E. ATO quick links — the trusted external tools, same treatment as
            the homepage resources band. */}
        <SectionShell tone="navy" id="ato-links">
          <SectionHeading
            eyebrow="Trusted tools"
            heading="Tools & guides from the ATO"
            intro="Quick links we share with clients most often. For anything specific to your situation, give us a call — that's what we're here for."
            tone="navy"
          />
          <div className="mt-10 grid grid-cols-[repeat(auto-fill,minmax(min(250px,100%),1fr))] gap-[14px]">
            {resources.map((r, i) => (
              <Reveal key={r.name} delay={Math.min(i, 5) * 45} className="h-full">
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full border border-white/25 px-5 py-[18px] text-white transition-colors hover:border-white hover:bg-white/[0.06] hover:text-white"
                >
                  <div className="mb-[6px] text-[15.5px] font-bold">
                    {r.name} ↗
                  </div>
                  <div className="text-[14.5px] leading-[1.5] text-[#D5E0F0]">
                    {r.desc}
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </SectionShell>

        {/* F. Closing CTA — "advice specific to your business" */}
        <ContactCTA />
      </main>

      <Footer />
    </div>
  );
}
