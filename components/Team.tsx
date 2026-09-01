import Link from "next/link";
import { team } from "@/lib/data";
import TeamCard from "./TeamCard";

export default function Team() {
  return (
    <section id="team" className="section scroll-mt-24 bg-cream">
      <div className="shell">
        <div className="eyebrow mb-[14px] text-[#1E4B8F]">Our people</div>
        <h2 className="m-0 mb-3 font-serif text-[30px] font-normal md:text-[40px]">
          Meet the team
        </h2>
        <p className="m-0 mb-12 max-w-[640px] text-[17.5px] leading-[1.65] text-[#374151]">
          The knowledge and insights to uncover opportunities — and the
          commitment to see them through.
        </p>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(320px,100%),1fr))] gap-5">
          {team.map((m) => (
            <TeamCard key={m.name} member={m} />
          ))}
        </div>
        <div className="mt-10">
          <Link href="/team" className="rule-link">
            View full team profiles →
          </Link>
        </div>
      </div>
    </section>
  );
}
