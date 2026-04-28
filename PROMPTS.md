---
title: Prompt library
summary: The prompts I actually reach for, in roughly the form I actually type them. Mostly short. A few long ones where the structure matters.
last_updated: 2026-04-28
---

# Prompt library

The prompts I actually reach for, in roughly the form I actually type them. Most are short. A few are long because the structure matters. Bracketed `[X]` is your-job-to-fill-in.

For why these work, see [prompting patterns that work](./03-effective-use/prompting-patterns.md).

---

## Plan first

Before any non-trivial change:

```
Plan first. 3-5 steps. What files, what to verify, where you might get stuck.
Wait for "go".
```

Pre-mortem the plan once you have one:

```
Top five ways this fails in production, ranked by likelihood.
For the top one: smallest test that catches it.
```

Decompose work that's too big for one PR:

```
Decompose into PRs <400 lines each. For each: title, scope, what's NOT in scope,
risk if merged alone. First PR unblocks; last is cleanup.
```

## Code review

Functional review:

```
Review this diff. I care about correctness, failure paths, naming, fit with [path].
Skip lint-able nits. Output: numbered findings, each with severity (must / should / nit),
line, smallest fix. End with: mergeable as-is, yes/no.
```

Security review (run in a separate session, ideally a different model):

> *"You are a senior security engineer reviewing a PR. The diff is below. Look for: injection (SQL/shell/HTML), missing authz, secrets handling, deserialization, unvalidated input, SSRF, race conditions, missing rate limits, error messages that leak detail. Grade each High/Medium/Low confidence. Block on High; flag Medium; ignore Low for triage. If the diff touches auth or deserialization, also state the attack scenario you considered and ruled out (or didn't)."*

The "what would you ask in review" prompt — short and high-yield:

```
Forget I wrote this. What three questions would you ask the author before approving?
```

## Debugging

Reproduce from logs:

```
Production bug. Log: [paste]. Request: [paste]. Code: [paste].
Most likely chain of causes, ranked. Top cause: smallest local repro.
```

Bisect a regression when the diff is large:

```
Tests broke between [working_hash] and [failing_hash]. Failing test: [name].
Error: [paste]. Smallest set of changes in the diff that could cause this exact failure.
What to revert first to confirm.
```

The blast-radius prompt before any non-trivial change:

```
Given the diff above, what could go wrong in production?
Cover load patterns, data edge cases, deployment surprises, rollback, observability.
Be specific to this code, not generic SRE advice.
```

## Refactoring

```
Refactor [module] from [current shape] to [target shape].
Constraints: zero behavior change, no new deps, all existing tests pass unchanged,
public API unchanged. Output the diff.
Don't "improve" anything outside the stated refactor.
```

Lock in current behavior before touching legacy code:

```
Write characterization tests for [module] at the public API level.
Capture what it does today, including the quirks.
Don't test private methods. Don't add behavior.
```

## Reading unfamiliar code

```
Read [path]. Explain at three levels: one sentence, three paragraphs, function-by-function map.
Note anything that surprises you. Don't invent context — list unknowns as questions.
```

Find all callers / usages:

```
Find every place we [authenticate users / handle uploads / call X service].
Output: file:line, one-sentence description.
Group by usage pattern; flag any inconsistent ones.
```

The "why was this written this way" prompt:

```
This code does [behavior] and looks like it could be [simpler version].
Read the surrounding code, tests, and git history.
What constraints might have driven the existing shape?
What breaks if I rewrite it the simpler way?
Be honest about what you can't determine from code alone.
```

## Working with the agent itself

Default discipline for any session that might do destructive things:

```
Don't run anything that modifies state outside this directory without asking.
Specifically: git push, reset --hard, file deletion, CI changes, dependency changes,
network calls. Read-only and local edits are fine.
```

Cross-model review handoff (the AI-vs-AI security pattern):

```
You're reviewer. The diff below was written by a different model.
Find what the original session might have rationalized past:
ungrounded assumptions, off-by-one cases, missing error handling, wrong API shapes.
Don't review style. Output: concerns with confidence. Block only on High.
```

## Specs and skills

Turn a one-line ask into a spec the agent can use:

> *"Help me write a spec for [feature]. Constraints: [list]. Stack: [list]. Output sections: user-visible behavior, API surface (if applicable), data model changes (if applicable), edge cases and failure modes, observability requirements, security requirements (auth, input validation, secrets), out-of-scope. EARS-style requirements where they apply. Goal: a junior engineer who's read AGENTS.md could implement it without follow-up questions."*

Extract a skill from a prompt you keep retyping:

```
I keep prompting [paste your repeated prompt]. It works.
Extract into a SKILL.md (open standard): frontmatter (name, description, license),
body distilling the prompt into rules and examples, gotchas section.
Description in third person. Body under 300 lines. Include trigger phrases users actually type.
```

## Less often, but worth keeping

Honest effort estimate:

```
Estimate the work in three buckets: optimistic, realistic, pessimistic.
For each, what has to be true for the estimate to hold.
No single number — give me the range and the assumptions.
```

Edge cases I'd probably skip:

```
List ten edge cases I probably haven't tested for [function/module].
For each: input, expected behavior, why it's interesting (what real condition produces it).
Skip null/empty unless it's genuinely interesting here.
```

Runbook from an incident:

```
Just had this incident: [paste post-mortem summary].
Write a runbook for the next person who hits this class.
Sections: detection signals, immediate containment, investigation, remediation,
comms, what to update afterwards.
Short enough to read at 2 a.m. and act.
```

---

The pattern that ties most of these together: **state the role and the desired output first, then the context, then the constraint.** Most engineers prompt in the opposite order and get conversational answers instead of useful ones.

If a prompt above has saved you time and you've improved it, the [repo is public](https://github.com/pochadri/ai-coding) and PRs are welcome.
