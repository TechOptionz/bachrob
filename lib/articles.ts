import type { ImageSpec } from "@/lib/services";

/**
 * The guides & articles published under /resources/[slug].
 *
 * Same accuracy rules as the service content: no prices, no turnaround
 * promises, no guarantees of tax or financial outcomes. Every article closes
 * on the general-information disclaimer rendered by the article template.
 *
 * Each article's hero image uses the site-wide ImagePlaceholder slot system —
 * drop a file at /public/images/generated/<slug-of-label>.jpg to change it.
 */

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  /** Optional bullet list rendered between the paragraphs and the next section. */
  list?: { title: string; text: string }[];
};

export type Article = {
  slug: string;
  category: "Business insights" | "Financial guidance" | "Tax & compliance";
  title: string;
  /** Card teaser on /resources. */
  desc: string;
  readTime: string;
  image: ImageSpec;
  /** Standfirst under the H1. */
  standfirst: string;
  /** "The short version" box at the top of the article. */
  takeaways: string[];
  sections: ArticleSection[];
  /** Final paragraph, bridging into the closing CTA. */
  closing: string;
};

export const articles: Article[] = [
  /* --------------------------------------------------------------------- */
  {
    slug: "preparing-your-business-for-growth",
    category: "Business insights",
    title: "Preparing your business for growth",
    desc: "The structures, systems and conversations worth having before you scale — so growth builds value instead of stress.",
    readTime: "6 min read",
    image: {
      label: "Preparing your business for growth — Article hero",
      suggestedImage:
        "Editorial 16:9 image — a business owner planning at a whiteboard, or a growing local premises. Approx. 1600×900.",
      alt: "A business owner planning the next stage of growth",
      aspectRatio: "16:9",
    },
    standfirst:
      "Growth changes everything — your structure, your cash flow, your tax position and the systems you rely on. The businesses that scale well are the ones that prepare before the growth arrives, not after.",
    takeaways: [
      "Review your business structure before you grow, not after — restructuring is far simpler while the business is smaller.",
      "Growth consumes cash before it generates it. Know how the step up will be funded before you commit.",
      "Bigger businesses attract more obligations: GST, PAYG instalments, payroll considerations and stronger record-keeping.",
    ],
    sections: [
      {
        heading: "Is your structure still the right one?",
        paragraphs: [
          "Many businesses start life as a sole trader or a simple partnership because that is the easiest way to begin. It is often the right call at the time — but the structure that suited a one-person operation rarely suits a business with staff, premises and meaningful revenue.",
          "Structure affects how profit is taxed, how exposed your personal assets are, and how easily you can bring in a partner or investor later. Moving from one structure to another is possible, but it is far simpler — and usually far cheaper — while the business is smaller. If growth is on the horizon, this is the first conversation to have with your accountant.",
        ],
      },
      {
        heading: "Can your cash flow fund the step up?",
        paragraphs: [
          "Growth consumes cash before it generates it. New staff are paid weeks before their work is invoiced. Stock is bought before it is sold. Bigger premises come with a bond and a fit-out. It is entirely possible for a business to grow itself into trouble while remaining profitable on paper.",
          "Before committing to expansion, map the cash the step up will absorb and where it will come from — retained profit, finance, or an equity injection. A simple cash flow forecast, reviewed regularly, turns this from guesswork into a plan.",
        ],
      },
      {
        heading: "What will the ATO expect of the bigger business?",
        paragraphs: [
          "Crossing certain thresholds changes your obligations. Registering for GST, entering the PAYG instalment system, taking on employees with superannuation obligations — each is manageable on its own, but they tend to arrive together, and they all demand better record-keeping than a smaller business could get away with.",
          "The good news is that none of this needs to be a surprise. Your accountant can tell you which obligations are coming, roughly when, and what systems will keep them routine rather than stressful.",
        ],
      },
      {
        heading: "Systems that scale with you",
        paragraphs: [
          "The bookkeeping habits that work at one size quietly fail at the next. A shoebox of receipts, a spreadsheet, doing the books on Sunday night — these hold up right until the volume doubles.",
        ],
        list: [
          {
            title: "Move to proper accounting software early",
            text: "Cloud accounting platforms make growth visible as it happens, rather than months later when the accounts are done.",
          },
          {
            title: "Separate the roles",
            text: "As you grow, the person running the business should not also be the person doing all the bookkeeping. Delegating or outsourcing it earlier than feels necessary is rarely regretted.",
          },
          {
            title: "Build a reporting rhythm",
            text: "A short monthly review of the numbers — with your bookkeeper or accountant — catches problems while they are still small.",
          },
        ],
      },
    ],
    closing:
      "Every growing business is different, and the right preparation depends on your structure, your industry and your plans. A conversation before you commit to the next stage costs little and can save a great deal.",
  },

  /* --------------------------------------------------------------------- */
  {
    slug: "understanding-business-cash-flow",
    category: "Financial guidance",
    title: "Understanding business cash flow",
    desc: "Profit and cash are not the same thing. A plain-language look at why healthy businesses still run short, and how to see it coming.",
    readTime: "5 min read",
    image: {
      label: "Understanding business cash flow — Article hero",
      suggestedImage:
        "Editorial 16:9 image — financial statements, a calculator and a cash flow forecast on a desk. Approx. 1600×900.",
      alt: "Reviewing a business cash flow forecast",
      aspectRatio: "16:9",
    },
    standfirst:
      "“We made a profit — so where did the money go?” It is one of the most common questions accountants hear, and the answer is almost always cash flow. Profit and cash move on different timetables, and confusing the two is how healthy businesses end up short.",
    takeaways: [
      "Profit is an accounting result; cash is what is actually in the bank. A business can have plenty of one and not enough of the other.",
      "The usual culprits are slow-paying customers, money tied up in stock, tax bills arriving after the profit was spent, and growth itself.",
      "A rolling cash flow forecast — even a simple one — turns surprises into things you saw coming months earlier.",
    ],
    sections: [
      {
        heading: "Profit is an opinion; cash is a fact",
        paragraphs: [
          "Your profit and loss statement records income when it is earned and expenses when they are incurred — not when the money actually moves. An invoice raised in March counts as March income even if the customer pays in June. That is proper accounting, and it is the right way to measure performance.",
          "But rent, wages and the ATO are paid with cash, not with accounting entries. This is why a business can show a healthy profit and still struggle to pay its bills — and, less comfortably discussed, why a business can sit on plenty of cash while quietly making a loss.",
        ],
      },
      {
        heading: "Where the cash actually goes",
        paragraphs: [
          "When a profitable business runs short of cash, the money is usually hiding in one of a few predictable places.",
        ],
        list: [
          {
            title: "Debtors",
            text: "Work you have done and invoiced but not been paid for. Every dollar in your debtors ledger is a dollar of profit you cannot spend yet.",
          },
          {
            title: "Stock",
            text: "Goods on the shelf are cash in another form. Over-ordering ties up money that could be paying bills.",
          },
          {
            title: "Tax timing",
            text: "GST, PAYG and income tax are often paid well after the income they relate to was earned — and spent. The bill arrives just when it is least welcome.",
          },
          {
            title: "Growth",
            text: "New staff, more stock, bigger premises — expansion absorbs cash months before the extra revenue lands.",
          },
        ],
      },
      {
        heading: "Seeing it coming",
        paragraphs: [
          "The fix is not complicated, but it does need to be a habit. A rolling cash flow forecast — a simple projection of the money expected in and out over the next few months — shows the tight spots while there is still time to do something about them: chase invoices, delay a purchase, or arrange finance from a position of strength rather than urgency.",
          "Modern accounting software does much of this automatically, and your accountant can help you set up a forecast that suits the rhythm of your business. Set aside the GST and tax component of your income as it arrives, and the ATO's timetable stops being a source of surprises.",
        ],
      },
      {
        heading: "When to get help",
        paragraphs: [
          "If the bank balance regularly feels out of step with what the accounts say, that is worth understanding rather than living with. Sometimes the answer is a simple timing issue; sometimes it points to pricing, terms or costs that need attention. Either way, it is a conversation your accountant has had many times before.",
        ],
      },
    ],
    closing:
      "Cash flow problems are easiest to solve before they become urgent. If you would like help building a forecast or understanding where your cash is going, we do this for businesses across Ipswich every week.",
  },

  /* --------------------------------------------------------------------- */
  {
    slug: "key-tax-planning-considerations",
    category: "Tax & compliance",
    title: "Key tax planning considerations",
    desc: "Timing, deductions and structure choices to review with your accountant well before 30 June — not after.",
    readTime: "6 min read",
    image: {
      label: "Key tax planning considerations — Article hero",
      suggestedImage:
        "Editorial 16:9 image — a tax planning meeting, calendar and documents on a boardroom table. Approx. 1600×900.",
      alt: "Planning tax matters ahead of the end of financial year",
      aspectRatio: "16:9",
    },
    standfirst:
      "By the time a tax return is being prepared, the year it covers is already over — and so are most of the opportunities. Genuine tax planning happens before 30 June, while the decisions that shape your position can still be made.",
    takeaways: [
      "Tax planning is legitimate and expected — it means arranging your affairs sensibly within the rules, well before year end.",
      "Timing matters: when income is derived and when deductible expenses are incurred can shift your position between years.",
      "Superannuation contributions, asset purchases and business structure are the levers most worth reviewing annually.",
    ],
    sections: [
      {
        heading: "Planning is not avoidance",
        paragraphs: [
          "Tax planning sometimes gets an undeserved reputation. Arranging your affairs so you do not pay more tax than the law requires is entirely legitimate — the ATO itself distinguishes clearly between sensible planning and artificial schemes. The rule of thumb is simple: if an arrangement only makes sense because of the tax outcome, be wary. If it makes commercial sense and is tax-effective, that is just good management.",
        ],
      },
      {
        heading: "Timing: the simplest lever",
        paragraphs: [
          "Much of tax planning comes down to timing. Income is generally taxed in the year it is derived, and expenses are generally deductible in the year they are incurred. Around 30 June, small shifts in timing can move income or deductions from one year into another.",
          "Whether that helps depends on your circumstances — your expected income this year versus next, changes to tax rates or thresholds, and your cash position. This is exactly the conversation to have with your accountant in the final quarter of the financial year, not the first week of July.",
        ],
      },
      {
        heading: "The levers worth reviewing each year",
        paragraphs: [
          "The details change with your situation and with the rules, but the same areas repay an annual look.",
        ],
        list: [
          {
            title: "Superannuation contributions",
            text: "Concessional contributions are one of the most straightforward tax-effective strategies available, subject to the caps that apply to you. Timing matters — a contribution counts when the fund receives it, not when you send it.",
          },
          {
            title: "Asset purchases and depreciation",
            text: "If equipment is genuinely needed, the timing of the purchase can affect which year the deduction lands in. The rules in this area change often, so check the current settings before acting.",
          },
          {
            title: "Debtors, stock and write-offs",
            text: "Reviewing bad debts and obsolete stock before 30 June — and writing off what is genuinely irrecoverable — ensures deductions are claimed in the right year.",
          },
          {
            title: "Structure and distributions",
            text: "For trusts and companies, decisions about distributions and dividends need to be made and documented before year end. Left too late, options narrow quickly.",
          },
        ],
      },
      {
        heading: "Records make it all possible",
        paragraphs: [
          "None of these strategies work without substantiation. Deductions need records; trust distributions need resolutions; super contributions need to actually reach the fund in time. Good records are not the boring part of tax planning — they are what makes the rest of it stick.",
        ],
      },
    ],
    closing:
      "The right tax planning moves depend entirely on your circumstances, and the rules shift from year to year. Book a planning conversation in autumn, not July — it is the single easiest way to improve your position.",
  },

  /* --------------------------------------------------------------------- */
  {
    slug: "financial-planning-for-business-owners",
    category: "Financial guidance",
    title: "Financial planning for business owners",
    desc: "Your business and your personal finances are deeply linked. How owners can plan for both without doubling the work.",
    readTime: "5 min read",
    image: {
      label: "Financial planning for business owners — Article hero",
      suggestedImage:
        "Editorial 16:9 image — personal and business financial documents side by side, or an advisory meeting. Approx. 1600×900.",
      alt: "A business owner reviewing personal and business finances together",
      aspectRatio: "16:9",
    },
    standfirst:
      "For most owners, the business is the biggest asset they will ever hold — and the line between business money and personal wealth is blurry at best. Planning for one without the other means planning with half the picture.",
    takeaways: [
      "Your personal financial position and your business are intertwined: income, risk, super and eventual exit all cross the line between them.",
      "Relying on the business alone as your retirement plan concentrates risk. Superannuation builds wealth outside the business, with tax advantages.",
      "An exit or succession plan is worth sketching years before you need it — most of the value levers take time to pull.",
    ],
    sections: [
      {
        heading: "One balance sheet, not two",
        paragraphs: [
          "Owners tend to think of the business finances and the household finances as separate worlds. In practice they behave as one balance sheet: the household depends on drawings or wages from the business, personal guarantees often sit behind business borrowing, and the eventual sale of the business is expected to fund retirement.",
          "Seeing both sides together changes decisions. How much should the business pay you, and in what form? How much risk is the household actually carrying? What happens to the family income if you cannot work for six months? These questions only have good answers when the whole picture is on the table.",
        ],
      },
      {
        heading: "The business is not a retirement plan",
        paragraphs: [
          "“The business is my super” is a common plan, and a risky one. It concentrates everything — income today and wealth tomorrow — in a single asset whose value depends on markets, timing and finding the right buyer at the right moment.",
          "Building wealth outside the business, most obviously through superannuation, spreads that risk. Super remains one of the most tax-effective savings environments available to Australians, and contributions made steadily over the years compound into genuine independence from the business's eventual sale price.",
        ],
      },
      {
        heading: "Protecting the income that funds everything",
        paragraphs: [
          "Everything in the plan — the mortgage, the school fees, the super contributions — rests on the owner's ability to keep working. It is worth honestly reviewing what would happen if illness or injury took you out of the business for an extended period, and what arrangements (insurance, key-person cover, documented processes) would keep the household and the business running.",
        ],
      },
      {
        heading: "Start the exit conversation early",
        paragraphs: [
          "Whether the plan is to sell, to pass the business to family, or to wind down gradually, almost every lever that affects the outcome — cleaning up the accounts, reducing reliance on the owner, structuring for a sale — takes years rather than months to work.",
          "You do not need a finished plan a decade out. You do need the conversation: what does the end look like, roughly when, and what has to be true for it to work? Revisit it annually and the eventual transition becomes an orderly process rather than a scramble.",
        ],
      },
    ],
    closing:
      "Planning across the business–personal boundary is exactly where an accountant who knows both sides of your affairs earns their keep. If it has been a while since you looked at the whole picture, that is a conversation worth booking.",
  },

  /* --------------------------------------------------------------------- */
  {
    slug: "common-compliance-mistakes-to-avoid",
    category: "Tax & compliance",
    title: "Common compliance mistakes to avoid",
    desc: "The record-keeping, lodgement and superannuation slip-ups we see most often — and the simple habits that prevent them.",
    readTime: "5 min read",
    image: {
      label: "Common compliance mistakes to avoid — Article hero",
      suggestedImage:
        "Editorial 16:9 image — well-organised business records, receipts and a filing system. Approx. 1600×900.",
      alt: "Organised business records and receipts ready for lodgement",
      aspectRatio: "16:9",
    },
    standfirst:
      "Most compliance problems are not caused by dishonesty or complexity — they are caused by small habits left unattended. These are the slip-ups accountants see most often, and the routines that prevent every one of them.",
    takeaways: [
      "The most expensive mistakes are the boring ones: late lodgements, missing records and unpaid super, not exotic tax positions.",
      "Superannuation deadlines are unforgiving — paying late can cost the deduction and trigger the superannuation guarantee charge.",
      "Set aside GST and tax as money arrives, keep business and personal spending separate, and most problems never happen.",
    ],
    sections: [
      {
        heading: "Mixing business and personal money",
        paragraphs: [
          "Running personal spending through the business account — or business spending through the personal card — is the root of a remarkable share of compliance problems. It muddies the records, makes deductions hard to substantiate, and for companies can create loan issues with real tax consequences.",
          "The fix costs nothing: separate accounts, and a disciplined habit of paying yourself properly rather than dipping in. Your bookkeeper will thank you, and so will your tax bill.",
        ],
      },
      {
        heading: "Treating lodgement dates as suggestions",
        paragraphs: [
          "Activity statements, tax returns and super lodgements all carry due dates, and the penalties for missing them are automatic rather than personal. A late BAS is a straightforward way to pay more than you owe for no benefit at all.",
          "Lodging on time matters even when you cannot pay on time. The ATO is generally far more willing to arrange payment plans with businesses that lodge promptly and communicate early than with those that go quiet.",
        ],
      },
      {
        heading: "The superannuation trap",
        paragraphs: [
          "Employee superannuation is the strictest deadline in the calendar. Paid on time, it is a routine, deductible cost of employing people. Paid late — even slightly — it can stop being deductible and trigger the superannuation guarantee charge, which adds interest and administration fees and cannot be claimed as a deduction.",
          "The habit that prevents this is simple: treat super like wages. It is the employees' money, it goes out on a fixed schedule, and it is never the bill that waits when cash is tight.",
        ],
      },
      {
        heading: "Records that would not survive a review",
        paragraphs: [
          "A deduction without a record is a deduction you may not get to keep. The standard is not onerous — but it is real, and it is much easier to meet at the time than to reconstruct years later.",
        ],
        list: [
          {
            title: "Capture receipts as they happen",
            text: "Photograph or forward receipts into your accounting software the day you get them. The shoebox method fails precisely when it matters.",
          },
          {
            title: "Keep a logbook where one is needed",
            text: "Vehicle claims are among the most commonly reviewed deductions, and a valid logbook is what separates an accepted claim from a disallowed one.",
          },
          {
            title: "Document the unusual",
            text: "One-off transactions — asset sales, loans to or from the business, family dealings — deserve a note explaining what happened while the details are fresh.",
          },
        ],
      },
      {
        heading: "Going quiet when something goes wrong",
        paragraphs: [
          "The worst response to a missed lodgement or a mistake in a return is silence. Errors can be corrected, returns can be amended, and voluntary disclosure is treated far more gently than discovery. If something has gone wrong, tell your accountant early — the options are always better before the ATO raises it first.",
        ],
      },
    ],
    closing:
      "None of these habits are difficult; they are just easier to build with someone keeping you accountable. If your record-keeping or lodgement rhythm needs a reset, that is precisely what we help businesses do.",
  },

  /* --------------------------------------------------------------------- */
  {
    slug: "building-a-stronger-business-strategy",
    category: "Business insights",
    title: "Building a stronger business strategy",
    desc: "A practical framework for stepping back from the day-to-day and deciding where your business goes next.",
    readTime: "6 min read",
    image: {
      label: "Building a stronger business strategy — Article hero",
      suggestedImage:
        "Editorial 16:9 image — a strategy session with notebook, laptop and planning documents. Approx. 1600×900.",
      alt: "Working through a business strategy planning session",
      aspectRatio: "16:9",
    },
    standfirst:
      "Most owners are so busy working in the business that working on it keeps sliding to next month. Strategy does not need an off-site retreat or a 40-page document — it needs a few honest questions, answered with real numbers, revisited on a rhythm.",
    takeaways: [
      "Strategy is choosing — deciding what the business will focus on and, just as importantly, what it will stop doing.",
      "Your accounts already hold most of the evidence: which work is actually profitable, which customers cost more than they pay, where the money goes.",
      "A strategy only survives contact with reality if it is reviewed regularly — a short quarterly check beats an annual epic.",
    ],
    sections: [
      {
        heading: "Start with what the numbers already know",
        paragraphs: [
          "Gut feel built your business, but it has blind spots. The accounts usually know things the owner only suspects: that one service line subsidises another, that the biggest customer is also the slowest payer, that margins have been drifting down for two years while revenue climbed.",
          "Before setting direction, get an honest read on where the business makes its money and where it leaks. This is work your accountant can do with you directly from the figures you already produce — no new reporting required.",
        ],
      },
      {
        heading: "Strategy means saying no",
        paragraphs: [
          "A goal like “grow revenue” is not a strategy; it is a wish. Strategy is the set of choices about where to focus — which customers, which services, which geography — and what to deliberately stop doing because it dilutes the effort.",
          "The hardest choices are usually subtractions: the unprofitable service kept for old times' sake, the customer who consumes half the admin, the product that no longer fits. Pruning these frees capacity for the work that actually builds value.",
        ],
      },
      {
        heading: "Turn direction into a handful of numbers",
        paragraphs: [
          "Once the direction is chosen, translate it into a small set of measures you can actually watch.",
        ],
        list: [
          {
            title: "Pick three to five indicators",
            text: "Revenue by service line, gross margin, debtor days, sales pipeline — whatever genuinely reflects your chosen direction. More than a handful and none of them get watched.",
          },
          {
            title: "Set a budget that embodies the plan",
            text: "A budget is the strategy written in numbers. If the plan says invest in a new service line, the budget should show it.",
          },
          {
            title: "Compare plan to actual, monthly",
            text: "The gap between what you planned and what happened is the most useful report the business produces. Small gaps get explained; large ones get acted on.",
          },
        ],
      },
      {
        heading: "Keep the rhythm, not the ritual",
        paragraphs: [
          "The annual planning epic that produces a document nobody opens again is the most common failure mode. A better pattern is lighter and more frequent: a short quarterly session to review the numbers against the plan, adjust, and recommit. An outside voice in that session — an accountant or advisor who sees many businesses — keeps the conversation honest and the blind spots covered.",
        ],
      },
    ],
    closing:
      "Strategy is not a document; it is a habit of deciding with evidence. If you would like a partner in that habit — someone who knows your numbers and asks the awkward questions — that is exactly the work our business advisory team does.",
  },
];

export const articleSlugs = articles.map((a) => a.slug);

export const getArticle = (slug: string) =>
  articles.find((a) => a.slug === slug);
