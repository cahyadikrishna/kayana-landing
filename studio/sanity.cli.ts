import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'ovo94io9',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  studioHost: 'kayanamoment',
  deployment: {appId: 'm7spc0woh0e115v7ggyzz3rr', autoUpdates: true},
  typegen: {
    path: '../src/**/*.{ts,tsx}',
    schema: './schema.json',
    generates: '../src/sanity/types.ts',
    overloadClientMethods: true,
  },
})
