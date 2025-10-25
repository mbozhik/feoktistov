'use client'

import {ArrowUpRightIcon} from 'lucide-react'
import {motion, type Transition} from 'motion/react'

import {cn} from '@/lib/utils'

interface AnimatedArrowProps {
  isHovered: boolean
  size?: string
  shift?: number
  strokeWidth?: number
  className?: string
  color?: string
  colors?: {
    default: string
    hover: string
  }
}

const ANIM = {
  shift: 70,
  transition: {
    duration: 0.4,
    ease: 'easeInOut',
    delay: 0.1,
    type: 'spring' as const,
    stiffness: 100,
    damping: 10,
    mass: 1,
  },
}

export default function AnimatedArrow({
  isHovered,
  size = 'size-24 xl:size-14 sm:size-10',
  shift = 70,
  strokeWidth = 0.5,
  className,
  colors = {
    default: 'text-blue-light',
    hover: 'group-hover:text-background',
  },
}: AnimatedArrowProps) {
  return (
    <div className={cn(size, 'relative overflow-hidden', className)}>
      {/* First icon - animated from the center to the right top corner */}
      <motion.div
        className="absolute inset-0"
        animate={{
          x: isHovered ? shift : 0,
          y: isHovered ? -shift : 0,
        }}
        transition={ANIM.transition as Transition}
      >
        <ArrowUpRightIcon className={cn(size, colors.default, colors.hover)} strokeWidth={strokeWidth} />
      </motion.div>

      {/* Second icon - animated from the left bottom corner to the center */}
      <motion.div
        className="absolute inset-0"
        initial={{
          x: -shift,
          y: shift,
        }}
        animate={{
          x: isHovered ? 0 : -shift,
          y: isHovered ? 0 : shift,
        }}
        transition={ANIM.transition as Transition}
      >
        <ArrowUpRightIcon className={cn(size, colors.default, colors.hover)} strokeWidth={strokeWidth} />
      </motion.div>
    </div>
  )
}
