/**
 * CLIENT DETAILS — the single place to rebrand the mockup.
 * Everything here is fictional placeholder content.
 */
export const site = {
  name: 'Noctera',
  legalName: 'Noctera Security, Inc.',
  industry: 'Managed threat detection and response for mid-size businesses',
  description:
    'Noctera pairs AI-driven detection with a 24/7 team of human responders to find, contain and remove threats across email, identity, cloud and endpoint.',
  /** Brand accent. Any hex works — button text colour is derived automatically. */
  accent: '#B4FF39',
  /** Set to '/assets/logo.svg' (file in /public/assets) to replace the text logo. */
  logoSrc: null as string | null,
  cta: 'Request a Demo',
  ctaHref: '#demo',
  emergencyLabel: 'Under attack?',
  emergencyHref: '#under-attack',
  hotline: '+1 (555) 010-0199',
}

/** Picks near-black or white text for content sitting on the accent colour. */
export function inkFor(hex: string): string {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255)
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  const luminance = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
  return luminance > 0.4 ? '#06080a' : '#ffffff'
}
