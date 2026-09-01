# Mobile Audit — bachrob.com.au

Audited 2026-09-02 against the running dev server. Every page was loaded in a
real browser (headless Edge over CDP) with device emulation at **320, 375, 390,
414 and 768px**, measured at three moments per page: initial load (pre-reveal),
after scrolling to the bottom (all reveals fired), and back at the top. The
mobile menu was exercised interactively at 320 and 390px. Every component and
page file was read in full.

Pages covered: `/`, `/about`, `/team`, `/services`,
`/services/income-tax-returns`, `/services/smsf-administration`, `/resources`,
`/resources/preparing-your-business-for-growth`, `/contact`.

## Verified clean (no action needed)

- **No horizontal scroll anywhere.** `scrollWidth === innerWidth` on all 9
  pages × 5 widths × 3 scroll states (135 measurements, zero overflows). The
  `translateX(±30px)` reveal variants stay inside the gutters.
- **Gutters are consistent**: 40px inline, stepping to 20px below 640px via the
  shared `.section`/`.gutter` classes — one root, all sections inherit it.
- **All grids collapse to one column cleanly** (`auto-fit/auto-fill` +
  `minmax(min(Npx,100%),1fr)` throughout), in sensible order — the alternating
  `[direction:rtl]` rows on /services only flip at `lg`, so mobile always reads
  text-then-image.
- **Headings wrap without breaking layout at 320px** (verified live, incl. the
  40px hero serif).
- **Anchor links land clear of the sticky header**: every target carries
  `scroll-mt-24`/`scroll-mt-28` (≥96px offset vs the 74px header).
- **Safe-area insets: not required.** `viewport-fit=cover` is never set, so the
  browser keeps content out of the notch/home-indicator on its own.
- **Menu closes on route change**: every menu link closes it `onClick`, and Nav
  remounts per page, so back/forward also resets it. (Fragile if Nav ever moves
  into the shared layout — noted, not an issue today.)
- **No CLS from images**: every image has explicit dimensions or an
  `aspect-ratio` box; `sizes` present on all `next/image` uses.
- **Accordions/modals/tabs all open on touch**: FAQ is native
  `<details>/<summary>`, team modal + chat are buttons; team modal locks body
  scroll, traps focus, closes on Escape/backdrop/× (the reference
  implementation the nav menu should copy).
- **Team carousel is fully swipeable** (native overflow + scroll snap; arrows
  are a bonus, 44×44). The credentials marquee's hover-pause loses nothing on
  touch — items aren't interactive.
- **Footer**: all four columns present on mobile, nothing dropped.
- **Forms**: inputs full width, correct types (`email`, `tel` → right
  keyboards), errors inline with `aria-describedby`.
- **No `<table>` anywhere** in the codebase.
- **Contact map**: card sits above the map in flow on mobile — pin never
  covered.
- **Reduced-motion**: all animation neutralised under
  `prefers-reduced-motion` — good for mobile OS-level settings.

## Findings — 19 total (1 high · 8 medium · 5 low · 5 intentional/informational)

Severity: **H** = broken/unreachable on a phone · **M** = real usability cost ·
**L** = polish · **I** = deliberate hide, listed for sign-off as requested.

### 1 · Navigation

| # | Page | Section | Issue | Sev | file:line | Proposed fix |
|---|------|---------|-------|-----|-----------|--------------|
| 1 | all | Mobile menu | **Menu tail unreachable on short viewports.** The open menu renders inline inside the sticky `<nav>` with no height cap and no internal scroll. With the Services accordion expanded the menu bottom measured **1008px in a 660px viewport**; the nav doesn't scroll internally (verified), so “Book a consultation”, Contact and the last services are untappable. Root cause of #2 as well. | **H** | components/Nav.tsx:186 | Cap the open menu at `max-h-[calc(100dvh-74px)]` with `overflow-y-auto` (74px = measured header row height, comment it), or convert to a fixed full-height drawer. Mobile-only; desktop untouched. |
| 2 | all | Mobile menu | **Page scrolls behind the open menu** (verified live — `window.scrollY` moves with the menu open). | M | components/Nav.tsx:186 | Lock body scroll while open, exactly as TeamProfileModal.tsx:34 already does (`document.body.style.overflow = "hidden"` in an effect). |
| 3 | all | Mobile menu | **Escape doesn't close the menu** (verified live). | M | components/Nav.tsx:159 | `keydown` listener while open; return focus to the hamburger. TeamProfileModal has the pattern. |
| 4 | all | Mobile menu | **Tapping outside doesn't close the menu** (verified live). | M | components/Nav.tsx:186 | Backdrop element under the menu (doubles as the scrim that makes the scroll-lock legible), or an outside-pointerdown handler. |
| 5 | all | Header | **Hamburger squeezed at 320px**: flexbox compresses the `h-10 w-10` button to **33×40** (measured) — under the 44×44 target even at full size. Brand/burger don't collide (24px gap at 320) but only because the button gives way. | M | components/Nav.tsx:165 | Add `shrink-0` and enlarge to `h-11 w-11` (44px). No desktop impact (`lg:hidden`). |
| 6 | all | Desktop nav ≥1024px | **Services dropdown is hover/focus-only.** On touch tablets wide enough for the desktop nav (iPad Pro landscape = 1024px) a tap on “Services” navigates to /services instead of opening the panel. A tap path to every service exists (the /services index), so this is degraded, not broken. | L | components/Nav.tsx:92-134 | Acceptable as-is; if desired, make the chevron a separate tap-toggle button. Would touch desktop markup — ask first. |

