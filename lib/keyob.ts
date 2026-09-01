/**
 * KEYOB — the firm's technology partner. One record drives every promo
 * placement (strip, cards, bands, the /about section), so the discount or a
 * link can be changed in exactly one place.
 */
export const keyob = {
  name: "KEYOB",
  url: "https://keyob.com",
  contactUrl: "https://keyob.com/contact",
  discount: "10%",
  logoNavy: "/assets/keyob-logo-navy.png",
  logoWhite: "/assets/keyob-logo-white.png",
  /* KEYOB brand palette — used only inside the partner components. */
  navy: "#14295A",
  navy2: "#1B356E",
  cyan: "#01BCFE",
  ice: "#DCE6F5",
  green: "#20C997",
} as const;

/** Every promo placement carries this so the relationship is unambiguous. */
export const keyobDisclaimer =
  "KEYOB is an independent technology provider. Any engagement is between you and KEYOB, and is separate from the accounting and financial services provided by Bachmann Robinson.";
