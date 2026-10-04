import {CommentIcon} from '@sanity/icons/Comment'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {defineField, defineType} from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: CommentIcon,
  orderings: [orderRankOrdering],
  fields: [
    defineField({
      name: 'quote',
      type: 'text',
      rows: 4,
      description: 'Without quotation marks — they are added automatically.',
      validation: (rule) => rule.required().max(220),
    }),
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'occasion',
      type: 'string',
      description: 'Campus, faculty or year, e.g. "UGM — Faculty of Medicine, 2023"',
      validation: (rule) => rule.required().max(60),
    }),
    orderRankField({type: 'testimonial'}),
  ],
  preview: {select: {title: 'name', subtitle: 'occasion'}},
})