### 2 · Nothing hidden

Every `display:none`-at-mobile, clamp and off-screen case in the codebase, with
an intentional/unintentional verdict:

| # | Page | Section | What's hidden on mobile | Verdict | Sev | file:line | Proposed fix |
|---|------|---------|------------------------|---------|-----|-----------|--------------|
| 7 | /services | Sidebar | **The whole left sidebar** (`hidden lg:block`): the “On this page” index of all 9 services *and* the KEYOB 15%-discount promo card. Below 1024px there is no jump navigation over ~9 screens of service blocks, and this page's KEYOB placement vanishes with no substitute. | Index: semi-intentional (common pattern, but a mobile substitute exists in-house — ServiceSubnav). Promo: collateral damage, likely unintentional. | M | app/services/page.tsx:64 | Add a horizontal scrollable jump bar (reuse ServiceSubnav) under the hero below `lg`, and a `KeyobCard` before the CTA. Desktop unchanged. |
| 8 | all | KEYOB top strip | “Our IT partner” label + KEYOB logo (`max-sm:hidden`). Discount message + “Learn more” CTA remain. | **Intentional** declutter of an 11px credit at phone widths. | I | components/partner/KeyobStrip.tsx:50 | Leave as is. |
| 9 | /resources, articles, service pages | KEYOB card | “In partnership with” + logo (`max-sm:hidden`). Partner is still named in the card's eyebrow. | **Intentional.** | I | components/partner/KeyobCard.tsx:60 | Leave as is. |
| 10 | service pages | Hero | “Since 1990” navy badge + offset hairline frame (`hidden sm:block`) — decorative overlays that would crowd a phone-width photo. The fact itself appears in hero copy/footer. | **Intentional.** | I | components/service/ServiceHero.tsx:93-99 | Leave as is. |
| 11 | service pages | Subnav | “On this page” label hidden < `md`; phone number hidden < `lg`. The jump links themselves stay, scrollable by swipe. Phone number is repeated in hero, CTA band and footer. | **Intentional.** | I | components/service/ServiceSubnav.tsx:20,37 | Leave as is. |
| 12 | /, /team | Team bios | `line-clamp-5` on home rail bios, `line-clamp-2` on /team card teasers. Full text is reachable — the /team profile modal carries the whole bio (verified it opens on touch). Clamps apply equally on desktop. | **Intentional** teaser pattern. | I | components/home/TeamPreview.tsx:150; components/TeamProfileCard.tsx:63 | Leave as is. |

No other hidden content exists: no clipped fixed-height text, no unreachable
carousel items, no footer/sidebar drops beyond the above, no off-screen
overflows (measured).

### 3 · Images

| # | Page | Section | Issue | Sev | file:line | Proposed fix |
|---|------|---------|-------|-----|-----------|--------------|
| 13 | /team (+ modal) | Portraits | **Full-size 800×1000 JPGs (125–215KB each, ~1.7MB for the roster) served to phones** for 124px-wide card slots — the `unoptimized` prop bypasses `srcset` entirely. NOTE: `unoptimized` is a deliberate workaround for the dev-machine `/_next/image` AVIF-encode hang; a fix must not reintroduce that locally. | M | components/TeamProfileCard.tsx:41; components/TeamProfileModal.tsx:94 | Pre-generate small variants (e.g. 248px/640px) as static files and pick via `<picture>`/manual `srcSet`, or gate `unoptimized` to dev only (`process.env.NODE_ENV`). Needs your call on approach. |
| 14 | / | About photo | Team panorama locked to `aspect-[2.6/1]`: at 320px the band is ~107px tall — ten people become barely recognisable. Nobody is cropped out (the overscan math is sound); it's a legibility question. | L | components/About.tsx:94 | Optional: taller ratio below `sm` (e.g. `aspect-[16/9] sm:aspect-[2.6/1]`); parallax overscan percentages would need a matching mobile value. Desktop untouched. |

