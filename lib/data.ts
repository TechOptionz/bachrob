import type { ServiceSlug } from "./services";

export type Service = { name: string; desc: string; slug: ServiceSlug };
export type TeamMember = {
  name: string;
  role: string;
  creds: string;
  bio: string;
  more: string;
};
export type Resource = { name: string; desc: string; url: string };

export const services: Service[] = [
  {
    name: "Income Tax Returns",
    slug: "income-tax-returns",
    desc: "Individuals, companies, trusts and partnerships — from simple returns to rental properties and defence personnel.",
  },
  {
    name: "Business Advice & Development",
    slug: "business-advice-development",
    desc: "Practical advice on structure, growth and strategy for small and medium businesses.",
  },
  {
    name: "SMSF Administration",
    slug: "smsf-administration",
    desc: "A dedicated department for Self-Managed Super Funds, backed by our ASIC licence for super advice.",
  },
  {
    name: "Financial Statements",
    slug: "financial-statements",
    desc: "Accurate, timely statements that give you a clear picture of where your business stands.",
  },
  {
    name: "Business Activity Statements",
    slug: "business-activity-statements",
    desc: "BAS preparation and lodgement handled meticulously, on time, every time.",
  },
  {
    name: "Taxation Planning & Advice",
    slug: "taxation-planning-advice",
    desc: "Forward planning to identify tax-saving opportunities and effective strategies.",
  },
  {
    name: "Non-profit Association Audits",
    slug: "non-profit-association-audits",
    desc: "Independent audits of non-profit associations and trust accounts.",
  },
  {
    name: "Bookkeeping Services",
    slug: "bookkeeping",
    desc: "Day-to-day bookkeeping across QuickBooks, Reckon, MYOB and other packages.",
  },
  {
    name: "Financial Advice",
    slug: "financial-advice",
    desc: "Guidance on super and financial decisions from FASEA-qualified professionals.",
  },
];

