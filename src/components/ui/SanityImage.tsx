"use client";

import Image, { type ImageLoader } from "next/image";
import type { CSSProperties } from "react";
import { urlFor } from "@/sanity/image";
import type { SanityImageValue } from "@/sanity/content";

type SanityImageProps = {
  image: SanityImageValue | null | undefined;
  sizes: string;
  /** Override the editor's alt text, e.g. "" for decorative images. */
  alt?: string;
  /** Preload the image — use for the LCP image only. */
  preload?: boolean;
  className?: string;
  style?: CSSProperties;
} & (
  | {
      /** Fill the parent box. Pass the box's height/width ratio to crop around the hotspot. */
      fill: true;
      aspect?: number;
    }
  | { fill?: false; aspect?: never }
);

/**
 * next/image backed by the Sanity image CDN: resizing, format negotiation
 * and the editor's crop/hotspot are applied by Sanity, not by Next.
 */
export default function SanityImage({
  image,
  sizes,
  alt,
  preload,
  className,
  style,
  fill,
  aspect,
}: SanityImageProps) {
  if (!image?.asset?._id) return null;

  const loader: ImageLoader = ({ width, quality }) => {
    let url = urlFor(image).width(width).quality(quality ?? 75);
    if (aspect) url = url.height(Math.round(width * aspect)).fit("crop");
    return url.url();
  };

  const altText = alt ?? image.alt ?? "";
  const common = {
    loader,
    src: image.asset._id,
    sizes,
    preload,
    className,
    style,
  };

  if (fill) {
    // Photos get a blurred preview while loading; cutouts (below) are transparent and don't
    const lqip = image.asset.metadata?.lqip;
    return <Image {...common} alt={altText} fill placeholder={lqip ? "blur" : "empty"} blurDataURL={lqip ?? undefined} />;
  }

  const dimensions = image.asset.metadata?.dimensions;
  return <Image {...common} alt={altText} width={dimensions?.width ?? 0} height={dimensions?.height ?? 0} />;
}
