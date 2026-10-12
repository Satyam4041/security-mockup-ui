import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  BookOpen,
  Building2,
  Cloud,
  Crosshair,
  FileText,
  Fingerprint,
  HeartPulse,
  Landmark,
  Laptop,
  LifeBuoy,
  Mail,
  Newspaper,
  Radar,
  ScanSearch,
  ShieldCheck,
  Siren,
  Users,
  Workflow,
  Zap,
} from 'lucide-react'

export type NavLink = { label: string; desc: string; icon: LucideIcon; href: string }
export type NavItem = {
  label: string
  href: string
  columns?: { title: string; links: NavLink[] }[]
  feature?: { tag: string; title: string; desc: string; href: string }
}

export const nav: NavItem[] = [
  {
    label: 'Platform',
    href: '#platform',
    columns: [
      {
        title: 'Core capabilities',
        links: [
          { label: 'Detect', desc: 'Behavioural AI across every signal', icon: Radar, href: '#platform' },
          { label: 'Investigate', desc: 'Attack graphs built in seconds', icon: ScanSearch, href: '#platform' },
          { label: 'Respond', desc: 'Automated containment playbooks', icon: Zap, href: '#platform' },
        ],
      },
      {
        title: 'Coverage',
        links: [
          { label: 'Email', desc: 'Stop BEC and credential phishing', icon: Mail, href: '#showcase' },
          { label: 'Identity', desc: 'End account takeover', icon: Fingerprint, href: '#showcase' },
          { label: 'Cloud & endpoint', desc: 'One view of every workload', icon: Cloud, href: '#showcase' },
        ],
      },
    ],
    feature: {
      tag: 'Product tour',
      title: 'See a takeover stopped in 38 seconds',
      desc: 'Walk through a real response, step by step.',
      href: '#showcase',
    },
  },
  {
    label: 'Solutions',
    href: '#problem',
    columns: [
      {
        title: 'By challenge',
        links: [
          { label: 'Ransomware readiness', desc: 'Cut dwell time to minutes', icon: ShieldCheck, href: '#problem' },
          { label: 'Account takeover', desc: 'Catch stolen sessions early', icon: Fingerprint, href: '#showcase' },
          { label: 'Lean security teams', desc: 'A full SOC without the hiring', icon: Users, href: '#services' },
        ],
      },
      {
        title: 'By industry',
        links: [
          { label: 'Financial services', desc: 'Audit-ready by default', icon: Landmark, href: '#testimonials' },
          { label: 'Healthcare', desc: 'Protect patient data', icon: HeartPulse, href: '#testimonials' },
          { label: 'Manufacturing', desc: 'Keep production running', icon: Building2, href: '#testimonials' },
        ],
      },
    ],
    feature: {
      tag: 'Customer story',
      title: 'How a 600-person lender cut alerts by 94%',
      desc: 'From 1,400 daily alerts to the nine that mattered.',
      href: '#testimonials',
    },
  },
  {
    label: 'Services',
    href: '#services',
    columns: [
      {
        title: 'Managed',
        links: [
          { label: 'Managed detection & response', desc: '24/7 eyes on glass', icon: Activity, href: '#services' },
          { label: 'Threat hunting', desc: 'Hypothesis-led, human-run', icon: Crosshair, href: '#services' },
          { label: 'Endpoint defence', desc: 'Fully operated EDR', icon: Laptop, href: '#services' },
        ],
      },
      {
        title: 'Expert',
        links: [
          { label: 'Incident response', desc: 'On the case in 15 minutes', icon: Siren, href: '#under-attack' },
          { label: 'Offensive testing', desc: 'Find the gaps first', icon: Workflow, href: '#services' },
          { label: 'Security advisory', desc: 'A vCISO on your side', icon: LifeBuoy, href: '#services' },
        ],
      },
    ],
    feature: {
      tag: 'Retainer',
      title: 'Zero-cost incident response retainer',
      desc: 'Included with every Advanced and Enterprise plan.',
      href: '#pricing',
    },
  },
  {
    label: 'Resources',
    href: '#resources',
    columns: [
      {
        title: 'Learn',
        links: [
          { label: 'Threat research', desc: 'Field notes from our analysts', icon: FileText, href: '#resources' },
          { label: 'Guides', desc: 'Practical playbooks for teams', icon: BookOpen, href: '#resources' },
          { label: 'Newsroom', desc: 'Announcements and coverage', icon: Newspaper, href: '#resources' },
        ],
      },
      {
        title: 'Proof',
        links: [
          { label: 'Analyst recognition', desc: 'What the evaluators say', icon: ShieldCheck, href: '#resources' },
          { label: 'Customer stories', desc: 'Results from teams like yours', icon: Users, href: '#testimonials' },
          { label: 'Platform status', desc: '99.99% uptime, live', icon: Activity, href: '#stats' },
        ],
      },
    ],
    feature: {
      tag: 'New report',
      title: '2026 Threat Outlook',
      desc: 'Why identity is the new perimeter — and what to do about it.',
      href: '#resources',
    },
  },
  { label: 'Pricing', href: '#pricing' },
]
