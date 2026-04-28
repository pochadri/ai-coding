---
title: My Personal Experience
summary: Two years of daily use, tracked. What's working now, what I changed my mind about since 2024, what surprised me, and what it actually costs.
tags: [experience, productivity, anecdote, daily-practice, what-i-changed-my-mind-about]
related:
  - ../03-effective-use/where-ai-helps.md
  - ../03-effective-use/language-effectiveness.md
  - ../03-effective-use/failure-modes.md
  - ../02-tools/recommended-setup.md
  - ../05-workflows/spec-driven-development.md
  - ../06-skills/building-your-own.md
  - ../07-memory/practice-and-risks.md
  - ../10-team-and-process/alignment-bottleneck.md
last_updated: 2026-04-28
---

# My Personal Experience

I've been tracking my own AI coding usage carefully since mid-2024. What follows is the reflective version of that tracking: what I do today, what's changed since I started, what surprised me, and what it actually costs in dollars and habit. The rest of the guide generalizes from these observations; this is the data point.

## Where I am right now

My daily kit, as of late April 2026:

- **[Claude Code](../02-tools/claude-code.md)** as the primary harness. I'm in it for at least four hours a day. Almost everything below assumes Claude Code as the default; the patterns translate to Cursor / Codex / OpenCode but the specifics will differ.
- **About 8-10 custom skills** in `.claude/skills/` per active project. Half are universal (the AppError wrapper, our test conventions, our API contract style); half are project-specific. The custom ones are the high-leverage tier; community skills are a distant second.
- **Vendor-native memory** (Claude `/memory`) plus a manual AGENTS.md in every repo. I haven't adopted a third-party interaction-memory tool; the vendor surface has been enough.
- **Static analysis and secret-scanning in CI** on every project past prototype. Sentry's `skill-scanner` runs before any community skill installs. These are non-negotiable; I learned why the hard way.
- **Spec-driven development for anything non-trivial.** I write a short markdown spec before the agent touches code. This is the single workflow change that closed the biggest gap for me.
- **A deliberate "second-pass" review** on anything touching auth, deserialization, or external input — different model session, security-engineer prompt. This is the pattern that has caught the most real defects.

This is not the kit I had a year ago. The deltas are most of the interesting content on this page.

## What I do with it, by task

I track which categories of work I use AI for, how often, and how it goes. The current breakdown, honest:

### Writing new feature code

**Python and TypeScript:** I let the agent draft, then I read every line. Real productivity gain at this point is something like 30-40% on TS, 20-30% on Python, *if and only if* I have a half-decent spec written first. Without a spec, the gain shrinks toward zero (I waste the saved time arguing with the agent and reverting bad assumptions).

**Java/Spring:** more cautious. The agent's idiomatic Java is often 2010-era idiomatic, and the [Java security paradox](../09-security/threat-landscape.md) means I run an extra security pass on anything touching auth, deserialization, or reflection. Productivity gain is real but smaller; the review burden is higher.

**Go and Rust:** I do less of these now, but the gain is closer to TS than to Java. The training data is cleaner; the agent's first cut is usually closer to right.

### Reading and understanding unfamiliar code

This is where I get the most asymmetric value, and it's the use case I would defend most strongly to a skeptic. Pointing Claude Code at a decade-old codebase and asking "what does this do, what assumptions does it bake in, what's likely to break if I touch it" routinely saves me a day of investigation per question. The 1M context window changed this materially in the last six months — I can drop entire subsystems into context and ask cross-cutting questions without retrieval pipelines.

### Refactoring across multiple files

Agent-driven refactoring went from "I don't trust it" in 2024 to "I let it draft and I review the diff" in late 2025 to "I treat it as the default for any refactor under 1,500 lines of touched code" now. The pattern that works: write a small spec describing the target shape, hand it the spec, review the diff against the spec rather than against my mental model of the change. The pattern that fails: ask conversationally for "a refactor that cleans this up." Specifics in.

### Debugging

The "paste the log line, paste the request, paste the relevant code, ask for the most likely chain of causes ranked by likelihood" pattern is now a reflex. I get a usable hypothesis in under a minute, more often than not. The misses tend to be when the bug is in a subsystem I didn't paste in; that's a spec error on my part, not a model failure.

### Testing

Two distinct uses. **Characterization tests before refactoring** (asking the agent to describe what the module does today via tests) is now the way I open every legacy refactor. **Test generation for new code** is more mixed: the agent will happily generate tests that pass but don't test anything meaningful, so I have a `your-test-quality-rules` skill that calls out the specific patterns it keeps producing that don't count.

