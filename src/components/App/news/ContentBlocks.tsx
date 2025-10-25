import type {BlockRichText, BlockImageText, BlockImage, BlockQuote} from '@payload-types'

import ImageBlock from '~~/news/BlockImage'
import ImageTextBlock from '~~/news/BlockImageText'
import QuoteBlock from '~~/news/BlockQuote'
import RichTextBlock from '~~/news/BlockRichText'

type ContentBlock = BlockRichText | BlockImageText | BlockImage | BlockQuote

export default function ContentBlocks({blocks}: {blocks: ContentBlock[]}) {
  return (
    <div className="space-y-8">
      {blocks.map((block) => {
        switch (block.blockType) {
          case 'richText':
            return <RichTextBlock key={block.id} block={block} />

          case 'imageText':
            return <ImageTextBlock key={block.id} block={block} />

          case 'image':
            return <ImageBlock key={block.id} block={block} />

          case 'quote':
            return <QuoteBlock key={block.id} block={block} />

          default:
            return null
        }
      })}
    </div>
  )
}
