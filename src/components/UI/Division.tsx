import {cn} from '@/lib/utils'
import {H1} from '~/UI/Typography'

export default function Division({token, title, size = 'small', mode = 'light', reverse = false, className, children}: {token: string; title: string; size?: 'small' | 'large'; mode?: 'light' | 'dark'; reverse?: boolean; className?: string; children?: React.ReactNode}) {
  const paddings = {
    small: 'py-8 xl:py-5 sm:py-4',
    large: 'py-20 xl:py-16 sm:py-6',
  }
  return (
    <section data-section={token} className={cn('px-14 xl:px-10 sm:px-3', paddings[size], reverse && 'flex-row-reverse', 'flex sm:flex-col items-center sm:items-start justify-between sm:gap-3', 'border-b', mode === 'light' ? 'bg-background' : 'bg-blue-dark', className)}>
      <H1 className={cn(mode === 'dark' && 'text-background-gray')}>{title}</H1>

      {children}
    </section>
  )
}
