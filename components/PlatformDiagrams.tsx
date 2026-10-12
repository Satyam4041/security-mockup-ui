/** Original SVG diagrams for the platform tabs. All share a 480×280 canvas. */

const MONO = { fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' } as const
const DIM = 'rgb(255 255 255 / 0.55)'
const LINE = 'rgb(255 255 255 / 0.14)'
const A = 'var(--accent)'
const R = 'var(--color-danger)'

function Frame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 480 280" className="h-full w-full" role="img" aria-label={label}>
      {children}
    </svg>
  )
}

export function DetectDiagram() {
  const sources = ['EMAIL', 'IDENTITY', 'ENDPOINT', 'CLOUD', 'NETWORK']
  return (
    <Frame label="Five signal sources converge on a behavioural engine that outputs a single verdict">
      {sources.map((s, i) => {
        const y = 30 + i * 50
        const d = `M112 ${y + 14} C180 ${y + 14} 170 140 232 140`
        return (
          <g key={s}>
            <rect x="12" y={y} width="100" height="28" rx="8" fill="rgb(255 255 255 / 0.04)" stroke={LINE} />
            <text x="62" y={y + 18} textAnchor="middle" fontSize="10" fill={DIM} style={MONO}>
              {s}
            </text>
            <path d={d} fill="none" stroke={LINE} />
            <path d={d} fill="none" stroke={A} strokeOpacity="0.7" strokeDasharray="4 10" className="flow" />
          </g>
        )
      })}
      <circle cx="270" cy="140" r="52" fill={A} fillOpacity="0.06" />
      <circle cx="270" cy="140" r="38" fill="#06080a" stroke={A} strokeOpacity="0.6" />
      <circle cx="270" cy="140" r="38" fill="none" stroke={A} className="pulse-ring" />
      <text x="270" y="137" textAnchor="middle" fontSize="10" fill="#fff" style={MONO}>
        BEHAVIOUR
      </text>
      <text x="270" y="151" textAnchor="middle" fontSize="10" fill={A} style={MONO}>
        ENGINE
      </text>
      <path d="M308 140 H352" stroke={A} strokeWidth="1.5" strokeDasharray="4 10" className="flow" />
      <rect x="352" y="104" width="116" height="72" rx="12" fill={A} fillOpacity="0.08" stroke={A} strokeOpacity="0.6" />
      <text x="410" y="130" textAnchor="middle" fontSize="9" fill={DIM} style={MONO}>
        VERDICT
      </text>
      <text x="410" y="152" textAnchor="middle" fontSize="15" fontWeight="600" fill="#fff">
        1 incident
      </text>
      <text x="410" y="167" textAnchor="middle" fontSize="9" fill={A} style={MONO}>
        96% CONFIDENCE
      </text>
    </Frame>
  )
}

export function InvestigateDiagram() {
  const n = {
    user: [70, 140],
    mail: [190, 62],
    device: [190, 218],
    ip: [310, 62],
    app: [310, 218],
    data: [416, 140],
  } as const
  const edges: [keyof typeof n, keyof typeof n, boolean][] = [
    ['user', 'mail', true],
    ['mail', 'ip', true],
    ['ip', 'data', true],
    ['user', 'device', false],
    ['device', 'app', false],
    ['app', 'data', false],
    ['mail', 'app', false],
  ]
  const labels: Record<keyof typeof n, string> = {
    user: 'USER',
    mail: 'MAILBOX',
    device: 'LAPTOP',
    ip: 'FOREIGN IP',
    app: 'OAUTH APP',
    data: 'FINANCE SHARE',
  }
  const hot = new Set(['mail', 'ip', 'data'])
  return (
    <Frame label="Attack graph linking a user, mailbox, foreign IP address and finance share, with the attack path highlighted">
      {edges.map(([a, b, attack]) => (
        <g key={a + b}>
          <line x1={n[a][0]} y1={n[a][1]} x2={n[b][0]} y2={n[b][1]} stroke={attack ? R : LINE} strokeOpacity={attack ? 0.4 : 1} strokeWidth={attack ? 1.5 : 1} />
          {attack && (
            <line x1={n[a][0]} y1={n[a][1]} x2={n[b][0]} y2={n[b][1]} stroke={R} strokeWidth="1.5" strokeDasharray="4 10" className="flow" />
          )}
        </g>
      ))}
      {(Object.keys(n) as (keyof typeof n)[]).map((k) => {
        const [x, y] = n[k]
        const isHot = hot.has(k)
        return (
          <g key={k}>
            {isHot && <circle cx={x} cy={y} r="16" fill="none" stroke={R} className="pulse-ring" />}
            <circle cx={x} cy={y} r="16" fill="#0c1014" stroke={isHot ? R : k === 'user' ? A : 'rgb(255 255 255 / 0.3)'} strokeWidth="1.5" />
            <circle cx={x} cy={y} r="5" fill={isHot ? R : k === 'user' ? A : 'rgb(255 255 255 / 0.5)'} />
            <text x={x} y={y + 34} textAnchor="middle" fontSize="9.5" fill={isHot ? R : DIM} style={MONO}>
              {labels[k]}
            </text>
          </g>
        )
      })}
      <rect x="150" y="124" width="184" height="30" rx="15" fill="#06080a" stroke={LINE} />
      <text x="242" y="143" textAnchor="middle" fontSize="10" fill="#fff" style={MONO}>
        ROOT CAUSE FOUND · 6.2s
      </text>
    </Frame>
  )
}

