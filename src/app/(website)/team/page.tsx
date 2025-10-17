import configPromise from '@payload-config'

import {getPayload} from 'payload'

import Container from '~/Global/Container'
import Grid from '~~/team/Grid'

export const dynamic = 'force-static'
export const revalidate = 600

export const metadata = {
  title: 'Команда',
}

export default async function ProjectsPage() {
  const payload = await getPayload({config: configPromise})

  const members = await payload.find({
    collection: 'members',
    limit: 100,
  })

  return (
    <Container>
      <Grid members={members.docs} />
    </Container>
  )
}
