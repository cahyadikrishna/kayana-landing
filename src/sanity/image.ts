import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import type { SanityImageValue } from "./content";
import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId, dataset });

/** Builds a CDN URL that respects the editor's crop and hotspot. */
export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto("format");
}

type ImageGeometry = Pick<SanityImageValue, "crop" | "hotspot" | "asset">;

/** Fractions of the original image kept by the editor's crop. */
function cropBox(image: ImageGeometry) {
  const { top = 0, bottom = 0, left = 0, right = 0 } = image.crop ?? {};
  return { top, left, width: 1 - left - right, height: 1 - top - bottom };
}

/**
 * Pixel size of the image as the CDN serves it: the original dimensions
 * (from metadata, or parsed from the `image-<hash>-<W>x<H>-<ext>` asset id)
 * reduced by the editor's crop. Null when neither source is available.
 */
export function croppedDimensions(image: ImageGeometry) {
  let { width, height } = image.asset?.metadata?.dimensions ?? {};
  if (!width || !height) {
    const match = image.asset?._id.match(/-(\d+)x(\d+)-\w+$/);
    if (!match) return null;
    width = Number(match[1]);
    height = Number(match[2]);
  }

  const crop = cropBox(image);
  return {
    width: Math.round(width * crop.width),
    height: Math.round(height * crop.height),
  };
}

/**
 * CSS object-position for the editor's hotspot. Sanity stores it relative to
 * the original image, but the served image is cropped, so convert first.
 */
export function hotspotPosition(image: ImageGeometry) {
  const { x, y } = image.hotspot ?? {};
  if (x === undefined || y === undefined) return undefined;

  const crop = cropBox(image);
  const clamp = (value: number) => Math.min(1, Math.max(0, value));
  const percent = (value: number) => `${Math.round(clamp(value) * 10000) / 100}%`;
  return `${percent((x - crop.left) / crop.width)} ${percent((y - crop.top) / crop.height)}`;
}
