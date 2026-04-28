---
title: When Things Go Wrong
summary: Investigating AI-code bugs, doing impact analysis, and surviving production.
tags: [debugging, impact-analysis, production, incidents]
related:
  - ./ai-for-maintenance.md
  - ../05-workflows/agents.md
  - ../03-effective-use/review-discipline.md
last_updated: 2026-04-25
---

# When Things Go Wrong

Unknown bugs from AI-generated code are a reality. Here's how I handle them.

## The Investigation Is Harder

When a human writes buggy code, you can ask them what they were trying to do. When AI writes buggy code, you can't.

I've developed a checklist for AI-code bugs:

1. **What were the exact prompts that generated this code?** (Check chat history.)
2. **What context did the AI have?** (What was in the window?)
3. **Does this bug exist in isolation or is it a misunderstanding of system context?**
4. **Is this a known AI failure pattern?** (Hallucinated API? Off-by-one? Race condition?)

Most AI bugs I've seen fall into patterns. Once you know the patterns, you know where to look.

## Impact Analysis

How do you know what a change will affect? This was hard before AI. It's harder now because changes can be larger and touch more files (especially with [agents](../05-workflows/agents.md)).

My approach:

- **Run the full test suite.** Obviously. But tests only catch what they test.
- **Static analysis.** I use dependency graphs to see what calls what. If the change touches module X, what depends on X?
- **Git history.** Who else has touched these files? What related changes were made recently?
- **Manual trace.** For critical changes, I still trace through the code path manually. AI can't replace this for high-stakes changes.
- **"What could go wrong?" as an explicit prompt.** I literally ask Claude Code: "Given this change, what could go wrong? What systems might be affected? What edge cases might break?" It doesn't catch everything, but it catches things I miss.

## Production Is a Different Beast

Getting AI-generated code to work in development is one thing. Keeping it working in production is another.

AI doesn't think about:

- **Production load patterns** (it works in tests but what about 10x traffic?)
- **Data edge cases** (it works with clean data but what about the garbage in the legacy table?)
- **Deployment concerns** (it works locally but does it work in the container with limited memory?)
- **Operational needs** (how do we roll this back if it breaks?)

I now include these explicitly in specs and review checklists. "What happens under 10x load?" "What happens if the database connection fails?" "How do we monitor this in production?"

## Related reading

- [AI for maintenance](./ai-for-maintenance.md), using AI to investigate after the fact
- [Agents](../05-workflows/agents.md), why agent diffs are larger and need more careful review
- [Review discipline](../03-effective-use/review-discipline.md), catching issues before they ship
