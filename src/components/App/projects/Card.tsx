import {ArrowRight} from 'lucide-react'

import type {Project} from '@payload-types'

import {cn, getRole} from '@/lib/utils'
import {decomposeMember} from '@/utils/decompose-relationship'

import Link from 'next/link'
import PayloadImage from '~/UI/PayloadImage'
import {SMALL} from '~/UI/Typography'

export const CARD = 'p-8 xl:px-6 xl:py-5 sm:px-3 sm:py-4'

export default function Card({project, variant = 'default', className}: {project: Project; variant?: 'default' | 'member'; className?: string}) {
  const isDefault = variant === 'default'

  return (
    <div data-slot="project-card" className={cn(CARD, 'flex flex-col justify-between gap-10 xl:gap-8 sm:gap-5', className)} key={project.id}>
      <div className="flex flex-col gap-8 sm:gap-4">
        <PayloadImage resource={project.icon} className={cn('!block size-16 xl:size-14 sm:size-13', !isDefault && 'opacity-70')} />

        <SMALL className={cn('!block', isDefault ? 'text-blue-dark' : 'text-blue-medium')}>{project.definition}</SMALL>
      </div>

      <div className="flex flex-col gap-10 xl:gap-8 sm:gap-6 sm:pb-1">
        <div className="space-y-4 xl:space-y-3">
          <SMALL className={cn('!text-base font-semibold', isDefault ? 'text-blue-dark' : 'text-blue-medium')}>Команда</SMALL>

          <div className="flex gap-6">
            {project.team.map((member) => {
              const memberData = decomposeMember(member.member)
              return (
                <div className="-space-y-0.5" key={member.id}>
                  <SMALL className={cn('!text-base font-semibold', isDefault ? 'text-blue-dark' : 'text-blue-medium')}>{getRole(member.role)}</SMALL>
                  <SMALL className={cn('!text-base', isDefault ? 'text-blue-dark' : 'text-blue-medium')}>{memberData.name}</SMALL>
                </div>
              )
            })}
          </div>
        </div>

        <Link href={project.mention ?? ''} className={cn('flex items-center gap-1', 'group', !project.mention && 'opacity-0 pointer-events-none sm:hidden')}>
          <SMALL className="text-gray-blue group-hover:text-blue-dark duration-300">Смотреть в СМИ</SMALL>
          <ArrowRight className={cn('stroke-gray-blue size-6', 'group-hover:stroke-blue-dark group-hover:translate-x-0.75 duration-300')} strokeWidth={1.5} />
        </Link>
      </div>
    </div>
  )
}
