import type { Metadata } from "next";
import SkipLink from "@/components/ui/SkipLink";
import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import About from "@/components/About";
import RecentFeed from "@/components/RecentFeed";
import CtaBanner1 from "@/components/CtaBanner1";
import Testimonials from "@/components/Testimonials";
import CtaBanner2 from "@/components/CtaBanner2";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/sanity/live";
import { HOME_PAGE_QUERY, SEO_QUERY } from "@/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: SEO_QUERY, stega: false, tags: ["sanity"] });

  return {
    title: data?.seo?.title ?? data?.siteName ?? undefined,
    description: data?.seo?.description ?? undefined,
    openGraph: data?.seo?.ogImage ? { images: [{ url: data.seo.ogImage }] } : undefined,
  };
}

export default async function Home() {
  const { data } = await sanityFetch({ query: HOME_PAGE_QUERY, tags: ["sanity"] });
  const { settings, hero, about, home, projects, testimonials } = data;

  // Fail loudly rather than serve a blank page: a failed build keeps the last deploy,
  // and a failed revalidation keeps serving the last good render.
  const missing = Object.entries({ settings, hero, about, home })
    .filter(([, doc]) => !doc)
    .map(([name]) => name);
  if (missing.length) {
    throw new Error(
      `Sanity content missing: ${missing.join(", ")}. Publish it in the Studio or run \`pnpm --dir studio seed\`.`,
    );
  }

  return (
    <>
      <SkipLink />
      <SiteHeader settings={settings} />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero hero={hero} />
        <About about={about} />
        <RecentFeed header={home?.projects ?? null} projects={projects} />
        <CtaBanner1 cta={home?.ctaPrimary ?? null} />
        <Testimonials header={home?.testimonials ?? null} testimonials={testimonials} />
        <CtaBanner2 cta={home?.ctaClosing ?? null} />
      </main>
      <Footer header={home?.contact ?? null} settings={settings} />
    </>
  );
}
