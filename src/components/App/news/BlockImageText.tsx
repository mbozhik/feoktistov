import type {BlockImageText} from '@payload-types'

import {cn} from '@/lib/utils'

import PayloadImage from '~/UI/PayloadImage'
import {RichText} from '@payloadcms/richtext-lexical/react'

const layoutClasses = {
  left: 'grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center',
  topLeft: 'grid grid-cols-1 gap-4',
  topRight: 'grid grid-cols-1 gap-4',
  bottomRight: 'grid grid-cols-1 gap-4',
  bottomLeft: 'grid grid-cols-1 gap-4',
}

export default function BlockImageText({block}: {block: BlockImageText}) {
  const layoutClass = layoutClasses[block.layout] || layoutClasses.left

  if (block.layout === 'left') {
    // Layout для 1-2 изображений слева
    return (
      <div className={cn(layoutClass)}>
        {/* Изображения */}
        <div className="space-y-4">
          {block.images.map((item, index) => (
            <PayloadImage key={item.id || index} resource={item.image} className="w-full h-64 object-cover rounded-lg" alt={`Изображение ${index + 1}`} />
          ))}
        </div>

        {/* Текст */}
        <div className="prose prose-lg max-w-none">
          <RichText data={block.content} />
        </div>
      </div>
    )
  }

  // Layout для одного изображения в углу
  const singleImage = block.images[0]
  if (!singleImage) return null

  return (
    <div className="relative">
      {/* Текст */}
      <div className="prose prose-lg max-w-none">
        <RichText data={block.content} />
      </div>

      {/* Изображение в углу */}
      <div
        className={cn('absolute w-48 h-32 rounded-lg overflow-hidden', {
          'top-0 left-0': block.layout === 'topLeft',
          'top-0 right-0': block.layout === 'topRight',
          'bottom-0 right-0': block.layout === 'bottomRight',
          'bottom-0 left-0': block.layout === 'bottomLeft',
        })}
      >
        <PayloadImage resource={singleImage.image} className="w-full h-full object-cover" alt="Изображение" />
      </div>
    </div>
  )
}