### Security review

The pattern I've come to depend on: AI drafts the implementation, I write the security boundary by hand, then I open a *separate session with a different model* and prompt it as a security engineer reviewing the diff. The cross-session, ideally cross-family review catches what the generation session would have rationalized past. I added a [worked example to the defenses page](../09-security/defenses.md) showing this on a real auth endpoint. This pattern alone is the single most-load-bearing security practice I've adopted; I would not ship customer-facing code without it now.

### Documentation

I write less of it manually. The agent generates a usable first draft of API docs, runbooks, post-mortems, and README sections. The trick is to give it the constraints up front (audience, length, what to skip) so it doesn't produce the generic over-long version. Net time saved is real and unglamorous: maybe two hours a week.

### Long-running agentic tasks

Multi-step tasks I would have done myself a year ago, like dependency upgrades, large mechanical migrations, test-coverage backfills, are now things I queue with the agent and check on later. Success rate is something like 80% on first attempt, 95% with one round of correction. The 20% that fail tend to fail on the same patterns: cross-cutting concerns the spec didn't mention, undocumented invariants, places where two reasonable choices conflict.

### Working with the team

This is the area where my experience has changed the most this year, and it's worth its own subsection.

I used to think the productivity story was "I am 30% faster, therefore my team is 30% faster." It isn't. The team's throughput hasn't moved nearly that much, even though my individual throughput has. Most of the gap goes to PR review (more code, more time spent reviewing), to coordination (more parallel work, more collisions), and to catching subtle AI-introduced bugs that the author missed on the first pass. I cover the structural reasons in [the alignment bottleneck](../10-team-and-process/alignment-bottleneck.md). The short version: scaling individual productivity doesn't scale team output if team alignment doesn't scale with it.

## Things I changed my mind about

The most useful section of any reflection page, and the one most guides skip. Here are the positions I held in mid-2024 that I no longer hold.

### "Don't use AI for security-critical code, ever"

Position then: never trust AI for auth, crypto, input validation. Hand-write everything.

Position now: the absolute version doesn't survive a deadline; nobody actually follows it. The pattern that does survive is **AI drafts, human writes the security boundary, separate-model review pass, scanners catch the rest**. I drop into hand-writing for the actual decision points (does this user have access; is this input safe; is this token valid), but I let the agent scaffold around them. The change isn't that AI got better at security; it's that I got better at structuring how I use it for security.

### "Skills are a marketing wrapper around prompts"

Position then: skills are just system prompts with extra steps; the open standard is overhyped.

Position now: skills are the highest-leverage long-term investment a team can make. Specifically *custom* skills, written by the team, capturing the conventions the agent keeps re-discovering. My `your-app-error-wrapper` skill (the [worked example here](../06-skills/building-your-own.md)) saved me a PR-comment argument every single PR for the next six months. Twenty minutes of work, hours per week of return. The community skills ecosystem is mostly noise; the team-authored skill kit is the load-bearing thing.

### "Agents are too unreliable for real work"

Position then: agentic execution is a demo; for real work, drive the model turn-by-turn.

Position now: agents have become my default for anything multi-file, mechanical, or long-running. The ratio shifted in late 2025. The harness improvements (planning steps, sandbox modes, tool-use approval gates) made the difference, not raw model capability.

### "Spec-driven development is process overhead"

Position then: writing a spec before each feature is the kind of ceremony that slows real engineering down.

Position now: spec-driven development is the workflow that closed the biggest *quality* gap I had. The cost is small (15 minutes for most features) and the saved rework is large. The breakthrough realization: when AI-generated code is wrong, the *spec* is what's missing detail, not the code. Edit the spec, regenerate. Don't patch the code in place. Over time the spec hardens against the failure modes the model produces.

### "Memory is nice-to-have"

Position then: I can paste the relevant context into every session.

Position now: vendor-native memory (Claude `/memory`) plus a curated AGENTS.md is now load-bearing for any project I work on for more than a week. The cost of *not* having it is more obvious now: the agent re-derives the same wrong defaults every session, and I waste time re-correcting them. I haven't adopted a third-party interaction-memory tool yet; the vendor surface has been enough for my workflow.

### "Individual-developer productivity is the right metric"

Position then: if I ship more, the team ships more.

Position now: the team's throughput hasn't moved nearly as much as my individual throughput has. The bottleneck moved from implementation to alignment, and the tools we have (PRs, Slack, Jira) are not built for the new bottleneck. This is the [alignment-bottleneck thesis](../10-team-and-process/alignment-bottleneck.md) and it's reshaped how I think about whether AI is "working" at the team level.

