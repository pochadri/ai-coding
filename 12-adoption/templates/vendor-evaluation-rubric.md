---
title: AI Coding Vendor Evaluation Rubric (Template)
summary: Scoring sheet for comparing AI coding vendors. Indemnification, data handling, residency, audit, exit terms, support.
tags: [adoption, templates, vendor-evaluation, procurement, indemnification]
related:
  - ../risk-governance-policy.md
  - ../roi-and-board-narrative.md
  - ./aup.md
last_updated: 2026-04-26
---

# AI Coding Vendor Evaluation Rubric (Template)

When a CTO peer asks me what to push for in a vendor negotiation, I usually end up sketching the same rubric on a whiteboard. Here it is in fork-able form. The point is that *negotiated terms* matter at least as much as the per-seat list price and the things that aren't on the marketing site (indemnification scope, audit log access, exit terms) are where vendors give the most ground when pressed.

Score each vendor 0–3 per dimension. Total /60. Use the totals as a *conversation starter*, not a decision rule, fit-for-purpose almost always beats a slightly higher rubric score.

> ⚠️ **Not legal advice.** Have your legal team review the contract language for the dimensions below. The rubric helps you know what to *ask* for; the contract is what you actually *get*.

---

## Template starts here ⬇️

# `[ORG]` AI Coding Vendor Evaluation — `[VENDOR NAME]`

**Evaluator:** `[NAME]` · **Date:** `[DATE]` · **Use case:** `[e.g., agentic coding for backend teams]`

| # | Dimension | Score 0–3 | Evidence / contract clause | Notes |
|---|---|---|---|---|
| 1 | **IP indemnification, scope** | | | 0 = none. 1 = verbatim only with safety filter on. 2 = covers modified output. 3 = uncapped + covers modified output. |
| 2 | **IP indemnification, process** | | | 0 = best efforts. 1 = standard. 2 = vendor takes defense. 3 = vendor takes defense + accepts liability cap commensurate with contract value. |
| 3 | **Zero Data Retention (ZDR)** | | | 0 = data retained per their default. 1 = optional opt-in. 2 = ZDR negotiable for enterprise. 3 = ZDR available + contractually guaranteed. |
| 4 | **Training-on-customer-data prohibition** | | | 0 = trains by default. 1 = opt-out available. 2 = no training without explicit opt-in. 3 = contractual no-training commitment. |
| 5 | **Data residency options** | | | 0 = US-only. 1 = US + one other region. 2 = US + EU + other major regions. 3 = configurable per workspace, contractually committed. |
| 6 | **Audit log access** | | | 0 = none / vendor-only. 1 = exportable manually. 2 = API/SCIM integration. 3 = real-time stream + retention configurable. |
| 7 | **SOC 2 / ISO 27001 / EU AI Act readiness** | | | 0 = none. 1 = SOC 2 Type II. 2 = SOC 2 Type II + ISO 27001. 3 = SOC 2 Type II + ISO 27001 + EU AI Act conformity work in progress. |
| 8 | **Cyber insurance posture** | | | 0 = silent on AI vectors. 1 = aware. 2 = endorsement available. 3 = explicit AI coverage in vendor's own cyber policy + acceptable to your underwriter. |
| 9 | **Pricing transparency** | | | 0 = bespoke quotes only. 1 = published list price. 2 = published + clear usage-based component. 3 = published + usage caps + budget alerts + per-active-user dashboard. |
| 10 | **Vendor lock-in / exit terms** | | | 0 = no data export. 1 = manual export on request. 2 = self-service export of conversations/contexts/skills. 3 = open formats + import-into-competitor documented + contractual exit cooperation. |
| 11 | **Support tier** | | | 0 = community only. 1 = ticket-based, 48hr SLA. 2 = dedicated CSM + 24hr SLA. 3 = dedicated CSM + 4hr P1 SLA + executive sponsor. |
| 12 | **Multi-tool / portability story** | | | 0 = locked-in IDE/CLI. 1 = limited cross-tool. 2 = supports open standards (SKILL.md, AGENTS.md, MCP). 3 = open-standard native + first-party support across major tools. |
| 13 | **Roadmap transparency** | | | 0 = none. 1 = quarterly NDA roadmap. 2 = public quarterly roadmap. 3 = customer advisory board + quarterly roadmap + RFC process. |
| 14 | **Governance / admin features** | | | 0 = no admin console. 1 = SSO + basic admin. 2 = SSO + SCIM + per-team policy. 3 = SSO + SCIM + policy-as-code + audit dashboards. |
| 15 | **Cost predictability under usage-based pricing** | | | 0 = no caps, no alerts. 1 = monthly invoice surprises possible. 2 = per-team budget caps + alerting. 3 = pooled budgets + per-active-day metrics + finance-grade reporting. |
| 16 | **Reference customers** | | | 0 = none referenceable. 1 = case studies on website. 2 = direct reference calls offered. 3 = direct references at orgs of comparable size and risk profile. |
| 17 | **Track record on incidents** | | | 0 = recent unaddressed incidents. 1 = no published incident history. 2 = transparent post-mortems on past incidents. 3 = mature security disclosure program + transparent incident handling. |
| 18 | **Multi-region failover / availability** | | | 0 = single region. 1 = multi-AZ. 2 = multi-region failover. 3 = multi-region active-active + published SLAs at 99.9%+ |
| 19 | **Total active developer count (vendor scale)** | | | 0 = <10K. 1 = 10K–100K. 2 = 100K–1M. 3 = 1M+ active devs. |
| 20 | **Strategic alignment / ownership** | | | 0 = subsidiary of competitor. 1 = independent startup with runway concern. 2 = well-capitalized independent. 3 = mission-aligned independent or captive of partner you trust. |

