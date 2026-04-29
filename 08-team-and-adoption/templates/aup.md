---
title: AI Coding Acceptable Use Policy (Template)
summary: Fork-able one-page AUP covering approved tools, data, workflow, audit, and incident response.
tags: [adoption, templates, aup, policy, governance]
related:
  - ../risk-governance-policy.md
  - ./agents-md-org-template.md
last_updated: 2026-04-26
---

# AI Coding Acceptable Use Policy (Template)

> ⚠️ **Not legal advice.** Fork this, compress it, have your legal/security/HR teams adapt it. The point is to ship a *useful* AUP, short enough that engineers will actually read it, not a comprehensive one.

The structure follows the [STRIDE-style threat model in Risk, governance, policy](../risk-governance-policy.md#the-threat-model--ai-in-the-sdlc-stride-style). Each section addresses a category of risk with a concrete control.

---

## Template starts here ⬇️

# `[ORG]` AI Coding Acceptable Use Policy

**Version:** 1.0
**Effective:** `[DATE]`
**Owner:** `[Platform Team Lead]`
**Reviewed quarterly. Last review: [DATE].**

## 1. Purpose

This policy governs the use of AI coding tools (Claude Code, GitHub Copilot, Cursor, OpenAI Codex, Anthropic Claude API, and any others on the approved list) by `[ORG]` engineers in the course of their work.

The policy exists because:
- AI-generated code introduces measurable security risk (Apiiro 2025: 322% increase in privilege escalation paths in AI-generated code)
- Shadow AI usage costs $650K+ extra per breach (IBM 2025)
- Regulatory obligations under the EU AI Act apply to AI tools that affect workers (effective August 2, 2026)

## 2. Approved tools

The current approved tool list is maintained at `[INTERNAL URL]` and reviewed quarterly. As of `[DATE]`:

- **Tier 1 (full approval):** `[e.g., Claude Code Enterprise, GitHub Copilot Business]`
- **Tier 2 (sandboxed):** `[e.g., Cursor Pro for individual experimentation; not for production code]`
- **Tier 3 (prohibited):** `[e.g., personal-account ChatGPT for company source code; any tool not on this list]`

Use of unapproved tools for company work is a policy violation. Process to request a new tool: `[INTERNAL FORM]`.

## 3. Data classes

The following data **MUST NOT** be sent to AI tools:

- Production credentials, API keys, secrets, certificates
- Customer PII (names, emails, payment data, health data, government IDs)
- Source code or schemas marked `RESTRICTED` (see data classification policy)
- Information subject to NDA with third parties

Source code marked `INTERNAL` may be used with Tier 1 tools that have:
- Zero Data Retention (ZDR) configured (where vendor offers it)
- Approved vendor data residency

## 4. Required workflow

For all production code touched by AI tools:

1. **AI-generated code is reviewed by a human.** No autonomous commits to `main`.
2. **The PR is labelled** with the AI tool used (label: `ai-assisted`).
3. **The author can explain what the code does** in PR review. *"I don't fully understand it, but it works"* is grounds for review rejection.
4. **Each repo has an `AGENTS.md`** (template at `[INTERNAL URL]`) reviewed quarterly.
5. **Hallucinated dependencies are caught at CI**. See SBOM/scan policy.

## 5. Prohibited use cases

AI tools **MUST NOT** be the primary author of code in:

- Authentication, authorization, session management
- Cryptography (key generation, encryption/decryption logic)
- Input validation for security-critical paths
- Permission / RBAC logic
- Code that handles regulated data (financial, health, government)

For these areas, AI may *suggest*; humans must *write*.

## 6. Audit and logging

- All LLM requests routed through `[ORG] AI Gateway` (auth, cost, retention)
- AI-generated code attributable to authorized session/user (SOC 2 CC8.1)
- Audit logs retained `[N years per compliance requirements]`
- Quarterly governance review by `[committee]`

## 7. Personal accounts and shadow AI

Use of personal AI accounts (personal ChatGPT, personal Claude, personal Copilot) for company work is **prohibited**. The approved set in Section 2 is intentionally broad to make compliance easy.

If a use case isn't covered by the approved set, request a tool addition (Section 2). Do not work around the policy.

## 8. Incident response

If you suspect:
- Data exposure via AI tool (paste, agent action, vendor incident)
- Memory poisoning / prompt injection affecting agent behavior
- AI-generated security vulnerability

→ Report immediately to `[security@org]` and follow the AI incident playbook at `[INTERNAL URL]`.

The org commits to no-blame reporting for good-faith disclosures. Late discovery of an issue you spotted earlier is a policy violation; spotting and reporting an issue is not.

## 9. Updates

This policy is reviewed quarterly. Material changes communicated via `[ANNOUNCEMENT CHANNEL]` with at least 30 days notice unless responding to an active incident.

---

*— End of template. Adapt freely. —*

---

## Notes for the editor (delete before adoption)

- **Where to put this:** in your engineering policies folder (`docs/policies/ai-coding-aup.md` is a common convention), also linked from your `AGENTS.md` template, your engineering wiki, and the onboarding checklist for new hires. Avoid burying it in a quarterly memo PDF nobody opens.
- **Section 5** is where most legal-team review will focus. The list of "MUST NOT be primary author" is conservative and matches the [where AI helps page](../../03-effective-use/where-ai-helps.md) recommendations. Compress or expand based on your risk profile.
- **Section 4 item 3** ("the author can explain what the code does") is the single most-pushback-prone item. It's also the one that catches the most issues. Hold the line.
- **The AI Gateway requirement (Section 6)** assumes a Cloudflare-style centralized routing pattern. If you don't have one yet, mark this aspirational and revise once it's in place.
- **The "AI tool used" PR label (Section 4 item 2)** can be self-reported initially; many CI tools can detect AI-assisted commits programmatically once the org standardizes on one or two tools.
- **For EU operations:** add a section on EU AI Act high-risk classification for any internal AI tool affecting workers (performance evaluation, monitoring, task allocation). See [Risk, governance, policy / EU AI Act](../risk-governance-policy.md#the-eu-ai-act-for-engineering-leaders).

## Related

- [Risk, governance, policy](../risk-governance-policy.md), the framing this AUP operationalizes
- [Org-level AGENTS.md template](./agents-md-org-template.md)
- [Code review checklist](./code-review-checklist.md)
