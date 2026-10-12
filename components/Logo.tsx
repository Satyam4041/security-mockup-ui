import { site } from '@/lib/site'

export default function Logo({ className = '' }: { className?: string }) {
  if (site.logoSrc) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={site.logoSrc} alt={site.name} className={`h-7 w-auto ${className}`} />
  }
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
        <path
          d="M16 3.5 26.500 7.500v8.500c0 6.200-4.300 10.400-10.500 12.500C9.800 26.400 5.500 22.200 5.500 16V7.500z"
          fill="color-mix(in srgb, var(--accent) 14%, transparent)"
          stroke="var(--accent)"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M11.500 20.500v-9l9 9v-9" fill="none" stroke="var(--accent)" strokeWidth="2.200" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-display text-[1.3rem] font-semibold tracking-tight text-white">{site.name}</span>
    </span>
  )
}
