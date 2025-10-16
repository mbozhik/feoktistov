import {ArrowRight} from 'lucide-react'

import type {Project} from '@payload-types'

import {cn, getRole} from '@/lib/utils'
import {decomposeMember} from '@/utils/decompose-relationship'

import Link from 'next/link'
import PayloadImage from '~/UI/PayloadImage'
import {SMALL} from '~/UI/Typography'

export const CARD = 'p-8 xl:px-6 xl:py-5 sm:px-3 sm:py-4'

export default function Card({project, className}: {project: Project; className?: string}) {
  return (
    <div data-slot="projects-card" className={cn(CARD, 'flex flex-col justify-between gap-10 xl:gap-8 sm:gap-5', className)} key={project.id}>
      <div className="flex flex-col gap-8 sm:gap-4">
        <PayloadImage resource={project.icon} className="!block size-16 xl:size-14 sm:size-13" />

        <SMALL className="!block text-blue-dark">{project.definition}</SMALL>
      </div>

      <div className="flex flex-col gap-10 xl:gap-8 sm:gap-6 sm:pb-1">
        <div className="space-y-4 xl:space-y-3">
          <SMALL className="!text-base text-blue-dark font-semibold">Команда</SMALL>

          <div className="flex gap-6">
            {project.team.map((member) => {
              const memberData = decomposeMember(member.member)
              return (
                <div className="-space-y-0.5" key={member.id}>
                  <SMALL className="!text-base text-blue-dark font-semibold">{getRole(member.role)}</SMALL>
                  <SMALL className="!text-base text-blue-dark">{memberData.name}</SMALL>
                </div>
              )
            })}
          </div>
        </div>

        <Link href={project.mention ?? ''} className={cn('flex items-center gap-1', 'group', !project.mention && 'opacity-0 pointer-events-none sm:hidden')}>
          <SMALL className="text-gray-blue">Смотреть в СМИ</SMALL>
          <ArrowRight className="stroke-gray-blue size-6 group-hover:translate-x-0.75 duration-300" strokeWidth={1.5} />
        </Link>
      </div>
    </div>
  )
}
