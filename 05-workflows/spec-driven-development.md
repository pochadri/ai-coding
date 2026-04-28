---
title: Spec-Driven Development
summary: Write detailed specs first, hand to agent, review against the spec. The emerging standard.
tags: [spec-driven, workflow, spec-kit, kiro, ears]
related:
  - ../04-understanding-and-context/context-engineering.md
  - ./agents.md
  - ../08-quality/technical-excellence.md
last_updated: 2026-04-25
---

# Spec-Driven Development: The Emerging Standard

There's a pattern emerging that I think will define how we work with AI coding tools for the next few years. It's called spec-driven development, and it's everywhere suddenly.

The idea is simple: instead of prompting AI conversationally, you write a detailed specification first. Requirements, constraints, acceptance criteria, edge cases. Then you hand the spec to the agent and let it implement.

This inverts the traditional workflow. **You spend more time specifying, less time implementing.** The spec becomes the source of truth. The code is just one implementation of the spec.

GitHub's Spec Kit team put it bluntly: "In this new world, maintaining software means evolving specifications. The lingua franca of development moves to a higher level, and code is the last-mile approach."

The Thoughtworks Technology Radar now tracks spec-driven development as an emerging technique. InfoQ notes that "with AI-generated code, a code issue is an outcome of a gap in the specification. Because of non-determinism in AI generation, that gap keeps resurfacing in different forms whenever the code is regenerated."

## The Tools

The ecosystem is moving fast. Here's what's out there as of March 2026.

**[GitHub Spec Kit](https://github.com/github/spec-kit)** is the most popular open-source option. Over 72,000 stars on GitHub. It supports 22+ AI agent platforms and provides a structured workflow: `/specify` (generate spec from prompt), `/plan` (create implementation plan), `/tasks` (break into discrete tasks), `/implement` (generate code). I've been using it for the last month and it's genuinely helpful for medium-to-large features.

**[Amazon Kiro](https://kiro.dev/)** is an IDE built around spec-driven development. It uses EARS notation (Easy Approach to Requirements Syntax) to make requirements unambiguous. If you're in the AWS ecosystem, this is worth looking at. The agent hooks feature lets you trigger agents on file save, which is interesting for automated documentation and testing.

**[Tessl](https://tessl.io/)** takes it further with a registry approach. Think npm for specifications. You can publish and share spec templates across teams. Early days, but the direction is interesting.

**[Intent](https://www.augmentcode.com/product/intent)** is the enterprise option. It focuses on "living specs" that stay synchronized as agents work. For teams managing complex, multi-service codebases, this solves the problem of specs drifting from implementation.

**[OpenSpec](https://github.com/Fission-AI/OpenSpec)** enforces a strict three-phase state machine (proposal, apply, archive) before any code is written. Useful for teams with explicit approval gates.

## A Concrete Example

Here's what spec-driven development looks like in practice. I needed to add a rate limiting feature to an API. Old approach: I'd describe it conversationally to Claude Code and iterate through several attempts.

New approach with Spec Kit:

> **Feature:** API Rate Limiting.
>
> **Requirements:** Limit each API key to 100 requests per minute. Return 429 status with `Retry-After` header when exceeded. Use Redis for distributed rate tracking. Exempt internal service accounts (prefix: `svc_`).
>
> **Constraints:** Must not add more than 5ms latency. Must handle Redis failures gracefully (fail open). Must work with existing auth middleware.
>
> **Acceptance Criteria:** 101st request in 60 seconds returns 429. `Retry-After` header shows seconds until reset. Internal accounts are never rate limited. System continues working if Redis is unavailable.

I hand this to the agent. It generates an implementation plan, breaks it into tasks, and implements each one. When something doesn't match the spec, I update the spec and regenerate.

The spec took 15 minutes to write. The implementation took 20 minutes of agent work plus 15 minutes of my review. Total: under an hour for a feature that would have taken me half a day.

### What was wrong with the first generation, and how I fixed it via the spec

The first version the agent produced compiled, passed the tests it generated for itself, and *would have shipped a broken rate limiter* if I hadn't read it carefully. Three issues, each of which I fixed by *amending the spec*, not by editing the code:

**1. The agent used the email as the rate-limit key.** Wrong. With my acceptance criterion of "101st request in 60 seconds returns 429," the natural read is "per identity," but the agent picked email because that's what the auth middleware exposed. An attacker rotating API keys would never hit the limit. **Spec fix:** "Rate-limit key is the API key (`Authorization: Bearer <key>`), not the email or user ID." The regenerated code used the right key.

**2. The "fail open on Redis errors" requirement was implemented as `try/except: pass`.** Technically meets the spec. Catastrophic in practice — every Redis failure was now silently allowing unbounded requests. **Spec fix:** "Fail open means the request proceeds AND the failure is logged at WARN with `redis_outage_correlation_id` AND emits the `rate_limit_failopen` metric." The regenerated code added structured logging and a metric I could alert on.

**3. The internal-service-account exemption was implemented before the auth check.** A subtle ordering bug: anyone could send `svc_` as their own prefix. **Spec fix:** "The `svc_` prefix exemption is checked AFTER the auth middleware confirms the key is valid AND that the key belongs to a service-account principal in the database." This one I'd missed in the original spec; the agent's bug forced me to write the correct invariant down.

The pattern is the load-bearing piece: when the AI-generated code is wrong, the *spec* is what's missing detail, not the code. Edit the spec and regenerate; don't patch the code in place. Over time the spec hardens against the failure modes the model produces, and the regeneration loop gets faster.

## The Research Is Mixed

I should be honest: the research on spec-driven development is mixed.

An [ETH Zurich study](https://arxiv.org/abs/2601.20404) published in early 2026 found that `AGENTS.md` files often hinder AI coding agents. They tested Claude, Codex, and Qwen on real-world tasks and found that all context files increased the number of steps required. LLM-generated context files actually reduced success rates by 3% compared to no context at all.

The researchers recommend limiting human-written instructions to non-inferable details: specific tooling, custom build commands, things the AI genuinely can't figure out from the code.

I've found this matches my experience. Overly detailed context files make agents "think harder" without producing better results. The best specs are precise about what matters and silent about what doesn't.

## The Thoughtworks Perspective

Thoughtworks identifies three different interpretations across the industry. One camp treats specs as the source of truth, with code as a byproduct. Another (which they align with) treats specs as elements that drive generation, but executable code remains what you maintain.

I'm in the second camp. Specs help, but they're not magic. You still need to understand the code, test it, maintain it. The spec is a tool for communication with the AI, not a replacement for engineering judgment.

## Related reading

- [Context engineering](../04-understanding-and-context/context-engineering.md), the lower-level companion practice
- [The agentic shift](./agents.md), what specs hand off *to*
- [Technical excellence](../08-quality/technical-excellence.md), including horizontal concerns in specs
