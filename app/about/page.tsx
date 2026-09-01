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

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Bachmann Robinson is a local Ipswich accounting firm operating since the early 1990s — accountants, auditors and registered tax agents dedicated to lasting client relationships.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Bachmann Robinson",
    description:
      "A local Ipswich accounting firm where people come first — serving individuals, businesses and self-managed super funds since 1990.",
    url: "/about",
    siteName: "Bachmann Robinson",
    locale: "en_AU",
    type: "website",
  },
};

/* ------------------------------------------------------------------------- */
/* Page content — kept up here so copy changes never mean touching JSX.      */
/* ------------------------------------------------------------------------- */

const approach = [
  {
    title: "Client-focused",
    desc: "Every engagement starts with your situation, not a template. We take the time to understand where you are and what a good outcome looks like for you.",
    // Two people / handshake motif
    icon: (
      <>
        <circle cx="15" cy="14" r="5" />
        <circle cx="29" cy="14" r="5" />
        <path d="M6 34c0-5.5 4-9 9-9s9 3.5 9 9M20 34c0-5.5 4-9 9-9s9 3.5 9 9" />
      </>
    ),
  },
  {
    title: "Practical solutions",
    desc: "Advice you can act on. We translate tax law and accounting standards into clear next steps, in plain language, without the jargon.",
    // Checklist motif
    icon: (
      <>
        <rect x="8" y="6" width="28" height="32" />
        <path d="M14 16l3 3 5-6M26 17h6M14 27l3 3 5-6M26 28h6" />
      </>
    ),
  },
  {
    title: "Professional expertise",
    desc: "Qualified accountants, auditors, registered tax agents and SMSF specialists — with the depth to handle complex structures and the discipline to get details right.",
    // Ribbon / credential motif
    icon: (
      <>
        <circle cx="22" cy="16" r="9" />
        <path d="M17 23l-4 15 9-6 9 6-4-15" />
      </>
    ),
  },
  {
    title: "Long-term relationships",
    desc: "Many of our clients have been with us for decades. We aim to be the firm you call first — this year, next year and as your circumstances grow.",
    // Growth line motif
    icon: (
      <>
        <path d="M7 36h30" />
        <path d="M9 30l8-8 6 5 11-13" />
        <path d="M27 14h7v7" />
      </>
    ),
  },
];

const whyChooseUs = [
  {
    title: "Local since 1990",
    desc: "We have served Ipswich and its surrounds for more than three decades. We know the local business community because we are part of it.",
  },
  {
    title: "Breadth under one roof",
    desc: "Tax returns, business advice, financial statements, BAS, bookkeeping, non-profit audits and a dedicated SMSF department — you rarely need to be referred elsewhere.",
  },
  {
    title: "Qualified, experienced people",
    desc: "Our team includes CPA- and IPA-qualified accountants, an SMSF Specialist Advisor and FASEA-qualified professionals, several with 20+ years in practice.",
  },
  {
    title: "No stone unturned",
    desc: "We are thorough by habit. Our staff are focused on getting the best possible outcome for every client, on every engagement, every year.",
  },
];

/* ------------------------------------------------------------------------- */

