import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="section scroll-mt-24 bg-[#F1F3F0]">
      <div className="shell grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] items-center gap-14">
        <div>
          <div className="eyebrow mb-[14px] text-[#1E4B8F]">About the firm</div>
          <h2 className="m-0 mb-5 font-serif text-[28px] font-normal text-pretty md:text-[36px]">
            Creativity. Personality. Commitment.
          </h2>
          <p className="m-0 mb-[18px] text-[16.5px] leading-[1.7] text-[#374151]">
            We are a local Ipswich firm operating since the early 1990&rsquo;s.
            Owner and director Nayyar Hayat, along with the whole Ipswich team,
            is dedicated to providing optimum customer service and building
            healthy, lasting relationships with our clients.
          </p>
          <p className="m-0 mb-[18px] text-[16.5px] leading-[1.7] text-[#374151]">
            We have vast experience with tax returns from simple basic returns
            to more complicated ones — business returns, rental properties and
            defence personnel. As a licensed ASIC representative for super
            advice, we run a dedicated department for the administration of
            Self-Managed Super Funds.
          </p>
          <p className="m-0 mb-7 text-[16.5px] leading-[1.7] text-[#374151]">
            Our experienced and friendly staff are focused on getting the best
            possible outcome for our clients by leaving no stone unturned.
          </p>
          <a href="#team" className="rule-link">
            Meet the team →
          </a>
        </div>

        <div>
          <Image
            src="/assets/group-photo-staff.png"
            alt="The Bachmann Robinson team"
            width={1200}
            height={800}
            sizes="(max-width: 900px) 100vw, 520px"
            className="block h-auto w-full shadow-[0_20px_50px_rgba(22,57,110,0.18)]"
          />
          <div className="mt-3 text-[13.5px] text-[#6B7280]">
            The Bachmann Robinson team — Level 1, 265 Brisbane Street, Ipswich
          </div>
        </div>
      </div>
    </section>
  );
}
