import {HomeIcon} from '@sanity/icons/Home'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {defineHeadline, defineImage} from '../helpers'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineHeadline({name: 'headline', title: 'Headline', max: 60}),
    defineImage({
      name: 'background',
      title: 'Background photo',
      description: 'Full-bleed, black and white. Sits behind the people cutouts.',
      decorative: true,
    }),
    defineField({
      name: 'cutouts',
      title: 'People cutouts',
      type: 'array',
      description:
        'Exactly three transparent PNGs, in order: left, middle (largest, drawn behind), right.',
      of: [
        defineArrayMember({
          type: 'image',
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              validation: (rule) => rule.required().max(160),
            }),
          ],
          preview: {
            select: {media: 'asset', title: 'alt'},
          },
        }),
      ],
      validation: (rule) => rule.required().length(3),
    }),
    defineField({
      name: 'credits',
      title: 'Photo credits',
      type: 'array',
      description: 'The small numbered rows under the headline (desktop only).',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'credit',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              validation: (rule) => rule.required().max(40),
            }),
            defineField({
              name: 'meta',
              type: 'string',
              description: 'Camera, campus or location',
              validation: (rule) => rule.required().max(24),
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'meta'}},
        }),
      ],
      validation: (rule) => rule.max(3),
    }),
  ],
  preview: {prepare: () => ({title: 'Hero'})},
})
