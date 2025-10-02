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
      type: 'select',
      required: true,
      options: [
        {label: 'Уголовные дела, связанные с банкротством', value: 'criminal-bankruptcy'},
        {label: 'Уголовные дела, связанные с активами', value: 'criminal-assets'},
        {label: 'Уголовные дела, связанные с руководителями', value: 'criminal-executives'},
        {label: 'Уголовные дела, связанные с собственностью', value: 'criminal-property'},
        {label: 'Уголовные дела, связанные с управляющими', value: 'criminal-managers'},
        {label: 'Уголовные дела, связанные с кредиторами', value: 'criminal-creditors'},
        {label: 'Уголовные дела, связанные с сделками', value: 'criminal-deals'},
        {label: 'Уголовные дела, связанные с злоупотреблениями', value: 'criminal-abuses'},
      ],
      admin: {
        components: {
          Field: {
            path: '/src/payload/ui/project-category-field.tsx',
            exportName: 'ProjectCategoryField',
          },
        },
        condition: (_, {type}) => !!type,
        description: 'Выберите категорию проекта',
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
  ],
}
