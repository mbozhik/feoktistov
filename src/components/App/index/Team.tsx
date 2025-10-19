import configPromise from '@payload-config'

import {cn} from '@/lib/utils'

import {getPayload} from 'payload'

import Link from 'next/link'
import Division from '~/UI/Division'
import TeamModule from '~~/index/TeamModule'
import {H4} from '~/UI/Typography'

export default async function Team() {
  const payload = await getPayload({config: configPromise})

  const members = await payload.find({
    collection: 'members',
    limit: 100,
    where: {featured: {equals: true}},
  })

  return (
    <section data-section="team-index" className={cn('bg-blue-dark')}>
      <Division token="division-team" title="Команда" mode="dark" reverse>
        <Link href="/team" className="group">
          <H4 className="text-background-gray font-light border-b border-background-gray group-hover:border-transparent duration-300">Вся команда</H4>
        </Link>
      </Division>

      <TeamModule members={members.docs} />
      <div></div>
    </section>
  )
}
