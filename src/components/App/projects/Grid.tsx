import type {Project} from '@payload-types'

import Card from '~~/projects/Card'

export default function Grid({projects}: {projects: Project[]}) {
  return (
    <section data-section="grid-projects" className="grid grid-cols-3 sm:grid-cols-1 divide-x bg-background sm:divide-x-0 sm:divide-y">
      {projects.map((project) => (
        <Card project={project} key={project.id} />
      ))}
    </section>
  )
}
