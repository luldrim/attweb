# Design Guidelines — Atout Travaux

Source de verite unique pour le design system du site. Toute modification visuelle doit respecter ces conventions.

---

## 1. Couleurs

### Tokens CSS (`globals.css`, `@theme inline`)

| Token | Valeur | Usage |
|-------|--------|-------|
| `--background` | `#f7f7f7` | Fond de page, sections claires |
| `--foreground` | `#1a1a1a` | Texte principal, boutons dark |
| `--accent` | `#c8a55a` | Or — labels, CTA, icones, badges |
| `--accent-hover` | `#b8953f` | Or fonce — hover boutons accent |
| `--surface` | `#ffffff` | Cartes, panels |
| `--muted` | `#6b7280` | Texte secondaire |
| `--border` | `rgba(0, 0, 0, 0.08)` | Bordures subtiles |

### Opacites recurrentes

| Classe | Usage |
|--------|-------|
| `text-foreground/70` | Descriptions, paragraphes |
| `text-foreground/60` | Meta text, sous-labels |
| `text-foreground/50` | Dates, elements discrets |
| `text-foreground/40` | Elements decoratifs (dots) |
| `text-white/70` | Texte clair sur fond sombre (hero labels) |
| `text-white/50` | Sous-titres sur fond sombre |
| `text-white/40` | Elements tres discrets (tagline footer) |
| `text-white/25` | Copyright footer |
| `bg-black/60` | Backdrop modal |
| `bg-black/5` | Zones upload, recap cards |
| `bg-white/10` | Boutons glass (Services) |
| `bg-white/20` | Boutons glass hover |
| `bg-white/90` | Badges semi-opaques (BeforeAfter labels) |
| `bg-white/95` | Header backdrop blur |
| `bg-foreground/90` | Hover boutons secondary |
| `border-white/10` | Bordures sections sombres |
| `border-white/20` | Bordures boutons glass |
| `border-black/10` | Bordures inputs |
| `border-black/20` | Bordures inputs hover |
| `border-red-400` | Bordures erreur |

### Gradients sur images

```css
/* Hero overlay */
bg-gradient-to-b from-black/30 via-black/10 to-black/40

/* BeforeAfter info overlay */
bg-gradient-to-t from-black/70 via-black/30 to-transparent

/* CTAFooter overlay */
bg-gradient-to-b from-black/50 via-black/40 to-black/60

/* MobileMenu image overlay */
bg-gradient-to-t from-black/60 via-black/30 to-transparent

/* QuoteCarousel overlay */
bg-gradient-to-t from-black/70 via-black/20 to-black/5

/* Projects marquee fades (bords) */
bg-gradient-to-r from-[#f7f7f7] to-transparent  /* gauche */
bg-gradient-to-l from-[#f7f7f7] to-transparent  /* droite */
```

### Filtre image

```css
.img-saturate {
  filter: saturate(1.1) contrast(1.05);
}
```

---

## 2. Typographie

### Police

**Geist Sans** (Google Font, chargee via `next/font/google`)

```tsx
import { Geist } from "next/font/google";
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
```

Appliquee via `font-family: var(--font-sans), system-ui, sans-serif`

### Echelle typographique (tokens CSS)

| Token | Taille | Line-height | Letter-spacing |
|-------|--------|-------------|----------------|
| `--text-display` | `4.5rem` (72px) | 1.05 | -0.03em |
| `--text-h1` | `3.5rem` (56px) | 1.1 | -0.025em |
| `--text-h2` | `2.5rem` (40px) | 1.15 | -0.02em |
| `--text-h3` | `1.5rem` (24px) | 1.3 | -0.01em |
| `--text-body-lg` | `1.125rem` (18px) | 1.7 | — |
| `--text-body` | `1rem` (16px) | 1.7 | — |
| `--text-small` | `0.875rem` (14px) | 1.6 | — |
| `--text-caption` | `0.75rem` (12px) | 1.5 | 0.05em |

### Tailles par composant

