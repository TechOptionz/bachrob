import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import TopBar from "@/components/TopBar";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import PageHero from "@/components/PageHero";
import SectionShell, { SectionHeading } from "@/components/service/SectionShell";
import Reveal from "@/components/service/Reveal";
import TeamProfileCard from "@/components/TeamProfileCard";
import { team } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the accountants, auditors, SMSF specialists and support staff behind Bachmann Robinson — experienced, qualified and committed to a client-first approach.",
  alternates: { canonical: "/team" },
  openGraph: {
    title: "The Bachmann Robinson Team",
    description:
      "Experienced, qualified and friendly — the people behind Bachmann Robinson, Ipswich.",
    url: "/team",
    siteName: "Bachmann Robinson",
    locale: "en_AU",
    type: "website",
  },
};

const philosophy = [
  {
    title: "Teamwork",
    desc: "No client belongs to one desk. Complex matters draw on the whole firm — tax, SMSF, audit and bookkeeping expertise working together on your file.",
  },
  {
    title: "Expertise",
    desc: "CPA- and IPA-qualified accountants, an SMSF Specialist Advisor and FASEA-qualified professionals, many with decades in public practice.",
  },
  {
    title: "Professionalism",
    desc: "Registered with the Tax Practitioners Board and licensed with ASIC for super advice, we hold ourselves to the standards our clients rely on.",
  },
  {
    title: "Client service",
    desc: "We answer the phone, we explain things in plain language, and we follow through — the habits that turn first appointments into decades-long relationships.",
  },
];

export default function TeamPage() {
  return (
    <div className="min-w-[320px] bg-cream">
      <TopBar />
      <Nav />

      <main>
        <PageHero
          crumb="Our team"
          eyebrow="Our team"
          heading="The people behind the practice."
          intro="Our team combines deep technical experience with something clients notice from the first phone call — a genuinely client-first approach. Accountants, auditors, SMSF specialists and support staff, all working from one office in the heart of Ipswich."
          media={
            <Image
              src="/assets/group-photo-staff.png"
              alt="The Bachmann Robinson team"
              width={1200}
              height={800}
              priority
              sizes="(max-width: 1024px) 100vw, 520px"
              className="block h-auto w-full shadow-[0_20px_50px_rgba(22,57,110,0.18)]"
            />
          }
          caption="The Bachmann Robinson team — Level 1, 265 Brisbane Street, Ipswich"
        />

        {/* B. Team grid — 3-up desktop, 2-up tablet, single column on mobile.
            Portraits are placeholders: drop the real photos into
            /public/images/team/<first-last>.jpg and swap them in inside
            TeamProfileCard (instructions in that file). */}
        <SectionShell tone="white">
          <SectionHeading
            eyebrow="Leadership & staff"
            heading="Meet the team"
            intro="The knowledge and insights to uncover opportunities — and the commitment to see them through."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={(i % 3) * 60} className="h-full">
                <TeamProfileCard member={m} />
              </Reveal>
            ))}
          </div>
        </SectionShell>

        {/* C. Team philosophy */}
        <SectionShell tone="stone">
          <SectionHeading
            eyebrow="How we work"
            heading="One team behind every client"
            intro="Titles differ, but the way we work does not. Four habits run through everything the team does."
          />
          <div className="mt-12 grid gap-x-14 gap-y-9 sm:grid-cols-2">
            {philosophy.map((item, i) => (
              <Reveal key={item.title} delay={Math.min(i, 3) * 60}>
                <div className="border-l border-[#D8DCE2] pl-6">
                  <span
                    aria-hidden="true"
                    className="mb-4 block h-[3px] w-[26px] bg-[#1E4B8F]"
                  />
                  <h3 className="m-0 mb-[10px] font-serif text-[20px] font-normal leading-[1.35] text-[#1B2430]">
                    {item.title}
                  </h3>
                  <p className="m-0 text-[16px] leading-[1.65] text-[#374151]">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* D. Work-with-us CTA */}
          <Reveal>
            <div className="mt-12 flex flex-wrap items-center gap-5">
              <span className="text-[16px] text-[#374151]">
                Ready to put this team to work?
              </span>
              <Link href="/#contact" className="rule-link">
                Work with our team →
              </Link>
            </div>
          </Reveal>
        </SectionShell>

        <ContactCTA />
      </main>

      <Footer />
    </div>
  );
}
