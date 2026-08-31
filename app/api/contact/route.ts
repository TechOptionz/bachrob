import { NextResponse } from "next/server";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  topic?: string;
  message?: string;
  consent?: string;
};

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email and message are required." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  // Delivery is not wired up yet. Plug in the firm's mail provider here
  // (Resend, SendGrid, SMTP, …) and send to admin@bachrob.com.au.
  console.log("[contact]", {
    name,
    email,
    phone: body.phone?.trim() ?? "",
    topic: body.topic?.trim() ?? "",
    message,
  });

  return NextResponse.json({ ok: true });
}
