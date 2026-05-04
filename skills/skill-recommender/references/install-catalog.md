# Install catalog, full descriptions

Loaded on demand by `skill-recommender` when building install recommendations.
Mirrors `06-skills-and-memory/ecosystem-landscape.md`. Refresh quarterly.

> Last refresh: April 2026. Star counts and links drift; verify before quoting in
> production recommendations. Install commands tend to drift faster than anything else
> on this page, when in doubt, fall back to `git clone <repo>` + manual copy into the
> tool's skills directory.

---

## How to read the install commands

Most skills now ship as either (a) a Claude Code plugin via a marketplace, (b) a raw
SKILL.md folder you clone or copy, or (c) both. Where multiple paths exist, prefer the
plugin marketplace, it handles updates. Fall back to git clone if the marketplace
listing isn't published for your tool.

For non-Claude-Code tools (Cursor, Codex CLI, OpenCode, Goose), most skills work via the
SKILL.md open standard: clone the repo and copy the relevant subfolder into your tool's
skills directory. Tool-specific paths:

- **Claude Code:** `~/.claude/skills/` (personal) or `.claude/skills/` (repo)
- **Cursor:** `~/.cursor/skills/`
- **Codex CLI:** `~/.codex/skills/`
- **OpenCode / Goose / Amp / Aider:** check tool docs; SKILL.md format is portable

---

## Anthropic official

- **Anthropic `frontend-design`**: eliminates AI-default purple-gradient slop. The single
  highest-leverage skill in the catalog. ~277K installs (March 2026).
  - URL: <https://github.com/anthropics/skills>
  - Install (Claude Code, plugin): `/plugin marketplace add anthropics/skills` then
    `/plugin install frontend-design@anthropic-skills`
  - Install (any tool, manual): `git clone https://github.com/anthropics/skills /tmp/anthropic-skills && cp -r /tmp/anthropic-skills/skills/frontend-design ~/.claude/skills/` (adjust target dir per tool)

- **Anthropic `skill-creator`**: the official meta-skill for authoring others. Start here
  when writing your first skill.
  - URL: <https://github.com/anthropics/skills>
  - Install: same patterns as `frontend-design`; substitute `skill-creator` for the folder/plugin name

## Sentry's published skills (mostly general-purpose, not Sentry-product-specific)

Sentry publishes a bundle (`sentry-skills`) that mixes **general-purpose** skills
(`code-review`, `skill-scanner`) with **Sentry-product-specific** skills (Sentry
setup, Sentry-flavored debugging, observability with Sentry data) and one
**Sentry-style-opinionated** skill (`commit`). Recommend them differently:

- The general-purpose ones do *not* require using Sentry's product. They're just
  good skills that happen to live in Sentry's repo.
- The Sentry-product-specific ones only matter if you actually use Sentry as your
  error monitoring vendor. Don't recommend the full bundle to non-Sentry users.
- The `commit` skill imposes Sentry's commit conventions. Recommend only if the
  user wants to adopt that style or doesn't already have their own.

### `skill-scanner` (general-purpose, recommend broadly)

- **What it does:** audits *other* skills for security issues before you install
  them. Genuinely product-agnostic. Of all the security tooling in the open
  ecosystem for AI coding, this is the one I install on every machine.
- **Recommendation:** mandatory at SaaS+ risk profiles. Recommended at any
  non-hobby profile that installs community skills.
- URL: <https://github.com/getsentry/skills/blob/main/plugins/sentry-skills/skills/skill-scanner/SKILL.md>
- Install (Claude Code, full bundle): `claude plugin marketplace add getsentry/skills` then `claude plugin install sentry-skills@sentry-skills`
- Install (any tool, just `skill-scanner`): `git clone https://github.com/getsentry/skills /tmp/sentry-skills && cp -r /tmp/sentry-skills/plugins/sentry-skills/skills/skill-scanner ~/.claude/skills/`

### `code-review` (general-purpose, recommend as a default)

- **What it does:** the strongest general-purpose review skill I've used in the
  open ecosystem. Tunes Claude past stylistic nitpicks toward real defects.
  Does not require Sentry product usage.
- **Recommendation:** good default for any project past prototype. **Not** a
  universal floor; alternatives include writing your own `your-code-review-checklist`
  (highest leverage if you have specific team conventions), Trail of Bits skills
  (more security-focused), or a methodology system that includes review patterns
  (Superpowers, BMAD).
- URL: <https://github.com/getsentry/skills>
- Install (manual, just this skill): `git clone https://github.com/getsentry/skills /tmp/sentry-skills && cp -r /tmp/sentry-skills/plugins/sentry-skills/skills/code-review ~/.claude/skills/`

