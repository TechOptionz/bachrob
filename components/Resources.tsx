import Link from "next/link";
import Reveal from "./service/Reveal";
import ResourceCard from "./ResourceCard";
import { resources } from "@/lib/data";

export default function Resources() {
  return (
    <section id="resources" className="section scroll-mt-24 bg-[#F1F3F0]">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end lg:gap-16">
          <Reveal variant="left">
            <div className="eyebrow mb-[14px] text-[#1E4B8F]">
              Helpful resources
            </div>
            <h2 className="m-0 font-serif text-[30px] font-normal leading-[1.2] text-pretty md:text-[38px]">
              Tools &amp; guides from the ATO
            </h2>
          </Reveal>
          <Reveal variant="right" delay={90}>
            <p className="m-0 max-w-[480px] text-[17px] leading-[1.7] text-[#374151] lg:pb-2">
              Quick links we share with clients most often. For anything
              specific to your situation, give us a call — that&rsquo;s what
              we&rsquo;re here for.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-[repeat(auto-fill,minmax(min(250px,100%),1fr))] gap-4 md:mt-14">
          {resources.map((r, i) => (
            <Reveal key={r.name} delay={(i % 4) * 70} variant="rise" className="h-full">
              <ResourceCard resource={r} />
            </Reveal>
          ))}
        </div>

        <Reveal variant="fade" className="mt-10">
          <Link href="/resources" className="rule-link">
            Browse all insights &amp; resources →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
