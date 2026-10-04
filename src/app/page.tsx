import type { Metadata } from "next";
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
  const { data } = await sanityFetch({ query: SEO_QUERY, stega: false });

  return {
    title: data?.seo?.title ?? data?.siteName ?? undefined,
    description: data?.seo?.description ?? undefined,
    openGraph: data?.seo?.ogImage ? { images: [{ url: data.seo.ogImage }] } : undefined,
  };
}

export default async function Home() {
  const { data } = await sanityFetch({ query: HOME_PAGE_QUERY });
  const { settings, hero, about, home, projects, testimonials } = data;

  return (
    <>
      <Hero hero={hero} settings={settings} />
      <About about={about} />
      <RecentFeed header={home?.projects ?? null} projects={projects} />
      <CtaBanner1 cta={home?.ctaPrimary ?? null} />
      <Testimonials header={home?.testimonials ?? null} testimonials={testimonials} />
      <CtaBanner2 cta={home?.ctaClosing ?? null} />
      <Footer header={home?.contact ?? null} settings={settings} />
    </>
  );
}
