import configPromise from '@payload-config'

import {getPayload} from 'payload'

import Container from '~/Global/Container'
import Grid from '~~/news/Grid'

export const dynamic = 'force-static'
export const revalidate = 600

export const metadata = {
  title: 'Новости',
}

export default async function NewsPage() {
  const payload = await getPayload({config: configPromise})

  const news = await payload.find({
    collection: 'news',
    limit: 666,
    sort: '-date',
  })

  return (
    <Container>
      <Grid news={news.docs} />
    </Container>
  )
}
