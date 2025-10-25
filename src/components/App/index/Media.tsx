'use client'

import {useState, useRef, useEffect} from 'react'
import {motion, AnimatePresence} from 'motion/react'

import {cn} from '@/lib/utils'

// Global blob URL cache for videos
let videoBlobCache: string | null = null

export default function Media({token}: {token: 'overview' | 'sequence'}) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const mediaConfig = (token: 'overview' | 'sequence') => {
    switch (token) {
      case 'overview':
        return {
          video: '/overview.mp4',
          classes: 'h-[90vh] sm:h-[55vh]',
          startTime: 0,
        }
      case 'sequence':
        return {
          video: '/overview.mp4',
          classes: 'h-[85vh] sm:h-[50vh]',
          startTime: 8,
        }
    }
  }

  useEffect(() => {
    // Load video immediately when component is mounted
    loadVideo()
  }, [token])

  const loadVideo = async () => {
    if (videoBlobCache) {
      // Video already loaded - use cache
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setHasError(false)

    try {
      const response = await fetch('/overview.mp4')
      if (!response.ok) throw new Error('Failed to load video')

      const blob = await response.blob()
      videoBlobCache = URL.createObjectURL(blob)

      setIsLoading(false)
    } catch {
      setIsLoading(false)
      setHasError(true)
    }
  }

  const config = mediaConfig(token)

  return (
    <section data-section={`${token}-media-index`} className="relative">
      <AnimatePresence mode="wait">
        {/* Loading animation */}
        {isLoading && <motion.div className={cn('w-full bg-gray animate-pulse', config.classes)} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.3}} />}

        {/* Video */}
        {!hasError && videoBlobCache && !isLoading && (
          <motion.video
            ref={(el) => {
              if (el) {
                videoRef.current = el
                // Set time for sequence token
                if (token === 'sequence' && config.startTime > 0) {
                  el.currentTime = config.startTime
                }
              }
            }}
            className={cn('w-full object-cover', config.classes)}
            muted
            autoPlay
            loop
            playsInline
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
            key={`video-${token}`}
          >
            <source src={videoBlobCache!} type="video/mp4" />
            Ваш браузер не поддерживает видео.
          </motion.video>
        )}

        {/* Error message */}
        {hasError && (
          <motion.div className={cn('w-full bg-gray grid place-items-center', config.classes)} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <div className="text-center text-background">
              <p className="text-lg mb-2">Не удалось загрузить видео</p>
              <p className="text-sm">Проверьте подключение к интернету</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
