import { track as vercelTrack } from "@vercel/analytics";

/**
 * Every custom event the site sends, with its props.
 * Custom events need a Vercel Pro plan to show in the dashboard (see README › Analytics).
 */
export type AnalyticsEvents = {
  book_session_click: { placement: "nav" | "sticky" };
  contact_click: { channel: "whatsapp" | "email" | "instagram" };
  project_filter: { category: string };
  explore_more_click: Record<string, never>;
  // Reserved for locale switching (#10)
  locale_switch: { locale: string };
};

export type AnalyticsEvent = keyof AnalyticsEvents;

export function track<E extends AnalyticsEvent>(name: E, props: AnalyticsEvents[E]) {
  vercelTrack(name, props);
}

/**
 * Declares an event in markup. The delegated listener in `components/Analytics.tsx`
 * sends it on click, so this works in server components too.
 */
export function analyticsAttrs<E extends AnalyticsEvent>(name: E, props: AnalyticsEvents[E]) {
  return {
    "data-analytics-event": name,
    "data-analytics-props": JSON.stringify(props),
  };
}

export type AnalyticsAttrs = ReturnType<typeof analyticsAttrs>;
