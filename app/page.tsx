import TopBar from "@/components/TopBar";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ScrollProgress from "@/components/motion/ScrollProgress";
import CredentialsStrip from "@/components/home/CredentialsStrip";
import Services from "@/components/Services";
import WhyUs from "@/components/home/WhyUs";
import About from "@/components/About";
import HowWeWork from "@/components/home/HowWeWork";
import TeamPreview from "@/components/home/TeamPreview";
import Resources from "@/components/Resources";
import KeyobStrip from "@/components/partner/KeyobStrip";
import KeyobBand from "@/components/partner/KeyobBand";
import Contact from "@/components/Contact";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import { services, site } from "@/lib/data";

/**
 * Search engines read the firm's details from here rather than inferring them
 * from the markup — hours, address and service list in one machine-readable
 * block. Kept beside the page it describes so the two cannot drift apart.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: "Bachmann Robinson",
  description:
    "Local Ipswich accountants, auditors and registered tax agents helping individuals, businesses and self-managed super funds for more than three decades.",
  url: "https://bachrob.com.au",
  telephone: site.phone,
  email: site.email,
  foundingDate: "1990",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Level 1, 265 Brisbane Street",
    addressLocality: "Ipswich",
    addressRegion: "QLD",
    postalCode: "4305",
    addressCountry: "AU",
  },
  areaServed: "Ipswich, Queensland",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "17:00",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Accounting services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name, description: s.desc },
    })),
  },
};

export default function Home() {
  return (
    <div className="min-w-[320px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ScrollProgress />
      <KeyobStrip />
      <TopBar />
      <Nav />
      <Hero />
      {/* Higher stacking context than the sticky hero — this whole block
          scrolls up and covers the pinned hero (Fusion-style curtain). The
          curved, shadowed top edge overlaps the hero so the navy shows
          behind the corners and the white sheet reads as a separate layer.

          `overflow-clip`, not `overflow-hidden`: both clip the square section
          backgrounds to the curved top edge, but `hidden` would make this box
          a scroll container and silently kill `position: sticky` for every
          descendant — including the process section's pinned heading. */}
      <div className="relative z-10 -mt-16 overflow-clip rounded-t-[50%_48px] bg-cream shadow-[0_-26px_44px_-10px_rgba(18,25,42,0.28)] md:rounded-t-[50%_72px]">
        <main>
          {/* Tone rhythm below the hero alternates light/dark deliberately:
              cream · cream · white · stone · navy · white · stone · cream ·
              navy. Every band change is also a change of subject. */}
          <CredentialsStrip />
          <Services />
          <WhyUs />
          <About />
          <HowWeWork />
          <TeamPreview />
          <Resources />
          <KeyobBand />
          <Contact />
          <ContactCTA />
        </main>
        <Footer />
      </div>
    </div>
  );
}