## What surprised me in the last six months

Things I didn't see coming, in roughly the order they hit me:

- **How much the 1M context window changed my retrieval habits.** I built RAG pipelines a year ago to deal with the 200K limit. Most of those pipelines are no longer load-bearing; I just paste the relevant subsystem into context. Retrieval is still useful for the very large cases, but the threshold moved.
- **How fast custom skills became the actual differentiator.** I expected community skills to dominate the way npm packages dominate JavaScript. They didn't. The team-authored skill is the high-leverage tier; the community ecosystem matters mostly as examples to learn from.
- **How much the security situation hardened.** Two years ago, "use a scanner in CI" was a recommendation. Now it's the floor. Skill-scanner before any community-skill install is the floor. The Apiiro / Veracode / Black Duck / Aikido data, taken together, makes the case clearly enough that arguing about it feels strange.
- **How much the agent's planning step matters when shared.** Solo planning + solo execution has the same alignment problems as solo coding; I've started bringing a teammate into the planning step on anything non-trivial. It catches more misalignment than a 1-hour PR review would, in 15 minutes.
- **How quickly the model-quality conversation moved past frontier model capability.** Frontier model improvements still ship, but the variance in what people get out of the same model has gotten enormous. Tooling, harness, AGENTS.md, skills, and memory now matter more than which model you use, for a wider range of tasks than they used to.

## What I'm still uncertain about

The honest list:

- Whether collaborative-agent tools like ACE land in time and shape to matter, or whether the alignment problem keeps being solved with discipline rather than tooling.
- Whether the organizational productivity gains catch up to the individual gains, or whether the team-throughput-flat finding becomes the long-run reality.
- Whether the junior-developer learning pipeline survives in its current form. I lean toward "no", and I haven't yet seen a replacement model I'd defend confidently.
- Whether spec-driven development becomes the norm or stays a power-user practice that most engineers find too high-overhead.
- How much of what I'm doing today is durable practice and how much is artifacts of *current* tool capability that will look quaint in 18 months.

## What it actually costs

The question I get asked most by peers and rarely see answered honestly. My actual numbers, not generalized, as of late April 2026.

Claude Code, used at the daily-power-user level, lands at roughly **$200/month**. Pricing shifted from flat per-seat to usage-billed-on-top in early 2026, and serious daily use lands in the $150-250 range; Anthropic's published benchmark is around $13 per developer per active day, which matches my bill. Cursor, which I keep for IDE-native interactive editing and inline completion, runs another **$60/month**.

So roughly **$260/month of personal tooling**, before infrastructure costs (CI scanners, vendor-skill subscriptions, secret-scanning, etc.). For a senior engineer hour, that's a few hours a month, easily justified at my usage level. For less-intensive use the math is closer; for occasional users the per-seat case is harder.

The real cost most teams underestimate is not the subscription. It's the **review time on AI-generated PRs**, the **incident response when an AI-introduced defect lands in production**, and the **process overhead of doing this responsibly** (security scanners, secret-scanning hooks, skill-scanner audits, AGENTS.md curation, custom skill authoring). The subscription is the cheap line item; the operational cost dwarfs it.

If you want the one-paragraph version of everything above: pick one tool and pay for it. Write a starter AGENTS.md in your repo today. Set up the security floor (CI scanner, secret-scanning, skill-scanner) before you install anything else. Adopt spec-driven development the next time you start a feature, even if the spec is 100 words. Author one custom skill capturing the pattern your agent keeps getting wrong. Treat the saved time as yours to spend, not as a productivity dividend to extract — invest it in alignment, review, and craftsmanship. And keep tracking your own usage; what's true for me won't be exactly true for you, and the only way to know is to measure. The rest of the guide is the longer version of that.

## Related reading

- [Where AI actually helps](../03-effective-use/where-ai-helps.md), the generalized version of these observations
- [Failure modes nobody talks about](../03-effective-use/failure-modes.md), the failure side of these observations
- [Spec-driven development](../05-workflows/spec-driven-development.md), the workflow that closed the biggest gap for me
- [Building your own skills](../06-skills/building-your-own.md), the highest-leverage long-term investment
- [The alignment bottleneck](../10-team-and-process/alignment-bottleneck.md), why the team picture differs from the individual picture
- [Recommended setup](../02-tools/recommended-setup.md), the tools I actually use
- [QUICKSTART](../QUICKSTART.md), the five-minute version of the paragraph above
