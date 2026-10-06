// Public, non-secret values (also in .env.example) — defaults keep `next build` working without .env.local
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ovo94io9";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const apiVersion = "2026-10-01";

/** Where the hosted Studio lives — click-to-edit overlays deep-link here. */
export const studioUrl =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "https://kayanamoment.sanity.studio";
