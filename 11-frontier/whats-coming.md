---
title: What's Coming Next
summary: Better agents, growing context windows, tool consolidation. What stays human.
tags: [predictions, future, agents, context]
related:
  - ./recent-updates-april-2026.md
  - ./research-frontier.md
  - ./bottom-line.md
last_updated: 2026-04-25
---

# What's Coming Next

Prediction is hard, especially about the future. But here's my best guess at where this goes.

## Agents Will Get Better

The agentic tools are improving fast. Six months ago I wouldn't trust [Claude Code](../02-tools/claude-code.md) with significant refactoring. Now I do. In another year? I expect agents will handle more complex tasks more reliably.

This doesn't mean developers become obsolete. It means the nature of the work shifts. Less typing, more reviewing. Less implementation, more design. Less "how" and more "what" and "why."

## Context Windows Will Keep Growing

We're already at 1M tokens for some models. At some point, you can fit your entire codebase in context. That changes the game for codebase understanding and large-scale refactoring.

The challenge becomes [curation, not capacity](../04-understanding-and-context/context-engineering.md). What context is actually relevant? Dumping everything in doesn't help, the signal gets lost in noise.

## The Tools Will Consolidate

Right now we have Copilot, Cursor, Claude Code, Windsurf, Codeium, Amazon Q, and a dozen others. That's too many. I expect consolidation over the next two years. Some acquisitions, some failures, and probably two or three dominant players emerging.

If I had to bet: the tools won't consolidate into a single winner. They're converging into a stack: [Cursor](../02-tools/cursor.md) or an IDE for orchestration, [Claude Code](../02-tools/claude-code.md) or [Codex](../02-tools/openai-codex.md) for agentic execution, with cross-provider plugins enabling multi-model review. Microsoft/GitHub will dominate distribution. Anthropic (Claude) will be the quality leader for complex work. Cursor will own the IDE layer. But increasingly, developers will use all three together rather than choosing one.

## Collaborative-agent tools will become a real category

Most of today's agent harnesses are single-player. The plan, the prompts, the session log all live on one developer's machine. The team's first view of the work is the pull request, which is far too late for the kind of alignment that matters.

GitHub's Labs team is the loudest voice arguing this needs to change, and they've shipped a research prototype called **ACE (Agent Collaboration Environment)** that puts agent sessions into shared, multiplayer cloud-VM workspaces with shared prompt history, live previews, and integrated PR creation. I haven't used it yet, and I'm not betting on ACE specifically winning the category, but I am betting that *something* with this shape becomes mainstream over the next 18-24 months. The single-player default has too many pathologies to survive at the team scale.

What to watch:

- Whether IDE vendors (Cursor, the JetBrains family, VS Code) build first-party multiplayer agent sessions, or whether a separate tool layer like ACE wins
- Whether existing chat / docs vendors (Linear, Notion, Slack) bolt agent sessions on top of their existing collaboration surface, or whether the new pattern is sufficiently different that it needs net-new tooling
- Whether the practice of "shared planning before agent prompts" becomes a discipline teams adopt with existing tools before the next-gen tooling lands

I cover what teams can do today, without waiting for ACE-class tools, in [the alignment bottleneck](../10-team-and-process/alignment-bottleneck.md).

## What Won't Change

**Understanding code matters.** AI can write code, but understanding what it wrote, whether it's correct, whether it fits? That's still human work.

**Design matters.** AI doesn't know your users, your constraints, your goals. The hard part of software isn't implementation, it's figuring out what to implement.

**Judgment matters.** When to use AI, when not to, what to review carefully, what to trust. These are human decisions.

The developers who thrive will be the ones who treat AI as a powerful tool, not a replacement for thinking. Those who abdicate judgment to AI will produce a lot of mediocre code very fast. Those who use AI to amplify their judgment will build remarkable things.

## Related reading

- [Recent updates](./recent-updates-april-2026.md), the current state these predictions extrapolate from
- [Research frontier](./research-frontier.md), the academic underpinnings
- [The bottom line](./bottom-line.md), the closing summary
- [The alignment bottleneck](../10-team-and-process/alignment-bottleneck.md), what to do today before ACE-class tools land
