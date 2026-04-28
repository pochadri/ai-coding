---
title: Adoption Templates
summary: Fork-able starting points — AUP, org-level AGENTS.md, code review checklist.
tags: [adoption, templates, aup, agents-md, code-review]
related:
  - ../risk-governance-policy.md
  - ../org-design.md
last_updated: 2026-04-27
---

# Adoption Templates

The templates here are deliberately short. I've watched too many CTOs hand a 40-page AUP to legal and never see it again, the version that actually gets adopted is short enough that someone will read it.

Each template is meant to be **forked and compressed**, not used verbatim. They're starting points your legal / security / DevEx teams can adapt in an afternoon, not deliverables.

> ⚠️ **Not legal advice.** These templates are written from a practitioner's perspective and informed by public reference materials (linked in [REFERENCES](../../REFERENCES.md)). Have your legal team review before adopting.

## What's here

- **[AI Coding Acceptable Use Policy (AUP)](./aup.md)**: one-page policy template covering tools, data classes, workflow, audit, and incident response. Maps to the [STRIDE threat model categories](../risk-governance-policy.md#the-threat-model--ai-in-the-sdlc-stride-style).
- **[Org-level `AGENTS.md` template](./agents-md-org-template.md)**: the canonical org-wide context file your platform team owns; per-repo override pattern.
- **[Code review checklist](./code-review-checklist.md)**: a 6-item review checklist updated for AI-generated code, plus the "did the author understand it?" question. Adapt for your team's PR template.
- **[Vendor evaluation rubric](./vendor-evaluation-rubric.md)**: 20-dimension scoring sheet for comparing AI coding vendors. Indemnification, data handling, residency, audit, exit terms, support.
- **[Board update slide template](./board-update-slide-template.md)**: six-slide quarterly board update structure. Honest framing, three numbers, no hype.
- **[AI incident response runbook](./incident-response-runbook.md)**: six-phase IR runbook tuned for AI-coding incident classes (memory poisoning, agent overreach, hallucinated-dep malware, shadow-AI breach, etc.).

## How to use them

For each template:

1. **Fork the file** into your internal docs / `.github` repo.
2. **Compress it**: most teams need ~50% of the template content, not 100%.
3. **Get sign-off**: for AUP, that's legal + security + HR. For AGENTS.md, that's the platform team. For the code review checklist, your engineering managers.
4. **Treat it like code**: version it, PR-review changes, refresh quarterly.

## Related reading

- [Risk, governance, policy](../risk-governance-policy.md), the framing the AUP operationalizes
- [Org design + platform team](../org-design.md), who owns these templates after they ship
- [The 90-day roadmap](../90-day-roadmap.md), when to deploy each template (Days 1–30 for AUP and AGENTS.md, Days 31–60 for code review)
