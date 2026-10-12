import type { Metadata, Viewport } from 'next'
import type { CSSProperties, ReactNode } from 'react'
import { Hanken_Grotesk, JetBrains_Mono } from 'next/font/google'
import { inkFor, site } from '@/lib/site'
import Providers from '@/components/Providers'
import './globals.css'

// One grotesque family for headings and body, in the spirit of the reference sites.
const sans = Hanken_Grotesk({ subsets: ['latin'], variable: '--f-sans', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--f-mono', display: 'swap', weight: ['400', '500'] })

export const metadata: Metadata = {
  title: `${site.name} — Shut down attacks in seconds`,
  description: site.description,
  openGraph: {
    title: `${site.name} — Shut down attacks in seconds`,
    description: site.description,
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#06080a',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const brand = { '--accent': site.accent, '--accent-ink': inkFor(site.accent) } as CSSProperties

  return (
    <html lang="en" style={brand} className={`${sans.variable} ${mono.variable}`}>
      <head>
        {/* Scroll-reveal content starts hidden; make sure it is visible without JavaScript. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;filter:none!important;clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body className="bg-ink font-sans text-white antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent-ink"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
