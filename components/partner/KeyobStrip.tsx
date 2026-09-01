"use client";

import { useEffect, useState } from "react";

import { keyob } from "@/lib/keyob";
import KeyobLogo from "./KeyobLogo";

const STORAGE_KEY = "br-keyob-strip-dismissed";

/**
 * Slim, dismissible announcement strip for the KEYOB partnership. Sits at the
 * very top of the page, above the contact TopBar. Dismissal is remembered in
 * localStorage so the strip doesn't nag a visitor on every page load.
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
    <div className="relative flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-b-[3px] border-[#01BCFE] bg-[#F5F8FC] py-[11px] pl-5 pr-12 md:px-14">
      <p className="m-0 text-[14.5px] leading-[1.5] text-[#1B2430]">
        Bachmann Robinson clients save{" "}
        <strong className="text-[16.5px] font-extrabold text-[#1E4B8F]">
          {keyob.discount}
        </strong>{" "}
        on IT, websites &amp; automation.
      </p>

      <span className="flex items-center gap-[10px] border-l border-[#D8DCE2] pl-5 max-sm:hidden">
        <span className="text-[10.5px] font-bold uppercase tracking-[1.2px] text-[#4B5563]">
          Our IT partner
        </span>
        <KeyobLogo className="h-[13px]" />
      </span>

      <a
        href={keyob.url}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#14295A] px-4 py-[7px] text-[13px] font-bold text-white transition-colors hover:bg-[#1B356E] hover:text-white"
      >
        Learn more
      </a>

      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer border-0 bg-transparent p-2 text-[19px] leading-none text-[#9CA3AF] transition-colors hover:text-[#1B2430] md:right-4"
      >
        &times;
      </button>
    </div>
  );
}
