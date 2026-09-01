import Image from "next/image";

import { keyob } from "@/lib/keyob";

/**
 * The KEYOB wordmark, extracted from the partner's own banner kit. Size it
 * with a height utility (e.g. `h-[14px]`) — the width follows automatically.
 */
export default function KeyobLogo({
  variant = "navy",
  className = "",
}: {
  /** `navy` for light surfaces, `white` for the KEYOB navy surfaces. */
  variant?: "navy" | "white";
  className?: string;
}) {
  const white = variant === "white";
  return (
    <Image
      src={white ? keyob.logoWhite : keyob.logoNavy}
      alt="KEYOB"
      width={white ? 223 : 219}
      height={white ? 47 : 44}
      className={`w-auto ${className}`}
    />
  );
}
