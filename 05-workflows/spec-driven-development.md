---
title: Spec-Driven Development
summary: Write detailed specs first, hand to agent, review against the spec. Why it's the workflow shift that closed the biggest gap for me, what tools enable it, and how specs harden over cycles into the load-bearing artifact for AI work.
tags: [spec-driven, workflow, spec-kit, kiro, ears, agents-md]
related:
  - ../04-understanding-and-context/context-engineering.md
  - ./agents.md
  - ../08-quality/technical-excellence.md
last_updated: 2026-04-28
---

# Spec-Driven Development

The single workflow shift that closed the biggest quality gap in my AI-coding work: stop prompting conversationally, start writing a spec first, then hand the spec to the agent. The cost is small (15 minutes for most features). The saved rework is large (the agent stops guessing what you meant).

The deeper realization that took me longer to internalize: when AI-generated code is wrong, **the spec is what's missing detail, not the code**. Edit the spec and regenerate; don't patch the code in place. Over time the spec hardens against the failure modes the model produces, and the regeneration loop gets faster and more reliable.

## The shift

The traditional workflow: describe what you want conversationally, watch the agent produce something, fix what's wrong, iterate. The spec-driven version: write a detailed specification first, hand the spec to the agent, review against the spec.

The inversion: **you spend more time specifying, less time implementing.** The spec becomes the source of truth. Code is one implementation of the spec.

This sounds like process overhead. It is, until you do it for a few features and realize you were already doing the spec work, just badly, in your head, while iterating. The written spec just makes that work explicit and reusable. When the agent gets something wrong, you fix the spec line that was ambiguous. The next feature inherits the better spec template. It compounds.

## The tools

The ecosystem moved fast in the last year. As of April 2026:

