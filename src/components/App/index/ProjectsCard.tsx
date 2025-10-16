'use client'

import {ArrowUpRightIcon} from 'lucide-react'

import type {ProjectCategory} from '@payload-types'
import {CARD} from '~~/projects/Card'

import {cn} from '@/lib/utils'

import {motion, type Transition} from 'motion/react'
import {useState} from 'react'

import Link from 'next/link'
import {H3, SMALL} from '~/UI/Typography'

const ANIM = {
  size: 'size-8 sm:size-7',
  shift: 24,
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

export default function ProjectsCard({category, className}: {category: ProjectCategory; className?: string}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div data-slot="card-category-projects" className={cn('flex flex-col', className)}>
      <div className={cn(CARD, 'space-y-24 xl:space-y-12 sm:space-y-4', 'flex-1', 'flex flex-col justify-between')}>
        <H3>{category.definition}</H3>
        <SMALL className="text-gray-medium sm:font-light">{category.description}</SMALL>
      </div>

      <Link href={`/projects?category=${category.slug}`} className={cn('px-8 py-4 xl:px-6 xl:py-3 sm:px-3 sm:py-2 w-full block', 'flex items-center justify-between', 'border-t', 'group hover:bg-blue-dark duration-300')} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <SMALL className="font-light group-hover:text-background duration-300">Подробнее</SMALL>
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
            <ArrowUpRightIcon className={cn(ANIM.size, 'text-blue-light group-hover:text-background')} strokeWidth={1.5} />
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
            <ArrowUpRightIcon className={cn(ANIM.size, 'text-blue-light group-hover:text-background')} strokeWidth={1.5} />
          </motion.div>
        </div>
      </Link>
    </div>
  )
}
