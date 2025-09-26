export {metadata} from '@/lib/layout-config'
import '@/app/globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`antialiased`}>{children}</body>
    </html>
  )
}
