import {defineField, defineType} from 'sanity'
import {defineHeadline} from '../helpers'

/**
 * A call-to-action section: label, title, body copy and one link.
 */
export const ctaBlock = defineType({
  name: 'ctaBlock',
  title: 'Call to action',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Section label',
      type: 'string',
      validation: (rule) => rule.required().max(24),
    }),
    defineHeadline({name: 'title', title: 'Title', max: 100}),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().max(360),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Button label',
      type: 'string',
      validation: (rule) => rule.required().max(30),
    }),
    defineField({
      name: 'note',
      title: 'Note under the button',
      type: 'string',
      description: 'Optional. Only shown on the closing call to action.',
      validation: (rule) => rule.max(60),
    }),
  ],
})
