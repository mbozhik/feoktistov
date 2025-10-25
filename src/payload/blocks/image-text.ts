import type {Block} from 'payload'

export const BlockImageText: Block = {
  slug: 'imageText',
  interfaceName: 'BlockImageText',
  imageURL: 'https://feoktistov.bozzhik.com/payload/image-text.jpg',
  imageAltText: 'Block Image with Text',
  fields: [
    {
      name: 'images',
      type: 'array',
      minRows: 1,
      maxRows: 2,
      required: true,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'layout',
      type: 'select',
      options: [
        {label: 'Слева (2)', value: 'left'},
        {label: 'Лево верх (1)', value: 'topLeft'},
        {label: 'Право верх (1)', value: 'topRight'},
        {label: 'Право низ (1)', value: 'bottomRight'},
        {label: 'Лево низ (1)', value: 'bottomLeft'},
      ],
      defaultValue: 'left',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
  ],
}
