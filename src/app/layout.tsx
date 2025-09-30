export {metadata} from '@/lib/layout-config'
import {tilda} from '@/lib/layout-config'
import '@/app/globals.css'

import {FRAME} from '~/Global/Container'
import {cn} from '@/lib/utils'

import Header from '~/Global/Header'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={cn(tilda.variable, FRAME, 'bg-background-gray text-black', 'font-sans antialiased')}>
        <Header />
        {children}
      </body>
    </html>
  )
}
