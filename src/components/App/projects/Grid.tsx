'use client'

import type {Project, ProjectCategory} from '@payload-types'
import {GRID_CONFIG} from '@/lib/constants'

import {cn} from '@/lib/utils'
import {decomposeProjectCategory} from '@/utils/decompose-relationship'

import {useState, useEffect} from 'react'
import {useRouter, useSearchParams} from 'next/navigation'

import Division from '~/UI/Division'
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from '~/UI/Select'
import Card from '~~/projects/Card'
import {H3, SMALL} from '~/UI/Typography'

export default function Grid({projects, categories}: {projects: Project[]; categories: ProjectCategory[]}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  // Filter projects by selected category
  const filteredProjects = selectedCategory
    ? projects.filter((project) => {
        // Use decomposeProjectCategory to get the slug of the category
        const categoryData = decomposeProjectCategory(project.category)
        return categoryData.slug === selectedCategory
      })
    : projects

  const defenseCategories = categories.filter((cat: ProjectCategory) => cat.type === 'defense')
  const attackCategories = categories.filter((cat: ProjectCategory) => cat.type === 'attack')

  // Read category from URL when component loads
  useEffect(() => {
    const categorySlug = searchParams.get('category')
    if (categorySlug) {
      setSelectedCategory(categorySlug)
    }
  }, [searchParams])

  // Handler for category change
  const handleCategoryChange = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId)
    if (category) {
      // Update URL with new category
      const params = new URLSearchParams(searchParams.toString())
      params.set('category', category.slug)
      router.push(`?${params.toString()}`)
      setSelectedCategory(category.slug)
    } else {
      // If empty category is selected, delete parameter from URL
      const params = new URLSearchParams(searchParams.toString())
      params.delete('category')
      router.push(`?${params.toString()}`)
      setSelectedCategory('')
    }
  }

  // Find selected category by slug for display in select
  const selectedCategoryData = categories.find((cat) => cat.slug === selectedCategory)
  const selectedCategoryId = selectedCategoryData?.id || ''

  return (
    <section data-section="grid-projects">
      <Division token="filters-grid-projects" title="Проекты">
        <div className="flex sm:flex-col gap-4 xl:gap-3.5 sm:w-full">
          <Select value={selectedCategoryId} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите категорию проектов" />
            </SelectTrigger>
            <SelectContent>
              {defenseCategories.length > 0 && (
                <SelectGroup>
                  <SelectLabel>Мы защищаем</SelectLabel>
                  {defenseCategories.map((category: ProjectCategory) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.definition}
                    </SelectItem>
                  ))}
                </SelectGroup>
              )}
              {attackCategories.length > 0 && (
                <SelectGroup>
                  <SelectLabel>Мы нападаем</SelectLabel>
                  {attackCategories.map((category: ProjectCategory) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.definition}
                    </SelectItem>
                  ))}
                </SelectGroup>
              )}
            </SelectContent>
          </Select>

          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString())
              params.delete('category')
              router.push(`?${params.toString()}`)
              setSelectedCategory('')
            }}
            className={cn('px-4 py-1.5 flex w-fit sm:w-full whitespace-nowrap', 'text-xl xl:text-lg sm:text-base', 'bg-background text-blue-medium border border-blue-medium rounded-md shadow-xs', 'duration-300 outline-none disabled:cursor-not-allowed disabled:opacity-50')}
          >
            Очистить поиск
          </button>
        </div>
      </Division>

      {filteredProjects.length > 0 ? (
        <div data-block="items-grid-projects" className={GRID_CONFIG}>
          {filteredProjects.map((project) => (
            <Card project={project} key={project.id} className={cn(filteredProjects.length < 4 && 'last:border-r')} />
          ))}
        </div>
      ) : (
        <div data-block="empty-grid-projects" className={cn('py-[20vh] sm:py-[15vh]', 'flex flex-col items-center justify-center gap-2', 'bg-background')}>
          <H3>{selectedCategory ? 'Проекты не найдены' : 'Проекты отсутствуют'}</H3>

          <SMALL className="!text-base text-center max-w-md">
            {selectedCategory
              ? 'В этой категории пока нет проектов. Мы работаем над новыми делами — посмотрите другие категории или свяжитесь с нами.' // no projects in category
              : 'Проекты скоро появятся! Мы активно работаем над интересными делами и обязательно поделимся результатами.'}
          </SMALL>
        </div>
      )}
    </section>
  )
}
