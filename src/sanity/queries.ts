import { defineQuery } from "next-sanity";

const image = /* groq */ `{
  alt,
  hotspot,
  crop,
  asset->{ _id, metadata { lqip, dimensions { width, height } } }
}`;

const ctaBlock = /* groq */ `{ eyebrow, title, body, ctaLabel, note }`;

/** Everything the landing page renders, in one request. */
export const HOME_PAGE_QUERY = defineQuery(`{
  "settings": *[_type == "siteSettings" && _id == "siteSettings"][0]{
    siteName, whatsappNumber, whatsappLabel, bookingLabel, email, instagram, location
  },
  "hero": *[_type == "hero" && _id == "hero"][0]{
    headline,
    background${image},
    cutouts[]${image},
    credits[]{ _key, title, meta }
  },
  "about": *[_type == "about" && _id == "about"][0]{
    eyebrow,
    stats[]{ _key, value, suffix, label },
    quoteEyebrow, quote, attribution
  },
  "home": *[_type == "home" && _id == "home"][0]{
    projects { eyebrow, title, blurb, ctaLabel, ctaHref },
    ctaPrimary${ctaBlock},
    testimonials { eyebrow, title, blurb, background${image} },
    ctaClosing${ctaBlock},
    contact { eyebrow, title }
  },
  "projects": *[_type == "project" && defined(image.asset)] | order(orderRank) {
    _id, title, "category": category->title, image${image}
  },
  "testimonials": *[_type == "testimonial"] | order(orderRank) {
    _id, quote, name, occasion
  }
}`);

/** Metadata only — fetched with stega off so it never leaks into <head>. */
export const SEO_QUERY = defineQuery(`*[_type == "siteSettings" && _id == "siteSettings"][0]{
  siteName,
  seo { title, description, "ogImage": ogImage.asset->url }
}`);
