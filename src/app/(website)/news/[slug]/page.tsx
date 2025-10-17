import {ArrowUpRightIcon} from 'lucide-react'

import type {Metadata} from 'next'
import configPromise from '@payload-config'

import {cn, formatDate, getRole} from '@/lib/utils'
import {decomposeMember} from '@/utils/decompose-relationship'

import {getPayload} from 'payload'

import Link from 'next/link'
import Container from '~/Global/Container'
import PayloadImage from '~/UI/PayloadImage'
import {H2, P, SMALL, SPAN} from '~/UI/Typography'

export const dynamic = 'force-static'
export const revalidate = 600

type Props = {
  params: Promise<{slug: string}>
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params
  const payload = await getPayload({config: configPromise})

  const news = await payload.find({
    collection: 'news',
    limit: 1,
    where: {slug: {equals: slug}},
  })

  return {
    title: news.docs[0]?.title,
    description: news.docs[0]?.caption,
  }
}

export default async function NewsItemPage({params}: Props) {
  const slug = (await params).slug
  const payload = await getPayload({config: configPromise})

  const news = await payload.find({
    collection: 'news',
    limit: 666,
    where: {slug: {equals: slug}},
  })

  const newsItem = news.docs[0]

  if (!newsItem) {
    return <div>Новость не найдена</div>
  }

  // Temporary limit the number of authors to 2
  const limitedAuthors = newsItem.authors.slice(0, 2)

  const BOX = {
    large: 'w-[90%] xl:w-[93%] sm:w-auto mx-auto sm:px-2',
    medium: 'w-[70%] xl:w-[80%] sm:w-auto mx-auto sm:px-2',
    small: 'w-[60%] sm:w-auto mx-auto sm:px-2',
  }

  const CELL = 'flex-1 max-w-[20vw] xl:max-w-[22vw] sm:max-w-none'

  return (
    <Container className={cn('space-y-8 xl:space-y-4 sm:space-y-2', 'bg-background divide-y-0')}>
      <div className={cn(BOX.large, 'py-10 sm:py-4 space-y-5 sm:space-y-2')}>
        <SPAN offset={0} className="text-gray-blue font-normal">
          {formatDate(newsItem.date)}
        </SPAN>

        <H2 className="text-black sm:text-2xl">{newsItem.title}</H2>
      </div>

      <div className={cn(BOX.medium, 'pb-16 sm:pb-0', 'flex justify-center sm:grid sm:grid-cols-2 gap-6 xl:gap-4 sm:gap-2')}>
        {limitedAuthors.map((author) => {
          const authorData = decomposeMember(author)
          return (
            <Link data-slot="author-news" href={`/team/${authorData.slug}`} className={cn(CELL, 'relative', 'flex flex-col gap-2', 'group')} key={authorData.id}>
              <div className="w-full h-[55vh] sm:h-auto overflow-hidden">
                <PayloadImage resource={authorData.picture} className="block size-full object-cover object-top group-hover:scale-102 duration-300" />
              </div>

              <div className={cn('absolute sm:static left-0 -bottom-15 xl:-bottom-14', '-space-y-0.5')}>
                <SMALL offset={0} className="text-black font-normal">
                  {authorData.name}
                </SMALL>

                <SMALL offset={0} className="text-gray font-normal sm:text-sm ">
                  {authorData.position.map((position) => getRole(position)).join(', ')}
                </SMALL>
              </div>

              <div className={cn('absolute inset-0', 'p-6 xl:p-5 sm:p-3 grid place-items-start', 'group-hover:bg-black/50 duration-300')}>
                <ArrowUpRightIcon className="size-10 text-background opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-300 ease-in-out" strokeWidth={1} />
              </div>
            </Link>
          )
        })}

        {newsItem.source?.link && newsItem.source?.description && (
          <Link data-slot="source-news" href={newsItem.source?.link as string} target="_blank" className={cn(CELL, 'p-6 xl:p-5 sm:p-3 min-h-full', 'flex items-end justify-between', 'col-span-2 col-start-1 row-start-1', 'bg-blue-medium text-background', 'hover:bg-blue-medium/90 duration-300 group')}>
            <P className="!leading-[1.25] max-w-[15ch] sm:max-w-[25ch]">{newsItem.source?.description}</P>

            <ArrowUpRightIcon className="size-10 sm:size-7 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-300 ease-in-out" strokeWidth={1} />
          </Link>
        )}
      </div>

      <div className={cn(BOX.small, '!my-16 xl:!my-14 sm:!my-10')}>
        <SMALL>{newsItem.content}</SMALL>
      </div>
    </Container>
  )
}
