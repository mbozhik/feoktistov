import configPromise from '@payload-config'
import {GRID_CONFIG} from '@/lib/constants'

import {cn} from '@/lib/utils'

import {getPayload} from 'payload'

import Link from 'next/link'
import Division from '~/UI/Division'
import Card from '~~/news/Card'
import {H4} from '~/UI/Typography'

export default async function News() {
  const payload = await getPayload({config: configPromise})

  const news = await payload.find({
    collection: 'news',
    limit: 666,
    sort: '-date',
  })

  return (
    <section id="news" data-section="news-index" className="bg-background">
      <Division size="large" token={`news-division`} title="Новости">
        <Link href="/news" className="group">
          <H4 className="font-light border-b border-blue-dark group-hover:border-transparent duration-300">Все новости</H4>
        </Link>
      </Division>

      <div className={GRID_CONFIG}>
        {news.docs.map((newsItem) => (
          <Card news={newsItem} key={newsItem.id} className={cn(news.docs.length < 3 && 'last:border-r')} />
        ))}
      </div>
    </section>
  )
}