export function RespondDiagram() {
  const steps = [
    { t: 'T+0s', label: 'Detect' },
    { t: 'T+4s', label: 'Contain' },
    { t: 'T+21s', label: 'Eradicate' },
    { t: 'T+38s', label: 'Recover' },
  ]
  return (
    <Frame label="Four-step automated playbook: detect, contain, eradicate and recover, completed in 38 seconds">
      <line x1="60" y1="118" x2="420" y2="118" stroke={LINE} strokeWidth="2" />
      <line x1="60" y1="118" x2="420" y2="118" stroke={A} strokeWidth="2" strokeDasharray="4 10" className="flow" />
      {steps.map((s, i) => {
        const x = 60 + i * 120
        return (
          <g key={s.label}>
            <circle cx={x} cy="118" r="22" fill="#06080a" stroke={A} strokeOpacity="0.7" strokeWidth="1.5" />
            <path d={`M${x - 8} 118 l6 6 l11 -12`} fill="none" stroke={A} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <text x={x} y="74" textAnchor="middle" fontSize="10" fill={A} style={MONO}>
              {s.t}
            </text>
            <text x={x} y="166" textAnchor="middle" fontSize="13" fontWeight="600" fill="#fff">
              {s.label}
            </text>
          </g>
        )
      })}
      <rect x="60" y="200" width="360" height="52" rx="12" fill="rgb(255 255 255 / 0.03)" stroke={LINE} />
      <text x="80" y="222" fontSize="9.5" fill={DIM} style={MONO}>
        PLAYBOOK · ACCOUNT-TAKEOVER-V4
      </text>
      <text x="80" y="240" fontSize="11" fill="#fff">
        7 actions run automatically · 0 analyst clicks
      </text>
      <rect x="352" y="214" width="56" height="24" rx="12" fill={A} fillOpacity="0.12" stroke={A} strokeOpacity="0.5" />
      <text x="380" y="230" textAnchor="middle" fontSize="9.5" fill={A} style={MONO}>
        DONE
      </text>
    </Frame>
  )
}

export function HardenDiagram() {
  const bars = [
    { label: 'MFA COVERAGE', v: 0.98 },
    { label: 'PATCH SLA', v: 0.91 },
    { label: 'EXPOSED ASSETS', v: 0.86 },
    { label: 'CONFIG DRIFT', v: 0.94 },
  ]
  const r = 70
  const circ = 2 * Math.PI * r
  return (
    <Frame label="Security posture score of 92 out of 100 with coverage bars for MFA, patching, exposure and configuration drift">
      <circle cx="118" cy="140" r={r} fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="12" />
      <circle
        cx="118"
        cy="140"
        r={r}
        fill="none"
        stroke={A}
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray={`${(circ * 0.92).toFixed(1)} ${circ.toFixed(1)}`}
        transform="rotate(-90 118 140)"
      />
      <circle cx="118" cy="140" r="52" fill="none" stroke={LINE} strokeDasharray="2 6" />
      <text x="118" y="148" textAnchor="middle" fontSize="40" fontWeight="600" fill="#fff">
        92
      </text>
      <text x="118" y="168" textAnchor="middle" fontSize="9.500" fill={DIM} style={MONO}>
        POSTURE SCORE
      </text>
      {bars.map((b, i) => {
        const y = 52 + i * 50
        return (
          <g key={b.label}>
            <text x="236" y={y} fontSize="9.5" fill={DIM} style={MONO}>
              {b.label}
            </text>
            <text x="462" y={y} textAnchor="end" fontSize="10" fill="#fff" style={MONO}>
              {Math.round(b.v * 100)}%
            </text>
            <rect x="236" y={y + 9} width="226" height="6" rx="3" fill="rgb(255 255 255 / 0.08)" />
            <rect x="236" y={y + 9} width={Math.round(226 * b.v)} height="6" rx="3" fill={A} />
          </g>
        )
      })}
    </Frame>
  )
}
