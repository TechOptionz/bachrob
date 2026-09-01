import type { Metadata, Viewport } from "next";
import { Libre_Caslon_Text, Source_Sans_3 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import ChatBot from "@/components/ChatBot";
import { chatConfig } from "@/lib/chatbot";
import "./globals.css";

const libreCaslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-libre-caslon",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-source-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bachrob.com.au"),
  title: {
    default: "Bachmann Robinson | Accountants, Auditors & Tax Agents, Ipswich",
    template: "%s | Bachmann Robinson",
  },
  description:
    "Local Ipswich accountants, auditors and registered tax agents helping individuals, businesses and self-managed super funds for more than three decades.",
  keywords: [
    "accountants Ipswich",
    "tax agent Ipswich",
    "SMSF administration",
    "auditors Queensland",
    "business activity statements",
    "Bachmann Robinson",
  ],
  icons: { icon: "/assets/br-mark.png" },
  openGraph: {
    title: "Bachmann Robinson | Accountants, Auditors & Tax Agents",
    description:
      "An accounting firm where people come first. Serving Ipswich, Queensland since 1990.",
    url: "/",
    siteName: "Bachmann Robinson",
    locale: "en_AU",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#16396E",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={`${libreCaslon.variable} ${sourceSans.variable}`}>
      <body>
        {/* Scroll-reveal wrappers ship at opacity 0 and are un-hidden by JS.
            Without JavaScript they must stay visible. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        {children}
        {/* Site-wide chat assistant. The knowledge base is built server-side
            from the same data the pages render, so answers never drift. */}
        <ChatBot config={chatConfig} />
        <Analytics />
      </body>
    </html>
  );
}
