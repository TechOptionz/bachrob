import { NextResponse } from "next/server";
import { askAleesa, isAleesaChatEnabled } from "@/lib/aleesa/webchat";

const MAX_MESSAGE = 2000;

const text = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

/** Answers one chat turn through Aleesa Web Chat. */
export async function POST(request: Request) {
  if (!isAleesaChatEnabled()) {
    return NextResponse.json({ error: "Chat is not configured" }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const message = text(body?.text, MAX_MESSAGE);
  const sessionId = text(body?.sessionId, 64);
  if (!message) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }
  // Minted client-side as `chat_<uuid>`; the id groups the Aleesa inbox
  // thread, so a junk one must not reach it.
  if (!/^[A-Za-z0-9_-]{8,}$/.test(sessionId)) {
    return NextResponse.json({ error: "Invalid session" }, { status: 400 });
  }

  try {
    const reply = await askAleesa({
      text: message,
      sessionId,
      page: text(body?.page, 200) || undefined,
    });
    return NextResponse.json({ reply });
  } catch (error) {
    // Never surface provider internals to the browser.
    console.error("[chat] Aleesa failed", error);
    return NextResponse.json(
      { error: "The assistant is unavailable right now." },
      { status: 502 },
    );
  }
}
