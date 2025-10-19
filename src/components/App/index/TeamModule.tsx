'use client'

import {Member} from '@payload-types'

import {useState, useRef} from 'react'
import {motion, AnimatePresence, useInView} from 'motion/react'

import {cn, getRole} from '@/lib/utils'
import {useMediaQuery} from '@/hooks/use-media-query'

import {P, SMALL} from '~/UI/Typography'
import PayloadImage from '~/UI/PayloadImage'

export default function TeamModule({members}: {members: Member[]}) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  return (
    <section data-section="module-team-index" className={cn('sm:py-8', 'grid grid-cols-2 sm:grid-cols-1 sm:gap-10', 'bg-blue-dark')}>
      {members.map((member) => (
        <TeamMemberCard key={member.id} member={member} isDesktop={isDesktop} />
      ))}
    </section>
  )
}

function TeamMemberCard({member, isDesktop}: {member: Member; isDesktop: boolean}) {
  const [showSecondary, setShowSecondary] = useState(false)
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // For initial animation (once only)
  const isInViewInitial = useInView(ref, {
    once: true,
    margin: '-10% 0px -10% 0px',
    amount: 0.1,
  })

  // For image switching animation (every time in view)
  const isInViewActive = useInView(ref, {
    once: false,
    margin: '-30% 0px -30% 0px',
    amount: 0.4,
  })

  // Handle initial animation
  if (isInViewInitial && !hasAnimatedIn) {
    setHasAnimatedIn(true)
  }

  // Handle hover state for desktop
  const handleMouseEnter = () => {
    if (isDesktop) {
      setShowSecondary(true)
    }
  }

  const handleMouseLeave = () => {
    if (isDesktop) {
      setShowSecondary(false)
    }
  }

  // Handle mobile animation
  if (!isDesktop) {
    if (isInViewActive && !showSecondary) {
      setShowSecondary(true)
    } else if (!isInViewActive && showSecondary) {
      setShowSecondary(false)
    }
  }

  return (
    <motion.div ref={ref} className="relative place-self-center" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} initial={{opacity: 0, y: 50}} animate={hasAnimatedIn ? {opacity: 1, y: 0} : {opacity: 0, y: 50}} transition={{duration: 0.8, ease: 'easeOut'}}>
      <div className="absolute bottom-4 sm:bottom-4 left-4 z-10">
        <P className="text-background-gray font-semibold">{member.name}</P>
        <SMALL className="text-background-gray">{member.position.map((position) => getRole(position)).join(', ')}</SMALL>
      </div>

      {/* Primary image (always rendered for instant loading) */}
      <div className="relative overflow-hidden">
        <PayloadImage resource={member.overview?.primary} className="block w-full h-[100vh] xl:h-[90vh] sm:h-[65vh] object-contain" />

        {/* Secondary image overlay */}
        {member.overview?.secondary && (
          <AnimatePresence>
            <motion.div
              className="absolute inset-0"
              initial={{opacity: 0}}
              animate={{
                opacity: showSecondary ? 1 : 0,
              }}
              transition={{
                duration: 0.8,
                ease: isDesktop ? 'easeOut' : [0.25, 0.1, 0.25, 1],
                delay: isDesktop ? 0 : 0.2,
              }}
            >
              <PayloadImage resource={member.overview.secondary} className="block w-full h-[100vh] xl:h-[90vh] sm:h-[65vh] object-contain" />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  )
}
