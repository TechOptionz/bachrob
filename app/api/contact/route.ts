import { NextResponse } from "next/server";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  topic?: string;
  message?: string;
  consent?: string;
};

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

  // Delivery is not wired up yet. Plug in the firm's mail provider here
  // (Resend, SendGrid, SMTP, …) and send to admin@bachrob.com.au.
  console.log("[contact]", { name, email, phone, topic, message });

  return NextResponse.json({ ok: true });
}
