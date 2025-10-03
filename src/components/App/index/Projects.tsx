import type {ProjectCategory} from '@payload-types'
import configPromise from '@payload-config'

import {cn} from '@/lib/utils'

import {getPayload} from 'payload'

import {H1, H4} from '~/UI/Typography'
import ProjectsCategory from './ProjectsCategory'

type ProjectType = ProjectCategory['type']

function CategoryBlock({type, categories}: {type: ProjectType; categories: ProjectCategory[]}) {
  const isDefense = type === 'defense'
  return (
    <div data-section={`${type}-projects-index`} className="bg-background first:border-b">
      <div className={cn('px-14 py-20 xl:px-10 xl:py-16 sm:px-3 sm:py-6', 'flex sm:flex-col items-center sm:items-start justify-between sm:gap-3', 'border-b', !isDefense && 'flex-row-reverse')}>
        <H1>{isDefense ? 'Мы защищаем' : 'Мы нападаем'}</H1>

        <H4 className={cn('max-w-[30ch]', type === 'defense' ? 'text-right sm:text-left' : 'text-left')}>{type === 'defense' ? 'Уголовно-правовая защита по экономическим и должностным преступлениям' : 'Уголовно-правовая защита по экономическим и должностным преступлениям'}</H4>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-1 divide-x sm:divide-x-0 sm:divide-y">
        {categories.map((category) => (
          <ProjectsCategory category={category} key={category.id} />
        ))}
      </div>
    </div>
  )
}

export default async function Projects() {
  const payload = await getPayload({config: configPromise})

  const categories = await payload.find({
    collection: 'project-categories',
    limit: 12,
  })

  const defenseCategories = categories.docs.filter((cat: ProjectCategory) => cat.type === 'defense')
  const attackCategories = categories.docs.filter((cat: ProjectCategory) => cat.type === 'attack')

  return (
    <section id="services" data-section="projects-index">
      <CategoryBlock type="defense" categories={defenseCategories} />
      <CategoryBlock type="attack" categories={attackCategories} />
    </section>
  )
}
