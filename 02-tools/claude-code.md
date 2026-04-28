---
title: Claude Code
summary: My pick for agentic, multi-file work. Terminal-based. Strong at explaining unfamiliar codebases.
tags: [tool, claude-code, agents, terminal]
related:
  - ./cursor.md
  - ../05-workflows/agents.md
  - ../05-workflows/skills-ecosystem.md
  - ../04-understanding-and-context/context-engineering.md
last_updated: 2026-04-25
---

# Claude Code

I was late to this one and I regret it. For agentic work, telling the AI to do something and letting it figure out the steps, Claude Code is the best I've used.

Last month I pointed it at a legacy codebase I'd never seen and asked it to explain the authentication flow. Twenty minutes later I had a clear mental model of code that would have taken me half a day to untangle myself.

For refactoring, it's genuinely impressive. "Rename this module and update all the imports and tests" used to be an hour of careful manual work. Now it's five minutes of review.

**March 2026 updates:** "Auto mode" research preview (March 24) lets the AI decide which actions are safe to take without asking. Computer use was added (March 25), Claude can now open files, click, navigate your screen. Default output tokens increased to 64k for Opus 4.6. The `/memory` command and auto-memory feature now persist learned facts across sessions to `~/.claude/CLAUDE.md` (see [07 — Memory / Vendor-native](../07-memory/vendor-native.md#3-claude-code-memory)).

The downside: it's terminal-based, which isn't for everyone. And it can be expensive if you're doing a lot of complex work, the token costs add up.

**Who it's for:** developers comfortable in the terminal who work on complex, multi-file tasks. If you're mostly writing new code in a single file, [Cursor](./cursor.md) is probably better.

## Related reading

- [Skills](../06-skills/), `CLAUDE.md`, `/security-review`, gstack, Superpowers
- [Memory](../07-memory/), `/memory`, auto-memory, claude-mem
- [Context engineering](../04-understanding-and-context/context-engineering.md), feeding Claude your project conventions
- [AI for maintenance](../08-quality/ai-for-maintenance.md), explaining and modernizing legacy code
