import { ArrowRight, Phone, Siren } from 'lucide-react'
import { site } from '@/lib/site'
import { Reveal } from './ui'

export default function FinalCTA() {
  return (
    <section id="demo" className="relative py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <div className="beam relative overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-16 text-center sm:px-12 sm:py-24">
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <div className="bg-grid mask-fade absolute inset-0" />
              <div className="absolute left-1/2 top-[-40%] h-[32rem] w-[48rem] -translate-x-1/2 rounded-full bg-accent/25 blur-[120px]" />
              <div className="noise absolute inset-0" />
            </div>
            <div className="relative mx-auto max-w-3xl">
              <p className="eyebrow">Get started</p>
              <h2 className="mt-4 font-display text-[clamp(2.1rem,5.5vw,4rem)] font-semibold leading-[1.03] tracking-tight">
                See what your current tools are missing.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-white/65">
                Connect in 30 minutes, read-only. We will show you the threats already inside your environment — free, with no obligation.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a href={`mailto:hello@example.com?subject=${encodeURIComponent(site.cta)}`} className="btn btn-primary group h-13 w-full px-8 text-base sm:w-auto">
                  {site.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </a>
                <a href="#pricing" className="btn btn-ghost h-13 w-full px-8 text-base sm:w-auto">
                  Compare plans
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            id="under-attack"
            className="mt-5 flex flex-col items-start justify-between gap-5 rounded-3xl border border-danger/30 bg-danger/[0.07] p-6 sm:flex-row sm:items-center sm:p-8"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-danger/15 text-danger">
                <Siren className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold">Under attack right now?</h3>
                <p className="mt-1 text-[0.9375rem] text-white/60">
                  Our incident responders answer 24/7 — you do not need to be a customer.
                </p>
              </div>
            </div>
            <a
              href={`tel:${site.hotline.replace(/[^+\d]/g, '')}`}
              className="btn w-full shrink-0 bg-danger text-white hover:brightness-110 sm:w-auto"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {site.hotline}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