export const team: TeamMember[] = [
  {
    name: "Nayyar Hayat",
    role: "Director",
    creds: "CPA (Aus) · CFA (USA) · FCMA · Tax Agent · FASEA qualified",
    bio: "Partner and Practice Manager with extensive expertise in taxation, strategic planning, corporate governance, global tax structures and risk management.",
    more: "Nayyar brings practical experience from sugar, steel, retail, real estate, education, health and not-for-profit sectors. He has served as CFO and CEO of an international airline and held senior board positions, including Chairman roles.",
  },
  {
    name: "Richard Dinsdale",
    role: "Consultant",
    creds: "BBus Accounting · IPA · previously CPA (30 years)",
    bio: "With the firm since October 1996 and in public accounting since 1975. Richard conducts audits of non-profit associations and trust accounts, alongside an extensive range of accounting and taxation clients.",
    more: "Richard spent 12 years with a Brisbane second-tier firm and 10 years with a Brisbane litigation accountant, developing deep experience in valuations and investigations. For the last 18 years he has helped organise the local IPA/CPA discussion group, which meets monthly.",
  },
  {
    name: "Tracey Ashton",
    role: "Senior Accountant (SMSF)",
    creds: "BBus · SSA",
    bio: "Our go-to person for anything to do with superannuation. An SMSF Specialist Advisor with the SMSF Association, registered with the Tax Practitioners Board, with extensive experience in Self-Managed Superannuation Funds.",
    more: "Tracey previously worked as an accountant for an intellectual property start-up and a group of pharmacies. She is a wife and mother of three, loves to travel, and enjoys relaxing with a red wine and a good book.",
  },
  {
    name: "Parvez Rahim",
    role: "Accountant",
    creds: "B.Com (Accountancy)",
    bio: "Over ten years of industry experience working with small to medium businesses on their accounting and taxation requirements, providing tailored business solutions and advice on accounting systems.",
    more: "Parvez holds a Bachelor of Commerce (Accountancy) from Griffith University and is currently undertaking the CPA program. He loves spending time with family and friends, watching sports and movies, and travelling.",
  },
  {
    name: "Huma Ahmed",
    role: "Accountant",
    creds: "MPA (QUT)",
    bio: "With the firm since May 2024, having worked in accounting firms since 2017. Huma’s strengths include identifying tax-saving opportunities and implementing effective tax strategies.",
    more: "Huma holds a Masters of Professional Accounting from QUT. She is a mum of four, loves to travel and spends her spare time with family and friends.",
  },
  {
    name: "Rebecka Davey",
    role: "SMSF Administration Assistant / Bookkeeper",
    creds: "BBE (LAR) · GDLA",
    bio: "After careers in Landscape Architecture and Real Estate, Rebecka has found her niche working alongside Tracey Ashton administering Self-Managed Superannuation Funds.",
    more: "She is a mum of two beautiful girls and enjoys helping others achieve their personal goals.",
  },
  {
    name: "Susan Boyle",
    role: "Bookkeeper",
    creds: "",
    bio: "With Bachmann Robinson since May 2006, Susan meticulously handles bookkeeping and business activity statements for many of our clients, and is proficient in QuickBooks, Reckon, MYOB and other accounting packages.",
    more: "",
  },
  {
    name: "Josella Gordon",
    role: "Administration Officer",
    creds: "Dip. Business Administration",
    bio: "With the firm since January 2010, Josella handles ASIC reviews and related matters for more than 200 companies, alongside general admin and reception duties.",
    more: "She previously worked at another accounting office for four years. In her spare time she enjoys reading and going to the movies with friends.",
  },
  {
    name: "Kate Grindrod",
    role: "Receptionist / Admin",
    creds: "",
    bio: "Our front-of-house admin since July 2016, after 10 years in retail administration and 2 years in logistics management. Kate enjoys helping clients decode accountant-speak.",
    more: "",
  },
  {
    name: "Russell Bachmann",
    role: "Consultant",
    creds: "",
    bio: "Russell acquired the practice in 1990; the firm was rebadged Bachmann Robinson in 1997. Through his vast experience and intimate knowledge of tax law, he provides invaluable technical knowledge of accounting and tax applications.",
    more: "Russell is heavily involved with his local Rotary group and various business groups, having served in management and committee roles to this day. Away from the office he enjoys the farm and its livestock program. He is married with three grown daughters and is a proud grandparent.",
  },
];

export const resources: Resource[] = [
  {
    name: "Calculators",
    desc: "Online income and tax calculators",
    url: "https://www.ato.gov.au/Calculators-and-tools/?sorttype=SortByTopic&marketsegment=Entire%20Website",
  },
  {
    name: "What can I claim",
    desc: "Find out what expenses you can claim",
    url: "https://www.ato.gov.au/Individuals/Income-and-deductions/Deductions-you-can-claim/",
  },
  {
    name: "Income to declare",
    desc: "What income to include on your tax return",
    url: "https://www.ato.gov.au/Individuals/Income-and-deductions/Income-you-must-declare/",
  },
  {
    name: "Rental properties",
    desc: "Information for rental property owners",
    url: "https://www.ato.gov.au/General/Property/Residential-rental-properties/",
  },
  {
    name: "Small Business Newsroom",
    desc: "The latest business tax information in one place",
    url: "https://www.ato.gov.au/newsroom/smallbusiness/",
  },
  {
    name: "Protect your information",
    desc: "Verify or report a scam and keep your data safe",
    url: "https://www.ato.gov.au/General/Online-services/Identity-security/Protecting-your-information/",
  },
  {
    name: "Super changes",
    desc: "Check whether you are directly affected",
    url: "https://www.ato.gov.au/Individuals/Super/Super-changes/",
  },
  {
    name: "Business essentials",
    desc: "Registration, BAS, online services and key tax topics",
    url: "https://www.ato.gov.au/Business/",
  },
];

export const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("");

export const site = {
  phone: "(07) 3810 1000",
  phoneHref: "tel:0738101000",
  email: "admin@bachrob.com.au",
  addressLine: "Level 1, 265 Brisbane St, Ipswich QLD",
  hours: "Mon–Fri, 9am–5pm",
  maps: "https://goo.gl/maps/jvh5zfBbDMm",
};
