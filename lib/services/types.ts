/**
 * Shared shapes for the nine service detail pages under /services/[slug].
 *
 * Everything a page renders lives in this folder so the nine routes stay in
 * sync and a copy change never means touching JSX. Section order and
 * background tone are set per service, which is what stops the pages reading
 * as one template with the words swapped out.
 *
 * Accuracy rules applied throughout the content files: no prices, no
 * turnaround times, no guarantees of tax or financial outcomes, and no
 * qualifications beyond those the firm already publishes on its team page.
 * Anything needing the client's confirmation is flagged with a
 * CLIENT CONTENT REQUIRED comment rather than invented.
 */

import type { Tone } from "@/components/service/SectionShell";
import type { IntroBlock } from "@/components/service/EditorialContentSection";
import type { HelpWithBlock } from "@/components/service/HelpWithSection";
import type { AudienceBlock } from "@/components/service/AudienceSection";
import type { ProcessBlock } from "@/components/service/NumberedProcess";
import type { FeatureBlock } from "@/components/service/FeatureSection";
import type { SpecialistBlock } from "@/components/service/SpecialistSection";
import type { ConsiderationsBlock } from "@/components/service/ConsiderationsSection";
import type { ResourceBlock } from "@/components/service/ResourceLinks";
import type { Faq } from "@/components/service/ServiceFAQ";

export type ServiceSlug =
  | "income-tax-returns"
  | "business-advice-development"
  | "smsf-administration"
  | "financial-statements"
  | "business-activity-statements"
  | "taxation-planning-advice"
  | "non-profit-association-audits"
  | "bookkeeping"
  | "financial-advice";

export type AspectRatio = "4:3" | "3:2" | "16:9" | "5:3" | "4:5" | "1:1";

export type ImageSpec = {
  /** Shown inside the placeholder so it is obvious which asset is missing. */
  label: string;
  /** Brief for whoever sources or shoots the photograph. */
  suggestedImage: string;
  /** Copy this straight onto the <Image alt> when the real asset lands. */
  alt: string;
  aspectRatio: AspectRatio;
};

export type SectionKey =
  | "intro"
  | "helpWith"
  | "audience"
  | "approach"
  | "feature"
  | "featureB"
  | "specialist"
  | "considerations"
  | "resources"
  | "related"
  | "faq";

export type ServiceDetail = {
  slug: ServiceSlug;
  /** Must match the name in lib/data.ts so the grid and cards line up. */
  name: string;
  seo: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    keywords: string[];
  };
  hero: {
    eyebrow: string;
    heading: string;
    tagline: string;
    intro: string;
    image: ImageSpec;
    highlights?: string[];
  };
  intro: IntroBlock;
  helpWith: HelpWithBlock;
  audience: AudienceBlock;
  approach: ProcessBlock;
  feature: FeatureBlock;
  featureB?: FeatureBlock;
  specialist?: SpecialistBlock;
  considerations: ConsiderationsBlock;
  resources?: ResourceBlock;
  faq: { heading: string; intro?: string; items: Faq[]; tone: Tone };
  related: ServiceSlug[];
  relatedTone: Tone;
  /** Section order, top to bottom. Deliberately varies between services. */
  order: SectionKey[];
};