export default function AboutPage() {
  return (
    <div className="min-w-[320px] bg-cream">
      <TopBar />
      <Nav />

      <main>
        <PageHero
          crumb="About us"
          eyebrow="About us"
          heading="An accounting firm where people come first."
          intro="Bachmann Robinson is a local Ipswich firm operating since the early 1990s. We combine the technical depth of accountants, auditors and registered tax agents with something rarer — a genuine commitment to the people behind the numbers."
          media={
            <ImagePlaceholder
              label="Professional company / office image"
              suggestedImage="A warm, professional photograph of the Bachmann Robinson office or team at work — natural light, approachable rather than corporate-stocky. Approx. 1200×900."
              alt="The Bachmann Robinson office in Ipswich"
              aspectRatio="4:3"
            />
          }
        />

        {/* B. Who we are — text | image split */}
        <SectionShell tone="white">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] items-center gap-14">
            <Reveal>
              <div className="eyebrow mb-[14px] text-[#1E4B8F]">Who we are</div>
              <h2 className="m-0 mb-5 font-serif text-[26px] font-normal leading-[1.25] text-pretty md:text-[34px]">
                Three decades of looking after Ipswich
              </h2>
              <p className="m-0 mb-[18px] max-w-[560px] text-[16.5px] leading-[1.7] text-[#374151]">
                The practice was acquired by Russell Bachmann in 1990 and
                rebadged Bachmann Robinson in 1997. Today, under owner and
                director Nayyar Hayat, the whole Ipswich team remains dedicated
                to the same idea the firm was built on: optimum service and
                healthy, lasting relationships with our clients.
              </p>
              <p className="m-0 mb-[18px] max-w-[560px] text-[16.5px] leading-[1.7] text-[#374151]">
                We handle the full breadth of accounting and taxation work —
                from simple individual returns to business structures, rental
                properties and defence personnel. As a licensed ASIC
                representative for super advice, we also run a dedicated
                department for the administration of Self-Managed Super Funds.
              </p>
              <p className="m-0 mb-7 max-w-[560px] text-[16.5px] leading-[1.7] text-[#374151]">
                Whatever the engagement, our experienced and friendly staff are
                focused on one thing: getting the best possible outcome for our
                clients by leaving no stone unturned.
              </p>
              <Link href="/team" className="rule-link">
                Meet the team →
              </Link>
            </Reveal>

            <Reveal delay={80}>
              {/* Replace with a 1200×800 (3:2) photo of the reception /
                  client meeting area at Level 1, 265 Brisbane Street. */}
              <ImagePlaceholder
                label="Office / client meeting image"
                suggestedImage="Reception or meeting area at Level 1, 265 Brisbane Street — or an advisor with a client across the desk. Approx. 1200×800."
                alt="Meeting with a Bachmann Robinson accountant in the Ipswich office"
                aspectRatio="3:2"
              />
            </Reveal>
          </div>
        </SectionShell>

        {/* C. Our approach — four cards on the hairline grid */}
        <SectionShell tone="stone">
          <SectionHeading
            eyebrow="Our approach"
            heading="How we work with you"
            intro="Four principles shape every engagement we take on, whether it's a straightforward tax return or a complex business restructure."
            tone="stone"
          />
          <div className="mt-12 grid grid-cols-[repeat(auto-fill,minmax(min(250px,100%),1fr))] gap-px border border-[#E5E4E0] bg-[#E5E4E0]">
            {approach.map((item, i) => (
              <Reveal key={item.title} delay={Math.min(i, 3) * 60} className="h-full">
                <div className="h-full bg-white px-7 pb-8 pt-7">
                  <svg
                    viewBox="0 0 44 44"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="mb-5 block h-8 w-8 text-[#1E4B8F]"
                  >
                    {item.icon}
                  </svg>
                  <h3 className="m-0 mb-[10px] font-serif text-[19px] font-normal leading-[1.35] text-[#1B2430]">
                    {item.title}
                  </h3>
                  <p className="m-0 text-[15px] leading-[1.6] text-[#4B5563]">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </SectionShell>

        {/* D. Mission / vision — paired cards on navy */}
        <SectionShell tone="navy">
          <SectionHeading
            eyebrow="What drives us"
            heading="Our mission and our vision"
            tone="navy"
            align="center"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <Reveal className="h-full">
              <div className="h-full border border-white/25 px-8 pb-9 pt-8">
                <span
                  aria-hidden="true"
                  className="mb-5 block h-[3px] w-[34px] bg-[#9FB8DC]"
                />
                <h3 className="m-0 mb-3 font-serif text-[22px] font-normal text-white">
                  Our mission
                </h3>
                <p className="m-0 text-[15.5px] leading-[1.7] text-[#C8D6EB]">
                  To provide optimum customer service and thorough, practical
                  accounting and taxation advice — building healthy, lasting
                  relationships that help our clients keep more of what they
                  earn and make confident financial decisions.
                </p>
              </div>
            </Reveal>
            <Reveal delay={80} className="h-full">
              <div className="h-full border border-white/25 px-8 pb-9 pt-8">
                <span
                  aria-hidden="true"
                  className="mb-5 block h-[3px] w-[34px] bg-[#9FB8DC]"
                />
                <h3 className="m-0 mb-3 font-serif text-[22px] font-normal text-white">
                  Our vision
                </h3>
                <p className="m-0 text-[15.5px] leading-[1.7] text-[#C8D6EB]">
                  To remain the firm Ipswich individuals, businesses and
                  self-managed super funds call first — trusted across
                  generations for creativity, personality and commitment in
                  everything we do.
                </p>
              </div>
            </Reveal>
          </div>
        </SectionShell>

        {/* E. Why choose us — accent-bar benefit grid */}
        <SectionShell tone="cream">
          <SectionHeading
            eyebrow="Why choose us"
            heading="What sets Bachmann Robinson apart"
          />
          <div className="mt-12 grid gap-x-14 gap-y-9 sm:grid-cols-2">
            {whyChooseUs.map((item, i) => (
              <Reveal key={item.title} delay={Math.min(i, 3) * 60}>
                <div className="border-l border-[#D8DCE2] pl-6">
                  <span
                    aria-hidden="true"
                    className="mb-4 block h-[3px] w-[26px] bg-[#1E4B8F]"
                  />
                  <h3 className="m-0 mb-[10px] font-serif text-[19px] font-normal leading-[1.35] text-[#1B2430]">
                    {item.title}
                  </h3>
                  <p className="m-0 text-[15.5px] leading-[1.65] text-[#4B5563]">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-12 flex flex-wrap items-center gap-5">
              <span className="text-[16px] text-[#4B5563]">
                See what we can do for you.
              </span>
              <Link href="/services" className="rule-link">
                Explore our services →
              </Link>
            </div>
          </Reveal>
        </SectionShell>

        {/* F. Closing CTA */}
        <ContactCTA />
      </main>

      <Footer />
    </div>
  );
}