### `commit` (Sentry-style-opinionated, opt-in)

- **What it does:** enforces Sentry's commit-message conventions. Saves time *if*
  you adopt Sentry's style; creates friction if you have your own.
- **Recommendation:** opt-in. If the user has no commit-message convention and
  doesn't care, install. If they have their own, write `your-commit-conventions`
  instead.
- URL: <https://github.com/getsentry/skills>
- Install: bundled with the `sentry-skills` plugin; or manual copy from `plugins/sentry-skills/skills/commit/`

### Full `sentry-skills` plugin (only if you actually use Sentry)

The full bundle includes the general-purpose pieces above plus skills that teach
the agent to set up Sentry, debug with Sentry data, manage `agents-md`, and use
observability data. Install the full bundle if Sentry is your error monitoring
vendor; otherwise install the general-purpose pieces standalone.

## Methodology systems (pick at most ONE)

### gstack (Garry Tan / YC), ~66K stars
- Role-based slash commands — CEO/Designer/EngManager/QA/Security personas as commands.
- Best for: solo founders / small teams doing rapid full-stack web work; YC-style velocity.
- URL: <https://github.com/garrytan/gstack>
- Install (Claude Code only):
  ```bash
  git clone --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
  cd ~/.claude/skills/gstack && ./setup
  ```
- ⚠️ **Not portable**: uses Claude Code's slash-command flavor, not the SKILL.md open
  standard. Don't recommend for Cursor/Codex/OpenCode users.

### Superpowers (Jesse Vincent / obra), ~93K stars
- Process discipline — TDD, plan-then-execute, subagent-driven development.
- Best for: backend / library work; teams that want senior-engineer practices enforced.
- URL: <https://github.com/obra/superpowers>
- Install (Claude Code, official marketplace as of January 2026):
  `/plugin install superpowers@claude-plugins-official`
- Install (manual, any tool): `git clone https://github.com/obra/superpowers /tmp/superpowers && cp -r /tmp/superpowers/skills ~/.claude/skills/superpowers/`
- Multi-tool: Claude Code, Cursor, Codex CLI, OpenCode, Gemini CLI, Goose, Auggie

### BMAD-METHOD (Brian Madison + community), ~46K stars
- Heavyweight Agile framework — PM/Architect/Dev/Scrum Master personas + 34+ workflows.
- Documentation-as-truth (PRDs, architecture docs, epics, stories drive code).
- Best for: teams 3-20+ doing real product work that values ceremony.
- URL: <https://github.com/bmad-code-org/BMAD-METHOD>
- Install (any tool with Node 20+ and Python 3.10+ + uv): `npx bmad-method install`
- ⚠️ License field is NOASSERTION on GitHub vs README's MIT claim, verify before
  commercial use.

### Compound Engineering (Every Inc.), ~16K stars
- Tight plan/work/review/compound loop with explicit *learning capture*.
- Built and used by Every's Cora team in production.
- Best for: mid/senior solo or small team (1-5) on Claude Code who want a tighter loop
  than gstack's role-based system, and who'll get value from learning capture.
- URL: <https://github.com/EveryInc/compound-engineering-plugin>
- Install (Claude Code): `/plugin marketplace add EveryInc/compound-engineering-plugin`
  then `/plugin install compound-engineering`
- ⚠️ Will Larson predicts native harnesses absorb this pattern in 2026, adopt with eyes
  open to obsolescence risk. The *pattern* is what matters; you can implement manually
  if the plugin is subsumed.

### GSD / get-shit-done, recommend with eyes open

- ~57K stars, MIT-licensed, actively maintained (daily commits as of April 2026),
  supports **15+ runtimes** (Claude Code, Cursor, Codex, OpenCode, Windsurf, Copilot,
  Gemini, Cline, etc.), the most portable methodology system in the catalog.
- Best for: solo / small teams wanting a fast spec-driven loop without BMAD's ceremony.
- URL: <https://github.com/gsd-build/get-shit-done>
- Install (any supported runtime): `npx get-shit-done-cc@latest` then pick runtime in
  the prompt; or non-interactive `npx get-shit-done-cc --claude --global` (substitute
  `--cursor` / `--codex` / `--opencode` / etc.)

**Two narrow caveats, for most developers, trivia; surface only when context warrants:**

