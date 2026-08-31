import { site } from "@/lib/data";

export default function TopBar() {
  return (
    <div className="flex flex-wrap justify-center gap-x-7 gap-y-1 bg-[#16396E] px-6 py-2 text-[14px] text-[#C8D6EB]">
      <span>{site.addressLine}</span>
      <span>{site.hours}</span>
      <a
        href={site.phoneHref}
        className="font-semibold text-white hover:text-white"
      >
        {site.phone}
      </a>
    </div>
  );
}
