---
title: Review Discipline
summary: "AI-generated code needs different review than human code. The modern playbook: check for AI-specific failure shapes, run a separate-session security pass, review the prompt as part of the diff, time-box the investigation, and ship the controversial 'did the author understand it' check."
tags: [review, code-review, quality, ai-vs-ai, large-diff, prompt-review]
related:
  - ./failure-modes.md
  - ./prompting-patterns.md
  - ../09-security/threat-landscape.md
  - ../09-security/defenses.md
  - ../10-team-and-process/for-team-leads.md
last_updated: 2026-04-28
---

# Review Discipline

This is where most teams fail. They adopt AI tools without changing their review practices, then get surprised six months in when defect rates have crept up and PR-review time has doubled. The cause is downstream of one fact: **AI-generated code needs different review than human-written code**, and most teams' review checklists were built for the latter.

Humans make typos, forget edge cases, get tired. AI makes different mistakes: subtle logic errors at boundaries, hallucinated APIs, security shortcuts, the systematic patterns covered in [failure modes](./failure-modes.md) and in [09 — When things go wrong](../08-quality/when-things-go-wrong.md). The review playbook has to match.

## The five-item checklist (the floor, not the ceiling)

The minimum every AI-generated PR should pass:

1. **Do I actually understand what this does?** If not, don't approve it. (Yes, this one is controversial. It's also load-bearing — see below.)
2. **Do all the imports and dependencies actually exist?** Check the real registries. Slopsquatting is a real attack now.
3. **Are there any obvious security issues?** SQL injection, hardcoded secrets, deserialization of untrusted input, missing authz checks. The full list lives in [09 — Defenses](../09-security/defenses.md).
4. **Are edge cases handled?** Null, empty, boundary conditions, malformed input, concurrent access. Most AI-generated code passes the happy path and fails the others.
5. **Does this follow our patterns?** Or is it generic AI code that doesn't fit your codebase's existing utilities and conventions?

This is the floor. Reviewing only against this list catches the obvious problems and misses everything more subtle. The rest of this page is what to add.

## What to add for the modern playbook

### A separate-session security review pass

The single highest-leverage pattern I've adopted: **after the agent generates code, open a different session (ideally a different model family) and prompt it as a security engineer reviewing the diff.** The reviewer doesn't share the generator's context, so it doesn't share the generator's blind spots.

