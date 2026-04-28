---
title: The Skills Ecosystem
summary: The skill libraries I think are worth knowing, methodology systems, official Anthropic, vendor skills, security skills, personal collections, community catalogs.
tags: [skills, gstack, superpowers, anthropic, vendor-skills, mongodb, supabase, vercel, cloudflare, hashicorp, livekit, trail-of-bits, sentry, matt-pocock]
related:
  - ./what-are-skills.md
  - ./choosing-skills.md
  - ./quality-and-anti-patterns.md
last_updated: 2026-04-25
---

# The Skills Ecosystem

The skills ecosystem now has six rough categories, and you'll get the most leverage if you understand which is which: **methodology systems** that impose a workflow, **Anthropic's official skills** that ship with Claude, **vendor skills** for specific products, **security skills** for audit and review, **personal/influencer skills** that codify one developer's opinions, and **community catalogs** that aggregate hundreds.

This page is my opinionated tour. The pages in this folder cover "which one should *I* install" and "how do I write one"; the references page at the root has the canonical URL list.

> ⚠️ Star counts and install numbers move weekly. Numbers below were verified in April 2026 and will drift.

---

## 1. Methodology systems

These aren't just collections, they impose a *way of working*. Adopt one, and you adopt its philosophy. Don't adopt both at once; they have opposite philosophies and you'll get instruction conflicts.

