import type {BlockImage} from '@payload-types'

import PayloadImage from '~/UI/PayloadImage'

export default function BlockImage({block}: {block: BlockImage}) {
  return (
    <div className="space-y-3">
      <div className="mx-auto">
        <PayloadImage resource={block.image} className="w-full h-full object-cover rounded-lg" />
      </div>
      {block.caption && <p className="text-center text-sm text-gray-600 italic">{block.caption}</p>}
    </div>
  )
}
