import { resources } from "@/lib/data";

export default function Resources() {
  return (
    <section
      id="resources"
      className="gutter scroll-mt-24 bg-[#16396E] py-20 text-white"
    >
      <div className="shell">
        <div className="eyebrow mb-[14px] text-[#9FB8DC]">Helpful resources</div>
        <h2 className="m-0 mb-3 font-serif text-[26px] font-normal md:text-[32px]">
          Tools &amp; guides from the ATO
        </h2>
        <p className="m-0 mb-10 max-w-[620px] text-[16px] text-[#C8D6EB]">
          Quick links we share with clients most often. For anything specific to
          your situation, give us a call — that&rsquo;s what we&rsquo;re here
          for.
        </p>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(250px,100%),1fr))] gap-[14px]">
          {resources.map((r) => (
            <a
              key={r.name}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-white/25 px-5 py-[18px] text-white transition-colors hover:border-white hover:bg-white/[0.06] hover:text-white"
            >
              <div className="mb-[6px] text-[15.5px] font-bold">
                {r.name} ↗
              </div>
              <div className="text-[13.5px] leading-[1.45] text-[#C8D6EB]">
                {r.desc}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
