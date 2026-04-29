---
title: AI for Maintenance
summary: AI is now genuinely useful on legacy code, especially with 1M context windows changing the retrieval picture. Where it helps, where it still fails, and the workflow I run on real maintenance work.
tags: [maintenance, legacy, modernization, repo-intelligence, context]
related:
  - ./when-things-go-wrong.md
  - ../07-memory/artifact-memory.md
  - ../04-understanding-and-context/understanding-problem.md
last_updated: 2026-04-28
---

# AI for Maintenance

The question I was uncertain about a year ago: can the same tools that *generate* new code actually help maintain old code? The answer in 2024 was "kind of." The answer in 2026 is "yes, materially, for a specific set of tasks."

The headline shift in the last twelve months has been the 1M context window. Maintenance was the use case where retrieval pipelines used to matter most; for many codebases they no longer do. You can paste an entire subsystem into context and ask cross-cutting questions without building any infrastructure. That alone moved AI-for-maintenance from "interesting" to "default."

## Where AI is now genuinely useful

The patterns that have moved from experimental to part of my reflex toolkit:

**Summarizing unfamiliar subsystems.** "Read this directory and explain what it does at three levels: one sentence, three paragraphs, and function-by-function." Routinely saves me a half-day of code reading per question. The output isn't perfect but it's a strong scaffold for my own pass.

**Finding all the places that touch X.** "Find every place we authenticate users / handle file uploads / call the payments service. List file path, line number, and what's happening at that location." Faster than `grep`, and crucially it understands semantic similarity (it'll find `verify_credentials` and `check_session_token` as related to "authenticate users" without me writing the disjunction).

**Tracing a code path end-to-end.** "Starting from the API endpoint at `routes/users.py:42`, walk me through every function called until the database query." Used to be a tedious manual exercise; now it's two minutes.

**Modernization first drafts.** "Rewrite this Python 2.7 module for Python 3.12 with type hints" or "convert this callback-style code to async/await." The first draft is usually 80% right and saves me from typing the mechanical 80%. I review carefully because the 20% wrong tends to be the interesting cases.

**Generating documentation for undocumented APIs.** Not perfect, but better than nothing, and *much* better than "we'll document it later" (which never happens). I run this on every legacy subsystem I touch and check the generated docs into the repo.

**"What would happen if I deleted this?"** The blast-radius question. "If I removed this function, what calls it, and what behavior would change?" Useful before any non-trivial deletion in code I don't fully own.

**Test characterization before refactoring.** "Read this module and write tests that capture what it currently does, including the quirks." Then I refactor against those tests. I open every legacy refactor with this prompt now.

## Where it still fails

The failure modes haven't gone away; they've just gotten more specific.

**Cross-service contracts.** AI sees one codebase. It doesn't see the other services that depend on this one, the production traffic patterns hitting it, the implicit contracts encoded in how callers happen to use the API. It will confidently suggest changes that "don't break anything in this repo" while breaking three downstream consumers. Code knowledge graphs ([GitNexus, graphify](../07-memory/artifact-memory.md)) close part of this gap by giving the agent queryable call graphs and dependencies, but they don't solve cross-service contracts.

**The architectural "why."** AI can tell you *what* the code does. It cannot reliably tell you *why* it was written that way. The historical context, the constraint that existed at the time, the bug it was working around, the decision the team made in a meeting that nobody documented. That context lives in git history (sometimes), in Slack archives (rarely searchable), in human memory (usually gone). AI will fabricate plausible-sounding rationales for design choices when the real reason was "we needed to ship by Friday." Be skeptical of any "the code is structured this way because..." answer that isn't grounded in something verifiable.

**"Don't use library X" decisions.** The most dangerous AI-modernization failure I see: the codebase deliberately doesn't use library X (because of a security incident, a license issue, a maintainer concern), but the rationale isn't in any comment. The agent helpfully "modernizes" the code to use library X. The PR looks great. It's wrong. Mitigation: surface these decisions in AGENTS.md explicitly.

**Deprecation patterns that look modern.** AI was trained on lots of code from 2010-2022. Some of it uses patterns that were idiomatic then and are anti-patterns now (synchronous I/O patterns in Python, `var` in JavaScript, raw `Thread` in Java instead of executors, etc.). The agent will confidently suggest these because they're well-represented in training data. Catching them requires you to know the modern idioms.

**Cross-cutting refactors at scale.** AI can refactor one file well. Twenty files coherently is harder. A hundred files with cross-cutting concerns (renaming a concept that appears across a service) is where the agent loses the plot. It does work in pieces but the result reads like five different engineers' work stitched together. Often you're better off with a deterministic codemod for the mechanical part and AI for the judgment-required edge cases.

**"Maintaining consistency over time"** used to be on this list and is no longer. Vendor memory (Claude `/memory`, Copilot Memory, Codex Memories) plus interaction-memory tools like claude-mem actually do carry decisions across sessions now. You still have to *curate* what gets remembered (memory drift is real), but the core problem is solved enough to lean on. See [memory practice and risks](../07-memory/practice-and-risks.md) for the trade-offs.

## A worked example: the auth module nobody understood

Earlier this year I was dropped into a service whose auth module had been written four years ago by an engineer who'd left two years ago. No documentation. The Slack conversations had aged out of the archive. The original spec was "see the JIRA ticket" and the JIRA project no longer existed.

What I did, in order, with timestamps:

- **Hour 0:00.** Pasted the auth directory (about 1,200 lines) into Claude Code. Asked: "Walk me through what this module does, end-to-end. Identify every external integration. Flag anything that surprises you."
- **Hour 0:15.** Got back a four-paragraph summary plus a list of three things the agent flagged as unusual: a custom JWT verification path that bypassed the standard library's verifier, a hardcoded service-account list in a constants file, and a `legacy_auth.py` that was still imported by one route.
- **Hour 0:30.** Asked: "For each of those three, find every place in the codebase that depends on the unusual behavior, and tell me what would break if I removed it."
- **Hour 1:00.** I now had a map. The custom JWT verifier was load-bearing (a partner integration depended on a non-standard claim). The hardcoded service-account list was dead code from a deprecated service. The `legacy_auth.py` was used by a single internal admin endpoint that should probably have been removed two years ago.
- **Hour 2:00.** I'd written a markdown summary of the module that became the new `auth/README.md` and updated the AGENTS.md with the "do not 'modernize' the custom JWT verifier" warning.

Pre-AI, this would have taken me at least a full day of reading code, often two. The two-hour version isn't perfect (the agent didn't catch a subtle bug in the rate-limiting that I found later), but it's *good enough* that I now do this on every legacy module I'm asked to touch. The artifact (the README) is also durable, which means the next person won't have to repeat the investigation.

