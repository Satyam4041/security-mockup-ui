'use client'

import { useEffect, useRef } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

export const EASE = [0.16, 1, 0.3, 1] as const
const VIEWPORT = { once: true, margin: '0px 0px -80px 0px' } as const

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  y = 36,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

const headingItem = {
  hidden: { opacity: 0, y: 22, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: EASE } },
}

/** Eyebrow, title and subtitle that focus in one after another. */
export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = 'center',
}: {
  eyebrow: string
  title: ReactNode
  sub?: string
  align?: 'center' | 'left'
}) {
  return (
    <motion.div
      className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      transition={{ staggerChildren: 0.12 }}
    >
      <motion.p data-reveal variants={headingItem} className="eyebrow">
        {eyebrow}
      </motion.p>
      <motion.h2
        data-reveal
        variants={headingItem}
        className="mt-4 font-display text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]"
      >
        {title}
      </motion.h2>
      {sub && (
        <motion.p data-reveal variants={headingItem} className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
          {sub}
        </motion.p>
      )}
    </motion.div>
  )
}

/** Glass card with a glow that follows the cursor. */
export function SpotlightCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }
  return (
    <div onMouseMove={onMove} className={`glass spotlight group relative overflow-hidden rounded-2xl ${className}`}>
      {children}
    </div>
  )
}

/** Tilts its children in 3D towards the cursor, springing back on leave. */
export function Tilt({ children, className, max = 5 }: { children: ReactNode; className?: string; max?: number }) {
  const rx = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 })
  const ry = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 })
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    ry.set(((e.clientX - rect.left) / rect.width - 0.5) * 2 * max)
    rx.set(-((e.clientY - rect.top) / rect.height - 0.5) * 2 * max)
  }
  const reset = () => {
    rx.set(0)
    ry.set(0)
  }
  return (
    <motion.div
      className={className}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
    >
      {children}
    </motion.div>
  )
}

/** Reveals its children with a left-to-right wipe when scrolled into view. */
export function Wipe({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
      viewport={VIEWPORT}
      transition={{ duration: 1.4, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Animated number. The final value is what gets server-rendered, so it is in the
 * HTML for SEO and no-JS visitors; the count-up only runs once it scrolls into view.
 */
export function Counter({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })
  const reduce = useReducedMotion()
  const format = (n: number) =>
    n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })

  useEffect(() => {
    const el = ref.current
    if (!inView || reduce || !el) return
    const controls = animate(0, value, {
      duration: 2.2,
      ease: EASE,
      onUpdate: (v) => {
        el.textContent = format(v)
      },
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value])

  return (
    <span ref={ref} className="tabular-nums">
      {format(value)}
    </span>
  )
}
