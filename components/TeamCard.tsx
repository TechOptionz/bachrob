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
          <div className="font-serif text-[18px]">{member.name}</div>
          <div className="text-[13.5px] font-semibold text-[#1E4B8F]">
            {member.role}
          </div>
        </div>
      </div>

      {member.creds && (
        <div className="mb-[10px] text-[12.5px] uppercase tracking-[0.5px] text-[#6B7280]">
          {member.creds}
        </div>
      )}

      <p className="m-0 text-[14.5px] leading-[1.6] text-[#4B5563]">
        {member.bio}
      </p>

      {member.more && (
        <>
          {expanded && (
            <p className="mb-0 mt-[10px] text-[14.5px] leading-[1.6] text-[#4B5563]">
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
