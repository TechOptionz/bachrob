"use client";

import Script from "next/script";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

type TurnstileApi = {
  render: (
    el: HTMLElement,
    opts: {
      sitekey: string;
      theme?: "light" | "dark" | "auto";
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    },
  ) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export type TurnstileHandle = { reset: () => void };

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

// Cloudflare Turnstile widget. Reports the current token (or null once it
// expires or errors) through onToken.
const Turnstile = forwardRef<
  TurnstileHandle,
  { onToken: (token: string | null) => void }
>(function Turnstile({ onToken }, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  useEffect(
    () => () => {
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
    },
    [],
  );

  useImperativeHandle(ref, () => ({
    reset() {
      if (widgetId.current && window.turnstile) {
        window.turnstile.reset(widgetId.current);
        onToken(null);
      }
    },
  }));

  const render = useCallback(() => {
    const el = containerRef.current;
    if (!el || !window.turnstile || !SITE_KEY) return;
    if (widgetId.current) window.turnstile.remove(widgetId.current);
    widgetId.current = window.turnstile.render(el, {
      sitekey: SITE_KEY,
      theme: "light",
      callback: (token) => onToken(token),
      "expired-callback": () => onToken(null),
      "error-callback": () => onToken(null),
    });
  }, [onToken]);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={render}
      />
      <div ref={containerRef} className="min-h-[65px]" />
    </>
  );
});

export default Turnstile;
