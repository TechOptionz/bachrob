import Image from "next/image";
import Link from "next/link";
import CountUp from "./motion/CountUp";
import Parallax from "./motion/Parallax";
import Reveal from "./service/Reveal";
import { services, team } from "@/lib/data";

/** Figures drawn from the site's own data, so they cannot drift out of date. */
const figures = [
  {
    value: <CountUp to={team.length} />,
    label: "People in the Ipswich office",
  },
  {
    value: <CountUp to={services.length} />,
    label: "Service lines under one roof",
  },
  {
    // Static: a year counting up reads as a stock ticker, not a milestone.
    value: "1975",
    label: "Public practice experience in the room dates back this far",
  },
];

export default function About() {
  return (
    <section id="about" className="section scroll-mt-24 bg-[#F1F3F0]">
      <div className="shell grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] items-center gap-14 lg:grid-cols-[1fr_1.25fr]">
        <div>
          <Reveal variant="left">
            <div className="eyebrow mb-[14px] text-[#1E4B8F]">
              About the firm
            </div>
            <h2 className="m-0 mb-5 font-serif text-[30px] font-normal text-pretty md:text-[40px]">
              Creativity. Personality. Commitment.
            </h2>
            <p className="m-0 mb-[18px] text-[17px] leading-[1.7] text-[#374151]">
              We are a local Ipswich firm operating since the early
              1990&rsquo;s. Owner and director Nayyar Hayat, along with the
              whole Ipswich team, is dedicated to providing optimum customer
              service and building healthy, lasting relationships with our
              clients.
            </p>
            <p className="m-0 mb-[18px] text-[17px] leading-[1.7] text-[#374151]">
              We have vast experience with tax returns from simple basic returns
              to more complicated ones — business returns, rental properties and
              defence personnel. As a licensed ASIC representative for super
              advice, we run a dedicated department for the administration of
              Self-Managed Super Funds.
            </p>
          </Reveal>

          {/* Figures sit between the copy and the links so the eye has
              somewhere to land before the calls to action. */}
          <dl className="m-0 mb-8 mt-9 grid grid-cols-[repeat(auto-fit,minmax(min(128px,100%),1fr))] gap-x-7 gap-y-6 border-t border-[#D8DCE2] pt-7">
            {figures.map((f, i) => (
              <Reveal key={f.label} delay={i * 110} variant="rise">
                <dt className="sr-only">{f.label}</dt>
                <dd className="m-0">
                  <div className="font-serif text-[34px] leading-none text-[#16396E] md:text-[38px]">
                    {f.value}
                  </div>
                  <div
                    aria-hidden="true"
                    className="mt-[10px] text-[14px] leading-[1.5] text-[#4B5563]"
                  >
                    {f.label}
                  </div>
                </dd>
              </Reveal>
            ))}
          </dl>

          <Reveal variant="fade" className="flex flex-wrap gap-x-8 gap-y-3">
            <Link href="/about" className="rule-link">
              More about the firm →
            </Link>
            <Link href="/team" className="rule-link">
              Meet the team →
            </Link>
          </Reveal>
        </div>

        <Reveal variant="scale" delay={80}>
          {/* The frame clips a deliberately oversized photograph so the
              parallax travel never exposes an edge. */}
          <figure className="m-0">
            {/* 2.6:1 window onto a 2.36:1 panorama. The inner box is sized to
                the source's own ratio (110.2% of a 2.6:1 frame *is* 2.36:1),
                so object-cover crops nothing sideways — everyone in the
                line-up stays in frame — and the parallax travel eats into the
                ceiling and the table edge instead. The overscan is shallower
                than elsewhere, hence the shorter travel. */}
            <div className="relative aspect-[2.6/1] overflow-hidden shadow-[0_24px_60px_-20px_rgba(22,57,110,0.4)]">
              <Parallax
                strength={11}
                className="absolute inset-x-0 -top-[5.1%] h-[110.2%]"
              >
                <Image
                  src="/assets/group-photo-boardroom.jpg"
                  alt="The Bachmann Robinson team"
                  fill
                  sizes="(max-width: 900px) 100vw, 660px"
                  className="object-cover"
                />
              </Parallax>
            </div>
            <figcaption className="mt-3 text-[14px] text-[#4B5563]">
              The Bachmann Robinson team — Level 1, 265 Brisbane Street, Ipswich
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
