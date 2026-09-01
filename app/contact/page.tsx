import type { Metadata } from "next";

import TopBar from "@/components/TopBar";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import ContactMap from "@/components/ContactMap";
import PageHero from "@/components/PageHero";
import ImagePlaceholder from "@/components/service/ImagePlaceholder";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Bachmann Robinson — call, email or visit our Ipswich office at Level 1, 265 Brisbane St. We usually respond within one business day.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Bachmann Robinson",
    description:
      "Book a consultation with our Ipswich accountants — by phone, email or in person at Level 1, 265 Brisbane St.",
    url: "/contact",
    siteName: "Bachmann Robinson",
    locale: "en_AU",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="min-w-[320px] bg-cream">
      <TopBar />
      <Nav />

      <main>
        {/* The page itself is the CTA, so the hero's standard button pair is
            switched off — the form sits one scroll below. */}
        <PageHero
          crumb="Contact"
          eyebrow="Contact us"
          heading="We'd love to hear from you."
          intro="Whether you have a quick tax question or want to talk through something more involved, give us a call, send a message or drop into the office — we usually respond within one business day."
          cta={false}
          media={
            <ImagePlaceholder
              label="Office / reception image"
              suggestedImage="A welcoming photograph of the reception at Level 1, 265 Brisbane Street, or a team member greeting a client. Approx. 1500×900."
              alt="The Bachmann Robinson reception in Ipswich"
              aspectRatio="5:3"
            />
          }
        />

        {/* Contact details + enquiry form (shared with the home page). */}
        <Contact />

        {/* Where to find the office — full-bleed map above the footer. */}
        <ContactMap />
      </main>

      <Footer />
    </div>
  );
}
