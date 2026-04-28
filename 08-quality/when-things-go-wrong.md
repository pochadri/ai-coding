---
title: When Things Go Wrong
summary: Debugging AI-generated bugs is harder because the author can't be questioned. The systematic failure patterns to know, how to do impact analysis on a 1000-line diff, and how to coordinate the team during an AI-introduced incident.
tags: [debugging, impact-analysis, production, incidents, post-mortem]
related:
  - ./ai-for-maintenance.md
  - ../05-workflows/agents.md
  - ../03-effective-use/review-discipline.md
  - ../09-security/threat-landscape.md
last_updated: 2026-04-28
---

# When Things Go Wrong

Bugs from AI-generated code have a specific shape, and the investigation playbook is different from debugging human-written code. The biggest difference: when a human writes buggy code, you can ask them what they were trying to do. When an agent writes it, you can't, and the prompt history (if you even have it) is rarely a satisfying substitute. This page is the playbook I run when an AI-generated bug lands in production.

## The investigation is harder

The first step on any AI-bug investigation is asking four questions, in this order:

1. **What were the exact prompts that generated this code?** Check chat history if you have it. Often you don't, especially if a teammate wrote the code and didn't share their session log. Push to make this normal: paste the prompt into the PR description; treat the prompt as part of the diff.
2. **What context did the agent have?** What files were in its window? What spec, if any? What custom skills were active? The same prompt with different context produces different code.
3. **Does the bug exist in isolation, or is it a misunderstanding of the system?** A bug that's wrong in a single function is easier to fix. A bug that's a coherent misunderstanding ("the agent thought we use the email as the primary key, but we use the user_id") will appear in many places.
4. **Is this a known AI failure pattern?** Most AI bugs fall into a handful of categories; once you know the categories, you know where to look.

## Systematic failure patterns to know

These are the patterns I've watched repeat across teams and codebases. If your bug doesn't match an obvious human-written failure mode, walk this list:

**The plausible-API hallucination.** The agent invented a function, method, or library that doesn't exist. The code looks idiomatic but the import or call resolves to nothing at runtime. Catches: import-existence checks in CI, or the dependency-verification habit before install.

**The off-by-one or boundary case.** AI fenceposts at the wrong edge. Filter that should be `>=` is `>`, range that should be `[start, end)` is `[start, end]`. The tests the agent wrote pass because they match the agent's mental model, not yours.

**The race condition that passes sequential tests.** The agent writes check-then-act patterns that work fine when tests run sequentially and break under concurrent load. Particularly common in caching layers, rate limiters, and counters.

**The silent error swallow.** `try/except: pass`, or a catch block that logs nothing. The code "handles" the error but you have no way to know it's happening. Production looks healthy; data quality silently degrades.

**The over-eager modernization.** The agent rewrote something into a "modern" pattern that's actually wrong for your codebase (your team deliberately doesn't use library X; your service deliberately uses synchronous I/O for a known reason). The PR looks like an improvement; it's a regression.

**The wrong abstraction.** AI grouped behaviors that share surface similarity but should not share an implementation. The result reads cleanly, scales poorly, and produces subtle bugs as the abstraction is asked to handle cases it wasn't designed for.

**The auth ordering bug.** Authorization check is in the wrong place: after the operation runs, after the resource is loaded, in a path that's reachable without going through the auth middleware. Looks correct; isn't. See [09 — defenses](../09-security/defenses.md) for the specific examples.

**The forgotten-edge-case explosion.** AI optimized for the happy path and the obvious edge cases. The non-obvious ones (empty input, max-size input, malformed input, concurrent input, partial network failure mid-request) weren't in the spec, so they aren't handled.

Most production AI bugs I've debugged are one of these eight. Walking the list takes 15 minutes and usually localizes the problem.

## Impact analysis when the diff is 1000+ lines

Agentic execution produces larger diffs than human work. A "small refactor" the agent took on can touch 30 files. When something breaks, you're not just looking for the bug; you're trying to figure out the *blast radius* of the change.

The approach I use:

