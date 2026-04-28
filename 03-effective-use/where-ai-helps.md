---
title: Where AI Helps (and Where It Doesn't)
summary: A clear mental model of when to lean on AI and when to ignore it, organized by Great / Mediocre / Bad.
tags: [use-cases, judgment, decision]
related:
  - ./prompting-patterns.md
  - ./review-discipline.md
  - ./failure-modes.md
  - ../09-security/threat-landscape.md
last_updated: 2026-04-25
---

# Where AI Actually Helps (And Where It Doesn't)

After two years, I have a pretty clear mental model of when to lean on AI and when to ignore it.

## AI Is Great For

**Boilerplate.** Setting up a new React component, writing CRUD endpoints, scaffolding tests, anything where the pattern is well-established and you're just filling in blanks. This is where the productivity claims are most valid.

**Syntax you can't remember.** I work in five languages and can never remember the exact syntax for Python's datetime formatting or TypeScript's generic constraints. AI is faster than googling.

**Explaining unfamiliar code.** Seriously, this is underrated. "What does this function do?" with a confusing code block saves me so much time when diving into legacy systems.

**First drafts of documentation.** I hate writing docs. AI writes decent first drafts that I can edit into something good.

**Test generation.** Not perfect, but getting a scaffold of tests that I then refine is faster than writing from scratch.

**Translation between languages.** Need to port Python to Go? AI gets you 80% there and you fix the rest.

## AI Is Mediocre For

**Complex logic.** It'll give you something that looks right but has subtle bugs. Edge cases, off-by-one errors, incorrect boundary conditions. You have to really check it carefully.

**Anything with recent APIs.** The training data cutoff means it suggests deprecated patterns constantly. React code from AI is especially bad about this, it still suggests class components and outdated lifecycle methods.

**Code that needs to integrate with your existing codebase.** AI doesn't know your conventions, your utilities, your patterns. It'll suggest generic solutions instead of using the helper function you already have.

## AI Is Bad For

**Security-critical code.** I've seen AI suggest SQL injection vulnerabilities, hardcoded credentials, insecure cryptography, with complete confidence. Never trust AI for auth code, crypto, input validation, or anything security-sensitive without extremely careful review. See [Security](../09-security/threat-landscape.md).

**Architecture and design.** AI can't reason about system-level tradeoffs. It'll give you working code without considering maintainability, scalability, or how it fits into the bigger picture.

**Novel problems.** If your problem doesn't look like something in the training data, AI is useless or actively harmful. It'll confidently generate something that looks plausible but is completely wrong.

**Performance-critical code.** AI optimizes for correctness, not speed. It'll give you O(n²) when O(n log n) exists, N+1 queries all day long, unnecessary allocations everywhere.

## The Rule I Follow

If I'm working on something where getting it wrong would cause real problems, security, data integrity, financial calculations, I write it myself. AI is for low-stakes code and first drafts. **It's a copilot, not an autopilot.** The naming was actually appropriate.

## Related reading

- [Prompting patterns](./prompting-patterns.md), getting better output from any tool
- [Review discipline](./review-discipline.md), what to check before merging AI code
- [Failure modes](./failure-modes.md), vibe coding, hallucinations, atrophy, tech debt
- [Security](../09-security/threat-landscape.md), why this is the highest-stakes category
