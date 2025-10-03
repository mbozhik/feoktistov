'use client'

import LogoIcon from '$/logo.svg'
import RecomendationsImage from '$/hero-recomendations.svg'
import {TextAlignJustify} from 'lucide-react'

import {PATHS} from '@/lib/constants'

import {cn} from '@/lib/utils'
import {useMediaQuery} from '@/hooks/use-media-query'

import {useEffect, useState} from 'react'
import {usePathname} from 'next/navigation'
import {motion, useScroll} from 'motion/react'

import Link from 'next/link'
import Image from 'next/image'
import {H2, SPAN} from '~/UI/Typography'

export default function Header() {
  const [showFixedHeader, setShowFixedHeader] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const pathname = usePathname()
  const {scrollY} = useScroll()

  const isHomePage = pathname === '/'

  useEffect(() => {
    if (isHomePage) {
      const unsubscribe = scrollY.on('change', (latest) => {
        const scrolled = latest > 400

        if (scrolled) {
          setShowFixedHeader(true)
        } else {
          setShowFixedHeader(false)
        }
      })

      return unsubscribe
    } else {
      setShowFixedHeader(true)
    }
  }, [scrollY, isHomePage])

  if (pathname.includes('/admin')) {
    return null
  }

  const transition = {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1] as const,
  }

  const headerVariants = {
    expanded: {
      position: 'relative' as const,
      top: 0,
      opacity: 1,
      y: 0,
    },
    hiding: {
      position: 'relative' as const,
      top: 0,
      opacity: 0,
      y: -20,
    },
    collapsed: {
      position: 'fixed' as const,
      top: 0,
      zIndex: 50,
      opacity: 1,
      y: 0,
    },
    hidden: {
      position: 'fixed' as const,
      top: 0,
      zIndex: 50,
      opacity: 0,
      y: -20,
    },
  }

  const contentVariants = {
    expanded: {
      opacity: 1,
      y: 0,
      display: 'block',
    },
    collapsed: {
      opacity: 0,
      y: -20,
      display: 'none',
    },
  }

  function HeaderLogo({mode}: {mode: 'expanded' | 'collapsed'}) {
    return (
      <>
        {isDesktop ? (
          <Link href="/" className={cn('grid place-items-center', mode === 'collapsed' && 'px-12')}>
            <motion.div animate="expanded" initial="expanded" transition={transition}>
              <Image className={cn(mode === 'expanded' ? 'w-[540px] xl:w-[460px]' : 'w-[120px] xl:w-[100px]')} src={LogoIcon} alt="логотип феоктистова" />
            </motion.div>
          </Link>
        ) : (
          <div className={cn('w-full flex items-center justify-between', 'border-x border-b')}>
            <Link href="/" className="grid items-start flex-1">
              <motion.div animate="expanded" initial="expanded" transition={transition}>
                <Image className={cn('px-2.5 py-2', 'w-[105px]')} src={LogoIcon} alt="логотип феоктистова" />
              </motion.div>
            </Link>

            <div className={cn('px-3 py-3 grid place-items-center', 'border-l')}>
              <TextAlignJustify strokeWidth={1.5} onClick={() => alert('Меню в процессе разработки')} />
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <>
      {/* Expanded Header */}
      {isHomePage && (
        <motion.header className={cn('grid grid-cols-2 sm:grid-cols-1', 'bg-background border-x sm:border-x-0 overflow-hidden')} variants={headerVariants} animate="expanded" initial="expanded" transition={transition}>
          <HeaderLogo mode="expanded" />

          <div className={cn('', 'border-l sm:border-l-0')}>
            <div className={cn('sm:hidden', 'flex border-b')}>
              <div className={cn('px-10 py-4.5 xl:px-8 xl:py-3.5', 'flex-1', 'flex gap-10', 'border-r')}>
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

            <motion.div className={cn('px-10 pt-8 pb-12 xl:px-8 xl:pt-6 xl:pb-8 sm:px-2.5 sm:pt-3 sm:pb-6', 'space-y-10 sm:space-y-4', 'sm:border-x')} variants={contentVariants} animate="expanded" initial="expanded" transition={transition}>
              <H2>Работаем по сложным уголовным делам</H2>
              <Image quality={100} src={RecomendationsImage} className="w-[360px] xl:w-[320px] sm:w-[190px]" alt="кто рекомендует феоктистова" />
            </motion.div>
          </div>
        </motion.header>
      )}

      {/* Collapsed Header */}
      <motion.header className={cn('fixed top-0 left-2.5 right-2.5 sm:left-0.75 sm:right-0.75 z-50', 'flex items-center', 'bg-background border-b border-x sm:border-b-0 sm:border-x-0 overflow-hidden')} variants={headerVariants} animate={showFixedHeader ? 'collapsed' : isHomePage ? 'hidden' : 'collapsed'} initial="hidden" transition={transition}>
        <HeaderLogo mode="collapsed" />

        <div className={cn('sm:hidden', 'flex-1', 'flex border-l sm:border-l-0')}>
          <div className={cn('px-10 py-4.5 xl:px-10 xl:py-3.5', 'flex-1', 'flex gap-10', 'border-r')}>
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
      </motion.header>
    </>
  )
}
