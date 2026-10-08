/**
 * Seeds the dataset with the copy and images the landing page shipped with,
 * so the site looks identical on day one. Safe to re-run: documents use fixed
 * IDs and existing ones are left untouched, so editors' changes are never
 * overwritten. Pass --replace to reset everything to the original copy.
 *
 * Hero images come from studio/seed-assets/ (web-sized copies of the
 * originals); the rest are stock placeholders. Images are uploaded only for
 * the documents being created, so a re-run with nothing missing uploads nothing.
 *
 *   pnpm seed               (from studio/, after `npx sanity login`)
 *   pnpm seed -- --replace
 */
import {readFile} from 'node:fs/promises'
import {basename, resolve} from 'node:path'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-10-01'})
const ASSET_DIR = resolve(process.cwd(), 'seed-assets')

let keyCounter = 0
const key = () => `k${(keyCounter++).toString(36).padStart(4, '0')}`

/** Headline Portable Text: strings are plain, [strings] are italic. */
function headline(...parts: (string | [string])[]) {
  return [
    {
      _type: 'block',
      _key: key(),
      style: 'normal',
      markDefs: [],
      children: parts.map((part) => ({
        _type: 'span',
        _key: key(),
        text: Array.isArray(part) ? part[0] : part,
        marks: Array.isArray(part) ? ['em'] : [],
      })),
    },
  ]
}

async function uploadFile(file: string) {
  const path = resolve(ASSET_DIR, file)
  const asset = await client.assets.upload('image', await readFile(path), {
    filename: basename(path),
  })
  return asset._id
}

