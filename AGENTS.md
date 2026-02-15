# AGENTS.md — Atout Travaux Web

> **Design Guidelines** : Avant toute modification visuelle ou creation de composant, consulter obligatoirement [`docs/design-guidelines.md`](docs/design-guidelines.md). Ce fichier contient toutes les couleurs, typographies, espacements, animations, breakpoints et patterns du site. Ne jamais inventer de nouvelles valeurs sans verifier qu'elles n'existent pas deja dans ce guide.

## Project Overview

Marketing website for **Atout Travaux**, a construction/renovation company in Auvergne-Rhône-Alpes, France. Includes a multi-step quote request form with Airtable backend.

## Stack

- **Framework**: Next.js 16.1.5 (App Router, Turbopack)
- **Language**: TypeScript, React 19
- **Styling**: Tailwind CSS v4 (PostCSS plugin, inline config in `globals.css`)
- **Animations**: Framer Motion, Lenis (smooth scroll)
- **i18n**: next-intl (FR only, ready for multilingual)
- **Deployment**: Cloudflare **Worker** via @opennextjs/cloudflare
- **Hosting**: `atouttravauxweb.hello-04a.workers.dev`

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npx eslint src/` | Lint (`next lint` was removed in Next.js 16) |
| `npm run deploy` | Build + deploy to Cloudflare Worker |

## Deployment

This project deploys as a **Cloudflare Worker**. The config is in `wrangler.jsonc`.

```bash
# Full deploy (build + deploy):
npm run deploy

# Or manually:
npx opennextjs-cloudflare build && npx wrangler deploy
```

**NEVER use `wrangler pages deploy`**. This is a Worker, not a Pages project. Using the wrong command will create a separate Pages project instead of updating the Worker.

## Project Structure

```
messages/
  fr.json                     # ALL displayed text (editable)
src/
  app/
    layout.tsx                # Root layout (html/body/fonts/Toaster only)
    [locale]/
      layout.tsx              # NextIntlClientProvider + metadata
      page.tsx                # Home page
      request-quote/page.tsx  # Multi-step quote form
  components/
    ui/                       # Reusable UI (Container, Button, ScrollReveal, etc.)
    layout/                   # Header, MobileMenu
    sections/                 # Hero, About, Projects, Services, etc.
    quote/                    # Quote form (context, steps, layout)
  i18n/
    routing.ts                # Locale config (locales, prefix)
    request.ts                # Server-side next-intl config
  lib/
    constants.ts              # Technical config only (images, hrefs, icons)
    utils.ts                  # cn() helper
  content/
    EDITING.md                # Detailed guide for editing messages/fr.json
```

---

## Editing Text Content

All displayed text lives in **`messages/fr.json`**. This is the only file to modify when changing text.

### Rules

1. **Only edit values** (text in quotes), never change JSON keys
2. **Keep valid JSON** — check commas and quotes
3. **Don't change array lengths** without verifying the component code
4. **`company.phoneHref`** must match `company.phone` in `tel:+33...` format
5. Read `src/content/EDITING.md` for detailed examples

### Structure

| Key | Section |
|-----|---------|
| `metadata` | SEO titles/descriptions |
| `company` | Name, phone, email, address |
| `nav` | Navigation links |
| `hero` | Hero section |
| `about` | About section |
| `stats` | Key figures (top-level array) |
| `features` | Feature cards (top-level array) |
| `services` | Services section |
| `projects` | Portfolio section |
| `testimonials` | Client testimonials |
| `beforeAfter` | Before/after renovation |
| `faq` | FAQ section |
| `ctaFooter` | Footer CTA |
| `footer` | Footer info |
| `contactModal` | Contact form modal |
| `quote` | Multi-step quote form |

### What does NOT go in `messages/fr.json`

- Images/URLs → `src/lib/constants.ts`
- Colors/style → `src/app/globals.css`
- Page structure → React components
- Icons → `src/lib/constants.ts`

---

## i18n Patterns (next-intl)

### Client components (`"use client"`)

```tsx
import { useTranslations } from "next-intl";