**Hero**
- Label: `text-[0.8125rem] md:text-[0.875rem]`
- Headline: `text-[2.75rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5rem]` + `font-light leading-[1.1] tracking-tight`
- Stats: `text-[0.8125rem] lg:text-[1.0625rem]`

**Titres de section** (About, Projects, Testimonials, FAQ, Services)
- `text-[2.25rem] md:text-[3rem] lg:text-[3.5rem] font-light leading-[1.1] tracking-tight`

**Sous-titres de section**
- `text-[0.9375rem] leading-relaxed` (15px)

**Stats (About)**
- Valeur: `text-[2.5rem] md:text-[3rem] font-light leading-none tracking-tight`
- Label: `text-[0.875rem] text-foreground/60`

**Cartes projets**
- Titre: `text-[1rem] md:text-[1.125rem] font-semibold`
- Date: `text-[0.8125rem] text-foreground/50`

**Services (fond sombre)**
- Titre service: `text-[1.25rem] md:text-[1.5rem] lg:text-[1.75rem] font-medium text-white`
- Sous-titre: `text-[0.875rem] md:text-[0.9375rem] text-white/50`
- Stat: `text-[2rem] md:text-[2.5rem] font-light text-white leading-none tracking-tight`

**Temoignages**
- Citation: `text-[0.9375rem] text-foreground/80 leading-relaxed`
- Nom: `text-[0.875rem] font-semibold`
- Role: `text-[0.75rem] text-muted`

**FAQ**
- Question: `text-[0.9375rem] md:text-[1rem] font-medium leading-snug`
- Reponse: `text-[0.875rem] text-foreground/70 leading-relaxed`

**Header / Logo**
- Logo: `text-[1.375rem] md:text-[1.5rem] tracking-tight`
- "Atout": `font-semibold`
- "Travaux": `font-light italic`

**Footer (barre sombre)**
- Nom: `text-[1rem] md:text-[1.25rem]`
- Tagline: `text-[0.6875rem] md:text-[0.75rem] text-white/40`
- Titres: `text-[0.75rem] md:text-[0.8125rem] font-semibold`
- Liens: `text-[0.6875rem] md:text-[0.75rem] text-white/40`
- Copyright: `text-[0.65rem] md:text-[0.7rem] text-white/25`

**Formulaires (ContactModal, Quote)**
- Titre: `text-[1.75rem] md:text-[2rem] font-light leading-tight tracking-tight`
- Sous-titre: `text-[0.9375rem] text-muted`
- Label: `text-[0.875rem] font-medium`
- Input: `text-[0.9375rem]`
- Erreur: `text-red-500 text-[0.8125rem]`
- Checkbox: `text-[0.8125rem] text-muted leading-snug`

### Poids utilises

| Tailwind | Weight | Usage |
|----------|--------|-------|
| `font-light` | 300 | Titres principaux, headlines |
| (default) | 400 | Corps de texte |
| `font-medium` | 500 | Boutons, titres services, labels |
| `font-semibold` | 600 | Noms, petits titres, logo "Atout" |

---

## 3. Espacement

### Container

```
max-w-[1480px] mx-auto px-4 md:px-8 lg:px-12
```

### Padding sections

| Pattern | Valeur |
|---------|--------|
| Standard | `py-20 md:py-28` (5rem → 7rem) |
| Ample | `py-24 md:py-32` (6rem → 8rem) |
| Services (dark) | `py-16 md:py-24 px-6 md:px-10 lg:px-16` |
| Footer info bar | `py-8 md:py-12` |

### Gaps recurrents

| Contexte | Gap |
|----------|-----|
| Grille cartes | `gap-3` |
| Stats row | `gap-6 md:gap-8` |
| Champs formulaire | `gap-5` |
| Boutons cote a cote | `gap-3` ou `gap-4` |
| Heading ↔ contenu | `mb-12 md:mb-16` |

### Padding cartes (composant Card)

| Taille | Valeur |
|--------|--------|
| `sm` | `p-4 md:p-5` |
| `md` | `p-6 md:p-8` |
| `lg` | `p-8 md:p-10` |

