import OverviewImage from '$/overview.gif'
import SequenceImage from '$/sequence.gif'

import {cn} from '@/lib/utils'

import Image from 'next/image'

export default function Media({token}: {token: 'overview' | 'sequence'}) {
  const mediaConfig = (token: 'overview' | 'sequence') => {
    switch (token) {
      case 'overview':
        return {image: OverviewImage, classes: 'h-[90vh] sm:h-[55vh]'}
      case 'sequence':
        return {image: SequenceImage, classes: 'h-[85vh] sm:h-[50vh]'}
    }
  }

  return (
    <section data-section={`${token}-media-index`}>
      <Image unoptimized className={cn('w-full object-cover', mediaConfig(token).classes)} src={mediaConfig(token).image} alt={token} />
    </section>
  )
}