export default function MyComponent() {
  const t = useTranslations("sectionName");

  // Simple string
  return <h2>{t("heading")}</h2>;

  // Array of objects — use t.raw()
  const items = t.raw("items") as Array<{ title: string; description: string }>;
  return items.map((item, i) => <div key={i}>{item.title}</div>);
}
```

### Server components (async)

```tsx
import { getTranslations } from "next-intl/server";

export default async function MyComponent() {
  const t = await getTranslations("sectionName");
  return <h2>{t("heading")}</h2>;
}
```

### Top-level arrays (`stats`, `features`)

`stats` and `features` are top-level arrays in `messages/fr.json`, not nested under a namespace. Use `getMessages()` to access them:

```tsx
import { getMessages } from "next-intl/server";

export default async function MyComponent() {
  const messages = await getMessages();
  const statsArr = messages.stats as Array<{ value: string; label: string }>;
}
```

**Do NOT use `getTranslations("stats")` for top-level arrays** — next-intl cannot resolve them as namespaces.

### Interpolation

```tsx
// In messages/fr.json: "message": "Merci {firstName} !"
t("message", { firstName: data.firstName });
```

### Multiple namespaces in one component

```tsx
const tAbout = useTranslations("about");
const tServices = useTranslations("services");
```

---

## Component Patterns

### Design system

See [`docs/design-guidelines.md`](docs/design-guidelines.md) for the full design system: colors, typography, spacing, animations, button variants, card styles, image overlays, form styles, and all easing curves.

Quick reference: Background `#f7f7f7`, accent gold `#c8a55a`, cards `bg-white rounded-2xl`, breakpoints sm=640/md=810/lg=1200/xl=1480.

### Technical config in `constants.ts`

Images, hrefs, and icons live in `src/lib/constants.ts`, indexed to match arrays in `messages/fr.json`:

```tsx
import { SERVICE_IMAGES } from "@/lib/constants";

const items = t.raw("items") as Array<{ title: string }>;
// SERVICE_IMAGES[0] corresponds to items[0], etc.
```

### Contact modal

```tsx
import ContactButton from "@/components/ui/ContactButton";

// In server components:
<ContactButton variant="primary">Contact</ContactButton>

// In client components (direct):
import { openContactModal } from "@/components/ui/ContactModal";
openContactModal();
```

### Scroll animations

```tsx
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";

<ScrollReveal>
  <h2>Fades in on scroll</h2>
</ScrollReveal>

<StaggerContainer stagger={0.08}>
  <StaggerItem>Item 1</StaggerItem>
  <StaggerItem>Item 2</StaggerItem>
</StaggerContainer>
```

---

## Tailwind CSS v4

Config is **inline in `src/app/globals.css`** using `@theme inline`. There is no `tailwind.config.ts`.

To add custom colors, breakpoints, or tokens, edit `globals.css`:

```css
@theme inline {
  --color-accent: #c8a55a;
  --breakpoint-md: 810px;
  /* etc. */
}
```

---

## Gotchas

- **Turbopack cache**: If you get a panic after deleting/moving files, run `rm -rf .next` and restart dev
- **`next lint` removed**: Use `npx eslint src/` instead
- **Framer Motion `useTransform`**: Array ranges are unreliable for opacity — use function callbacks
- **`motion.create()` in render**: Causes unmount/remount loops — define outside render
- **`layout` animation + borderRadius**: Causes oval distortion — use CSS transitions instead
- **Lenis smooth scroll**: Remove `scroll-behavior: smooth` from CSS when using Lenis
- **iOS Safari**: Avoid `position: fixed/sticky` on dark elements (status bar tinting)
- **Tailwind `space-x`**: Doesn't animate on hover — use `margin-left` with `transition-[margin]`
- **`position: relative`**: Paints above non-positioned siblings — use `isolation: isolate` for sticky sections
