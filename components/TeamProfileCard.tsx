"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { teamPhoto, type TeamMember } from "@/lib/data";
import TeamProfileModal from "./TeamProfileModal";

/**
 * Compact profile card for the /team page — portrait, name, role and a
 * two-line teaser. The full profile (credentials, bio, background) lives in
 * the popup dialog, opened by clicking anywhere on the card.
 *
 * Layout is two shapes in one markup pass. Below `sm` the card is a directory
 * row — a small portrait with the name beside it — because a full-bleed 4:5
 * portrait on a phone is half a screen of face before the reader learns
 * anything. From `sm` up the same blocks stack into a portrait-over-text card.
 *
 * The portraits are studio headshots on a pure-white backdrop, so the image is
 * multiplied over a light panel: the backdrop drops out and the subject sits on
 * the panel rather than on a white rectangle pasted into a white card.
 */
export default function TeamProfileCard({ member }: { member: TeamMember }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <article className="br-lift group relative grid h-full grid-cols-[124px_1fr] border border-[#E5E4E0] bg-white hover:border-[#C8D6EB] hover:shadow-[0_22px_48px_-24px_rgba(22,57,110,0.4)] sm:grid-cols-1">
        {/* 4:5 in the phone's narrow column, square once the portrait goes
            full-width. Cropped from the top so the headroom survives and the
            trim comes off the shoulders. */}
        <div className="relative aspect-[4/5] overflow-hidden bg-[#F1F3F6] sm:aspect-square">
          <Image
            src={teamPhoto(member.name)}
            alt={member.name}
            width={800}
            height={1000}
            loading="lazy"
            sizes="(max-width: 639px) 124px, (max-width: 1023px) 50vw, 360px"
            className="br-photo h-full w-full object-cover object-top mix-blend-multiply"
            unoptimized
          />
        </div>

        {/* Identity — beside the portrait on a phone, under it from sm up. */}
        <div className="flex min-w-0 flex-col justify-center px-5 py-4 sm:px-7 sm:pb-0 sm:pt-7">
          <span
            aria-hidden="true"
            className="mb-[14px] hidden h-[2px] w-7 bg-[#1E4B8F] transition-[width] duration-500 group-hover:w-12 sm:block"
          />

          <h3 className="m-0 font-serif text-[18px] font-normal leading-[1.25] text-[#1B2430] sm:text-[21px]">
            {member.name}
          </h3>
          <p className="m-0 mt-[3px] text-[13px] font-semibold leading-[1.4] text-[#1E4B8F] sm:text-[13.5px]">
            {member.role}
          </p>
        </div>

        {/* Teaser — spans both columns on a phone, continues the stack from
            sm up. Clamped to two lines; the popup carries the full story. */}
        <div className="col-span-2 flex grow flex-col px-5 pb-6 sm:col-span-1 sm:px-7 sm:pb-7">
          <p className="m-0 mt-4 line-clamp-2 text-[15px] leading-[1.7] text-[#374151]">
            {member.bio}
          </p>

          <span
            aria-hidden="true"
            className="mt-auto flex items-center gap-[6px] pt-5 font-sans text-[12px] font-semibold uppercase tracking-[1.1px] text-[#1E4B8F] group-hover:underline"
          >
            View profile
            <span className="inline-block text-[15px] leading-none transition-transform duration-300 group-hover:translate-x-[3px]">
              &rsaquo;
            </span>
          </span>
        </div>

        {/* One stretched button makes the whole card the click target without
            nesting interactive elements. */}
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          className="absolute inset-0 z-10 cursor-pointer border-none bg-transparent p-0"
        >
          <span className="sr-only">View profile — {member.name}</span>
        </button>
      </article>

      {open && (
        <TeamProfileModal
          member={member}
          onClose={() => {
            setOpen(false);
            triggerRef.current?.focus();
          }}
        />
      )}
    </>
  );
}
