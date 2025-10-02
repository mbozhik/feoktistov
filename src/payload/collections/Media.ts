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
        description: 'Добавьте "projects icon – *" в название для файлов-иконок проектов',
      },
    },
  ],
  upload: true,
}
