import type { Metadata } from "next";
import { notFound } from "next/navigation";

import TopBar from "@/components/TopBar";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

import ServiceHero from "@/components/service/ServiceHero";
import EditorialContentSection from "@/components/service/EditorialContentSection";
import HelpWithSection from "@/components/service/HelpWithSection";
import AudienceSection from "@/components/service/AudienceSection";
import NumberedProcess from "@/components/service/NumberedProcess";
import FeatureSection from "@/components/service/FeatureSection";
import SpecialistSection from "@/components/service/SpecialistSection";
import ConsiderationsSection from "@/components/service/ConsiderationsSection";
import ResourceLinks from "@/components/service/ResourceLinks";
import RelatedServices from "@/components/service/RelatedServices";
import ServiceFAQ from "@/components/service/ServiceFAQ";
import ContactCTA from "@/components/ContactCTA";

import { site } from "@/lib/data";
import { getService, serviceSlugs, type SectionKey } from "@/lib/services";

const SITE_URL = "https://bachrob.com.au";

/** All nine pages are known at build time, so all nine are statically rendered. */
export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) return { title: "Service not found" };

  const url = `/services/${service.slug}`;

  return {
    title: service.seo.title,
    description: service.seo.description,
    keywords: service.seo.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: service.seo.ogTitle,
      description: service.seo.ogDescription,
      url,
      siteName: "Bachmann Robinson",
      locale: "en_AU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: service.seo.ogTitle,
      description: service.seo.ogDescription,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const pageUrl = `${SITE_URL}/services/${service.slug}`;

  /* Structured data: breadcrumb trail, the service itself and the FAQ. No
     reviews, ratings or aggregate claims — none of that has been verified. */
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: `${SITE_URL}/services`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.name,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "Service",
        name: service.name,
        description: service.seo.description,
        url: pageUrl,
        serviceType: service.name,
        areaServed: {
          "@type": "City",
          name: "Ipswich",
          addressRegion: "QLD",
          addressCountry: "AU",
        },
        provider: {
          "@type": "AccountingService",
          name: "Bachmann Robinson",
          url: SITE_URL,
          telephone: site.phone,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Level 1, 265 Brisbane Street",
            addressLocality: "Ipswich",
            addressRegion: "QLD",
            postalCode: "4305",
            addressCountry: "AU",
          },
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: service.faq.items.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };

  const section = (key: SectionKey) => {
    switch (key) {
      case "intro":
        return <EditorialContentSection key={key} {...service.intro} />;
      case "helpWith":
        return <HelpWithSection key={key} {...service.helpWith} />;
      case "audience":
        return <AudienceSection key={key} {...service.audience} />;
      case "approach":
        return <NumberedProcess key={key} {...service.approach} />;
      case "feature":
        return <FeatureSection key={key} {...service.feature} />;
      case "featureB":
        return service.featureB ? (
          <FeatureSection key={key} {...service.featureB} />
        ) : null;
      case "specialist":
        return service.specialist ? (
          <SpecialistSection key={key} {...service.specialist} />
        ) : null;
      case "considerations":
        return (
          <ConsiderationsSection key={key} {...service.considerations} />
        );
      case "resources":
        return service.resources ? (
          <ResourceLinks key={key} {...service.resources} />
        ) : null;
      case "related":
        return (
          <RelatedServices
            key={key}
            slugs={service.related}
            tone={service.relatedTone}
          />
        );
      case "faq":
        return (
          <ServiceFAQ
            key={key}
            heading={service.faq.heading}
            intro={service.faq.intro}
            faqs={service.faq.items}
            tone={service.faq.tone}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-w-[320px] bg-cream">
      <script
        type="application/ld+json"
        // Serialised from our own static content; no user input is involved.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <TopBar />
      <Nav />

      <main>
        <ServiceHero name={service.name} {...service.hero} />
        {service.order.map(section)}
        <ContactCTA />
      </main>

      <Footer />
    </div>
  );
}
