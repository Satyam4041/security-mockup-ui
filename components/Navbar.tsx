'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown, Siren } from 'lucide-react'
import { site } from '@/lib/site'
import { nav } from './nav-data'
import Logo from './Logo'

export default function Navbar() {
  const [open, setOpen] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const show = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(label)
  }
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpen(null), 140)
  }
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(null)
        setMobileOpen(false)
      }
    }
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const active = nav.find((item) => item.label === open && item.columns)
  const solid = scrolled || !!active || mobileOpen

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        solid ? 'border-line bg-ink/85 backdrop-blur-xl' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <a href="#top" aria-label={`${site.name} home`} className="shrink-0">
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex" onMouseLeave={scheduleClose}>
          {nav.map((item) =>
            item.columns ? (
              <button
                key={item.label}
                type="button"
                aria-expanded={open === item.label}
                aria-controls="mega-menu"
                onMouseEnter={() => show(item.label)}
                onFocus={() => show(item.label)}
                onClick={() => setOpen(open === item.label ? null : item.label)}
                className={`flex cursor-pointer items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  open === item.label ? 'bg-white/[0.07] text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                {item.label}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${open === item.label ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
            ) : (
              <a
                key={item.label}
                href={item.href}
                onMouseEnter={scheduleClose}
                onFocus={() => setOpen(null)}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={site.emergencyHref}
            className="hidden items-center gap-1.5 rounded-full px-2 py-2 text-sm font-medium text-danger transition-colors hover:text-white sm:inline-flex"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-danger" />
            </span>
            {site.emergencyLabel}
          </a>
          <a href={site.ctaHref} className="btn btn-primary btn-sm hidden sm:inline-flex">
            {site.cta}
          </a>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-line bg-white/[0.04] lg:hidden"
          >
            <span className="relative block h-3.5 w-[18px]" aria-hidden="true">
              <motion.span
                className="absolute left-0 top-0 h-0.5 w-full rounded bg-white"
                animate={mobileOpen ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.25 }}
              />
              <motion.span
                className="absolute left-0 top-[6px] h-0.5 w-full rounded bg-white"
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="absolute left-0 top-[12px] h-0.5 w-full rounded bg-white"
                animate={mobileOpen ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.25 }}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Desktop mega-menu */}
      <AnimatePresence>
        {active && (
          <motion.div
            id="mega-menu"
            key="mega"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            className="absolute inset-x-0 top-full hidden border-b border-line bg-ink shadow-[0_40px_80px_-20px_rgb(0_0_0/0.8)] lg:block"
          >
            <div className="container-x grid grid-cols-[1fr_1fr_0.95fr] gap-8 py-8">
              {active.columns!.map((col) => (
                <div key={col.title}>
                  <p className="px-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-white/40">{col.title}</p>
                  <ul className="mt-3 space-y-1">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          onClick={() => setOpen(null)}
                          className="group/link flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-white/[0.05]"
                        >
                          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-white/[0.04] text-white/70 transition-colors group-hover/link:border-accent/50 group-hover/link:text-accent">
                            <link.icon className="h-[18px] w-[18px]" aria-hidden="true" />
                          </span>
                          <span>
                            <span className="block text-sm font-medium text-white">{link.label}</span>
                            <span className="mt-0.5 block text-[0.8125rem] text-white/50">{link.desc}</span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {active.feature && (
                <a
                  href={active.feature.href}
                  onClick={() => setOpen(null)}
                  className="group/feat relative flex flex-col justify-end overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent/50"
                >
                  <div className="bg-grid absolute inset-0 opacity-60" aria-hidden="true" />
                  <div
                    className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/25 blur-3xl transition-opacity group-hover/feat:opacity-80"
                    aria-hidden="true"
                  />
                  <div className="relative">
                    <p className="eyebrow">{active.feature.tag}</p>
                    <p className="mt-3 font-display text-xl font-semibold leading-snug">{active.feature.title}</p>
                    <p className="mt-2 text-sm text-white/55">{active.feature.desc}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                      Explore
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform group-hover/feat:-translate-y-0.5 group-hover/feat:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="absolute inset-x-0 top-full h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-line bg-ink lg:hidden"
          >
            <div className="container-x pb-32 pt-4">
              <ul>
                {nav.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i + 0.05 }}
                    className="border-b border-line"
                  >
                    {item.columns ? (
                      <>
                        <button
                          type="button"
                          aria-expanded={mobileSection === item.label}
                          onClick={() => setMobileSection(mobileSection === item.label ? null : item.label)}
                          className="flex w-full cursor-pointer items-center justify-between py-4 text-left font-display text-xl font-medium"
                        >
                          {item.label}
                          <ChevronDown
                            className={`h-5 w-5 text-white/50 transition-transform ${
                              mobileSection === item.label ? 'rotate-180 text-accent' : ''
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {mobileSection === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <ul className="grid gap-1 pb-4 sm:grid-cols-2">
                                {item.columns.flatMap((c) => c.links).map((link) => (
                                  <li key={link.label}>
                                    <a
                                      href={link.href}
                                      onClick={() => setMobileOpen(false)}
                                      className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-[0.9375rem] text-white/75 active:bg-white/[0.06]"
                                    >
                                      <link.icon className="h-[18px] w-[18px] shrink-0 text-accent" aria-hidden="true" />
                                      {link.label}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <a
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-4 font-display text-xl font-medium"
                      >
                        {item.label}
                      </a>
                    )}
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 grid gap-3">
                <a href={site.ctaHref} onClick={() => setMobileOpen(false)} className="btn btn-primary w-full">
                  {site.cta}
                </a>
                <a
                  href={site.emergencyHref}
                  onClick={() => setMobileOpen(false)}
                  className="btn w-full border border-danger/40 bg-danger/10 text-danger"
                >
                  <Siren className="h-4 w-4" aria-hidden="true" />
                  {site.emergencyLabel} Get help now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
