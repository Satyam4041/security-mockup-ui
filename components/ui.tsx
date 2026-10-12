'use client'

import { useEffect, useRef } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'framer-motion'

const EASE = [0.21, 0.6, 0.35, 1] as const

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
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
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

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
    <Reveal className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 font-display text-[clamp(1.9rem,4.2vw,3.25rem)] font-semibold leading-[1.06] tracking-tight">
        {title}
      </h2>
      {sub && <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">{sub}</p>}
    </Reveal>
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
      duration: 1.8,
      ease: 'easeOut',
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
