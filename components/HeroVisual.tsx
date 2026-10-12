import { Cloud, Fingerprint, Globe, Laptop, Mail, Server, ShieldCheck } from 'lucide-react'

const C = 280

const nodes = [
  { x: 96, y: 118, label: 'Email', icon: Mail, bend: 0.18, dur: 3.2, delay: 0 },
  { x: 462, y: 96, label: 'Cloud', icon: Cloud, bend: -0.16, dur: 3.8, delay: 0.9 },
  { x: 508, y: 300, label: 'Identity', icon: Fingerprint, bend: 0.2, dur: 2.9, delay: 0.4 },
  { x: 420, y: 478, label: 'Endpoint', icon: Laptop, bend: -0.18, dur: 3.5, delay: 1.5 },
  { x: 128, y: 458, label: 'SaaS', icon: Server, bend: 0.16, dur: 4.1, delay: 0.7 },
  { x: 52, y: 288, label: 'Unknown IP', icon: Globe, bend: -0.2, dur: 0, delay: 0, threat: true },
]

/** Gently curved path from a node to the central shield. */
function link(x: number, y: number, bend: number) {
  const cx = Math.round((x + C) / 2 - (C - y) * bend)
  const cy = Math.round((y + C) / 2 + (C - x) * bend)
  return `M${x} ${y} Q${cx} ${cy} ${C} ${C}`
}

export default function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
      <div className="absolute inset-[12%] rounded-full bg-accent/20 blur-[90px]" aria-hidden="true" />

      <svg
        viewBox="0 0 560 560"
        className="relative h-full w-full"
        role="img"
        aria-label="Animated diagram: email, cloud, identity, endpoint and SaaS signals flowing into a central shield while a hostile connection is blocked"
      >
        <defs>
          <radialGradient id="hv-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hv-sweep" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="hv-shield" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.04" />
          </linearGradient>
        </defs>

        {/* Orbit rings */}
        <circle cx={C} cy={C} r="112" fill="none" stroke="rgb(255 255 255 / 0.1)" />
        <g className="spin-slow" style={{ transformOrigin: `${C}px ${C}px` }}>
          <circle cx={C} cy={C} r="176" fill="none" stroke="rgb(255 255 255 / 0.14)" strokeDasharray="2 9" />
          <circle cx={C + 176} cy={C} r="3.5" fill="var(--accent)" />
        </g>
        <g className="spin-rev" style={{ transformOrigin: `${C}px ${C}px` }}>
          <circle cx={C} cy={C} r="244" fill="none" stroke="rgb(255 255 255 / 0.09)" strokeDasharray="1 14" />
          <circle cx={C} cy={C - 244} r="3" fill="rgb(255 255 255 / 0.5)" />
        </g>

        {/* Radar sweep */}
        <g className="sweep" style={{ transformOrigin: `${C}px ${C}px` }}>
          <path d={`M${C} ${C} L${C} ${C - 244} A244 244 0 0 1 ${C + 173} ${C - 172} Z`} fill="url(#hv-sweep)" opacity="0.35" />
        </g>

        {/* Data links */}
        {nodes.map((n) => {
          const d = link(n.x, n.y, n.bend)
          return n.threat ? (
            <g key={n.label}>
              <path d={d} fill="none" stroke="var(--color-danger)" strokeOpacity="0.55" strokeWidth="1.5" strokeDasharray="3 7" />
              <g transform="translate(150 292)">
                <circle r="11" fill="#06080a" stroke="var(--color-danger)" strokeWidth="1.5" />
                <path d="M-4 -4 4 4M4 -4 -4 4" stroke="var(--color-danger)" strokeWidth="1.8" strokeLinecap="round" />
              </g>
            </g>
          ) : (
            <g key={n.label}>
              <path d={d} fill="none" stroke="rgb(255 255 255 / 0.1)" strokeWidth="1.2" />
              <path d={d} fill="none" stroke="var(--accent)" strokeOpacity="0.55" strokeWidth="1.2" strokeDasharray="4 10" className="flow" />
              <circle r="3.5" fill="var(--accent)" className="packet">
                <animateMotion dur={`${n.dur}s`} begin={`${n.delay}s`} repeatCount="indefinite" path={d} />
              </circle>
            </g>
          )
        })}

        {/* Central shield */}
        <circle cx={C} cy={C} r="120" fill="url(#hv-core)" />
        <circle cx={C} cy={C} r="62" fill="none" stroke="var(--accent)" strokeOpacity="0.5" className="pulse-ring" />
        <circle cx={C} cy={C} r="62" fill="#06080a" stroke="var(--accent)" strokeOpacity="0.45" />
        <path
          d={`M${C} ${C - 38} l32 12 v24 c0 20 -14 34 -32 42 c-18 -8 -32 -22 -32 -42 v-24 z`}
          fill="url(#hv-shield)"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d={`M${C - 13} ${C + 2} l9 9 l17 -19`}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Source nodes */}
        {nodes.map((n, i) => {
          const tone = n.threat ? 'var(--color-danger)' : 'var(--accent)'
          return (
            <g key={n.label}>
              <circle cx={n.x} cy={n.y} r="24" fill="none" stroke={tone} className="pulse-ring" style={{ animationDelay: `${i * 0.45}s` }} />
              <circle cx={n.x} cy={n.y} r="24" fill="#0c1014" stroke={n.threat ? tone : 'rgb(255 255 255 / 0.18)'} />
              <n.icon x={n.x - 10} y={n.y - 10} width={20} height={20} color={n.threat ? tone : '#fff'} strokeWidth={1.6} aria-hidden="true" />
              <text
                x={n.x}
                y={n.y + 44}
                textAnchor="middle"
                fill={n.threat ? tone : 'rgb(255 255 255 / 0.55)'}
                fontSize="11"
                fontFamily="var(--font-mono)"
                letterSpacing="0.08em"
              >
                {n.label.toUpperCase()}
              </text>
            </g>
          )
        })}
      </svg>

      {/* Floating status chips */}
      <div className="glass float absolute left-[34%] top-[1%] hidden items-center gap-3 rounded-xl px-4 py-3 sm:flex" aria-hidden="true">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent">
          <ShieldCheck className="h-4 w-4" />
        </span>
        <span>
          <span className="block text-[0.8125rem] font-medium">Threat neutralised</span>
          <span className="block font-mono text-[0.6875rem] text-white/50">contained in 0.8s</span>
        </span>
      </div>
      <div
        className="glass float absolute bottom-0 left-[36%] hidden rounded-xl px-4 py-3 sm:block"
        style={{ animationDelay: '-3.5s' }}
        aria-hidden="true"
      >
        <span className="block font-mono text-[0.625rem] uppercase tracking-widest text-white/45">Signals / min</span>
        <span className="mt-1 flex items-end gap-3">
          <span className="font-display text-lg font-semibold">48,219</span>
          <span className="flex h-5 items-end gap-[3px]">
            {[40, 65, 50, 85, 60, 100, 75].map((h, i) => (
              <span key={i} className="w-[3px] rounded-sm bg-accent" style={{ height: `${h}%`, opacity: 0.4 + i * 0.1 }} />
            ))}
          </span>
        </span>
      </div>
    </div>
  )
}
