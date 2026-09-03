"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { keyob } from "@/lib/keyob";
import KeyobLogo from "./KeyobLogo";

/* Keyed by the discount so a changed offer re-surfaces the strip for
   visitors who dismissed the old one. */
const STORAGE_KEY = `br-keyob-strip:${keyob.discount}`;

/**
 * Slim, dismissible announcement strip for the KEYOB partnership — the
 * host-brand-led "Variant A". Sits at the very top of the home page, above
 * the contact TopBar, and points to the full partner section on /about.
 *
 * The strip renders on the server (so it's present without JavaScript) and is
 * removed on mount if a previous visit dismissed it.
 */
export default function KeyobStrip() {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY)) setDismissed(true);
    } catch {
      /* Private browsing — the strip simply stays visible. */
    }
  }, []);

  if (dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* Session-only dismissal is fine. */
    }
  };

  return (
    <div className="relative flex flex-wrap items-center gap-x-4 gap-y-[10px] border-b-[3px] border-t border-b-[#1E4B8F] border-t-[#E5E4E0] bg-[#F5F8FC] py-[11px] pl-5 pr-14 max-md:justify-start md:justify-center md:px-16">
      <p className="m-0 text-[15px] leading-[1.45] text-[#1B2430] md:text-[15.5px]">
        Bachmann Robinson clients save{" "}
        <strong className="text-[19px] font-extrabold tracking-[-0.01em] text-[#1E4B8F] md:text-[20px]">
          {keyob.discount}
        </strong>{" "}
        on websites, automation &amp; social media.
      </p>

      <span className="flex items-center gap-2 border-l border-[#E5E4E0] pl-4 max-sm:hidden">
        <span className="whitespace-nowrap text-[10.5px] font-bold uppercase tracking-[1.2px] text-[#4B5563]">
          Our IT partner
        </span>
        <KeyobLogo className="h-[13px]" />
      </span>

      <Link
        href={keyob.sectionUrl}
        className="inline-flex min-h-[38px] items-center bg-[#1E4B8F] px-[18px] text-[13.5px] font-bold text-white transition-opacity hover:text-white hover:opacity-90"
      >
        Learn more
      </Link>

      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center border-0 bg-transparent text-[20px] leading-none text-[#9AA7B5] transition-colors hover:text-[#1B2430] md:right-3"
      >
        &times;
      </button>
    </div>
  );
}
