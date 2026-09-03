"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { teamPhoto, site, type TeamMember } from "@/lib/data";

/**
 * The /team profile popup: a light editorial panel in the same language as the
 * roster cards — portrait column on the left, name, role, credentials and the
 * full bio on the right, closed by Escape, the × button or a backdrop click.
 *
 * The portraits are studio headshots on a pure-white backdrop, so the image is
 * multiplied over the panel's light grey — the backdrop drops out and the
 * subject sits on the panel instead of inside a pasted white rectangle.
 */
export default function TeamProfileModal({
  member,
  onClose,
}: {
  member: TeamMember;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const labelId = useId();

  const creds = member.creds
    ? member.creds.split("·").map((c) => c.trim()).filter(Boolean)
    : [];

  useEffect(() => {
    // The page must not scroll behind the dialog.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      // Minimal focus trap: Tab cycles within the dialog.
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && (active === first || !dialogRef.current.contains(active))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="br-dialog-backdrop fixed inset-0 z-[100] overflow-y-auto"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="pointer-events-none flex min-h-full items-center justify-center p-4 sm:p-8">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelId}
          className="pointer-events-auto w-full max-w-[880px]"
        >
          <div className="br-dialog-card grid overflow-hidden border border-[#E5E4E0] bg-white md:grid-cols-[minmax(0,320px)_1fr]">
            {/* Portrait — full-height column on desktop, banner on phones.
                The headshots are tight 4:5 crops with no headroom, so a
                cover crop into the wide phone banner loses the chin. Below
                md the whole portrait is contained instead, sitting on the
                panel's bottom edge with a little air above the head; the
                multiply blend drops the white backdrop into the panel grey so
                it reads as a cutout rather than a letterboxed photo. */}
            <div className="relative h-72 overflow-hidden bg-[#F1F3F6] sm:h-80 md:h-auto md:min-h-[480px]">
              <Image
                src={teamPhoto(member.name)}
                alt={member.name}
                width={800}
                height={1000}
                sizes="(max-width: 767px) 100vw, 320px"
                loading="eager"
                className="absolute inset-0 h-full w-full object-contain object-bottom pt-5 mix-blend-multiply md:object-cover md:object-top md:pt-0"
                unoptimized
              />
            </div>

            {/* Profile column. */}
            <div className="flex max-h-[70vh] flex-col overflow-y-auto p-6 sm:p-8 md:max-h-[85vh] md:p-10">
              <div className="flex items-start justify-between gap-4">
                <span className="eyebrow pt-2 text-[11px] text-[#8A94A6]">
                  Our team
                </span>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close profile"
                  className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center border border-[#E5E4E0] bg-transparent text-[18px] leading-none text-[#6B7280] transition-colors duration-200 hover:border-[#1E4B8F] hover:text-[#1E4B8F]"
                >
                  ×
                </button>
              </div>

              <div className="pt-4">
                <h2
                  id={labelId}
                  className="m-0 font-serif text-[28px] font-normal leading-[1.15] text-[#1B2430] sm:text-[34px]"
                >
                  {member.name}
                </h2>
                <p className="m-0 mt-2 text-[13.5px] font-semibold leading-[1.4] text-[#1E4B8F]">
                  {member.role}
                </p>
                {creds.length > 0 && (
                  <p className="m-0 mt-[6px] text-[13.5px] leading-[1.5] text-[#6B7280]">
                    {creds.join(" · ")}
                  </p>
                )}
              </div>

              <div className="mt-6 border-t border-[#ECEAE6] pt-6">
                <p className="m-0 text-[15.5px] leading-[1.75] text-[#374151]">
                  {member.bio}
                </p>
                {member.more && (
                  <p className="m-0 mt-4 text-[15.5px] leading-[1.75] text-[#374151]">
                    {member.more}
                  </p>
                )}
              </div>

              {/* Letterhead footer. */}
              <div className="mt-10 flex grow flex-wrap items-end justify-between gap-x-6 gap-y-1 border-t border-[#ECEAE6] pt-5 text-[12.5px] leading-[1.6] text-[#8A94A6]">
                <span>Bachmann Robinson</span>
                <span>{site.addressLine}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
