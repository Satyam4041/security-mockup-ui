import { Gauge, Network, VenetianMask } from 'lucide-react'
import { Reveal, SectionHeading, SpotlightCard } from './ui'

const cards = [
  {
    icon: Gauge,
    tag: 'Speed',
    stat: '48 min',
    statLabel: 'from first click to lateral movement',
    title: 'Attacks move faster than tickets',
    body: 'Adversaries pivot from a single compromised inbox to your core systems in under an hour. A queue-based SOC is still triaging when the damage is done.',
    spark: 'M0 34 L30 32 L60 30 L90 26 L120 24 L150 17 L180 12 L210 5',
  },
  {
    icon: Network,
    tag: 'Scale',
    stat: '11,000+',
    statLabel: 'alerts a mid-size team sees each day',
    title: 'Noise is burying the signal',
    body: 'Every new tool adds another console and another stream of alerts. Most are never opened — and the one that matters looks just like the rest.',
    spark: 'M0 30 L30 31 L60 24 L90 26 L120 16 L150 18 L180 8 L210 4',
  },
  {
    icon: VenetianMask,
    tag: 'Sophistication',
    stat: '79%',
    statLabel: 'of intrusions now use no malware at all',
    title: 'Attackers log in, not break in',
    body: 'Stolen sessions, AI-written lures and abused OAuth apps look like ordinary work. Signature-based defences have nothing to match against.',
    spark: 'M0 33 L30 28 L60 29 L90 20 L120 21 L150 12 L180 10 L210 3',
  },
]

export default function Problem() {
  return (
    <section id="problem" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="The problem"
          title={
            <>
              Threats evolved. <span className="text-white/45">Most defences didn’t.</span>
            </>
          }
          sub="Modern attacks are faster, louder and far better disguised than the tools built to catch them."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal key={card.tag} delay={i * 0.1} className="h-full">
              <SpotlightCard className="flex h-full flex-col p-7 hover:-translate-y-1 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white/[0.04] text-accent transition-transform duration-300 group-hover:scale-110">
                    <card.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-white/40">
                    0{i + 1} / {card.tag}
                  </span>
                </div>

                <p className="mt-8 font-display text-5xl font-semibold tracking-tight">{card.stat}</p>
                <p className="mt-2 text-sm text-white/50">{card.statLabel}</p>

                <svg viewBox="0 0 210 38" className="mt-5 h-10 w-full" preserveAspectRatio="none" aria-hidden="true">
                  <path d={`${card.spark} L210 38 L0 38 Z`} fill="var(--color-danger)" opacity="0.08" />
                  <path d={card.spark} fill="none" stroke="var(--color-danger)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                </svg>

                <h3 className="mt-6 font-display text-xl font-semibold">{card.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/60">{card.body}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
