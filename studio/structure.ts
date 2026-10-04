import {CogIcon} from '@sanity/icons/Cog'
import {CommentIcon} from '@sanity/icons/Comment'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {HomeIcon} from '@sanity/icons/Home'
import {ImageIcon} from '@sanity/icons/Image'
import {TagIcon} from '@sanity/icons/Tag'
import {UsersIcon} from '@sanity/icons/Users'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import type {StructureResolver} from 'sanity/structure'

function singleton(S: Parameters<StructureResolver>[0], type: string, title: string, icon: typeof CogIcon) {
  return S.listItem()
    .title(title)
    .id(type)
    .icon(icon)
    .child(S.document().schemaType(type).documentId(type).title(title))
}

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      singleton(S, 'hero', 'Hero', HomeIcon),
      singleton(S, 'about', 'About', UsersIcon),
      singleton(S, 'home', 'Home page sections', DocumentTextIcon),
      S.divider(),
      orderableDocumentListDeskItem({type: 'project', title: 'Projects', icon: ImageIcon, S, context}),
      S.documentTypeListItem('category').title('Categories').icon(TagIcon),
      orderableDocumentListDeskItem({
        type: 'testimonial',
        title: 'Testimonials',
        icon: CommentIcon,
        S,
        context,
      }),
      S.divider(),
      singleton(S, 'siteSettings', 'Site settings', CogIcon),
    ])
