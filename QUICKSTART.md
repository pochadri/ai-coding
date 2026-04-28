---
title: Quick start
summary: The 5-minute version. If you do nothing else from this guide, do these three things tomorrow.
---

# Quick start

You don't need to read the whole guide before you start using AI coding tools well. You need to do three things, and they take about an hour combined. The rest of the guide is for when you want to go deeper.

If you want the reasoning behind each recommendation, click through to the linked pages.

## The three things

### 1. Pick one tool. Pay for it. Don't deliberate for more than a day.

If you don't have a strong preference: **start with [Claude Code](./02-tools/claude-code.md)** if you spend most of your time in a terminal, or **[Cursor](./02-tools/cursor.md)** if you live in an IDE. Both work. Indecision costs more than picking the "wrong" one.

The flat per-seat era is ending; expect to pay $20-150 per month per developer at serious-use levels. The [tools comparison](./02-tools/) covers the trade-offs if you want them.

### 2. Write an AGENTS.md in your repo root.

Even thirty lines is enough. The single highest-leverage thing you can do for the next six months of your team's AI usage is tell the agent your conventions in plain English so it stops re-discovering them every session.

A starting template lives in [`12-adoption/templates/agents-md-org-template.md`](./12-adoption/templates/agents-md-org-template.md). Copy it, strip what you don't need, fill in your stack and your two or three biggest "AI keeps doing this wrong" patterns, commit it. You'll iterate on it forever; the first version doesn't need to be good.

If you want a defensible behavioral baseline before you've written your own conventions, the [`andrej-karpathy-skills` CLAUDE.md](https://github.com/forrestchang/andrej-karpathy-skills) (~95K stars; `curl -o CLAUDE.md https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md`) is a solid starting point. Layer your project-specific AGENTS.md on top of it.

### 3. Set up the security floor.

Three things, in order of leverage:

- **Run a static analyzer on every PR.** Semgrep, Snyk, or CodeQL. Pick the lowest-friction option that runs on every PR. See [09 — Defenses, Tier 1 #2](./09-security/defenses.md).
- **Add secret-scanning pre-commit AND in CI.** [`gitleaks`](https://github.com/gitleaks/gitleaks) or [`detect-secrets`](https://github.com/Yelp/detect-secrets) wired through `pre-commit` framework, plus the same in CI. The cheapest, highest-yield defense most teams aren't running.
- **Install `skill-scanner`** before you install any community skill. It's published in [Sentry's open skills repo](https://github.com/getsentry/skills) but is product-agnostic; it audits any skill for security issues. See [09 — Defenses, Tier 1 #5](./09-security/defenses.md).

That's the floor. If your project is touching customer data or money, also read the rest of [09 — Security](./09-security/) before you ship.

## What to do this week

If you have another two hours after the three things above:

- Read [Where AI helps (and where it doesn't)](./03-effective-use/where-ai-helps.md) so you know what to use AI for and what to skip.
- Try the [interactive skill picker](./06-skills/picker.md) and install the 2-3 skills it suggests. Don't install more.
- Take the [maturity assessment](./12-adoption/assessment.md) if you're rolling AI out across a team.

## What to read this month, in order

If this resonated and you want the deeper version:

1. [Failure modes nobody talks about](./03-effective-use/failure-modes.md) — what goes wrong before you've experienced it yourself.
2. [Prompting patterns that work](./03-effective-use/prompting-patterns.md), then [the prompt library](./PROMPTS.md) for copy-pasteable starters.
3. [Spec-driven development](./05-workflows/spec-driven-development.md) — the workflow that closed most of my "AI generates the wrong thing" gap.
4. [Skills, what are they](./06-skills/what-are-skills.md) and [how to write your own](./06-skills/building-your-own.md) — the highest-leverage long-term investment.
5. [09 — Security](./09-security/) in full. The folder I most want you to read.

## What you should not do

A short list of things I see teams do that don't work, just so you can skip them:

- Don't install ten skills on day one. Three is the experienced-practitioner default. Start with one or two.
- Don't bench AI usage on a feature branch and then merge in one big bang. Use it for small commits from the start; the muscle is in the small loops.
- Don't measure success by "lines of code generated." Use [DX Core 4 / DORA-flavored metrics](./10-team-and-process/measuring-impact.md) or your own throughput-and-quality balance.
- Don't trust AI for auth, crypto, or input validation without an explicit second-pass review. The pattern that survives a deadline is in [09 — Defenses](./09-security/defenses.md).

## Where to go next

- I'm new and want the foundations: [why this guide exists](./01-foundations/why-this-guide.md)
- I want to use AI better and I'm already familiar: [where AI helps](./03-effective-use/where-ai-helps.md)
- I'm rolling this out at my company: [12 — Adoption](./12-adoption/)
- I want every prompt I can copy-paste: [the prompt library](./PROMPTS.md)
