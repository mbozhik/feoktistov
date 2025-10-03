import {cn} from '@/lib/utils'
import {H1} from '~/UI/Typography'

export default function Division({size = 'small', token, title, className, children}: {size?: 'small' | 'large'; token: string; title: string; className?: string; children?: React.ReactNode}) {
  const paddings = {
    small: 'py-8 xl:py-5 sm:py-4',
    large: 'py-20 xl:py-16 sm:py-6',
  }
  return (
    <section data-section={token} className={cn('px-14 xl:px-10 sm:px-3', paddings[size], 'flex sm:flex-col items-center sm:items-start justify-between sm:gap-3', 'bg-background border-b', className)}>
      <H1>{title}</H1>

      {children}
    </section>
  )
}