What this example does *not* demonstrate: the cross-service contract question (which downstream services depend on the JWT format the agent flagged). I had to answer that one by reading the integration tests in three other repos. AI didn't help.

## The maintenance workflow I run

For any meaningful maintenance task, in this order:

1. **Start with architecture docs.** If they exist, read them first and update them as you go. If they don't, write a starter version (the auth-module example above).
2. **Use git blame actively.** Before changing old code, check who wrote it and when. Recent and from a current team member: ask them. Ancient: treat more carefully.
3. **Agent for investigation, human for decision.** Let the agent explore and explain. Make the actual change decisions yourself.
4. **Incremental changes with validation.** Small changes, run tests, deploy to staging, monitor. Don't let the agent refactor fifty files at once even if it offers to.
5. **Update the AGENTS.md when you discover landmines.** Every time you find a "don't do X for non-obvious reason" situation, write it into AGENTS.md so the next agent session doesn't fall in.

If maintenance work is still taking the same time it did before AI, you're probably skipping step 1 or step 5. Both compound; neither is optional.

## Related reading

- [When things go wrong](./when-things-go-wrong.md), debugging AI-generated bugs after they ship
- [The understanding problem](../04-understanding-and-context/understanding-problem.md), why "why" is hard for AI even with 1M context
- [Artifact memory (code KGs)](../07-memory/artifact-memory.md), the tooling that closes part of the cross-service-contract gap
