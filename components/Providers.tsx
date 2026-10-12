'use client'

import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { MotionConfig } from 'framer-motion'
import Lenis from 'lenis'

export default function Providers({ children }: { children: ReactNode }) {
  // Inertia scrolling for wheel/trackpad. Touch devices keep native scrolling.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1, anchors: { offset: -88 } })
    return () => lenis.destroy()
  }, [])

  // Honour the OS "reduce motion" setting for every Framer Motion animation.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
