---
title: Review Discipline
summary: AI code needs different review than human code. A 5-item checklist.
tags: [review, code-review, quality]
related:
  - ./failure-modes.md
  - ../09-security/threat-landscape.md
  - ../10-team-and-process/for-team-leads.md
last_updated: 2026-04-25
---

# Review Discipline

This is where most teams fail. They adopt AI tools without changing their review practices.

AI-generated code needs DIFFERENT review than human-written code. Humans make typos, forget edge cases, get tired. AI makes different mistakes: subtle logic errors, hallucinated APIs, security vulnerabilities, missing context.

## My review checklist for AI code

1. **Do I actually understand what this does?** (If not, don't approve it.)
2. **Do all the imports and dependencies exist?** (Check the actual registries.)
3. **Are there any obvious security issues?** (SQL injection, hardcoded secrets, etc.)
4. **Are edge cases handled?** (Null, empty, boundary conditions.)
5. **Does this follow our patterns?** (Or is it generic AI code that doesn't fit?)

It sounds like a lot, but it becomes fast with practice. And it's caught real issues many times.

## Related reading

- [Failure modes](./failure-modes.md), the patterns this checklist defends against (hallucinated packages, vibe-coded race conditions)
- [Security](../09-security/threat-landscape.md), what to look for in item #3
- [For team leads](../10-team-and-process/for-team-leads.md), encoding this as team policy
