# CLAUDE.md

## Design System

Always read `DESIGN.md` before making any visual or UI decision. Fonts, colors, spacing, layout, and aesthetic direction are defined there. Do not deviate without explicit approval.

The brand accent is **ink red `#9F2D24`** (light) / `#D9614F` (dark) — used only for kickers, links, monogram, silcrow `§`, folder numbers, and signature rule. **Never as button fill** — buttons use ink-black `#1A1614`.

Fonts (loaded via Google Fonts in `.vitepress/config.mjs`): **Fraunces** (hero + h1 only, variable serif), **Geist** (body + h2/h3 + ledes + UI, variable sans), **IBM Plex Mono** (metadata small-caps), **JetBrains Mono** (code). Body is sans, not serif — the audience is engineers, not literary readers. Editorial character lives in the hero, masthead, and silcrow ornament, not in the body type.

## Commit Conventions

Do not append `Co-Authored-By: Claude` trailers to commits in this repo.
