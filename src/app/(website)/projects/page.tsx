import configPromise from '@payload-config'

import {getPayload} from 'payload'

import Container from '~/Global/Container'
import {SMALL} from '~/UI/Typography'

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
    limit: 12,
    overrideAccess: false,
  })

  return (
    <Container>
      <div className="grid grid-cols-4 sm:grid-cols-1 divide-x bg-background">
        {projects.docs.map((project) => (
          <div className="p-8 sm:p-2" key={project.id}>
            <SMALL>{project.definition}</SMALL>
            <SMALL>{project.mention}</SMALL>
          </div>
        ))}
      </div>
    </Container>
  )
}
