/**
 * KEYOB — the firm's technology partner. One record drives every promo
 * placement (strip, cards, band, the /about section), so the discount, the
 * links and the capability list can be changed in exactly one place.
 *
 * KEYOB brand palette, used only inside the partner components:
 *   navy #14295A · navy-2 #1B356E · cyan #01BCFE · green #20C997 · ice #DCE6F5
 */
export const keyob = {
  name: "KEYOB",
  url: "https://keyob.com",
  /** Pre-addressed enquiry so KEYOB can see the referral came from us. */
  mailto:
    "mailto:info@keyob.com?subject=Bachmann%20Robinson%20client%20enquiry",
  /** The full partnership story on /about — every smaller promo points here. */
  sectionUrl: "/about#it-partner",
  discount: "10%",
  logoNavy: "/assets/keyob-logo-navy.png",
  logoWhite: "/assets/keyob-logo-white.png",
} as const;

/** What KEYOB does, in the order they list it. */
export const keyobCapabilities = [
  "AI & Automation",
  "Social Media Management",
  "Website Design",
  "Custom Software",
  "CRM Setup",
  "System Integrations",
  "ERP Systems",
  "Dashboards & Reporting",
  "Mobile Apps",
  "Cloud & Hosting",
  "Discovery & Scoping",
  "Ongoing Support",
] as const;

/** The three-part "Digital Growth System" every KEYOB client starts with. */
export const keyobSystem = [
  {
    num: "01",
    title: "Website",
    desc: "A site built to turn visitors into enquiries — not just to look tidy.",
  },
  {
    num: "02",
    title: "Aleesa.ai",
    desc: "An AI assistant that answers calls, emails and messages around the clock.",
  },
  {
    num: "03",
    title: "Connected CRM",
    desc: "One place where every lead and conversation is captured automatically.",
  },
] as const;

export const keyobBenefits = [
  {
    title: "Stop losing enquiries",
    desc: "Every call, email and web enquiry answered and captured — including after hours and weekends.",
  },
  {
    title: "Less manual admin",
    desc: "Automate the repetitive work your team is still doing by hand, and give those hours back.",
  },
  {
    title: "A presence that keeps up",
    desc: "Social media managed and posting consistently, without it eating into your week.",
  },
  {
    title: "Numbers you can trust",
    desc: "Clean, connected data means you and your accountant are always working from the same figures.",
  },
] as const;

export const keyobSteps = [
  "Free chat",
  "We scope it",
  "They build it",
  "Ongoing support",
] as const;

/** Every promo placement carries this so the relationship is unambiguous. */
export const keyobDisclaimer =
  "KEYOB is an independent technology provider. Any engagement is between you and KEYOB, and is separate from the accounting and financial services provided by Bachmann Robinson.";
