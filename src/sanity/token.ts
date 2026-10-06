import "server-only";

/**
 * Viewer token — reads drafts in draft mode. Never import from client code.
 * Optional: the public page only reads published content, so builds work without it;
 * draft mode / Presentation are unavailable until it is set.
 */
export const token = process.env.SANITY_API_READ_TOKEN || undefined;
