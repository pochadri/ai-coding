---
name: skill-recommender
description: |
  Use this skill when the user asks for a recommended AI coding skill stack for their
  project, asks which skills to install, or asks which custom skills they should write.
  Triggers: "recommend skills for my project", "what skills should I install",
  "which skill stack", "what custom skills should I write". Conducts a phased discovery
  conversation and returns two recommendation sets: existing skills to install (with
  exact install commands for the user's AI tool), and 2-4 custom skills to author for
  the user's specific situation.
license: MIT
---

# skill-recommender

You are about to help the user pick the right AI coding skill stack for their project.
Your job: ask short discovery questions in phases (not all at once), then return **two
recommendations**, existing skills to install + 2-4 custom skills the user should author
for their specific situation. Be opinionated. Cap install set at 5; cap custom set at 4.

---

## Workflow

### Phase 1 — Tool & language (ask first, in one short message)

Before anything else, ask these two questions together. They drive the install commands
and one of the language-specific branches.

1. **Which AI coding tool are you primarily on?** Claude Code, Cursor, Codex CLI,
   OpenCode, Goose, or other?
2. **Primary language?** TypeScript/JavaScript, Python, **Java**, Rust, Go, or
   Polyglot/other?

> If the user said "Java", in the same follow-up turn also ask: **Spring / Spring Boot,
> or another framework / plain Java?** Spring is the dominant default and the only
> framework with a pre-baked custom-skill template; if they don't know, assume Spring
> Boot. For non-Spring Java, recommend forking the Spring template and adapting.

### Phase 2 — Project shape (ask after Phase 1 answers)

Send these three together:

3. **Project type**: Frontend SPA, Backend API, Full-stack web, Mobile, Infra/DevOps,
   ML/data, Voice/realtime, or CLI/library?
4. **Stage**: Greenfield prototype, MVP, Growth (have customers), Mature production,
   or Legacy maintenance?
5. **Risk profile**: Hobby, Internal tool, Customer-facing SaaS, or Regulated
   (fintech/health/government)?

### Phase 3 — Team & workflow (ask after Phase 2 answers)

Send these two together:

6. **Team size**: Solo, Small (2-10), Larger (10+), or Enterprise?
7. **Workflow style**: Test-driven (strict), Spec-driven, Vibe coding (fast iteration),
   or Balanced (default)?

### Phase 4 — Optional probes (only if relevant)

Ask only if the user volunteered context that warrants it. Don't ask all of these:

- **Current pain**: What's the single biggest friction with your AI tool today?
- **What's already installed?**: Helps avoid redundant recommendations.
- **Specific skill question?**: If they ask about a specific skill (e.g., "should I
  use BMAD?"), answer that directly using the rules below before recommending a stack.

### Phase 5 — Recommendation (one message, structured)

Output in exactly this shape:

```
## Your recommended skill stack

### 📦 Install these (existing skills)

- **[Skill name]**: one sentence why
  - Install ([tool]): `[exact command]`

[2-5 items max. NEVER more than 5.]

### 🛠 Write these yourself (custom skills)

The highest-leverage skills capture *your* team's specific conventions. Based on your
inputs, here are 2-4 starter skills worth authoring. Use Anthropic's `skill-creator`
skill as the template.

- **`your-[name]`**: one sentence on what it captures
  - [Inline starter SKILL.md scaffold from references/custom-skill-templates.md]

[2-4 items max.]

### Where to put them

[`~/.claude/skills/` for personal use, or `.claude/skills/` checked into the repo for
team use. Reference the team-size answer.]

### What to ignore

[1-3 things specifically NOT recommended for this profile and why. e.g., "Not
recommending gstack for you because you're at growth stage with a team, gstack
optimizes for solo founder velocity."]

### Caveats

[1-2 sentences on inputs that were ambiguous, or recommendations to verify against
your context.]
```

---

## Decision rules, install set

Reference: `references/install-catalog.md` for full descriptions and tool-specific
install commands. Use the install command that matches the user's tool from Phase 1.

> **Quality and security are first-class concerns, not optional add-ons.** Every
> recommendation set must include at least one *review-time* quality skill and at
> least one security control. The defaults below are the strongest options I've
> found in the open ecosystem, but for the quality slot a custom team-authored
> skill (`your-code-review-checklist`) is usually higher leverage than any
> off-the-shelf option once you have specific team conventions.

> **About Sentry's published skills:** Sentry's bundle mixes general-purpose
> skills (`code-review`, `skill-scanner`) with Sentry-product-specific skills
> (Sentry setup, Sentry-flavored debugging, observability with Sentry data) and
> one Sentry-style-opinionated skill (`commit`). Do **not** recommend installing
> the full `sentry-skills` plugin to non-Sentry users. Recommend the
> general-purpose pieces standalone via git clone, and only recommend the full
> bundle if the user actually uses Sentry as their error monitoring vendor.

### Always recommend (when they apply)

- **Anthropic `frontend-design`**: only if project type involves any UI (frontend /
  full-stack / mobile).
- **A review-time quality skill** for any stage past prototype. Default to Sentry's
  general-purpose `code-review` (install standalone if user is not a Sentry
  customer; install via the bundle if they are). Alternatives: a custom
  `your-code-review-checklist` (highest leverage if the team has conventions),
  Trail of Bits skills (security-focused review), or a methodology system that
  includes review patterns (Superpowers, BMAD).
- **Only recommend Sentry `commit`** if the user has no commit-message convention
  and is happy to adopt Sentry's. Otherwise suggest authoring `your-commit-conventions`.

### Methodology system, pick at most ONE primary

- `spec-driven` workflow + team 3+ + product stage (mvp/growth/mature) → **BMAD-METHOD**
- `tdd` or `spec-driven` workflow (other cases) → **Superpowers** (writing-plans +
  subagent-driven-development + tdd if applicable)
- `vibe` workflow + early stage (prototype/mvp) + Claude Code only → **gstack** design
  suite (note: gstack is Claude-Code-only; not portable)
- `vibe` or `balanced` + solo/small team + multi-tool environment + anti-ceremony
  preference → **GSD / get-shit-done** is a legitimate primary choice; surface the two
  governance signals (Solana token, prior ToS event) so the user decides
- `balanced` workflow + solo/small team + Claude Code → **Compound Engineering**
- Otherwise → **Superpowers writing-plans** as a lightweight default

### Vendor skills by stack

- Full-stack web → Supabase + Vercel
- Backend Python → MongoDB
- Backend TypeScript → Supabase
- **Backend Java** → strong AGENTS.md is non-negotiable (no canonical Java vendor skill
  exists yet, flag this gap honestly)
- Infra/DevOps → HashiCorp + Cloudflare
- ML/data → ClickHouse, MongoDB
- Mobile → Expo
- Voice → LiveKit
- Frontend → Vercel + Figma
- Library → strong AGENTS.md

### Security-driven additions (mandatory at the listed risk profile)

`skill-scanner` is the one Sentry-published skill that is genuinely
product-agnostic; it audits other skills before install and doesn't require Sentry
usage. Install standalone via git clone if the user is not a Sentry customer.

- **Internal tool+** → install `skill-scanner` (standalone) if any community skill
  is being installed.
- **SaaS** → `skill-scanner` is **mandatory** before installing any community skill;
  recommend Trail of Bits if Java; recommend at least one custom security skill
  from the custom-write set (e.g., `your-secret-handling-pattern`).
- **Regulated (fintech / health / gov)** → **Trail of Bits** security skills
  mandatory; `skill-scanner` mandatory; gstack `freeze`/`guard` for blast-radius
  control if on Claude Code; recommend `your-audit-trail-fields` and
  `your-security-review-checklist` in the custom-write set.
- **Java + SaaS or Regulated** → Trail of Bits is *more* important than for
  TS/Python (Veracode "Java Paradox", where AI is worse on Java security). The
  Java framework custom skill is mandatory (covers deserialization, reflection,
  auth pitfalls).

### Quality-driven additions

- **Any non-prototype stage** → Sentry `code-review` floor.
- **Growth or Mature stage** → recommend at least one custom *quality* skill in the
  custom-write set (e.g., `your-test-quality-rules` or `your-observability-baseline`).
- **Library project** → Matt Pocock TS skills include strong test/setup conventions;
  recommend if TypeScript.

### Stage-driven additions

- Legacy stage → gstack `investigate` + strong AGENTS.md

### Cap-binding rule (when more than 5 items match)

Floor first, then trim. Two-step rule:

1. **Always keep these floors** if the user's profile triggers them:
   - A review-time quality skill for non-prototype projects (default: Sentry's
     general-purpose `code-review` standalone, or a custom `your-code-review-checklist`)
   - `skill-scanner` at SaaS+ (security floor; install standalone, not the full
     Sentry bundle)
   - Trail of Bits at Regulated, or at Java + SaaS (security floor)
   - `frontend-design` if any UI

2. **For everything else**, drop in this order until total ≤ 5:
   stage-driven extras → second methodology → vendor skills beyond top 2 →
   `commit` (Sentry-style; only if user adopted it) → personal/influencer skills.

The principle: quality and security floors are non-negotiable; everything else is
situational and the user can add it later.

### How to handle GSD / get-shit-done

GSD (~57K stars, MIT, 15+ runtimes, actively maintained) is a legitimate primary
choice for solo / small-team profiles that prefer a fast spec-driven loop without
ceremony. Don't reflexively exclude it. **Never describe it as "disqualified" or
"not recommended."**

Two narrow caveats, surface them only when context warrants, not by default:

1. **`$GSD` Solana token in README header.** OSS code is unaffected (license is MIT;
   you don't hold or transact with the token to use the tool). **Surface this** if
   the user mentions enterprise / regulated / corporate procurement context where a
   no-crypto-adjacent dependency policy may apply. Otherwise it's trivia, don't
   lead with it.
2. **"Welcome Back to GSD" banner re: prior Anthropic ToS event.** Largely mitigated
   by GSD's multi-runtime support. **Surface this** only if the user is on a single
   AI vendor with no portability plan. Otherwise it's not material.

If either caveat actually applies to the user's profile and they want a substitute,
**Superpowers** is the closest same-job alternative where neither caveat is in play.

---

## Decision rules, custom skills to write

Reference: `references/custom-skill-templates.md` for the starter scaffolds (one file
per template).

Generate 2-4 custom skill recommendations with starter scaffolds inlined in the output.

### Project-type-driven (always 1)

- Frontend → `your-design-system-conventions`
- Backend → `your-api-contract-style`
- Full-stack → `your-feature-shape-template`
- Mobile → `your-platform-targeting-rules`
- Infra → `your-iac-conventions`
- Data → `your-schema-evolution-pattern`
- Library → `your-public-api-style`
- Voice/realtime → fork an existing template (no pre-baked voice template; the patterns differ enough between voice frameworks that one generic template doesn't help)

### Stage-driven (1, except for prototype)

- MVP → `your-feature-flag-pattern`
- Growth → `your-incident-runbook-skeleton`
- Mature → `your-deprecation-process`
- Legacy → `your-codebase-archeology-prompts`

### Risk-driven (1, except for hobby)

- Internal → `your-data-classification-rules`
- SaaS → `your-tenant-isolation-pattern`
- Regulated → `your-audit-trail-fields`

### Security-driven (1 additional, mandatory at SaaS+ and any Java profile)

Pick the one that best matches the user's profile. This is **in addition to** the
risk-driven slot above, not a substitute. The cap-binding rule below absorbs any
overflow.

- **SaaS or Regulated** → `your-secret-handling-pattern` (covers env vars, key
  rotation, never-log-secrets, vault patterns) OR `your-security-review-checklist`
  (a per-PR review pass focused on injection, deserialization, authz).
- **Java + any non-hobby risk** → security pattern is *baked into* the Java framework
  template (the security paradox section). Don't add a second security skill unless
  the user is also Regulated.
- **Customer-facing UI + SaaS** → `your-input-validation-rules` (XSS, CSRF, SSRF,
  CORS conventions for your stack).

### Quality-driven (1 additional at Growth or Mature stage)

Pick the one with the highest leverage given the user's current pain (Phase 4
follow-up). If they didn't volunteer pain, default to `your-test-quality-rules`.

- Default → `your-test-quality-rules` (test naming, coverage thresholds, what
  constitutes a meaningful test in this codebase, what AI keeps generating that
  doesn't count).
- "Agent code is hard to debug in prod" → `your-observability-baseline` (logging,
  metrics, tracing conventions specific to this codebase).
- "AI keeps regressing accessibility / i18n / perf" → `your-horizontal-concerns`
  (the cross-cutting checklist from the spec template).

### Java framework-driven (always 1 if language is Java)

Recommend `your-spring-conventions` if the user is on Spring or Spring Boot (the
dominant default). For Quarkus, Micronaut, plain Java, or other non-Spring
frameworks, recommend forking `your-spring-conventions` and adapting — most of the
structural sections (package layout, transaction boundaries, security paradox)
translate; the framework-specific annotations and patterns are what gets customized.

The security paradox section is mandatory regardless of framework: AI is worse on
Java security per Veracode, and auth, deserialization, and reflection paths need
extra review on every Java codebase.

### Cap-binding rule (when more than 4 items)

Floor first, then trim. Two-step rule:

1. **Always keep these floors** if the user's profile triggers them:
   - Project-type slot (anchors the recommendation to the codebase)
   - Java framework slot if language is Java
   - Security-driven slot at SaaS+

2. **For everything else**, drop in this order until total ≤ 4:
   quality-driven → stage-driven (except Legacy at Legacy stage) → risk-driven
   (except Regulated at Regulated stage).

The principle: project-type, language/framework, and security are floors; quality
and stage skills can be added as the project matures.

### Output requirements per custom skill

For each, include in your message:

1. The `your-X` name
2. A one-sentence "what it captures" line
3. A complete starter `SKILL.md` scaffold (frontmatter + body sections) ready to fork —
   pull from `references/custom-skill-templates.md`. Inline it; don't reference-link.

---

## Style and constraints

- **Be opinionated.** The user came here for a recommendation, not a menu. If two
  options are close, pick one and say why in one sentence.
- **Cap install set at 5; custom set at 4.** Apply the cap-binding rules above.
- **Always include "What to ignore."** Telling the user what *not* to install surfaces
  hidden assumptions.
- **GSD is a legitimate primary choice for the right profile.** When you do recommend it, surface the two governance signals (Solana token in README; prior Anthropic ToS event) so the user decides for themselves. Never describe GSD as "disqualified" or "not recommended"; see the "How to handle GSD / get-shit-done" section above for the full rule.
- **Honesty about ecosystem gaps.** For Java specifically: "no canonical Java vendor
  skill set exists yet, so the Java path leans harder on AGENTS.md and security audit
  skills than the TS/Python paths do."
- **Don't lecture.** One sentence per install item; one sentence + scaffold per custom
  item. Skip the essay.
- **Match install commands to the user's tool.** Phase 1 captures this, don't give
  Claude Code commands to a Codex user.

---

## Known limitations

Be upfront about these in the Caveats section when relevant:

- **Catalog freshness.** The ecosystem moves; recommendations reflect April 2026 state.
  Re-verify install commands and star counts before quoting in production decisions.
- **No codebase introspection.** This skill doesn't read the user's repo. Custom skill
  scaffolds are starting points, the user fills in their actual conventions.
- **Tool-specific install paths can drift.** Plugin marketplaces and skill formats
  change. If an install command fails, fall back to `git clone` + manual copy into the
  tool's skills directory.
- **Java vendor gap is real.** No canonical first-party Java/Spring agent-skills repo
  exists as of April 2026. Java teams should not interpret the shorter install set as a
  bug, it's the state of the ecosystem.
- **Cross-tool portability.** gstack is Claude-Code-only (slash-command flavor).
  Superpowers, Anthropic, Sentry, and most vendor skills follow the SKILL.md open
  standard and work across Claude Code / Cursor / Codex / OpenCode / Goose.

---

## Example session

> User: *"recommend skills for my project"*

**Agent (Phase 1):**
> Two quick questions to start:
>
> 1. Which AI tool are you primarily on? (Claude Code / Cursor / Codex CLI / other)
> 2. Primary language? (TS, Python, Java, Rust, Go, Polyglot)

> User: *"Claude Code, Java"*

**Agent (Java follow-up + Phase 2):**
> Got it. For Java: Spring / Spring Boot, or another framework / plain Java?
>
> Also:
> - Project type? (Frontend / Backend API / Full-stack / Mobile / Infra / Data / CLI)
> - Stage? (Prototype / MVP / Growth / Mature / Legacy)
> - Risk profile? (Hobby / Internal tool / SaaS / Regulated)

> User: *"Spring Boot, Backend API, Growth, SaaS"*

**Agent (Phase 3):**
> Last two:
> - Team size? (Solo / Small 2-10 / Larger 10+ / Enterprise)
> - Workflow style? (TDD / Spec-driven / Vibe / Balanced)

> User: *"Small team, balanced"*

**Agent (Phase 5, recommendation):**

```
## Your recommended skill stack

### 📦 Install these (existing skills)

- **`skill-scanner`** (Sentry-published, product-agnostic): audits other skills for
  security issues. Mandatory at SaaS+ before installing any community skill.
  - Install (any tool, standalone): `git clone https://github.com/getsentry/skills /tmp/sentry-skills && cp -r /tmp/sentry-skills/plugins/sentry-skills/skills/skill-scanner ~/.claude/skills/`

- **`code-review`** (Sentry-published, product-agnostic): the strongest general-purpose
  review skill in the open ecosystem; tunes Claude past stylistic nitpicks.
  - Install (any tool, standalone): `git clone https://github.com/getsentry/skills /tmp/sentry-skills && cp -r /tmp/sentry-skills/plugins/sentry-skills/skills/code-review ~/.claude/skills/`
  - *(Skipped the full sentry-skills bundle since this team isn't using Sentry. If you adopt Sentry later, install via `claude plugin install sentry-skills@sentry-skills` for the full bundle.)*

- **Trail of Bits `skills`**: Java security skills are *more* important than for TS/Python
  - Install: `git clone https://github.com/trailofbits/skills ~/.claude/skills/trailofbits`

- **Superpowers `writing-plans`**: lightweight spec-driven default for balanced teams
  - Install (Claude Code): `/plugin install superpowers@claude-plugins-official`

### 🛠 Write these yourself (custom skills)

[Inline scaffolds for: your-spring-conventions, your-api-contract-style,
your-tenant-isolation-pattern, your-incident-runbook-skeleton]

### Where to put them
`.claude/skills/` checked into the repo (small team, share via PR review).

### What to ignore
- Anthropic `frontend-design`, backend project, no UI
- gstack: Claude-Code-only AND optimizes for solo founder velocity, not team flow
- BMAD-METHOD, too heavyweight for a small team at growth stage

### Caveats
No canonical Java vendor skill exists yet, so the install set leans harder on AGENTS.md
and security skills than the TS/Python equivalent would. Verify your AGENTS.md before
treating this stack as complete.
```

---

## Reference files

Loaded on demand:

- `references/install-catalog.md`, full descriptions, tool-specific install commands,
  current adoption signals (refresh quarterly).
- `references/custom-skill-templates.md`, starter SKILL.md scaffolds for every
  `your-X` recommendation, ready to fork. Includes a Spring template; for other
  Java frameworks, the recommendation is to fork the Spring template and adapt.

---

## Provenance

Part of the **AI Coding Tools — A Practitioner's Guide** repo
(<https://github.com/pochadri/ai-coding>). Decision rules mirror the SkillPicker
component documented in `06-skills/picker.md`. Install catalog is sourced from
`06-skills/ecosystem-landscape.md`. Refresh both quarterly as the ecosystem moves.
