import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'
import {resolve} from './presentation'
import {schemaTypes, SINGLETONS} from './schemaTypes'
import {structure} from './structure'

const singletons = new Set<string>(SINGLETONS)

// Singletons can only be edited and published — never created, duplicated or deleted
const SINGLETON_ACTIONS = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  name: 'default',
  title: 'Kayana Moment',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'ovo94io9',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    presentationTool({
      resolve,
      // Hosted Studio previews production; `sanity dev` reads .env.development → localhost
      previewUrl: {
        initial: process.env.SANITY_STUDIO_PREVIEW_URL || 'https://kayanamoment.vercel.app',
        previewMode: {enable: '/api/draft-mode/enable'},
      },
      allowOrigins: ['http://localhost:*', 'https://kayanamoment.vercel.app'],
    }),
    structureTool({structure}),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({schemaType}) => !singletons.has(schemaType)),
  },

  document: {
    actions: (actions, {schemaType}) =>
      singletons.has(schemaType)
        ? actions.filter(({action}) => action && SINGLETON_ACTIONS.has(action))
        : actions,
  },
})
