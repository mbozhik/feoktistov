export {metadata} from '@/lib/layout-config'
import {tilda} from '@/lib/layout-config'
import '@/app/(website)/globals.css'

import {FRAME} from '~/Global/Container'
import {cn} from '@/lib/utils'

import Header from '~/Global/Header'
import Footer from '~/Global/Footer'
import YandexMetrika from '~/Global/Analytics'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={cn(tilda.variable, FRAME, 'bg-background-gray text-black', 'font-sans antialiased')}>
        <Header />
        {children}
        <Footer />

        {process.env.NODE_ENV === 'production' && <YandexMetrika />}
      </body>
    </html>
  )
}
