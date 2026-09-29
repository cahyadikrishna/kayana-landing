"use client";

import Image from "next/image";
import { useState } from "react";
import { useReveal } from "@/hooks/useScrollAnimation";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import Pill from "@/components/ui/Pill";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";

const cards = [
  {
    title: "Golden Hour Ceremonies",
    category: "Ceremony",
    image: "https://picsum.photos/seed/graduation1/600/800",
  },
  {
    title: "A Robe’s Serene Silhouette",
    category: "Portrait",
    image: "https://picsum.photos/seed/graduation2/600/800",
  },
  {
    title: "Moments Framed in Joy",
    category: "Candid",
    image: "https://picsum.photos/seed/graduation3/600/800",
  },
  {
    title: "The Last Bell, First Chapter",
    category: "Portrait",
    image: "https://picsum.photos/seed/graduation4/600/800",
  },
];

const filters = ["All", ...Array.from(new Set(cards.map((card) => card.category)))];

export default function RecentFeed() {
  const { ref } = useReveal({ threshold: 0.1 });
  const [activeFilter, setActiveFilter] = useState("All");

  const visibleCards =
    activeFilter === "All" ? cards : cards.filter((card) => card.category === activeFilter);

  return (
    <Section id="projects" tone="ink" ref={ref}>
      {/* Section header row */}
      <div className="reveal flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div className="md:w-1/2">
          <SectionLabel tone="ink" index={2}>
            Our Work
          </SectionLabel>
          <h2 className="type-title mt-6">
            The artistry behind a portfolio of <em>timeless</em> photographs
          </h2>
        </div>

        <div className="flex flex-col items-start gap-6 md:w-1/3">
          <p className="type-caption text-paper/60">
            A visual journey through graduation moments captured with creativity and
            precision — each frame preserving the weight of the day.
          </p>
          <Button href="#projects" tone="ink">
            Explore more
          </Button>
        </div>
      </div>

      <Divider tone="ink" className="mt-12 mb-8" />

      {/* Filters */}
      <div className="reveal mb-8 flex flex-wrap gap-2" style={{ "--i": 1 } as React.CSSProperties}>
        {filters.map((filter) => (
          <Pill
            key={filter}
            tone="ink"
            active={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </Pill>
        ))}
      </div>

      {/* TODO: Replace hardcoded cards with Instagram Basic Display API
          Endpoint: GET https://graph.instagram.com/me/media
          Fields: id, caption, media_type, media_url, permalink, thumbnail_url
          Replace each card's image src and content with API response data
          Access token: store in .env.local as NEXT_PUBLIC_INSTAGRAM_TOKEN */}

      {/* Catalog grid — image first, caption beneath, no chrome */}
      <div className="grid grid-cols-2 gap-x-2 gap-y-8 md:grid-cols-4">
        {visibleCards.map((card, i) => (
          <figure
            key={card.title}
            className="reveal group"
            style={{ "--i": i + 2 } as React.CSSProperties}
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="media-zoom object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between gap-3">
              <span className="type-caption">{card.title}</span>
              <span className="type-meta shrink-0 text-paper/50">
                {String(i + 1).padStart(2, "0")}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
