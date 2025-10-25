import type {BlockQuote} from '@payload-types'

export default function BlockQuote({block}: {block: BlockQuote}) {
  return (
    <blockquote className="border-l-4 border-blue-medium pl-6 py-4 bg-gray-50 rounded-r-lg">
      <p className="text-lg text-gray-800 font-medium leading-relaxed">&ldquo;{block.quote}&rdquo;</p>
    </blockquote>
  )
}
