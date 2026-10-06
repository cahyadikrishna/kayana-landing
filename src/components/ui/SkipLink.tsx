import { UI } from "@/lib/ui-strings";

/** First focusable element on the page: jumps keyboard users past the header to <main id="main">. */
export default function SkipLink() {
  return (
    <a
      href="#main"
      className="type-caption fixed top-4 left-4 z-60 border border-ink bg-paper px-4 py-3 text-ink not-focus:sr-only"
    >
      {UI.skipToContent}
    </a>
  );
}
