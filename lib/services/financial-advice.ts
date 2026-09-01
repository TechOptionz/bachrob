import type { ServiceDetail } from "./types";

/**
 * The most tightly constrained of the nine pages. Financial advice is a
 * regulated activity, so the copy here stays with what the firm already
 * publishes: guidance on superannuation and financial decisions from
 * FASEA-qualified professionals, and a licensed ASIC representative for super
 * advice. Nothing about investment products, insurance, estate planning or
 * lending appears anywhere on this page.
 */
const financialAdvice: ServiceDetail = {
  slug: "financial-advice",
  name: "Financial Advice",
  seo: {
    title: "Financial Advice | Superannuation, Ipswich",
    description:
      "Considered guidance on superannuation and financial decisions from an established Ipswich firm, coordinated with the accounting and tax side of your affairs.",
    ogTitle: "Financial Advice — Bachmann Robinson, Ipswich",
    ogDescription:
      "Financial decisions deserve considered advice. Guidance on superannuation and financial decisions, alongside the accounting and tax work we already do for you.",
    keywords: [
      "financial advice Ipswich",
      "superannuation advice Ipswich",
      "financial planning Ipswich",
      "super and tax advice",
      "financial adviser Ipswich",
    ],
  },
  hero: {
    eyebrow: "Advisory · Superannuation & financial decisions",
    heading: "Financial Advice",
    tagline: "Financial decisions deserve considered advice.",
    intro:
      "Some decisions are worth slowing down for. We provide guidance on superannuation and financial decisions, taking the time to understand what you are trying to achieve before discussing the options — and doing it with a clear view of the tax and accounting side, because the two rarely sit apart.",
    image: {
      label: "Financial Advice — Hero",
      suggestedImage:
        "Adviser and a couple in a considered, unhurried consultation in a warm office setting.",
      alt: "Adviser in consultation with clients about their financial position",
      aspectRatio: "4:3",
    },
    highlights: [
      "Guidance from FASEA-qualified professionals",
      "A licensed ASIC representative for super advice",
      "Considered alongside your accounting and tax position",
    ],
  },
  intro: {
    eyebrow: "The service",
    heading: "Advice that starts with understanding your situation.",
    tone: "cream",
    paragraphs: [
      "Financial decisions are rarely made in isolation. A decision about superannuation touches tax; a decision about a business touches personal circumstances; a decision made now shapes what is possible in ten years. Advice worth having begins with understanding all of that, not with a product.",
      "Bachmann Robinson provides guidance on superannuation and financial decisions. As a licensed ASIC representative for super advice, with FASEA-qualified professionals in the practice, we can talk through the considerations that apply to your circumstances and help you understand the options in front of you.",
      "Because we also handle the accounting and taxation side for many of our clients, those conversations happen with the full picture available. That coordination is the point: super, tax and business decisions influence one another, and considering them separately is how people end up with an outcome nobody intended.",
    ],
    aside: {
      title: "What advice is available to you",
      body: "The advice we can provide depends on the licensing arrangements in place and on your own circumstances. Please speak with our team regarding the services and advice available to you.",
    },
  },
  feature: {
    eyebrow: "How we approach it",
    heading: "Considered, not rushed.",
    tone: "white",
    paragraphs: [
      "There is no useful shortcut to understanding someone's financial situation. What you are working towards, what you already have in place, what obligations sit alongside it, and what you would like the next stage of life to look like — all of it matters before anything sensible can be said about the options.",
      "We would rather spend the time getting that right and be clear about the limits of what we can advise on, than move quickly and end up somewhere that does not actually suit you.",
    ],
    points: [
      "Time spent understanding your objectives and circumstances first",
      "Plain explanation of the considerations that apply to your situation",
      "Clarity about what falls inside our advice and what does not",
      "Coordination with the accounting and tax side of your affairs",
    ],
    image: {
      label: "Financial consultation — Editorial wide",
      suggestedImage:
        "Long-term financial planning meeting: adviser and clients in unhurried conversation across a table.",
      alt: "Adviser and clients in a financial planning conversation",
      aspectRatio: "16:9",
    },
  },
  helpWith: {
    eyebrow: "What we do",
    heading: "What we can help you with",
    intro:
      "Conversations we are commonly asked to have. What we can advise on in your particular case depends on your circumstances and the licensing arrangements that apply.",
    layout: "list",
    tone: "stone",
    // CLIENT CONTENT REQUIRED: confirm the AFSL / authorised representative
    // details and the scope of advice authorised, together with the Financial
    // Services Guide, before this page goes live. Nothing beyond superannuation
    // and general financial decision support is claimed here.
    items: [
      {
        title: "Understanding your financial goals",
        desc: "Working out what you are actually trying to achieve, and over what timeframe, before any discussion of how to get there.",
      },
      {
        title: "Superannuation considerations",
        desc: "Discussing how superannuation fits into your broader position, and the considerations that apply to your circumstances.",
      },
      {
        title: "Long-term planning discussions",
        desc: "Thinking beyond the current financial year — what the next stage looks like and what would need to be true for it to work.",
      },
      {
        title: "Understanding your options",
        desc: "Setting out the choices available in a way you can weigh up properly, including what each would involve in practice.",
      },
      {
        title: "Financial decision support",
        desc: "A considered second opinion when a significant decision is in front of you and you would rather not make it alone.",
      },
      {
        title: "Coordination with tax and accounting",
        desc: "Making sure financial decisions are considered alongside their tax and accounting consequences rather than in isolation.",
      },
    ],
  },
  approach: {
    eyebrow: "Our approach",
    heading: "How we work with you",
    tone: "white",
    steps: [
      {
        title: "Understand your circumstances",
        desc: "Your situation, your obligations, what you already have in place, and what you are hoping the years ahead look like.",
      },
      {
        title: "Clarify what you are trying to achieve",
        desc: "Objectives are often clearer once they are said out loud. We spend the time here because everything after it depends on getting it right.",
      },
      {
        title: "Review the relevant information",
        desc: "We look at the information relevant to the decision, including the tax and accounting position where we already hold it.",
      },
      {
        title: "Discuss the considerations and options",
        desc: "We talk through what applies to your circumstances, what the options involve, and where something falls outside the advice we can provide.",
      },
      {
        title: "Provide ongoing support",
        desc: "Circumstances change, and so does legislation. We remain available as things develop rather than treating the conversation as finished.",
      },
    ],
    note: "Where a matter falls outside the advice we are able to provide, we will say so clearly and, where appropriate, suggest that you seek advice from an appropriately qualified professional.",
  },
  audience: {
    eyebrow: "Who we work with",
    heading: "Who this service is for",
    tone: "tint",
    groups: [
      {
        name: "Individuals and couples",
        desc: "People wanting to understand their position and think about the decisions ahead of them properly.",
      },
      {
        name: "Clients thinking about superannuation",
        desc: "Anyone weighing up superannuation considerations as part of a broader financial picture.",
      },
      {
        name: "SMSF trustees",
        desc: "Trustees whose fund we administer, where financial and superannuation considerations naturally sit side by side.",
      },
      {
        name: "Business owners",
        desc: "Owners whose personal financial position and business affairs are closely connected and need to be considered together.",
      },
      {
        name: "Clients approaching a change",
        desc: "People facing a significant transition where the financial implications deserve unhurried thought.",
      },
      {
        name: "Existing accounting clients",
        desc: "Clients who would rather have these conversations with a firm that already knows their circumstances.",
      },
    ],
  },
  considerations: {
    eyebrow: "Worth knowing",
    heading: "Important considerations",
    tone: "cream",
    items: [
      {
        title: "Advice must suit your circumstances",
        desc: "Financial advice should take into account your objectives, financial situation and needs. What is appropriate for one person may be entirely unsuitable for another.",
      },
      {
        title: "There is a scope to what we advise on",
        desc: "The advice we can provide depends on the licensing arrangements in place. Where something falls outside it, we will tell you rather than stretch to cover it.",
      },
      {
        title: "Nothing here is a recommendation",
        desc: "The information on this page is general in nature. It is not personal advice and should not be acted on without discussing your own circumstances with us.",
      },
      {
        title: "Legislation changes",
        desc: "Superannuation and taxation rules are revised regularly. Decisions should be reviewed as circumstances and legislation change.",
      },
    ],
    disclaimer:
      "Financial advice should take into account your objectives, financial situation and needs. The information on this page is general in nature and is not a recommendation to take, or refrain from taking, any particular course of action. Please speak with our team regarding the services and advice available to you.",
  },
  resources: {
    eyebrow: "External resources",
    heading: "Useful government resources",
    tone: "stone",
    intro:
      "Independent consumer information published by Australian government agencies. General guidance only — it cannot take your circumstances into account.",
    // CLIENT CONTENT REQUIRED: confirm these external URLs remain current at launch.
    links: [
      {
        source: "Moneysmart",
        name: "How super works",
        desc: "ASIC's plain-language explanation of superannuation.",
        url: "https://moneysmart.gov.au/how-super-works",
      },
      {
        source: "Moneysmart",
        name: "Financial advice",
        desc: "What to expect from financial advice, and what to ask.",
        url: "https://moneysmart.gov.au/financial-advice",
      },
      {
        source: "Moneysmart",
        name: "Financial advisers register",
        desc: "ASIC's public register of financial advisers in Australia.",
        url: "https://moneysmart.gov.au/financial-advice/financial-advisers-register",
      },
      {
        source: "ATO",
        name: "Super for individuals and families",
        desc: "Superannuation information published by the ATO.",
        url: "https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families",
      },
    ],
  },
  faq: {
    heading: "Common questions about financial advice",
    tone: "white",
    items: [
      {
        q: "What kind of financial advice do you provide?",
        a: "Our focus is guidance on superannuation and financial decisions, considered alongside your accounting and taxation position. What we can advise on in your particular case depends on your circumstances and the licensing arrangements in place — please speak with our team regarding the services and advice available to you.",
      },
      {
        q: "Do I need to be an accounting client to talk to you?",
        a: "No. It often helps if we already understand your position, but plenty of conversations start with a specific question. Give us a call and tell us what you are trying to work out.",
      },
      {
        q: "Can you tell me what to invest in?",
        a: "We do not make specific investment recommendations. Our role is to help you understand your circumstances, the considerations that apply and the options in front of you, and to be clear about where you would need advice from an appropriately qualified professional.",
      },
      {
        q: "How does this fit with my SMSF?",
        a: "Closely. Where we administer a self-managed super fund, financial and superannuation considerations tend to come up in the same conversation, which is one of the advantages of having both handled by the one practice.",
      },
      {
        q: "What should I bring to a first conversation?",
        a: "Whatever gives a picture of where things stand — recent superannuation statements, an idea of your income and obligations, and most importantly a sense of what you are hoping to achieve. We can work out what else is needed from there.",
      },
    ],
  },
  related: ["smsf-administration", "taxation-planning-advice", "income-tax-returns"],
  relatedTone: "cream",
  order: [
    "intro",
    "feature",
    "helpWith",
    "approach",
    "audience",
    "considerations",
    "resources",
    "related",
    "faq",
  ],
};

export default financialAdvice;
