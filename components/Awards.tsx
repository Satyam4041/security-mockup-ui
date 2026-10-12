import { Award, BadgeCheck, Star, Trophy } from 'lucide-react'
import { Reveal } from './ui'

/** Fictional recognitions from invented analyst firms. */
const awards = [
  { icon: Trophy, rank: 'Leader', by: 'Corvane Research', title: 'MDR Landscape Report', year: '2026' },
  { icon: Star, rank: '4.9 / 5', by: 'Tessel Peer Choice', title: 'Rated by 640+ security leaders', year: '2026' },
  { icon: BadgeCheck, rank: 'AAA', by: 'Ardent Labs', title: 'Detection Efficacy Evaluation', year: '2025' },
  { icon: Award, rank: 'Innovator', by: 'CISO Collective', title: 'Identity Security Award', year: '2025' },
]

export default function Awards() {
  return (
    <section id="resources" className="relative border-t border-line bg-surface/50 py-20 sm:py-24">
      <div className="container-x">
        <Reveal className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Recognition</p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Rated a leader by the people who test us hardest.
            </h2>
          </div>
        </Reveal>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {awards.map((a, i) => (
            <li key={a.by}>
              <Reveal delay={i * 0.08} className="h-full">
                <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-ink p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50">
                  <div
                    className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/15 blur-2xl transition-opacity duration-300 group-hover:opacity-100 sm:opacity-50"
                    aria-hidden="true"
                  />
                  {/* Badge medallion */}
                  <div className="relative flex h-16 w-16 items-center justify-center">
                    <svg viewBox="0 0 64 64" className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:rotate-45" aria-hidden="true">
                      <path
                        d="M32 2 39 8.500 48.500 7 51.500 16 60 20.500 57 29.500 62 37.500 54.500 43.500 54 53 44.500 54.500 39 62 32 57 25 62 19.500 54.500 10 53 9.500 43.500 2 37.500 7 29.500 4 20.500 12.500 16 15.500 7 25 8.500z"
                        fill="color-mix(in srgb, var(--accent) 10%, transparent)"
                        stroke="var(--accent)"
                        strokeOpacity="0.6"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <a.icon className="relative h-6 w-6 text-accent" aria-hidden="true" />
                  </div>
                  <p className="relative mt-6 font-display text-2xl font-semibold">{a.rank}</p>
                  <p className="relative mt-1 text-sm text-white/60">{a.title}</p>
                  <p className="relative mt-5 flex items-center justify-between border-t border-line pt-4 font-mono text-[0.6875rem] uppercase tracking-widest text-white/45">
                    <span>{a.by}</span>
                    <span>{a.year}</span>
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