- **Run the full test suite.** Obvious. But tests only catch what they test, and AI-generated test suites tend to miss the same edge cases the AI-generated code missed.
- **Static analysis on the dependency graph.** What calls what? If the change touched module X, what depends on X transitively? Tools like ast-grep, Sourcegraph, or even a quick `grep -r` are your friends.
- **Git history on the touched files.** Who else has worked on these files? What related changes were made recently? An AI-generated change that conflicts with a teammate's change-in-flight is a coordination bug, not a code bug.
- **Manual trace for critical paths.** For anything touching auth, payments, or data integrity, I still trace the code path manually after AI changes. AI can't replace this for high-stakes work.
- **The "what could go wrong?" prompt.** Literally ask Claude: "Given this change, what could go wrong? What systems might be affected? What edge cases might break? Be specific to this codebase, not generic SRE checklists." Imperfect, but catches things I miss.

The principle: the larger the diff, the more time spent on impact analysis relative to fix. A 30-line bug in a 1000-line diff is rarely just a 30-line bug; it usually indicates the spec was wrong or the agent's mental model was off, which means there are likely more bugs of the same shape elsewhere in the diff.

## Production is a different beast

Getting AI-generated code to work in development is one thing. Keeping it working in production is another. AI doesn't think about:

- **Production load patterns.** It works in tests. What about 10x traffic? What about 100x? What about a thundering herd from a misconfigured upstream?
- **Data edge cases.** It works with clean test data. What about the garbage in the legacy table that's been there since 2018?
- **Deployment concerns.** It works locally. Does it work in the container with limited memory? With the network policies that block egress to the internet? With the older version of the runtime that's still on one of your nodes?
- **Operational needs.** How do we roll this back if it breaks? How do we observe it? What metric tells us it's degrading before customers notice?

I now include all of these explicitly in specs and review checklists. "What happens under 10x load?" "What happens if the database connection fails?" "How do we monitor this in production?" "What does the rollback look like?" These read as obvious in a post-mortem; they don't get included in code unless the spec asks for them.

## Coordinating the team during an AI-introduced incident

The pattern I keep seeing in teams that have their first AI-generated incident: more confusion than necessary because no one's quite sure what happened. The rules that help:

- **Find the prompt and the session log first.** Before debugging the code, get the context the bug was generated from. If the engineer who wrote it can't find it, treat the prompt as lost (this is a process bug to fix later).
- **Don't assume the bug is in the lines that look obviously wrong.** AI-generated bugs are often in lines that look correct because they pattern-match plausible code. The actual bug might be a missing line, an ordering issue, or a wrong assumption upstream.
- **Pair the debugging.** AI-generated incidents specifically benefit from two people in the loop, because the original author often has *less* mental model of the code than they would for human-written code. A second pair of eyes that didn't watch the agent generate it brings useful skepticism.
- **Time-box the "what was the agent thinking" question.** If you can't figure out the agent's intent in 30 minutes, stop trying. Treat the code as orphaned and reason about it on its own merits. The detective work is interesting but rarely load-bearing for the fix.

## Post-mortem questions specific to AI-generated bugs

For any incident involving AI-generated code, the post-mortem should ask three additional questions beyond the standard set:

1. **Was the spec missing the requirement that, if present, would have prevented this?** If yes, update the spec template so the next feature includes it by default. Most AI-generated production bugs trace to missing spec lines, not bad models.
2. **Did the prompt or session log get captured anywhere reviewable?** If no, the team's session-log-sharing practice needs work. Treating the prompt as part of the artifact (like a commit message) is the durable fix.
3. **Was this a known AI failure pattern from [the systematic failure patterns list](#systematic-failure-patterns-to-know)?** If yes, why didn't review catch it? Add the pattern to your code-review checklist and to the AGENTS.md.

Skipping these means the same class of bug will land again. The whole point of the post-mortem is to make the next incident a different kind of incident, not the same kind louder.

## What "good" looks like

Three signs your team is handling AI-bug investigation well:

1. The PR template prompts engineers to paste the relevant prompt or session log. Most do. The prompt is treated as part of the diff.
2. Your post-mortem template has the three AI-specific questions baked in. Recurring patterns produce AGENTS.md updates.
3. Your AI-incident time-to-resolution is comparable to human-bug time-to-resolution. If AI bugs consistently take longer to investigate, the prompt-context discipline isn't working.

If AI-incident investigations are taking 3-5x longer than human-bug investigations, the gap is almost always in step 1: the prompt and context aren't captured. Fix that and the rest follows.

## Related reading

- [AI for maintenance](./ai-for-maintenance.md), the upstream practice that prevents some of these incidents
- [Agents](../05-workflows/agents.md), why agentic diffs are larger and need more careful review
- [Review discipline](../03-effective-use/review-discipline.md), catching issues before they ship
- [09 — Defenses](../09-security/defenses.md), the security-specific version of this playbook
