import Image from "next/image";
import { site } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="gutter relative -mt-12 rounded-t-[50%_48px] bg-[#12192A] pb-10 pt-20 text-[#8A94A6] md:pt-28 shadow-[0_-26px_44px_-10px_rgba(18,25,42,0.25)] md:-mt-[72px] md:rounded-t-[50%_72px]">
      <div className="shell">
        <div className="flex flex-wrap justify-between gap-10 border-b border-white/10 pb-9">
          <div className="max-w-[340px]">
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
            <div className="text-[14px] leading-[1.6]">
              Accountants, auditors &amp; tax agents serving Ipswich and
              surrounds since 1990.
            </div>
          </div>

          <div className="text-[14.5px] leading-[2]">
            <div className="mb-[6px] font-bold text-white">Visit</div>
            Level 1, 265 Brisbane Street
            <br />
            Ipswich, Queensland 4305
          </div>

          <div className="text-[14.5px] leading-[2]">
            <div className="mb-[6px] font-bold text-white">Contact</div>
            <a href={site.phoneHref} className="text-[#C8D6EB]">
              {site.phone}
            </a>
            <br />
            <a href={`mailto:${site.email}`} className="text-[#C8D6EB]">
              {site.email}
            </a>
          </div>

          <div className="text-[14.5px] leading-[2]">
            <div className="mb-[6px] font-bold text-white">Hours</div>
            Monday to Friday
            <br />
            9am – 5pm
          </div>
        </div>

        <div className="grid gap-3 pt-7 text-[13px] leading-[1.7]">
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
          <div>
            © {new Date().getFullYear()} Bachmann Robinson. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
