"use client";

import Image from "next/image";
import { useReveal } from "@/hooks/useScrollAnimation";
import Button from "@/components/ui/Button";

const cards = [
  {
    title: "Golden Hour Ceremonies",
    description:
      "Capturing the warmth of achievement as graduates walk across the stage bathed in afternoon light.",
    image: "https://picsum.photos/seed/graduation1/600/800",
    featured: true,
  },
  {
    title: "A Robe\u2019s Serene Silhouette",
    description:
      "Still moments of reflection before the celebration begins.",
    image: "https://picsum.photos/seed/graduation2/600/800",
    featured: false,
  },
  {
    title: "Moments Framed in Joy",
    description:
      "Candid laughter and pride captured between the formalities.",
    image: "https://picsum.photos/seed/graduation3/600/800",
    featured: false,
  },
  {
    title: "The Last Bell, First Chapter",
    description:
      "Where one journey ends and a lifetime of possibility begins.",
    image: "https://picsum.photos/seed/graduation4/600/800",
    featured: false,
  },
];

const featuredPills = ["Outdoor Portraits", "Nature", "Memories", "#2023"];

export default function RecentFeed() {
  const { ref } = useReveal({ target: ".fade-up", threshold: 0.1 });

  return (
    <section ref={ref} className="bg-[#111111] py-24 md:py-32 px-6 md:px-16">
      <div className="max-w-screen-xl mx-auto">
        {/* Section header — fade-up as a unit */}
        <div className="fade-up flex flex-col md:flex-row gap-12 md:gap-0">
          {/* Left column */}
          <div className="md:w-1/2">
            <span className="block text-xs uppercase tracking-widest text-white/40">
              [003]
            </span>
            <span className="block text-xs uppercase tracking-widest text-white/40 mt-1">
              Our Work
            </span>
            <h2 className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
              <span className="font-bold italic">Explore</span>{" "}
              <span className="font-normal">the artistry and</span>
              <br />
              <span className="font-normal">precision behind </span>
              <span className="font-bold italic">our</span>
              <br />
              <span className="font-bold italic">portfolio</span>{" "}
              <span className="font-normal">of timeless photography</span>
            </h2>
          </div>

          {/* Right column */}
          <div className="md:w-1/2 flex flex-col items-start justify-end">
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Embark on a visual journey through our graduation moments captured
              with creativity and precision. Each image in our portfolio reflects
              our dedication to preserving life&apos;s beauty and significance.
            </p>
            <div className="mt-6">
              <Button
                href="#projects"
                variant="ghost"
                color="light"
                icon="arrow-up-right"
              >
                Explore More
              </Button>
            </div>
          </div>
        </div>

        {/* TODO: Replace hardcoded cards with Instagram Basic Display API
            Endpoint: GET https://graph.instagram.com/me/media
            Fields: id, caption, media_type, media_url, permalink, thumbnail_url
            Replace each card's image src and content with API response data
            Access token: store in .env.local as NEXT_PUBLIC_INSTAGRAM_TOKEN */}

        {/* Cards grid — each card fades in individually with staggered delays */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12">
          {cards.map((card, i) => (
            <div
              key={card.title}
              className="fade-up portfolio-card-outer group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Layer 1 — Background image with zoom + color reveal on hover */}
              <div className="portfolio-card-img absolute inset-0">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>

              {/* Layer 2 — Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Layer 3 — Category tag pills (card 1 only) */}
              {card.featured && (
                <div className="absolute top-4 left-0 right-0 flex flex-wrap justify-center gap-2 px-4">
                  {featuredPills.map((pill) => (
                    <span
                      key={pill}
                      className="rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs px-3 py-1"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              )}

              {/* Layer 4 — Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-serif font-bold text-white text-lg leading-snug mb-1 line-clamp-2">
                  {card.title}
                </h3>
                <p
                  className={`text-white/60 text-xs leading-relaxed mb-4 line-clamp-2 ${
                    i > 0 ? "hidden md:block" : ""
                  }`}
                >
                  {card.description}
                </p>
                <Button
                  variant="ghost"
                  color="light"
                  size="sm"
                  icon="chevron-right"
                  className="w-full justify-between px-4 uppercase tracking-widest"
                >
                  More Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
