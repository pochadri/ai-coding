---
title: Claude Code
summary: My pick for agentic, multi-file work. Terminal-based. The strongest tool I've used for explaining unfamiliar codebases and for the multi-step refactoring loop. Where it shines, where it doesn't, and what it actually costs.
tags: [tool, claude-code, agents, terminal, memory, sandbox]
related:
  - ./cursor.md
  - ./recommended-setup.md
  - ../05-workflows/agents.md
  - ../05-workflows/skills-ecosystem.md
  - ../04-understanding-and-context/context-engineering.md
  - ../01-foundations/my-experience.md
last_updated: 2026-04-28
---

# Claude Code

For agentic work — telling the AI to do something and letting it figure out the steps — Claude Code is the strongest tool I've used. It's where I spend most of my AI coding time. This page covers what it actually does well, what it doesn't, how it compares to the IDE-native tools, and what daily use costs in 2026.

I was late to it and I regret it. The version of me from a year ago was using Cursor for everything and treating "let the agent do it" as a demo gimmick. The version of me now opens Claude Code by default for anything multi-file or longer than a single function.

## What it does best

Six task categories where Claude Code has materially shifted how I work:

**Multi-file agentic work.** The flagship use case. "Refactor this module to use the new error wrapper, update all callers, fix the tests." Used to be an hour of careful manual work. Now it's a five-minute spec, twenty minutes of agent execution, fifteen minutes of careful review.

**Reading and explaining unfamiliar code.** I drop Claude Code on a legacy directory I've never seen and ask "walk me through what this does, end-to-end." The 1M context window means I can paste entire subsystems without retrieval pipelines. Routinely saves me a half-day of investigation per question. The [worked example in `07-quality-and-security/ai-for-maintenance.md`](../07-quality-and-security/ai-for-maintenance.md#a-worked-example-the-auth-module-nobody-understood) is a real two-hour case.

**Long-running mechanical tasks.** Dependency upgrades, mechanical migrations, test-coverage backfills, codemod-style work. I queue these and check in later. Success rate is roughly 80% on first attempt, 95% after one round of correction.

**Cross-cutting refactors with a spec.** Anything where the spec fits in 100 lines and the change is under ~1,500 lines of touched code. Beyond that, the agent loses the plot and you're better off splitting the work yourself.

**The "what could go wrong" pre-mortem.** I prompt the agent with the diff and ask "what fails in production for this code." It catches ~30% of the issues a human reviewer would catch, in 30 seconds, against zero of my time. Doesn't replace review; complements it.

