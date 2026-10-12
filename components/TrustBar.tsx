import type { ReactNode } from 'react'

/** Fictional customer wordmarks — invented names, original glyphs. */
const logos: { name: string; style: string; mark: ReactNode }[] = [
  {
    name: 'Heliovant',
    style: 'font-display font-semibold tracking-tight',
    mark: <path d="M12 3v18M3 12h18M5.600 5.600l12.800 12.800M18.400 5.600 5.600 18.400" strokeLinecap="round" />,
  },
  {
    name: 'QUILLMARK',
    style: 'font-sans font-bold tracking-[0.18em] text-[0.95rem]',
    mark: <path d="M4 20 20 4M20 4h-9M20 4v9" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    name: 'tessaro',
    style: 'font-display font-medium tracking-tight text-[1.35rem]',
    mark: (
      <>
        <rect x="3" y="3" width="8" height="8" rx="1.5" />
        <rect x="13" y="13" width="8" height="8" rx="1.5" />
        <rect x="13" y="3" width="8" height="8" rx="4" />
      </>
    ),
  },
  {
    name: 'Brightfjord',
    style: 'font-sans font-semibold italic',
    mark: <path d="M2 18 8.500 7l4 6.500L15.500 9 22 18z" strokeLinejoin="round" />,
  },
  {
    name: 'OMNIVALE',
    style: 'font-mono font-medium tracking-[0.1em] text-[0.95rem]',
    mark: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3.500" />
      </>
    ),
  },
  {
    name: 'Kestrel & Rowe',
    style: 'font-display font-medium',
    mark: <path d="M3 12c5-8 13-8 18 0-5 8-13 8-18 0z" strokeLinejoin="round" />,
  },
  {
    name: 'lumenhaus',
    style: 'font-sans font-light tracking-[0.06em] text-[1.3rem]',
    mark: <path d="M4 21V9l8-6 8 6v12M10 21v-6h4v6" strokeLinejoin="round" />,
  },
  {
    name: 'PARDUS',
    style: 'font-display font-bold tracking-[0.22em] text-[0.95rem]',
    mark: <path d="M12 2 21 7v10l-9 5-9-5V7z" strokeLinejoin="round" />,
  },
]

function LogoRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {logos.map((logo) => (
        <li
          key={logo.name}
          className="flex items-center gap-2.5 whitespace-nowrap px-8 text-lg text-white/45 transition-colors duration-300 hover:text-white sm:px-11"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            {logo.mark}
          </svg>
          <span className={logo.style}>{logo.name}</span>
        </li>
      ))}
    </ul>
  )
}

export default function TrustBar() {
  return (
    <section aria-label="Customers" className="relative border-y border-line bg-surface/60 py-10">
      <p className="container-x text-center text-sm text-white/50">
        Trusted by <span className="font-semibold text-white">2,000+ organisations</span> to stay one step ahead
      </p>
      <div className="marquee-wrap mask-x mt-8 overflow-hidden">
        <div className="marquee flex w-max">
          <LogoRow />
          <LogoRow hidden />
        </div>
      </div>
    </section>
  )
}
