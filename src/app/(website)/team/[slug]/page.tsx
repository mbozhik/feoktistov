import {Phone, Mail, ArrowUpRight} from 'lucide-react'

import type {Metadata} from 'next'
import {GRID_CONFIG, GRID_CELL} from '@/lib/constants'
import configPromise from '@payload-config'

import {cn, getRole} from '@/lib/utils'

import {getPayload} from 'payload'

import Link from 'next/link'
import Container from '~/Global/Container'
import PayloadImage from '~/UI/PayloadImage'
import ProjectCard from '~~/projects/Card'
import NewsCard from '~~/news/Card'
import {H1, H4, SMALL, SPAN} from '~/UI/Typography'

export const dynamic = 'force-static'
export const revalidate = 600

type Props = {
  params: Promise<{slug: string}>
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params
  const payload = await getPayload({config: configPromise})

  const member = await payload.find({
    collection: 'members',
    limit: 1,
    where: {slug: {equals: slug}},
  })

  return {
    title: member.docs[0]?.name,
    description: `${member.docs[0]?.position.map((position) => getRole(position)).join(', ')} – ${member.docs[0]?.about.map((about) => about.item).join(', ')}`,
  }
}

function Block({title, offset = true, className, children}: {title: string; offset?: boolean; className?: string; children: React.ReactNode}) {
  return (
    <div className="space-y-6 xl:space-y-4 sm:space-y-3.5">
      <SPAN className="text-blue-medium font-bold">{title}</SPAN>

      <div className={cn(offset && 'pt-4.5 xl:pt-2.5 sm:pt-2', !offset && 'border', 'border-t border-[#C2C2C2]', className)}>{children}</div>
    </div>
  )
}

export default async function NewsItemPage({params}: Props) {
  const slug = (await params).slug
  const payload = await getPayload({config: configPromise})

  const member = await payload.find({
    collection: 'members',
    limit: 1,
    where: {slug: {equals: slug}},
  })

  const memberItem = member.docs[0]

  if (!memberItem) {
    return <div>Член команды не найден</div>
  }

  const memberProjects = await payload.find({
    collection: 'projects',
    where: {
      'team.member': {
        equals: memberItem.id,
      },
    },
  })

  const memberNews = await payload.find({
    collection: 'news',
    where: {
      authors: {
        in: [memberItem.id],
      },
    },
  })

  const GRID = {
    base: 'grid-cols-10',
    large: 'col-span-7',
    small: 'col-span-3',
  }

  return (
    <Container className={cn('px-36 xl:px-14 sm:px-4 py-32 xl:py-24 sm:py-16', 'space-y-36 xl:space-y-16', 'bg-background divide-y-0')}>
      <div className={cn('grid gap-40 xl:gap-20 sm:gap-10 sm:flex sm:flex-col-reverse', GRID.base)}>
        <div className={cn(GRID.large, 'space-y-10 xl:space-y-8')}>
          <div className={cn('sm:hidden', 'space-y-6 xl:space-y-3')}>
            <H1 className="font-normal normal-case">{memberItem.name}</H1>
            <H4 className="text-blue-medium">{memberItem.position.map((position) => getRole(position)).join(', ')}</H4>
          </div>

          <Block title="Образование" className="grid grid-cols-2 sm:grid-cols-1 gap-16 sm:gap-4">
            {memberItem.education.map((education) => (
              <div className="space-y-1.5 sm:space-y-1" key={education.id}>
                <SMALL className="text-blue-medium">{education.degree}</SMALL>
                <SMALL className="text-gray-blue">{education.period}</SMALL>
              </div>
            ))}
          </Block>

          <Block title="Награды" className="grid grid-cols-3 sm:grid-cols-1 gap-x-16 xl:gap-x-12 sm:gap-y-8 sm:pt-4">
            {memberItem.awards.map((award) => (
              <div key={award.id} className="flex flex-col sm:flex-col-reverse justify-between gap-8 sm:gap-4">
                <div className="flex-1 space-y-4 sm:space-y-2">
                  {award.items.map((item) => (
                    <SMALL className="text-blue-medium leading-tight" key={item.id}>
                      {item.title}
                    </SMALL>
                  ))}
                </div>

                <div className="self-end sm:self-start">
                  <PayloadImage resource={award.company} className={cn('h-12 xl:h-10 sm:h-12 max-w-[250px] xl:max-w-[200px] sm:max-w-[250px] sm:w-auto', 'object-contain opacity-30')} />
                </div>
              </div>
            ))}
          </Block>

          <Block title="О специалисте" className="space-y-5 sm:space-y-4.5">
            {memberItem.about.map((about, idx) => (
              <div className="flex gap-6 sm:gap-3" key={about.id}>
                <SPAN className={cn('pl-3 pr-6 min-w-12 sm:pl-0 sm:pr-3 sm:min-w-6', 'grid place-items-center sm:items-start', 'border-r border-[#C2C2C2]', 'text-blue-medium font-normal')}>{idx + 1}</SPAN>
                <SMALL className="text-blue-medium flex-1" key={about.id}>
                  {about.item}
                </SMALL>
              </div>
            ))}
          </Block>
        </div>

        <div className={cn(GRID.small, 'space-y-5 sm:space-y-4')}>
          <div className={cn('hidden sm:block', 'sm:space-y-2')}>
            <H1 className="font-normal normal-case">{memberItem.name}</H1>
            <H4 className="text-blue-medium">{memberItem.position.map((position) => getRole(position)).join(', ')}</H4>
          </div>

          <div className="w-full h-[60vh] sm:h-auto overflow-hidden">
            <PayloadImage resource={memberItem.picture} className="block size-full object-cover object-top group-hover:scale-102 duration-300" />
          </div>

          <div className="space-y-2.5 sm:space-y-3 text-blue-medium">
            {Object.entries(memberItem.contacts).map(([key, value]) => (
              <Link href={key === 'phone' ? `tel:${value}` : `mailto:${value}`} className="flex items-center gap-4 sm:gap-4 group" key={key}>
                {key === 'phone' ? <Phone className="size-5 sm:size-6 group-hover:scale-105 duration-300" /> : <Mail className="size-5 sm:size-6 group-hover:scale-105 duration-300" />}
                <SMALL className="sm:text-xl group-hover:underline underline-offset-2">{value}</SMALL>
              </Link>
            ))}
          </div>

          <Link href="#contacts" className={cn('w-full py-3 xl:py-2.5 sm:py-2', 'flex items-center justify-center gap-1', 'border border-blue-medium text-blue-medium', 'hover:bg-blue-medium/15 duration-300')}>
            <SMALL>Связаться</SMALL>
            <ArrowUpRight className="size-6" strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      {memberProjects.docs.length > 0 && (
        <Block title="Участие в проектах" offset={false} className={GRID_CONFIG(3, memberProjects.docs.length)}>
          {memberProjects.docs.map((project, idx) => (
            <ProjectCard variant="member" project={project} key={project.id} className={GRID_CELL(idx)} />
          ))}
        </Block>
      )}

      {memberNews.docs.length > 0 && (
        <Block title="Участие в новостях" offset={false} className={GRID_CONFIG(3, memberNews.docs.length)}>
          {memberNews.docs.map((news, idx) => (
            <NewsCard news={news} key={news.id} className={GRID_CELL(idx)} />
          ))}
        </Block>
      )}
    </Container>
  )
}
