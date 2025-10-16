import {type ClassValue, clsx} from 'clsx'
import {twMerge} from 'tailwind-merge'
import type {Member} from '@payload-types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  const dateObj = new Date(date)
  const day = dateObj.getDate()
  const month = dateObj.getMonth()
  const year = dateObj.getFullYear()

  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

  return `${day} ${months[month]}, ${year}`
}

export function getRole(role: Member['position'][number]) {
  switch (role) {
    case 'advocate':
      return 'Адвокат'
    case 'lawyer':
      return 'Юрист'
    case 'partner':
      return 'Партнер'
    default:
      return 'Неизвестно'
  }
}
