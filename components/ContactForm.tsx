"use client";

import { useState } from "react";

const topics = [
  "Individual tax return",
  "Business tax & accounting",
  "Self-managed super fund",
  "Audit",
  "Bookkeeping",
  "Something else",
];

const fieldBase =
  "w-full box-border border px-[14px] py-3 text-[15px] outline-none";

function fieldClass(invalid: boolean) {
  return `${fieldBase} ${
    invalid
      ? "border-[#B42318] focus:border-[#B42318]"
      : "border-[#D1D5DB] focus:border-[#1E4B8F]"
  }`;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const fieldOrder = ["name", "email", "phone", "message", "consent"] as const;
type Field = (typeof fieldOrder)[number];
type Errors = Partial<Record<Field, string>>;

function fieldError(field: Field, raw: FormDataEntryValue | null) {
  const value = typeof raw === "string" ? raw.trim() : "";
  switch (field) {
    case "name":
      if (!value) return "Please enter your name.";
      if (value.length < 2 || !/[a-zA-Z]/.test(value))
        return "Please enter your name using letters.";
      if (value.length > 100) return "Name must be 100 characters or fewer.";
      return;
    case "email":
      if (!value) return "Please enter your email address.";
      if (value.length > 254 || !EMAIL_RE.test(value))
        return "Please enter a valid email address, e.g. name@example.com.";
      return;
    case "phone": {
      if (!value) return; // optional
      const digits = value.replace(/\D/g, "").length;
      if (!/^\+?[\d\s().-]+$/.test(value) || digits < 8 || digits > 15)
        return "Please enter a valid phone number, e.g. (07) 3810 1000.";
      return;
    }
    case "message":
      if (!value) return "Please enter a message.";
      if (value.length < 10)
        return "Please tell us a little more (at least 10 characters).";
      if (value.length > 2000)
        return "Message must be 2000 characters or fewer.";
      return;
    case "consent":
      if (!raw) return "Please tick the box so we can respond to your enquiry.";
      return;
  }
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="m-0 mt-[6px] text-[13px] leading-[1.5] text-[#B42318]">
      {message}
    </p>
  );
}

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});

  function errorProps(field: Field) {
    return {
      "aria-invalid": errors[field] ? true : undefined,
      "aria-describedby": errors[field] ? `${field}-error` : undefined,
    };
  }

  // Once a field has been flagged, clear its error as soon as the fix is typed.
  function revalidate(
    e: React.FormEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const el = e.currentTarget;
    const field = el.name as Field;
    if (!errors[field]) return;
    const raw =
      el instanceof HTMLInputElement && el.type === "checkbox"
        ? el.checked
          ? "on"
          : null
        : el.value;
    if (!fieldError(field, raw)) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    const nextErrors: Errors = {};
    for (const field of fieldOrder) {
      const message = fieldError(field, data.get(field));
      if (message) nextErrors[field] = message;
    }
    setErrors(nextErrors);

    const firstInvalid = fieldOrder.find((f) => nextErrors[f]);
    if (firstInvalid) {
      const el = form.elements.namedItem(firstInvalid);
      if (el instanceof HTMLElement) el.focus();
      return;
    }

    setSending(true);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      topic: String(data.get("topic") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      consent: data.get("consent") ? "on" : "",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setSent(true);
      form.reset();
    } catch {
      setError(
        "Sorry — your message could not be sent. Please call (07) 3810 1000 or email admin@bachrob.com.au.",
      );
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="border border-[#E5E4E0] bg-white p-9">
        <div className="px-5 py-10 text-center">
          <div className="mb-3 font-serif text-[24px]">Thank you</div>
          <p className="m-0 text-[16px] leading-[1.6] text-[#374151]">
            Your message has been received. We&rsquo;ll get back to you as soon
            as possible — usually within one business day.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-[#E5E4E0] bg-white p-6 md:p-9">
      <div className="mb-[22px] font-serif text-[21px]">Write to us here</div>
      <form onSubmit={onSubmit} noValidate className="grid gap-[14px]">
        <div>
          <input
            name="name"
            required
            maxLength={100}
            placeholder="Your name"
            aria-label="Your name"
            className={fieldClass(!!errors.name)}
            onInput={revalidate}
            {...errorProps("name")}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>
        <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2">
          <div>
            <input
              name="email"
              type="email"
              required
              maxLength={254}
              placeholder="Email"
              aria-label="Email"
              className={fieldClass(!!errors.email)}
              onInput={revalidate}
              {...errorProps("email")}
            />
            <FieldError id="email-error" message={errors.email} />
          </div>
          <div>
            <input
              name="phone"
              type="tel"
              maxLength={20}
              placeholder="Phone (optional)"
              aria-label="Phone (optional)"
              className={fieldClass(!!errors.phone)}
              onInput={revalidate}
              {...errorProps("phone")}
            />
            <FieldError id="phone-error" message={errors.phone} />
          </div>
        </div>
        <select
          name="topic"
          defaultValue=""
          aria-label="What can we help with?"
          className={`${fieldClass(false)} bg-white text-[#374151]`}
        >
          <option value="">What can we help with?</option>
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <div>
          <textarea
            name="message"
            required
            rows={4}
            maxLength={2000}
            placeholder="Your message"
            aria-label="Your message"
            className={`${fieldClass(!!errors.message)} resize-y`}
            onInput={revalidate}
            {...errorProps("message")}
          />
          <FieldError id="message-error" message={errors.message} />
        </div>
        <div>
          <label className="flex items-start gap-[10px] text-[13.5px] leading-[1.5] text-[#6B7280]">
            <input
              type="checkbox"
              name="consent"
              required
              className="mt-[2px]"
              onChange={revalidate}
              {...errorProps("consent")}
            />
            I consent to Bachmann Robinson collecting my details through this
            form.
          </label>
          <FieldError id="consent-error" message={errors.consent} />
        </div>
        {error && (
          <p className="m-0 text-[14px] leading-[1.5] text-[#B42318]">{error}</p>
        )}
        <button
          type="submit"
          disabled={sending}
          className="cursor-pointer border-none bg-[#1E4B8F] p-[14px] font-sans text-[16px] font-bold text-white hover:bg-[#16396E] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {sending ? "Sending…" : "Send message"}
        </button>
      </form>
    </div>
  );
}