Everything else passes: dimensions/`sizes` everywhere, `object-cover` crops
audited (portraits `object-top`, group shot overscan keeps all faces), the
/team full-bleed hero swaps to an uncovered photo strip below `lg`, no CSS
background photos, grids go single-column.

### 4 · Section-by-section alignment, touch & type

| # | Page | Section | Issue | Sev | file:line | Proposed fix |
|---|------|---------|-------|-----|-----------|--------------|
| 15 | /, /contact + chat | Forms | **iOS auto-zoom on focus**: form fields are 15px (`fieldBase`), chat composer 14px — Safari zooms the whole page when a field under 16px is focused, and doesn't zoom back out. | M | components/ContactForm.tsx:15; components/ChatBot.tsx:227 | Mobile-first: 16px base on the fields, `md:` restores current size so desktop is pixel-identical. |
| 16 | /, /contact | Contact form | **Placeholder-only labels** (aria-labels exist, but nothing visible once the user types; your spec asks for visible labels). | M | components/ContactForm.tsx:177-258 | Add small visible `<label>`s above fields. **Affects desktop appearance — flagging per your rule; won't touch without a yes.** |
| 17 | site-wide | Card body copy | **Body text below 16px** in most card grids: Services desc 15.5 (Services.tsx:57), WhyUs 15.5 (WhyUs.tsx:103), team bios 15 (TeamPreview.tsx:150), contact details 15.5 (Contact.tsx:17), Considerations 15.5 (:41), ResourceCard desc 14.5 (:142), ResourceLinks desc 13.5 (:60), KeyobCard 15 (:40), profile modal 15.5 (:133). Main editorial copy is fine (16.5–17px). | M | (per instance) | Raising these is a **site-wide, desktop-visible type change** — needs your decision. A mobile-only bump (base 16px, `md:` back to current) is possible but doubles the utility count; say which way you want it. |
| 18 | site-wide | Tap targets | **Under-44px interactive elements** (all verified from code/measure): KEYOB strip dismiss ≈35px (KeyobStrip.tsx:66) and “Learn more” ≈30px tall (:57); chat close 32px (ChatBot.tsx:124) and reply chips ≈26px (:187); profile-modal close 36px (TeamProfileModal.tsx:109); consent checkbox native ~14px (ContactForm.tsx:249); `rule-link` text CTAs ≈26px tall (globals.css:88); footer link rows ≈25px at 9px gaps (Footer.tsx:65); mobile submenu links ≈42px (Nav.tsx:234). | L | (per instance) | Grow hit areas with padding/negative margin or `min-h` — no visual change needed for most. Checkbox: scale or larger custom box. |
| 19 | site-wide | Meta text | 13–14px on TopBar (TopBar.tsx:5), breadcrumbs (Breadcrumbs.tsx:17), captions, form error messages (13px). Conventional for meta text; listed for completeness. | L | (per instance) | Suggest leaving all except form errors (13px → 14–15px). |

## Suggested fix order (after your review)

1. **#1** menu unreachable (H) — plus #2/#3/#4 in the same pass, one root: make
   the mobile menu a proper overlay (height-capped, scroll-locked, Escape,
   outside-tap), copying the already-correct TeamProfileModal behaviour.
2. **#5** hamburger `shrink-0` + 44px.
3. **#15** input font sizes (iOS zoom).
4. **#7** /services mobile jump bar + restored KEYOB card.
5. **#13** team portrait weight (need your call on approach).
6. **#16/#17** visible labels + type scale — **both desktop-visible; awaiting
   your decision.**
7. **#18** tap-target padding pass; **#14/#19** optional polish.

Decisions needed from you: #16 (visible labels), #17 (raise card copy globally
vs mobile-only), #13 (variant files vs dev-only `unoptimized`), #6 (leave
tablet dropdown as-is?).
