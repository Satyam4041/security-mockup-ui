'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { site } from '@/lib/site'
import { Reveal, SectionHeading } from './ui'

type Tier = {
  name: string
  blurb: string
  monthly: number | null
  annual: number | null
  cta: string
  featured?: boolean
  features: string[]
}

/** Placeholder pricing: USD per user, per month. Annual is billed yearly at ~20% off. */
const tiers: Tier[] = [
  {
    name: 'Essentials',
    blurb: 'Core email and identity protection for growing teams.',
    monthly: 9,
    annual: 7,
    cta: 'Start free trial',
    features: ['Email & identity threat detection', 'Automated remediation playbooks', 'Business-hours analyst support', '90 days of telemetry', 'Monthly threat summary'],
  },
  {
    name: 'Advanced',
    blurb: 'Full managed detection and response, around the clock.',
    monthly: 19,
    annual: 15,
    cta: site.cta,
    featured: true,
    features: ['Everything in Essentials', '24/7 managed detection & response', 'Endpoint and cloud coverage', 'Incident response retainer included', '13 months of telemetry', 'Named security lead'],
  },
  {
    name: 'Enterprise',
    blurb: 'Tailored coverage, hunting and governance at scale.',
    monthly: null,
    annual: null,
    cta: 'Contact sales',
    features: ['Everything in Advanced', 'Dedicated threat hunting team', 'Annual red team exercise', 'Custom integrations and SLAs', 'Data residency options', 'Executive and board reporting'],
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(true)

  return (
    <section id="pricing" className="relative border-t border-line bg-surface/50 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Pricing"
          title="Straightforward plans. No surprise overages."
          sub="Every plan includes onboarding, unlimited integrations and unlimited incidents."
        />

        <Reveal className="mt-10 flex items-center justify-center gap-4">
          <span className={`text-sm font-medium transition-colors ${annual ? 'text-white/45' : 'text-white'}`}>Monthly</span>
          <button
            type="button"
            role="switch"
            aria-checked={annual}
            aria-label="Bill annually"
            onClick={() => setAnnual((v) => !v)}
            className={`relative h-8 w-14 cursor-pointer rounded-full border transition-colors ${
              annual ? 'border-accent bg-accent/20' : 'border-white/20 bg-white/[0.06]'
            }`}
          >
            <motion.span
              className="absolute left-1 top-1 h-[22px] w-[22px] rounded-full bg-accent"
              animate={{ x: annual ? 24 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 32 }}
            />
          </button>
          <span className={`flex items-center gap-2 text-sm font-medium transition-colors ${annual ? 'text-white' : 'text-white/45'}`}>
            Annual
            <span className="rounded-full bg-accent/15 px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-widest text-accent">Save 20%</span>
          </span>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-3">
          {tiers.map((tier, i) => {
            const price = annual ? tier.annual : tier.monthly
            return (
              <Reveal key={tier.name} delay={i * 0.1} className="h-full">
                <div
                  className={`relative flex h-full flex-col rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-9 ${
                    tier.featured
                      ? 'beam border border-accent/40 bg-linear-to-b from-accent/[0.12] to-ink shadow-[0_30px_90px_-40px_var(--accent)]'
                      : 'glass'
                  }`}
                >
                  {tier.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3.5 py-1 font-mono text-[0.625rem] font-medium uppercase tracking-widest text-accent-ink">
                      Most popular
                    </span>
                  )}
                  <h3 className="font-display text-xl font-semibold">{tier.name}</h3>
                  <p className="mt-2 min-h-10 text-sm text-white/55">{tier.blurb}</p>

                  <div className="mt-7 flex h-16 items-end gap-2">
                    {price === null ? (
                      <>
                        <span className="font-display text-5xl font-semibold tracking-tight">Custom</span>
                        <span className="pb-1.5 text-sm leading-tight text-white/50">
                          volume pricing
                          <br />
                          for 1,000+ users
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="flex font-display text-5xl font-semibold tracking-tight">
                          $
                          <AnimatePresence mode="popLayout" initial={false}>
                            <motion.span
                              key={price}
                              initial={{ opacity: 0, y: 14 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -14 }}
                              transition={{ duration: 0.22 }}
                              className="tabular-nums"
                            >
                              {price}
                            </motion.span>
                          </AnimatePresence>
                        </span>
                        <span className="pb-1.5 text-sm leading-tight text-white/50">
                          per user / month
                          <br />
                          billed {annual ? 'annually' : 'monthly'}
                        </span>
                      </>
                    )}
                  </div>
                  <a href={site.ctaHref} className={`btn mt-8 w-full ${tier.featured ? 'btn-primary' : 'btn-ghost'}`}>
                    {tier.cta}
                  </a>

                  <ul className="mt-8 space-y-3.5 border-t border-line pt-7">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-[0.9375rem] text-white/75">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>
        <p className="mt-8 text-center text-xs text-white/40">Prices in USD, minimum 50 users. Illustrative placeholder pricing.</p>
      </div>
    </section>
  )
}
