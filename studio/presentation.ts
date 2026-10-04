import {defineDocuments, defineLocations, type PresentationPluginOptions} from 'sanity/presentation'

const home = {title: 'Home', href: '/'}

/**
 * Every document type renders on the single landing page.
 */
export const resolve: PresentationPluginOptions['resolve'] = {
  mainDocuments: defineDocuments([{route: '/', filter: `_type == "hero" && _id == "hero"`}]),
  locations: Object.fromEntries(
    ['siteSettings', 'hero', 'about', 'home', 'project', 'category', 'testimonial'].map((type) => [
      type,
      defineLocations({locations: [home]}),
    ]),
  ),
}
