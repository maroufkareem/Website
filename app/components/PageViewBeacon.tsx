"use client";

import { useEffect } from "react";

/**
 * Fires a single lightweight, no-cookie pageview beacon on mount. Wrapped in
 * try/catch equivalents so a network hiccup never affects the visitor.
 */
export default function PageViewBeacon() {
  useEffect(() => {
    const payload = JSON.stringify({
      path: window.location.pathname,
      referrer: document.referrer,
    });

    try {
      if (navigator.sendBeacon) {
        const blob = new Blob([payload], { type: "application/json" });
        navigator.sendBeacon("/api/analytics/pageview", blob);
        return;
      }
    } catch {
      // fall through to fetch
    }

    fetch("/api/analytics/pageview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  }, []);

  return null;
}
