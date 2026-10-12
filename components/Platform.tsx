'use client'

import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { Check, Radar, ScanSearch, ShieldPlus, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { DetectDiagram, HardenDiagram, InvestigateDiagram, RespondDiagram } from './PlatformDiagrams'
import { Reveal, SectionHeading } from './ui'

type Tab = {
  id: string
  label: string
  icon: LucideIcon
  title: string
  body: string
  points: string[]
  stats: { value: string; label: string }[]
  diagram: ReactNode
}

const tabs: Tab[] = [
  {
    id: 'detect',
    label: 'Detect',
    icon: Radar,
    title: 'See the attack hiding in normal behaviour',
    body: 'Our behavioural engine learns how every person, device and workload normally operates — then correlates email, identity, endpoint, cloud and network signals into one high-confidence verdict.',
    points: ['Baselines built per user in 72 hours', 'No rules or signatures to maintain', '300+ native integrations'],
    stats: [
      { value: '4.2B', label: 'signals analysed daily' },
      { value: '97%', label: 'of alert noise removed' },
      { value: '<1s', label: 'to verdict' },
    ],
    diagram: <DetectDiagram />,
  },
  {
    id: 'investigate',
    label: 'Investigate',
    icon: ScanSearch,
    title: 'Hours of triage, done before you open the alert',
    body: 'Every incident arrives with a complete attack graph: who was involved, what was touched and how the attacker got in. Analysts start at the answer, not at the logs.',
    points: ['Auto-generated attack timelines', 'Plain-language incident summaries', '13 months of searchable telemetry'],
    stats: [
      { value: '6s', label: 'average root-cause time' },
      { value: '12×', label: 'faster investigations' },
      { value: '100%', label: 'of incidents documented' },
    ],
    diagram: <InvestigateDiagram />,
  },
  {
    id: 'respond',
    label: 'Respond',
    icon: Zap,
    title: 'Contain the threat while it is still small',
    body: 'Pre-approved playbooks revoke sessions, isolate hosts and remove malicious mail automatically. Our responders handle everything else around the clock — and call you only when it matters.',
    points: ['Session, host and mailbox containment', 'Guardrails you define and approve', 'Human responders on every critical case'],
    stats: [
      { value: '38s', label: 'median time to contain' },
      { value: '91%', label: 'resolved with no customer effort' },
      { value: '15 min', label: 'critical response SLA' },
    ],
    diagram: <RespondDiagram />,
  },
  {
    id: 'harden',
    label: 'Harden',
    icon: ShieldPlus,
    title: 'Close the gap the last attacker used',
    body: 'Every investigation feeds a living posture score with prioritised fixes, so the same technique never works twice. Track progress the board can actually read.',
    points: ['Prioritised by real attack paths', 'One-click remediation tickets', 'Quarterly reviews with your named lead'],
    stats: [
      { value: '+31', label: 'posture points in 90 days' },
      { value: '68%', label: 'fewer repeat incidents' },
      { value: '4', label: 'frameworks mapped' },
    ],
    diagram: <HardenDiagram />,
  },
]

const AUTO_MS = 6500

export default function Platform() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const tab = tabs[active]

  // Auto-advance while on screen; stops for good once the visitor picks a tab.
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { margin: '-30% 0px -30% 0px' })
  const reduce = useReducedMotion()
  const [auto, setAuto] = useState(true)
  const [hovered, setHovered] = useState(false)
  const playing = auto && inView && !hovered && !reduce

  useEffect(() => {
    if (!playing) return
    const timer = setTimeout(() => setActive((i) => (i + 1) % tabs.length), AUTO_MS)
    return () => clearTimeout(timer)
  }, [playing, active])

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const delta = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!delta) return
    e.preventDefault()
    setAuto(false)
    const next = (active + delta + tabs.length) % tabs.length
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section ref={sectionRef} id="platform" className="relative overflow-hidden border-y border-line bg-surface/50 py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[130px]" aria-hidden="true" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="The platform"
          title="One platform. Every stage of an attack."
          sub="From first signal to lasting fix, the whole lifecycle runs in a single system — operated by our team, visible to yours."
        />

        <Reveal className="mt-12">
          <div
            role="tablist"
            aria-label="Platform capabilities"
            onKeyDown={onKeyDown}
            className="mx-auto flex w-full max-w-2xl gap-1 overflow-x-auto rounded-full border border-line bg-ink/70 p-1.5"
          >
            {tabs.map((t, i) => (
              <button
                key={t.id}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                role="tab"
                type="button"
                id={`tab-${t.id}`}
                aria-selected={active === i}
                aria-controls={`panel-${t.id}`}
                tabIndex={active === i ? 0 : -1}
                onClick={() => {
                  setAuto(false)
                  setActive(i)
                }}
                className={`relative flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                  active === i ? 'text-accent-ink' : 'text-white/60 hover:text-white'
                }`}
              >
                {active === i && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 overflow-hidden rounded-full bg-accent"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    {playing && (
                      <motion.span
                        key={t.id}
                        className="absolute inset-0 origin-left bg-black/15"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: AUTO_MS / 1000, ease: 'linear' }}
                      />
                    )}
                  </motion.span>
                )}
                <t.icon className="relative h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>

          <div
            className="glass mt-8 overflow-hidden rounded-3xl"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={tab.id}
                role="tabpanel"
                id={`panel-${tab.id}`}
                aria-labelledby={`tab-${tab.id}`}
                initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="grid lg:grid-cols-2"
              >
                <div className="p-7 sm:p-10 lg:p-12">
                  <h3 className="font-display text-2xl font-semibold leading-tight sm:text-3xl">{tab.title}</h3>
                  <p className="mt-4 leading-relaxed text-white/60">{tab.body}</p>
                  <ul className="mt-6 space-y-3">
                    {tab.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-[0.9375rem] text-white/80">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                          <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <dl className="mt-9 grid grid-cols-3 gap-4 border-t border-line pt-7">
                    {tab.stats.map((s) => (
                      <div key={s.label}>
                        <dd className="font-display text-2xl font-semibold text-accent sm:text-3xl">{s.value}</dd>
                        <dt className="mt-1 text-[0.8125rem] leading-snug text-white/50">{s.label}</dt>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="relative flex items-center border-t border-line bg-ink/60 p-5 sm:p-8 lg:border-l lg:border-t-0">
                  <div className="bg-grid absolute inset-0 opacity-50" aria-hidden="true" />
                  <div className="relative aspect-[480/280] w-full">{tab.diagram}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
