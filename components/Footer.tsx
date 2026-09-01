import Image from "next/image";
import Link from "next/link";
import { services, site } from "@/lib/data";

const exploreLinks = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/team", label: "Our Team" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
  { href: "/contact", label: "Book a Consultation" },
];

export default function Footer() {
  return (
    <footer className="gutter relative -mt-12 rounded-t-[50%_48px] bg-[#12192A] pb-10 pt-20 text-[#8A94A6] md:pt-28 shadow-[0_-26px_44px_-10px_rgba(18,25,42,0.25)] md:-mt-[72px] md:rounded-t-[50%_72px]">
      <div className="shell">
        <div className="grid gap-x-10 gap-y-12 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-[1.35fr_1.1fr_0.85fr_1fr]">
          {/* Brand */}
          <div className="max-w-[360px]">
            <div className="mb-[14px] flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#174582]">
                <Image
                  src="/assets/br-monogram-light.png"
                  alt="Bachmann Robinson monogram"
                  width={432}
                  height={400}
                  className="block h-[26px] w-auto"
                />
              </span>
              <div>
                <div className="font-serif text-[16px] tracking-[0.5px] text-white">
                  BACHMANN ROBINSON
                </div>
                <div className="mt-[2px] text-[9.5px] uppercase tracking-[1.6px] text-[#8A94A6]">
                  Accountants, Auditors &amp; Tax Agent
                </div>
              </div>
            </div>
            <p className="text-[15.5px] leading-[1.7]">
              Accountants, auditors &amp; tax agents serving Ipswich and
              surrounds since 1990. Registered tax agents with a dedicated
              SMSF department, backed by an ASIC licence for superannuation
              advice.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Est. 1990", "Registered Tax Agent", "SMSF Specialists"].map(
                (badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-white/10 px-3 py-1 text-[12px] uppercase tracking-[1px] text-[#B4BECE]"
                  >
                    {badge}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Services */}
          <div className="text-[15.5px]">
            <div className="mb-3 text-[13px] font-bold uppercase tracking-[1.4px] text-white">
              Services
            </div>
            <ul className="grid gap-[9px] leading-[1.5]">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="transition-colors hover:text-white"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/services"
                  className="font-semibold text-[#C8D6EB] transition-colors hover:text-white"
                >
                  View all services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div className="text-[15.5px]">
            <div className="mb-3 text-[13px] font-bold uppercase tracking-[1.4px] text-white">
              Explore
            </div>
            <ul className="grid gap-[9px] leading-[1.5]">
              {exploreLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in touch */}
          <div className="text-[15.5px] leading-[1.7]">
            <div className="mb-3 text-[13px] font-bold uppercase tracking-[1.4px] text-white">
              Get in Touch
            </div>
            <div className="grid gap-4">
              <div>
                <div className="mb-[2px] font-semibold text-[#B4BECE]">
                  Visit
                </div>
                <a
                  href={site.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Level 1, 265 Brisbane Street
                  <br />
                  Ipswich, Queensland 4305
                </a>
              </div>
              <div>
                <div className="mb-[2px] font-semibold text-[#B4BECE]">
                  Contact
                </div>
                <a
                  href={site.phoneHref}
                  className="block text-[#C8D6EB] transition-colors hover:text-white"
                >
                  {site.phone}
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="block text-[#C8D6EB] transition-colors hover:text-white"
                >
                  {site.email}
                </a>
              </div>
              <div>
                <div className="mb-[2px] font-semibold text-[#B4BECE]">
                  Hours
                </div>
                Monday to Friday
                <br />
                9am – 5pm
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-3 pt-7 text-[14px] leading-[1.7]">
          <div className="font-semibold text-[#B4BECE]">
            Liability limited by a scheme approved under Professional Standards
            Legislation.
          </div>
          <div>
            All information on this website is published in good faith and for
            general information purposes only. Bachmann Robinson makes no
            warranties about the completeness, reliability or accuracy of this
            information; any action you take upon it is strictly at your own
            risk. Links to external sites do not imply a recommendation of their
            content — please review their privacy policies and terms before
            engaging. By using this website you consent to this disclaimer.
            Questions:{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-[#8A94A6] underline"
            >
              {site.email}
            </a>
            .
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span>
              © {new Date().getFullYear()} Bachmann Robinson. All rights
              reserved.
            </span>
            <span className="text-[13px]">
              Accountants, Auditors &amp; Tax Agents — Ipswich, QLD
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
