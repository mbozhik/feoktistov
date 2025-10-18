import type {CollectionConfig} from 'payload'

export const Achievements: CollectionConfig = {
  slug: 'achievements',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'company',
      type: 'relationship',
      relationTo: 'media',
      filterOptions: {
        alt: {
          like: 'company icon',
        },
      },
      required: true,
    },
    {
      name: 'queue',
      type: 'number',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
      required: true,
    },
  ],
}
