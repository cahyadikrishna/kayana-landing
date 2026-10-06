/**
 * Seeds the dataset with the copy and images the landing page shipped with,
 * so the site looks identical on day one. Safe to re-run: documents use fixed
 * IDs and existing ones are left untouched, so editors' changes are never
 * overwritten. Pass --replace to reset everything to the original copy.
 *
 *   pnpm seed               (from studio/, after `npx sanity login`)
 *   pnpm seed -- --replace
 */
import {readFile} from 'node:fs/promises'
import {basename, resolve} from 'node:path'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-10-01'})
const PUBLIC_DIR = resolve(process.cwd(), '../public')

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

async function uploadFile(path: string) {
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

async function main() {
  console.log('Uploading hero images…')
  const [background, person1, person2, person3] = await Promise.all(
    ['hero-bg-bw.png', 'hero-person-1.png', 'hero-person-2.png', 'hero-person-3.png'].map(
      (file) => uploadFile(resolve(PUBLIC_DIR, 'assets', file)),
    ),
  )

  // The site shipped with stock placeholders here — replace them in the Studio
  console.log('Uploading placeholder photos…')
  const [project1, project2, project3, project4, testimonialsBg] = await Promise.all([
    uploadUrl('https://picsum.photos/seed/graduation1/1200/1600', 'placeholder-project-1.jpg'),
    uploadUrl('https://picsum.photos/seed/graduation2/1200/1600', 'placeholder-project-2.jpg'),
    uploadUrl('https://picsum.photos/seed/graduation3/1200/1600', 'placeholder-project-3.jpg'),
    uploadUrl('https://picsum.photos/seed/graduation4/1200/1600', 'placeholder-project-4.jpg'),
    uploadUrl('https://picsum.photos/seed/gradmoody/2400/1350', 'placeholder-testimonials.jpg'),
  ])

  const categories = ['Ceremony', 'Portrait', 'Candid'].map((title) => ({
    _id: `category-${title.toLowerCase()}`,
    _type: 'category',
    title,
  }))
  const categoryRef = (title: string) => ({
    _type: 'reference',
    _ref: `category-${title.toLowerCase()}`,
  })

  const projects = [
    {title: 'Golden Hour Ceremonies', category: 'Ceremony', asset: project1},
    {title: 'A Robe’s Serene Silhouette', category: 'Portrait', asset: project2},
    {title: 'Moments Framed in Joy', category: 'Candid', asset: project3},
    {title: 'The Last Bell, First Chapter', category: 'Portrait', asset: project4},
  ].map((project, i) => ({
    _id: `project-${i + 1}`,
    _type: 'project',
    title: project.title,
    category: categoryRef(project.category),
    image: image(project.asset, project.title),
    orderRank: rank(i),
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
  ].map((testimonial, i) => ({
    _id: `testimonial-${i + 1}`,
    _type: 'testimonial',
    ...testimonial,
    orderRank: rank(i),
  }))

  const singletons = [
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
        background: image(testimonialsBg),
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
    },
  ]

  const documents: Array<{_id: string; _type: string; [field: string]: unknown}> = [
    ...singletons,
    ...categories,
    ...projects,
    ...testimonials,
  ]
  const replace = process.argv.includes('--replace')
  const transaction = client.transaction()
  for (const document of documents) {
    if (replace) transaction.createOrReplace(document)
    else transaction.createIfNotExists(document)
  }
  await transaction.commit()

  console.log(`${replace ? 'Replaced' : 'Seeded (missing only)'} ${documents.length} documents.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
