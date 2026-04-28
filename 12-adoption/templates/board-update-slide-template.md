---
title: Board Update Slide Template (AI Coding)
summary: Six-slide board update structure for AI coding rollout. Honest framing, three numbers, no hype.
tags: [adoption, templates, board, communication, slides]
related:
  - ../roi-and-board-narrative.md
  - ../maturity-model.md
  - ./vendor-evaluation-rubric.md
last_updated: 2026-04-26
---

# Board Update Slide Template (AI Coding)

The 5-minute board update I'd give. Six slides, honest framing, the [bimodal productivity story](../roi-and-board-narrative.md#the-bimodal-productivity-story) front and center.

This is a markdown skeleton, copy each slide into your slide tool of choice. The reason it's in markdown rather than a .pptx is that the *content* is the artifact; the visual treatment depends on your house style and shouldn't constrain the message.

> ⚠️ **Slot in your real numbers.** Placeholders are in `[BRACKETS]`. Don't ship a board deck with `[X]%` still in it. (I have seen this happen.)

---

## Template starts here ⬇️

# `[ORG]` AI Coding Rollout — Board Update — `[QUARTER YYYY]`

---

## Slide 1 — One-page TL;DR

**Where we are:** Maturity Level `[N]` of 5 ([per the assessment](../assessment.md))

**The three numbers that matter:**
- **Daily active usage:** `[Y]%` of engineering (target: 70%, the [Booking.com benchmark](../case-studies.md#-bookingcom--the-gold-standard-rollout))
- **Cycle time trend:** `[+/− Z]%` over `[period]`
- **Defect escape rate trend:** `[+/− Z]%` over `[period]`

**The honest framing:**
> Individual developer output is up `[X]%` in our measurement. Organizational throughput `[is up X% / is roughly flat]`, the gap is being eaten by `[review burden / larger PRs / cleanup volume]`. We're investing in the practices that close that gap.

**What I need from this board today:** `[the ask, usually budget approval, AUP sign-off, or a regulatory-posture decision]`

---

## Slide 2 — The bimodal productivity picture

| Side | What the data says | Source |
|---|---|---|
| **Vendor / optimistic** | Anthropic internal: +67% PRs/eng/day; Microsoft RCT (2022 experiment): 13–22% more PRs/week | [Anthropic](https://www.anthropic.com/research/how-ai-is-transforming-work-at-anthropic), [Microsoft RCT](https://arxiv.org/abs/2302.06590) |
| **Skeptical / our experience** | METR RCT (2025): 19% slower for experienced devs (devs *thought* they were 20% faster); DORA 2025: organizational delivery flat despite individual gains | [METR](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/), [DORA 2025](https://dora.dev/dora-report-2025/) |

**Our number:** `[in our org: cycle time X, defect rate Y, daily active usage Z, placed honestly between the two]`

---

## Slide 3 — Adoption and engagement

- **Total developers with tool access:** `[N]`
- **Daily active users (12+ days/month):** `[N]` (`[Y]%`)
- **Adoption by team / org:** `[chart placeholder]`
- **Tools in use:** `[Tier 1: ..., Tier 2: ..., Tier 3 prohibited]`
- **Shadow AI estimate:** `[from quarterly inventory; Netskope baseline is 47% of users on personal accounts]`

**Pattern we're seeing:** `[1-2 sentence narrative, e.g., "adoption strong on backend; weaker on infra; piloting champions network for infra in Q3"]`

---

## Slide 4 — Quality, security, and risk

- **AppSec scanning for AI patterns:** `[deployed / partial / planned]`
- **AI-introduced findings this quarter:** `[N]` (compared to `[N]` last quarter)
- **Notable incidents:** `[N]` AI-related (`[summary or "none"]`)
- **EU AI Act readiness:** `[inventory complete / classification in progress / Aug 2 2026 deadline tracking]`
- **Cyber insurance posture:** `[explicit AI coverage / silent / renewal date]`

**The headline risk we're managing:** [Apiiro's 322% increase in privilege escalation paths in AI-generated code](../case-studies.md#-apiiro--the-security-spike-that-changes-the-conversation), our AppSec investment is sized to this.

---

## Slide 5 — Spend (TCO under usage-based pricing)

| Line item | Annual cost | YoY |
|---|---|---|
| Vendor licenses (base seats) | `[$]` | `[+/− %]` |
| Usage-based vendor billing | `[$]` | `[+/− %]` |
| Platform team headcount | `[$]` | `[+/− %]` |
| AppSec / governance tooling | `[$]` | `[+/− %]` |
| Training & enablement | `[$]` | `[+/− %]` |
| **Total annual TCO** | **`[$]`** | `[+/− %]` |

**Cost per active developer per year: `[$]`** *(industry benchmark from [Anthropic-published Claude Code spend](https://www.verdent.ai/guides/claude-code-pricing-2026): ~$150–250/dev/month for serious users)*

**Note on usage-based pricing:** GitHub Copilot moved to token-based billing in June 2026; Anthropic restructured Claude Enterprise to $20/seat + usage in February 2026. Per-seat budgets are now ~4% of actual TCO. ([Reasoning](../roi-and-board-narrative.md#tco-under-usage-based-pricing).)

---

## Slide 6 — Roadmap and asks

**This quarter, completed:** `[bullets]`

**Next quarter, planned:** `[bullets]`

**Per [the maturity model](../maturity-model.md), current level: `[N]`**
**Target by year-end: Level `[N+1]`**

**Asks of this board:**
1. `[concrete ask 1]`
2. `[concrete ask 2]`
3. `[concrete ask 3]`

**Risks I want this board aware of:**
- `[risk 1, usually security or vendor lock-in]`
- `[risk 2, usually regulatory]`
- `[risk 3, usually junior pipeline / talent]`

---

*— End of template. Adapt freely. —*

---

## Notes for the editor (delete before adoption)

- **Where to put this:** wherever your board materials live (Notion, Confluence, Google Drive). Refresh quarterly.
- **The honest framing in Slide 1** is the spine. Don't soften it. The board members will respect "we're seeing this gap and here's what we're doing about it" much more than "everything is great."
- **The bimodal slide (Slide 2)** is what protects you when a board member quotes a vendor stat or the METR study at you in the next quarter, you've already shown both.
- **The headline risk in Slide 4** can rotate quarterly. Apiiro's 322% is the current heavyweight; in 12 months it'll be something else (likely memory poisoning or autonomous agent incidents).
- **The asks in Slide 6** are the most important slide. If you don't have asks, you're informing rather than leading. Always have asks.
- **Tip:** I keep the "What I need from this board today" line on Slide 1 as a callback, board attention drops after slide 3, so leading with the ask matters.

## Related

- [ROI and board narrative](../roi-and-board-narrative.md), full reasoning behind each slide
- [Maturity model](../maturity-model.md), for the level reference in Slide 6
- [Vendor evaluation rubric](./vendor-evaluation-rubric.md), supporting detail for the spend slide
