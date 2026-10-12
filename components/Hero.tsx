'use client'

import { motion } from 'framer-motion'
import { ArrowRight, PlayCircle } from 'lucide-react'
import { site } from '@/lib/site'
import HeroVisual from './HeroVisual'

const EASE = [0.21, 0.6, 0.35, 1] as const
const rise = (delay: number) => ({
  'data-reveal': true,
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
})

const facts = [
  { value: '38s', label: 'median time to contain' },
  { value: '24/7', label: 'human-led SOC' },
  { value: '30 min', label: 'to first protection' },
]

export default function Hero() {
  return (
    <section id="top" className="relative -mt-16 overflow-hidden pt-16 lg:-mt-[4.5rem] lg:pt-[4.5rem]">
      {/* Background texture */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="bg-grid mask-fade absolute inset-0" />
        <div className="absolute -top-40 right-[-10%] h-[42rem] w-[42rem] rounded-full bg-accent/[0.13] blur-[140px]" />
        <div className="absolute -left-40 top-1/3 h-[28rem] w-[28rem] rounded-full bg-white/[0.04] blur-[120px]" />
        <div className="noise absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-ink" />
      </div>

      <div className="container-x relative grid items-center gap-12 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1.08fr_1fr] lg:gap-8 lg:pb-28 lg:pt-24">
        <div>
          <motion.a
            {...rise(0)}
            href="#platform"
            className="group inline-flex max-w-full items-center gap-2.5 rounded-full border border-line bg-white/[0.04] py-1.5 pl-1.5 pr-4 text-[0.8125rem] text-white/75 transition-colors hover:border-accent/50"
          >
            <span className="rounded-full bg-accent/15 px-2.5 py-0.5 font-mono text-[0.6875rem] uppercase tracking-widest text-accent">
              New
            </span>
            <span className="truncate">Autonomous response for identity threats</span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </motion.a>

          <motion.h1
            {...rise(0.08)}
            className="mt-7 font-display text-[clamp(2.75rem,7.4vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.035em]"
          >
            Shut down attacks <span className="text-gradient">in seconds.</span>
          </motion.h1>

          <motion.p {...rise(0.16)} className="mt-7 max-w-xl text-lg leading-relaxed text-white/65 sm:text-xl">
            {site.name} pairs AI-driven detection with a 24/7 team of human responders to find, contain and remove
            threats across email, identity, cloud and endpoint — before they become incidents.
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href={site.ctaHref} className="btn btn-primary group h-13 px-7 text-base">
              {site.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a href="#showcase" className="btn btn-ghost h-13 px-7 text-base">
              <PlayCircle className="h-[18px] w-[18px] text-accent" aria-hidden="true" />
              Tour the platform
            </a>
          </motion.div>

          <motion.dl {...rise(0.32)} className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-7">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="sr-only">{f.label}</dt>
                <dd className="font-display text-2xl font-semibold sm:text-3xl">{f.value}</dd>
                <dd className="mt-1 text-[0.8125rem] leading-snug text-white/50" aria-hidden="true">
                  {f.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          data-reveal
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
          className="px-2 sm:px-10 lg:px-0"
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  )
}
