import { site } from "@/lib/data";
import Reveal from "./service/Reveal";

/**
 * Full-bleed Google Maps band for the contact page. The keyless `output=embed`
 * endpoint needs no API key; the address card floats over the map's left side
 * on desktop (aligned to the shell edge) and sits above it in flow on mobile,
 * so the pin is never hidden on a narrow screen.
 */
const EMBED_SRC =
  "https://maps.google.com/maps?q=" +
  encodeURIComponent("265 Brisbane St, Ipswich QLD 4305, Australia") +
  "&z=16&output=embed";

export default function ContactMap() {
  return (
    <section aria-labelledby="contact-map-heading" className="relative bg-cream">
      <div className="gutter relative z-10 md:pointer-events-none md:absolute md:inset-x-0 md:top-1/2 md:-translate-y-1/2">
        <div className="shell">
          {/* Right-hand side: the embed pins its own little place card to the
              top-left corner, so ours keeps out of its way. */}
          <Reveal variant="right">
            <div className="border-l-4 border-[#1E4B8F] bg-white p-7 shadow-[0_18px_44px_rgba(15,26,44,0.16)] md:pointer-events-auto md:ml-auto md:max-w-[360px] md:p-8">
              <div className="eyebrow mb-3 text-[#1E4B8F]">Find us</div>
              <h2
                id="contact-map-heading"
                className="m-0 mb-4 font-serif text-[24px] font-normal leading-[1.25] text-[#1B2430] md:text-[26px]"
              >
                Our Ipswich office
              </h2>
              <p className="m-0 text-[15.5px] leading-[1.6] text-[#374151]">
                Level 1, 265 Brisbane St
                <br />
                Ipswich QLD 4305
              </p>
              <p className="m-0 mt-2 text-[15.5px] leading-[1.6] text-[#374151]">
                {site.hours}
              </p>
              <div className="mt-5">
                <a
                  href={site.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rule-link"
                >
                  Get directions ↗
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="relative mt-6 h-[340px] md:mt-0 md:h-[500px]">
        <iframe
          src={EMBED_SRC}
          title="Map showing the Bachmann Robinson office at Level 1, 265 Brisbane Street, Ipswich"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    </section>
  );
}
