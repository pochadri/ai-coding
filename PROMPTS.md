---
title: Prompt library
summary: Copy-pasteable prompts that have actually worked for me, organized by task. Steal them, adapt them, build a better one and contribute it back.
---

# Prompt library

Every prompt below is one I've actually used and kept. They're organized by task. Most need light customization (the bracketed `[your X]` placeholders). A few are framework-specific and I've called that out.

A general principle that makes most of these work: **explicit beats implicit**. The model will follow detailed instructions and skip vague ones. If the prompt feels too long, it's probably the right length.

For the patterns behind these prompts, see [Prompting patterns that work](./03-effective-use/prompting-patterns.md).

---

## Planning and spec-writing

### Turn an idea into a spec

> *"Help me write a spec for [feature]. Constraints: [list]. Stack: [list]. Goal: a spec we can hand to a junior engineer who has read our AGENTS.md, with enough detail that they could implement it without asking us follow-up questions but not so much that we're writing the code in the spec. Output sections: User-visible behavior, API surface (if applicable), data model changes (if applicable), edge cases and failure modes, observability requirements, security requirements (auth, input validation, secrets), out-of-scope (what we are deliberately not doing). Use EARS-style requirements where they apply."*

### Pre-mortem the plan before writing code

> *"Read the spec above. List the top five ways this implementation could go wrong, ranked by likelihood. For each: what's the symptom in production, what would you do differently in the design now to avoid it, and what's the test that would catch it before we ship. Be specific to this codebase, not generic 'consider observability' advice."*

### Decompose a large change into PRs

> *"This work is too big for one PR. Decompose it into a sequence of independently-mergeable PRs, each under 400 lines of diff. For each PR: title, scope, what's *not* in scope (so reviewers know), what tests it adds, and what risk it introduces if merged alone. The first PR should be unblocking; the last should be the cleanup."*

---

## Code review

### General review pass

> *"Review this diff. I care about: correctness on the happy path, behavior on the failure paths I might not have considered, naming and readability, and consistency with the rest of [path]. Skip stylistic nitpicks; don't flag things linters would catch. Output: a numbered list of findings. For each, the severity (must-fix / should-fix / nit), the line, and the smallest change that fixes it. End with one sentence on whether this is mergeable as-is."*

### Security review pass (run as a separate session, ideally a different model)

> *"You are a senior security engineer reviewing a PR. The diff is below. Look specifically for: injection risks (SQL, shell, HTML, template), missing authorization checks, secrets handling violations, deserialization paths, unvalidated input, SSRF, race conditions, missing rate limits, error messages that leak detail to clients. Grade each finding High / Medium / Low confidence. Block on High; flag Medium for human review; ignore Low for triage. If the diff touches auth or deserialization, also explain what attack scenario you considered and ruled out (or didn't)."*

### "What did I miss?" review

> *"Read the diff above. Forget that I wrote it. What questions would you ask the author in code review? List the three you most want answered before approving."*

---

## Debugging and investigation

### "What could go wrong?" prompt

> *"Given the change in the diff above, what could go wrong in production? List failure modes I might not have considered. Cover: production load patterns, edge cases in the data, deployment surprises, operational concerns (rollback, observability), interactions with other services. Be specific to what this code does, not generic SRE checklists."*

### Reproduce a bug from logs

> *"I have a production bug. Here's the log line: `[paste log]`. Here's the request: `[paste request]`. Here's the relevant code: `[paste code or list files]`. Walk me through the most likely chain of causes for this exact log line. Rank by likelihood. For the top cause, propose the smallest test that would reproduce it locally."*

### Bisect a regression

> *"Tests started failing on `[branch]`. Working commit: `[hash]`. Failing commit: `[hash]`. The diff between them is large but the failing test is `[test name]`, error: `[paste error]`. Read the diff and identify the smallest set of changes that could plausibly cause this exact failure. Tell me what to revert first to confirm."*

---

## Refactoring

### Refactor with a spec

> *"Refactor [file/module] from [current shape] to [target shape]. Goals: [readability / testability / removing duplication / breaking up X / etc.]. Constraints: zero behavior change, no new dependencies, all existing tests must keep passing without modification, public API of the module is unchanged. Output the diff. Do NOT 'improve' anything that isn't part of the stated refactor; resist the urge."*

### Add tests before refactoring

> *"Before I refactor [module], I want to lock in current behavior with characterization tests. Write tests that capture what the module does today (including any quirks), at the public API level. Each test should fail clearly if the behavior changes. Don't test private methods. Don't add new behavior; just describe what's already there."*

---

## Codebase exploration (for legacy or unfamiliar code)

### What does this do?

> *"Read [file or directory]. Explain what it does at three levels: one-sentence summary, three-paragraph overview for someone joining the team, and a function-by-function map of the public API. Note anything that surprises you (unusual patterns, dead code, places where the code disagrees with its comments). Don't invent context you don't have; if something's unclear, list it as an open question."*

