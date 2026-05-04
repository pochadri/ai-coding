# Design System — AI Coding Tools

The editorial source of truth. Read this before making any visual or UI decision. Do not deviate without explicit approval.

## Product Context
- **What this is:** A practitioner's guide to AI coding tools, two years of daily use, opinionated peer-to-peer voice.
- **Who it's for:** Senior engineers and AI coding practitioners who notice typography.
- **Space/industry:** Independent technical publishing.
- **Project type:** Editorial publication (VitePress site, public on GitHub Pages).
- **Memorable thing:** "Practitioner ships daily, has opinions" — slightly engineered face, monospace metadata, technical credibility. The face says: someone who codes for a living typeset this on purpose.

## Aesthetic Direction
- **Direction:** Developer-docs surfaces + editorial-publication character on top. Body and surfaces look like Linear/Vercel/Stripe docs (clean neutral, sans body, generous whitespace). Editorial character lives in the hero (Fraunces), masthead (mono small-caps), silcrow `§` ornament, and ink-red accent. Hybrid by design.
- **Decoration level:** Intentional. Single accent color used like ink. No textures, no patterns, no decorative blobs.
- **Mood:** Confident technical reference. Engineered metadata. The face says: someone who ships code typeset this.
- **Reference points:** Linear docs and Vercel docs (surface palette, sans body, neutral grayscale). gwern.net (engineered metadata density). A List Apart (editorial masthead pattern). Deliberately NOT Stratechery (executive-publication aesthetic — wrong audience).

## Typography

Hybrid stack: editorial display, developer-readable body. Loaded via Google Fonts (`display=swap`) in `.vitepress/config.mjs`.

- **Display / Hero only:** **Fraunces** — variable serif, axes `opsz` (9..144), `wght` (400..700), `SOFT` (0..100), `WONK` (0..1). Used for the homepage hero title and article h1 only. Display weight 700 with `opsz: 144, SOFT: 30, WONK: 0`. The single big "this was designed" moment per page.
- **Body, h2, h3, ledes, UI:** **Geist** — variable sans, weights 400..700. Used as the base font (`--vp-font-family-base`). Reads as developer-native (Linear / Vercel / Stripe docs face). Replaces the previous Source Serif 4 body — serif body was reading as literary essay rather than practitioner notes.
- **Metadata / Kickers / Labels:** **IBM Plex Mono** — weights 500/600 with italics. Used for masthead labels, datelines, folder numbers (`§ 01`), kickers, shortcut labels, voices header, signature footer, breadcrumbs. Always rendered with `text-transform: uppercase` and wide `letter-spacing` (0.14em–0.18em).
- **Pull quotes (decorative only):** Fraunces — homepage `.home-pub__pull blockquote` (with red `§` ornament) and `.home-pub__voices li` italic. Single decorative serif moments, not body.
- **Code:** **JetBrains Mono** — variable, weights 400..700. Used for inline code, fenced blocks.
- **Anti-blacklist:** No Inter, Roboto, Arial, Helvetica, Montserrat, Poppins, Space Grotesk, system-ui as primary.

**Type scale:**
- Hero display (homepage): `clamp(2.75rem, 7vw, 4.75rem)`, weight 700, line-height 1.02, letter-spacing -0.03em (Fraunces)
- Article h1: `clamp(2.1rem, 4.4vw, 2.8rem)`, weight 700, line-height 1.05 (Fraunces)
- Article h2: 1.55rem, weight 700, line-height 1.25, with a 32×3px ink-red bar above (`::before`) (Geist)
- Article h3: 1.2rem, weight 600 (Geist)
- Homepage lede: `clamp(1.1rem, 1.8vw, 1.3rem)`, regular, muted color (Geist)
- Article lede: 1.15rem, regular, muted color, hairline beneath (Geist)
- Body: 16.5px, line-height 1.65 (Geist)
- Mono metadata: 0.74–0.85rem, weight 600, uppercase, letter-spacing 0.14–0.18em (IBM Plex Mono)

## Color

Warm-ink palette. Color is used like ink — sparingly, meaningfully. Never as decoration.

### Light mode (neutral surfaces, Linear/Vercel-docs face)
| Token | Hex | Use |
|-------|-----|-----|
| Background | `#FFFFFF` | Pure white |
| Background alt | `#FAFAFA` | zinc-50, slight elevation |
| Background soft | `#F4F4F5` | zinc-100, cards, callouts, code blocks |
| Body text | `#18181B` | zinc-900, near-black neutral |
| Muted text | `#71717A` | zinc-500 |
| Subtle text | `#A1A1AA` | zinc-400 |
| Divider | `#E4E4E7` | zinc-200, hairlines |
| Gutter | `#F4F4F5` | zinc-100, subtle separators |
| **Accent (ink red)** | **`#9F2D24`** | Kickers, monogram, silcrow, folder numbers, link underlines, signature rule. NEVER as button fill. |
| Accent hover | `#B83C30` | Hover state |

