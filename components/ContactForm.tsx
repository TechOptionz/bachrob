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

const fieldClass =
  "w-full box-border border border-[#D1D5DB] px-[14px] py-3 text-[15px] outline-none focus:border-[#1E4B8F]";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError(null);

    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

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
      <form onSubmit={onSubmit} className="grid gap-[14px]">
        <input
          name="name"
          required
          placeholder="Your name"
          aria-label="Your name"
          className={fieldClass}
        />
        <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2">
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            aria-label="Email"
            className={fieldClass}
          />
          <input
            name="phone"
            type="tel"
            placeholder="Phone"
            aria-label="Phone"
            className={fieldClass}
          />
        </div>
        <select
          name="topic"
          defaultValue=""
          aria-label="What can we help with?"
          className={`${fieldClass} bg-white text-[#374151]`}
        >
          <option value="">What can we help with?</option>
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Your message"
          aria-label="Your message"
          className={`${fieldClass} resize-y`}
        />
        <label className="flex items-start gap-[10px] text-[13.5px] leading-[1.5] text-[#6B7280]">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-[2px]"
          />
          I consent to Bachmann Robinson collecting my details through this
          form.
        </label>
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
