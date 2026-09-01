import Link from "next/link";

export type Crumb = { label: string; href?: string };

export default function Breadcrumbs({
  items,
  /** "dark" flips the trail to light type for heroes laid over a photograph. */
  tone = "light",
}: {
  items: Crumb[];
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <nav
      aria-label="Breadcrumb"
      className={`text-[14px] ${dark ? "text-white/70" : "text-[#4B5563]"}`}
    >
      <ol className="m-0 flex list-none flex-wrap items-center gap-x-2 gap-y-1 p-0">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className={
                    dark
                      ? "text-white/80 underline-offset-4 hover:text-white hover:underline"
                      : "text-[#374151] underline-offset-4 hover:text-[#1E4B8F] hover:underline"
                  }
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? "page" : undefined}
                  className={dark ? "text-white" : "text-[#1B2430]"}
                >
                  {item.label}
                </span>
              )}
              {last ? null : (
                <span
                  aria-hidden="true"
                  className={dark ? "text-white/40" : "text-[#C8D6EB]"}
                >
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
