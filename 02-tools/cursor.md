---
title: Cursor
summary: VS Code fork with codebase-aware AI. The author's daily driver. Now centered on parallel agents.
tags: [tool, cursor, ide, agents]
related:
  - ./claude-code.md
  - ../04-understanding-and-context/context-engineering.md
  - ../05-workflows/agents.md
  - ./recommended-setup.md
last_updated: 2026-04-25
---

# Cursor

This is what I actually use daily. It's a fork of VS Code with AI baked in from the ground up, and the difference is noticeable.

The killer feature is context handling. Cursor actually understands your codebase, not just the current file. When I ask it to help me implement something, it references relevant code from other files. That sounds simple but Copilot still doesn't do it well.

**April 2026 updates:** Cursor launched version 3 "Glass" (April 2), a complete interface rebuild centered on agents. The new Agents Window supports parallel agent execution across local, cloud, and remote environments. Design Mode lets you annotate UI elements directly. Composer 2, their in-house model built on Kimi K2.5, scores 61.7 on Terminal-Bench 2.0, beating Claude Opus 4.6 (58.0) at roughly 1/10th the cost. Earlier updates included Automations (March 5) and JetBrains integration via ACP (March 4).

The downsides: it's another IDE to maintain, you'll need to re-install your extensions, and the pricing model with "fast" and "slow" requests is confusing. Heavy users can burn through credits quickly. There was also a code reversion bug in March that silently undid user changes in certain workflows, since fixed. **Memory note:** Cursor introduced "Memories" in mid-2025 and *removed it in v2.1.x*, telling users to migrate to static Rules. Rules aren't memory, they don't learn. If you want real persistent memory in Cursor, see [07 — Memory / Cursor user](../07-memory/practice-and-risks.md#cursor-user) for the third-party MCP-based options.

**Who it's for:** power users willing to invest in learning a new workflow. If you're going to spend 8 hours a day coding, the better tool is worth the switching cost.

## Related reading

- [Context engineering](../04-understanding-and-context/context-engineering.md), `.cursorrules` and how to feed it your conventions
- [The agentic shift](../05-workflows/agents.md), what the new Agents Window enables
- [Claude Code](./claude-code.md), Cursor's complement for terminal-based agentic work
- [Recommended setup](./recommended-setup.md), how Cursor fits into the author's stack
