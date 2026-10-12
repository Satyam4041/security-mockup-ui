import { Counter, Reveal } from './ui'

const stats = [
  { value: 2000, suffix: '+', label: 'organisations protected', note: 'across 41 countries' },
  { value: 4.2, decimals: 1, suffix: 'B', label: 'signals analysed every day', note: 'email, identity, cloud, endpoint' },
  { value: 38, suffix: 's', label: 'median time to contain', note: 'from detection to isolation' },
  { value: 99.99, decimals: 2, suffix: '%', label: 'platform uptime', note: 'trailing 12 months' },
]

export default function Stats() {
  return (
    <section id="stats" aria-label="Key numbers" className="relative overflow-hidden border-y border-line">
      <div className="absolute inset-0 bg-linear-to-r from-accent/[0.12] via-transparent to-accent/[0.06]" aria-hidden="true" />
      <div className="noise absolute inset-0" aria-hidden="true" />
      <div className="container-x relative">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.08}
              className={`flex flex-col-reverse justify-end px-2 py-12 sm:px-8 sm:py-16 ${
                i % 2 === 1 ? 'border-l border-line' : ''
              } ${i >= 2 ? 'border-t border-line lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l' : ''}`}
            >
              <dt>
                <span className="mt-3 block text-[0.9375rem] font-medium text-white/85">{s.label}</span>
                <span className="mt-1 block text-xs text-white/40">{s.note}</span>
              </dt>
              {/* Final value is server-rendered; Counter only animates it on scroll. */}
              <dd className="font-display text-[clamp(2.25rem,5.5vw,4rem)] font-semibold leading-none tracking-tight">
                <Counter value={s.value} decimals={s.decimals} />
                <span className="text-accent">{s.suffix}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
