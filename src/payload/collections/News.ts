import type {CollectionConfig} from 'payload'

import {BlockRichText} from '@/payload/blocks/rich-text'
import {BlockImageText} from '@/payload/blocks/image-text'
import {BlockImage} from '@/payload/blocks/image'
import {BlockQuote} from '@/payload/blocks/quote'

export const News: CollectionConfig = {
  slug: 'news',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'textarea',
      required: true,
    },
    {
      name: 'publisher',
      type: 'text', // # сделать select?
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'authors',
      type: 'relationship',
      relationTo: 'members',
      hasMany: true,
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      options: [
        {label: 'Новости', value: 'news'},
        {label: 'Медиа', value: 'media'},
        {label: 'Аналитика', value: 'analytics'},
      ],
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        components: {
          Field: {
            path: '/src/payload/ui/slug-field.tsx',
            exportName: 'SlugField',
            clientProps: {
              source: 'title',
            },
          },
        },
      },
      required: true,
    },

    {
      name: 'source',
      type: 'group',
      fields: [
        {
          name: 'description',
          type: 'text',
        },
        {
          name: 'link',
          type: 'text',
        },
      ],
    },
    {
      name: 'content',
      type: 'blocks',
      blocks: [BlockRichText, BlockImageText, BlockImage, BlockQuote],
      required: true,
    },
  ],
}
