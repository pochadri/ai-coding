---
title: Cursor
summary: VS Code fork with codebase-aware AI; the IDE-native companion to Claude Code in my daily kit. The v3 "Glass" agents window changed the use case; Composer 2 changed the cost calculus. What it does well, where Claude Code wins, and what to know about pricing and the memory regression.
tags: [tool, cursor, ide, agents, composer-2, glass, memories]
related:
  - ./claude-code.md
  - ./recommended-setup.md
  - ../04-understanding-and-context/context-engineering.md
  - ../05-workflows/agents.md
  - ../07-memory/practice-and-risks.md
last_updated: 2026-04-28
---

# Cursor

Cursor is the IDE-native side of my daily kit. I use [Claude Code](./claude-code.md) for agentic, multi-file, terminal-driven work; I use Cursor for the in-editor inline-completion and pair-programming-with-the-buffer-open work that Claude Code is the wrong tool for. The two complement each other; neither replaces the other.

This page covers what Cursor does well, where it falls behind in 2026, the v3 "Glass" update that reshaped how I use it, the Composer 2 model and what it means for cost, and the memory regression in v2.1.x that you need to know about.

## What it does best

The killer feature, still: **codebase-aware completion**. When I ask Cursor to help me implement something inline, it references relevant code from other files in the project. It picks up that I have a `UserRepository` and uses it instead of inventing a generic ORM call. It picks up our error-wrapping convention without having to be told. Copilot, even in 2026, still doesn't do this as well.

Specific patterns where Cursor is the right tool:

- **Inline completion while typing.** The latency is right; the codebase-aware suggestions are right. Claude Code is the wrong tool for this.
- **In-editor refactoring with visible diffs.** When I need to see the change side-by-side with the original as I make it, Cursor wins. Pure CLI output (Claude Code) is harder for this.
- **Quick scratch work in a fresh repo.** When I haven't yet set up an AGENTS.md or skills, Cursor's defaults are reasonable enough to be productive immediately.
- **Working with non-engineers in a pair.** Designers, PMs, support engineers can sit next to me and follow along visually. The terminal isn't accessible the same way.
- **JetBrains-shop teams via the ACP integration.** As of March 2026, Cursor's agent connects via the Agent Communication Protocol to JetBrains IDEs. Real for teams that don't want to leave IntelliJ.

## What Claude Code does better

The trade-off cuts both ways. For these tasks I switch out of Cursor and into Claude Code:

- **Multi-file agentic work** where the agent should reason about the whole change, not just the buffer in front of you. Claude Code's harness handles this better.
- **Reading and explaining unfamiliar codebases.** Pasting a 100K-line subsystem into a 1M-context Claude Code session beats Cursor's IDE-bound interaction model for understanding work.
- **Long-running tasks I want to queue and check on later.** Cursor is designed for active, in-editor work; Claude Code's sandbox modes and approval gates are designed for "let it work, come back to it."
- **Anything where the security review pass is a separate-model session.** The cross-family review pattern (described in [09 — Defenses](../09-security/defenses.md#ai-vs-ai-review-a-separate-model-reviews-the-first-models-output)) is operationally easier when one tool generates and another reviews. Cursor + Claude Code is a natural split.

## v3 "Glass" and parallel agents

Cursor v3 (April 2, 2026) is a complete interface rebuild centered on agents. The headline feature is the **Agents Window**, which supports parallel agent execution across local, cloud, and remote environments. You can have three agents working on three different aspects of the same feature, in parallel, and review their output as it lands.

In practice I use this for two patterns:

- **Parallel exploration.** When I'm not sure which approach is right, I'll spin up two agents with different framings of the same problem and compare what they produce. Faster than serially trying both.
- **Plan + execute split.** One agent in planning mode produces the spec; another agent picks up the spec and starts implementation. The handoff is built into the tool now rather than something I orchestrate manually.

There's also a **Design Mode** that lets you annotate UI elements directly. Useful if you're doing frontend work; not relevant for my backend-heavy use.

## Composer 2 and the cost calculus

Cursor's in-house model **Composer 2** (launched March 19, 2026, built on Kimi K2.5) shifted the cost picture. The relevant data point: Composer 2 scores 61.7 on Terminal-Bench 2.0, beating Claude Opus 4.6 (58.0), at roughly 1/10th the per-call cost.

What this means in practice:

- For mechanical agentic work where you don't need Opus-grade reasoning, Composer 2 is now genuinely competitive and an order of magnitude cheaper.
- For the specific tasks where Opus's reasoning still matters (security-critical work, novel architecture decisions, anything where being wrong in subtle ways is expensive), I still pay for Opus. The gap closed but didn't disappear.
- The "fast" / "slow" request pricing model on Cursor remains confusing. Heavy users burn through credits quickly; expect to spend at least $40-60/month for serious daily use, or more if you lean on Opus through Cursor's BYOK option.

The honest take: Composer 2 is a real shift, but I haven't migrated my high-stakes work to it. For exploration, mechanical refactors, and routine in-editor completion, it's now my default in Cursor. For anything I'd be uncomfortable explaining in an incident review, I still route through Claude Code with Opus.

## The memory regression you need to know about

Cursor introduced **"Memories"** in mid-2025, the kind of cross-session learned context that Claude Code's `/memory` provides today. They **removed it in v2.1.x** and told users to migrate to static Rules. Rules aren't memory — they don't learn, they don't update based on what you've done, they don't accumulate corrections over time. They're configuration.

If you want real persistent memory in Cursor, the third-party MCP-based options are the workaround. See [07 — Memory / Cursor user](../07-memory/practice-and-risks.md#cursor-user) for the current set. None are as integrated as Claude Code's native `/memory`; you're stitching it together.

This is the single biggest reason I default to Claude Code as the primary harness rather than Cursor. The memory layer matters more than I expected when I started tracking the difference.

## Other rough edges worth knowing

- **The pricing model with "fast" and "slow" requests is confusing.** Even after a year of use, I still occasionally check the dashboard to figure out where my budget went. Plan to spend more than the headline number suggests.
- **Code reversion bug in March 2026.** Cursor silently undid user changes in certain workflows. Patched, but worth knowing — git is your safety net regardless of tool.
- **Another IDE to maintain.** If you're already happy in VS Code or JetBrains, Cursor adds a config-and-extension migration cost. Worth it for daily-driver use; overkill for occasional.
- **Pricing shifts in early 2026** moved toward usage-billed-on-top, in line with the rest of the market. The flat-per-seat era is over.

## Who it's for, in one paragraph

If you spend ≥4 hours a day in an IDE and want AI baked in deeply, Cursor is the cleanest option I've used. Pair it with Claude Code for the agentic, multi-file, queueable work that an IDE isn't the right surface for. If you're an occasional user who mostly wants AI completion in a familiar editor, GitHub Copilot in VS Code is enough; the switching cost to Cursor isn't worth it.

## Related reading

- [Claude Code](./claude-code.md), the agentic complement in the same kit
- [Recommended setup](./recommended-setup.md), how Cursor fits into the actual stack and current pricing
- [Context engineering](../04-understanding-and-context/context-engineering.md), `.cursorrules` and how to feed Cursor your project conventions
- [The agentic shift](../05-workflows/agents.md), what the Agents Window changes about parallel work
- [07 — Memory / Cursor user](../07-memory/practice-and-risks.md#cursor-user), the third-party MCP options that fill the post-Memories gap
