'use client'

import type {ProjectCategory} from '@payload-types'
import {CARD} from '~~/projects/Card'

import {cn} from '@/lib/utils'

import {useState} from 'react'

import Link from 'next/link'
import AnimatedArrow from '~/UI/AnimatedArrow'
import {H3, SMALL} from '~/UI/Typography'

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
        <AnimatedArrow
          isHovered={isHovered}
          size="size-8 sm:size-7"
          shift={24}
          strokeWidth={1.25}
          colors={{
            default: 'text-blue-light',
            hover: 'group-hover:text-background',
          }}
        />
      </Link>
    </div>
  )
}
