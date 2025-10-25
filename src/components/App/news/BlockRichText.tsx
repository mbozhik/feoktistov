import type {BlockRichText} from '@payload-types'

import {RichText} from '@payloadcms/richtext-lexical/react'

export default function BlockRichText({block}: {block: BlockRichText}) {
  return (
    <div className="prose prose-lg max-w-none">
      <RichText data={block.content} />
    </div>
  )
}
