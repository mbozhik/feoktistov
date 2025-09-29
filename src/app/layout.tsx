export {metadata} from '@/lib/layout-config'
import {tilda} from '@/lib/layout-config'
import '@/app/globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`${tilda.variable} antialiased`}>{children}</body>
    </html>
  )
}
