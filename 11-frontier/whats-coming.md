---
title: What's Coming Next
summary: Better agents, growing context, tool consolidation, multiplayer collaboration, and the regulatory pressure that shapes all of it. What I'd bet on for the next 18 months and what I think won't change.
tags: [predictions, future, agents, context, ace, multi-agent, regulation]
related:
  - ./recent-updates-april-2026.md
  - ./research-frontier.md
  - ./bottom-line.md
  - ../10-team-and-process/alignment-bottleneck.md
last_updated: 2026-04-28
---

# What's Coming Next

Prediction is hard, especially about the future. Some of these will be wrong. The ones I'd bet on most strongly are the ones grounded in trajectories already visible in 2026, not the ones requiring novel breakthroughs. Six things worth tracking, plus what I think won't change.

## Agents will get materially better at long-horizon work

The agentic tools have improved fast and the curve hasn't flattened. Six months ago I wouldn't trust [Claude Code](../02-tools/claude-code.md) with a refactor over 500 lines. Now I trust it with refactors up to ~1,500 lines, and I've started queuing multi-hour mechanical tasks to run while I work on something else.

What I expect over the next 12-18 months:

- The "queue and check on it later" pattern becomes the default for mechanical work, not the experimental case it is today.
- Multi-step tasks that currently need human handholds (like dependency upgrades that span environments) become reliable enough to run as scheduled jobs.
- The point at which agents lose the plot moves from ~1,500 lines to ~5,000 lines. Beyond that, splitting work remains the right move.

What I don't expect: agents replacing the senior-engineer judgment work (architecture, design trade-offs, security boundaries). The trajectory keeps closing the implementation gap; the judgment gap is structural.

## Context windows will keep growing, but curation matters more

We're already at 1M tokens for some models. The trajectory points to "your entire codebase fits in context" within 12-18 months for most non-monorepo work, and within 24-36 months for monorepos.

The interesting consequence: **the bottleneck shifts from capacity to curation**. Dumping everything into context doesn't help; the signal gets lost in the noise. The teams that win are the ones who get good at deciding *what context is relevant for this task*. See [context engineering](../04-understanding-and-context/context-engineering.md). The ETH Zurich finding that overly detailed AGENTS.md files actually hurt agent performance is the early signal of this.

What gets easier: codebase exploration, large refactors, cross-cutting analysis. Most of my retrieval pipelines from a year ago are no longer load-bearing.

What stays hard: cross-service contracts that don't live in any single repo, decisions that aren't visible in code, and the "why was this written this way" question that lives in human memory.

## Tools will consolidate into a stack, not a winner

Right now there's Copilot, Cursor, Claude Code, Codex, Windsurf, Codeium, Amazon Q, Antigravity, Kiro, and a dozen others. That's too many. Consolidation is coming, but probably not into a single winner.

If I had to bet on the 18-month picture:

- **Microsoft/GitHub will dominate distribution.** Default tool for most enterprises by reach, not by capability.
- **Anthropic (Claude) will be the quality leader for complex work.** Claude Code remains the strongest agentic harness; the model leadership keeps the harness relevant.
- **Cursor will own the IDE-native layer.** The Composer 2 cost calculus shifted things; if Cursor maintains parity-or-better on price, they hold the IDE layer.
- **OpenAI will be the integrated-stack play.** Codex + Windsurf + ChatGPT bundled as the OpenAI-ecosystem answer.
- **Google's Antigravity is the wild card.** Free access to multiple flagship models is a real pricing pressure; if the multi-model orchestration story matures, it could displace single-vendor harnesses.

The end state I expect: developers use 2-3 tools daily, not one. The serious work crosses tools by task. Tools that don't play well with cross-vendor workflows lose ground.

## Collaborative-agent tools will become a real category

