import type {Block} from 'payload'

export const BlockQuote: Block = {
  slug: 'quote',
  interfaceName: 'BlockQuote',
  imageURL: 'https://feoktistov.bozzhik.com/payload/quote.jpg',
  imageAltText: 'Block Quote',
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      label: 'Текст цитаты',
    },
  ],
}
