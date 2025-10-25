'use client'

import type {News} from '@payload-types'
import {CARD} from '~~/projects/Card'

import {cn, formatDate} from '@/lib/utils'

import {useState} from 'react'

import Link from 'next/link'
import AnimatedArrow from '~/UI/AnimatedArrow'
import {H3, P, SMALL} from '~/UI/Typography'

export default function Card({news, className}: {news: News; className?: string}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link data-slot="projects-card" href={`/news/${news.slug}`} className={cn(CARD, 'space-y-10 xl:space-y-2 sm:space-y-3', 'flex-1', 'flex flex-col justify-between', className)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className={cn('w-full block', 'flex items-center justify-between')}>
        <SMALL className="text-[#5C5C5C]">
          {news.publisher} • {formatDate(news.date)}
        </SMALL>

        <AnimatedArrow isHovered={isHovered} size="size-24 xl:size-14 sm:size-10" shift={70} strokeWidth={0.5} />
      </div>

      <H3>{news.title}</H3>
      <P className="text-[#737373] xl:!mt-3 sm:!mt-4">{news.caption}</P>
    </Link>
  )
}