---

## 4. Breakpoints

| Nom | Valeur | Usage principal |
|-----|--------|-----------------|
| `sm` | 640px | Petit ajustements (2 cols formulaire) |
| `md` | 810px | Tablette — 2 colonnes, tailles texte |
| `lg` | 1200px | Desktop — layouts multi-colonnes |
| `xl` | 1480px | Grand ecran (max-width container) |

Approche **mobile-first** : styles de base = mobile, puis `md:`, `lg:`, `xl:`.

---

## 5. Coins arrondis

| Token CSS | Valeur | Usage |
|-----------|--------|-------|
| `--radius-sm` | 8px | Inputs (`rounded-lg`) |
| `--radius-md` | 12px | Petites cartes (`rounded-xl`) |
| `--radius-lg` | 16px | Cartes principales (`rounded-2xl`) |
| `--radius-xl` | 24px | Sections dark, hero, modal |
| `--radius-pill` | 100px | Boutons, badges (`rounded-full`) |

| Element | Classe |
|---------|--------|
| Cartes | `rounded-2xl` |
| Cartes projets | `rounded-xl` |
| Boutons | `rounded-full` |
| Inputs | `rounded-lg` |
| Sections dark (Hero, Services) | `rounded-[20px] md:rounded-[24px]` |
| Modal | `rounded-2xl` |
| FAQ items | `rounded-md` |
| Expert notch (ferme) | `border-radius: 999px` |
| Expert notch (ouvert) | `border-radius: 16px` |

---

## 6. Ombres

Usage **minimal** — le design repose sur les contrastes de fond, pas les ombres.

| Element | Ombre |
|---------|-------|
| Modal | `shadow-2xl` |
| Expert notch (ouvert) | `0 8px 30px rgba(0,0,0,0.15)` |
| Toggle pill (actif) | `shadow-sm` |
| Cartes hover | Pas d'ombre — `hover:-translate-y-1` |

---

## 7. Animations

### Courbes d'easing

| Nom | Valeur | Usage |
|-----|--------|-------|
| **Principale** | `[0.25, 0.1, 0.25, 1]` | ScrollReveal, FAQ, Services, stagger |
| **Quote form** | `[0.25, 0.46, 0.45, 0.94]` | Steps, progress, carousel |
| **Modal/Menu** | `[0.32, 0.72, 0, 1]` | ContactModal, MobileMenu, close btn |
| **Blur reveal** | `[0.19, 1, 0.22, 1]` | Hero headline, CTAFooter heading |
| **Boutons text slide** | `cubic-bezier(0.19, 1, 0.22, 1)` | Hover sur tous les boutons |

### ScrollReveal (composant)

Parametres par defaut :
```
direction = "up"    delay = 0       duration = 0.7
distance = 40       once = true     viewportMargin = "-80px"
scale = false
```

Variantes :
```tsx
hidden: { opacity: 0, y: distance, scale?: 0.95 }
visible: { opacity: 1, y: 0, scale?: 1, transition: { duration, delay, ease: [0.25, 0.1, 0.25, 1] } }
```

### StaggerContainer / StaggerItem

```
StaggerContainer: stagger = 0.1, delay = 0, viewport = { once: true, margin: "-80px" }
StaggerItem:      distance = 30, duration = 0.6, ease = [0.25, 0.1, 0.25, 1]
```

Valeurs stagger utilisees :
- About bento grid: `stagger={0.08}`
- About stats: `stagger={0.1}`
- CTAFooter: `stagger={0.15}` + `delay={0.6}`

### Hero — Blur reveal caractere par caractere

```tsx
CHAR_STAGGER = 0.02     // delai entre chaque lettre
CHAR_DURATION = 0.35    // duree par caractere
BLUR_AMOUNT = "8px"     // flou initial

// Par caractere :
initial: { opacity: 0, filter: "blur(8px)" }
animate: { opacity: 1, filter: "blur(0px)" }
transition: { duration: 0.35, delay: base + i * 0.02, ease: [0.19, 1, 0.22, 1] }
```

