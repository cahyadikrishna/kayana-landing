import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineField, defineType} from 'sanity'
import {defineHeadline, defineImage} from '../helpers'

const eyebrow = defineField({
  name: 'eyebrow',
  title: 'Section label',
  type: 'string',
  validation: (rule) => rule.required().max(24),
})

export const home = defineType({
  name: 'home',
  title: 'Home page sections',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'projects', title: 'Our work', default: true},
    {name: 'ctaPrimary', title: 'Why us'},
    {name: 'testimonials', title: 'Testimonials'},
    {name: 'ctaClosing', title: 'One last thing'},
    {name: 'contact', title: 'Contact'},
  ],
  fields: [
    defineField({
      name: 'projects',
      title: 'Our work',
      type: 'object',
      group: 'projects',
      options: {collapsible: false},
      description: 'The section header. The photos themselves are under Projects.',
      fields: [
        eyebrow,
        defineHeadline({name: 'title', title: 'Title', max: 80}),
        defineField({
          name: 'blurb',
          type: 'text',
          rows: 3,
          validation: (rule) => rule.required().max(200),
        }),
        defineField({
          name: 'ctaLabel',
          title: 'Link label',
          type: 'string',
          validation: (rule) => rule.max(30),
        }),
        defineField({
          name: 'ctaHref',
          title: 'Link URL',
          type: 'url',
          description: 'e.g. the full portfolio or Instagram. Leave empty to hide the link.',
          validation: (rule) => rule.uri({scheme: ['https']}),
        }),
      ],
    }),
    defineField({
      name: 'ctaPrimary',
      title: 'Why us',
      type: 'ctaBlock',
      group: 'ctaPrimary',
      options: {collapsible: false},
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'object',
      group: 'testimonials',
      options: {collapsible: false},
      description: 'The section header. The quotes themselves are under Testimonials.',
      fields: [
        eyebrow,
        defineHeadline({name: 'title', title: 'Title', max: 40}),
        defineField({
          name: 'blurb',
          type: 'string',
          validation: (rule) => rule.required().max(80),
        }),
        defineImage({
          name: 'background',
          title: 'Background photo',
          description: 'Shown in black and white behind a dark veil.',
          decorative: true,
        }),
      ],
    }),
    defineField({
      name: 'ctaClosing',
      title: 'One last thing',
      type: 'ctaBlock',
      group: 'ctaClosing',
      options: {collapsible: false},
    }),
    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'object',
      group: 'contact',
      options: {collapsible: false},
      description: 'Contact details themselves are under Site settings.',
      fields: [eyebrow, defineHeadline({name: 'title', title: 'Title', max: 60})],
    }),
  ],
  preview: {prepare: () => ({title: 'Home page sections'})},
})
