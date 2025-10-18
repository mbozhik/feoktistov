import type {ProjectCategory} from '@payload-types'
import {GRID_CONFIG, GRID_CELL} from '@/lib/constants'
import configPromise from '@payload-config'

import {cn} from '@/lib/utils'

import {getPayload} from 'payload'

import Division from '~/UI/Division'
import {H4} from '~/UI/Typography'
import ProjectsCategoryCard from '~~/index/ProjectsCard'

type ProjectType = ProjectCategory['type']

function CategoryBlock({type, categories}: {type: ProjectType; categories: ProjectCategory[]}) {
  const isDefense = type === 'defense'
  return (
    <div data-section={`${type}-projects-index`} className="bg-background first:border-b">
      <Division size="large" token={`${type}-division`} title={isDefense ? 'Мы защищаем' : 'Мы нападаем'} className={cn(!isDefense && 'flex-row-reverse')}>
        <H4 className={cn('max-w-[30ch]', type === 'defense' ? 'text-right sm:text-left' : 'text-left')}>{type === 'defense' ? 'Уголовно-правовая защита по экономическим и должностным преступлениям' : 'Уголовно-правовая защита по экономическим и должностным преступлениям'}</H4>
      </Division>

      <div className={cn(GRID_CONFIG(4, categories.length))}>
        {categories.map((category, idx) => (
          <ProjectsCategoryCard category={category} className={GRID_CELL(idx, 4)} key={category.id} />
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
