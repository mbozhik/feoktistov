import type {CollectionConfig} from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'definition',
  },
  fields: [
    {
      name: 'definition',
      type: 'text',
      required: true,
    },
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
      name: 'category',
      type: 'relationship',
      relationTo: 'project-categories',
      required: true,
      filterOptions: ({data}) => {
        if (!data?.type) {
          return true // Показываем все категории если тип не выбран
        }
        return {
          type: {equals: data.type},
        }
      },
    },
    {
      name: 'icon',
      type: 'relationship',
      relationTo: 'media',
      required: true,
      filterOptions: {
        alt: {
          like: 'projects icon',
        },
      },
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
    {
      name: 'team',
      type: 'array',
      fields: [
        {
          name: 'member',
          type: 'relationship',
          relationTo: 'members',
          required: true,
        },
        {
          name: 'role',
          type: 'select',
          options: [
            {label: 'Адвокат', value: 'advocate'},
            {label: 'Юрист', value: 'lawyer'},
          ],
          required: true,
        },
      ],
      required: true,
    },
    {
      name: 'mention',
      type: 'text',
    },
  ],
}
