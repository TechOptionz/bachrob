import Reveal from "@/components/service/Reveal";
import { googleReviews } from "@/lib/reviews";

/**
 * Google reviews band, directly below the KEYOB partnership section.
 *
 * A white sheet after KEYOB's deep navy keeps the page's light/dark rhythm
 * before the cream contact section. Only reviews rated at or above the
 * threshold in lib/reviews are rendered, and every quote is verbatim from the
 * firm's Google listing — the star rows use Google's review gold so the
 * source is recognisable at a glance.
 */

const STAR_PATH =
  "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z";

function Stars({ rating, size = 18 }: { rating: number; size?: number }) {
  return (
    <span
      role="img"
      aria-label={`Rated ${rating} out of 5 stars`}
      className="inline-flex gap-[3px]"
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          aria-hidden="true"
          width={size}
          height={size}
          fill={i < rating ? "#FBBC04" : "#E5E4E0"}
        >
          <path d={STAR_PATH} />
        </svg>
      ))}
    </span>
  );
}

export default function GoogleReviews() {
  const shown = googleReviews.reviews.filter(
    (r) => r.rating >= googleReviews.minRating,
  );

  return (
    <section aria-label="Client reviews" className="section bg-white">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
          <Reveal variant="left">
            <div className="eyebrow mb-[14px] text-[#1E4B8F]">
              Client reviews
            </div>
            <h2 className="m-0 max-w-[22ch] font-serif text-[30px] font-normal leading-[1.2] text-pretty md:text-[40px]">
              Our clients put it better than we could.
            </h2>
          </Reveal>

          {/* Aggregate score from the firm's Google Business profile. */}
          <Reveal variant="right" delay={90}>
            <div className="flex items-center gap-5 lg:pb-2">
              <span className="font-serif text-[56px] leading-none tracking-[-0.01em] text-[#1B2430]">
                {googleReviews.rating}
              </span>
              <span className="flex flex-col gap-[6px]">
                <Stars rating={Math.round(googleReviews.rating)} size={20} />
                <span className="text-[13px] font-semibold uppercase tracking-[1.6px] text-[#6B7280]">
                  Google rating
                </span>
              </span>
            </div>
          </Reveal>
        </div>

        <ul className="mt-12 grid list-none grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-px p-0 md:mt-14">
          {shown.map((r, i) => (
            <Reveal as="li" key={r.name} delay={i * 90} variant="rise">
              <figure className="m-0 flex h-full flex-col bg-white px-7 py-8 shadow-[0_0_0_1px_#E5E4E0] transition-colors duration-300 hover:bg-[#F5F8FC]">
                <Stars rating={r.rating} />
                <blockquote className="m-0 mt-5 flex-1 text-[15.5px] leading-[1.7] text-[#374151]">
                  &ldquo;{r.text}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-[#E5E4E0] pt-4">
                  <span className="block text-[15px] font-semibold text-[#1B2430]">
                    {r.name}
                  </span>
                  <span className="mt-[2px] block text-[12px] font-semibold uppercase tracking-[1.4px] text-[#6B7280]">
                    Review on Google
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={140}>
          <div className="mt-10 md:mt-12">
            <a
              href={googleReviews.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rule-link"
            >
              Read all reviews on Google
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
