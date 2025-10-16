import {cn} from '@/lib/utils'

// export const BOX = {}

// export const CONTAINER = {}

export const FRAME = 'mx-2.5 sm:mx-0.75'

export default function Container({offset = true, children, className}: {offset?: boolean; children: React.ReactNode; className?: string}) {
  return <main className={cn(offset && 'pt-[68px] xl:pt-[56px] sm:pt-[48px]', 'border', 'divide-y divide-y-gray', className)}>{children}</main>
}
