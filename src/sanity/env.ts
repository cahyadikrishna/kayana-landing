function assertValue<T>(value: T | undefined, name: string): T {
  if (value === undefined || value === "") {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
);

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "NEXT_PUBLIC_SANITY_DATASET",
);

export const apiVersion = "2026-10-01";

/** Where the hosted Studio lives — click-to-edit overlays deep-link here. */
export const studioUrl =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "https://kayanamoment.sanity.studio";
