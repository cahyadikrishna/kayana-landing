"use client";

import Image, { type ImageLoader } from "next/image";
import type { CSSProperties } from "react";
import { croppedDimensions, hotspotPosition, urlFor } from "@/sanity/image";
import type { SanityImageValue } from "@/sanity/content";

type SanityImageProps = {
  image: SanityImageValue | null | undefined;
  sizes: string;
  /** Override the editor's alt text, e.g. "" for decorative images. */
  alt?: string;
  /** Preload the image — use for the LCP image only. */
  preload?: boolean;
  /** "eager" for above-the-fold images that aren't the LCP image. */
  loading?: "eager" | "lazy";
  /** "high" on the LCP image; "low" for above-the-fold images that must not compete with it. */
  fetchPriority?: "high" | "low" | "auto";
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
  loading,
  fetchPriority,
  className,
  style,
  fill,
  aspect,
}: SanityImageProps) {
  if (!image?.asset?._id) return null;

  const loader: ImageLoader = ({ width, quality }) => {
    let url = urlFor(image).width(width).quality(quality ?? 75);
    // Without an aspect, never upscale past the cropped source
    url = aspect ? url.height(Math.round(width * aspect)).fit("crop") : url.fit("max");
    return url.url();
  };

  const altText = alt ?? image.alt ?? "";
  const common = {
    loader,
    src: image.asset._id,
    sizes,
    preload,
    loading,
    fetchPriority,
    className,
  };

  if (fill) {
    // Photos get a blurred preview while loading; cutouts (below) are transparent and don't
    const lqip = image.asset.metadata?.lqip;
    // Without an aspect the CDN doesn't crop to the box, so frame the hotspot in CSS (caller's style wins)
    const objectPosition = aspect ? undefined : hotspotPosition(image);
    return (
      <Image
        {...common}
        alt={altText}
        fill
        style={objectPosition ? { objectPosition, ...style } : style}
        placeholder={lqip ? "blur" : "empty"}
        blurDataURL={lqip ?? undefined}
      />
    );
  }

  const dimensions = croppedDimensions(image);
  if (!dimensions) return null;
  return <Image {...common} alt={altText} style={style} width={dimensions.width} height={dimensions.height} />;
}
