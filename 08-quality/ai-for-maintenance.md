---
title: AI for Maintenance
summary: Helpful for explaining legacy code and finding related code. Limited at understanding cross-system impact and "why".
tags: [maintenance, legacy, modernization]
related:
  - ./when-things-go-wrong.md
  - ../07-memory/
  - ../04-understanding-and-context/understanding-problem.md
last_updated: 2026-04-25
---

# AI for Maintenance

Here's a question I'm actively exploring: can the same tools that generate code also help maintain it?

## What's Working

**Explaining legacy code.** I've pointed [Claude Code](../02-tools/claude-code.md) at decade-old codebases and asked "what does this do?" It's genuinely helpful for understanding systems nobody remembers.

**Finding related code.** "Where else in the codebase do we handle authentication?" This is faster than `grep` and understands semantic similarity.

**Suggesting modernization.** "How would you rewrite this Python 2 code for Python 3?" Useful starting points for migration work.

**Documentation generation.** I've used it to generate docs for undocumented APIs. Not perfect, but better than nothing.

## What's Not Working (Yet)

**Understanding cross-system impact.** The AI sees one codebase. It doesn't see the other services that depend on it. It doesn't see the production traffic patterns. It suggests changes that would break things it can't see. *(Code knowledge graphs like [GitNexus and graphify](../07-memory/artifact-memory.md) close part of this gap, they let the agent query call graphs and dependencies. Doesn't solve cross-service contracts, but it's real progress.)*

**Maintaining consistency over time.** This was a hard constraint a year ago, every session was fresh and the agent forgot decisions. It's no longer fully true: vendor memory (Claude `/memory`, Copilot Memory, Codex Memories) plus interaction-memory tools like claude-mem actually do carry decisions across sessions now. You still have to *curate* what gets remembered, memory drift is real, but the core problem is solved enough to lean on.

**Understanding "why" not just "what."** AI can tell you what the code does. It can't tell you why it was written that way. The historical context, the constraints that existed, the bugs it was fixing. That context lives in git history and human memory, not in the code itself.

## The Maintenance Workflow I'm Developing

For maintenance tasks, I'm trying:

- **Start with architecture docs.** Before touching anything, update the architecture documentation. This gives the AI context for future sessions.
- **Use git blame actively.** Before changing old code, I check who wrote it and when. If it's recent and from a current team member, I ask them. If it's ancient, I treat it more carefully.
- **Agent for investigation, human for decision.** I let the agent explore and explain. I make the decisions about what to change.
- **Incremental changes with validation.** Small changes, run tests, deploy to staging, monitor. Don't let the agent refactor fifty files at once.

## The Dream vs. Reality

The dream: AI that understands your entire system, maintains it over time, catches issues before they become problems, and suggests improvements.

The reality: AI that's helpful for specific tasks but requires constant human oversight, re-teaching, and correction.

We'll get there eventually. We're not there yet. For now, AI is a powerful assistant for maintenance work, not an autonomous maintainer.

## Related reading

- [When things go wrong](./when-things-go-wrong.md), debugging AI code in production
- [The understanding problem](../04-understanding-and-context/understanding-problem.md), why "why" is hard for AI
- [Claude Code](../02-tools/claude-code.md), the author's go-to maintenance tool