### gstack — Garry Tan
- **[github.com/garrytan/gstack](https://github.com/garrytan/gstack)** · ~66K stars · MIT
- Garry Tan's (YC president) opinionated kit of ~25 slash-command "skills" organized by *role*: CEO (`office-hours`, `plan-ceo-review`), Designer (`design-consultation`, `design-shotgun`, `design-html`, `design-review`), Eng Manager (`plan-eng-review`), Release (`ship`, `land-and-deploy`, `auto-ship`), Doc (`document-release`), QA (`qa`, `browse`, `canary`), Security (`cso`, `careful`, `freeze`, `guard`), Code Review (`review`, `codex`), Debug (`investigate`), Engineering (`benchmark`, `health`, `retro`, `devex-review`, `plan-verify`), Plan (`autoplan`), Context (`context-save`, `context-restore`, `learn`).
- **Philosophy:** "AI shouldn't stay in one generic mode, it needs explicit cognitive gears." Different phases of work get different modes.
- **My take:** I tried gstack for two weeks and kept three things: `design-shotgun`, `ship`, and the security `freeze`/`guard` pattern. The rest had too much slash-command friction for my workflow. But Tan claims 10K LOC and 100 PRs/week sustained over a 50-day window using this setup, so it clearly works for some people. If you're a solo founder doing rapid full-stack web work, try it before dismissing it. If you're maintaining a 200K-LOC backend, you're not the audience.
- **Format note:** Uses Claude Code custom slash commands rather than the SKILL.md open standard. Not portable across tools.

### Superpowers — Jesse Vincent (obra)
- **[github.com/obra/superpowers](https://github.com/obra/superpowers)** · MIT · [plugin page](https://claude.com/plugins/superpowers)
- Composable skills that force the agent into senior-engineer practices: `brainstorming` (Q&A before code), `writing-plans` (decompose into 2–5 min tasks with file paths and verification steps), `using-git-worktrees`, `subagent-driven-development` (fresh subagent per task with two-stage review), `test-driven-development` (strict RED-GREEN-REFACTOR with failing-test-first commits), `writing-skills` (TDD-for-skills: pressure-test new skills against subagents).
- **Philosophy:** True red/green TDD, YAGNI, DRY, plan-then-execute, subagent isolation. Uses psychological framing to get models to comply.
- **My take:** I use the planning and subagent skills daily. I do not use the strict TDD enforcement, because I'm not a strict TDD person and forcing the agent into a discipline I don't follow myself produces friction without quality gain. Pick the pieces that match how you actually work. Multi-tool support (Claude Code, Cursor, Codex CLI, OpenCode, Gemini CLI, Qwen Code, Goose, Auggie) is a real advantage over gstack.

### BMAD-METHOD — Brian Madison + community
- **[github.com/bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD)** · ~45.7K stars · check current license
- **What it is:** A heavyweight "Agile AI" framework. Installs a roster of named agent personas (PM, Architect, Developer, Scrum Master, UX) plus 34+ workflows that walk a project from brainstorming → architecture → epics → user stories → implementation. `npx bmad-method install` (Node 20+, Python 3.10+, uv required) and you invoke `@pm`, `@architect`, `@dev` etc. Artifacts land under `_bmad/`.
- **Distinctive bet:** Documentation-as-source-of-truth (code is downstream of PRDs and architecture docs). Embraces ceremony rather than hiding it. Vertical modules, game dev (BMGD), test architecture (TEA), creative, are unmatched in this space.
- **Best fit:** Teams of 3–20 building real products with stakeholders, where PRDs and architecture docs have value beyond just driving the agent. If you already think in epics and stories, BMAD will feel native. If you don't, it'll feel like overhead.
- **Honest cons:** Steep learning curve (12–19 agents and dozens of workflows). High ceremony, solo hackers will hate it. [Issue #1332](https://github.com/bmad-code-org/BMAD-METHOD/issues/1332) reports the code-review workflow forcing a minimum of 3 issues per story even when code is clean. License field on GitHub shows NOASSERTION while the README claims MIT, verify before commercial use.
- **My take:** It's the canonical heavyweight. If you're a CTO at a 50-person product org and "agile AI workflows" is a board-level ask, BMAD is probably the right answer and the only system in this space designed for that altitude. For solo work, look at gstack or Compound instead.

### Compound Engineering — Every Inc.
- **[github.com/EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin)** · ~15.6K stars · MIT
- **What it is:** An official Claude Code plugin (also Codex/Cursor) that operationalizes the "compound engineering" practice, front-loading planning and review so each unit of work makes the next one easier. Install via `/plugin`, run `/ce-setup`, then work the loop: `/ce-brainstorm` → `/ce-plan` → `/ce-work` → `/ce-code-review` (parallel, ~12 subagent perspectives) → `/ce-compound` (codifies learnings into reusable docs).
- **Distinctive bet:** **Learning capture as a discrete workflow step.** This is the most genuinely novel idea in the methodology space, not "do TDD" or "follow agile," but "after every unit of work, write down what you learned in a form the agent can reuse." Built and used in production by Every's Cora team.
- **Best fit:** Mid-to-senior solo or small-team (1–5) engineers already on Claude Code who want a tighter loop than gstack's broader role-based system, and who'll get value from learning capture across many work cycles.
- **Honest cons:** [Will Larson predicts](https://lethain.com/everyinc-compound-engineering/) these practices will get absorbed into the Claude Code and Cursor harnesses over the next few months, adopting the plugin may mean adopting something native plan-mode subsumes. The "few commands" abstraction hides 36 skills + 51 agents under the hood. Commercial backer means future direction is at Every's editorial discretion. Compounding payoff is real but slow, early ROI is muted vs. GSD/Superpowers' immediate gratification.
- **My take:** The most intellectually distinctive of the new entrants and the one I'd most recommend trying, but do it with eyes open about the obsolescence risk. The *pattern* is what matters; you can implement it manually if the plugin gets absorbed.

### How they compare

| | gstack | Superpowers | BMAD-METHOD | Compound Engineering | GSD |
|---|---|---|---|---|---|
| Workflow style | Role-based modes | Process pipeline | Org-chart with ceremonies | Plan/work/review/compound loop | Meta-prompting + spec-driven, light ceremony |
| Velocity | Speed-first | Rigor-first | Ceremony-first | Loop-tightening | Speed-first with quality gates |
| Best for | Solo full-stack (founder mode) | Backend / libraries | Teams 3+, product work, PRD-driven | Mid/senior solo, Claude Code, learning-capture-first | Solo / small teams who want results without enterprise theater |
| Format | Slash commands (Claude Code only) | SKILL.md (portable) | Agent personas + workflows | Plugin (Claude Code + Codex + Cursor) | npm installer; supports 15+ runtimes (Claude Code, Cursor, Codex, OpenCode, Windsurf, Copilot, Gemini, Cline, etc.) |
| Distinctive bet | Cognitive gears / role personas | Force senior-engineer practices | Documentation-as-truth | Learning capture as primitive | Anti-ceremony, "context engineering as the product" |
| Stars (Apr 2026) | ~66K | ~93K | ~46K | ~16K | ~57K |

You can mix pieces — I do, but **pick one primary methodology**. Two opinionated systems disagreeing is worse than either alone.

#### Two things worth knowing about GSD

[GSD](https://github.com/gsd-build/get-shit-done) is MIT-licensed, actively maintained (daily commits as of April 2026), and the most portable of the methodology systems (15+ runtimes — Claude Code, Cursor, Codex, OpenCode, Windsurf, Copilot, Gemini, Cline, etc.). It's a legitimate primary choice for solo / small-team work where you want a fast spec-driven loop without BMAD's ceremony.

Two things to know, for most developers they're trivia, but they matter in narrow contexts:

1. **A `$GSD` Solana token sits in the README header.** The OSS code is unaffected, you don't hold or transact with the token to use the tool, license is MIT, the npm package keeps working if the token goes to zero. **Matters if:** your company runs a procurement/legal review on dependencies and has a no-crypto-adjacent policy. Otherwise it's mostly trivia.
2. **A "Welcome Back" banner references a prior Anthropic ToS event.** GSD survived a vendor-policy event and shipped a re-import flow, that's resilience, not fragility. **Matters if:** you're betting your team's daily workflow on a single AI vendor. Largely mitigated by GSD's 15+ runtime support, if one vendor squeezes, you can move.

If neither concern fits your context, install it and judge by your usage. If they do, **Superpowers** is the closest same-job alternative and what this guide defaults to in recommendations.

---

## 2. Anthropic official

### `anthropics/skills`
- **[github.com/anthropics/skills](https://github.com/anthropics/skills)** · ~124K stars · 14.5K forks · mostly MIT
- Categorized as Creative & Design, Development & Technical, Enterprise & Communication, and Document Skills (PDF, DOCX, PPTX, XLSX, these power Claude's document capabilities natively).
- **Star skills:**
  - **`frontend-design`**: 277K+ installs (March 2026). It exists specifically because Claude defaults to Inter font and purple gradients ("AI slop") unless redirected. Install this if you're doing any frontend work, full stop. The single highest-leverage skill in the catalog.
  - **`skill-creator`**: the official meta-skill for authoring others. Start here when you write your first skill.
- The marketplace manifest at [`anthropics/claude-plugins-official`](https://github.com/anthropics/claude-plugins-official) holds the 13 plugins Anthropic itself maintains.

---

## 3. Vendor skills

The pattern that's emerged over the last six months: companies whose products developers integrate now ship official skills alongside their MCP servers and SDKs. This is genuinely useful, vendor-authored skills know the schema, the conventions, and the gotchas in a way community skills never will.

The ones I think are worth knowing:

- **MongoDB**: [`mongodb/agent-skills`](https://github.com/mongodb/agent-skills), combines the MongoDB MCP server + agent skills in one package. Schema design, performance optimization, vector search.
- **Supabase**: [`supabase/agent-skills`](https://github.com/supabase/agent-skills), full Supabase workflow with built-in security guardrails for RLS bypassing in views and `user_metadata` in auth policies. Compatible with 18+ agents.
- **Vercel**: [`vercel-labs/agent-skills`](https://github.com/vercel-labs/agent-skills) plus the [`vercel-labs/skills`](https://github.com/vercel-labs/skills) `npx skills` CLI that's used across the ecosystem. Next.js/React performance, Vercel AI SDK, React Native composition.
- **Cloudflare**: [`cloudflare/skills`](https://github.com/cloudflare/skills), Workers, Pages, Durable Objects, AI, networking, IaC. The `wrangler` and `agents-sdk` skills are the ones I lean on most.
- **HashiCorp**: [`hashicorp/agent-skills`](https://github.com/hashicorp/agent-skills), Terraform and Packer (~12 skills); Vault and Consul planned. Enforces HashiCorp style conventions, builds new providers, refactors monoliths into modules.
- **LiveKit**: [`livekit/agent-skills`](https://github.com/livekit/agent-skills), voice AI agent patterns. Notable design choice: deliberately *doesn't* teach the LiveKit API (which drifts), only architectural behavior. Worth studying as a model for staleness avoidance even if you don't build voice apps.
- **ClickHouse**: [`ClickHouse/agent-skills`](https://github.com/ClickHouse/agent-skills), `clickhouse-best-practices` (31 rules), `chdb-datastore` (pandas-compatible), `chdb-sql`.
- **Expo**: [`expo/skills`](https://github.com/expo/skills), building, deploying, debugging Expo apps; tuned for Opus.
- **Figma**: [`figma/community-resources/agent_skills`](https://github.com/figma/community-resources/tree/main/agent_skills).

### Conspicuously absent
A few obvious vendors don't yet have a single canonical first-party skills repo as of April 2026:

- **Stripe**: strong community skills (`stripe-mcp-skill`, `stripe-payments-subscription-agent` on MCP Market) cover billing, subscriptions, checkout, webhooks. Stripe's official AI docs reference the pattern. The official MCP server is the closest first-party touchpoint. I expect a `stripe/agent-skills` repo within a few months.
- **Polar**: community skills exist (Polar Integration Validator, `polar-better-auth`); Polar offers an official MCP server.
- **Netlify**: listed in awesome-agent-skills as a publisher but no single dedicated repo found.

If you're integrating these, do your own audit, community skills here are a mixed bag.

---

## 4. Security skills

### Trail of Bits
- **[github.com/trailofbits/skills](https://github.com/trailofbits/skills)** · CC BY-SA 4.0
- 17 security skills (late 2025): `variant-analysis` (find similar bugs across codebases via ripgrep/Semgrep/CodeQL), `static-analysis` (SARIF parsing), `semgrep-rule-creator`, `audit-context-building`, `burp-suite-project-parsing`, `differential-review`, `fix-verification`, `agentic-actions-auditor` (audits GitHub Actions YAML for AI-introduced vulnerabilities), `error-prone-apis`.
- **Why I rate it:** Methodology over checklist. Confidence-graded findings (HIGH/MEDIUM/LOW), only HIGH reported. This is what "good security skill" looks like, the rest of the security skill ecosystem looks worse by comparison.

### Sentry
- **[github.com/getsentry/skills](https://github.com/getsentry/skills)** · canonical home: [`getsentry/sentry-for-ai`](https://github.com/getsentry/sentry-for-ai)
- The `sentry-skills` plugin is a mixed bag, and that's actually the most important thing to know about it. It bundles three categories of skill:
  - **General-purpose, no Sentry product needed:** `code-review` (review skill that tunes Claude past stylistic nitpicks toward real defects), `skill-scanner` (audits *other* skills for security issues before install), `agents-md` (helps manage AGENTS.md). These are useful to anyone.
  - **Sentry-style-opinionated:** `commit` (imposes Sentry's commit-message conventions), `create-branch`. Useful only if you adopt the conventions.
  - **Sentry-product-specific:** skills that teach the agent to set up Sentry, debug with Sentry data, and use observability data. Useful only if Sentry is your error monitoring vendor.
- **My take:** `code-review` is the strongest general-purpose review skill I've found in the open ecosystem and it doesn't require using Sentry's product. `skill-scanner` is the install-time safety net I run before adopting anything from the community catalogs. Recommend installing those two standalone (via git clone) for non-Sentry users; recommend the full plugin for Sentry users.

---

## 5. Personal / influencer skills

These are individual developers' opinionated kits, useful both to install directly and to *study as authoring examples*.

### Matt Pocock
- **[github.com/mattpocock/skills](https://github.com/mattpocock/skills)** · ~16.1K stars · MIT
- TypeScript-focused and meta skills: `tdd` (red-green-refactor by vertical slice), `triage-issue` (investigate bug → file GitHub issue with TDD plan), `setup-pre-commit` (Husky + lint-staged + Prettier + typecheck + tests), `git-guardrails-claude-code` (hooks blocking dangerous git ops), `write-a-skill` (skill authoring with progressive disclosure and bundled resources).
- **My take:** If you write TypeScript, install this. Pocock teaches via these as part of his AI Hero curriculum and *Claude Code for Real Engineers* course, and the skills are the most educational examples I've found.

### Simon Willison
- **[github.com/simonw/claude-skills](https://github.com/simonw/claude-skills)**
- A mirror of `/mnt/skills` from Claude's code interpreter environment, useful for studying what Anthropic ships internally.
- Willison's [October 2025 post on skills](https://simonwillison.net/2025/Oct/16/claude-skills/) is, to my knowledge, the post that brought skills mainstream.

### Other notable individual collections

I haven't used these heavily but they show up in conversations:

- **`alirezarezvani/claude-skills`**: 232+ polyglot skills (engineering, marketing, product, compliance, C-level)
- **`agent-sh/agentsys`**: 19 plugins / 47 agents / 40 skills across Claude Code, OpenCode, Codex, Cursor, Kiro
- **`tech-leads-club/agent-skills`**: security-validated registry positioning as the "professional" tier
- **`obra/superpowers-marketplace`**: Vincent's curated marketplace beyond core Superpowers

---

## 6. Community catalogs

For breadth, installable libraries with hundreds of skills indexed by category.

### Antigravity Awesome Skills
- **[github.com/sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills)** · ~35K stars · community-maintained (*not* an official Google project despite the name)
- 1,435+ skills with an installer CLI: `npx antigravity-awesome-skills --claude --category development,backend --risk safe`. Multi-tool: Claude Code, Cursor, Codex CLI, Gemini CLI, Antigravity, Kiro, OpenCode, GitHub Copilot.
- **My take:** The breadth is impressive but quality varies wildly. Use the `--risk safe` flag and run [Sentry's `skill-scanner`](https://github.com/getsentry/skills) on anything you install.

### Curated awesome-* lists
- [`VoltAgent/awesome-agent-skills`](https://github.com/VoltAgent/awesome-agent-skills), 1,400+ hand-curated, my go-to list
- [`travisvn/awesome-claude-skills`](https://github.com/travisvn/awesome-claude-skills)
- [`hesreallyhim/awesome-claude-code`](https://github.com/hesreallyhim/awesome-claude-code), broader Claude Code ecosystem

---

## What to do with this list

Don't install ten things from this page. Most experienced practitioners I talk to settle on **3 active skills**, with maybe 5–8 active *tools* (skills + MCP servers) in any context. Past that, output gets visibly worse.

For a decision framework on what those three should be for your specific project and for the kit I actually run. See the choosing-skills page next.

## Related reading

- [What are skills](./what-are-skills.md), format and fundamentals
- [Choosing skills](./choosing-skills.md), decide what to install for your project
- [Quality and anti-patterns](./quality-and-anti-patterns.md), security and quality concerns before installing anything
