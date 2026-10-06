import {category} from './documents/category'
import {project} from './documents/project'
import {testimonial} from './documents/testimonial'
import {ctaBlock} from './objects/ctaBlock'
import {about} from './singletons/about'
import {hero} from './singletons/hero'
import {home} from './singletons/home'
import {siteSettings} from './singletons/siteSettings'

export const SINGLETONS = ['siteSettings', 'hero', 'about', 'home'] as const

export const schemaTypes = [
  siteSettings,
  hero,
  about,
  home,
  project,
  category,
  testimonial,
  ctaBlock,
]