**[GitHub Spec Kit](https://github.com/github/spec-kit)** is the most popular open-source option (~72K stars). Supports 22+ AI agent platforms. Provides a structured workflow: `/specify` (generate spec from prompt), `/plan` (create implementation plan), `/tasks` (break into discrete tasks), `/implement` (generate code). I've been using it for the last month and it's genuinely helpful for medium-to-large features.

**[Amazon Kiro](https://kiro.dev/)** is an IDE built around spec-driven development. Uses EARS notation (Easy Approach to Requirements Syntax) to make requirements unambiguous. Worth looking at if you're in the AWS ecosystem. The agent-hooks feature lets you trigger agents on file save; interesting for automated documentation and testing.

**[Tessl](https://tessl.io/)** takes it further with a registry approach. Think npm for specifications: publish and share spec templates across teams. Early days, but the direction is interesting.

**[Intent (Augment)](https://www.augmentcode.com/product/intent)** is the enterprise option. Focuses on "living specs" that stay synchronized as agents work. For teams managing complex multi-service codebases, it solves the problem of specs drifting from implementation.

**[OpenSpec](https://github.com/Fission-AI/OpenSpec)** enforces a strict three-phase state machine (proposal, apply, archive) before any code is written. Useful for teams with explicit approval gates.

You don't need any of these to start. A markdown file checked into the repo, written before the agent is prompted, captures 80% of the value. The tools are worth adopting once the practice is reflex.

## A concrete example

Here's what spec-driven development looked like on a real feature. I needed to add rate limiting to an API. Old approach: I'd describe it conversationally to Claude Code and iterate through several attempts.

The spec I wrote first:

> **Feature:** API Rate Limiting.
>
> **Requirements:** Limit each API key to 100 requests per minute. Return 429 status with `Retry-After` header when exceeded. Use Redis for distributed rate tracking. Exempt internal service accounts (prefix: `svc_`).
>
> **Constraints:** Must not add more than 5ms latency. Must handle Redis failures gracefully (fail open). Must work with existing auth middleware.
>
> **Acceptance Criteria:** 101st request in 60 seconds returns 429. `Retry-After` header shows seconds until reset. Internal accounts are never rate limited. System continues working if Redis is unavailable.

I handed this to the agent. It generated an implementation plan, broke it into tasks, and implemented each one.

The spec took 15 minutes to write. The implementation took 20 minutes of agent work plus 15 minutes of my review. Total: under an hour for a feature that would have taken me half a day with the old workflow.

But the first cut wasn't right. That's where the *real* lesson is.

### How the spec hardened over three cycles

The first version the agent produced compiled, passed the tests it generated for itself, and *would have shipped a broken rate limiter* if I hadn't read it carefully. Three issues, each fixed by amending the spec, not editing the code.

**Cycle 1 — wrong rate-limit key.** The agent used the email as the rate-limit key. With my acceptance criterion of "101st request in 60 seconds returns 429," the natural read is "per identity," but the agent picked email because that's what the auth middleware exposed. An attacker rotating API keys would never hit the limit.

> *Spec amendment:* "Rate-limit key is the API key (`Authorization: Bearer <key>`), not the email or user ID."

The regenerated code used the right key. Fix took two minutes.

**Cycle 2 — fail-open without observability.** The "fail open on Redis errors" requirement was implemented as `try/except: pass`. Technically meets the spec. Catastrophic in practice — every Redis failure was now silently allowing unbounded requests. There would be no signal that we were degrading until a customer complained.

> *Spec amendment:* "Fail open means the request proceeds AND the failure is logged at WARN with `redis_outage_correlation_id` AND emits the `rate_limit_failopen` metric."

The regenerated code added structured logging and a metric I could alert on. Fix took five minutes.

**Cycle 3 — auth-ordering bug on the service-account exemption.** The internal-service-account exemption was implemented before the auth check. Subtle ordering bug: anyone could send `svc_` as their own prefix and bypass rate limiting entirely. The agent's first instinct was correct in spirit (special-case the internal accounts) and wrong in placement.

> *Spec amendment:* "The `svc_` prefix exemption is checked AFTER the auth middleware confirms the key is valid AND that the key belongs to a service-account principal in the database."

This one I'd missed in the original spec. The agent's bug forced me to write the correct invariant down.

### The pattern: specs harden, code regenerates

The interesting thing about those three cycles isn't that the agent made mistakes. It's that **each mistake produced a permanent improvement to the spec template**. The next time I write a rate-limiter (or anything resembling one), my starting spec already includes:

- Explicit identity-key declaration ("rate-limit key is X, not Y")
- Fail-open semantics that mandate observability ("fail open means proceed AND log AND emit metric")
- Ordering-of-checks invariants ("X is checked AFTER Y, not before")

I didn't have any of these in my spec template a year ago. I have all of them now. They got there by writing them down the first time the agent got them wrong.

This is what spec-driven development *actually* gives you over time. The first feature feels like overhead. The fifth feature drops into a spec template that's already hardened. By the tenth, the agent's first draft is usually right because the spec leaves much less room for ambiguity.

The mental model that helps: **the spec is the codebase you're maintaining; the code is a regeneratable artifact.** Edit the spec, regenerate the code. The way you'd update a function and re-run a test, except the function is the spec and the test is the produced code matching what you meant.

## When this workflow isn't worth it

Honest about the limits:

- **Tiny one-file changes.** A typo fix, a config tweak, a one-line bug fix. The spec overhead exceeds the implementation; just prompt conversationally. Threshold I use: if the change is under ~50 lines and the requirements fit in one sentence, skip the spec.
- **Pure exploration.** When you don't yet know what you want to build, prompting conversationally is the right way to figure it out. Write the spec *after* the exploration, before the real implementation.
- **Codebases with very strong existing conventions.** If the agent's output is already 95% right because your AGENTS.md is mature, the spec gives you less marginal value. Still worth doing for security-critical work; less worth it for routine.

For everything else (most non-trivial features, all production-touching work, anything you'd want to be able to defend in a post-mortem), spec-driven is the default I'd recommend.

## What "good" looks like

Three signs your team has internalized the practice:

1. New non-trivial features start with a `plan-<feature>.md` in the repo before any code is written. Plans get PR-reviewed and merged separately from the implementation that follows.
2. Specs evolve over cycles. When the agent produces wrong code, the team's instinct is to ask "what does the spec need to say to prevent this?" not "let me edit the code."
3. The team's spec template grows over time with the lessons from prior incidents. New specs inherit the hardened template by default.

If specs feel like ceremony three months in, the team is treating them as documentation rather than as the source of truth. That's the regression to watch for.

## What I'd tell a peer

The spec-driven workflow looks like overhead the first three times you do it. By the fifth or sixth time it's faster than what you were doing before, because the spec template you're inheriting from prior cycles is already hardened against the failure modes the model produces. The cost is a few weeks of feeling like you're "wasting time on documentation"; the payoff is permanent. Start with one non-trivial feature next week. Write the spec before you prompt. Update the spec the first time the agent gets something wrong. By feature three, you'll feel the lift.

## Related reading

- [Context engineering](../04-understanding-and-context/context-engineering.md), the lower-level companion practice (specs are one form of context)
- [The agentic shift](./agents.md), what specs hand off *to*
- [Technical excellence](../08-quality/technical-excellence.md), why horizontal concerns belong in the spec template
- [The alignment bottleneck](../10-team-and-process/alignment-bottleneck.md), why a checked-in spec is also an alignment artifact for the team

## Sources

- [GitHub Spec Kit team](https://github.com/github/spec-kit), on "maintaining software means evolving specifications": "the lingua franca of development moves to a higher level, and code is the last-mile approach"
- [Thoughtworks Technology Radar](https://www.thoughtworks.com/radar/techniques/spec-driven-development), tracks spec-driven development as an emerging technique; identifies multiple industry interpretations (this guide aligns with the "specs drive generation; code remains what you maintain" camp)
- [ETH Zurich study, early 2026](https://arxiv.org/abs/2601.20404) on AGENTS.md effectiveness: found that overly detailed context files often *hinder* agent task completion. The recommendation: limit human-written instructions to non-inferable details (specific tooling, custom build commands, things the AI can't figure out from the code itself). Matches my experience that overly detailed specs make agents "think harder" without producing better results; the best specs are precise about what matters and silent about what doesn't.
