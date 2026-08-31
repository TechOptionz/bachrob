import { site } from "@/lib/data";
import ContactForm from "./ContactForm";

function Detail({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="w-1 shrink-0 bg-[#1E4B8F]" />
      <div>
        <div className="mb-[3px] text-[15px] font-bold">{title}</div>
        <div className="text-[15px] leading-[1.5] text-[#4B5563]">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="section scroll-mt-24">
      <div className="shell grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] gap-14">
        <div>
          <div className="eyebrow mb-[14px] text-[#1E4B8F]">Get in touch</div>
          <h2 className="m-0 mb-5 font-serif text-[28px] font-normal md:text-[36px]">
            Book a consultation
          </h2>
          <p className="m-0 mb-8 text-[16.5px] leading-[1.7] text-[#374151]">
            Give us a call, send a message, or drop into the office. We&rsquo;ll
            get back to you as soon as possible.
          </p>
          <div className="grid gap-[22px]">
            <Detail title="Visit us">
              Level 1, 265 Brisbane St
              <br />
              PO Box 146, Ipswich QLD 4305
              <br />
              <a
                href={site.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold"
              >
                Open in Google Maps ↗
              </a>
            </Detail>
            <Detail title="Call us">
              <a href={site.phoneHref} className="font-semibold">
                {site.phone}
              </a>{" "}
              · Monday to Friday, 9am–5pm
            </Detail>
            <Detail title="Email us">
              <a href={`mailto:${site.email}`} className="font-semibold">
                {site.email}
              </a>
            </Detail>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
