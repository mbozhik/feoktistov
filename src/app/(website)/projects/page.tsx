import configPromise from '@payload-config'

import {getPayload} from 'payload'

import Container from '~/Global/Container'
import Grid from '~~/projects/Grid'

export const dynamic = 'force-static'
export const revalidate = 600

export const metadata = {
  title: 'Проекты',
}

export default async function ProjectsPage() {
  const payload = await getPayload({config: configPromise})

  const projects = await payload.find({
    collection: 'projects',
    depth: 1,
    limit: 100,
    overrideAccess: false,
  })

  return (
    <Container>
      <Grid projects={projects.docs} />
    </Container>
  )
}
