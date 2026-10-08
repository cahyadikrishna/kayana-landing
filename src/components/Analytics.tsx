"use client";

import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useEffect } from "react";
import { track, type AnalyticsEvent, type AnalyticsEvents } from "@/lib/analytics";

/**
 * Vercel Web Analytics + Speed Insights, plus one delegated listener that sends
 * the event declared by the nearest `data-analytics-event` element.
 */
export default function Analytics() {
  useEffect(() => {
    const handle = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      const el = event.target.closest<HTMLElement>("[data-analytics-event]");
      if (!el) return;

      // auxclick also fires for right-click and on buttons; only count middle-click
      // (open in new tab) on links
      if (event.type === "auxclick" && (event.button !== 1 || !el.matches("a[href]"))) return;

      // Bad markup must never break a click
      try {
        const name = el.dataset.analyticsEvent as AnalyticsEvent;
        const props = JSON.parse(el.dataset.analyticsProps ?? "{}") as AnalyticsEvents[typeof name];
        track(name, props);
      } catch {}
    };

    // Capture phase: read the attributes before React's handlers re-render the target
    document.addEventListener("click", handle, true);
    document.addEventListener("auxclick", handle, true);
    return () => {
      document.removeEventListener("click", handle, true);
      document.removeEventListener("auxclick", handle, true);
    };
  }, []);

  return (
    <>
      <VercelAnalytics />
      <SpeedInsights />
    </>
  );
}
