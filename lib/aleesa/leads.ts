/**
 * Adapter for the Aleesa Website Form intake. Server-only — it reads the
 * tenant key, and is imported solely by app/api/contact/route.ts.
 *
 *   POST {ALEESA_API_URL}/api/v1/integrations/website-form/submit
 *   x-api-key: wform_…
 *   {
 *     "formId":    "contact-form",
 *     "originUrl": "https://bachrob.com.au/contact",
 *     "fields":    { "full_name": "…", "email": "…", … }
 *   }
 *
 *   -> 201 { "success": true, "data": { "submissionId": "…", "leadId": "L-…" } }
 *
 * Aleesa derives the contact record from the field *names* — `full_name` /
 * `name`, `email` and `phone` — so those keys are part of the contract, not
 * cosmetic. Everything else is carried through onto the lead's notes.
 */

const TIMEOUT_MS = 15_000;

const PATH = "/api/v1/integrations/website-form/submit";

/* The dashboard card can print the submit URL against "api-aleesa.ai", which
   does not resolve; api.aleesa.ai is the host that answers. */
const DEFAULT_API_URL = "https://api.aleesa.ai";

const SITE_URL = "https://bachrob.com.au";

export type ContactLead = {
  name: string;
  email: string;
  phone?: string;
  topic?: string;
  message: string;
};

export const isAleesaFormEnabled = () =>
  Boolean(process.env.ALEESA_WEBSITE_FORM_API_KEY);

function endpoint(): string {
  const configured = (process.env.ALEESA_API_URL || DEFAULT_API_URL).replace(
    /\/+$/,
    "",
  );
  // The dashboard prints the *full* submit URL, so accept it pasted with the
  // path already on — appending blindly would POST to …/submit/api/v1/… and 404.
  const base = configured.endsWith(PATH)
    ? configured.slice(0, -PATH.length)
    : configured;
  return `${base}${PATH}`;
}

/**
 * Files the enquiry as a Lead in Aleesa. Throws when Aleesa rejects it — a 401
 * means the key is wrong, regenerated, or the integration was disconnected.
 */
export async function sendLeadToAleesa(lead: ContactLead): Promise<void> {
  const apiKey = process.env.ALEESA_WEBSITE_FORM_API_KEY;
  if (!apiKey) throw new Error("ALEESA_WEBSITE_FORM_API_KEY is not set");

  const fields: Record<string, string | undefined> = {
    full_name: lead.name,
    email: lead.email,
    phone: lead.phone,
    topic: lead.topic,
    message: lead.message,
  };

  const response = await fetch(endpoint(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Header rather than body, to keep the key out of request-body logging.
      "x-api-key": apiKey,
    },
    body: JSON.stringify({
      formId: "contact-form",
      originUrl: `${SITE_URL}/contact`,
      // Aleesa never records an empty field, so drop the blanks.
      fields: Object.fromEntries(
        Object.entries(fields).filter(([, v]) => Boolean(v?.trim())),
      ),
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  const body = (await response.json().catch(() => null)) as {
    success?: boolean;
    message?: unknown;
    data?: { submissionId?: unknown; leadId?: unknown };
  } | null;

  if (!response.ok || body?.success === false) {
    const detail = typeof body?.message === "string" ? `: ${body.message}` : "";
    throw new Error(`Aleesa website form responded ${response.status}${detail}`);
  }

  // Aleesa can store the submission without creating a CRM Lead. The visitor
  // is still answered, but make the gap visible in the logs.
  if (!body?.data?.leadId) {
    console.warn("[contact] Aleesa stored the submission but created no Lead", {
      submissionId: body?.data?.submissionId,
    });
  }
}
