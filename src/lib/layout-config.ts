import type {Metadata} from 'next'
import localFont from 'next/font/local'

export const metadata: Metadata = {
  title: {
    template: '%s — Feoktistov',
    default: 'Feoktistov',
  },
}

export const tilda = localFont({
  src: [
    {path: '../assets/fonts/TildaSans-Light.woff2', weight: '300'},
    {path: '../assets/fonts/TildaSans-Regular.woff2', weight: '400'},
    {path: '../assets/fonts/TildaSans-Medium.woff2', weight: '500'},
    {path: '../assets/fonts/TildaSans-SemiBold.woff2', weight: '600'},
    {path: '../assets/fonts/TildaSans-Bold.woff2', weight: '700'},
    {path: '../assets/fonts/TildaSans-ExtraBold.woff2', weight: '800'},
    {path: '../assets/fonts/TildaSans-Black.woff2', weight: '900'},
  ],
  variable: '--font-tilda',
})
