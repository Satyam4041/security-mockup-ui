import { Activity, ArrowUpRight, CloudCog, Crosshair, Fingerprint, Siren, Swords } from 'lucide-react'
import { Reveal, SectionHeading, SpotlightCard } from './ui'

const services = [
  {
    icon: Activity,
    title: 'Managed Detection & Response',
    body: 'A fully staffed SOC watching your environment every minute of the year, with containment authority you define.',
    tag: '24/7/365',
  },
  {
    icon: Siren,
    title: 'Incident Response',
    body: 'Senior responders on a call within 15 minutes. Forensics, eradication and recovery, start to finish.',
    tag: '15-min SLA',
  },
  {
    icon: Crosshair,
    title: 'Proactive Threat Hunting',
    body: 'Hypothesis-led hunts across 13 months of telemetry to surface the quiet intrusions automation misses.',
    tag: 'Weekly hunts',
  },
  {
    icon: Fingerprint,
    title: 'Email & Identity Protection',
    body: 'Stop business email compromise and account takeover with behavioural models built for each employee.',
    tag: 'API-based',
  },
  {
    icon: CloudCog,
    title: 'Cloud Posture Management',
    body: 'Continuous misconfiguration and exposure monitoring across AWS, Azure and Google Cloud, with guided fixes.',
    tag: 'Multi-cloud',
  },
  {
    icon: Swords,
    title: 'Offensive Security Testing',
    body: 'Red team exercises and penetration tests that prove where you are exposed — before someone else does.',
    tag: 'Certified team',
  },
]

export default function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Services"
            title="An expert team, wired into your stack."
            sub="Pick a single service or hand us the whole programme. Either way you get named analysts who know your environment."
          />
          <Reveal delay={0.1}>
            <a href="#demo" className="btn btn-ghost">
              Talk to an expert
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={(i % 3) * 0.08} className="h-full">
                <SpotlightCard className="h-full hover:-translate-y-1">
                  <a href="#demo" className="flex h-full flex-col p-7">
                    <div className="flex items-start justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-ink">
                        <s.icon className="h-[22px] w-[22px]" aria-hidden="true" />
                      </span>
                      <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-widest text-white/45">
                        {s.tag}
                      </span>
                    </div>
                    <h3 className="mt-7 font-display text-xl font-semibold">{s.title}</h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/60">{s.body}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-7 text-sm font-medium text-white/70 transition-colors group-hover:text-accent">
                      Learn more
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                </SpotlightCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
