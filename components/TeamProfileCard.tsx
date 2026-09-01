"use client";

import { useState } from "react";
import { initials, type TeamMember } from "@/lib/data";

/**
 * Full profile card for the /team page: portrait slot on top, then the same
 * name / role / credentials / expandable-bio treatment as the homepage
 * TeamCard, so the two stay visually related.
 *
 * The portrait ships as a styled placeholder. To drop the real photo in,
 * replace the placeholder <div> below with:
 *
 *   <Image
 *     src={`/images/team/${photoSlug(member.name)}.jpg`}   // 800×1000 (4:5) portrait
 *     alt={member.name}
 *     width={800} height={1000} loading="lazy"
 *     sizes="(max-width: 640px) 100vw, 340px"
 *     className="block h-auto w-full border-b border-[#E5E4E0] object-cover"
 *   />
 */

/** "Nayyar Hayat" → "nayyar-hayat", the expected filename under /public/images/team/. */
export const photoSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function TeamProfileCard({ member }: { member: TeamMember }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col border border-[#E5E4E0] bg-white">
      {/* Replace with an 800×1000 (4:5) professional portrait —
          /public/images/team/{photoSlug(member.name)}.jpg */}
      <div
        data-image-placeholder={`Portrait — ${member.name}`}
        aria-hidden="true"
        className="relative flex aspect-[4/5] items-center justify-center overflow-hidden border-b border-[#E5E4E0] bg-[linear-gradient(150deg,#F5F8FC_0%,#F1F3F0_100%)]"
      >
        <span className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-[#C8D6EB]" />
        <span className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r border-t border-[#C8D6EB]" />
        <span className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b border-l border-[#C8D6EB]" />
        <span className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-[#C8D6EB]" />

        <div className="px-6 text-center">
          <div className="mx-auto mb-4 grid h-[64px] w-[64px] place-items-center bg-[#E8EEF7] font-serif text-[22px] text-[#1E4B8F]">
            {initials(member.name)}
          </div>
          <div className="eyebrow text-[10px] tracking-[2.2px] text-[#1E4B8F]">
            Photo placeholder
          </div>
          <div className="mt-2 text-[12px] leading-[1.5] text-[#8A94A6]">
            /images/team/{photoSlug(member.name)}.jpg · 4:5
          </div>
        </div>
      </div>

      <div className="flex grow flex-col p-[26px]">
        <div className="font-serif text-[20px] text-[#1B2430]">
          {member.name}
        </div>
        <div className="mt-[2px] text-[13.5px] font-semibold text-[#1E4B8F]">
          {member.role}
        </div>

        {member.creds && (
          <div className="mt-[10px] text-[13px] uppercase tracking-[0.5px] text-[#4B5563]">
            {member.creds}
          </div>
        )}

        <p className="m-0 mt-3 text-[15px] leading-[1.65] text-[#374151]">
          {member.bio}
        </p>

        {member.more && (
          <>
            {expanded && (
              <p className="m-0 mt-[10px] text-[15px] leading-[1.65] text-[#374151]">
                {member.more}
              </p>
            )}
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="mt-3 cursor-pointer self-start border-none bg-transparent p-0 font-sans text-[14px] font-bold text-[#1E4B8F]"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