**Total: __ / 60**

## Interpretation

- **0–25:** Significant gaps. Reasonable as a sandbox/pilot; not as a primary tool for production code.
- **26–40:** Workable for most use cases. Negotiate hardest on the dimensions where the vendor scored lowest before signing.
- **41–55:** Strong fit. Confirm the contract language matches the rubric scores (vendors sometimes score higher on the rubric than on the actual contract).
- **56–60:** Exceptional fit. Go.

## Things this rubric deliberately doesn't score

- **Raw model performance**: benchmarks change; your team's task-fit matters more than benchmark deltas
- **UI / DX polish**: try-before-you-buy with a real pilot; don't score this on a vendor demo
- **Brand recognition**: irrelevant past Series A
- **Per-seat list price alone**. See [the TCO model](../roi-and-board-narrative.md#tco-under-usage-based-pricing) for why this is the wrong line item to optimize

---

*— End of template. Adapt freely. —*

---

## Notes for the editor (delete before adoption)

- **Where to put this:** in your procurement / vendor management folder, alongside your standard vendor risk assessment template. Refresh per evaluation; archive in your vendor-decision-records.
- **Item 4 (training-on-customer-data)** is becoming table stakes for enterprise AI. If a vendor scores 0 here in 2026, that's a near-disqualifier for any IP-sensitive work.
- **Item 8 (cyber insurance posture)** is the newest dimension and the one most teams forget to ask about. Worth a 30-min conversation with your broker before scoring.
- **Item 12 (multi-tool / portability)** matters more than it used to because of [open standards like SKILL.md and AGENTS.md](../../06-skills/what-are-skills.md#the-open-standard-and-what-works-where), vendors who treat themselves as the only valid interface are betting against the trend.
- **Item 20 (strategic alignment)** is where I see the most CTO discomfort. The OpenAI-Windsurf acquisition is the prototype: signing a deal with a startup that gets acquired six months later by a competitor is a real downside risk.

## Related

- [Risk, governance, policy](../risk-governance-policy.md), the framing many of these dimensions operationalize
- [ROI and board narrative](../roi-and-board-narrative.md), TCO model that pairs with this rubric
- [AUP template](./aup.md), the policy that the negotiated terms feed into
