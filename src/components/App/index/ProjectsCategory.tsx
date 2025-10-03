'use client'

import {ArrowUpRightIcon} from 'lucide-react'
import {motion} from 'motion/react'
import {useState} from 'react'

import type {ProjectCategory} from '@payload-types'

import {cn} from '@/lib/utils'

import Link from 'next/link'
import {H3, SMALL} from '~/UI/Typography'

export default function ProjectsCategory({category}: {category: ProjectCategory}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="flex flex-col">
      <div className={cn('p-8 xl:px-6 xl:py-5 sm:px-3 sm:py-4 space-y-24 xl:space-y-12 sm:space-y-4', 'flex-1', 'flex flex-col justify-between')}>
        <H3>{category.definition}</H3>
        <SMALL className="text-gray-medium sm:font-light">{category.description}</SMALL>
      </div>

      <Link href={`/projects?category=${category.slug}`} className={cn('px-8 py-4 xl:px-6 xl:py-3 sm:px-3 sm:py-2 w-full block', 'flex items-center justify-between', 'border-t', 'group hover:bg-blue-dark duration-300')} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <SMALL className="font-light group-hover:text-background duration-300">Подробнее</SMALL>
        <div className="relative size-8 sm:size-7 overflow-hidden">
          <motion.div
            className="absolute inset-0"
            animate={{
              x: isHovered ? 24 : 0,
              y: isHovered ? -24 : 0,
              // opacity: isHovered ? 0 : 1,
            }}
            transition={{
              duration: 0.4,
              ease: 'easeInOut',
            }}
          >
            <ArrowUpRightIcon className={cn('size-8 sm:size-7 text-blue-light', 'group-hover:text-background')} strokeWidth={1.5} />
          </motion.div>

          <motion.div
            className="absolute inset-0"
            animate={{
              x: isHovered ? 0 : -24,
              y: isHovered ? 0 : 24,
              // opacity: isHovered ? 1 : 0,
            }}
            transition={{
              duration: 0.4,
              ease: 'easeInOut',
            }}
          >
            <ArrowUpRightIcon className={cn('size-8 sm:size-7 text-blue-light', 'group-hover:text-background')} strokeWidth={1.5} />
          </motion.div>
        </div>
      </Link>
    </div>
  )
}
