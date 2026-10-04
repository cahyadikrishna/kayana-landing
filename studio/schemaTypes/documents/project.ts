import {ImageIcon} from '@sanity/icons/Image'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {defineField, defineType} from 'sanity'
import {defineImage} from '../helpers'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: ImageIcon,
  orderings: [orderRankOrdering],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (rule) => rule.required(),
    }),
    defineImage({
      name: 'image',
      title: 'Photo',
      description: 'Portrait (3:4). Use the hotspot to keep faces in frame.',
    }),
    orderRankField({type: 'project'}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'category.title', media: 'image'},
  },
})
