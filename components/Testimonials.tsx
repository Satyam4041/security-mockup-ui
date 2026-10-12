'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { Reveal, SectionHeading } from './ui'

/** Fictional people and companies. */
const testimonials = [
  {
    quote:
      'We went from 1,400 alerts a day to the nine that actually mattered. Three weeks in, they caught a compromised finance account and locked it down before I had finished reading the notification.',
    name: 'Marguerite Okafor',
    role: 'Chief Information Security Officer',
    company: 'Brightfjord Lending',
    metric: '94%',
    metricLabel: 'fewer alerts',
  },
  {
    quote:
      'I have a security team of four. With this behind us it feels like forty. The analysts know our environment by name, and the monthly posture review is the one meeting I never skip.',
    name: 'Daniel Vasquez-Holt',
    role: 'Director of IT & Security',
    company: 'Lumenhaus Health',
    metric: '10×',
    metricLabel: 'team capacity',
  },
  {
    quote:
      'During a ransomware attempt at 2am on a holiday weekend, the affected line was isolated in under a minute. Production never stopped. That single night paid for the contract several times over.',
    name: 'Ingrid Solheim',
    role: 'VP Infrastructure',
    company: 'Pardus Manufacturing',
    metric: '52s',
    metricLabel: 'to isolation',
  },
]

const initials = (name: string) =>
  name
    .split(/[\s-]+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()
  const count = testimonials.length
  const go = (delta: number) => setIndex((i) => (i + delta + count) % count)

  useEffect(() => {
    if (paused || reduce) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), 7000)
    return () => clearInterval(timer)
  }, [paused, reduce, count, index])

  const t = testimonials[index]

  return (
    <section id="testimonials" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute right-[-10%] top-1/4 h-[28rem] w-[28rem] rounded-full bg-accent/[0.08] blur-[120px]" aria-hidden="true" />
      <div className="container-x relative">
        <SectionHeading eyebrow="Customer stories" title="Security leaders sleep better here." />

        <Reveal className="mt-14">
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Customer testimonials"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            className="glass relative mx-auto max-w-5xl overflow-hidden rounded-3xl"
          >
            <Quote className="absolute right-6 top-6 h-20 w-20 text-white/[0.04] sm:h-32 sm:w-32 lg:right-[17rem]" aria-hidden="true" />

            <div className="grid min-h-[27rem] sm:min-h-[22rem] lg:grid-cols-[1fr_15rem]" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.figure
                  key={`q-${index}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${count}`}
                  initial={{ opacity: 0, x: 32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -32 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col justify-between p-7 sm:p-12"
                >
                  <blockquote className="font-display text-xl font-medium leading-snug tracking-tight sm:text-[1.7rem] sm:leading-[1.35]">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-4">
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 font-display text-sm font-semibold text-accent"
                      aria-hidden="true"
                    >
                      {initials(t.name)}
                    </span>
                    <span>
                      <span className="block font-medium">{t.name}</span>
                      <span className="block text-sm text-white/55">
                        {t.role}, {t.company}
                      </span>
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>

              <div className="flex items-center justify-between gap-6 border-t border-line bg-ink/50 p-7 sm:px-12 lg:flex-col lg:items-start lg:justify-center lg:border-l lg:border-t-0 lg:p-10">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`m-${index}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="font-display text-5xl font-semibold text-accent sm:text-6xl">{t.metric}</p>
                    <p className="mt-1 text-sm text-white/55">{t.metricLabel}</p>
                  </motion.div>
                </AnimatePresence>

                <div className="flex items-center gap-2 lg:mt-8">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous testimonial"
                    className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line text-white/70 transition-colors hover:border-accent hover:text-accent"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next testimonial"
                    className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line text-white/70 transition-colors hover:border-accent hover:text-accent"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-1.5 border-t border-line px-7 py-4 sm:px-12">
              {testimonials.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show testimonial ${i + 1}: ${item.company}`}
                  aria-current={i === index}
                  className="group flex h-6 flex-1 cursor-pointer items-center"
                >
                  <span className="relative block h-0.5 w-full overflow-hidden rounded bg-white/15 transition-colors group-hover:bg-white/30">
                    {i === index && (
                      <motion.span
                        key={`${index}-${paused}`}
                        className="absolute inset-0 origin-left bg-accent"
                        initial={{ scaleX: paused || reduce ? 1 : 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: paused || reduce ? 0 : 7, ease: 'linear' }}
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
