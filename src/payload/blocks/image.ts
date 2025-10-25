import type {Block} from 'payload'

export const BlockImage: Block = {
  slug: 'image',
  interfaceName: 'BlockImage',
  imageURL: 'https://feoktistov.bozzhik.com/payload/image.jpg',
  imageAltText: 'Block Image',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Подпись к изображению',
    },
  ],
}
