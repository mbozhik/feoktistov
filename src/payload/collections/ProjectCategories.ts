import type {CollectionConfig} from 'payload'

export const ProjectCategories: CollectionConfig = {
  slug: 'project-categories',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'definition',
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        {label: 'Защита', value: 'defense'},
        {label: 'Нападение', value: 'attack'},
      ],
    },
    {
      name: 'definition',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
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
              source: 'definition',
            },
          },
        },
      },
      required: true,
    },
  ],
}