### Hero — Container

```tsx
initial: { scale: 1.05, opacity: 0 }
animate: { scale: 1, opacity: 1 }
transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }
```

### Hero — Parallax

```tsx
imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
```

### Hero — Badges avatars hover

```
Overlap: -ml-[18px] md:-ml-[18px] lg:-ml-[22px]
Hover:   group-hover/badges:md:-ml-1.5
Transition: transition-[margin] duration-300 ease-out
```
> Note : `space-x` ne s'anime pas — toujours utiliser `margin-left` + `transition-[margin]`

### Services — Accordion

```tsx
// Panel expand
animate: { height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }
transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }

// Bouton + rotation
animate: { rotate: isOpen ? 45 : 0 }
transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }

// Entree items (stagger)
initial: { opacity: 0, y: 20 }
whileInView: { opacity: 1, y: 0 }
transition: { duration: 0.5, delay: index * 0.08, ease }
```

### BeforeAfter — Clip-path scroll

```tsx
// Avant se revele de gauche a droite via clip-path
beforeClipPath = useTransform(scrollYProgress, (v) => {
  const pct = Math.min(100, Math.max(0, (v / 0.35) * 100));
  return `inset(0 0 0 ${pct}%)`;   // avant = clip depuis la gauche
});

// Apres = inverse
afterClipPath = useTransform(scrollYProgress, (v) => {
  const pct = Math.min(100, Math.max(0, (v / 0.35) * 100));
  return `inset(0 ${100 - pct}% 0 0)`;  // apres = clip depuis la droite
});

// Parallax vertical
parallaxY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"])
```
> Important : utiliser un **function callback** pour `useTransform`, pas des array ranges (bug framer-motion avec l'opacite).

### BeforeAfter — Expert notch morph

```tsx
// Au hover, morph de pill → carte
width: expertOpen ? 260 : "fit-content"
borderRadius: expertOpen ? 16 : 999
backgroundColor: expertOpen ? "#fff" : "rgba(255,255,255,0.1)"
backdropFilter: expertOpen ? "none" : "blur(24px)"
boxShadow: expertOpen ? "0 8px 30px rgba(0,0,0,0.15)" : "none"
transition: "all 0.3s ease-out"
```

### FAQ — Entree CSS (pas framer-motion)

```css
@keyframes faq-fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

Applique inline pour le stagger :
```tsx
animation: `faq-fade-in 0.5s ${index * 0.08}s both cubic-bezier(0.25, 0.1, 0.25, 1)`
```
Declenche via `useInView(ref, { once: true, margin: "-80px" })` — utilise CSS keyframes pour eviter la re-animation quand le state change (ouverture accordion).

### FAQ — Accordion

```tsx
// Panel
initial: { height: 0, opacity: 0 }
animate: { height: "auto", opacity: 1 }
exit:    { height: 0, opacity: 0 }
transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }

// Chevron
animate: { rotate: isOpen ? 180 : 0 }
transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
```

### CTAFooter — Blur reveal

Meme composant `BlurReveal` que Hero, mais declenche via `useInView` au lieu de `initial/animate`.

### ContactModal

```tsx
// Backdrop
initial: { opacity: 0 }    animate: { opacity: 1 }    exit: { opacity: 0 }
transition: { duration: 0.3 }

// Panel
initial: { opacity: 0, y: 30 }    animate: { opacity: 1, y: 0 }    exit: { opacity: 0, y: 20 }
transition: { duration: 0.45, ease: [0.32, 0.72, 0, 1] }

// Close btn
initial: { opacity: 0, rotate: -90 }    animate: { opacity: 1, rotate: 0 }
transition: { duration: 0.3, delay: 0.25, ease: [0.32, 0.72, 0, 1] }

// Stagger contenu : heading 0.1 → subheading 0.18 → image 0.3 → contact 0.4 → form 0.2
```

### MobileMenu

```tsx
// Container
transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] }

// Image panel slide
initial: { x: "-100%", opacity: 0 }    animate: { x: 0, opacity: 1 }
transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] }