### Find all the places that touch X

> *"Find every place in this codebase where we [authenticate users / handle file uploads / call the [Y] external service / etc.]. Output: file path + line number + one-sentence description of what's happening at that location. Group by usage pattern if patterns emerge. Note any locations that look inconsistent with the others."*

### Why was this written this way?

> *"This code does [behavior]. It looks like it could be written more simply as [your simpler version]. Read the surrounding code, the tests, and (if available) the git history of this file. What constraints might have driven the existing shape? What would break if I rewrote it your way? Be honest about what you can and can't determine from the code alone; some context lives only in git history or human memory."*

---

## AGENTS.md and skill authoring

### Extract a skill from a working prompt

> *"I keep prompting the model with [paste your repeated prompt]. It works. I want to extract this into a SKILL.md following the open SKILL.md standard. Output: frontmatter (name, description, license), a body that distills the prompt into rules and examples, and a 'gotchas' section if the prompt has any. Use third-person in the description (the model reads it for discovery). Keep the body under 300 lines. Include trigger phrases the user actually types."*

### Write an AGENTS.md from a codebase

> *"Read the top of [repo root]. Generate a starting AGENTS.md for this codebase: stack and key dependencies, file layout conventions, two or three patterns the repo uses that aren't obvious from the code, what tests exist and how to run them, what NOT to AI-generate without review (auth, deserialization, etc.). Keep it under 500 lines. Don't invent conventions you can't verify from the code."*

### Audit my AGENTS.md

> *"Read my AGENTS.md (`[paste]`). Read [a few representative files] from the codebase. List discrepancies: places where the AGENTS.md describes a convention the code doesn't actually follow, places where the code follows a convention the AGENTS.md doesn't mention. Suggest five additions to the AGENTS.md that would catch real failure modes I'm seeing in AI-generated PRs."*

---

## Working with the agent itself

### Make the agent narrate its plan before acting

> *"Before you write any code: tell me what you're going to do, in three to five steps. Include what files you'll touch, what you'll need to verify, and where you might get stuck. Wait for my 'go' before starting. If you discover the plan is wrong mid-execution, stop and tell me; don't 'figure it out' silently."*

### Make the agent ask before destructive actions

> *"Default rule for this session: do not run any command that modifies state outside this directory without asking first. Specifically ask before: git push, git reset --hard, deleting files, modifying CI config, changing dependencies, running anything that hits a network endpoint. Read-only commands and edits to local source files are fine."*

### Pair-program with a second model

> *"You are reviewer. I just wrote the diff below using a different model. Find anything the original session might have rationalized past. Specifically: ungrounded assumptions, incorrectly remembered API shapes, off-by-one or boundary cases, missing error handling. Don't review style. Output a list of concerns with confidence; only stop the merge on High."*

---

## Prompts I use less often but keep around

### Estimate effort honestly

> *"Read the spec above. Estimate the work in three buckets: optimistic (everything goes right), realistic (normal friction), and pessimistic (you hit at least one nontrivial unknown). For each, list what would have to be true for that estimate to hold. Don't give me a single number; give me the range and the assumptions."*

### Write a runbook for an incident class

> *"We just had an incident where [paste post-mortem summary]. Write a runbook for the next person who hits this class of incident. Sections: detection signals, immediate containment, investigation steps, remediation, comms (internal + customer if applicable), what to update afterwards (alerts, dashboards, AGENTS.md, etc.). Keep it short enough that someone reads it at 2 a.m. and acts."*

### Generate test cases I'd skip

> *"Read [function or module]. List ten edge cases I probably haven't tested. For each: the input, the expected behavior, why it's interesting (what real-world condition would produce this case). Skip 'null/empty' cases unless null/empty is genuinely interesting here. Focus on the ones that would surprise me if they failed."*

---

## How to use this page

The prompts above are starting points, not finished products. Three things I do every time I take one of these and use it:

1. **Replace the bracketed placeholders** with specifics from the actual situation.
2. **Add codebase context** that the prompt assumes is in the agent's view (paste the relevant code, link to AGENTS.md, etc.).
3. **Add a one-line acceptance criterion** at the end ("output should be in the form of [X]" or "if you don't have enough context, ask before writing code"). This is the difference between a prompt that returns a hedge and one that returns a thing you can act on.

If a prompt above has saved you time and you've improved it, the [repo is public](https://github.com/pochadri/ai-coding) and PRs are welcome.

## Related reading

- [Prompting patterns that work](./03-effective-use/prompting-patterns.md), the patterns these prompts follow
- [Review discipline](./03-effective-use/review-discipline.md), how to use the review prompts in a real PR workflow
- [Spec-driven development](./05-workflows/spec-driven-development.md), the workflow the planning prompts plug into
- [Building your own skills](./06-skills/building-your-own.md), how to graduate the prompts you use most into installable skills
