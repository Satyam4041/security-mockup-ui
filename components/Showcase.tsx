'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { Check, LoaderCircle, MapPin, MoreHorizontal, ShieldAlert, UserRound } from 'lucide-react'
import { Counter, Reveal, SectionHeading, Tilt } from './ui'

/* ---------- shared chrome ---------- */

function CardShell({ title, badge, children }: { title: string; badge: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="glass flex h-full flex-col overflow-hidden rounded-2xl shadow-[0_40px_80px_-40px_rgb(0_0_0/0.9)]">
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <i className="h-2 w-2 rounded-full bg-white/15" />
            <i className="h-2 w-2 rounded-full bg-white/15" />
            <i className="h-2 w-2 rounded-full bg-white/15" />
          </span>
          <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-white/55">{title}</h3>
        </div>
        {badge}
      </div>
      <div className="flex flex-1 flex-col p-5">{children}</div>
    </div>
  )
}

function LiveBadge() {
  return (
    <span className="flex items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-widest text-accent">
      <span className="blink h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
      Live
    </span>
  )
}

/* ---------- (a) threat alert with risk meter ---------- */

const signals = [
  { label: 'Lookalike sender domain', weight: '+31' },
  { label: 'First-ever payment request', weight: '+28' },
  { label: 'Bank details changed in thread', weight: '+24' },
  { label: 'Urgent tone, off-hours send', weight: '+11' },
]

function ThreatAlert() {
  return (
    <CardShell
      title="Threat alert"
      badge={
        <span className="rounded-full border border-danger/40 bg-danger/10 px-2.5 py-0.5 font-mono text-[0.625rem] uppercase tracking-widest text-danger">
          Critical
        </span>
      }
    >
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-danger/15 text-danger">
          <ShieldAlert className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="font-medium leading-snug">Vendor invoice fraud attempt</p>
          <p className="mt-0.5 truncate font-mono text-xs text-white/45">accounts@heliovant-billing.co → finance team</p>
        </div>
      </div>

      <div className="relative mx-auto mt-5 w-full max-w-[15rem]">
        <svg viewBox="0 0 200 116" className="w-full" aria-hidden="true">
          <defs>
            <linearGradient id="risk-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--color-warn)" />
              <stop offset="100%" stopColor="var(--color-danger)" />
            </linearGradient>
          </defs>
          <path d="M16 104 A84 84 0 0 1 184 104" fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="12" strokeLinecap="round" />
          <motion.path
            d="M16 104 A84 84 0 0 1 184 104"
            fill="none"
            stroke="url(#risk-grad)"
            strokeWidth="12"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 0.94 }}
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-x-0 bottom-0 text-center">
          <p className="font-display text-5xl font-semibold leading-none">
            <Counter value={94} />
          </p>
          <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-widest text-white/45">Risk score / 100</p>
        </div>
      </div>

      <ul className="mt-5 space-y-2">
        {signals.map((s, i) => (
          <motion.li
            key={s.label}
            data-reveal
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.12, duration: 0.4 }}
            className="flex items-center justify-between gap-3 rounded-lg border border-line bg-white/[0.03] px-3 py-2 text-[0.8125rem]"
          >
            <span className="text-white/75">{s.label}</span>
            <span className="font-mono text-xs text-danger">{s.weight}</span>
          </motion.li>
        ))}
      </ul>

      <div className="mt-auto flex gap-2 pt-5">
        <span className="flex h-9 flex-1 items-center justify-center rounded-lg bg-accent text-[0.8125rem] font-semibold text-accent-ink">
          Quarantined automatically
        </span>
        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-white/60" aria-hidden="true">
          <MoreHorizontal className="h-4 w-4" />
        </span>
      </div>
    </CardShell>
  )
}

/* ---------- (b) live activity log ---------- */