// Image Ken Burns
initial: { scale: 1.15 }    animate: { scale: 1 }
transition: { duration: 0.8, ease: [0.32, 0.72, 0, 1] }

// Close btn rotation
initial: { rotate: -90 }    animate: { rotate: 0 }    exit: { rotate: 90 }
transition: { duration: 0.3, delay: 0.2 }

// Nav links stagger
delay: 0.35 + i * 0.05
```

### Quote form

```tsx
// Step transition (AnimatePresence)
enter: (dir) => ({ y: dir > 0 ? 20 : -20, opacity: 0 })
center: { y: 0, opacity: 1 }
exit:  (dir) => ({ y: dir > 0 ? -20 : 20, opacity: 0 })
transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }

// Champs stagger
initial: { opacity: 0, y: 12 }    animate: { opacity: 1, y: 0 }
transition: { duration: 0.3, delay: 0.1 + index * 0.05 }

// Erreur shake
animate: { x: [0, -8, 8, -8, 8, -4, 4, 0] }
transition: { duration: 0.4 }

// Toggle pill (layoutId)
layoutId="clientType"
transition: { type: "spring", stiffness: 400, damping: 30 }

// Checkmark succes
initial: { scale: 0 }    animate: { scale: 1 }
transition: { type: "spring", stiffness: 200, damping: 15, delay: 0.1 }
```

### Carousel quote (images auto-rotate)

```tsx
// Image
initial: { opacity: 0, scale: 1.05 }    animate: { opacity: 1, scale: 1 }
transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }

// Contenu
initial: { opacity: 0, y: 20 }    animate: { opacity: 1, y: 0 }
transition: { duration: 0.3, delay: 0.15 }

// Timer auto-rotation : 6000ms

// Dots
width: active ? 32 : 8
backgroundColor: active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)"
transition: "all 0.3s"
```

### Marquee (Projects partners)

```css
@keyframes marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.animate-marquee { animation: marquee 20s linear infinite; }
```

---

## 8. Boutons

### Variantes

| Variante | Classes |
|----------|---------|
| `primary` | `bg-accent text-white hover:bg-accent-hover` |
| `secondary` | `bg-foreground text-white hover:bg-foreground/90` |
| `white` | `bg-white text-foreground hover:bg-white/90` |
| `glass` | `bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20` |
| `outline` | `bg-transparent text-white border border-white/30 hover:bg-white/10` |

### Tailles

| Taille | Classes |
|--------|---------|
| `sm` | `px-6 py-2.5 text-[0.875rem]` |
| `md` | `px-7 py-3 text-[0.9375rem]` |
| `lg` | `px-8 py-3.5 text-[0.9375rem]` |

### Base commune

```
group inline-flex items-center justify-center font-medium rounded-full
overflow-hidden transition-colors duration-200 cursor-pointer
```

### Effet hover text slide-up

Tous les boutons utilisent le composant `TextSlide` :

```tsx
<span className="relative block overflow-hidden">
  {/* Texte visible */}
  <span className="block transition-transform duration-400 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full">
    {children}
  </span>
  {/* Texte clone (dessous) */}
  <span className="absolute top-full left-0 block transition-transform duration-400 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full" aria-hidden="true">
    {children}
  </span>
