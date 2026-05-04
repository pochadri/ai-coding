---
title: AI Incident Response Runbook (Template)
summary: Detect → Contain → Investigate → Remediate → Communicate → Learn. Specifically tuned for AI-coding incident classes.
tags: [adoption, templates, incident-response, security, runbook, post-mortem]
related:
  - ./aup.md
  - ../risk-governance-policy.md
  - ../../07-quality-and-security/threat-landscape.md
last_updated: 2026-04-26
---

# AI Incident Response Runbook (Template)

The AUP says "follow the AI incident playbook." This is that playbook. Specifically tuned for the incident classes that don't show up in a generic security IR runbook, memory poisoning, prompt injection via untrusted content, autonomous agent overreach, hallucinated dependencies that turned out to be malware, IP/copyright exposure from unmodified suggestions, shadow-AI data exposure.

The structure is the standard six-phase one (**Detect, Contain, Investigate, Remediate, Communicate, Learn**), what differs is the *content* per phase for AI-specific incidents. Replit/SaaStr would have looked very different with a runbook like this in place.

> ⚠️ **Not legal advice; not security consulting.** Adapt this with your security and legal teams. The point is to have *a* runbook, then iterate; not having one is the failure mode.

---

## Template starts here ⬇️

# `[ORG]` AI Incident Response Runbook

**Version:** 1.0 · **Owner:** `[Security + Platform Team Lead]` · **Last refresh:** `[DATE]`

## Incident classes covered

| Class | Description | Severity bias |
|---|---|---|
| **AI-01: Data exposure via AI tool** | Source code, secrets, PII, or restricted data sent to a vendor via an AI tool (sanctioned or shadow) | High |
| **AI-02: Memory poisoning / prompt injection** | An external content source has been used to inject persistent instructions into agent memory affecting future sessions | High |
| **AI-03: Autonomous agent overreach** | Agent took a destructive action (delete, merge, deploy, drop) outside its intended scope | High → Critical |
| **AI-04: Hallucinated-dependency malware** | A package the AI suggested was a typosquat or malicious package that made it past CI | Critical |
| **AI-05: AI-generated security vulnerability in production** | A vulnerability traced to AI-generated code (per Apiiro's 322% privilege escalation finding) is exploited or near-exploited | Severity per CVSS |
| **AI-06: Shadow AI breach** | A breach where the entry point or contributing factor was unsanctioned AI tool use | Per IBM, +$650K cost premium vs standard breach |
| **AI-07: IP/copyright exposure** | AI-generated code is alleged to infringe third-party IP; vendor indemnification triggers | Per legal |
| **AI-08: Vendor incident affecting `[ORG]`** | The AI vendor itself had a breach, outage, or policy change affecting our use | Per vendor disclosure |

---

## Phase 1 — Detect

**Sources you should be monitoring:**
- AI Gateway logs (anomalous request patterns; unexpected destinations; bulk data exfil patterns)
- AppSec scanning hits flagged as AI-introduced
- Audit logs from approved tools (Anthropic `/v1/skills`; Copilot audit; Cursor enterprise admin)
- CI/CD anomalies (unexpected dependencies, unusual diff sizes from `ai-assisted` PRs)
- Cyber insurance broker advisories
- Vendor security advisories (subscribe to all vendors in your tool catalog)
- Engineer reports via `[security@org]` or AI-incident channel

**Initial triage questions (60-second version):**
1. Which incident class (AI-01 through AI-08)?
2. Confirmed or suspected?
3. Production impact: yes / no / unknown?
4. Data exposure: yes / no / unknown?
5. Active exploitation: yes / no / unknown?

If 2-of-5 of those are "yes" → escalate to severity High and proceed to Phase 2 immediately.

---

## Phase 2 — Contain

**Standard containment for AI-specific incidents:**

| If… | Do this |
|---|---|
| **AI-01 (data exposure)** | Identify the request that exposed data; if it's a sanctioned vendor with ZDR, document the exposure scope; if shadow AI, the data may be in vendor training corpus, escalate to legal |
| **AI-02 (memory poisoning)** | Wipe affected memory layer immediately; identify the injection vector (URL? PR comment? Doc?); block the source; quarantine sessions that touched poisoned memory |
| **AI-03 (autonomous agent overreach)** | Immediately revoke the agent's credentials; freeze writes to affected systems; if the agent is still running, kill the process |
| **AI-04 (hallucinated-dependency malware)** | Standard malicious-dependency response: rollback, scan all systems that pulled the dep, rotate any secrets the build process touched |
| **AI-05 (production vulnerability)** | Standard incident response per CVSS; tag the post-mortem as AI-introduced for trend tracking |
| **AI-06 (shadow AI breach)** | Standard breach response + emergency shadow-AI inventory + AUP enforcement actions |
| **AI-07 (IP exposure)** | Trigger vendor indemnification process; legal takes lead; engineering preserves evidence |
| **AI-08 (vendor incident)** | Activate vendor-incident protocol per their SLA; assess your direct exposure; consider temporary tool-catalog adjustments |

**For all classes:** create an incident channel, assign IC (Incident Commander), set up the comms cadence (every 30 min for High/Critical until containment).

---

## Phase 3 — Investigate

**Forensic questions specific to AI incidents:**

1. **What was the prompt or trigger?** (For agent overreach / memory poisoning, the originating request matters for understanding intent)
2. **What was in the agent's context window at the time?** (Memory contents, skills loaded, MCP tools available)
3. **Which tool / model / vendor?** (For attribution and vendor coordination)
4. **What's the audit trail?** (AI Gateway logs, vendor audit logs, CI logs, preserve these immediately)
5. **Was the action attributable to a specific authorized user?** (SOC 2 CC8.1 question, gaps here are a separate finding)
6. **Was an `AGENTS.md` boundary violated?** (If yes, the boundary needs to be hardened; if no, the boundary is missing)
7. **For data exposure: what's the vendor's data-handling commitment?** (ZDR? Training opt-out? Residency?, informs scope of exposure)

---

## Phase 4 — Remediate

**Beyond standard remediation:**

- For agent overreach (AI-03): tighten `AGENTS.md` boundaries; add `[ORG]`-specific guard skills; reduce agent privileges
- For memory poisoning (AI-02): add memory-content validation; consider TTL on memory layer; add transparency tooling so future incidents are detectable
- For hallucinated-dep malware (AI-04): add CI dependency-existence check before install; sub the vendor's filter (e.g., Copilot's duplication detection) and make sure it's enabled
- For production vulnerabilities (AI-05): tune AppSec scanning rules to catch the pattern in CI going forward
- For shadow AI breaches (AI-06): emergency comms reminding employees of approved tool list; consider temporary MFA / DLP changes

