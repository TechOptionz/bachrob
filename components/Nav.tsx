"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

/* Every top-level item now lives on its own route. */
const links = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/resources", label: "Resources" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  /* Exact match, plus child routes — Services stays lit on /services/[slug]. */
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav className="sticky top-0 z-50 bg-white">
      {/* Curvy bottom edge — a white strip with an elliptical dome cut out,
          overlaid on whatever scrolls beneath the nav. The drop-shadow rides
          the curve so the edge reads against light sections too. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-full h-12 md:h-[72px]"
      >
        <svg
          viewBox="0 0 1600 72"
          preserveAspectRatio="none"
          className="block h-full w-full [filter:drop-shadow(0_12px_14px_rgba(18,25,42,0.16))]"
        >
          <path d="M0 0 H1600 V72 Q800 -72 0 72 Z" fill="#ffffff" />
        </svg>
      </div>
      <div className="flex items-center justify-between gap-6 px-5 py-[14px] md:px-10">
        <Link href="/" className="flex items-center gap-3">
          {/* Brand mark: white monogram on the #174582 tile, as on the
              original site. Composed rather than using br-mark.png, which is
              only 77px wide and would blur at this size. */}
          <span className="flex h-[46px] w-[46px] shrink-0 items-center justify-center bg-[#174582]">
            <Image
              src="/assets/br-monogram-light.png"
              alt="Bachmann Robinson monogram"
              width={432}
              height={400}
              priority
              className="block h-[30px] w-auto"
            />
          </span>
          <div>
            <div className="font-serif text-[15px] tracking-[0.5px] text-[#1B2430] sm:text-[19px]">
              BACHMANN ROBINSON
            </div>
            <div className="mt-[2px] text-[9px] uppercase tracking-[1.8px] text-[#6B7280] sm:text-[10px]">
              Accountants, Auditors &amp; Tax Agent
            </div>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-[26px] lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`text-[15px] hover:text-[#1E4B8F] ${
                isActive(l.href)
                  ? "font-semibold text-[#1E4B8F]"
                  : "font-medium text-[#374151]"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="bg-[#1E4B8F] px-5 py-[10px] text-[15px] font-semibold text-white hover:bg-[#16396E] hover:text-white"
          >
            Book a consultation
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
        >
          <span
            className={`block h-[2px] w-6 bg-[#1B2430] transition-transform ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-[#1B2430] transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-[#1B2430] transition-transform ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-[#E5E4E0] px-5 pb-5 pt-2 lg:hidden"
        >
          <div className="flex flex-col">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`border-b border-[#F1F3F0] py-3 text-[16px] hover:text-[#1E4B8F] ${
                  isActive(l.href)
                    ? "font-semibold text-[#1E4B8F]"
                    : "font-medium text-[#374151]"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-4 bg-[#1E4B8F] px-5 py-3 text-center text-[15px] font-semibold text-white hover:bg-[#16396E] hover:text-white"
            >
              Book a consultation
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
