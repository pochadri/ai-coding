---
title: Prompting Patterns That Work
summary: The patterns that distinguish a 101-level prompt from one that gets useful output. Specifics on plan-before-code, role assignment, format constraints, confidence grading, and the failure modes that catch most engineers off guard.
tags: [prompting, technique, craft, plan-mode, role-assignment, few-shot, format-constraints]
related:
  - ./review-discipline.md
  - ../04-understanding-and-context/context-engineering.md
  - ../05-workflows/spec-driven-development.md
  - ../PROMPTS.md
last_updated: 2026-04-28
---

# Prompting Patterns That Work

The difference between an engineer who gets useful output from AI and one who keeps fighting the model is rarely the model. It's the prompt. After two years of daily use I've converged on roughly a dozen patterns that show up in nearly every working session, and a parallel list of failure modes that show up the moment those patterns get skipped.

This page is the patterns and the failures. The [PROMPTS library](../PROMPTS.md) is the copy-pasteable form.

## The single most important rule

**The first sentence of your prompt determines the first sentence of the response.** Models pattern-match aggressively on opening framing. A prompt that opens with "Help me write..." gets help-mode hedging. A prompt that opens with "Output the diff that..." gets a diff. A prompt that opens with "You are a senior security engineer reviewing a PR..." gets review-mode output.

If you change nothing else about how you prompt, change this. State the role, state the desired output, and state the constraint *first*, before any context. Most engineers do the opposite — they pile on context and end with a vague ask. The model rewards the inversion.

## The patterns I use daily

### Plan before code

For anything beyond a one-line change, ask the model to produce a plan before any code. Two reasons. First, you catch wrong-mental-model problems while they're still cheap to fix (a wrong plan is one paragraph; a wrong implementation is fifty files). Second, the plan itself becomes a reusable artifact you can paste into the spec template for next time.

The phrasing I use:

> *"Before writing any code, give me a 3-5 step plan. Include what files you'll touch, what you'll need to verify, and where you might get stuck. Wait for my 'go' before starting."*

This pattern alone has prevented more wasted agent-runs than any other single change to my workflow.

### Role assignment

Telling the model who to be shapes the output more than telling it what to do. The same diff reviewed by "a senior security engineer" and reviewed by "a code reviewer" produces qualitatively different findings — the security framing surfaces injection risks and authz gaps; the generic framing produces stylistic nitpicks.

Roles I use most:

- "You are a senior security engineer reviewing a PR" — for the security-review pass.
- "You are a staff engineer reading this code for the first time" — for understanding-unfamiliar-code work.
- "You are a strict tech lead checking that this matches our conventions" — for code review against a style guide.
- "You are a debugger walking through this stack trace" — for incident investigation.

The role doesn't have to be a real job title; it just has to be specific enough that the model picks a coherent register.

### Format constraints

Tell the model what shape the output should take. "Output as a unified diff." "Output as a JSON array with `{file, line, finding}` keys." "Output as a markdown table with three columns." "Output a numbered list of findings, each with severity, file, line, and the smallest change that fixes it."

The output gets dramatically more useful when it's structured for what you'll do with it next. Structured output is also easier to copy-paste, search, and re-feed into another prompt.

### Confidence grading

For any review or analysis prompt, ask the model to grade each finding with confidence. "Grade each finding High / Medium / Low confidence." This forces the model to commit to a position rather than hedging, and surfaces uncertainty cleanly so you can triage. The model that says "this is probably a bug" without grading is harder to act on than the model that says "Medium confidence: this is a bug."

Trail of Bits' security skill set uses this pattern as a primitive. It works in any review context.

### Few-shot examples

When you want a specific shape of output and the model isn't producing it, paste 2-3 examples of what you want. "Here are three examples of how I want the function documented. Now do the same for the rest." Two examples is usually enough; three is plenty. More than three is diminishing returns.

This works especially well for codebase-specific patterns the model can't infer from the code alone (your error wrapper, your test naming convention, your API contract style).

### Iterate, don't restart

If the first output is close but not quite right, say what's wrong specifically and ask for a revision. Don't start over. Starting a fresh session loses the context the model has built up about your codebase and about what you're trying to do.

The phrasing:

> *"That's close but [specific thing] is wrong. Revise the output to [specific change]. Keep everything else."*

The "keep everything else" matters; without it, models often regenerate the whole answer and introduce new problems.

### Pre-mortem the diff

Before merging an agent-generated diff, ask the model to pre-mortem its own work:

> *"Read the diff above. List five ways this could go wrong in production. Be specific to this codebase, not generic SRE checklists. Rank by likelihood."*

This catches roughly 30% of the issues a human reviewer would catch, in 30 seconds. It doesn't replace review; it complements it. The interesting move: ask a *different* model to do the pre-mortem (cross-family review). Same training data ≈ same blind spots; cross-family catches what self-review misses.

### Cap-and-constrain

When asking for a list of options, cap the list. "Give me three options, ranked by preference. Don't give me five." Models will happily produce a menu of equally-weighted options when given the chance; capping forces them to commit.

### Ask for the failure mode

When the model proposes a solution, ask it to describe how the solution fails. "What's the input that breaks this? What's the production load that exposes the limit? What edge case does this not handle?" This often surfaces issues the happy-path implementation didn't show.

