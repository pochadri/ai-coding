---
title: The Research Landscape
summary: Synthesis of contradictory studies on AI coding productivity (METR, GitHub, Uplevel, GitClear, Faros, McKinsey).
tags: [research, productivity, evidence]
related:
  - ../08-team-and-adoption/measuring-impact.md
  - ../09-frontier/research-frontier.md
  - ../03-effective-use/where-ai-helps.md
last_updated: 2026-04-25
---

# The Research Is a Mess

I've read probably thirty studies on AI coding productivity at this point. They contradict each other constantly. Here's my attempt to make sense of the chaos.

The [METR study](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) is the most rigorous. Sixteen experienced developers, 246 real tasks in codebases they actually maintained, proper randomization. The result? 19% slower with AI. Here's the part that keeps me up at night: the developers THOUGHT they were 20% faster. They had no idea the tools were slowing them down.

Then there's the [GitHub/Microsoft study](https://arxiv.org/abs/2302.06590) everyone cites for the "55% faster" claim. I have problems with this one. The task was writing a simple HTTP server from scratch, no existing codebase to understand, no architectural constraints, nothing that resembles actual work. Of course AI helps with that. It's basically an autocomplete benchmark.

The [Uplevel study](https://uplevelteam.com/blog/ai-for-developer-productivity) found 41% more bugs among Copilot users. [GitClear](https://www.gitclear.com/ai_assistant_code_quality_2025_research) found 4x more code duplication. [Faros AI](https://www.faros.ai/blog/ai-software-engineering) found individual productivity went up but PR review time increased 91%, eating all the gains and then some.

McKinsey's February 2026 study across 4,500 developers reportedly found 46% reduction in routine coding time. That's more optimistic than METR, but notice the qualifier: "routine coding" is a narrower claim than overall productivity. (I have not located a primary McKinsey URL for this specific finding. Treat the number as directional, sourced through secondary coverage; see [REFERENCES.md](../REFERENCES.md) for the verification status.)

Here's my synthesis: AI tools help with simple, well-defined, greenfield tasks. They hurt (or at best don't help) with complex, ambiguous, maintenance work. Most real software development is the latter, which is why the productivity gains don't always materialize.

<div class="divbar">
  <div class="divbar__title">Reported productivity impact across major studies (% change)</div>
  <div class="divbar__rows" style="--zero: 57.1%;">
    <div class="divbar__label">GitClear (clones)</div>
    <div class="divbar__track"><div class="divbar__bar divbar__bar--neg" style="left: 3.6%; width: 53.6%;">−75%</div></div>
    <div class="divbar__label">Uplevel (bugs)</div>
    <div class="divbar__track"><div class="divbar__bar divbar__bar--neg" style="left: 27.9%; width: 29.3%;">−41%</div></div>
    <div class="divbar__label">METR 2025</div>
    <div class="divbar__track"><div class="divbar__bar divbar__bar--neg" style="left: 43.6%; width: 13.6%;">−19%</div></div>
    <div class="divbar__label">DORA 2025 org</div>
    <div class="divbar__track"><div class="divbar__bar divbar__bar--zero" style="left: calc(57.1% - 14px); width: 28px;">0</div></div>
    <div class="divbar__label">Microsoft RCT</div>
    <div class="divbar__track"><div class="divbar__bar divbar__bar--pos" style="left: 57.1%; width: 12.1%;">+17%</div></div>
    <div class="divbar__label">McKinsey</div>
    <div class="divbar__track"><div class="divbar__bar divbar__bar--pos" style="left: 57.1%; width: 32.9%;">+46%</div></div>
    <div class="divbar__label">GitHub HTTP</div>
    <div class="divbar__track"><div class="divbar__bar divbar__bar--pos" style="left: 57.1%; width: 39.3%;">+55%</div></div>
  </div>
</div>
<p class="divbar__caption">▴ The contradiction visualized. METR/Uplevel/GitClear find quality regressions; Microsoft/McKinsey/GitHub find throughput gains. Both methodologies are sound; they're measuring different things on different populations.</p>

> Full citations and links to these studies live in [REFERENCES.md](../REFERENCES.md).

## A note on precision claims you can't verify

Working on this guide has taught me to be more skeptical of precise numbers in vendor research than I used to be. Specific multipliers ("4x more secret leaks", "46% faster", "322% spike in privilege escalation") sound authoritative. Trace them back to a primary source and you sometimes find the number is from secondary coverage of an interview, or that the original methodology was a slice of a slice, or that the number floats across versions of the same press release.

The pattern I've adopted: when I can verify the primary source, I cite it inline and use the precise number. When I can't, I describe the pattern directionally and flag the verification status. "Repos with AI assistants exhibit materially higher rates of secret exposure" is honest if the primary source is fuzzy. "Repos with AI assistants leak secrets at exactly 4x the rate" is overclaim if the multiplier doesn't survive a primary-source check.

This isn't an attack on vendor research. It's an acknowledgment that the citation chain in this space has gotten weaker as the volume of AI-coding research has gone up. The fix isn't to stop citing; the fix is to grade your own claims by the strength of the underlying evidence, and to write hedges that match the evidence's actual strength.

## Related reading

- [Measuring what matters](../08-team-and-adoption/measuring-impact.md), DORA metrics, the hidden cost of PR review
- [Failure modes](../03-effective-use/failure-modes.md), why duplication and bugs go up
- [Research frontier](../09-frontier/research-frontier.md), what's still being studied
