import {defineArrayMember, defineField, type PortableTextBlock} from 'sanity'

/**
 * Plain-text length of a Portable Text value.
 */
function plainText(blocks: PortableTextBlock[] | undefined) {
  return (blocks ?? [])
    .flatMap((block) => (Array.isArray(block.children) ? block.children : []))
    .map((child) => (typeof child.text === 'string' ? child.text : ''))
    .join('')
}

/**
 * Number of separate italic runs in a Portable Text value. Adjacent italic
 * spans count as one phrase.
 */
function italicRuns(blocks: PortableTextBlock[] | undefined) {
  let runs = 0
  for (const block of blocks ?? []) {
    let inItalic = false
    for (const child of Array.isArray(block.children) ? block.children : []) {
      const italic = Array.isArray(child.marks) && child.marks.includes('em')
      if (italic && !inItalic) runs++
      inItalic = italic
    }
  }
  return runs
}

/**
 * A one-paragraph headline whose only formatting is italic (DESIGN.md:
 * "at most one italic accent per headline, no bold"). Editors never see
 * styles, lists, links, bold or colour.
 */
export function defineHeadline({
  name,
  title,
  description,
  max,
}: {
  name: string
  title: string
  description?: string
  max: number
}) {
  return defineField({
    name,
    title,
    type: 'array',
    description:
      description ??
      `One paragraph, up to ${max} characters. Italicise one word or phrase (Cmd/Ctrl+I) for the accent.`,
    of: [
      defineArrayMember({
        type: 'block',
        styles: [{title: 'Normal', value: 'normal'}],
        lists: [],
        marks: {decorators: [{title: 'Italic', value: 'em'}], annotations: []},
      }),
    ],
    validation: (rule) =>
      rule
        .required()
        .max(1)
        .custom((value: PortableTextBlock[] | undefined) => {
          const length = plainText(value).length
          if (length > max) return `Too long: ${length}/${max} characters`
          if (italicRuns(value) > 1) return 'Only one italic word or phrase is allowed'
          return true
        }),
  })
}

/**
 * Image with hotspot and required alt text.
 */
export function defineImage({
  name,
  title,
  description,
  decorative = false,
}: {
  name: string
  title: string
  description?: string
  /** Decorative images (backgrounds) get an optional alt. */
  decorative?: boolean
}) {
  return defineField({
    name,
    title,
    type: 'image',
    description,
    options: {hotspot: true},
    fields: [
      defineField({
        name: 'alt',
        title: 'Alt text',
        type: 'string',
        description: decorative
          ? 'Optional — this image is decorative.'
          : 'Describe the photo for screen readers and search engines.',
        validation: (rule) => (decorative ? rule.max(160) : rule.required().max(160)),
      }),
    ],
    validation: (rule) => rule.required(),
  })
}
