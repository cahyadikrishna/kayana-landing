import { Fragment } from "react";
import type { HeadlineValue } from "@/sanity/content";

/**
 * Renders a Sanity headline (one paragraph, italic as the only mark) inline,
 * so the caller owns the element and its type-* class:
 * <h2 className="type-title"><Headline value={title} /></h2>
 */
export default function Headline({ value }: { value: HeadlineValue | null | undefined }) {
  const spans = value?.[0]?.children ?? [];

  return (
    <>
      {spans.map((span) =>
        span.marks?.includes("em") ? (
          <em key={span._key}>{span.text}</em>
        ) : (
          <Fragment key={span._key}>{span.text}</Fragment>
        ),
      )}
    </>
  );
}
