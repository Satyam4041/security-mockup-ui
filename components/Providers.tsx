'use client'

import type { ReactNode } from 'react'
import { MotionConfig } from 'framer-motion'

export default function Providers({ children }: { children: ReactNode }) {
  // Honour the OS "reduce motion" setting for every Framer Motion animation.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
