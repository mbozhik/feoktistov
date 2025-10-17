import {cn} from '@/lib/utils'

export const PATHS = {
  header: {
    services: {
      label: 'Услуги',
      link: '/#services',
    },
    news: {
      label: 'Новости',
      link: '/#news',
    },
    team: {
      label: 'Команда',
      link: '/#team',
    },
    contacts: {
      label: 'Контакты',
      link: '/#contacts',
    },
  },
}

export const GRID_CONFIG = (cols: number = 3, length: number) => {
  const baseClasses = 'grid sm:grid-cols-1 bg-background sm:divide-y'
  const gridColsClass = cols === 3 ? 'grid-cols-3' : cols === 4 ? 'grid-cols-4' : 'grid-cols-3'
  const divideClass = length > cols && 'divide-y'

  return cn(baseClasses, gridColsClass, divideClass)
}

export const GRID_CELL = (idx: number, number = 3) => cn((idx + 1) % number !== 0 && 'border-r')
