import { site } from '@/lib/site'
import Logo from './Logo'

const columns = [
  { title: 'Platform', links: [['Detect', '#platform'], ['Investigate', '#platform'], ['Respond', '#platform'], ['Harden', '#platform'], ['Product tour', '#showcase']] },
  { title: 'Services', links: [['Managed detection', '#services'], ['Incident response', '#under-attack'], ['Threat hunting', '#services'], ['Offensive testing', '#services']] },
  { title: 'Company', links: [['Customers', '#testimonials'], ['Recognition', '#resources'], ['Pricing', '#pricing'], ['Contact', '#demo']] },
]

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface/60">
      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1.4fr_2fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-5 text-sm leading-relaxed text-white/50">{site.description}</p>
          <p className="mt-6 flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-widest text-white/50">
            <span className="blink h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            All systems operational
          </p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-white/40">{col.title}</h2>
              <ul className="mt-4 space-y-3">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="text-sm text-white/65 transition-colors hover:text-accent">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {site.legalName} All rights reserved.</p>
          <p>Concept mockup — all companies, people, awards and figures shown are fictional.</p>
        </div>
      </div>
    </footer>
  )
}