### Dark mode (off-black neutral, Vercel-docs face)
| Token | Hex | Use |
|-------|-----|-----|
| Background | `#0A0A0A` | Off-black, neutral |
| Background alt | `#18181B` | zinc-900, slight elevation |
| Background soft | `#1F1F23` | Cards, callouts, code blocks |
| Body text | `#FAFAFA` | zinc-50 |
| Muted text | `#A1A1AA` | zinc-400 |
| Subtle text | `#71717A` | zinc-500 |
| Divider | `#27272A` | zinc-800, hairlines |
| **Accent (lifted)** | **`#E25647`** | Lifted for contrast on dark; same usage rules as light |

**Semantic colors:** inherited from VitePress defaults; overrides applied only where needed.

**Mermaid:** uses warm-ink palette via `themeVariables` in `config.mjs`.

## Spacing
- **Base unit:** 4px
- **Density:** comfortable (not tight, not airy — magazine-like)
- **Scale:** 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96

## Layout
- **Approach:** Single-column editorial. Asymmetric for the homepage front-page; traditional centered for content pages.
- **Content max-width:** 700px (`--vp-doc-content-max-width`) — sweet reading measure for serif body
- **Layout max-width:** 1440px (`--vp-layout-max-width`)
- **Border radius:** sm 4px / md 8px / lg 12px / pill 999px (used on buttons only). No bubbly radii on cards.

## Motion
- **Approach:** Minimal-functional. Editorial publications don't bounce.
- **Easing:** `ease-out` for color/border, `ease` for hovers
- **Duration:** 100–150ms for hovers, 250ms max for state changes
- **No** scroll-jack, parallax, decorative entrance animations, or transforms beyond `translateY(-1px)` on cards

## Three Risks (deliberate departures)
1. **Monospace everywhere in metadata.** IBM Plex Mono small-caps for masthead labels, datelines, folder numbers (`§ 01`), kickers, signature, breadcrumbs. Practitioner credibility via typography. Cost: feels slightly engineered; readers expecting strict magazine voice may find it cold. Worth it for this audience.
2. **Ink red `#9F2D24` as accent.** Newspaper-ink connotation, committed accent. Used ONLY for kickers, link underlines, monogram fill, silcrow `§`, folder numbers, signature rule. NEVER as button fill — buttons use ink-black `#1A1614`. Tames the aggression.
3. **Hybrid type system: serif hero + sans body.** Editorial bones (Fraunces hero, mono metadata, silcrow ornament, ink-red accent) signal "designed on purpose" without committing to literary-magazine body type. Body in Geist sans means everything you actually read for content reads as developer documentation, not magazine essay. The publication character is bolted on top via masthead, hero, and ornaments — not embedded in the body type.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-05-04 | Replaced forest green palette with warm-ink (`#9F2D24` ink red on `#FAF7F2` paper) | Forest green read as generic startup-sustainability brand; ink red commits to publication framing. |
| 2026-05-04 | Replaced `system-ui` body with Source Serif 4 | `system-ui` was the "I gave up on typography" tell. Long-form reading is the product; serif body is table stakes for editorial. |
| 2026-05-04 | Replaced Iowan Old Style display stack with Fraunces (variable) | Iowan is fine but generic; Fraunces is distinctive, has optical-size and SOFT/WONK axes, more "engineered" feel. |
| 2026-05-04 | Added IBM Plex Mono for all metadata classes | Practitioner-credibility risk; signals "typeset by someone who ships code." 2026 trend: mono breaking out of code into editorial branding. |
| 2026-05-04 | Folder numbers `01` → `§ 01` in IBM Plex Mono ink-red | Doubles down on engineered metadata; the silcrow ties to the section-divider treatment. |
| 2026-05-04 | Brand button changed from ink-red fill to ink-black fill | Red reserved for kickers/links/ornament; ink-black fill keeps red from feeling aggressive. |
| 2026-05-04 | Content max-width tightened 760 → 700px | Sweet reading measure for 17px serif body. |
| 2026-05-04 | Drop cap on `h1 + p + p::first-letter` | Editorial publication signal. Only fires on content pages with lede paragraphs. |
| 2026-05-04 | Body Source Serif 4 → Geist; lede italic-serif → regular sans; drop cap removed; h2 Fraunces → Geist | Initial pass overshot toward literary-magazine. Audience is engineers; serif body + italic ledes + drop caps were the smoking guns reading as "essay quarterly" rather than "practitioner notes." Hybrid keeps editorial bones (masthead, silcrow, ink-red accent, Fraunces hero only) but body type now reads as developer documentation. |
| 2026-05-04 | Surfaces warm cream → neutral zinc (#FFFFFF / #FAFAFA / #F4F4F5 light; #0A0A0A / #18181B / #1F1F23 dark) | Warm paper `#FAF7F2` was the surface-side editorial tell. Linear / Vercel / Stripe docs use cool-neutral or pure white — that's the dev-docs face. Editorial character now lives ONLY in the hero typography, masthead mono caps, silcrow ornament, and ink-red accent — not in the surface tint. |