---

## Phase 5 — Communicate

**Internal:**
- Engineering org: same-day for confirmed High/Critical
- Wider company: per `[ORG]` standard incident comms
- HR: if the incident involves employee misconduct (shadow AI breach with willful violation, etc.)
- Board: per board-incident-threshold policy

**External:**
- Customers: per regulatory and contractual obligations
- Regulators: per breach notification laws (GDPR 72-hour, state laws, EU AI Act for high-risk)
- Vendor (if relevant): coordinate disclosure; trigger SLA / indemnification
- Cyber insurance: notify per policy (often 24-48 hours)
- Public disclosure: only via comms team; no engineer-direct disclosure

---

## Phase 6 — Learn

**The post-mortem template for AI incidents adds these sections to your standard format:**

- **Incident class** (AI-01 through AI-08; or "new, propose new class")
- **Tool / model / vendor** involved
- **AGENTS.md / AUP / governance gap** identified (yes / no / what)
- **Vendor-side gap** identified (yes / no / what); coordinated disclosure plan
- **Action items for [Platform Team / Security / Champions network / Vendor]**
- **Trend implications**: does this change the AppSec investment? The maturity model self-assessment? The vendor evaluation?

**Track AI-incident classes quarterly.** A trend (e.g., 3 AI-04 incidents in one quarter) is itself a signal that warrants a structural response, not just incident-by-incident remediation.

---

*— End of template. Adapt freely. —*

---

## Notes for the editor (delete before adoption)

- **Where to put this:** in your security runbooks library, alongside your standard incident playbook. Reference it from your AUP (Section 8 already does).
- **Test it.** Run a tabletop exercise within the first quarter, simulate AI-03 (agent overreach) since it's the highest-impact and the easiest to script. The Replit/SaaStr scenario is a perfect tabletop scenario.
- **The 8-class taxonomy** is mine. Yours may need different classes; you may not need all of these. The ones you genuinely don't need today, you'll likely need within 12 months.
- **Phase 6 trend tracking** is the part most teams skip and the part that turns incidents into structural improvements. Build the dashboard before you need the dashboard.
- **For SOC 2 audit:** every AI incident should generate an artifact (post-mortem) that maps to CC8.1 (change management) and CC7 (system operations) controls. Your auditor will start asking for this in 2026.

## Related

- [AUP template](./aup.md), Section 8 references this runbook
- [Risk, governance, policy](../risk-governance-policy.md), STRIDE-style threat model the incident classes derive from
- [Security (IC depth)](../../07-quality-and-security/threat-landscape.md), practitioner-level treatment
- [When things go wrong (IC depth)](../../07-quality-and-security/when-things-go-wrong.md), debugging-side framing for the same incidents
