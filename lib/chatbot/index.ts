/**
 * Knowledge base for the chat assistant, assembled server-side from the same
 * data the pages render — the nine service cards in lib/data.ts, every FAQ on
 * the service detail pages, and the firm details in `site`. Nothing here is
 * written twice: a copy change on a service page changes the bot's answer on
 * the next build, so the widget can never drift from the site.
 *
 * The same accuracy rules as lib/services apply: no prices, no turnaround
 * promises, no guaranteed outcomes.
 */

import { services, site } from "../data";
import { serviceDetails, type ServiceSlug } from "../services";
import { normalize, type ChatConfig, type ChatEntry } from "./match";

/* Higher priority wins a tied score: a specific FAQ answer beats the general
   service blurb, and anything substantive beats small talk. */
const PRIORITY = { smalltalk: 0, service: 1, faq: 2, curated: 3 } as const;

/* Question-shaped words that carry no meaning for matching. Domain words the
   visitor would actually type (tax, bas, smsf, due, ato…) must stay out. */
const STOPWORDS = new Set([
  "the", "and", "are", "was", "were", "been", "being", "does", "did", "have",
  "has", "had", "will", "would", "can", "could", "should", "may", "might",
  "our", "you", "your", "its", "this", "that", "these", "those", "what",
  "when", "where", "which", "who", "whom", "why", "how", "there", "here",
  "with", "for", "from", "into", "about", "over", "under", "between",
  "through", "after", "before", "not", "need", "get", "know", "one", "some",
  "any", "all", "more", "most", "other", "than", "then", "them", "they",
  "can", "help", "still",
]);

/** Distinct meaningful words across the given texts, for keyword matching. */
const derive = (...texts: string[]) => {
  const out = new Set<string>();
  for (const t of texts)
    for (const w of normalize(t).split(" "))
      if (w.length >= 3 && !STOPWORDS.has(w)) out.add(w);
  return [...out];
};

const serviceHref = (slug: ServiceSlug) => `/services/${slug}`;

const allServiceLinks = services.map((s) => ({
  href: serviceHref(s.slug),
  label: s.name,
}));

/* How visitors actually refer to each service — the card name alone would
   miss "BAS", "super fund", "not for profit" and friends. */
const serviceAliases: Record<
  ServiceSlug,
  { phrases: string[]; keywords: string[] }
> = {
  "income-tax-returns": {
    phrases: ["income tax", "tax return", "tax returns", "do my tax"],
    keywords: ["refund", "rental", "defence"],
  },
  "business-advice-development": {
    phrases: ["business advice", "business development", "business structure"],
    keywords: ["strategy", "growth", "structure"],
  },
  "smsf-administration": {
    phrases: ["smsf", "self managed", "super fund", "superannuation"],
    keywords: ["super"],
  },
  "financial-statements": {
    phrases: ["financial statements", "financial reports"],
    keywords: ["statements"],
  },
  "business-activity-statements": {
    phrases: ["activity statement", "activity statements", "bas"],
    keywords: ["gst"],
  },
  "taxation-planning-advice": {
    phrases: ["tax planning", "taxation planning", "tax advice"],
    keywords: ["planning"],
  },
  "non-profit-association-audits": {
    phrases: ["non profit", "not for profit", "association audit", "trust account"],
    keywords: ["audit", "audits", "auditor"],
  },
  bookkeeping: {
    phrases: ["bookkeeping", "book keeping"],
    keywords: ["bookkeeper", "myob", "quickbooks", "reckon"],
  },
  "financial-advice": {
    phrases: ["financial advice", "financial adviser", "financial planning"],
    keywords: ["adviser", "fasea"],
  },
};

const contactBlurb = `call us on ${site.phone} (${site.hours}) or email ${site.email}`;

