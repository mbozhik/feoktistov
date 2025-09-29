export {metadata} from '@/lib/layout-config'
import {tilda} from '@/lib/layout-config'
import '@/app/globals.css'

import {cn} from '@/lib/utils'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={cn(tilda.variable, 'bg-background-gray text-black', 'font-sans antialiased')}>{children}</body>
    </html>
  )
}