</span>
```

**Easing** : `cubic-bezier(0.19, 1, 0.22, 1)` — **Duree** : `400ms`

### Etats

- **Disabled** : `opacity-70` ou `opacity-40` + `cursor-not-allowed`
- **Loading** : Spinner a la place du texte + `cursor-not-allowed`
- **Active (tap)** : `whileTap={{ scale: 0.98 }}`

---

## 9. Cartes

### Card (composant generique)

```
bg-white rounded-lg border border-border
hover (optionnel): transition-transform duration-300 hover:-translate-y-1
```

### Cartes par section

| Section | Style |
|---------|-------|
| About bento (temoignage) | `bg-white rounded-2xl p-6 md:p-7` |
| About bento (feature) | `bg-white rounded-2xl p-6` |
| About bento (image) | `rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-full` |
| Projets carousel | `bg-white rounded-xl` — image: `rounded-xl overflow-hidden m-2 md:m-2.5 aspect-[16/10]` |
| Temoignages | `bg-white rounded-2xl p-7 md:p-8 h-full` |
| FAQ item | `bg-white rounded-md border border-black/10` |
| Services | Pas de carte — lignes `border-t border-white/10 last:border-b` |

---

## 10. Images

### Ratios

| Contexte | Ratio |
|----------|-------|
| Hero | Plein ecran (`h-screen min-h-[600px]`) |
| About bento | `aspect-[4/3]` mobile, `lg:aspect-auto lg:h-full` |
| Projets | `aspect-[16/10]` |
| Avatars | `w-10 h-10 rounded-full` |
| BeforeAfter | Plein ecran sticky (`h-screen` dans `h-[250vh]`) |
| CTAFooter | `h-[70vh] md:h-[85vh] min-h-[430px] md:min-h-[500px]` |
| FAQ image | `min-h-[500px] h-full` |
| Services thumbnail | `w-24 h-16 md:w-28 md:h-[4.5rem]` |

### Proprietes standard

- `fill` pour les images container-sized
- `object-cover` sur toutes les images
- `priority` sur l'image hero
- `sizes` optimise par usage
- `unoptimized` pour les blob URLs (previews fichiers)

### Overlays sur images

Toujours un `<div className="absolute inset-0 ...">` par-dessus l'image avec un gradient. Voir la section gradients au-dessus pour les valeurs exactes.

---

## 11. Grilles

### About — Bento grid

```
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3
// Temoignage: lg:row-span-2
```

### Stats

```
grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8
```

### Services (dans section dark)

```
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3
```

### Temoignages

```
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3
```

### FAQ

```
grid grid-cols-1 lg:grid-cols-2 gap-3
```

### Quote form (StepIdentity)

```
grid grid-cols-1 sm:grid-cols-2 gap-4
```

### Quote form (StepProject)

```
grid grid-cols-2 gap-3
```

---

## 12. Layout patterns

### Two-column heading + contenu

```
flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8
```

### Centre (Hero, Success)

```
flex flex-col items-center justify-center text-center
```

### Section IDs

| ID | Section |
|----|---------|
| `#accueil` | Hero |
| `#apropos` | About |
| `#realisations` | Projects |
| `#services` | Services |
| `#temoignages` | Testimonials |
| `#contact` | CTAFooter |

### Z-index

| Layer | Z-index |
|-------|---------|
| Header | `z-40` |
| MobileMenu | `z-50` |
| ContactModal | `z-50` |
| BeforeAfter | `isolate` (cree un stacking context) |

### `data-header-dark`

Attribut HTML sur les sections a fond sombre. Le Header detecte s'il est au-dessus d'une de ces sections pour passer en texte blanc. Utilise sur : **Services, BeforeAfter, CTAFooter**.

---

## 13. Header

### Structure

```
fixed top-0 left-0 right-0 z-40
hauteur: h-[72px] md:h-[80px]
```

### Detection dark mode

Scroll listener → parcourt les elements `[data-header-dark]` → si `getBoundingClientRect().top <= 80 && bottom >= 80` → `isOverDark = true` → texte blanc.

### Backdrop

```tsx
isScrolled && !isOverDark
  ? "bg-background/95 backdrop-blur-md"  // fond flou
  : "bg-transparent"                       // transparent
```

Transition : `transition-all duration-300`

### Logo

```
"Atout" : font-semibold
"Travaux" : font-light italic ml-0.5
```

---

## 14. Sections specifiques

### BeforeAfter

- Section : `isolate h-[250vh]` — inner sticky `top-0 h-screen`
- Padding inner : `p-2.5 md:p-3`
- Rounded : `rounded-[20px] md:rounded-[24px]`
- Before = couche du dessus (clippe), After = couche de base
- Labels : position absolue, `top-24 md:top-28`, droite (Avant) ou gauche (Apres)
- Avant badge : `bg-black/40 backdrop-blur-md text-white rounded-full px-4 py-1.5`
- Apres badge : `bg-white/90 backdrop-blur-md text-foreground rounded-full px-4 py-1.5`

