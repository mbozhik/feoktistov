'use client'

import {Achievement} from '@payload-types'

import {useState, useEffect} from 'react'
import {motion, AnimatePresence} from 'motion/react'

import {cn} from '@/lib/utils'

import {H3} from '~/UI/Typography'
import PayloadImage from '~/UI/PayloadImage'

export default function AchievementsSlider({achievements}: {achievements: Achievement[]}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Autoplay slides
  useEffect(() => {
    if (!isAutoPlaying || achievements.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % achievements.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [achievements.length, isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % achievements.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + achievements.length) % achievements.length)
    setIsAutoPlaying(false)
  }

  if (achievements.length === 0) return null

  const currentAchievement = achievements[currentIndex]
  const prevIndex = (currentIndex - 1 + achievements.length) % achievements.length
  const nextIndex = (currentIndex + 1) % achievements.length

  return (
    <section data-slot="slider-achievements-index" className={cn('relative p-8 xl:p-6 sm:p-4 bg-background')} onMouseEnter={() => setIsAutoPlaying(false)} onMouseLeave={() => setIsAutoPlaying(true)}>
      <div className="px-5 sm:px-0">
        <div className="grid grid-cols-2 sm:grid-cols-1 items-center">
          <AnimatePresence mode="wait">
            <motion.div className="space-y-8 min-h-[300px] sm:min-h-[250px] flex flex-col justify-center" initial={{opacity: 0, x: -50}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: 50}} transition={{duration: 0.6, ease: 'easeInOut'}}>
              {currentAchievement.items.map((item, idx) => (
                <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: idx * 0.1, duration: 0.5}} key={item.id || idx}>
                  <H3 className="text-[40px] font-light text-blue-dark">{item.item}</H3>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-end items-end sm:justify-center sm:items-center pr-14 sm:pr-0">
            <div className="relative h-[28rem] w-[28rem] sm:h-40 sm:w-80 flex flex-col items-end justify-center pr-12 sm:pr-0 sm:items-center">
              {/* Предыдущий логотип (сверху, полупрозрачный) */}
              {achievements.length > 1 && (
                <motion.div className="absolute top-0 right-0 h-96 w-full sm:hidden flex items-center justify-end" initial={{opacity: 0, y: -80, scale: 0.7}} animate={{opacity: 0.25, y: -80, scale: 0.7}} exit={{opacity: 0, y: -80, scale: 0.7}} key={`prev-${prevIndex}`}>
                  <PayloadImage resource={achievements[prevIndex].company} className="max-w-full max-h-full object-contain opacity-40" />
                </motion.div>
              )}

              {/* Текущий логотип (центр) */}
              <motion.div className="h-96 w-full sm:h-32 flex items-center justify-end sm:justify-center z-10" initial={{opacity: 0, scale: 0.8}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.8}} transition={{duration: 0.6, ease: 'easeInOut'}} key={`current-${currentIndex}`}>
                <PayloadImage resource={currentAchievement.company} className="max-w-full max-h-full object-contain" />
              </motion.div>

              {/* Следующий логотип (снизу, полупрозрачный) */}
              {achievements.length > 1 && (
                <motion.div className="absolute bottom-0 right-0 h-96 w-full sm:hidden flex items-center justify-end" initial={{opacity: 0, y: 80, scale: 0.7}} animate={{opacity: 0.25, y: 80, scale: 0.7}} exit={{opacity: 0, y: 80, scale: 0.7}} key={`next-${nextIndex}`}>
                  <PayloadImage resource={achievements[nextIndex].company} className="max-w-full max-h-full object-contain opacity-40" />
                </motion.div>
              )}

              {/* Длинные стрелки навигации и точки прогресса */}
              <div className="absolute z-[20] top-1/2 -right-12 sm:left-1/2 sm:right-auto sm:top-32 sm:bottom-0 transform -translate-y-1/2 sm:-translate-x-1/2 sm:translate-y-0 flex flex-col sm:flex-row items-center gap-4 sm:gap-22">
                <motion.button className="grid place-items-center sm:-rotate-90 sm:overflow-hidden" onClick={prevSlide} disabled={achievements.length <= 1} whileTap={{scale: 0.95}}>
                  <svg width="16" height="148" className="sm:translate-y-12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M8.707.293a1 1 0 0 0-1.414 0L.929 6.657A1 1 0 0 0 2.343 8.07L8 2.414l5.657 5.657a1 1 0 1 0 1.414-1.414L8.707.293ZM8 148h1V1H7v147h1Z" />
                  </svg>
                </motion.button>

                {/* Вертикальные точки прогресса */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {achievements.map((_, index) => (
                    <motion.button key={index} className={cn('size-2.5 rounded-full duration-300', index === currentIndex ? 'bg-blue-dark' : 'bg-gray/60 hover:bg-gray-medium/60')} onClick={() => goToSlide(index)} whileHover={{scale: 1.2}} whileTap={{scale: 0.9}} />
                  ))}
                </div>

                <motion.button className="grid place-items-center sm:-rotate-90 sm:overflow-hidden" onClick={nextSlide} disabled={achievements.length <= 1} whileTap={{scale: 0.95}}>
                  <svg width="16" height="148" className="sm:-translate-y-12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#000" d="M7.303 147.707a1 1 0 0 0 1.414 0l6.364-6.364a1 1 0 1 0-1.414-1.414l-5.657 5.657-5.657-5.657a1 1 0 1 0-1.414 1.414l6.364 6.364ZM8.01 0h-1v147h2V0h-1Z" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
