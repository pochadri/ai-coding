---
title: Measuring What Matters
summary: "DORA metrics over self-report. The hidden cost: 91% more PR review time."
tags: [measurement, dora, productivity, metrics]
related:
  - ../01-foundations/research-landscape.md
  - ../03-effective-use/review-discipline.md
  - ./for-team-leads.md
last_updated: 2026-04-25
---

# Measuring What Matters

> **Altitude:** practitioner-level measurement here — DORA, the productivity paradox, what I tracked. For org-level TCO under usage-based pricing, DX Core 4, and the bimodal productivity story for the boardroom, see **[08 — Team & Adoption / ROI and the case for investment](../08-team-and-adoption/roi-and-board-narrative.md)**.

I've seen a lot of teams "measure" AI tool impact by asking developers "do you feel more productive?" This tells you almost nothing.

**Self-reported productivity is unreliable.** Remember [the METR study](../01-foundations/research-landscape.md): developers thought they were 20% faster when they were actually 19% slower. Feelings aren't data.

## What Actually Works

The right approach is **DORA metrics**: deployment frequency, lead time, change failure rate, mean time to recovery. These measure delivery outcomes, not feelings.

When I started tracking these properly, here's what I found with AI tools:

- **Deployment frequency:** Slightly up (~10%). More code getting written and merged.
- **Lead time:** Roughly flat. I was merging more PRs but reviewing them took longer, so it evened out.
- **Change failure rate:** Slightly up (~15%). More bugs making it to production. The "41% more bugs" finding from Uplevel matches my experience.
- **MTTR:** Unchanged. Bugs weren't harder to fix, just more frequent.

**Net: positive but modest.** I was shipping more but with somewhat lower quality. Whether that's worth it depends on your context. For me, moving faster was valuable enough to accept slightly more bugs, so I kept the tools.

## The Hidden Cost

The Faros AI finding about **91% more PR review time** is real. I've experienced it.

More code means more to review. AI-generated code is often verbose, it doesn't use your existing utilities, it generates fresh implementations. And reviewers have to be more careful because AI code has different bug patterns than human code.

If you're measuring individual productivity, AI looks great. If you're measuring team delivery, the picture is murkier. **Don't forget to look at the whole pipeline.**

The structural reason team delivery doesn't move as much as individual productivity has its own page; see [the alignment bottleneck](./alignment-bottleneck.md). The short version: the bottleneck moved from implementation to coordination, and the existing tools (PRs, Slack, Jira) weren't built for the new bottleneck.

## Related reading

- [The research landscape](../01-foundations/research-landscape.md), METR, Uplevel, Faros AI in detail
- [The alignment bottleneck](./alignment-bottleneck.md), why team delivery lags individual gains
- [08 — Team & Adoption / ROI and the case for investment](../08-team-and-adoption/roi-and-board-narrative.md), DX Core 4, TCO, the board version of the same conversation
- [For team leads](./for-team-leads.md), turning metrics into team practice
