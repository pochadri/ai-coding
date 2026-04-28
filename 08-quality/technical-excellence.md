---
title: Technical Excellence in the AI Age
summary: Excellence matters more, not less. The form it takes is shifting from "writing the code" to "deciding what should exist and making sure the boring infrastructure survived the AI pass."
tags: [excellence, judgment, horizontal-concerns, observability]
related:
  - ../09-security/threat-landscape.md
  - ../03-effective-use/review-discipline.md
  - ../05-workflows/spec-driven-development.md
last_updated: 2026-04-28
---

# Technical Excellence in the AI Age

A question I keep getting from peer engineers and CTOs: does technical excellence still matter if the AI is writing the code?

Short answer, more than ever. And the *form* it takes is shifting in a way that catches a lot of teams off-guard. The teams that adjust treat AI as a forcing function for better engineering discipline. The teams that don't end up with the same quality problems they always had, just at a much larger volume.

## The volume problem (in one paragraph)

The thing that broke is just speed. AI didn't change the *probability* that any given line is bad. It changed the *rate* at which lines get produced by an order of magnitude. A junior engineer might write 50 lines of low-quality code per day. A developer with Claude Code can land 5,000. Same proportional defect rate, much bigger absolute problem, across every quality dimension.

## The form excellence takes is shifting

I spend less time writing code now. I spend more time *deciding what should exist*, reviewing what got generated, and making sure the boring infrastructure (logging, error handling, rate limits, retries) survived the AI pass.

The skills that matter to me when I look at candidates and at my own work are shifting in a specific direction:

- **Less:** typing speed, syntax memorization, boilerplate fluency, knowing the framework's API by heart.
- **More:** system design, code review under time pressure, security instinct, specification, judgment about what to build at all.

This is the part most teams miss when they buy AI tools and expect a 30% throughput gain. The throughput is real, but the *kind* of work shifts. If you don't reorganize how you work to match, the gain gets eaten by the things AI doesn't do well, which is most of the things that matter operationally.

## Horizontal concerns: the things AI consistently forgets

This is where most of the quality problem actually shows up. AI generates code that works on the happy path. It forgets about the cross-cutting concerns that make the code *operable* in production. These are the things you didn't think to ask for, because in human-written code they're built in by reflex.

The list I now check on every AI-generated diff:

**Logging.** Is there structured logging at the right level? AI defaults to either no logging or `console.log`-style debugging artifacts that should never have shipped. I want JSON logs, INFO for state transitions, DEBUG for inner-loop, WARN/ERROR with correlation IDs. AI gives me strings concatenated together.

**Observability.** Did it instrument metrics? Latency histograms per endpoint? Error counters by type? Outbound call timing? AI rarely thinks to add these unless the spec says so. The first time you debug a production incident and realize you have no metric for the failing call, you'll add this to your spec template forever.

**Error handling.** Did it classify errors correctly? Is the user-facing message generic and the detailed error in logs only? Are errors caught and re-raised with context, or caught and silently swallowed? AI's default is closer to the second pattern than I'd like.

**Rate limiting.** Did the agent think about per-user vs per-IP vs global limits? About what happens when the limit is hit (429 with a `Retry-After` header? Silent drop? Queue?). AI's default rate-limiting code is almost always per-something-trivial-to-bypass.

**Graceful degradation.** What happens when the dependency is down? Default-fallback path? Cached value? Failing closed vs failing open? AI's `try/except: pass` pattern is the dangerous version of "fail open." It works, it ships, it eats every Redis outage silently.

**Timeouts and retries.** Outbound calls without timeouts. Retries without bounded backoff. Retries that retry on conditions they shouldn't retry on (a 401 is not a transient failure). Each of these has burned me in production at least once.

**Idempotency.** Background jobs that aren't safe to re-run. POST endpoints that double-charge if the client retries. AI doesn't think about idempotency unless the spec is explicit, and most specs aren't.

I now include all of these as line items in my [spec template](../05-workflows/spec-driven-development.md). That's the only thing that reliably catches them; review-time catches them too late, when the code is already written and the cost of re-doing it is high.

## A worked example: the endpoint that "worked"

Late last year I asked Claude Code to add a "lookup user by ID" endpoint to a service. Three lines of spec ("returns user JSON, 404 if not found, 200 if found"). The agent wrote 30 lines, all the tests passed, the PR review took two minutes, it shipped.

Two weeks later we had an incident. The service was getting hammered with malformed requests from a misconfigured upstream. Each malformed request was hitting our database, returning 404, and emitting *zero* log lines. We had no idea why our database CPU was at 100% until we manually tailed traffic and figured out which endpoint was hot.

The diff that fixed it was 10 lines. It added a structured log line at INFO with the request ID and the lookup result, a metric counter for 404s per endpoint, and a guard that rejected requests with malformed user IDs before they hit the DB. None of that was in the original spec, so none of it was in the original code.

The lesson is not "AI is bad." The lesson is that the *spec* is now the load-bearing artifact for quality. If the spec doesn't say "every endpoint must emit structured logs and a counter metric," the agent will leave them out. Every time. Across every project. Across every model. The model isn't going to fix this; the spec discipline is.

I now treat horizontal-concern lines in the spec the way I used to treat security-review checklists: non-negotiable, included by default, copy-pasted into every new spec. The cost is a few seconds per spec; the saved incident cost is enormous.

## What this means for hiring and ramping juniors

Worth a fuller treatment in [Junior developers](../10-team-and-process/junior-developers.md), but worth flagging here. The skills I look for in candidates are shifting in the same direction the work is. I weight code review more, system design more, "what could go wrong in production" instinct more. Pure typing speed weighs zero. The candidates who interview poorly under "implement this on a whiteboard" but well under "review this PR and tell me what's wrong" are the ones I want.

If your hiring loop hasn't moved with this shift, you're optimizing for the part of the work AI now does fine without you.

## What "good" looks like at the team level

Three habits I see in teams that are getting this right:

1. **The spec template includes the horizontal concerns by default.** Engineers don't need to remember to add "structured logging" to every spec; the template prompts for it. Same with observability, retries, idempotency, rate limits, error handling.
2. **PR review has an explicit operability pass.** Beyond "is the logic right," reviewers are asked: "Could you debug this at 2am if it broke? Would you know it broke before a customer told you?"
3. **Production incidents feed back into the spec template.** Every post-mortem ends with "what should have been in the spec that would have prevented this?" The template gets stronger over time.

None of this is novel engineering practice. It's the same operability discipline good teams have always had. The AI shift just makes the cost of skipping it much higher, because skipping it now happens at 100x the volume.

## Related reading

- [The threat landscape](../09-security/threat-landscape.md), the security version of the same volume problem
- [Review discipline](../03-effective-use/review-discipline.md), how excellence shows up at PR time
- [Spec-driven development](../05-workflows/spec-driven-development.md), where horizontal concerns get encoded
- [The alignment bottleneck](../10-team-and-process/alignment-bottleneck.md), the team-level companion to this page

## Sources

For the underlying numbers behind the volume problem (Veracode's 55%-secure baseline, Black Duck's vulnerability YoY, Aikido's breach attribution), see [09 — The threat landscape](../09-security/threat-landscape.md), where the data is consolidated with full citations to the primary sources.