### Success criteria over imperatives

[Karpathy's observation](https://x.com/karpathy/status/2015883857489522876) that's reshaped how I think about the longer-running prompts: *"LLMs are exceptionally good at looping until they meet specific goals. Don't tell it what to do, give it success criteria and watch it go."*

The pattern: instead of an imperative ("add validation", "fix the bug", "refactor X"), give the agent a verifiable goal it can check itself against. Two examples:

- *Imperative:* "Add validation to the user endpoint."
- *Success criterion:* "Write tests for invalid inputs (empty, oversized, malformed JSON, SQL-injection-shaped strings, boundary cases). Make them pass. Then write the validation code that makes them stay passing."

- *Imperative:* "Fix the race condition in the caching layer."
- *Success criterion:* "Write a test that reliably reproduces the race condition under concurrent load. Then make the code pass the test without breaking any existing tests."

The agent's loop becomes: write the verification, run it, see what's failing, change the code, repeat. You don't need to drive each step. Strong success criteria let the agent run independently for much longer than a vague imperative would. Weak criteria ("make it work") require constant clarification.

For multi-step tasks, state a brief plan with verification at each step:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

This is the verification side of [plan-before-code](#plan-before-code) — the planning side states what you'll do; this side states how you'll know each step worked. Used together they cover the full loop.

## Failure modes I see catch engineers off guard

### The pile-on prompt

Engineers stack 200 lines of context, paste in three files, and end with "Now help me." The model has to guess what "help" means. The output is generic because the ask was generic. The fix isn't more context; it's a sharper ask up front.

### The conversational prompt for a non-conversational task

"Hey, can you maybe think about this and let me know what you'd do" is a prompt for a chat. "Output the diff that adds rate limiting to this endpoint, with the constraints below" is a prompt for code. Use the right register for the task.

### The unbounded ask

"Write tests for this" returns five tests of trivial scope. "Write tests for this. Cover empty input, max-size input, malformed input, concurrent input, and the failure mode where the database is unreachable" returns the actual edge cases. Bounded asks produce bounded output; unbounded asks produce wishful output.

### The lost-context prompt

After several turns, the model forgets early constraints. The fix is to re-state load-bearing constraints in the prompt that matters. Don't assume the model still remembers "we don't use library X" from ten turns ago.

### The vague success criterion

"Make this better" gives you the model's idea of better. "Make this less than 5ms latency on p95, smaller than 100 lines, and using only standard library functions" gives you something measurable.

### The polite hedge

When you ask "is this code secure?" the model is incentivized to be non-committal. When you ask "you are a senior security engineer; grade each finding High/Medium/Low confidence; block-level only on High" the model commits. Polite vague asks produce polite vague answers.

## A worked example: a prompt that didn't work, and the fix

Real example from earlier this year. I was implementing a webhook handler and asked Claude Code:

> *"Add a webhook handler for Stripe events. It should validate the signature and process payment intents."*

The output compiled, signed-verified, and looked fine. It was wrong in three subtle ways: it didn't dedupe events (Stripe retries on failures, so the same event can arrive twice), it didn't handle out-of-order delivery, and the timestamp tolerance for signature validation was the framework default of 5 minutes which is too generous for a payments system. Three production bugs waiting to happen.

The rewritten prompt that worked:

> *"You are a senior payments engineer reviewing the design before implementing. The task is a Stripe webhook handler. Constraints: events must be deduped using `event.id` (Stripe retries; idempotency required); out-of-order events must be tolerated (don't assume monotonic ordering on `event.created`); signature timestamp tolerance is 30 seconds (not the default 5 minutes); failures must respond 5xx not 4xx so Stripe retries. Output: first, a 5-step plan covering dedupe storage, ordering tolerance, signature validation, error responses, and observability. Wait for my 'go' before code. Then output the implementation as a diff against the existing webhook router."*

Same task. Different prompt. Different output. The first version produced one bug per implicit assumption I hadn't named. The second version produced code I shipped without rewriting.

The lesson generalizes: the bugs in AI-generated code are usually the assumptions you didn't put in the prompt.

## The connection to specs and skills

Prompts evolve into specs and specs evolve into skills. The relationship:

- A *prompt* is what you type today for one task.
- A *spec* is the formalized version of a recurring task — checked into the repo, PR-reviewed, regenerable.
- A *skill* is the formalized version of a recurring *category* of task — discovered automatically by the agent based on the trigger phrases in its description.

You start with prompts. The ones you find yourself reusing become specs. The patterns that show up across many specs become skills. The progression is real and worth investing in: the highest-leverage thing you can do with a prompt that works is graduate it into a skill so you stop having to remember to type it. See [building your own skills](../06-skills/building-your-own.md) for that workflow.

## Related reading

- [Prompt library](../PROMPTS.md), the copy-pasteable prompts that follow these patterns
- [Review discipline](./review-discipline.md), what to do with the output once you have it
- [Context engineering](../04-understanding-and-context/context-engineering.md), what to set up *once* so you don't have to repeat in every prompt
- [Spec-driven development](../05-workflows/spec-driven-development.md), where prompting graduates into specifying
- [Building your own skills](../06-skills/building-your-own.md), where specs graduate into skills
