import type { Metadata, Viewport } from 'next'
import type { CSSProperties, ReactNode } from 'react'
import { Inter, JetBrains_Mono, Sora } from 'next/font/google'
import { inkFor, site } from '@/lib/site'
import Providers from '@/components/Providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--f-inter', display: 'swap' })
const display = Sora({ subsets: ['latin'], variable: '--f-display', display: 'swap', weight: ['500', '600', '700'] })
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
    <html lang="en" style={brand} className={`${inter.variable} ${display.variable} ${mono.variable}`}>
      <head>
        {/* Scroll-reveal content starts hidden; make sure it is visible without JavaScript. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
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
