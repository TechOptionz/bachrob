"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  matchEntry,
  type ChatConfig,
  type ChatLink,
} from "@/lib/chatbot/match";

type Msg = {
  from: "user" | "bot";
  text: string;
  links?: ChatLink[];
  chips?: string[];
};

/**
 * Floating chat assistant, mounted once in the root layout so the
 * conversation survives page navigation. Entirely rule-based: the knowledge
 * base arrives pre-built from the server (lib/chatbot) and matching happens
 * in `matchEntry`, so there is no API round-trip and nothing to rate-limit.
 *
 * Deliberately non-modal — the page stays scrollable and there is no focus
 * trap, just Escape to close with focus returned to the launcher.
 */
export default function ChatBot({ config }: { config: ChatConfig }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openChat = () => {
    setOpen(true);
    if (messages.length === 0) {
      setMessages([
        {
          from: "bot",
          text: config.greeting.text,
          links: config.greeting.links,
          chips: config.greeting.chips,
        },
      ]);
    }
  };

  const closeChat = () => {
    setOpen(false);
    launcherRef.current?.focus();
  };

  const ask = (question: string) => {
    const q = question.trim();
    if (!q || typing) return;
    setDraft("");
    setMessages((m) => [...m, { from: "user", text: q }]);
    setTyping(true);
    // Short beat before the reply, so the exchange reads as a conversation
    // rather than the answer flashing in with the question.
    timerRef.current = setTimeout(() => {
      const hit = matchEntry(q, config.entries);
      const reply: Msg = hit
        ? { from: "bot", text: hit.answer, links: hit.links, chips: hit.chips }
        : { from: "bot", ...config.fallback };
      setMessages((m) => [...m, reply]);
      setTyping(false);
    }, 550);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeChat();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  const lastIndex = messages.length - 1;

  return (
    <>
      {open && (
        <div
          id="br-chat-panel"
          role="dialog"
          aria-label="Bachmann Robinson chat assistant"
          className="br-chat-panel fixed bottom-[88px] right-5 z-[90] flex h-[min(560px,calc(100dvh-120px))] w-[min(392px,calc(100vw-40px))] flex-col overflow-hidden border border-[#E5E4E0] bg-white shadow-[0_24px_60px_-16px_rgba(18,25,42,0.35)]"
        >
          {/* Header — same navy band + hairline texture as the site's dark sections. */}
          <div className="br-hairlines relative flex items-start justify-between gap-4 bg-[#16396E] px-5 py-4">
            <div>
              <span className="font-sans text-[10.5px] font-semibold uppercase leading-[1.6] tracking-[2.4px] text-[#9FB8DC]">
                Bachmann Robinson
              </span>
              <p className="m-0 font-serif text-[20px] leading-tight text-white">
                How can we help?
              </p>
            </div>
            <button
              type="button"
              onClick={closeChat}
              aria-label="Close chat"
              className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center border border-white/25 bg-transparent text-[16px] leading-none text-[#C8D6EB] transition-colors hover:border-white/60 hover:text-white"
            >
              ×
            </button>
          </div>

          {/* Conversation. */}
          <div
            ref={listRef}
            aria-live="polite"
            className="flex-1 space-y-3 overflow-y-auto overscroll-contain bg-[#FAFAF8] px-4 py-4"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`br-chat-msg flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={
                    m.from === "user"
                      ? "max-w-[85%] rounded-lg rounded-br-none bg-[#1E4B8F] px-3.5 py-2.5 text-[14px] leading-[1.6] text-white"
                      : "max-w-[88%] rounded-lg rounded-bl-none border border-[#E5E4E0] bg-white px-3.5 py-2.5 text-[14px] leading-[1.6] text-[#374151]"
                  }
                >
                  {m.text}
                  {m.links && m.links.length > 0 && (
                    <span className="mt-2.5 flex flex-wrap gap-1.5">
                      {m.links.map((l) =>
                        l.href.startsWith("/") ? (
                          <Link
                            key={l.href + l.label}
                            href={l.href}
                            className="border border-[#C8D6EB] bg-[#F5F8FC] px-2.5 py-1 text-[12.5px] font-semibold text-[#1E4B8F] transition-colors hover:border-[#1E4B8F] hover:bg-[#E8EEF7]"
                          >
                            {l.label}
                          </Link>
                        ) : (
                          <a
                            key={l.href + l.label}
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-[#C8D6EB] bg-[#F5F8FC] px-2.5 py-1 text-[12.5px] font-semibold text-[#1E4B8F] transition-colors hover:border-[#1E4B8F] hover:bg-[#E8EEF7]"
                          >
                            {l.label} ↗
                          </a>
                        ),
                      )}
                    </span>
                  )}
                  {/* Quick replies only under the latest bot message — stale
                      chips higher up the thread would re-ask old questions. */}
                  {m.from === "bot" &&
                    i === lastIndex &&
                    !typing &&
                    m.chips &&
                    m.chips.length > 0 && (
                      <span className="mt-2.5 flex flex-wrap gap-1.5">
                        {m.chips.map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => ask(c)}
                            className="cursor-pointer border border-[#1E4B8F]/40 bg-white px-2.5 py-1 text-[12.5px] font-semibold text-[#1E4B8F] transition-colors hover:border-[#1E4B8F] hover:bg-[#E8EEF7]"
                          >
                            {c}
                          </button>
                        ))}
                      </span>
                    )}
                </div>
              </div>
            ))}

            {typing && (
              <div className="br-chat-msg flex justify-start">
                <div
                  aria-label="Assistant is typing"
                  className="flex items-center gap-1 rounded-lg rounded-bl-none border border-[#E5E4E0] bg-white px-3.5 py-3"
                >
                  <span className="br-chat-dot h-1.5 w-1.5 rounded-full bg-[#7593C1]" />
                  <span className="br-chat-dot h-1.5 w-1.5 rounded-full bg-[#7593C1]" />
                  <span className="br-chat-dot h-1.5 w-1.5 rounded-full bg-[#7593C1]" />
                </div>
              </div>
            )}
          </div>

          {/* Composer. */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(draft);
            }}
            className="flex items-stretch border-t border-[#E5E4E0] bg-white"
          >
            <input
              ref={inputRef}
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type your question…"
              aria-label="Type your question"
              className="min-w-0 flex-1 border-none bg-transparent px-4 py-3 text-[14px] text-[#1B2430] outline-none placeholder:text-[#9CA3AF]"
            />
            <button
              type="submit"
              disabled={!draft.trim()}
              className="cursor-pointer bg-[#16396E] px-5 font-sans text-[12.5px] font-bold uppercase tracking-[1.5px] text-white transition-colors hover:bg-[#1E4B8F] disabled:cursor-default disabled:opacity-40"
            >
              Send
            </button>
          </form>
          <p className="m-0 border-t border-[#F1F3F0] bg-white px-4 py-2 text-[10.5px] leading-[1.5] text-[#6B7280]">
            General information only — for advice about your situation, call{" "}
            <a href="tel:0738101000" className="font-semibold">
              (07) 3810 1000
            </a>
            .
          </p>
        </div>
      )}

      {/* Launcher. */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => (open ? closeChat() : openChat())}
        aria-expanded={open}
        aria-controls="br-chat-panel"
        aria-label={open ? "Close chat" : "Chat with us"}
        className="br-lift fixed bottom-5 right-5 z-[90] flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[#16396E] text-white shadow-[0_12px_32px_-8px_rgba(18,25,42,0.55)] hover:bg-[#1E4B8F]"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M8.5 10.5h7M8.5 13.5h4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        )}
      </button>
    </>
  );
}
