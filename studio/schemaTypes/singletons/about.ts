import {UsersIcon} from '@sanity/icons/Users'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {defineHeadline} from '../helpers'

export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Section label',
      type: 'string',
      validation: (rule) => rule.required().max(24),
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      description: 'Exactly three. Numbers count up when the section scrolls into view.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'stat',
          fields: [
            defineField({
              name: 'value',
              type: 'number',
              validation: (rule) => rule.required().integer().min(0).max(999999),
            }),
            defineField({
              name: 'suffix',
              type: 'string',
              description: 'e.g. + or %',
              validation: (rule) => rule.max(2),
            }),
            defineField({
              name: 'label',
              type: 'string',
              validation: (rule) => rule.required().max(60),
            }),
          ],
          preview: {
            select: {value: 'value', suffix: 'suffix', label: 'label'},
            prepare: ({value, suffix, label}) => ({
              title: `${value ?? ''}${suffix ?? ''}`,
              subtitle: label,
            }),
          },
        }),
      ],
      validation: (rule) => rule.required().length(3),
    }),
    defineField({
      name: 'quoteEyebrow',
      title: 'Quote label',
      type: 'string',
      validation: (rule) => rule.required().max(24),
    }),
    defineHeadline({
      name: 'quote',
      title: 'Quote',
      description:
        'Up to 220 characters, without quotation marks (they are added automatically). Italicise one word or phrase.',
      max: 220,
    }),
    defineField({
      name: 'attribution',
      title: 'Attribution',
      type: 'string',
      validation: (rule) => rule.required().max(40),
    }),
  ],
  preview: {prepare: () => ({title: 'About'})},
})
