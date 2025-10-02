import type {CollectionConfig} from 'payload'

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
      name: 'authors',
      type: 'relationship',
      relationTo: 'members',
      hasMany: true,
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
      type: 'textarea',
      required: true,
    },
  ],
}
