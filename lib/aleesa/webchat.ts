/**
 * Adapter for Aleesa Web Chat. Server-only — it reads the tenant key, and is
 * imported solely by app/api/chat/route.ts.
 *
 * Aleesa is *stateful*: the transcript, knowledge base and agent persona live
 * on its side, keyed by `sessionId`. So each call sends only the visitor's
 * latest turn. The bot is trained in the Aleesa dashboard (Knowledge Base +
 * Chat Agent), and every conversation lands in the Aleesa inbox where a human
 * can take over.
 *
 *   POST {ALEESA_WEBHOOK_URL}/webhooks/web-chat
 *   { "apiKey": "…", "sessionId": "chat_…", "text": "Hello", "metadata": {…} }
 *
 *   -> { "success": true, "sessionId": "chat_…", "reply": "…" }
 */

// A cold Aleesa agent has been seen taking ~50s on its first reply.
const TIMEOUT_MS = 60_000;

const PATH = "/webhooks/web-chat";

export const isAleesaChatEnabled = () =>
  Boolean(process.env.ALEESA_WEBHOOK_URL && process.env.ALEESA_WEBCHAT_API_KEY);

function endpoint(): string {
  const configured = (process.env.ALEESA_WEBHOOK_URL ?? "").replace(/\/+$/, "");
  if (!configured) throw new Error("ALEESA_WEBHOOK_URL is not set");
  // The setup guide prints the *full* endpoint, so accept it pasted with the
  // path already on rather than POSTing to /webhooks/web-chat/webhooks/web-chat.
  const base = configured.endsWith(PATH)
    ? configured.slice(0, -PATH.length)
    : configured;
  return `${base}${PATH}`;
}

export async function askAleesa(input: {
  text: string;
  sessionId: string;
  page?: string;
}): Promise<string> {
  const apiKey = process.env.ALEESA_WEBCHAT_API_KEY;
  if (!apiKey) throw new Error("ALEESA_WEBCHAT_API_KEY is not set");

  const response = await fetch(endpoint(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apiKey,
      sessionId: input.sessionId,
      text: input.text,
      metadata: {
        source: "website-widget",
        site: "bachrob.com.au",
        page: input.page,
      },
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Aleesa Web Chat responded ${response.status}`);
  }

  const body = (await response.json()) as {
    success?: boolean;
    reply?: unknown;
    message?: unknown;
  };

  // Aleesa can answer 200 with success:false (bad key, chat disabled for the
  // tenant). Treat that as a failure rather than showing an empty bubble.
  if (body.success === false) {
    throw new Error(
      typeof body.message === "string"
        ? `Aleesa Web Chat rejected the request: ${body.message}`
        : "Aleesa Web Chat rejected the request",
    );
  }

  const reply = typeof body.reply === "string" ? body.reply.trim() : "";
  if (!reply) throw new Error("Aleesa Web Chat returned no reply");
  return reply;
}
