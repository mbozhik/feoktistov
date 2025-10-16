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

export const GRID_CONFIG = 'grid grid-cols-3 sm:grid-cols-1 bg-background divide-y sm:divide-y'

export const GRID_CELL = (idx: number, number = 3) => cn((idx + 1) % number !== 0 && 'border-r')
