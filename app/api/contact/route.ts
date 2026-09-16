import { NextResponse } from "next/server";
import { isAleesaFormEnabled, sendLeadToAleesa } from "@/lib/aleesa/leads";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  topic?: string;
  message?: string;
  consent?: string;
  captchaToken?: string;
};

// Confirms a Cloudflare Turnstile token server-side.
async function verifyCaptcha(token: string, ip: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("[contact] TURNSTILE_SECRET_KEY is not set");
    return false;
  }
  const form = new URLSearchParams({ secret, response: token });
  if (ip) form.set("remoteip", ip);
  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body: form },
    );
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

const topics = [
  "Individual tax return",
  "Business tax & accounting",
  "Self-managed super fund",
  "Audit",
  "Bookkeeping",
  "Something else",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function bad(error: string) {
  return NextResponse.json({ error }, { status: 400 });
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return bad("Invalid request body");
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const topic = typeof body.topic === "string" ? body.topic.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (name.length < 2 || name.length > 100 || !/[a-zA-Z]/.test(name)) {
    return bad("Please provide your name.");
  }

  if (email.length > 254 || !EMAIL_RE.test(email)) {
    return bad("Please provide a valid email address.");
  }

  if (phone) {
    const digits = phone.replace(/\D/g, "").length;
    if (!/^\+?[\d\s().-]+$/.test(phone) || digits < 8 || digits > 15) {
      return bad("Please provide a valid phone number.");
    }
  }

  if (topic && !topics.includes(topic)) {
    return bad("Please choose a topic from the list.");
  }

  if (message.length < 10 || message.length > 2000) {
    return bad("Please provide a message between 10 and 2000 characters.");
  }

  if (!body.consent) {
    return bad("Please confirm your consent so we can respond to you.");
  }

  const captchaToken =
    typeof body.captchaToken === "string" ? body.captchaToken : "";
  const ip =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    null;
  if (!captchaToken || !(await verifyCaptcha(captchaToken, ip))) {
    return bad("Security check failed. Please try again.");
  }

  // Enquiries are filed as Leads in Aleesa. Without the key (local dev) they
  // are only logged — logs are not durable, so set it before launch.
  if (!isAleesaFormEnabled()) {
    console.log("[contact] Aleesa not configured", { name, email, phone, topic, message });
    return NextResponse.json({ ok: true });
  }

  try {
    await sendLeadToAleesa({ name, email, phone, topic, message });
  } catch (error) {
    // Aleesa is the only destination, so a failure must reach the visitor —
    // the form then tells them to call or email instead.
    console.error("[contact] Aleesa delivery failed", error);
    return NextResponse.json(
      { error: "Could not send your message." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
