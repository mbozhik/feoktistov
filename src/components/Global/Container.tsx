import {cn} from '@/lib/utils'

// export const BOX = {}

// export const CONTAINER = {}

export const FRAME = 'px-2.5 sm:px-0.75'

export default function Container({children, className}: {children: React.ReactNode; className?: string}) {
  return <main className={cn('border', 'divide-y divide-y-gray', className)}>{children}</main>
}
