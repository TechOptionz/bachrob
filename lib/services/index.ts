import { services } from "../data";
import type { ServiceDetail, ServiceSlug } from "./types";

import incomeTaxReturns from "./income-tax-returns";
import businessAdviceDevelopment from "./business-advice-development";
import smsfAdministration from "./smsf-administration";
import financialStatements from "./financial-statements";
import businessActivityStatements from "./business-activity-statements";
import taxationPlanningAdvice from "./taxation-planning-advice";
import nonProfitAssociationAudits from "./non-profit-association-audits";
import bookkeeping from "./bookkeeping";
import financialAdvice from "./financial-advice";

export type {
  ServiceSlug,
  ServiceDetail,
  ImageSpec,
  AspectRatio,
  SectionKey,
} from "./types";

/** Ordered to match the nine cards in the home page services grid. */
const all: ServiceDetail[] = [
  incomeTaxReturns,
  businessAdviceDevelopment,
  smsfAdministration,
  financialStatements,
  businessActivityStatements,
  taxationPlanningAdvice,
  nonProfitAssociationAudits,
  bookkeeping,
  financialAdvice,
];

export const serviceDetails: Record<ServiceSlug, ServiceDetail> = Object.freeze(
  Object.fromEntries(all.map((s) => [s.slug, s])),
) as Record<ServiceSlug, ServiceDetail>;

export const serviceSlugs: ServiceSlug[] = all.map((s) => s.slug);

export const getService = (slug: string): ServiceDetail | undefined =>
  serviceDetails[slug as ServiceSlug];

/**
 * Short card copy for the home grid and the "you may also be interested in"
 * rows. Sourced from lib/data.ts so a card and its page never drift apart.
 */
export const serviceCard = (slug: ServiceSlug) => {
  const card = services.find((s) => s.slug === slug);
  if (!card) throw new Error(`Unknown service slug: ${slug}`);
  return card;
};

/* Every slug in lib/data.ts must have a detail page, and vice versa. Caught at
   build time rather than as a 404 in production. */
if (process.env.NODE_ENV !== "production") {
  const missing = services
    .map((s) => s.slug)
    .filter((slug) => !serviceDetails[slug]);
  if (missing.length) {
    throw new Error(
      `Services without a detail page: ${missing.join(", ")}`,
    );
  }
}