async function uploadUrl(url: string, filename: string) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Download failed: ${url} (${response.status})`)
  const asset = await client.assets.upload('image', Buffer.from(await response.arrayBuffer()), {
    filename,
  })
  return asset._id
}

function image(assetId: string, alt?: string) {
  return {_type: 'image', asset: {_type: 'reference', _ref: assetId}, ...(alt ? {alt} : {})}
}

/** LexoRank-style ranks for the orderable document list. */
const rank = (i: number) => `0|${String.fromCharCode(105 + i)}00000:`

type Doc = {_id: string; _type: string; [field: string]: unknown}

/** A document plus how to build it; `build` does the document's own uploads. */
type Seed = {_id: string; build: () => Promise<Doc>}

/** A seed for a document with no images. */
const seed = (document: Doc): Seed => ({_id: document._id, build: async () => document})

async function main() {
  const categories = ['Ceremony', 'Portrait', 'Candid'].map((title) =>
    seed({_id: `category-${title.toLowerCase()}`, _type: 'category', title}),
  )
  const categoryRef = (title: string) => ({
    _type: 'reference',
    _ref: `category-${title.toLowerCase()}`,
  })

  // The site shipped with stock placeholders here — replace them in the Studio
  const projects = [
    {title: 'Golden Hour Ceremonies', category: 'Ceremony', photo: 'graduation1'},
    {title: 'A Robe’s Serene Silhouette', category: 'Portrait', photo: 'graduation2'},
    {title: 'Moments Framed in Joy', category: 'Candid', photo: 'graduation3'},
    {title: 'The Last Bell, First Chapter', category: 'Portrait', photo: 'graduation4'},
  ].map((project, i): Seed => ({
    _id: `project-${i + 1}`,
    build: async () => ({
      _id: `project-${i + 1}`,
      _type: 'project',
      title: project.title,
      category: categoryRef(project.category),
      image: image(
        await uploadUrl(
          `https://picsum.photos/seed/${project.photo}/1200/1600`,
          `placeholder-project-${i + 1}.jpg`,
        ),
        project.title,
      ),
      orderRank: rank(i),
    }),
  }))

  const testimonials = [
    {
      quote:
        'Kayana Moment captured everything I didn’t know I needed. The candid shots between the formal ones are my absolute favorites.',
      name: 'Alya Ramadhani',
      occasion: 'Universitas Indonesia — Class of 2024',
    },
    {
      quote:
        'I was nervous in front of the camera but they made it feel completely natural. Every photo tells a real story.',
      name: 'Bintang Prasetyo',
      occasion: 'ITB Graduation — Engineering Faculty',
    },
    {
      quote:
        'The golden hour session was beyond anything I imagined. I still get emotional looking at the photos.',
      name: 'Sari Kusuma',
      occasion: 'UGM — Faculty of Medicine, 2023',
    },
    {
      quote:
        'Professional, warm, and incredibly talented. Our whole family cried when we saw the final gallery.',
      name: 'Reza & Ibu Hartono',
      occasion: 'Family Session — Wisuda IPB 2024',
    },
    {
      quote:
        'Worth every penny. These photos will be on our walls forever. Kayana Moment truly understands the emotion of the day.',
      name: 'Nadya Fitriani',
      occasion: 'Universitas Brawijaya — Class of 2024',
    },
  ].map((testimonial, i) =>
    seed({
      _id: `testimonial-${i + 1}`,
      _type: 'testimonial',
      ...testimonial,
      orderRank: rank(i),
    }),
  )

  const singletons: Seed[] = [
    seed({
      _id: 'siteSettings',
      _type: 'siteSettings',
      siteName: 'Kayana Moment',
      whatsappNumber: '6289606620616',
      whatsappLabel: '+62 896-0662-0616',
      bookingLabel: 'Book a Session',
      email: 'hello@kayanamoment.com',
      instagram: 'kayanamoment',
      location: 'Bali, Indonesia',
      seo: {
        title: 'Kayana Moment — Graduation Photography Agency',
        description:
          'We make your Graduation effortless captured. Professional graduation photography, portraits, and event coverage.',
      },
    }),
    {
      _id: 'hero',
      build: async () => {
        const [background, person1, person2, person3] = await Promise.all(
          ['hero-bg-bw.jpg', 'hero-person-1.webp', 'hero-person-2.webp', 'hero-person-3.webp'].map(
            uploadFile,
          ),
        )
        return {
          _id: 'hero',
          _type: 'hero',
          headline: headline('We make your Graduation ', ['effortless'], ' captured.'),
          background: image(background),
          cutouts: [
            {...image(person1, 'Graduate holding cap'), _key: key()},
            {...image(person3, 'Graduate in red kebaya'), _key: key()},
            {...image(person2, 'Graduate in black kebaya with sash'), _key: key()},
          ],
          credits: [
            {_key: key(), _type: 'credit', title: 'A Symphony of Toques', meta: 'Canon R5'},
            {_key: key(), _type: 'credit', title: 'Last Bell, First Chapter', meta: 'IPB University'},
          ],
        }
      },
    },
    seed({
      _id: 'about',
      _type: 'about',
      eyebrow: 'About Us',
      stats: [
        {value: 1000, suffix: '+', label: 'Graduation sessions captured across Bali'},
        {value: 50, suffix: '+', label: 'Universities and campuses represented'},
        {value: 100, suffix: '%', label: 'Sessions delivered with care and heart'},
      ].map((stat) => ({_key: key(), _type: 'stat', ...stat})),
      quoteEyebrow: 'Why It Matters',
      quote: headline(
        'They’ve already crossed the stage, held their scrolls, and smiled for the last time as students. Their moments are captured ',
        ['beautifully'],
        ', forever. Now it’s your turn.',
      ),
      attribution: 'Kayana Moment',
    }),
    {
      _id: 'home',
      build: async () => ({
        _id: 'home',
        _type: 'home',
        projects: {
          eyebrow: 'Our Work',
          title: headline('The artistry behind a portfolio of ', ['timeless'], ' photographs'),
          blurb:
            'A visual journey through graduation moments captured with creativity and precision — each frame preserving the weight of the day.',
          ctaLabel: 'Explore more',
          ctaHref: 'https://instagram.com/kayanamoment',
        },
        ctaPrimary: {
          _type: 'ctaBlock',
          eyebrow: 'Why Us',
          title: headline(
            'The moments that mark the end of one ',
            ['chapter'],
            ', and the beginning of everything.',
          ),
          body: 'Your graduation only happens once. The nerves, the laughter, the quiet pride in your parents’ eyes — these are the details that disappear fastest. A professional session doesn’t just give you photos. It gives you a way back to exactly how this day felt, for the rest of your life.',
          ctaLabel: 'Let’s capture it',
        },
        testimonials: {
          eyebrow: 'What They Say',
          title: headline('Kind ', ['words'], '.'),
          blurb: 'Every session leaves a story. Here are a few.',
          background: image(
            await uploadUrl(
              'https://picsum.photos/seed/gradmoody/2400/1350',
              'placeholder-testimonials.jpg',
            ),
          ),
        },
        ctaClosing: {
          _type: 'ctaBlock',
          eyebrow: 'One Last Thing',
          title: headline('Don’t let this moment pass without a ', ['frame'], '.'),
          body: 'Years from now, you won’t remember the stress of the thesis or the chaos of the ceremony. You’ll remember how it felt to finally be done — and we’ll make sure you can see it.',
          ctaLabel: 'Let’s capture it',
          note: 'No commitment. Just a conversation.',
        },
        contact: {
          eyebrow: 'Contact Us',
          title: headline('Let’s capture your ', ['vision'], ' with us.'),
        },
      }),
    },
  ]

  const seeds = [...singletons, ...categories, ...projects, ...testimonials]
  const replace = process.argv.includes('--replace')

  // Build (and upload images for) only the documents that will be written
  let pending = seeds
  if (!replace) {
    const ids = seeds.map((s) => s._id)
    const existing = new Set(await client.fetch<string[]>('*[_id in $ids]._id', {ids}))
    pending = seeds.filter((s) => !existing.has(s._id))
  }
  if (pending.length === 0) {
    console.log('Nothing to seed.')
    return
  }

  console.log(`Building ${pending.length} documents (uploading their images)…`)
  const documents = await Promise.all(pending.map((s) => s.build()))
  const transaction = client.transaction()
  for (const document of documents) {
    if (replace) transaction.createOrReplace(document)
    else transaction.createIfNotExists(document)
  }
  await transaction.commit()

  console.log(
    `${replace ? 'Replaced' : 'Seeded (missing only)'} ${documents.length} documents: ${documents.map((d) => d._id).join(', ')}`,
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
