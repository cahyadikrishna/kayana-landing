"use client";

import { stegaClean } from "next-sanity";
import { useState } from "react";
import { useReveal } from "@/hooks/useScrollAnimation";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import Headline from "@/components/ui/Headline";
import Pill from "@/components/ui/Pill";
import SanityImage from "@/components/ui/SanityImage";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import type { Project, ProjectsHeader } from "@/sanity/content";

const ALL = "All";

export default function RecentFeed({
  header,
  projects,
}: {
  header: ProjectsHeader | null;
  projects: Project[];
}) {
  const { ref } = useReveal({ threshold: 0.1 });
  const [activeFilter, setActiveFilter] = useState(ALL);

  // Category titles carry invisible edit markers in preview — compare the clean text
  const filters = [ALL, ...new Set(projects.map((project) => stegaClean(project.category) ?? ""))];
  const visibleProjects =
    activeFilter === ALL
      ? projects
      : projects.filter((project) => stegaClean(project.category) === activeFilter);

  return (
    <Section id="projects" tone="ink" ref={ref}>
      {/* Section header row */}
      <div className="reveal flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div className="md:w-1/2">
          <SectionLabel tone="ink" index={2}>
            {header?.eyebrow}
          </SectionLabel>
          <h2 className="type-title mt-6">
            <Headline value={header?.title} />
          </h2>
        </div>

        <div className="flex flex-col items-start gap-6 md:w-1/3">
          <p className="type-caption text-paper/60">{header?.blurb}</p>
          {header?.ctaHref && header.ctaLabel && (
            <Button
              href={stegaClean(header.ctaHref)}
              target="_blank"
              rel="noopener noreferrer"
              tone="ink"
            >
              {header.ctaLabel}
            </Button>
          )}
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

      {/* Catalog grid — image first, caption beneath, no chrome */}
      <div className="grid grid-cols-2 gap-x-2 gap-y-8 md:grid-cols-4">
        {visibleProjects.map((project, i) => (
          <figure
            key={project._id}
            className="reveal group"
            style={{ "--i": i + 2 } as React.CSSProperties}
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <SanityImage
                image={project.image}
                fill
                aspect={4 / 3}
                className="media-zoom object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between gap-3">
              <span className="type-caption">{project.title}</span>
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
