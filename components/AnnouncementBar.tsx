import { ArrowRight } from 'lucide-react'

export default function AnnouncementBar() {
  return (
    <div className="relative z-[60] border-b border-line bg-surface">
      <div className="container-x flex min-h-10 items-center justify-center gap-3 py-2 text-center text-[0.8125rem] text-white/70">
        <span className="hidden rounded-full bg-accent px-2 py-0.5 font-mono text-[0.625rem] font-medium uppercase tracking-widest text-accent-ink sm:inline-block">
          New report
        </span>
        <p>
          <span className="hidden md:inline">2026 Threat Outlook: </span>identity attacks now outpace malware 3 to 1.
        </p>
        <a href="#resources" className="group inline-flex shrink-0 items-center gap-1 font-medium text-white hover:text-accent">
          Read it
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}
