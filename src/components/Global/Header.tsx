'use client'

import LogoIcon from '$/logo.svg'
import RecomendationsImage from '$/hero-recomendations.svg'
import {TextAlignJustify, X} from 'lucide-react'

import {PATHS} from '@/lib/constants'

import {cn} from '@/lib/utils'
import {useMediaQuery} from '@/hooks/use-media-query'

import {useEffect, useLayoutEffect, useState} from 'react'
import {usePathname} from 'next/navigation'
import {motion, useScroll, AnimatePresence} from 'motion/react'

import Link from 'next/link'
import Image from 'next/image'
import {H2, SPAN} from '~/UI/Typography'

export default function Header() {
  const [showFixedHeader, setShowFixedHeader] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

  useLayoutEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)

  if (pathname.includes('/admin')) {
    return null
  }

  const transition = {
    duration: 0.4,
    delay: 0.1,
    ease: [0.4, 0, 0.2, 1] as const,
    stiffness: 100,
    damping: 10,
    mass: 1,
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
      y: -100,
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
      y: -100,
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

            <div className={cn('px-3 py-3 grid place-items-center', 'border-l', 'cursor-pointer')} onClick={toggleMenu}>
              {!isMenuOpen ? <TextAlignJustify className="relative z-[50]" strokeWidth={1.5} /> : <X className="relative z-[99]" strokeWidth={1.5} />}
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
              <nav className={cn('px-10 py-4.5 xl:px-8 xl:py-3.5', 'flex-1', 'flex gap-10', 'border-r')}>
                {Object.values(PATHS.header).map((item) => (
                  <Link href={item.link} className="flex items-center gap-1.5 group" key={item.label}>
                    <div className="mt-1.5 size-0 border-7 border-l-transparent border-b-transparent border-r-[#CACCCF] border-t-[#CACCCF] group-hover:border-r-blue-black group-hover:border-t-blue-black duration-300"></div>
                    <SPAN offset={0}>{item.label}</SPAN>
                  </Link>
                ))}
              </nav>

              <div className={cn('opacity-0 pointer-events-none', 'px-4 xl:px-3.5', 'grid place-items-center cursor-pointer')} onClick={() => alert('Интенционализация в процессе разработки')}>
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
      <motion.header className={cn('fixed z-[50] top-0 left-2.5 right-2.5 sm:left-0.75 sm:right-0.75', 'flex items-center', 'bg-background border-b border-x sm:border-b-0 sm:border-x-0 overflow-hidden')} variants={headerVariants} animate={showFixedHeader ? 'collapsed' : isHomePage ? 'hidden' : 'collapsed'} initial="hidden" transition={transition}>
        <HeaderLogo mode="collapsed" />

        <div className={cn('sm:hidden', 'flex-1', 'flex border-l sm:border-l-0')}>
          <nav className={cn('px-10 py-4.5 xl:px-10 xl:py-3.5', 'flex-1', 'flex gap-10', 'border-r')}>
            {Object.values(PATHS.header).map((item) => (
              <Link href={item.link} className="flex items-center gap-1.5 group" key={item.label}>
                <div className="mt-1.5 size-0 border-7 border-l-transparent border-b-transparent border-r-[#CACCCF] border-t-[#CACCCF] group-hover:border-r-blue-black group-hover:border-t-blue-black duration-300"></div>
                <SPAN offset={0}>{item.label}</SPAN>
              </Link>
            ))}
          </nav>

          <div className={cn('px-4 xl:px-3.5', 'grid place-items-center cursor-pointer')} onClick={() => alert('Интенционализация в процессе разработки')}>
            <SPAN offset={0}>EN</SPAN>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div className={cn('fixed z-[20] inset-0 p-2.5 pt-24 h-screen bg-background', 'flex flex-col gap-8 justify-start')} initial={{opacity: 0, y: '-100%'}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: '-100%'}} transition={{duration: 0.5, ease: 'easeInOut'}}>
            <nav className="flex flex-col gap-3.5 w-full">
              {Object.values(PATHS.header).map((item) => (
                <motion.div animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: 30}} transition={{delay: 0.4, duration: 0.5}} key={item.label}>
                  <Link href={item.link} className={cn('flex items-center gap-1.5 group', 'pb-1 w-fit', 'border-b border-blue-medium')}>
                    <H2 offset={0}>{item.label}</H2>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
