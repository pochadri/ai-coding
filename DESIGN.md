# Design System — AI Coding Tools

The editorial source of truth. Read this before making any visual or UI decision. Do not deviate without explicit approval.

## Product Context
- **What this is:** A practitioner's guide to AI coding tools, two years of daily use, opinionated peer-to-peer voice.
- **Who it's for:** Senior engineers and AI coding practitioners who notice typography.
- **Space/industry:** Independent technical publishing.
- **Project type:** Editorial publication (VitePress site, public on GitHub Pages).
- **Memorable thing:** "Practitioner ships daily, has opinions" — slightly engineered face, monospace metadata, technical credibility. The face says: someone who codes for a living typeset this on purpose.

## Aesthetic Direction
- **Direction:** Editorial-magazine bones + engineered/industrial metadata. *Old-money publication crossed with practitioner notes.*
- **Decoration level:** Intentional. Subtle paper warmth on light backgrounds, warm dark on dark. No textures, no patterns, no decorative blobs.
- **Mood:** Confident. Ink-on-paper restraint. Engineered metadata. Not a SaaS landing page, not a startup blog template.
- **Reference points:** gwern.net (engineered density), A List Apart (editorial masthead), classic O'Reilly print interiors. Deliberately departs from Stratechery-style executive aesthetic — wrong audience.

## Typography

Loaded via Google Fonts (`display=swap`) in `.vitepress/config.mjs`.

- **Display / Hero:** **Fraunces** — variable serif, axes `opsz` (9..144), `wght` (400..700), `SOFT` (0..100), `WONK` (0..1). Used for hero titles, h1, h2, h3, lede paragraphs, pull quotes. Display weight 700 with `opsz: 144, SOFT: 30, WONK: 0` for editorial display.
- **Body:** **Source Serif 4** — variable serif, axes `opsz` (8..60), `wght` (400..700). Used for long-form essay body, lede paragraphs (italic), and as the base font (`--vp-font-family-base`).
- **Metadata / Kickers / Labels:** **IBM Plex Mono** — weights 500/600 with italics. Used for masthead labels, datelines, folder numbers (`§ 01`), kickers, shortcut labels, voices header, signature footer, breadcrumbs. Always rendered with `text-transform: uppercase` and wide `letter-spacing` (0.14em–0.18em).
- **Code:** **JetBrains Mono** — variable, weights 400..700. Used for inline code, fenced blocks.
- **Anti-blacklist:** No Inter, Roboto, Arial, Helvetica, Montserrat, Poppins, Space Grotesk, system-ui as primary. The previous `system-ui` body was the "I gave up on typography" tell — replaced.

**Type scale:**
- Hero display (homepage): `clamp(2.75rem, 7vw, 4.75rem)`, weight 700, line-height 1.02, letter-spacing -0.03em
- Article h1: `clamp(2.1rem, 4.4vw, 2.8rem)`, weight 700, line-height 1.05
- Article h2: 1.6rem, weight 700, with a 32×3px ink-red bar above (`::before`)
- Article h3: 1.2rem, weight 600
- Lede: `clamp(1.2rem, 2.2vw, 1.55rem)`, italic, opsz 36
- Body: 17px (`--vp-doc` base), line-height 1.7
- Mono metadata: 0.74–0.85rem, weight 600, uppercase, letter-spacing 0.14–0.18em
- Drop cap (article body opener): 3.6em, float left, opsz 144

## Color

Warm-ink palette. Color is used like ink — sparingly, meaningfully. Never as decoration.

### Light mode
| Token | Hex | Use |
|-------|-----|-----|
| Background | `#FAF7F2` | Warm paper, ~5% off pure white |
| Background alt | `#F4EFE8` | Slight elevation |
| Background soft | `#F1ECE3` | Cards, callouts, code blocks |
| Body text | `#1A1614` | Warm near-black |
| Muted text | `#6B6359` | Warm gray |
| Subtle text | `#928979` | Even more muted |
| Divider | `#E5DED2` | Hairlines |
| Gutter | `#EFE9DC` | Subtle separators |
| **Accent (ink red)** | **`#9F2D24`** | Kickers, monogram, silcrow, folder numbers, link underlines, signature rule. NEVER as button fill. |
| Accent hover | `#B83C30` | Hover state |

### Dark mode
| Token | Hex | Use |
|-------|-----|-----|
| Background | `#15110E` | Warm dark (not flat black) |
| Background alt | `#1B1714` | Slight elevation |
| Background soft | `#1F1A16` | Cards, callouts, code blocks |
| Body text | `#E8E2D9` | Warm off-white |
| Muted text | `#928979` | Warm gray |
| Divider | `#2D2723` | Hairlines |
| **Accent (lifted)** | **`#D9614F`** | Lighter for contrast on dark; same usage rules as light |

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
3. **Drop cap on essay body openings.** `.vp-doc h1 + p + p::first-letter` — first letter of the first body paragraph after the lede. Confirms publication framing instantly. Only fires when an essay has a lede + body, never on the homepage.

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
