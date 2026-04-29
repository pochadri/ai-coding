---
title: Choosing Skills for Your Project
summary: How I'd pick skills by project type, stage, team size, risk profile, plus the kit I actually run.
tags: [skills, choosing, decision-framework, project-stage, risk]
related:
  - ./ecosystem-landscape.md
  - ./building-your-own.md
  - ./quality-and-anti-patterns.md
last_updated: 2026-04-25
---

# Choosing Skills for Your Project

The honest answer to "which skills should I install" is: **fewer than you think**.

I learned this the hard way. I went through a phase of installing every skill that looked interesting, at one point I had something like 14 active skills and 4 MCP servers connected. My output got worse, not better. The agent started second-guessing itself, adding verbose preamble, hedging on simple tasks. I deleted nine skills and the output snapped back. Now I run about six and I'm pretty militant about pruning.

Most experienced practitioners I talk to settle on **3 or fewer active skills**, with **5–8 active *tools* (skills + MCP) per context**. Past that, instruction conflicts compound.

The right small set for *you* depends on six factors. The recipes at the bottom give starting points, and at the very end I share what I actually run.

---

## Factor 1: Project type

The biggest single factor. Match skills to what the project actually does.

| Project type | Skills that earn their keep |
|---|---|
| **Frontend SPA** | Anthropic [`frontend-design`](https://github.com/anthropics/skills) (anti-AI-slop), [Vercel](https://github.com/vercel-labs/agent-skills) React/Next.js, [Cloudflare](https://github.com/cloudflare/skills) Pages, [Figma](https://github.com/figma/community-resources/tree/main/agent_skills), [gstack](https://github.com/garrytan/gstack) design suite |
| **Backend API** | [Superpowers](https://github.com/obra/superpowers) (TDD discipline), [MongoDB](https://github.com/mongodb/agent-skills) / [Supabase](https://github.com/supabase/agent-skills) / Stripe official skills paired with their MCP servers |
| **Full-stack web** | [gstack](https://github.com/garrytan/gstack) (rapid full-stack startup velocity), [Supabase](https://github.com/supabase/agent-skills) + [Vercel](https://github.com/vercel-labs/agent-skills) skills together |
| **Mobile** | [Expo skills](https://github.com/expo/skills) |
| **Infra / DevOps** | [HashiCorp](https://github.com/hashicorp/agent-skills) (Terraform, Packer), [Cloudflare](https://github.com/cloudflare/skills) (Workers, Durable Objects, Wrangler) |
| **ML / data** | [ClickHouse](https://github.com/ClickHouse/agent-skills), [MongoDB](https://github.com/mongodb/agent-skills) (vector search) |
| **CLI tool / library** | [Superpowers](https://github.com/obra/superpowers) (TDD, plan-then-execute), [Matt Pocock skills](https://github.com/mattpocock/skills) for TS-heavy |
| **Voice / realtime** | [LiveKit agent skills](https://github.com/livekit/agent-skills) |

For the full descriptions of each library and my opinion on them, see the ecosystem landscape page. The methodology choice between gstack and Superpowers is covered there in detail, pick *one* primary system, not both.

---

## Factor 2: Project stage

This is the factor most people get wrong. The skill set that's right for a Saturday prototype is wrong for a regulated production system, and vice versa.

### Greenfield prototype / vibe coding

**Goal:** velocity. Ship the demo.

- 3–4 skills max. gstack's `office-hours` + `design-shotgun` + `ship` is purpose-built for this.
- Anthropic's `frontend-design` to avoid generic AI-look UIs.
- Skip TDD enforcement, security audits, formal review. They'll just slow you down on something that may not survive next week.

### MVP

**Goal:** something a few real users can touch.

- Add a `code-review` skill. Sentry's general-purpose `code-review` (in their open repo) is a strong default and doesn't require using Sentry's product. Install standalone if you don't.
- Add a commit-conventions skill if your team doesn't already have one. Sentry's `commit` skill imposes their style; only adopt if you want it. Otherwise write `your-commit-conventions`.
- Vendor skills as you commit to a stack. Once you've decided "we're using Supabase," install [Supabase agent-skills](https://github.com/supabase/agent-skills).
- Sentry's full `sentry-skills` bundle (including their Sentry-flavored debugging and observability skills) is worth installing **only if you actually use Sentry as your error monitoring vendor**.
- Start checking skills into Git so the team uses the same set.

### Growth-stage with customers

**Goal:** ship without breaking what's working.

- Layer in [Trail of Bits](https://github.com/trailofbits/skills) security skills for periodic audit.
- If your team uses Sentry as the error monitoring vendor, the Sentry-product-specific skills become load-bearing here. (For non-Sentry teams, the `code-review` and `skill-scanner` general-purpose skills from the same repo are still worth installing.)
- Vendor skills for the stack you've now committed to.
- Move skills into the team Git repo with code review on every change.
- Start measuring impact: which skills actually improve PR quality? Drop the ones that don't. I do this audit every quarter and it's always uncomfortable, there's always one skill I'm attached to that the data says isn't helping.

### Mature / regulated production

**Goal:** zero blast radius.

- Centralized skill registry (a platform team maintains the canonical set).
- Audit trails: Anthropic's API has a `/v1/skills` endpoint for exactly this.
- Signed/reviewed skills only, no community installs without security review.
- Org-wide allowlist via Anthropic Team/Enterprise plans.
- gstack-style guard skills (`cso`, `careful`, `freeze`, `guard`) on production-touching work.
- Trail of Bits security audits in CI.

### Legacy maintenance

**Goal:** understand and modify carefully without breaking ancient systems.

- Selective: investigation/debug skills like Matt Pocock's `triage-issue`, gstack's `investigate`.
- Lighter on enforcement skills (legacy code already breaks the rules, and the agent fighting your existing patterns is worse than no skill).
- Heavy use of `AGENTS.md` / `CLAUDE.md` to capture the *why* the agent can't see.

---

## Factor 3: Team size

| Team size | Practice |
|---|---|
| **Solo** | Personal `~/.claude/skills/`. Copy generously from gstack and Matt Pocock. Iterate fast. |
| **Small team (2–10)** | Project-local `.claude/skills/` checked into Git. One named owner per skill. Review before merging. |
| **Larger (10+)** | Centralized skills repo. Draft/publish workflow with tech-lead review. Org-wide allowlist of approved external skills. |
| **Enterprise** | Anthropic Team/Enterprise plan provisions skills centrally. Audit logs. Rollback. Agent-owner role. Microsoft VS Code or Claude API `/v1/skills` for audit trails. |

The hardest transition is solo → small team. I've watched teams adopt skills personally and never converge, three engineers, three different `~/.claude/skills/` directories, three different Claude behaviors on the same codebase. Get them into Git early.

---

## Factor 4: Risk profile

The single most important factor for *what to install*, separate from *what to write*.

| Risk profile | Install policy |
|---|---|
| **Hobby** | Anything goes. Try community skills freely. |
| **Internal tool** | First-party only (Anthropic, MongoDB, Supabase, Vercel, Cloudflare, HashiCorp). |
| **Customer-facing SaaS** | First-party preferred. For any third-party skill, run [Sentry's `skill-scanner`](https://github.com/getsentry/skills) before install. Pin versions. Keep skills in Git with PR review. |
| **Fintech / health / regulated** | First-party + internally authored only. Mandatory security review on every skill change. Signed manifests where available. Trail of Bits skills for audit. Anthropic Enterprise plan for centralized governance. |

> ⚠️ Skills are essentially **untrusted third-party code**. The Snyk *ToxicSkills* study (Feb 2026) found 36% of audited skills had prompt injection vulnerabilities. The full picture and what to do about it is on the quality and anti-patterns page.

---

## Factor 5: Language, framework, and AI tool

Folding two related factors together.

**Language / framework:**
- TypeScript-heavy → [Matt Pocock's `mattpocock/skills`](https://github.com/mattpocock/skills); [Vercel](https://github.com/vercel-labs/agent-skills)
- Python-heavy → Anthropic's [`claude-api`](https://github.com/anthropics/skills), [MongoDB](https://github.com/mongodb/agent-skills), [ClickHouse `chdb`](https://github.com/ClickHouse/agent-skills)
- **Java / Spring (enterprise)** → strong org-wide `AGENTS.md` is non-negotiable (Java team conventions matter more than the public training data) + Sentry's general-purpose `code-review` (and `commit` if you want Sentry's style) from the [open repo](https://github.com/getsentry/skills) + [Trail of Bits](https://github.com/trailofbits/skills) for security at SaaS+ risk profiles. The Java security paradox (per Veracode: AI is *worse* on Java security than on other languages) makes audit-grade review more important here than for TS/Python.
- Rust → mostly community; [Trail of Bits](https://github.com/trailofbits/skills) `static-analysis` works across languages
- Polyglot → [Antigravity Awesome Skills](https://github.com/sickn33/antigravity-awesome-skills) for breadth + `AGENTS.md` as universal baseline

The underlying language tier list is on the language effectiveness page in folder 03.

**AI tool you're using:** Most skills use the [open SKILL.md standard](https://agentskills.io/specification) and work across tools. Two caveats:
- **gstack uses Claude Code custom slash commands** (not portable). If you might switch tools, don't lock yourself in.
- **Cursor reads `AGENTS.md` and `.cursorrules`** in addition to SKILL.md. Use multi-tool installer CLIs (`npx skills`, `npx antigravity-awesome-skills`) to translate paths.

---

## Factor 6: Workflow style

| Style | Skills that fit |
|---|---|
| **Test-driven** | [Superpowers](https://github.com/obra/superpowers) (strict), [Matt Pocock's `tdd`](https://github.com/mattpocock/skills) |
| **Spec-driven** | [Superpowers](https://github.com/obra/superpowers) `writing-plans`, [gstack](https://github.com/garrytan/gstack) `plan-eng-review` and `autoplan` |
| **Vibe coding** | [gstack](https://github.com/garrytan/gstack) design suite + [`frontend-design`](https://github.com/anthropics/skills); minimal process skills |
| **Pair programming with second model** | [gstack](https://github.com/garrytan/gstack) `codex` (OpenAI Codex CLI as second opinion), [Sentry `code-review`](https://github.com/getsentry/skills) |

Be honest about how you actually work, not how you think you should work. I tried installing strict TDD enforcement skills for a month because I felt like I *should* be a TDD person. I'm not. The skills nagged me, I ignored them, the agent and I argued, output got worse. Match skills to your real workflow, not your aspirational one.

---

## Starter recipes

Concrete starting points for the most common project shapes. Install these, run for two weeks, drop what you don't use.

### Solo founder, full-stack web (Next.js + Supabase + Stripe)
```
gstack: office-hours, design-shotgun, design-html, ship
+ anthropics/frontend-design
+ supabase/agent-skills
+ stripe (community skill or MCP)
```

### Small team, customer-facing SaaS (TypeScript backend)
```
obra/superpowers: brainstorming, writing-plans, subagent-driven-development
+ getsentry/skills: code-review, commit
+ vendor skills for your DB / payment / analytics stack
+ trailofbits/skills (periodic audit only)
```

### Enterprise / regulated (any stack)
```
Internal skills repo only (forked from public repos with review)
Anthropic Team/Enterprise plan with org allowlist
+ getsentry/skills/skill-scanner running in CI on every skill change
+ trailofbits/skills for security audits
+ vendor skills for the approved tech stack
```

### TypeScript developer, library / open source
```
mattpocock/skills: tdd, setup-pre-commit, git-guardrails-claude-code, write-a-skill, triage-issue
+ obra/superpowers: writing-plans
+ getsentry/skills: code-review, commit
```

### Enterprise Java / Spring backend
```
Strong org-wide AGENTS.md (the load-bearing piece for Java)
+ obra/superpowers: writing-plans, subagent-driven-development
+ getsentry/skills: code-review, commit
+ trailofbits/skills (mandatory at SaaS+ risk, the Java security paradox)
+ vendor skills if integrating Supabase / MongoDB / ClickHouse / etc.
```

### Voice / realtime app
```
livekit/agent-skills (architectural patterns)
+ obra/superpowers (TDD, planning)
+ project-specific skills you write yourself
```

### Maintenance of legacy codebase
```
Strong AGENTS.md / CLAUDE.md (architectural why, not just what)
+ mattpocock/skills: triage-issue
+ gstack: investigate, learn, context-save, context-restore
+ trailofbits/skills (when touching security-sensitive code)
```

---

## What I actually install

For what it's worth, here's the kit I run on most projects right now:

- **[Anthropic `frontend-design`](https://github.com/anthropics/skills)**: always. It eliminates AI-default purple-gradient slop, full stop.
- **[Sentry's `code-review` and `commit` (from their open skills repo)](https://github.com/getsentry/skills)**: published by Sentry but the `code-review` skill is general-purpose; doesn't need Sentry product usage. I happen to also adopt their commit conventions. If you have your own commit style, write your own and skip Sentry's.
- **One vendor skill set per stack**: usually Supabase + Vercel for typical web work, MongoDB or ClickHouse if I'm doing data work.
- **Two custom skills I wrote**: one for our error-handling pattern (because the AI kept proposing generic try/catch instead of our `AppError` wrapper), one for our test naming convention. Both started as prompts I was repeating, then I extracted them.
- **From Superpowers**, just `writing-plans` and `subagent-driven-development`. Not the strict TDD enforcement.
- **The [`andrej-karpathy-skills`](https://github.com/forrestchang/andrej-karpathy-skills) CLAUDE.md as a behavioral baseline.** A single-file plugin distilling four principles from Karpathy's observations on LLM coding pitfalls (Think Before Coding, Simplicity First, Surgical Changes, Goal-Driven Execution). I install this as the default behavioral CLAUDE.md and layer my project-specific AGENTS.md on top. The "Surgical Changes" and "Simplicity First" principles do real work against the agent's drive-by refactoring and overcomplication tendencies.

I tried gstack for two weeks. Kept three things (`design-shotgun`, `ship`, the `freeze`/`guard` security pattern), uninstalled the rest because the slash-command friction wasn't worth it for *my* workflow. Your mileage will absolutely vary, if you're a YC-style founder doing rapid full-stack web work, the whole thing might fit you perfectly.

**Total active skills at any time: about 6.** I check this number every quarter. If it's drifting up, something probably needs to be uninstalled.

For evaluating any specific skill before installing, the install-time safety checklist is on the quality and anti-patterns page.

## Two patterns I had to learn the hard way

These don't fit cleanly into the factor framework above, but they shape every recommendation I make now and they're worth naming explicitly.

### "Vendor-published" doesn't mean "for vendor customers"

The skill ecosystem has a subtle taxonomy problem. Some skills are *published by* a vendor but are *general-purpose* — they happen to live in that vendor's repo and don't require using the vendor's product. Some are *for* the vendor's product specifically. Some are vendor-style-opinionated (the vendor's commit conventions, the vendor's review preferences) and only useful if you adopt those opinions.

The example I keep using: Sentry's published skill bundle. `code-review` is general-purpose (a strong open-ecosystem review skill that doesn't need Sentry product usage). `skill-scanner` is general-purpose (audits *other* skills before install). `commit` is Sentry-style-opinionated (their commit conventions). The Sentry-debugging-and-observability skills are product-specific.

I used to recommend "install the Sentry skill bundle" as if it were one thing. It isn't. Recommending the full bundle to a non-Sentry user pulls in product-specific skills they won't use. The right framing is: name which pieces are general-purpose (install standalone), which are opinionated (install only if you adopt the opinions), and which are product-specific (install only if you use the product).

The same taxonomy applies to other vendors' skill collections. When you're choosing what to install, separate the artifact from its vendor association.

### Don't dismiss tools in language stronger than the evidence

I've watched the skill-recommendation ecosystem (including this guide, in earlier drafts) reach for "disqualified" or "do not use" framing on tools that had legitimate downsides but weren't actually disqualifying. The example that taught me: GSD / get-shit-done. Earlier drafts of this guide called it "disqualified for primary recommendation" because of two governance signals (a Solana token in the README, a prior Anthropic ToS event). On a closer read, the project is MIT-licensed, actively maintained, supports 15+ runtimes, and is a legitimate primary choice for the right profile. The two signals are real and worth flagging. They're not disqualifying.

The corrected framing: surface the signals, let the user weigh them. "Two narrow caveats that may or may not apply to your context" is honest. "Disqualified" is not, when the evidence doesn't support it.

The general principle: when reviewing tools, the temptation to dismiss is strong because dismissal is a clean recommendation and nuance is messy. Resist it. Calibrate the strength of your language to the strength of the evidence. If the only objection is "I'd prefer X for reasons Y," say that, not "X is the only acceptable choice."

## Related reading

- [Ecosystem landscape](./ecosystem-landscape.md), the catalog every choice above pulls from
- [Building your own](./building-your-own.md), when no existing skill fits
- [Quality and anti-patterns](./quality-and-anti-patterns.md), what can go wrong, especially security
