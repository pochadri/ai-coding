---
title: Technical Excellence in the AI Age
summary: Excellence matters more, not less. The skills that matter are shifting from typing to judgment.
tags: [excellence, judgment, horizontal-concerns, observability]
related:
  - ../09-security/threat-landscape.md
  - ../03-effective-use/review-discipline.md
  - ../05-workflows/spec-driven-development.md
last_updated: 2026-04-27
---

# Technical Excellence in the AI Age

Does technical excellence still matter if AI is writing the code?

The answer is more nuanced than the hot takes suggest. Short version: yes, more than ever and the form it takes is shifting.

## The volume problem (in one paragraph)

AI didn't change the *probability* that any given line is bad. It changed the *rate* at which lines are produced by an order of magnitude. Quality discipline that scaled fine at 50 lines/day breaks at 50,000. Same proportional defect rate, much bigger absolute problem, across security, observability, error handling, and every other quality dimension.

The full data on the security side of this (Veracode 55%, Black Duck 107% YoY, Aikido 1-in-5 breaches) lives in [09 — The threat landscape](../09-security/threat-landscape.md). This page focuses on the *quality* response, what to do about the volume problem when you can't slow it down.

## Technical Excellence Matters More

Here's the paradox: technical excellence matters **more** in the AI age, not less.

If AI generates mediocre code by default, you need the judgment to recognize mediocrity. If AI introduces vulnerabilities at scale, you need the knowledge to catch them. If AI creates technical debt faster than humans ever could, you need the discipline to prevent it.

The skills that matter are shifting:

- **Less:** syntax memorization, typing speed, boilerplate writing
- **More:** system design, security awareness, code review, specification, judgment

I spend less time writing code and more time reviewing it, understanding it, and deciding what should exist in the first place. The implementation is faster. The thinking isn't.

## Horizontal Concerns

The classic cross-cutting concerns, logging, monitoring, error handling, security, accessibility, internationalization, become even more important with AI-generated code.

Why? Because AI generates code that works in the happy path. It often forgets about observability. It doesn't instrument for debugging. It doesn't think about what you'll need when something goes wrong in production at 2am.

I now include horizontal concerns explicitly in [specs](../05-workflows/spec-driven-development.md):

- "All public methods must have structured logging at DEBUG level"
- "All error paths must include correlation IDs"
- "All database operations must have timing metrics"
- "All endpoints must enforce authn/authz before invoking business logic"
- "All user-visible errors must have a generic message; the detailed error goes only to logs"

If you don't specify these, you won't get them. And then you'll spend hours adding them later when you're trying to debug a production incident.

## Related reading

- [09 — The threat landscape](../09-security/threat-landscape.md), the highest-stakes excellence concern, treated comprehensively
- [Review discipline](../03-effective-use/review-discipline.md), how excellence shows up at PR time
- [Spec-driven development](../05-workflows/spec-driven-development.md), encoding horizontal concerns up front