Why this works: same training data ≈ same blind spots. Cross-family review (e.g., generate with Claude, review with GPT or Gemini) catches systematic biases the same model would have missed in self-review. A worked example with a real auth-endpoint diff lives in [09 — Defenses](../09-security/defenses.md#worked-example-the-security-review-pass-on-a-real-auth-endpoint).

This is now a per-PR habit on anything touching auth, deserialization, or external input.

### Review the prompt as part of the diff

If your team uses AI to generate code, the prompt that produced the code is part of what changed. Treat it accordingly:

- **PR description includes the prompt** (or a link to the session log). The reviewer needs to see what was asked, not just what was produced. A diff that "looks fine" but came from a prompt that didn't mention the security boundary is a different review situation than the same diff from a prompt that did.
- **Prompt review surfaces the missing constraint.** Most AI-generated bugs trace to missing prompt lines, not bad models. If the reviewer can see the prompt, they can flag "you didn't ask for X" and fix the spec, not just the code.
- **Over time, the team's prompt patterns become institutional knowledge.** Captured prompts evolve into [skills](../06-skills/) for the patterns the team hits repeatedly.

If your tool supports session export (Claude Code does), the friction is low. The benefit compounds.

### "Did the author understand it" — the controversial check

The most-debated item on the floor checklist: requiring the PR author to explain, in their own words, what the code does and why it's structured this way.

Pushback I get: "That slows everything down." Yes. That's the point. The whole risk profile of AI coding tools is that engineers ship code they don't understand and discover the gaps when the on-call pager goes off at 2 a.m. A team norm that the PR author has to explain their own diff is the cheapest available filter against that.

How I implement it on teams:

- The PR template has a free-text "What does this do and why this approach?" field. One paragraph minimum.
- Reviewers ask follow-up questions on the explanation, not just the code.
- Anything the author can't explain gets sent back with "rewrite this in your own understanding before merge." Not punitively; as the discipline that keeps the team's actual capability honest.

This is harder for junior engineers (see [junior developers](../10-team-and-process/junior-developers.md) for the structured ramp). It's the right pressure to apply.

### Large-diff strategy

Agentic execution produces larger diffs than human work. A "small refactor" can touch 30 files. The review playbook for a 1,000-line diff is different from the review playbook for a 50-line diff:

- **Skim the diff for shape first.** Are the file changes consistent? Does the agent appear to have a coherent mental model, or is it stitching together five different approaches?
- **Identify the load-bearing change.** Most large diffs have 50-100 lines of actual semantic change and 900 lines of mechanical follow-on. Focus review on the semantic change; spot-check the mechanical part.
- **Run static analysis on the dependency graph.** What calls what? If module X changed, what depends on X? See [08 — When things go wrong](../08-quality/when-things-go-wrong.md#impact-analysis-when-the-diff-is-1000-lines).
- **Don't try to review every line linearly.** You'll miss the actual bug while approving thirty trivial changes. Read for shape; verify for substance; spot-check for everything else.
- **If the diff is over ~1,500 lines, send it back to be split.** Past that size, no review is reliable.

### Review the tests, not just the code

AI-generated test suites have a specific failure mode: they pass because they match the agent's mental model of the code, not yours. If the code has an off-by-one, the agent's tests have the same off-by-one. The tests that pass don't tell you the code is correct; they tell you the code matches the test author's expectations.

What to check on AI-generated tests:

- Do the assertions actually catch the failure mode you'd worry about? A test that "passes when the function returns" without checking the return value is theater.
- Are edge cases tested with values that *would* fail the obvious wrong implementation?
- Did the agent test the negative paths (invalid input, failure of dependencies, concurrent access) or only the happy path?
- Would the tests still fail if the implementation were mutated to be subtly wrong?

The `your-test-quality-rules` custom skill (in the [PROMPTS library](../PROMPTS.md) and in the skill recommender's custom-templates) encodes the patterns that distinguish meaningful tests from coverage theater.

### Time-box the investigation

For AI-generated code that's confusing in review, time-box the "what was the agent thinking" investigation. If you can't figure out the intent in 15 minutes, the answer is usually: the prompt didn't specify it clearly enough, and the agent picked a path. Send it back to be regenerated with a clearer spec rather than spending an hour reverse-engineering an artifact that was generated in 30 seconds.

This is harder than it sounds because curiosity pulls you in. Resist. The detective work is interesting; rarely load-bearing for the fix.

### The surgical-changes principle

Borrowed and generalized from the [Karpathy CLAUDE.md template](https://github.com/forrestchang/andrej-karpathy-skills) but it's a reviewer's check, not just a prompt instruction. **Every changed line in an AI-generated diff should trace directly to the user's request.** Anything else is the agent making changes you didn't ask for.

What this catches in review:

- Drive-by reformatting of files the change didn't need to touch.
- Renaming variables in adjacent code "for consistency."
- Refactoring helper functions that worked fine.
- Removing comments the agent didn't understand.
- Updating dependencies as a side effect of the requested change.
- Adding configurability or abstraction layers the requirement didn't call for.

These are not improvements; they're scope creep. Each one is a separate review burden the reviewer didn't sign up for. Each one is a place a regression can hide. Each one extends the diff's blast radius.

The reviewer's specific check: read the change description (the prompt or the spec), then read the diff. Anything in the diff that doesn't trace back to the description gets flagged. Author defends it or removes it before merge.

The agent-side prevention is in the prompt: *"Touch only what you must. Don't 'improve' adjacent code, comments, or formatting. If you notice unrelated dead code, mention it — don't delete it. Match existing style, even if you'd do it differently."* Putting these in AGENTS.md catches most of it before it reaches review.

## What "good" looks like

Three signs your team's review discipline is keeping up with AI:

1. **PR review cycle time is stable** as AI usage grows. If review time is climbing in lockstep with PR rate, you're absorbing the AI-generation gain into review burden.
2. **The PR template prompts for the prompt** (or session log) and reviewers actually read it. If the prompt isn't part of the artifact, half of the review context is missing.
3. **Junior engineers can pass the "did the author understand it" check on their own PRs.** If they can't, the structured-ramp problem ([juniors](../10-team-and-process/junior-developers.md)) is being papered over and will compound.

## A worked example: the PR that "looked clean"

Real example from a few months ago. A teammate opened a 400-line PR adding background-job processing. Their PR description: "Adds the worker. Tests pass." The diff looked reasonable on first read. The reviewer (me) almost LGTM'd it.

What the floor checklist caught: imports existed, no obvious security issues, the patterns matched our codebase, edge cases were partially handled. What the floor checklist *didn't* catch: the worker had no idempotency, no observability, no graceful shutdown, and a subtle ordering bug where it would process a dequeued job before acknowledging the dequeue (so a crash mid-job would leave the job permanently lost).

The fix that surfaced these: I asked the author to walk me through the diff line by line and explain why each design decision. By the time we got to the dequeue ordering, they hesitated. That hesitation was the bug.

We spent twenty minutes rewriting the relevant section together. The PR merged the next day, properly idempotent, observable, with the dequeue ordering fixed and an integration test covering the crash-mid-job case.

Lesson: the bug was in the code, but the *signal* was in the conversation. The "explain your own diff" check is what surfaced it. Without that check, this would have been a 2 a.m. page in production three weeks later.

## Reviewing AI-generated content (not just code)

Code review isn't the only place this discipline matters. The same lessons apply when AI generates *any* maintained artifact — documentation, runbooks, blog posts, internal wikis, this guide itself. Three patterns from the editorial work I do on AI-assisted writing that translate directly back to code review.

### Layered audits with different lenses catch different things

No single review pass catches everything. When I'm reviewing a substantial body of AI-assisted writing, I run separate passes with separate intents: a *style* pass (voice, tics, formulaic structures), a *content* pass (depth, accuracy, currency), a *contradiction* pass (does anything in this body conflict with anything else), a *naivety* pass (is the treatment surface-level for the topic), and a *cross-reference* pass (do the links work and point at current names). Each pass finds things the prior pass missed because the lens is different.

The same pattern works for code review. A reviewer who looks at correctness, then again at security, then again at observability, then again at consistency-with-codebase will catch more than a reviewer who tries to look at everything at once. Different lenses; different findings. The cost is real (review takes longer); the catch rate is meaningfully higher for non-trivial AI diffs.

### Sample first, then scale

Before applying a pattern across many files (or letting an agent apply a refactor across many files), do *one* and verify. The "rewrite one page in the new voice and gut-check before scaling" discipline saved enormous rework on this guide. The same pattern: ask the agent to refactor *one* file before approving the same change across thirty.

This sounds obvious; in practice the temptation to skip the sample step and "just run it across everything" is real, especially when each individual change looks small. The scaling cost when the pattern was wrong is much larger than the sampling cost.

### Bulk transformations need a critical re-pass

Mechanical sweeps catch the obvious instances and *introduce new tics*. A bulk find-and-replace that "fixes" one pattern often substitutes a new one. After any agent-driven mechanical change across many files, do a focused re-pass looking for *what the operation broke or created* — not a re-run of the original review, but a fresh hunt for the problems the operation introduced.

This is the difference between "did the change land" and "did the change land cleanly." Both questions need answering, and they're not the same question.

## Related reading

- [Prompting patterns](./prompting-patterns.md), getting useful output upstream of review
- [Failure modes](./failure-modes.md), the systematic patterns this discipline defends against
- [09 — Defenses, AI-vs-AI review](../09-security/defenses.md#ai-vs-ai-review-a-separate-model-reviews-the-first-models-output), the security-specific version of the cross-session pattern
- [08 — When things go wrong](../08-quality/when-things-go-wrong.md), what happens when review misses something and it lands in production
- [For team leads](../10-team-and-process/for-team-leads.md), encoding this discipline as team policy
- [Junior developers](../10-team-and-process/junior-developers.md), why this discipline is harder and more important during the ramp
