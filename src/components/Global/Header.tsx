'use client'

import LogoIcon from '$/logo.svg'
import RecomendationsImage from '$/hero-recomendations.svg'
import {TextAlignJustify} from 'lucide-react'

import {PATHS} from '@/lib/constants'

import {cn} from '@/lib/utils'
import {useMediaQuery} from '@/hooks/use-media-query'

import Link from 'next/link'
import Image from 'next/image'
import {H2, SPAN} from '~/UI/Typography'

export default function Header() {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  return (
    <header className={cn('grid grid-cols-2 sm:grid-cols-1', 'bg-background', 'border-x sm:border-x-0')}>
      {isDesktop ? (
        <Link href="/" className="grid place-items-center">
          <Image className="w-[540px] xl:w-[460px]" src={LogoIcon} alt="логотип феоктистова" />
        </Link>
      ) : (
        <div className={cn('flex items-center', 'border-x border-b')}>
          <Link href="/" className="grid items-start flex-1">
            <Image className={cn('px-2.5 py-2', 'w-[105px]')} src={LogoIcon} alt="логотип феоктистова" />
          </Link>

          <div className={cn('px-2 h-full grid place-items-center', 'border-l')}>
            <TextAlignJustify strokeWidth={1.5} onClick={() => alert('Меню в процессе разработки')} />
          </div>
        </div>
      )}

      <div className={cn('', 'border-l sm:border-l-0')}>
        <div className={cn('sm:hidden', 'flex border-b')}>
          <div className={cn('px-10 xl:px-8 py-4.5 xl:py-3.5', 'flex-1', 'flex gap-10', 'border-r')}>
            {Object.values(PATHS.header).map((item) => (
              <Link href={item.link} className="flex items-center gap-1.5 group" key={item.label}>
                <div className="mt-1.5 size-0 border-7 border-l-transparent border-b-transparent border-r-[#CACCCF] border-t-[#CACCCF] group-hover:border-r-blue-black group-hover:border-t-blue-black duration-300"></div>
                <SPAN offset={0}>{item.label}</SPAN>
              </Link>
            ))}
          </div>

          <div className={cn('px-4 xl:px-3.5', 'grid place-items-center cursor-pointer')} onClick={() => alert('Интенционализация в процессе разработки')}>
            <SPAN offset={0}>EN</SPAN>
          </div>
        </div>

        <div className={cn('px-10 pt-8 pb-12 xl:px-8 xl:pt-6 xl:pb-8 sm:px-2.5 sm:pt-3 sm:pb-6', 'space-y-10 sm:space-y-4', 'sm:border-x')}>
          <H2>Работаем по сложным уголовным делам</H2>

          <Image quality={100} src={RecomendationsImage} className="w-[360px] xl:w-[320px] sm:w-[190px]" alt="кто рекомендует феоктистова" />
        </div>
      </div>
    </header>
  )
}
