import type {CollectionConfig} from 'payload'

export const Member: CollectionConfig = {
  slug: 'member',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'position',
      type: 'select',
      required: true,
      hasMany: true,
      options: [
        {
          label: 'Управляющий партнер',
          value: 'partner',
        },
        {
          label: 'Адвокат',
          value: 'advocate',
        },
        {
          label: 'Юрист',
          value: 'lawyer',
        },
      ],
    },
    {
      name: 'picture',
      type: 'upload',
      relationTo: 'media',
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
              source: 'name',
            },
          },
        },
      },
      required: true,
    },
    {
      name: 'contacts',
      type: 'group',
      fields: [
        {
          name: 'phone',
          type: 'number',
          required: true,
        },
        {
          name: 'email',
          type: 'email',
          required: true,
        },
      ],
      required: true,
    },
    {
      name: 'education',
      type: 'array',
      fields: [
        {
          name: 'degree',
          type: 'text',
          required: true,
        },
        {
          name: 'period',
          type: 'text',
          required: true,
        },
      ],
      required: true,
    },
    {
      name: 'awards',
      type: 'array',
      fields: [
        {
          name: 'award',
          type: 'text',
          required: true,
        },
      ],
      required: true,
    },
    {
      name: 'about',
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
