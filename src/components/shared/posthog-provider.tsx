"use client";

import { useEffect, type ReactNode } from "react";

// Analytics are opt-in. Set NEXT_PUBLIC_POSTHOG_KEY (and optionally
// NEXT_PUBLIC_POSTHOG_HOST) in your env to enable PostHog. If unset,
// the provider is a no-op — nothing is loaded or sent.
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com";
const POSTHOG_IDLE_DELAY_MS = 1200;

type PostHogClient = typeof import("posthog-js").default;

let posthogImport: Promise<PostHogClient> | null = null;

function loadPostHog(): Promise<PostHogClient> {
  if (!posthogImport) {
    posthogImport = import("posthog-js").then(({ default: client }) => client);
  }

  return posthogImport;
}

/** Detect bots via user-agent and headless browser signals */
function isBot(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") return true;
  const ua = navigator.userAgent;
  if (/bot|crawl|spider|slurp|lighthouse|pagespeed|headless|phantom|puppeteer|prerender|wget|curl|python|ahref|semrush|mj12|dotbot|petalbot|bytespider|gptbot|claudebot|bingbot|yandex|baidu|duckduck|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot|discordbot|applebot/i.test(ua)) return true;
  if (navigator.webdriver) return true;
  return false;
}

export function PostHogProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined" || isBot() || !POSTHOG_KEY) return undefined;

    const timeoutId = window.setTimeout(() => {
      void loadPostHog().then((posthog) => {
        if (!posthog.__loaded) {
          posthog.init(POSTHOG_KEY, {
            api_host: POSTHOG_HOST,
            person_profiles: "always",
            capture_pageleave: true,
            capture_performance: true,
            disable_session_recording: false,
            session_recording: {
              maskAllInputs: false,
              maskInputOptions: { password: true },
            },
          });
        }

        // Identify visitor from drip email click-through (?pe=email@company.com)
        const params = new URLSearchParams(window.location.search);
        const pe = params.get("pe");
        if (pe && pe.includes("@")) {
          posthog.identify(pe, {
            email: pe,
            source: params.get("utm_source") || "drip",
            industry: params.get("utm_campaign") || undefined,
          });
        }
      });
    }, POSTHOG_IDLE_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return <>{children}</>;
}