const curated: ChatEntry[] = [
  {
    id: "smalltalk-greeting",
    priority: PRIORITY.smalltalk,
    phrases: ["hello", "hi", "hey", "good morning", "good afternoon", "gday", "good day", "howdy"],
    keywords: [],
    answer:
      "Hello! Ask me about our services, fees, appointments or the firm itself — or pick a question below.",
    chips: [
      "What services do you offer?",
      "Book an appointment",
      "Contact details & hours",
    ],
  },
  {
    id: "smalltalk-thanks",
    priority: PRIORITY.smalltalk,
    phrases: ["thank you", "thanks", "cheers", "great", "awesome", "perfect"],
    keywords: [],
    answer: `You're welcome! If there's anything else, just ask — or ${contactBlurb}.`,
  },
  {
    id: "services-overview",
    priority: PRIORITY.curated,
    phrases: [
      "what services",
      "services do you offer",
      "what do you do",
      "what do you offer",
      "how can you help",
      "list of services",
    ],
    keywords: ["services", "offer", "help"],
    answer:
      "We're a full-service Ipswich accounting firm — accountants, auditors and registered tax agents. Here's everything we offer; tap a service to read more:",
    links: allServiceLinks,
    chips: ["Book an appointment"],
  },
  {
    id: "appointment",
    priority: PRIORITY.curated,
    phrases: [
      "book an appointment",
      "make an appointment",
      "book a time",
      "get in touch",
      "speak to someone",
      "talk to someone",
      "see someone",
    ],
    keywords: ["appointment", "book", "booking", "meet", "meeting", "consultation", "schedule", "visit"],
    answer: `The easiest way is to ${contactBlurb} — we'll arrange a time that suits you, in person at our Ipswich office or over the phone. You can also send us a message through the contact page.`,
    links: [{ href: "/contact", label: "Go to the contact page" }],
  },
  {
    id: "human",
    priority: PRIORITY.curated,
    phrases: ["real person", "speak to a human", "talk to a human", "speak with a human"],
    keywords: ["human", "person", "someone"],
    answer: `Of course — ${contactBlurb} and one of the team will help you directly.`,
    links: [{ href: "/contact", label: "Go to the contact page" }],
  },
  {
    id: "contact",
    priority: PRIORITY.curated,
    phrases: ["contact details", "phone number", "email address", "opening hours", "contact you", "reach you"],
    keywords: ["contact", "phone", "call", "email", "hours", "open", "ring", "number"],
    answer: `You can reach us on ${site.phone} or at ${site.email}. We're at ${site.addressLine}, open ${site.hours}.`,
    links: [
      { href: "/contact", label: "Contact page" },
      { href: site.maps, label: "Find us on Google Maps" },
    ],
  },
  {
    id: "location",
    priority: PRIORITY.curated,
    phrases: ["where are you", "your office", "where is your office", "how do i find you"],
    keywords: ["address", "location", "located", "office", "ipswich", "directions", "map"],
    answer: `Our office is at ${site.addressLine} — open ${site.hours}.`,
    links: [{ href: site.maps, label: "Find us on Google Maps" }],
  },
  {
    id: "fees",
    priority: PRIORITY.curated,
    phrases: ["how much", "your fees", "do you charge", "cost of", "price list"],
    keywords: ["fees", "fee", "cost", "costs", "price", "prices", "pricing", "charge", "charges", "expensive", "quote"],
    answer: `Fees depend on the scope and complexity of the work involved, so we don't publish a standard price list. Give us a call on ${site.phone} and we can talk through what's involved for your situation.`,
    chips: ["Book an appointment"],
  },
  {
    id: "team",
    priority: PRIORITY.curated,
    phrases: ["your team", "who works", "the director", "who runs the firm", "meet the team"],
    keywords: ["team", "staff", "people", "director", "accountant", "accountants", "partners"],
    answer:
      "Our team is led by director Nayyar Hayat, alongside consultants Russell Bachmann and Richard Dinsdale and a dedicated accounting, SMSF and client-services team. You can meet everyone on the team page.",
    links: [{ href: "/team", label: "Meet the team" }],
  },
  {
    id: "about",
    priority: PRIORITY.curated,
    phrases: ["about the firm", "about you", "who are you", "your history", "how long have you been"],
    keywords: ["history", "established", "firm", "experience", "since"],
    answer:
      "Russell Bachmann acquired the practice in 1990, and the firm became Bachmann Robinson in 1997. We've been serving Ipswich individuals, businesses and self-managed super funds for more than three decades — an accounting firm where people come first.",
    links: [{ href: "/about", label: "About the firm" }],
  },
  {
    id: "claims",
    priority: PRIORITY.curated,
    phrases: ["can i claim", "what can i claim", "claim on tax", "tax deduction", "tax deductions"],
    keywords: ["claim", "claims", "deduction", "deductions"],
    answer:
      "That depends on how you earn your income and what you can substantiate. The ATO's deductions guide is a good starting point, and when we prepare your return we'll ask about your work and expenses and apply the rules for that financial year.",
    links: [
      {
        href: "https://www.ato.gov.au/Individuals/Income-and-deductions/Deductions-you-can-claim/",
        label: "ATO: deductions you can claim",
      },
      { href: serviceHref("income-tax-returns"), label: "About Income Tax Returns" },
    ],
  },
  {
    id: "resources",
    priority: PRIORITY.curated,
    phrases: ["useful links", "ato links"],
    keywords: ["resources", "calculator", "calculators", "articles", "ato", "guides"],
    answer:
      "Our resources page collects handy ATO links — calculators, deduction guides, rental property information and more — plus articles from the team.",
    links: [{ href: "/resources", label: "Browse resources" }],
  },
];

/* One entry per service card, so "do you do bookkeeping?" gets the card copy
   and a link to the detail page. */
const serviceEntries: ChatEntry[] = services.map((s) => {
  const alias = serviceAliases[s.slug];
  return {
    id: `service-${s.slug}`,
    priority: PRIORITY.service,
    phrases: [normalize(s.name), ...alias.phrases],
    keywords: alias.keywords,
    answer: `${s.desc} You can read more on the service page.`,
    links: [{ href: serviceHref(s.slug), label: `About ${s.name}` }],
    chips: ["Book an appointment"],
  };
});

/* Every FAQ already written for the service detail pages, with keywords
   derived from the question plus the service name. */
const faqEntries: ChatEntry[] = Object.values(serviceDetails).flatMap((detail) =>
  detail.faq.items.map((item, i) => ({
    id: `faq-${detail.slug}-${i}`,
    priority: PRIORITY.faq,
    phrases: [],
    keywords: derive(item.q, detail.name),
    answer: item.a,
    links: [{ href: serviceHref(detail.slug), label: `About ${detail.name}` }],
    chips: [`More about ${detail.name}`],
  })),
);

export const chatConfig: ChatConfig = {
  entries: [...curated, ...serviceEntries, ...faqEntries],
  greeting: {
    text: "Hello! I'm the Bachmann Robinson assistant. Ask me about our services, fees, appointments or the firm — or pick a question below.",
    chips: [
      "What services do you offer?",
      "Book an appointment",
      "Contact details & hours",
      "How much do you charge?",
    ],
  },
  fallback: {
    text: `I'm not sure I have an answer for that one — but the team will. Call us on ${site.phone} (${site.hours}) or email ${site.email}, or try one of these:`,
    links: [{ href: "/contact", label: "Contact page" }],
    chips: [
      "What services do you offer?",
      "Book an appointment",
      "Contact details & hours",
    ],
  },
};
