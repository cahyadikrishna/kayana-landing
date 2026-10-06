import {CogIcon} from '@sanity/icons/Cog'
import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'contact', title: 'Contact', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site name',
      type: 'string',
      description: 'Shown in the nav, the footer wordmark and the copyright line.',
      group: 'contact',
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp number',
      type: 'string',
      description:
        'Digits only, with country code and no leading 0 or + (e.g. 6281234567890). Every "Book a Session" button uses this.',
      group: 'contact',
      validation: (rule) =>
        rule
          .required()
          .regex(/^[1-9]\d{7,14}$/, {name: 'digits with country code'})
          .error('Use digits only, starting with the country code, e.g. 6281234567890'),
    }),
    defineField({
      name: 'whatsappLabel',
      title: 'WhatsApp number (as displayed)',
      type: 'string',
      description: 'How the number is written in the footer, e.g. +62 812-3456-7890.',
      group: 'contact',
      validation: (rule) => rule.required().max(30),
    }),
    defineField({
      name: 'bookingLabel',
      title: 'Booking button label',
      type: 'string',
      initialValue: 'Book a Session',
      group: 'contact',
      validation: (rule) => rule.required().max(24),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
      group: 'contact',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram handle',
      type: 'string',
      description: 'Without the @, e.g. kayanamoment',
      group: 'contact',
      validation: (rule) =>
        rule
          .required()
          .regex(/^[A-Za-z0-9._]{1,30}$/)
          .error('Handle only, without @ or a URL'),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      options: {collapsible: false},
      fields: [
        defineField({
          name: 'title',
          title: 'Page title',
          type: 'string',
          description: 'Shown in the browser tab and search results.',
          validation: (rule) => rule.required().max(70).warning('Keep it under 70 characters'),
        }),
        defineField({
          name: 'description',
          title: 'Meta description',
          type: 'text',
          rows: 3,
          validation: (rule) =>
            rule.required().max(160).warning('Search engines truncate after ~160 characters'),
        }),
        defineField({
          name: 'ogImage',
          title: 'Share image',
          type: 'image',
          description: 'Used when the link is shared on WhatsApp and social media. 1200×630.',
        }),
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Site settings'})},
})
