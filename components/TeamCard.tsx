"use client";

import { useState } from "react";
import { initials, type TeamMember } from "@/lib/data";

export default function TeamCard({ member }: { member: TeamMember }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-[#E5E4E0] bg-white p-[26px]">
      <div className="mb-[14px] flex items-center gap-4">
        <div className="grid h-[52px] w-[52px] shrink-0 place-items-center bg-[#E8EEF7] font-serif text-[19px] text-[#1E4B8F]">
          {initials(member.name)}
        </div>
        <div>
          <div className="font-serif text-[19px]">{member.name}</div>
          <div className="text-[13.5px] font-semibold text-[#1E4B8F]">
            {member.role}
          </div>
        </div>
      </div>

      {member.creds && (
        <div className="mb-[10px] text-[13px] uppercase tracking-[0.5px] text-[#4B5563]">
          {member.creds}
        </div>
      )}

      <p className="m-0 text-[15px] leading-[1.65] text-[#374151]">
        {member.bio}
      </p>

      {member.more && (
        <>
          {expanded && (
            <p className="mb-0 mt-[10px] text-[15px] leading-[1.65] text-[#374151]">
              {member.more}
            </p>
          )}
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="mt-3 cursor-pointer border-none bg-transparent p-0 font-sans text-[14px] font-bold text-[#1E4B8F]"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        </>
      )}
    </div>
  );
}
