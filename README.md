# Noctera — enterprise security homepage mockup

A single-page, fully responsive marketing site mockup for a managed threat detection
company. Dark premium theme, one vivid accent colour, glass cards, animated SVG and
"live" product UI built entirely in HTML/CSS/SVG.

> **Everything here is fictional.** The brand, customers, people, awards, statistics
> and pricing are invented placeholders. No logos, copy, illustrations or images were
> taken from any real website.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
npm run preview    # serve ./out locally
```

Requires Node 20.9 or newer. `./out` is plain HTML/CSS/JS and can be dropped on any
static host (Netlify, Vercel, S3, GitHub Pages, nginx).

When hosting under a sub-path (for example GitHub Pages project sites), build with
`BASE_PATH=/repo-name npm run build`.

## Rebrand it

The client details in the brief were left as unfilled placeholders, so the site ships
with a stand-in brand. Everything brand-level lives in **`lib/site.ts`**:

| Field | Current value | Notes |
| --- | --- | --- |
| `name` / `legalName` | Noctera | Used in the logo, hero, metadata and footer |
| `accent` | `#B4FF39` | Any hex. Text on accent surfaces switches between dark and white automatically |
| `logoSrc` | `null` | Put a file at `public/assets/logo.svg` and set this to `'/assets/logo.svg'` |
| `cta` | Request a Demo | Primary button label everywhere |
| `hotline` | +1 (555) 010-0199 | "Under attack?" number (a reserved fictional range) |

Section copy lives at the top of each component in `components/`. Navigation and
mega-menu content is in `components/nav-data.ts`. The favicon (`app/icon.svg`) has the
accent colour hard-coded, so update it if you change the accent.

## What is on the page

1. Announcement bar
2. Sticky navbar — mega-menu on desktop, animated hamburger and accordion on mobile, "Under attack?" link, primary CTA
3. Hero — animated SVG network and shield visual
4. Trust bar — infinite marquee of fictional wordmarks
5. Problem — speed, scale, sophistication
6. Platform — four tabs, each with copy, stats and an SVG diagram
7. Product showcase — risk-score alert, live activity log, account-takeover timeline
8. Stats band — four animated counters
9. Services grid — six cards
10. Recognition strip — four fictional badges
11. Testimonials carousel — three fictional customers
12. Pricing — three tiers with a monthly / annual toggle
13. Final CTA, incident hotline and footer

## Decisions made without asking

- **Brand:** invented name "Noctera" and an electric lime accent, since no client details were supplied.
- **No `/references` folder or `/assets/logo.svg` existed**, so the design follows the written direction only and uses a text-based logo with an original shield mark.
- **The brief was cut off at section 12** ("Pricing — 3 tiers with monthly/annual"). I read that as a monthly/annual billing toggle and added a closing CTA, hotline block and footer so the page ends properly. Anything listed after that point in the original brief is not built.
- **Fonts:** Hanken Grotesk for headings and body, JetBrains Mono for product-UI labels, self-hosted at build time through `next/font` — nothing loads from Google at runtime, but the build needs network access once to fetch them. The Palo Alto Networks site that inspired the type uses TT Hoves, a commercial typeface; Hanken Grotesk is the closest free match. If the client licenses TT Hoves, swap it in `app/layout.tsx`.
- **Motion:** inertia scrolling (Lenis, wheel/trackpad only), masked word-by-word hero headline, hero parallax and cursor tilt, 3D tilt on the dashboard cards, travelling border beams, a scroll-progress line under the navbar, and platform tabs that auto-advance until the visitor picks one.
- **Next.js 16 / Tailwind CSS 4.** Tailwind is configured in `app/globals.css` (`@theme`), so there is no `tailwind.config` file.
- **CTAs are placeholders:** in-page anchors, plus a `mailto:hello@example.com` on the final demo button. There is no form or backend.
- **Pricing figures** are illustrative; annual is shown as roughly 20% below monthly.

## Implementation notes

- **Stats work without JavaScript.** The final numbers are server-rendered into the HTML; the count-up only replaces the text once the band scrolls into view (`Counter` in `components/ui.tsx`).
- **Scroll-reveal degrades safely.** A `<noscript>` style forces revealed content visible when JS is off.
- **Reduced motion is respected** for CSS animations, SVG data packets and all Framer Motion animation; the activity log, timeline and carousel stop auto-playing.
- **No external assets.** Every graphic is inline SVG or CSS.
- **Accessibility:** skip link, visible focus rings, ARIA tabs with arrow-key support, `aria-expanded` on menus, Escape closes menus, the carousel pauses on hover and focus.

## Tested

Checked in headless Edge at 1440px, 820px and 390px against the static export: no
console errors, no horizontal overflow, and the mega-menu, mobile menu, tabs, activity
log, pricing toggle and carousel all behave as intended. Not tested in Safari or
Firefox, or on physical devices.
