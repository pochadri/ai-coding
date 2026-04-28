---
title: The Understanding Problem
summary: You don't need to understand every line. You need to understand systems, behaviors, and failure modes.
tags: [understanding, comprehension, repository-intelligence, scaling]
related:
  - ./context-engineering.md
  - ../03-effective-use/failure-modes.md
  - ../08-quality/ai-for-maintenance.md
last_updated: 2026-04-25
---

# The Understanding Problem

This is the question nobody wants to ask directly: do we actually need to understand the code anymore?

I've thought about this a lot. My answer is uncomfortable: **you need to understand *enough*, but "enough" has changed.**

## The Old Model Is Dead

Ten years ago, a senior engineer could hold most of a system in their head. They knew every module, every quirk, every reason behind every decision. That model is already dead, killed by microservices, third-party dependencies, and team turnover. AI just accelerated what was already happening.

Nobody understands all of Kubernetes. Nobody understands all of React's internals. We've been building on abstractions we don't fully understand for years. AI-generated code is just another layer of abstraction.

## But You Can't Understand Nothing

Here's where I push back on the "just vibe it" crowd.

When that junior shipped the caching code with the race condition (the vibe-coding story from the failure modes page), the problem wasn't that he didn't understand every line. The problem was he didn't understand the *concept*. He didn't know what a race condition was, so he couldn't recognize one. He didn't understand cache invalidation, so he couldn't spot the flaw.

You need conceptual understanding. You need to know what problems exist in the domain so you can recognize them when they appear. You don't need to understand every line. You need to understand what the code is *trying* to do and what could go wrong.

## Holistic Understanding Over Line-by-Line

I've shifted how I think about code comprehension. Instead of reading every line, I ask:

- What is this component's responsibility? (One sentence.)
- What are its inputs and outputs?
- What are the failure modes? (Network errors, invalid data, race conditions?)
- What are the performance characteristics? (O(n)? O(n²)? Makes network calls?)
- How does it interact with the rest of the system?

If I can answer those questions, I understand "enough" even if I couldn't write every line from scratch. If I can't answer them, I need to dig deeper before shipping.

This is actually closer to how architects have always worked. They don't write every line. They understand the system well enough to make good decisions about it.

## The Scaling Problem

Here's what worries me about large codebases with AI.

When humans write code, they build mental models as they go. They know where things are because they put them there. They remember past decisions because they made them.

For most of 2025, AI agents had no persistent memory across sessions, every new conversation was a cold read of the codebase. That's no longer strictly true; Claude memory, Copilot Memory, claude-mem, code knowledge graphs like graphify and GitNexus all changed it. But the *practical* problem is still real: even with memory features turned on, the agent doesn't know *why* things are the way they are.

For small codebases, this is fine. For large codebases serving multiple use cases with years of accumulated decisions? The AI will keep suggesting changes that violate unwritten rules. It'll propose "improvements" that break assumptions other parts of the system depend on.

I've seen this in practice. I've worked with monorepos of 500k+ lines of code. Claude Code can read it all, but it keeps suggesting patterns that work in isolation but break our cross-service contracts. It doesn't know that we never use library X because of a security incident three years ago. It doesn't know that module Y is deprecated but still in use by two legacy clients.

The solution, as far as I've found one, has two parts. **First, documentation becomes critical.** Not the documentation we've always said we should write. Documentation that captures *why*, not just *what*. Architecture decision records. Context that AI can read and learn from. **Second, persistent memory layers** ([07 — Memory](../07-memory/)) turn that documentation into something the agent actually carries across sessions instead of re-discovering each time.

## The Repository Intelligence Problem

[Anthropic's 2026 Agentic Coding Trends Report](https://resources.anthropic.com/2026-agentic-coding-trends-report) introduced a term I like: "repository intelligence." It's the AI's ability to understand not just code, but the relationships and intent behind it.

Current tools are getting better at this. Claude Code can read your entire codebase and understand dependencies. Cursor's codemaps create structured representations of large codebases. But there's a fundamental limit: **AI can see what's there, but it can't see what's not there.**

It doesn't know about the service that was deprecated last year and shouldn't be referenced. It doesn't know about the performance incident that led to a specific architectural decision. It doesn't know that the CEO's pet project has special requirements.

This is why [context engineering](./context-engineering.md) has become so critical. Martin Fowler calls it "curating what the model sees so that you get a better result." It's becoming as important as the code itself.

## Related reading

- [Context engineering](./context-engineering.md), the in-session practical answer
- [07 — Memory](../07-memory/), the cross-session practical answer
- [AI for maintenance](../08-quality/ai-for-maintenance.md), the *why* problem in legacy systems
