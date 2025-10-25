import type {Block} from 'payload'

export const BlockRichText: Block = {
  slug: 'richText',
  interfaceName: 'BlockRichText',
  imageURL: 'https://feoktistov.bozzhik.com/payload/rich-text.jpg',
  imageAltText: 'Block Rich Text',
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
  ],
}
