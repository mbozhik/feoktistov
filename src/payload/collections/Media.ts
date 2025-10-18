import type {CollectionConfig} from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'alt',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: '"projects icon – *" для иконок проектов, "company icon – *" для иконок компаний (достижения)',
      },
    },
  ],
  upload: true,
}
