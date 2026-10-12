'use client'

import type { MouseEvent } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, PlayCircle } from 'lucide-react'
import { site } from '@/lib/site'
import HeroVisual from './HeroVisual'
import { EASE } from './ui'

const rise = (delay: number) => ({
  'data-reveal': true,
  initial: { opacity: 0, y: 24, filter: 'blur(10px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 1, delay, ease: EASE },
})

const headline = [
  { text: 'Shut', accent: false },
  { text: 'down', accent: false },
  { text: 'attacks', accent: false },
  { text: 'in', accent: true },
  { text: 'seconds.', accent: true },
]

const facts = [
  { value: '38s', label: 'median time to contain' },
  { value: '24/7', label: 'human-led SOC' },
  { value: '30 min', label: 'to first protection' },
]

export default function Hero() {
  // Parallax: the visual drifts down and fades slightly as the hero scrolls away.
  const { scrollY } = useScroll()
  const visualY = useTransform(scrollY, [0, 900], [0, 140])
  const visualOpacity = useTransform(scrollY, [0, 700], [1, 0.35])
  const copyY = useTransform(scrollY, [0, 900], [0, 50])

  // The visual leans gently towards the cursor.
  const rx = useSpring(useMotionValue(0), { stiffness: 70, damping: 16 })
  const ry = useSpring(useMotionValue(0), { stiffness: 70, damping: 16 })
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    ry.set(((e.clientX - rect.left) / rect.width - 0.5) * 12)
    rx.set(-((e.clientY - rect.top) / rect.height - 0.5) * 10)
  }
  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <section
      id="top"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative -mt-16 overflow-hidden pt-16 lg:-mt-[4.5rem] lg:pt-[4.5rem]"
    >
      {/* Background texture */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="bg-grid mask-fade absolute inset-0" />
        <div className="aurora absolute -top-40 right-[-10%] h-[42rem] w-[42rem] rounded-full bg-accent/[0.14] blur-[140px]" />
        <div
          className="aurora absolute -left-40 top-1/3 h-[28rem] w-[28rem] rounded-full bg-white/[0.05] blur-[120px]"
          style={{ animationDelay: '-9s' }}
        />
        <div className="noise absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-ink" />
      </div>

      <div className="container-x relative grid items-center gap-12 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1.08fr_1fr] lg:gap-8 lg:pb-28 lg:pt-24">
        <motion.div style={{ y: copyY }}>
          <motion.a
            {...rise(0)}
            href="#platform"
            className="group inline-flex max-w-full items-center gap-2.5 rounded-full border border-line bg-white/[0.04] py-1.5 pl-1.5 pr-4 text-[0.8125rem] text-white/75 transition-colors hover:border-accent/50"
          >
            <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-widest text-accent">
              New
            </span>
            <span className="truncate">Autonomous response for identity threats</span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </motion.a>

          {/* Each word slides up from behind a mask */}
          <h1
            aria-label="Shut down attacks in seconds."
            className="mt-7 font-display text-[clamp(3rem,7.8vw,6rem)] font-semibold leading-[0.96] tracking-[-0.04em]"
          >
            {headline.map((word, i) => (
              <span key={word.text} aria-hidden="true" className="-mb-[0.14em] mr-[0.22em] inline-block overflow-hidden pb-[0.14em] align-bottom">
                <motion.span
                  data-reveal
                  className={`inline-block ${word.accent ? 'text-accent' : ''}`}
                  initial={{ y: '115%', rotate: 6 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ duration: 1.1, delay: 0.12 + i * 0.09, ease: EASE }}
                  style={{ transformOrigin: 'left bottom' }}
                >
                  {word.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p {...rise(0.55)} className="mt-7 max-w-xl text-lg leading-relaxed text-white/65 sm:text-xl">
            {site.name} pairs AI-driven detection with a 24/7 team of human responders to find, contain and remove
            threats across email, identity, cloud and endpoint — before they become incidents.
          </motion.p>

          <motion.div {...rise(0.68)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href={site.ctaHref} className="btn btn-primary group h-13 px-7 text-base">
              {site.cta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a href="#showcase" className="btn btn-ghost h-13 px-7 text-base">
              <PlayCircle className="h-[18px] w-[18px] text-accent" aria-hidden="true" />
              Tour the platform
            </a>
          </motion.div>

          <motion.dl {...rise(0.8)} className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-7">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="sr-only">{f.label}</dt>
                <dd className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">{f.value}</dd>
                <dd className="mt-1 text-[0.8125rem] leading-snug text-white/50" aria-hidden="true">
                  {f.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div style={{ y: visualY, opacity: visualOpacity }} className="px-2 sm:px-10 lg:px-0">
          <motion.div
            data-reveal
            initial={{ opacity: 0, scale: 0.86, filter: 'blur(16px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.6, delay: 0.25, ease: EASE }}
          >
            <motion.div style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}>
              <HeroVisual />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
