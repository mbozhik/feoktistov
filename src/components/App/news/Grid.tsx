'use client'

import type {News} from '@payload-types'
import {GRID_CONFIG} from '@/lib/constants'

import {cn} from '@/lib/utils'

import {useState, useEffect, useMemo} from 'react'
import {useRouter, useSearchParams} from 'next/navigation'

import Division from '~/UI/Division'
import Card from '~~/news/Card'
import {H3, SMALL, SPAN} from '~/UI/Typography'

export default function Grid({news}: {news: News[]}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedType, setSelectedType] = useState<string>('all')

  // Filter news by selected type
  const filteredNews = selectedType === 'all' ? news : news.filter((item) => item.type === selectedType)

  // Extract unique news types from data
  const availableTypes = useMemo(() => {
    const types = new Set(news.map((item) => item.type))
    return Array.from(types).sort()
  }, [news])

  // Available news types with "All" option first
  const newsTypes = useMemo(
    () => [
      {value: 'all', label: 'Все'},
      ...availableTypes.map((type) => ({
        value: type,
        label: type === 'news' ? 'Новости' : type === 'media' ? 'Медиа' : type === 'analytics' ? 'Аналитика' : type,
      })),
    ],
    [availableTypes],
  )

  // Read type from URL when component loads
  useEffect(() => {
    const typeParam = searchParams.get('type')
    if (typeParam && (typeParam === 'all' || availableTypes.includes(typeParam as News['type']))) {
      setSelectedType(typeParam)
    }
  }, [searchParams, availableTypes])

  const handleTypeChange = (type: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (type === 'all') {
      params.delete('type')
    } else {
      params.set('type', type)
    }
    router.push(`?${params.toString()}`)
    setSelectedType(type)
  }

  return (
    <section data-section="grid-news">
      <Division token="filters-grid-news" title="Новости" className="sm:items-center">
        <div className="flex gap-4.5 sm:gap-2.5">
          {newsTypes.map((type) => (
            <button className={cn('pr-4.5 sm:pr-2.5', 'border-r last:border-r-0 border-gray-blue', 'group whitespace-nowrap')} onClick={() => handleTypeChange(type.value)} key={type.value}>
              <SPAN className={cn('font-normal', selectedType === type.value ? 'text-blue-dark' : 'text-gray-blue group-hover:text-blue-dark/50 duration-200')}>{type.label}</SPAN>
            </button>
          ))}
        </div>
      </Division>

      {filteredNews.length > 0 ? (
        <div data-block="items-grid-news" className={GRID_CONFIG}>
          {filteredNews.map((newsItem) => (
            <Card news={newsItem} key={newsItem.id} className={cn(filteredNews.length < 4 && 'last:border-r')} />
          ))}
        </div>
      ) : (
        <div data-block="empty-grid-news" className={cn('py-[20vh] sm:py-[15vh]', 'flex flex-col items-center justify-center gap-2', 'bg-background')}>
          <H3>Новости не найдены</H3>

          <SMALL className="!text-base text-center max-w-md">Этого типа новостей пока нет. Мы работаем над новыми материалами — посмотрите другие новости.</SMALL>
        </div>
      )}
    </section>
  )
}
