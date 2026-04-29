---
title: Where AI Helps (and Where It Doesn't)
summary: A clear mental model of when to lean on AI and when to ignore it, organized as Great / Mediocre / Bad. Updated for 2026 capability — the lines moved with 1M context windows, agentic mode, and skills, but the bad-fit categories are still bad.
tags: [use-cases, judgment, decision, where-ai-helps]
related:
  - ./prompting-patterns.md
  - ./review-discipline.md
  - ./failure-modes.md
  - ../07-quality-and-security/threat-landscape.md
last_updated: 2026-04-28
---

# Where AI Actually Helps (And Where It Doesn't)

After two years of daily use, I've converged on a clear mental model of when to lean on AI and when to ignore it. The categories are stable; the membership has shifted. Some tasks that were "mediocre" a year ago are "great" now. Some tasks that were "bad" are still bad and probably always will be. The trick is updating the mental model as capability moves, without sliding into "AI is great for everything."

The single biggest 2026 shift: the **1M context window** moved several reading-and-understanding tasks from "mediocre" to "great." The **agentic mode** moved several multi-file refactor tasks from "mediocre with a lot of supervision" to "default with normal supervision." Almost nothing moved out of the "bad" category.

## AI is great for

These are the tasks where I lean on AI without thinking, and where the productivity gains are most real.

**Reading and explaining unfamiliar code.** The use case where I get the most asymmetric value. Drop Claude Code on a decade-old codebase and ask "walk me through what this does, what assumptions it bakes in, what's likely to break if I touch it." With 1M context, you can paste an entire subsystem and ask cross-cutting questions. Routinely saves me a half-day of investigation per question. The [worked example in 07-quality-and-security](../07-quality-and-security/ai-for-maintenance.md#a-worked-example-the-auth-module-nobody-understood) is a real two-hour case where pre-AI would have been a full day.

**Boilerplate.** New React components, CRUD endpoints, scaffolding tests, anything where the pattern is well-established and you're filling in blanks. This is where the "30% productivity gain" claims hold up best.

**First drafts of documentation.** API docs, runbooks, post-mortem outlines, README sections. The first draft is usually 80% right and saves the typing-the-mechanical-part time. I review and revise; net time saved is real and unglamorous.

**Multi-file refactoring with a spec.** "Rename this concept across the module, update all callers, fix the tests, update the documentation." Used to be an hour of careful manual work. Now it's a five-minute spec, twenty minutes of agent execution, fifteen minutes of careful review. Threshold: under ~1,500 lines of touched code; past that, the agent loses the plot.

**Test characterization before refactoring.** "Read this module and write tests that capture what it currently does, including the quirks." Then I refactor against those tests. I open every legacy refactor with this prompt now.

**Translation between languages.** Need to port Python to Go? AI gets you 80% there. The 20% you have to fix is usually the interesting part — async patterns, error handling, idiomatic conventions — but starting from 80% beats starting from 0%.

**Syntax you can't remember.** I work in five languages and can never remember Python's datetime formatting or TypeScript's generic constraints. AI is faster than googling. This is the most under-rated use case; not glamorous, but the cumulative time saved is large.

**The "what could go wrong" pre-mortem.** Hand the agent a diff and ask "what fails in production for this code, what edge cases break it, what concurrent-access bug am I missing." Catches roughly 30% of what a human reviewer would catch, in 30 seconds, against zero of my time. Doesn't replace review; complements it.

## AI is mediocre for

These are the tasks where AI helps but you have to work for it. Not "leave it on autopilot" tasks; "use it carefully with discipline" tasks.

**Complex business logic with implicit constraints.** AI gives you something that looks right but has subtle bugs at the boundaries — off-by-one errors, wrong assumptions about who can do what, edge cases the spec didn't mention. The fix is [spec-driven development](../05-workflows/spec-driven-development.md): write the constraints down explicitly so the agent can't pick the wrong one. Without a spec, this is mediocre. With a good spec, it's closer to great.

**Code that needs to integrate with your existing codebase.** AI doesn't know your conventions, your utilities, your patterns. It'll generate generic solutions instead of using the helper function you already have. The fix is a strong [AGENTS.md](../08-team-and-adoption/templates/agents-md-org-template.md) and a custom skill kit (your error wrapper, your test conventions, your API contract style — see [building your own skills](../06-skills-and-memory/building-your-own.md)). With those in place, this moves toward "great." Without them, mediocre.

**Anything with very recent APIs.** Training data cutoffs mean the agent suggests deprecated patterns. React code from AI is especially bad about this, still suggesting class components and outdated lifecycle methods. The fix is to point it at current docs explicitly in the prompt, or to use a skill that captures current best practices for the framework. Mitigated, not eliminated.

**Java security-critical code.** This isn't an agent limitation specifically; it's the [Java security paradox](../07-quality-and-security/threat-landscape.md). AI fares worse on Java security than on TypeScript or Python. The fix is the structured pattern (AI drafts, human writes the security boundary, separate-model security review pass) plus the Trail of Bits skills. With discipline, mediocre. Without it, bad.

## AI is bad for

These categories haven't moved. AI is still the wrong tool, even with the 2026 capability gains.

**Security boundaries written naively.** AI-generated auth code, crypto, input validation, permission checks: still routinely vulnerable. The fix is not "wait for a better model." The fix is the disciplined pattern in [09 — Defenses](../07-quality-and-security/defenses.md#1-treat-ai-generated-security-critical-code-as-untrusted-by-default): use AI to draft, hand-write the security boundary, run a separate-model security review pass. With discipline, AI can participate in security work safely. Without it, never trust AI to write a security boundary.

**Architecture and system-design decisions.** AI can't reason about system-level trade-offs that aren't visible in the immediate code: production load patterns, data growth over years, the deprecation of a service three quarters out, the political cost of choosing one team's API over another's. It'll happily produce working code that violates a constraint nobody documented. The decision-making part of architecture is still human.

**Novel problems.** If your problem doesn't look like something well-represented in training data, the agent's "solution" is plausible-looking and often completely wrong. The agent's confidence does not correlate with its accuracy here. Build the prototype yourself; use the agent for the parts you've validated by hand.

**Performance-critical code where the constants matter.** AI optimizes for correctness, not speed. It'll give you O(n²) when O(n log n) exists, N+1 queries all day long, unnecessary allocations everywhere. For hot paths the agent is a liability; for cold paths it's fine.

**Anything where being wrong silently is expensive.** Financial calculations, medical-device logic, safety-critical control flow. The asymmetry between "the code works in tests" and "the code works in production with the actual data" is too large. AI's failure mode is plausible-looking wrongness; in these contexts, plausible-looking is the worst possible failure mode.

## A worked example: the same task across all three categories

Same feature, three sub-tasks, three different AI postures. I built an authenticated user-search endpoint earlier this year. Sub-task one: scaffold the endpoint, route, request schema, response envelope, controller stub. Pure boilerplate. AI nailed it in under a minute. **Great category.**

Sub-task two: implement the search logic against our existing repository abstraction, respecting our pagination and filtering conventions. AI's first cut used a generic ORM-style query that bypassed our pagination conventions and didn't use our `UserRepository` helper. It wasn't wrong in any obvious way; it was wrong in the codebase-fit way. I fixed it by pointing it at our existing search endpoint as an example and saying "match this shape." Five minutes, not zero. **Mediocre category, fixed by codebase-aware prompting.**

Sub-task three: enforce that the requesting user can only see users they have permission to see (org-scoped, role-scoped). Authorization. I wrote this by hand. The agent's first draft of authz code, against our codebase, would have allowed a cross-org enumeration attack — it inferred org membership from the request body instead of from the authenticated session. I caught it in the AI-vs-AI security review pass. The fix was to never have the agent generate the authz boundary in the first place. **Bad category. Discipline saved me.**

The pattern: the same feature contains tasks across all three categories. The skill is recognizing which is which in real time and adjusting your AI posture per sub-task, not per feature.

## The decision rule, in one sentence

If getting it wrong would cause real problems — security, data integrity, financial calculations, anything that ships to customers — write the decision boundary by hand and have AI fill in around it. If getting it wrong is recoverable in a code review or a test failure, let AI take the first cut and review it.

That's the rule. Everything else is application of it.

## Related reading

- [Prompting patterns](./prompting-patterns.md), getting better output upstream of the categorization
- [Review discipline](./review-discipline.md), what to check before merging AI code in any category
- [Failure modes](./failure-modes.md), the patterns that make "mediocre" code dangerous
- [09 — Defenses](../07-quality-and-security/defenses.md), the disciplined pattern that makes the "bad" category recoverable
- [Spec-driven development](../05-workflows/spec-driven-development.md), the upgrade from "mediocre with prompting" to "great with a spec"