**Security review as a separate session.** The AI-vs-AI pattern (different session, prompted as a security engineer) catches injection risks, missing authz checks, and deserialization gotchas that the generation session would have rationalized past. See [09 — Defenses](../07-quality-and-security/defenses.md#ai-vs-ai-review-a-separate-model-reviews-the-first-models-output) for the worked example.

## What it doesn't do well

Honest about the limits:

**Single-line autocomplete.** This is what Cursor and Copilot are for. Claude Code can do it but the round-trip latency makes it the wrong tool for "complete the line I'm typing." I keep Cursor running in parallel for inline-completion work.

**Anything where you need to see the change visually as you make it.** Pure CLI output. If your work is layout-heavy or you need to see rendered output side-by-side with code, an IDE-native tool fits better.

**Java security-critical code.** This isn't a Claude Code limitation specifically — it's the [Java security paradox](../07-quality-and-security/threat-landscape.md). Any agent on Java needs more security review than the same agent on TypeScript or Python. Claude Code is no exception.

**Very large refactors.** Past about 1,500 lines of touched code or more than 30 files in a single change, I'd split the work into smaller agent sessions or fall back to a deterministic codemod for the mechanical part and Claude Code for the judgment-required edges.

**Cross-service contract changes.** Same as every other agent: it sees one repo, not the three downstream services that consume the API you just changed. [Code knowledge graphs](../06-skills-and-memory/artifact-memory.md) close part of this gap; nothing closes all of it.

## Things that have changed in the last six months

The tool moves fast. Six deltas worth knowing as of April 2026.

The biggest practical shift was the **1M context window** (rolled out broadly in late 2025). Most of the RAG pipelines I'd built a year ago are no longer load-bearing; I just paste the relevant subsystem into context. Closely related: **64k output tokens default** for Opus 4.6 (early 2026) means long generations are now genuinely long. I write longer specs than I used to and get back complete implementations more often.

The **`/memory` command** with auto-memory persists learned facts across sessions to `~/.claude/CLAUDE.md`, load-bearing for projects that go beyond a single week (see [07 — Memory / Vendor-native](../06-skills-and-memory/vendor-native.md#claude-code-memory)). **Permission modes** (sandbox and approval gates) are the safety floor — the most restrictive mode requires per-action approval; intermediate modes constrain shell, file-write, and network access. I default to a moderately-restrictive mode and tighten for anything touching secrets or production.

Two newer features I treat as power-features rather than defaults: **Auto mode** (March 24, 2026 research preview) lets the agent decide which actions are safe to take without asking — I use it for read-only and clearly-scoped work and don't use it for anything touching auth, secrets, or state-changing external APIs. **Computer use** (March 25, 2026) lets Claude open files, click, and navigate the screen — useful for tasks that span tools (code + browser + terminal), but on for specific workflows, off by default.

## When to pick Claude Code vs Cursor vs Codex

The matrix I use:

- **Multi-file agentic work** → Claude Code, every time.
- **Inline completion while typing** → Cursor or Copilot. Claude Code is the wrong tool for this.
- **IDE-native pair-programming with visible diffs** → Cursor.
- **OpenAI-ecosystem teams or specific Codex workflows** → Codex CLI.
- **Reading unfamiliar code** → Claude Code, with the 1M context window pasted in.
- **Quick scratch work in a fresh repo** → whichever you have open.

For most senior-engineer workflows in 2026, the practical answer is "Claude Code as primary harness, Cursor or Copilot for IDE-native completion, kept on in parallel." That's my setup; details in [recommended setup](./recommended-setup.md).

## Sandbox modes worth knowing

Claude Code's permission modes are the closest thing to "AI safety controls you can actually configure." Worth understanding:

- **Plan mode**: agent reasons about what it would do; doesn't execute.
- **Approve-each-action mode**: every file write, shell command, or network call requires explicit confirmation. The safest mode; right default for anything new.
- **Approve-on-risk mode**: read-only and clearly-scoped operations execute without asking; risky operations (file deletion, git push, network egress, external API calls) prompt.
- **Auto mode**: the agent decides. Use for tightly-scoped read-only or low-stakes work; don't use for anything you'd be uncomfortable explaining in an incident review.

The sandbox is the last line of defense against prompt-injection attacks (see [supply chain](../07-quality-and-security/supply-chain.md)). If it's wide open, those attacks have full reach. Default to the most restrictive mode tolerable; loosen deliberately, not by accident.

## What it actually costs

The honest number: about **$200/month at serious daily-power-user use** (4+ hours/day in the tool). The pricing model shifted from flat per-seat to usage-billed-on-top in early 2026. Anthropic's published benchmark for serious users is ~$13 per developer per active day, which lands in the $150-250/month range.

For an occasional user, the math is much lighter (and the cheaper Sonnet-only plan at ~$20/month covers a lot). For a senior engineer's hour, $200/month is a few hours of saved time, easily justified at my usage level. For a junior engineer or someone using AI for occasional autocomplete, the per-seat case is harder.

The cost most teams underestimate isn't the subscription; it's the operational cost (review time, scanner infrastructure, custom skill authoring, AGENTS.md curation). See [my experience](../01-foundations/my-experience.md#what-it-actually-costs) for the full breakdown.

## Related reading

- [Cursor](./cursor.md), the IDE-native companion in the same kit
- [Recommended setup](./recommended-setup.md), full kit and current pricing
- [Skills](../06-skills-and-memory/), the highest-leverage long-term investment for any Claude Code team
- [09 — Security / Defenses](../07-quality-and-security/defenses.md), sandbox modes and the AI-vs-AI security review pattern