### CTAFooter

- Section CTA : `h-[70vh] md:h-[85vh]` avec image de fond + gradient overlay
- Barre footer : `bg-foreground` (sombre), texte blanc
- Pas de `position: fixed/sticky` (evite le tinting status bar iOS Safari)

### Projects — Carousel horizontal

- Section hauteur = `scrollRange + viewportH`
- Sticky container : `position: sticky; top: 0; height: 100vh`
- `x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange])`
- Marquee partenaires : `animation: marquee 20s linear infinite`
- Fades lateraux avec gradients

---

## 15. Formulaires

### Input standard

```
w-full px-4 py-3 bg-white rounded-lg border border-black/10
text-[0.9375rem] text-foreground placeholder:text-muted/40
outline-none focus:border-foreground/30 transition-colors
```

### Textarea

Meme style que input + `resize-none rows={4}`

### Erreur

- Bordure : `border-red-400 focus:border-red-400`
- Message : `text-red-500 text-[0.8125rem] mt-1.5`
- Animation shake : `x: [0, -8, 8, -8, 8, -4, 4, 0]` sur `0.4s`

### Label

```
block text-[0.875rem] font-medium text-foreground mb-2
```

### Texte optionnel

```tsx
<span className="text-muted font-normal">(optionnel)</span>
```

### Toggle / Segmented control

```
bg-black/5 rounded-lg p-1
pill active: bg-white rounded-md shadow-sm (layoutId animation spring)
```

### Checkbox custom

- Case: `w-[18px] h-[18px] rounded border-2`
- Coche: `bg-foreground border-foreground` (checked)
- Erreur: `border-red-400`
- Hover: `group-hover:border-black/40`

### Zone upload fichiers

```
w-full py-6 px-4 border-2 border-dashed rounded-xl
normal: border-black/10 bg-white hover:border-black/20
dragover: border-accent bg-accent/5
```

Preview fichier : `w-16 h-16 rounded-lg object-cover`
Bouton supprimer : `w-5 h-5 bg-foreground text-white rounded-full opacity-0 group-hover:opacity-100`

---

## 16. Modal (ContactModal)

### Structure

```
fixed inset-0 z-50 flex items-center justify-center p-3 md:p-5
Panel: bg-white rounded-2xl shadow-2xl
Taille: w-[calc(100vw-24px)] md:w-[calc(100vw-40px)] h-[calc(100vh-24px)] md:h-[calc(100vh-40px)]
Layout: flex flex-col lg:flex-row — chaque cote lg:w-1/2
```

- Gauche : titre + image + infos contact (`overflow-y-auto`)
- Droite : formulaire (`bg-background/50 overflow-y-auto`)
- Fermeture : Escape, click backdrop, bouton X

---

## 17. Smooth scroll (Lenis)

```tsx
duration: isMobile ? 2.4 : 1.6
easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
touchMultiplier: isMobile ? 1.0 : 1.5
```

Mobile = `window.matchMedia("(max-width: 810px)")`.

Se met en pause quand `body.style.overflow === "hidden"` (modal ouverte).

> Ne jamais ajouter `scroll-behavior: smooth` en CSS quand Lenis est actif.

---

## 18. Utilitaires CSS

### Scrollbar cachee

```css
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar { display: none; }
```

### Antialiasing

```
<body className="antialiased">
```

### Backdrop blur

| Contexte | Classe |
|----------|--------|
| Header scroll | `backdrop-blur-md` |
| Boutons glass | `backdrop-blur-sm` |
| Badges overlays | `backdrop-blur-md` |
| Expert notch (ferme) | `blur(24px)` inline |
| Modal backdrop | Pas de blur (juste `bg-black/60`) |

### Performance

`will-change-transform` sur les elements avec parallax ou carousel horizontal.
