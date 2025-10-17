import {ArrowUpRightIcon} from 'lucide-react'

import type {Member} from '@payload-types'

import {cn, getRole} from '@/lib/utils'
// import {decomposeMember} from '@/utils/decompose-relationship'

import Link from 'next/link'
import PayloadImage from '~/UI/PayloadImage'
import {SMALL} from '~/UI/Typography'

export default function Card({member}: {member: Member}) {
  return (
    <Link data-slot="member-card" href={`/team/${member.slug}`} className={cn('flex flex-col gap-2 sm:gap-1.5', 'group')} key={member.id}>
      <div className="relative w-full h-[55vh] sm:h-auto overflow-hidden">
        <PayloadImage resource={member.picture} className="block size-full object-cover object-top group-hover:scale-102 duration-300" />

        <div className={cn('absolute inset-0', 'p-6 xl:p-5 sm:p-3 grid place-items-start', 'group-hover:bg-black/50 duration-300')}>
          <ArrowUpRightIcon className="size-10 text-background opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-300 ease-in-out" strokeWidth={1} />
        </div>
      </div>

      <div className="-space-y-0.5">
        <SMALL offset={0} className="text-black font-normal">
          {member.name}
        </SMALL>

        <SMALL offset={0} className="text-gray font-normal sm:text-sm ">
          {member.position.map((position) => getRole(position)).join(', ')}
        </SMALL>
      </div>
    </Link>
  )
}
