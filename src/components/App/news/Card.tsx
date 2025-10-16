'use client'

import {ArrowUpRightIcon} from 'lucide-react'

import type {News} from '@payload-types'
import {CARD} from '~~/projects/Card'

import {cn, formatDate} from '@/lib/utils'

import {motion, type Transition} from 'motion/react'
import {useState} from 'react'

import Link from 'next/link'
import {H3, P, SMALL} from '~/UI/Typography'

const ANIM = {
  size: 'size-24 xl:size-16 sm:size-10',
  shift: 70,
  transition: {
    duration: 0.4,
    ease: 'easeInOut',
    delay: 0.1,
    type: 'spring',
    stiffness: 100,
    damping: 10,
    mass: 1,
  },
}

export default function Card({news, className}: {news: News; className?: string}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link data-slot="projects-card" href={`/news/${news.slug}`} className={cn(CARD, 'space-y-10 xl:space-y-2 sm:space-y-3', 'flex-1', 'flex flex-col justify-between', className)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className={cn('w-full block', 'flex items-center justify-between')}>
        <SMALL className="text-[#5C5C5C]">
          {news.publisher} • {formatDate(news.date)}
        </SMALL>

        <div className={cn(ANIM.size, 'relative overflow-hidden')}>
          <motion.div
            className="absolute inset-0"
            animate={{
              x: isHovered ? ANIM.shift : 0,
              y: isHovered ? -ANIM.shift : 0,
              // opacity: isHovered ? 0 : 1,
            }}
            transition={{...(ANIM.transition as Transition)}}
          >
            <ArrowUpRightIcon className={cn(ANIM.size, 'text-blue-light group-hover:text-background')} strokeWidth={0.5} />
          </motion.div>

          <motion.div
            className="absolute inset-0"
            initial={{
              x: -ANIM.shift,
              y: ANIM.shift,
            }}
            animate={{
              x: isHovered ? 0 : -ANIM.shift,
              y: isHovered ? 0 : ANIM.shift,
              // opacity: isHovered ? 1 : 0,
            }}
            transition={{...(ANIM.transition as Transition)}}
          >
            <ArrowUpRightIcon className={cn(ANIM.size, 'text-blue-light group-hover:text-background')} strokeWidth={0.5} />
          </motion.div>
        </div>
      </div>

      <H3>{news.title}</H3>
      <P className="text-[#737373] sm:!mt-4">{news.caption}</P>
    </Link>
  )
}