Most of today's agent harnesses are single-player. The plan, the prompts, the session log all live on one developer's machine. The team's first view of the work is the pull request, which is far too late for the kind of alignment that matters. This is the [alignment-bottleneck thesis](../10-team-and-process/alignment-bottleneck.md) and it's the most important under-discussed problem in the space.

GitHub's Labs team is the loudest voice arguing this needs to change. Their research prototype **ACE (Agent Collaboration Environment)** puts agent sessions into shared, multiplayer cloud-VM workspaces with shared prompt history, live previews, and integrated PR creation. I haven't used it yet, and I'm not betting on ACE specifically winning the category, but I am betting *something* with this shape becomes mainstream over the next 18-24 months. The single-player default has too many pathologies to survive at the team scale.

What to watch:

- Whether IDE vendors (Cursor, the JetBrains family, VS Code) build first-party multiplayer agent sessions, or whether a separate tool layer like ACE wins the category.
- Whether existing chat / docs vendors (Linear, Notion, Slack) bolt agent sessions on top of their existing collaboration surface, or whether the new pattern needs net-new tooling.
- Whether the practice of "shared planning before agent prompts" becomes a discipline teams adopt with existing tools before the next-gen tooling lands. (My bet: yes, the discipline emerges before the tooling does, and the tooling formalizes the practice once it's established.)

What teams can do today, without waiting, lives in [the alignment bottleneck](../10-team-and-process/alignment-bottleneck.md).

## Regulation catches up faster than the industry expects

The **EU AI Act August 2, 2026 deadline** for the high-risk regime is the most-underestimated date in this space. Most engineering orgs don't have an inventory of AI systems in use, let alone a classification of which fall under Annex III. If you have any EU footprint, this is a 2026 deliverable, not a 2027 one. See [09 — Regulation](../09-security/regulation.md).

What follows the EU AI Act:

- Sector-specific guidance (FDA, FAA, EBA, FCA) at varying speeds. Industries with strong regulators will see AI-specific frameworks within 12-18 months.
- US enforcement via FTC for AI-generated harms in consumer products. The "AI wrote it" defense doesn't exist; expect at least one high-profile FTC action against an AI-generated dark pattern or deceptive flow.
- SOC 2 / ISO 27001 auditors begin asking for AI-specific change-management controls. The era of "we use AI but our SOC 2 doesn't reflect it" ends.

The bet: regulatory readiness becomes a board-level capability separate from the engineering capability. The orgs that treat it that way will be the ones with cleaner audit trails and lower compliance friction.

## What won't change

A few things that the trajectory of the last two years hasn't moved, and that I don't expect the next two years to move either:

- **Understanding the code matters.** AI can write code, but understanding what it wrote, whether it's correct, whether it fits, that's still human work. The shift to "review the diff carefully" is permanent, not transitional.
- **Design matters.** AI doesn't know your users, your constraints, your business context. The hard part of software is figuring out what to build, and that hasn't moved.
- **Judgment matters.** When to use AI, when not to, what to review carefully, what to trust. These are human decisions and they'll remain so.
- **The discipline gap matters.** Teams with strong engineering discipline (specs, review, testing, observability, security) get more out of AI. Teams without it get less, and shipping faster makes the discipline gap a worse-shaped problem, not a better-shaped one.

The developers who thrive will be the ones who treat AI as a powerful tool to amplify judgment, not a replacement for thinking. Those who abdicate judgment to AI will produce a lot of mediocre code very fast. Those who use AI to amplify their judgment will build better products and ship them at higher quality. The bimodal outcome from 2025 keeps holding into 2026.

## Related reading

- [Recent updates (April 2026)](./recent-updates-april-2026.md), the current state these predictions extrapolate from
- [Research frontier](./research-frontier.md), the academic underpinnings of where this is going
- [The bottom line](./bottom-line.md), the closing summary
- [The alignment bottleneck](../10-team-and-process/alignment-bottleneck.md), what to do today before ACE-class tools land
- [09 — Regulation](../09-security/regulation.md), the EU AI Act and what to do about it