type Sev = 'high' | 'med' | 'low'
const pool: { sev: Sev; src: string; msg: string; action: string }[] = [
  { sev: 'high', src: 'IDENTITY', msg: 'Impossible travel: Lagos → Toronto', action: 'Session revoked' },
  { sev: 'low', src: 'EMAIL', msg: 'Credential phish removed from 14 inboxes', action: 'Remediated' },
  { sev: 'med', src: 'ENDPOINT', msg: 'Unsigned PowerShell on FIN-LT-042', action: 'Host isolated' },
  { sev: 'low', src: 'CLOUD', msg: 'Public bucket policy reverted', action: 'Auto-fixed' },
  { sev: 'high', src: 'IDENTITY', msg: 'MFA fatigue: 23 prompts in 4 min', action: 'Account locked' },
  { sev: 'med', src: 'SAAS', msg: 'New OAuth app with mail.read scope', action: 'Consent blocked' },
  { sev: 'low', src: 'NETWORK', msg: 'Beacon to newly registered domain', action: 'DNS sinkholed' },
  { sev: 'med', src: 'EMAIL', msg: 'Auto-forward rule to external address', action: 'Rule deleted' },
]
const sevDot: Record<Sev, string> = { high: 'bg-danger', med: 'bg-warn', low: 'bg-accent' }
const VISIBLE = 5

/** Deterministic mock clock so server and client render the same timestamps. */
const stamp = (n: number) => {
  const total = 14 * 3600 + 2 * 60 + 7 + n * 7
  const p = (v: number) => String(v).padStart(2, '0')
  return `${p(Math.floor(total / 3600) % 24)}:${p(Math.floor(total / 60) % 60)}:${p(total % 60)}`
}
const rowFor = (n: number) => ({ id: n, time: stamp(n), ...pool[n % pool.length] })

