/**
 * Seamless horizontal ticker.
 *
 * The track carries the row twice and travels exactly half its own width, so
 * the second copy lands where the first started and the loop never seams. The
 * duplicate is aria-hidden — screen readers announce the list once. Pauses on
 * hover and whenever anything inside takes keyboard focus (see globals.css).
 */
export default function Marquee({
  items,
  duration = 52,
  className = "",
}: {
  items: React.ReactNode[];
  /** Seconds for one full pass. Longer = calmer. */
  duration?: number;
  className?: string;
}) {
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="m-0 flex w-max shrink-0 list-none items-center gap-x-12 p-0 md:gap-x-16"
    >
      {items.map((item, i) => (
        <li key={i} className="shrink-0">
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`br-marquee overflow-hidden ${className}`}>
      <div
        className="br-marquee-track flex w-max gap-x-12 md:gap-x-16"
        style={
          { "--br-marquee-duration": `${duration}s` } as React.CSSProperties
        }
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