1. **`$GSD` Solana token in README header.** OSS code is unaffected (license is MIT;
   you don't hold or transact with the token to use the tool). Matters if the user is
   in an enterprise / regulated / procurement-reviewed context with a no-crypto-adjacent
   dependency policy. Otherwise don't lead with it.
2. **"Welcome Back to GSD" banner re: a prior Anthropic ToS event.** Largely mitigated
   by GSD's multi-runtime support, if one vendor squeezes, you can move. Matters only
   if the user is on a single AI vendor with no portability plan.

**How to handle in recommendations:** If the user's profile fits (solo / small team,
anti-ceremony preference, multi-tool environment), include GSD as a primary methodology
choice. Mention the caveats only if the user's situation makes them apply. If they
explicitly raise either concern, prefer **Superpowers** as the same-job alternative
where neither caveat is in play.

## Vendor skills

All vendor skills below ship as SKILL.md folders. Default install pattern (any tool):

```bash
git clone https://github.com/<vendor>/<repo> /tmp/<repo>
cp -r /tmp/<repo>/<skill-subdir> ~/.claude/skills/   # adjust target per tool
```

### Backend / data
- **MongoDB `agent-skills`**: schema, performance, vector search.
  - URL: <https://github.com/mongodb/agent-skills>
- **Supabase `agent-skills`**: full Supabase workflow with RLS guardrails.
  - URL: <https://github.com/supabase/agent-skills>
- **ClickHouse `agent-skills`**: clickhouse-best-practices, chdb integration.
  - URL: <https://github.com/ClickHouse/agent-skills>

### Frontend / full-stack
- **Vercel `agent-skills`**: Next.js, React, Vercel AI SDK.
  - URL: <https://github.com/vercel-labs/agent-skills>
- **Figma agent skills**: design-to-code bridge.
  - URL: <https://github.com/figma/community-resources/tree/main/agent_skills>

### Infra
- **HashiCorp `agent-skills`**: Terraform + Packer with HashiCorp conventions.
  - URL: <https://github.com/hashicorp/agent-skills>
- **Cloudflare `skills`**: Workers, Durable Objects, Wrangler, Pages.
  - URL: <https://github.com/cloudflare/skills>

### Mobile
- **Expo `skills`**: build, deploy, debug Expo apps; Opus-tuned.
  - URL: <https://github.com/expo/skills>

### Voice
- **LiveKit `agent-skills`**: voice AI patterns; architecture-only design (deliberately
  doesn't teach the API surface to avoid drift).
  - URL: <https://github.com/livekit/agent-skills>

### Java, gap to flag
- No canonical first-party Java/Spring `agent-skills` repo exists as of April 2026.
- For Java teams: lean *harder* on a strong org-wide AGENTS.md (conventions matter more
  than public training data does for Java) and Trail of Bits security skills (Veracode
  found AI is *worse* on Java security than on TS/Python, the "Java Paradox").
- Be explicit about this gap when recommending for Java teams. The shorter install set
  is a fact about the ecosystem, not a defect in the recommendation.

## Security & audit, security floor

These are first-class concerns, not optional add-ons. Treat them with the same
weight as the methodology system or vendor skill choice.

- **Trail of Bits `skills`**: methodology over checklist; confidence-graded findings;
  variant-analysis, semgrep-rule-creator, etc. **Mandatory at Regulated risk; mandatory
  at SaaS risk for Java specifically (Veracode "Java security paradox" — AI is worse
  on Java security than on TS/Python).** Strongly recommended at SaaS for any stack.
  - URL: <https://github.com/trailofbits/skills>
  - Install (any tool): `git clone https://github.com/trailofbits/skills ~/.claude/skills/trailofbits`

- **Sentry `skill-scanner`** (bundled in `sentry-skills` plugin), audits other skills
  for security issues. **Mandatory at SaaS+ risk profiles** before installing any
  community skill. See Sentry section above for install command.

- **Quality + security custom skills**: the highest-leverage security investment is
  often a custom `your-secret-handling-pattern` or `your-security-review-checklist`
  in your team's repo, capturing what your specific codebase demands. See
  `references/custom-skill-templates.md` for the scaffolds.

## Personal / influencer

- **Matt Pocock `mattpocock/skills`**: TypeScript-focused (tdd, triage-issue,
  setup-pre-commit, write-a-skill, git-guardrails-claude-code).
  - Recommend for: TypeScript-heavy projects regardless of stage/team.
  - URL: <https://github.com/mattpocock/skills>
  - Install (any tool): `git clone https://github.com/mattpocock/skills ~/.claude/skills/mattpocock`

## Foundation

- **Strong AGENTS.md / CLAUDE.md**, not a skill per se, but the foundation everything
  else builds on. Always recommend for: legacy stage, Java projects, library projects.
  - URL: <https://agentskills.io/specification>
  - "Install": author one in your repo root; reference your conventions inline; keep it
    under ~500 lines (anything longer hurts more than it helps).