function ActivityLog() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '0px 0px -80px 0px' })
  const reduce = useReducedMotion()
  const [rows, setRows] = useState(() => Array.from({ length: VISIBLE }, (_, i) => rowFor(VISIBLE - 1 - i)))
  const next = useRef(VISIBLE)

  useEffect(() => {
    if (!inView || reduce) return
    const timer = setInterval(() => {
      const row = rowFor(next.current++)
      // One extra row stays mounted below the fold so it slides out of view instead of popping.
      setRows((prev) => [row, ...prev].slice(0, VISIBLE + 1))
    }, 2200)
    return () => clearInterval(timer)
  }, [inView, reduce])

  return (
    <CardShell title="Activity log" badge={<LiveBadge />}>
      <div ref={ref} className="flex items-center justify-between font-mono text-[0.625rem] uppercase tracking-widest text-white/35">
        <span>Event</span>
        <span>Action taken</span>
      </div>
      <ul className="mt-3 h-[21.5rem] space-y-2 overflow-hidden" aria-live="off">
        <AnimatePresence initial={false}>
          {rows.map((row) => (
            <motion.li
              key={row.id}
              layout
              initial={{ opacity: 0, y: -24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="rounded-lg border border-line bg-white/[0.03] px-3 py-2.5"
            >
              <div className="flex items-center justify-between gap-2 font-mono text-[0.625rem] tracking-wider text-white/40">
                <span className="flex items-center gap-2">
                  <span className={`h-1.5 w-1.5 rounded-full ${sevDot[row.sev]}`} aria-hidden="true" />
                  {row.src}
                </span>
                <span>{row.time}</span>
              </div>
              <div className="mt-1.5 flex items-center justify-between gap-3">
                <p className="truncate text-[0.8125rem] text-white/85">{row.msg}</p>
                <span className="shrink-0 rounded-md bg-accent/10 px-2 py-0.5 text-[0.6875rem] font-medium text-accent">{row.action}</span>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <div className="mt-auto flex items-center justify-between border-t border-line pt-4 text-xs text-white/45">
        <span>
          <span className="font-semibold text-white">1,284</span> events today
        </span>
        <span>
          <span className="font-semibold text-accent">99.3%</span> auto-resolved
        </span>
      </div>
    </CardShell>
  )
}

/* ---------- (c) account-takeover timeline ---------- */

const steps = [
  { t: '00:00', title: 'Suspicious sign-in detected', detail: 'New device · unfamiliar ASN · token replay' },
  { t: '00:04', title: 'Active sessions revoked', detail: '3 sessions terminated across 2 apps' },
  { t: '00:11', title: 'Password reset and MFA re-enrolled', detail: 'User notified by SMS and Slack' },
  { t: '00:23', title: 'Malicious inbox rules removed', detail: '2 forwarding rules, 1 delete rule' },
  { t: '00:38', title: 'Account restored and monitored', detail: 'Heightened watch for 72 hours' },
]

function TakeoverTimeline() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '0px 0px -80px 0px' })
  const reduce = useReducedMotion()
  // Starts complete so the finished timeline is what ships in the static HTML.
  const [done, setDone] = useState(steps.length)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || reduce) return
    if (!started.current) {
      started.current = true
      setDone(0)
      return
    }
    const finished = done >= steps.length
    const timer = setTimeout(() => setDone(finished ? 0 : done + 1), finished ? 3600 : 1250)
    return () => clearTimeout(timer)
  }, [inView, reduce, done])

  const finished = done >= steps.length

  return (
    <CardShell
      title="Account takeover"
      badge={
        <span
          className={`rounded-full border px-2.5 py-0.5 font-mono text-[0.625rem] uppercase tracking-widest transition-colors duration-500 ${
            finished ? 'border-accent/40 bg-accent/10 text-accent' : 'border-warn/40 bg-warn/10 text-warn'
          }`}
        >
          {finished ? 'Resolved' : 'Remediating'}
        </span>
      }
    >
      <div ref={ref} className="flex items-center gap-3 rounded-xl border border-line bg-white/[0.03] p-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-white/70">
          <UserRound className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">Priya Raman · VP Finance</p>
          <p className="mt-0.5 flex items-center gap-1 font-mono text-[0.6875rem] text-white/45">
            <MapPin className="h-3 w-3" aria-hidden="true" />
            Sign-in from Bucharest, RO
          </p>
        </div>
      </div>

      <ol className="relative mt-5 space-y-4">
        <span className="absolute bottom-3 left-[11px] top-3 w-px bg-white/10" aria-hidden="true" />
        <motion.span
          className="absolute left-[11px] top-3 w-px origin-top bg-accent"
          style={{ height: 'calc(100% - 1.5rem)' }}
          animate={{ scaleY: Math.min(1, Math.max(0, done - 1) / (steps.length - 1)) }}
          transition={{ duration: 0.6 }}
          aria-hidden="true"
        />
        {steps.map((step, i) => {
          const state = i < done ? 'done' : i === done ? 'active' : 'pending'
          return (
            <li key={step.t} className="relative flex gap-3.5">
              <span
                className={`relative z-10 flex h-[23px] w-[23px] shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                  state === 'done'
                    ? 'border-accent bg-accent text-accent-ink'
                    : state === 'active'
                      ? 'border-warn bg-ink text-warn'
                      : 'border-white/15 bg-ink text-transparent'
                }`}
              >
                {state === 'active' ? (
                  <LoaderCircle className="h-3 w-3 animate-spin" aria-hidden="true" />
                ) : (
                  <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden="true" />
                )}
              </span>
              <div className={`min-w-0 flex-1 transition-opacity duration-300 ${state === 'pending' ? 'opacity-35' : ''}`}>
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-[0.8125rem] font-medium leading-snug">{step.title}</p>
                  <span className="shrink-0 font-mono text-[0.6875rem] text-white/40">{step.t}</span>
                </div>
                <p className="mt-0.5 text-xs text-white/45">{step.detail}</p>
              </div>
            </li>
          )
        })}
      </ol>

      <div className="mt-auto pt-5">
        <div className="flex items-center justify-between rounded-lg border border-line bg-white/[0.03] px-3 py-2.5 text-xs">
          <span className="text-white/50">Auto-remediation</span>
          <span className="font-mono text-accent">{Math.min(done, steps.length)} / {steps.length} steps · 0 clicks</span>
        </div>
      </div>
    </CardShell>
  )
}

/* ---------- section ---------- */

export default function Showcase() {
  return (
    <section id="showcase" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="bg-grid mask-fade absolute inset-0 opacity-70" />
        <div className="absolute bottom-0 left-1/2 h-[26rem] w-[56rem] -translate-x-1/2 rounded-full bg-accent/[0.08] blur-[130px]" />
      </div>
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Inside the product"
          title="Watch a threat get caught, explained and closed."
          sub="No black boxes. Every verdict shows its evidence, every action is logged, and every incident ends with a clear outcome."
        />
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          <Reveal className="h-full min-w-0">
            <Tilt className="h-full">
              <ThreatAlert />
            </Tilt>
          </Reveal>
          <Reveal delay={0.12} className="h-full min-w-0">
            <Tilt className="h-full">
              <ActivityLog />
            </Tilt>
          </Reveal>
          <Reveal delay={0.24} className="h-full min-w-0 md:col-span-2 xl:col-span-1">
            <Tilt className="h-full">
              <TakeoverTimeline />
            </Tilt>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
