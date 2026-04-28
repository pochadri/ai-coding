---
title: For Team Leads
summary: Training matters more than tools. Update review guidelines. Set clear boundaries.
tags: [team-lead, management, policy, training]
related:
  - ./junior-developers.md
  - ./measuring-impact.md
  - ../03-effective-use/review-discipline.md
  - ../09-security/threat-landscape.md
last_updated: 2026-04-25
---

# For Team Leads (Or When You Scale)

> **A note on altitude.** This page is for EMs / line managers running a team. If you're a CTO / VPE / Director making *org-level* decisions about AI coding adoption, platform team scope, hiring/leveling rubrics, AUP rollout, board narrative, that lives in the **[00 — Leadership folder](../12-adoption/)**, especially [Org design + platform team](../12-adoption/org-design.md) and [The 90-day roadmap](../12-adoption/90-day-roadmap.md).

If you're building a team or plan to hire developers, here's what I've learned from watching others and thinking about how I'd do it.

## Training Matters More Than Tools

I've seen teams give everyone Copilot licenses and expect productivity to improve. It doesn't. At least not for three months. People don't know how to use the tools effectively.

The teams that do well invest in training. Not just "how to accept suggestions" but "how to write good prompts" and "how to review AI code" and "when not to use AI at all."

## Update Your Code Review Guidelines

Your existing [review checklist](../03-effective-use/review-discipline.md) probably doesn't cover AI-specific issues. Add:

- Do all imports/dependencies actually exist?
- Does this code follow our patterns or is it generic?
- Are there any obvious security issues (injection, hardcoded secrets)?
- **Does the author understand what this code does?**

That last one is controversial, but I think it's important. If the author can't explain the code, they shouldn't be submitting it.

## Set Clear Boundaries

Here are the rules I follow (and would enforce on any team I lead):

- AI is **not trusted** on auth, crypto, or [security-critical code](../09-security/threat-landscape.md) without the structured pattern: AI drafts, a human writes the security boundary, and a separate-model review pass catches what the generation session missed. See [09 — Defenses](../09-security/defenses.md) for what that pattern looks like in practice.
- AI-generated code must be **labeled** in the PR (we use a checkbox).
- Any AI-suggested dependency must be **verified** before installation.
- [Juniors do their first pass without AI](./junior-developers.md), then can use it for refinement.

You'll have different rules. **But have rules.** The Wild West approach leads to problems.

## Related reading

- [Junior developers](./junior-developers.md), the onboarding policy
- [Review discipline](../03-effective-use/review-discipline.md), the underlying checklist
- [00 — Leadership / Org design + platform team](../12-adoption/org-design.md), the org-level framing of these same questions
