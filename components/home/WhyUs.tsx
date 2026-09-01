import Reveal from "@/components/service/Reveal";

/**
 * The four things the firm says about itself, as a hairline grid.
 *
 * Icons are inline SVG on a shared 32×32 viewBox with a single stroke weight,
 * so they sit on the same optical line as the serif headings and cost no extra
 * requests.
 */
const pillars = [
  {
    title: "People before paperwork",
    body: "Every engagement starts with a conversation about your situation. You deal with the same accountant each time — not a queue.",
    icon: (
      <>
        <circle cx="12" cy="12" r="5" />
        <circle cx="23" cy="14" r="4" />
        <path d="M3 29c0-5 4-8 9-8s9 3 9 8" />
        <path d="M21.5 22.5c4.5.4 7.5 3.2 7.5 6.5" />
      </>
    ),
  },
  {
    title: "Three decades in Ipswich",
    body: "The practice has been part of this community since 1990. We know the local landscape, and a good many of our clients have been with us for most of it.",
    icon: (
      <>
        <path d="M3 29h26" />
        <path d="M6 29V13l10-7 10 7v16" />
        <path d="M13 29v-8h6v8" />
      </>
    ),
  },
  {
    title: "Specialists, not generalists",
    body: "A dedicated SMSF department, an ASIC licence for super advice, and auditors who handle non-profit associations and trust accounts.",
    icon: (
      <>
        <path d="M16 3l11 5v8c0 7-4.6 11.7-11 13C9.6 27.7 5 23 5 16V8z" />
        <path d="M11 16l3.5 3.5L22 12" />
      </>
    ),
  },
  {
    title: "No stone unturned",
    body: "From a straightforward individual return to rental properties, defence personnel and complex business structures — the detail gets the same attention.",
    icon: (
      <>
        <circle cx="14" cy="14" r="9" />
        <path d="M20.5 20.5L29 29" />
        <path d="M10 14h8M14 10v8" />
      </>
    ),
  },
];

export default function WhyUs() {
  return (
    <section className="section scroll-mt-24 bg-white">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end lg:gap-16">
          <Reveal variant="left">
            <div className="eyebrow mb-[14px] text-[#1E4B8F]">
              Why clients stay
            </div>
            <h2 className="m-0 font-serif text-[30px] font-normal leading-[1.2] text-pretty md:text-[40px]">
              A firm small enough to know you, deep enough to handle it.
            </h2>
          </Reveal>
          <Reveal variant="right" delay={90}>
            <p className="m-0 max-w-[520px] text-[17px] leading-[1.75] text-[#374151] lg:pb-2">
              Owner and director Nayyar Hayat and the whole Ipswich team are
              focused on getting the best possible outcome for our clients and
              building relationships that last well beyond a single lodgement.
            </p>
          </Reveal>
        </div>

        {/* Hairline grid drawn by a 1px ring on each card rather than by a
            coloured container showing through 1px gaps: when the last row is
            short — four cards over three columns — the empty cells stay empty
            instead of leaving a bare grey block. Adjacent rings meet in the
            1px gap and read as a single line. */}
        <ul className="mt-12 grid list-none grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-px p-0 md:mt-14">
          {pillars.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 90} variant="rise">
              <div className="h-full bg-white px-7 py-8 shadow-[0_0_0_1px_#E5E4E0] transition-colors duration-300 hover:bg-[#F5F8FC]">
                <svg
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  fill="none"
                  stroke="#1E4B8F"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mb-6 block h-8 w-8"
                >
                  {p.icon}
                </svg>
                <h3 className="m-0 mb-[10px] font-serif text-[20px] font-normal leading-[1.35]">
                  {p.title}
                </h3>
                <p className="m-0 text-[15.5px] leading-[1.65] text-[#374151]">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
